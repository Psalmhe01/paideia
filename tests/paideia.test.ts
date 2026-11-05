import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import request from 'supertest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createDatabase, type DbInstance } from '../server/db.js';
import { ensureSeeded } from '../server/seed.js';
import { createApp } from '../server/app.js';

describe('Paideia Theological Library API & Curriculum', () => {
  let tmpDir: string;
  let dbInstance: DbInstance;
  let app: ReturnType<typeof createApp>;

  beforeAll(async () => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'paideia-test-'));
    dbInstance = createDatabase(tmpDir);
    await ensureSeeded(dbInstance);
    app = createApp(dbInstance);
  }, 20000);

  afterAll(() => {
    dbInstance.db.close();
    fs.rmSync(tmpDir, { recursive: true, force: true });
  });

  it('seeds all required theological disciplines, topics, online sources, attachments, and quizzes', async () => {
    const res = await request(app).get('/api/stats').expect(200);
    expect(res.body.totals.disciplines).toBe(11);
    expect(res.body.totals.topics).toBeGreaterThanOrEqual(24);
    expect(res.body.totals.sources).toBeGreaterThanOrEqual(48);
    expect(res.body.totals.attachments).toBeGreaterThanOrEqual(24);
    expect(res.body.totals.questions).toBeGreaterThanOrEqual(120);
    expect(res.body.totals.glossary).toBeGreaterThanOrEqual(25);

    const slugs = res.body.disciplines.map((d: { slug: string }) => d.slug);
    expect(slugs).toEqual(
      expect.arrayContaining([
        'apologetics',
        'soteriology',
        'doctrine',
        'hermeneutics',
        'church-history',
        'bible-history',
        'church-fathers',
        'ethics-liturgy',
      ])
    );
  });

  it('returns detailed topic data with online sources and companion PDF attachments', async () => {
    const res = await request(app).get('/api/topics/trinity-theology-proper').expect(200);
    expect(res.body.title).toContain('Trinity');
    expect(res.body.sections.length).toBeGreaterThanOrEqual(3);
    expect(res.body.excerpts.length).toBeGreaterThanOrEqual(2);
    expect(res.body.sources.length).toBeGreaterThanOrEqual(2);
    expect(res.body.attachments.length).toBeGreaterThanOrEqual(1);
    expect(res.body.relatedTopics.length).toBeGreaterThanOrEqual(2);

    // Verify source-linked PDF attachment streams valid PDF bytes
    const pdfAtt = res.body.sources[0].attachments[0];
    expect(pdfAtt).toBeDefined();
    expect(pdfAtt.mimeType).toBe('application/pdf');

    const fileRes = await request(app)
      .get(`/api/attachments/${pdfAtt.id}/file?download=1`)
      .expect(200);
    expect(fileRes.headers['content-type']).toContain('application/pdf');
    expect(fileRes.headers['content-disposition']).toContain('attachment');
    expect(Buffer.from(fileRes.body).subarray(0, 5).toString('ascii')).toBe('%PDF-');
  });

  it('persists study progress, bookmarks, and personal marginalia notes', async () => {
    await request(app)
      .put('/api/topics/theories-of-atonement/progress')
      .send({
        studied: true,
        bookmarked: true,
        notes: 'Compare Colossians 2:14–15 uniting Penal Substitution and Christus Victor.',
      })
      .expect(200);

    const detail = await request(app).get('/api/topics/theories-of-atonement').expect(200);
    expect(detail.body.progress.studied).toBe(true);
    expect(detail.body.progress.bookmarked).toBe(true);
    expect(detail.body.progress.notes).toContain('Colossians 2:14–15');

    const filtered = await request(app).get('/api/topics?status=studied').expect(200);
    expect(filtered.body.some((t: { slug: string }) => t.slug === 'theories-of-atonement')).toBe(
      true
    );
  });

  it('supports adding online sources and uploading file attachments linked directly to those sources', async () => {
    const srcRes = await request(app)
      .post('/api/sources')
      .send({
        topicSlug: 'apostolic-fathers',
        title: '1 Clement — Epistle to the Corinthians',
        author: 'Clement of Rome',
        year: 'AD 96',
        repository: 'Early Christian Writings',
        sourceType: 'Primary Text',
        url: 'https://www.earlychristianwritings.com/text/1clement-lightfoot.html',
        citation: 'J.B. Lightfoot translation.',
        summary: 'Earliest extant non-canonical pastoral letter from Rome to Corinth.',
      })
      .expect(201);

    const newSourceId = srcRes.body.id;

    // Upload a companion study file attached directly to that online source
    const markdownBuffer = Buffer.from(
      '# 1 Clement Study Companion\n## Key Themes\n- Humility and congregational order in Corinth\n',
      'utf8'
    );

    const attRes = await request(app)
      .post('/api/attachments')
      .field('topicSlug', 'apostolic-fathers')
      .field('sourceId', String(newSourceId))
      .field('title', '1 Clement Reading Guide')
      .field('description', 'Companion seminar notes on 1 Clement')
      .field('attachmentKind', 'Scholarly Notes')
      .attach('file', markdownBuffer, '1-clement-guide.md')
      .expect(201);

    expect(attRes.body.sourceId).toBe(newSourceId);

    // Confirm nested visibility under the topic's online source
    const topicRes = await request(app).get('/api/topics/apostolic-fathers').expect(200);
    const addedSrc = topicRes.body.sources.find((s: { id: number }) => s.id === newSourceId);
    expect(addedSrc).toBeDefined();
    expect(addedSrc.attachments).toHaveLength(1);
    expect(addedSrc.attachments[0].title).toBe('1 Clement Reading Guide');

    // Clean up custom attachment & source
    await request(app).delete(`/api/attachments/${attRes.body.id}`).expect(200);
    await request(app).delete(`/api/sources/${newSourceId}`).expect(200);
  });

  it('generates quizzes, grades submissions, tracks missed questions, and clears them on review', async () => {
    const genRes = await request(app)
      .post('/api/quizzes/generate')
      .send({ scope: 'discipline', disciplineSlug: 'hermeneutics', count: 5 })
      .expect(200);

    expect(genRes.body.questions).toHaveLength(5);

    const generated = genRes.body.questions as Array<{ id: number; options: string[] }>;
    expect(generated.every((q) => !('correctIndex' in q) && !('explanation' in q))).toBe(true);
    const getKey = dbInstance.db.prepare('SELECT correct_index FROM quiz_questions WHERE id = ?');
    const [q1, q2, ...rest] = generated.map((q) => ({
      ...q, correctIndex: Number(getKey.get(q.id)?.correct_index),
    }));
    const wrongIdx = (q1.correctIndex + 1) % q1.options.length;
    const feedback = await request(app).post('/api/quizzes/check').send({ questionId: q1.id, selectedIndex: wrongIdx }).expect(200);
    expect(feedback.body.correctIndex).toBe(q1.correctIndex);

    // Answer q1 wrong and all others right
    const submitRes = await request(app)
      .post('/api/quizzes/submit')
      .send({
        title: genRes.body.title,
        mode: 'exam',
        disciplineSlug: 'hermeneutics',
        durationSeconds: 42,
        answers: [
          { questionId: q1.id, selectedIndex: wrongIdx },
          { questionId: q2.id, selectedIndex: q2.correctIndex },
          ...rest.map((q: { id: number; correctIndex: number }) => ({
            questionId: q.id,
            selectedIndex: q.correctIndex,
          })),
        ],
      })
      .expect(201);

    expect(submitRes.body.score).toBe(4);
    expect(submitRes.body.totalQuestions).toBe(5);
    expect(submitRes.body.percentage).toBe(80);

    // Missed questions queue should now have q1
    const missedQuiz = await request(app)
      .post('/api/quizzes/generate')
      .send({ scope: 'missed', count: 10 })
      .expect(200);
    expect(missedQuiz.body.questions.some((q: { id: number }) => q.id === q1.id)).toBe(true);

    // Answer q1 accurately to clear it from missed queue
    await request(app)
      .post('/api/quizzes/submit')
      .send({
        title: 'Missed Review',
        mode: 'study',
        durationSeconds: 12,
        answers: [{ questionId: q1.id, selectedIndex: q1.correctIndex }],
      })
      .expect(201);

    const overviewAfter = await request(app).get('/api/quizzes/overview').expect(200);
    expect(overviewAfter.body.missedCount).toBe(0);
  });

  it('searches across topics, sources, attachments, and Greek/Latin/Hebrew lexicon', async () => {
    const searchRes = await request(app).get('/api/search?q=Homoousios').expect(200);
    expect(searchRes.body.glossary.length).toBeGreaterThanOrEqual(1);
    expect(searchRes.body.topics.length).toBeGreaterThanOrEqual(1);
  });
});
