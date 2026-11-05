import { referenceRouter } from './reference.js';
import express from 'express';
import multer from 'multer';
import { del, put } from '@vercel/blob';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import type { DbInstance } from './db.js';
import { discoverOnlineResources } from './onlineDiscovery.js';

function safeJsonParse<T>(raw: string | undefined | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
    .slice(0, 72);
}

export function createApp(instance: DbInstance) {
  const { db, uploadsDir } = instance;
  const app = express();

  app.use((req, _res, next) => {
    if (process.env.VERCEL && !req.path.startsWith('/api')) {
      req.url = `/api${req.url === '/' ? '' : req.url}`;
    }
    next();
  });

  app.use(async (_req, _res, next) => {
    try {
      await instance.ready;
      next();
    } catch (error) {
      next(error);
    }
  });

  app.use('/api/reference', referenceRouter);
  app.use(express.json({ limit: '5mb' }));

  const upload = multer({
    storage: multer.memoryStorage(),
    limits: { fileSize: process.env.VERCEL ? 4 * 1024 * 1024 : 15 * 1024 * 1024 },
  });

  async function storeAttachment(fileName: string, buffer: Buffer, mimeType: string): Promise<string> {
    const ext = path.extname(fileName).slice(0, 16);
    const base = slugify(path.basename(fileName, ext)) || 'attachment';
    const unique = `${Date.now()}-${crypto.randomBytes(4).toString('hex')}-${base}${ext}`;

    if (instance.storage === 'postgres') {
      const blob = await put(`paideia/uploads/${unique}`, buffer, {
        access: 'public',
        addRandomSuffix: true,
        contentType: mimeType,
      });
      return blob.url;
    }

    fs.mkdirSync(uploadsDir, { recursive: true });
    const storedPath = path.join(uploadsDir, unique);
    fs.writeFileSync(storedPath, buffer);
    return storedPath;
  }

  // ---------------------------------------------------------------------------
  // Health
  // ---------------------------------------------------------------------------
  app.get('/api/health', async (_req, res) => {
    const topicCount = (await db.prepare('SELECT COUNT(*) as c FROM topics').get() as { c: number }).c;
    res.json({ status: 'ok', topicCount });
  });

  // ---------------------------------------------------------------------------
  // Dashboard & Scholar Stats
  // ---------------------------------------------------------------------------
  app.get('/api/stats', async (_req, res) => {
    const totalDisciplines = (
      await db.prepare('SELECT COUNT(*) as c FROM disciplines').get() as { c: number }
    ).c;
    const totalTopics = (await db.prepare('SELECT COUNT(*) as c FROM topics').get() as { c: number }).c;
    const studiedTopics = (
      await db.prepare('SELECT COUNT(*) as c FROM topic_progress WHERE studied = 1').get() as { c: number }
    ).c;
    const bookmarkedTopics = (
      db
        .prepare('SELECT COUNT(*) as c FROM topic_progress WHERE bookmarked = 1')
        .get() as { c: number }
    ).c;
    const notesCount = (
      db
        .prepare("SELECT COUNT(*) as c FROM topic_progress WHERE trim(notes) != ''")
        .get() as { c: number }
    ).c;
    const totalSources = (await db.prepare('SELECT COUNT(*) as c FROM sources').get() as { c: number }).c;
    const totalAttachments = (
      await db.prepare('SELECT COUNT(*) as c FROM attachments').get() as { c: number }
    ).c;
    const totalQuestions = (
      await db.prepare('SELECT COUNT(*) as c FROM quiz_questions').get() as { c: number }
    ).c;
    const totalGlossary = (
      await db.prepare('SELECT COUNT(*) as c FROM glossary_terms').get() as { c: number }
    ).c;
    const missedQuestionsCount = (
      await db.prepare('SELECT COUNT(*) as c FROM missed_questions').get() as { c: number }
    ).c;

    const attemptStats = await db
      .prepare(
        `SELECT COUNT(*) as totalAttempts, COALESCE(AVG(percentage), 0) as avgPercentage
         FROM quiz_attempts`
      )
      .get() as { totalAttempts: number; avgPercentage: number };

    const disciplines = await db
      .prepare(
        `SELECT
          d.slug, d.name, d.greek_title as greekTitle, d.transliteration, d.subtitle,
          d.description, d.icon, d.accent_color as accentColor, d.sort_order as sortOrder,
          (SELECT COUNT(*) FROM topics t WHERE t.discipline_slug = d.slug) as totalTopics,
          (SELECT COUNT(*) FROM topics t JOIN topic_progress tp ON tp.topic_slug = t.slug WHERE t.discipline_slug = d.slug AND tp.studied = 1) as studiedTopics,
          (SELECT COUNT(*) FROM quiz_questions qq WHERE qq.discipline_slug = d.slug) as questionCount,
          (SELECT COUNT(*) FROM sources s JOIN topics t ON t.slug = s.topic_slug WHERE t.discipline_slug = d.slug) as sourceCount,
          (SELECT COUNT(*) FROM attachments a JOIN topics t ON t.slug = a.topic_slug WHERE t.discipline_slug = d.slug) as attachmentCount,
          (SELECT MAX(qa.percentage) FROM quiz_attempts qa WHERE qa.discipline_slug = d.slug) as bestQuizScore,
          (SELECT COUNT(*) FROM quiz_attempts qa WHERE qa.discipline_slug = d.slug) as attemptCount
        FROM disciplines d
        ORDER BY d.sort_order ASC`
      )
      .all();

    const recentAttempts = await db
      .prepare(
        `SELECT id, title, mode, discipline_slug as disciplineSlug, topic_slug as topicSlug,
                score, total_questions as totalQuestions, percentage, duration_seconds as durationSeconds,
                created_at as createdAt
         FROM quiz_attempts
         ORDER BY id DESC
         LIMIT 6`
      )
      .all();

    const notebookItems = await db
      .prepare(
        `SELECT
          t.slug, t.title, t.subtitle, t.discipline_slug as disciplineSlug,
          d.name as disciplineName, tp.studied, tp.bookmarked, tp.notes,
          tp.last_studied_at as lastStudiedAt
        FROM topic_progress tp
        JOIN topics t ON t.slug = tp.topic_slug
        JOIN disciplines d ON d.slug = t.discipline_slug
        WHERE tp.studied = 1 OR tp.bookmarked = 1 OR trim(tp.notes) != ''
        ORDER BY tp.last_studied_at DESC`
      )
      .all();

    res.json({
      totals: {
        disciplines: totalDisciplines,
        topics: totalTopics,
        studiedTopics,
        bookmarkedTopics,
        notesCount,
        sources: totalSources,
        attachments: totalAttachments,
        questions: totalQuestions,
        glossary: totalGlossary,
        quizAttempts: attemptStats.totalAttempts,
        averageQuizPercentage: Math.round(attemptStats.avgPercentage * 10) / 10,
        missedQuestions: missedQuestionsCount,
      },
      disciplines,
      recentAttempts,
      notebookItems,
    });
  });

  // ---------------------------------------------------------------------------
  // Disciplines
  // ---------------------------------------------------------------------------
  app.get('/api/disciplines', async (_req, res) => {
    const rows = await db
      .prepare(
        `SELECT
          d.slug, d.name, d.greek_title as greekTitle, d.transliteration, d.subtitle,
          d.description, d.icon, d.accent_color as accentColor, d.sort_order as sortOrder,
          (SELECT COUNT(*) FROM topics t WHERE t.discipline_slug = d.slug) as topicCount,
          (SELECT COUNT(*) FROM topics t JOIN topic_progress tp ON tp.topic_slug = t.slug WHERE t.discipline_slug = d.slug AND tp.studied = 1) as studiedCount,
          (SELECT COUNT(*) FROM sources s JOIN topics t ON t.slug = s.topic_slug WHERE t.discipline_slug = d.slug) as sourceCount,
          (SELECT COUNT(*) FROM attachments a JOIN topics t ON t.slug = a.topic_slug WHERE t.discipline_slug = d.slug) as attachmentCount,
          (SELECT COUNT(*) FROM quiz_questions qq WHERE qq.discipline_slug = d.slug) as questionCount,
          (SELECT MAX(qa.percentage) FROM quiz_attempts qa WHERE qa.discipline_slug = d.slug) as bestQuizPercentage
        FROM disciplines d
        ORDER BY d.sort_order ASC`
      )
      .all();

    res.json(rows);
  });

  // ---------------------------------------------------------------------------
  // Topics List & Creation
  // ---------------------------------------------------------------------------
  app.get('/api/topics', async (req, res) => {
    const { discipline, search, difficulty, status } = req.query as Record<
      string,
      string | undefined
    >;

    const conditions: string[] = [];
    const params: Array<string | number> = [];

    if (discipline && discipline !== 'all') {
      conditions.push('t.discipline_slug = ?');
      params.push(discipline);
    }
    if (difficulty && difficulty !== 'all') {
      conditions.push('t.difficulty = ?');
      params.push(difficulty);
    }
    if (status === 'studied') {
      conditions.push('COALESCE(tp.studied, 0) = 1');
    } else if (status === 'unstudied') {
      conditions.push('COALESCE(tp.studied, 0) = 0');
    } else if (status === 'bookmarked') {
      conditions.push('COALESCE(tp.bookmarked, 0) = 1');
    }
    if (search && search.trim()) {
      const like = `%${search.trim()}%`;
      conditions.push(
        '(t.title LIKE ? OR t.subtitle LIKE ? OR t.summary LIKE ? OR t.era LIKE ? OR t.sections_json LIKE ? OR t.key_terms_json LIKE ?)'
      );
      params.push(like, like, like, like, like, like);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const rows = await db
      .prepare(
        `SELECT
          t.id, t.slug, t.discipline_slug as disciplineSlug,
          d.name as disciplineName, d.greek_title as disciplineGreek, d.accent_color as accentColor,
          t.title, t.subtitle, t.summary, t.difficulty,
          t.reading_minutes as readingMinutes, t.era, t.scripture_refs_json as scriptureRefsJson,
          t.is_custom as isCustom,
          COALESCE(tp.studied, 0) as studied,
          COALESCE(tp.bookmarked, 0) as bookmarked,
          CASE WHEN tp.notes IS NOT NULL AND trim(tp.notes) != '' THEN 1 ELSE 0 END as hasNotes,
          (SELECT COUNT(*) FROM sources s WHERE s.topic_slug = t.slug) as sourceCount,
          (SELECT COUNT(*) FROM attachments a WHERE a.topic_slug = t.slug) as attachmentCount,
          (SELECT COUNT(*) FROM quiz_questions qq WHERE qq.topic_slug = t.slug) as questionCount
        FROM topics t
        JOIN disciplines d ON d.slug = t.discipline_slug
        LEFT JOIN topic_progress tp ON tp.topic_slug = t.slug
        ${whereClause}
        ORDER BY d.sort_order ASC, t.id ASC`
      )
      .all(...params) as Array<Record<string, unknown>>;

    const formatted = rows.map((r) => ({
      ...r,
      scriptureRefs: safeJsonParse<string[]>(r.scriptureRefsJson as string, []),
      studied: Boolean(r.studied),
      bookmarked: Boolean(r.bookmarked),
      hasNotes: Boolean(r.hasNotes),
      isCustom: Boolean(r.isCustom),
    }));

    res.json(formatted);
  });

  app.get('/api/topics/:slug', async (req, res) => {
    const { slug } = req.params;
    const topicRow = await db
      .prepare(
        `SELECT
          t.*, d.name as disciplineName, d.greek_title as disciplineGreek,
          d.transliteration as disciplineTransliteration, d.accent_color as accentColor
        FROM topics t
        JOIN disciplines d ON d.slug = t.discipline_slug
        WHERE t.slug = ?`
      )
      .get(slug) as Record<string, unknown> | undefined;

    if (!topicRow) {
      res.status(404).json({ error: 'Topic not found' });
      return;
    }

    const attachmentsRaw = await db
      .prepare(
        `SELECT
          a.id, a.topic_slug as topicSlug, a.source_id as sourceId,
          a.title, a.description, a.file_name as fileName,
          a.mime_type as mimeType, a.file_size as fileSize,
          a.attachment_kind as attachmentKind, a.preview_text as previewText,
          a.is_custom as isCustom, a.created_at as createdAt,
          s.title as sourceTitle, s.url as sourceUrl
        FROM attachments a
        LEFT JOIN sources s ON s.id = a.source_id
        WHERE a.topic_slug = ?
        ORDER BY a.id ASC`
      )
      .all(slug) as Array<Record<string, unknown>>;

    const attachments = attachmentsRaw.map((a) => ({
      ...a,
      sourceId: (a.sourceId as number | null) ?? null,
      isCustom: Boolean(a.isCustom),
      fileUrl: `/api/attachments/${a.id}/file`,
      downloadUrl: `/api/attachments/${a.id}/file?download=1`,
    }));

    const sourcesRaw = await db
      .prepare(
        `SELECT
          id, topic_slug as topicSlug, title, author, year, repository,
          source_type as sourceType, url, citation, summary,
          is_custom as isCustom, created_at as createdAt
        FROM sources
        WHERE topic_slug = ?
        ORDER BY id ASC`
      )
      .all(slug) as Array<Record<string, unknown>>;

    const sources = sourcesRaw.map((s) => ({
      ...s,
      isCustom: Boolean(s.isCustom),
      attachments: attachments.filter((a) => a.sourceId === s.id),
    }));

    const relatedSlugs = safeJsonParse<string[]>(
      topicRow.related_topic_slugs_json as string,
      []
    );
    const relatedTopics: Array<Record<string, unknown>> = [];
    if (relatedSlugs.length > 0) {
      const placeholders = relatedSlugs.map(() => '?').join(',');
      const relRows = await db
        .prepare(
          `SELECT t.slug, t.title, t.subtitle, t.difficulty, t.discipline_slug as disciplineSlug, d.name as disciplineName
           FROM topics t
           JOIN disciplines d ON d.slug = t.discipline_slug
           WHERE t.slug IN (${placeholders})`
        )
        .all(...relatedSlugs) as Array<Record<string, unknown>>;
      relatedTopics.push(...relRows);
    }

    const progressRow = await db
      .prepare(
        `SELECT studied, bookmarked, notes, last_studied_at as lastStudiedAt
         FROM topic_progress
         WHERE topic_slug = ?`
      )
      .get(slug) as
      | { studied: number; bookmarked: number; notes: string; lastStudiedAt: string }
      | undefined;

    const quizSummary = await db
      .prepare(
        `SELECT
          (SELECT COUNT(*) FROM quiz_questions WHERE topic_slug = ?) as questionCount,
          (SELECT COUNT(*) FROM quiz_attempts WHERE topic_slug = ?) as attemptCount,
          (SELECT MAX(percentage) FROM quiz_attempts WHERE topic_slug = ?) as bestPercentage`
      )
      .get(slug, slug, slug) as {
      questionCount: number;
      attemptCount: number;
      bestPercentage: number | null;
    };

    res.json({
      id: topicRow.id,
      slug: topicRow.slug,
      disciplineSlug: topicRow.discipline_slug,
      disciplineName: topicRow.disciplineName,
      disciplineGreek: topicRow.disciplineGreek,
      disciplineTransliteration: topicRow.disciplineTransliteration,
      accentColor: topicRow.accentColor,
      title: topicRow.title,
      subtitle: topicRow.subtitle,
      summary: topicRow.summary,
      difficulty: topicRow.difficulty,
      readingMinutes: topicRow.reading_minutes,
      era: topicRow.era,
      isCustom: Boolean(topicRow.is_custom),
      scriptureRefs: safeJsonParse(topicRow.scripture_refs_json as string, []),
      sections: safeJsonParse(topicRow.sections_json as string, []),
      excerpts: safeJsonParse(topicRow.excerpts_json as string, []),
      perspectives: safeJsonParse(topicRow.perspectives_json as string, []),
      keyTerms: safeJsonParse(topicRow.key_terms_json as string, []),
      relatedTopics,
      sources,
      attachments,
      progress: {
        studied: Boolean(progressRow?.studied),
        bookmarked: Boolean(progressRow?.bookmarked),
        notes: progressRow?.notes || '',
        lastStudiedAt: progressRow?.lastStudiedAt || null,
      },
      quizSummary,
    });
  });

  // Create custom topic
  app.post('/api/topics', async (req, res) => {
    const {
      disciplineSlug,
      title,
      subtitle,
      summary,
      difficulty = 'Intermediate',
      readingMinutes = 10,
      era = 'Historical & Contemporary',
      scriptureRefs = [],
      sections = [],
      excerpts = [],
    } = req.body || {};

    if (!disciplineSlug || !title || !summary) {
      res.status(400).json({ error: 'disciplineSlug, title, and summary are required.' });
      return;
    }

    const disc = await db.prepare('SELECT slug FROM disciplines WHERE slug = ?').get(disciplineSlug);
    if (!disc) {
      res.status(400).json({ error: 'Invalid disciplineSlug.' });
      return;
    }

    let candidateSlug = slugify(title);
    if (!candidateSlug) candidateSlug = `topic-${Date.now()}`;
    const existing = await db.prepare('SELECT slug FROM topics WHERE slug = ?').get(candidateSlug);
    if (existing) {
      candidateSlug = `${candidateSlug}-${Date.now().toString().slice(-4)}`;
    }

    const normalizedSections =
      Array.isArray(sections) && sections.length > 0
        ? sections
        : [{ heading: 'Theological Exposition', body: summary }];

    await db.prepare(
      `INSERT INTO topics (
        slug, discipline_slug, title, subtitle, summary, difficulty, reading_minutes, era,
        scripture_refs_json, sections_json, excerpts_json, perspectives_json, key_terms_json,
        related_topic_slugs_json, is_custom
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '[]', '[]', '[]', 1)`
    ).run(
      candidateSlug,
      disciplineSlug,
      String(title).trim(),
      String(subtitle || 'Custom Theological Study Module').trim(),
      String(summary).trim(),
      difficulty,
      Number(readingMinutes) || 10,
      String(era).trim(),
      JSON.stringify(Array.isArray(scriptureRefs) ? scriptureRefs : []),
      JSON.stringify(normalizedSections),
      JSON.stringify(Array.isArray(excerpts) ? excerpts : [])
    );

    res.status(201).json({ slug: candidateSlug });
  });

  // Update study progress & personal notes
  app.put('/api/topics/:slug/progress', async (req, res) => {
    const { slug } = req.params;
    const topicExists = await db.prepare('SELECT slug FROM topics WHERE slug = ?').get(slug);
    if (!topicExists) {
      res.status(404).json({ error: 'Topic not found' });
      return;
    }

    const current = await db
      .prepare('SELECT studied, bookmarked, notes FROM topic_progress WHERE topic_slug = ?')
      .get(slug) as { studied: number; bookmarked: number; notes: string } | undefined;

    const nextStudied =
      req.body.studied !== undefined ? (req.body.studied ? 1 : 0) : (current?.studied ?? 0);
    const nextBookmarked =
      req.body.bookmarked !== undefined
        ? req.body.bookmarked
          ? 1
          : 0
        : (current?.bookmarked ?? 0);
    const nextNotes =
      req.body.notes !== undefined ? String(req.body.notes) : (current?.notes ?? '');

    await db.prepare(
      `INSERT INTO topic_progress (topic_slug, studied, bookmarked, notes, last_studied_at)
       VALUES (?, ?, ?, ?, datetime('now'))
       ON CONFLICT(topic_slug) DO UPDATE SET
         studied = excluded.studied,
         bookmarked = excluded.bookmarked,
         notes = excluded.notes,
         last_studied_at = datetime('now')`
    ).run(slug, nextStudied, nextBookmarked, nextNotes);

    res.json({
      topicSlug: slug,
      studied: Boolean(nextStudied),
      bookmarked: Boolean(nextBookmarked),
      notes: nextNotes,
    });
  });

  // ---------------------------------------------------------------------------
  // Online Sources & Live Discovery
  // ---------------------------------------------------------------------------
  app.get('/api/sources/discover', async (req, res) => {
    const q = String(req.query.q || '');
    const discovered = await discoverOnlineResources(q);
    res.json(discovered);
  });

  app.get('/api/sources', async (req, res) => {
    const { discipline, repository, sourceType, search } = req.query as Record<
      string,
      string | undefined
    >;

    const conditions: string[] = [];
    const params: string[] = [];

    if (discipline && discipline !== 'all') {
      conditions.push('t.discipline_slug = ?');
      params.push(discipline);
    }
    if (repository && repository !== 'all') {
      conditions.push('s.repository = ?');
      params.push(repository);
    }
    if (sourceType && sourceType !== 'all') {
      conditions.push('s.source_type = ?');
      params.push(sourceType);
    }
    if (search && search.trim()) {
      const like = `%${search.trim()}%`;
      conditions.push(
        '(s.title LIKE ? OR s.author LIKE ? OR s.summary LIKE ? OR t.title LIKE ?)'
      );
      params.push(like, like, like, like);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const sourcesRows = await db
      .prepare(
        `SELECT
          s.id, s.topic_slug as topicSlug, t.title as topicTitle,
          t.discipline_slug as disciplineSlug, d.name as disciplineName,
          s.title, s.author, s.year, s.repository, s.source_type as sourceType,
          s.url, s.citation, s.summary, s.is_custom as isCustom, s.created_at as createdAt
        FROM sources s
        JOIN topics t ON t.slug = s.topic_slug
        JOIN disciplines d ON d.slug = t.discipline_slug
        ${whereClause}
        ORDER BY d.sort_order ASC, s.id DESC`
      )
      .all(...params) as Array<Record<string, unknown>>;

    const allAttachments = await db
      .prepare(
        `SELECT
          id, topic_slug as topicSlug, source_id as sourceId, title, description,
          file_name as fileName, mime_type as mimeType, file_size as fileSize,
          attachment_kind as attachmentKind, preview_text as previewText,
          is_custom as isCustom, created_at as createdAt
        FROM attachments
        WHERE source_id IS NOT NULL`
      )
      .all() as Array<Record<string, unknown>>;

    const formatted = sourcesRows.map((s) => ({
      ...s,
      isCustom: Boolean(s.isCustom),
      attachments: allAttachments
        .filter((a) => a.sourceId === s.id)
        .map((a) => ({
          ...a,
          isCustom: Boolean(a.isCustom),
          fileUrl: `/api/attachments/${a.id}/file`,
          downloadUrl: `/api/attachments/${a.id}/file?download=1`,
        })),
    }));

    res.json(formatted);
  });

  app.post('/api/sources', async (req, res) => {
    const {
      topicSlug,
      title,
      author = 'Scholarly / Historical Author',
      year = '',
      repository = 'User Contributed',
      sourceType = 'Primary Text',
      url,
      citation = '',
      summary = '',
    } = req.body || {};

    if (!topicSlug || !title || !url) {
      res.status(400).json({ error: 'topicSlug, title, and url are required.' });
      return;
    }

    const topic = await db.prepare('SELECT slug FROM topics WHERE slug = ?').get(topicSlug);
    if (!topic) {
      res.status(404).json({ error: 'Target topic not found.' });
      return;
    }

    let normalizedUrl = String(url).trim();
    if (!/^https?:\/\//i.test(normalizedUrl)) {
      normalizedUrl = `https://${normalizedUrl}`;
    }

    const result = await db
      .prepare(
        `INSERT INTO sources (
          topic_slug, title, author, year, repository, source_type, url, citation, summary, is_custom
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`
      )
      .run(
        topicSlug,
        String(title).trim(),
        String(author).trim(),
        String(year).trim(),
        String(repository).trim(),
        String(sourceType).trim(),
        normalizedUrl,
        String(citation).trim(),
        String(summary).trim()
      );

    res.status(201).json({
      id: Number(result.lastInsertRowid),
      topicSlug,
      title,
      url: normalizedUrl,
    });
  });

  app.delete('/api/sources/:id', async (req, res) => {
    const id = Number(req.params.id);
    const row = await db.prepare('SELECT id, is_custom FROM sources WHERE id = ?').get(id) as
      | { id: number; is_custom: number }
      | undefined;
    if (!row) {
      res.status(404).json({ error: 'Source not found' });
      return;
    }
    if (!row.is_custom) {
      res.status(403).json({ error: 'Built-in canonical library sources cannot be deleted.' });
      return;
    }
    await db.prepare('DELETE FROM sources WHERE id = ?').run(id);
    res.json({ deleted: true });
  });

  // ---------------------------------------------------------------------------
  // Attachments (Linked to Online Sources and/or Topics)
  // ---------------------------------------------------------------------------
  app.get('/api/attachments', async (req, res) => {
    const { discipline, kind, search } = req.query as Record<string, string | undefined>;
    const conditions: string[] = [];
    const params: string[] = [];

    if (discipline && discipline !== 'all') {
      conditions.push('t.discipline_slug = ?');
      params.push(discipline);
    }
    if (kind && kind !== 'all') {
      conditions.push('a.attachment_kind = ?');
      params.push(kind);
    }
    if (search && search.trim()) {
      const like = `%${search.trim()}%`;
      conditions.push(
        '(a.title LIKE ? OR a.description LIKE ? OR a.preview_text LIKE ? OR t.title LIKE ?)'
      );
      params.push(like, like, like, like);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';

    const rows = await db
      .prepare(
        `SELECT
          a.id, a.topic_slug as topicSlug, t.title as topicTitle,
          t.discipline_slug as disciplineSlug, d.name as disciplineName,
          a.source_id as sourceId, s.title as sourceTitle, s.url as sourceUrl,
          a.title, a.description, a.file_name as fileName, a.mime_type as mimeType,
          a.file_size as fileSize, a.attachment_kind as attachmentKind,
          a.preview_text as previewText, a.is_custom as isCustom, a.created_at as createdAt
        FROM attachments a
        JOIN topics t ON t.slug = a.topic_slug
        JOIN disciplines d ON d.slug = t.discipline_slug
        LEFT JOIN sources s ON s.id = a.source_id
        ${whereClause}
        ORDER BY a.is_custom DESC, a.id DESC`
      )
      .all(...params) as Array<Record<string, unknown>>;

    res.json(
      rows.map((a) => ({
        ...a,
        isCustom: Boolean(a.isCustom),
        fileUrl: `/api/attachments/${a.id}/file`,
        downloadUrl: `/api/attachments/${a.id}/file?download=1`,
      }))
    );
  });

  app.post('/api/attachments', upload.single('file'), async (req, res) => {
    const {
      topicSlug,
      sourceId,
      title,
      description = '',
      attachmentKind = 'Uploaded Document',
      textContent,
    } = req.body || {};

    if (!topicSlug || !title) {
      res.status(400).json({ error: 'topicSlug and title are required.' });
      return;
    }

    const topic = await db.prepare('SELECT slug FROM topics WHERE slug = ?').get(topicSlug);
    if (!topic) {
      res.status(404).json({ error: 'Target topic not found.' });
      return;
    }

    const numericSourceId =
      sourceId && String(sourceId).trim() !== '' && !Number.isNaN(Number(sourceId))
        ? Number(sourceId)
        : null;

    if (numericSourceId !== null) {
      const srcRow = await db.prepare('SELECT id FROM sources WHERE id = ?').get(numericSourceId);
      if (!srcRow) {
        res.status(400).json({ error: 'Linked sourceId does not exist.' });
        return;
      }
    }

    let fileName = '';
    let storedPath = '';
    let mimeType = 'text/markdown; charset=utf-8';
    let fileSize = 0;
    let previewText = '';
    let content: Buffer;

    if (req.file) {
      fileName = path.basename(req.file.originalname).slice(0, 240) || 'attachment';
      mimeType = req.file.mimetype || 'application/octet-stream';
      content = req.file.buffer;
      storedPath = await storeAttachment(fileName, content, mimeType);
      fileSize = content.byteLength;

      // Extract readable preview for text-based attachments
      if (
        mimeType.startsWith('text/') ||
        /\.(md|markdown|txt|csv|json)$/i.test(fileName)
      ) {
        previewText = content.toString('utf8').slice(0, 24000);
      }
    } else if (typeof textContent === 'string' && textContent.trim().length > 0) {
      fileName = `${slugify(title) || 'study-note'}.md`;
      content = Buffer.from(textContent, 'utf8');
      storedPath = await storeAttachment(fileName, content, mimeType);
      fileSize = content.byteLength;
      previewText = textContent.slice(0, 24000);
    } else {
      res.status(400).json({
        error: 'Provide either an uploaded file or markdown/text content.',
      });
      return;
    }

    const result = await db
      .prepare(
        `INSERT INTO attachments (
          topic_slug, source_id, title, description, file_name, stored_path,
          mime_type, file_size, attachment_kind, preview_text, is_custom
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`
      )
      .run(
        topicSlug,
        numericSourceId,
        String(title).trim(),
        String(description).trim(),
        fileName,
        storedPath,
        mimeType,
        fileSize,
        String(attachmentKind).trim(),
        previewText
      );

    const newId = Number(result.lastInsertRowid);
    res.status(201).json({
      id: newId,
      topicSlug,
      sourceId: numericSourceId,
      title,
      fileName,
      mimeType,
      fileSize,
      fileUrl: `/api/attachments/${newId}/file`,
      downloadUrl: `/api/attachments/${newId}/file?download=1`,
    });
  });

  app.get('/api/attachments/:id/file', async (req, res) => {
    const id = Number(req.params.id);
    const row = await db
      .prepare(
        'SELECT file_name as fileName, stored_path as storedPath, mime_type as mimeType FROM attachments WHERE id = ?'
      )
      .get(id) as { fileName: string; storedPath: string; mimeType: string } | undefined;

    if (!row) {
      res.status(404).json({ error: 'Attachment file not found' });
      return;
    }

    if (row.storedPath.startsWith('seed-attachments/')) {
      res.redirect(302, `/${row.storedPath}`);
      return;
    }

    const mime = row.mimeType.toLowerCase().split(';', 1)[0].trim();
    const canPreview = /^(?:application\/pdf|image\/(?:jpeg|png|gif|webp|avif|bmp)|text\/(?:plain|markdown))$/.test(mime);
    const isDownload = req.query.download === '1' || !canPreview;
    res.attachment(row.fileName);
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.type(canPreview ? mime : 'application/octet-stream');
    if (!isDownload) {
      const disposition = String(res.getHeader('Content-Disposition'));
      res.setHeader('Content-Disposition', disposition.replace(/^attachment/, 'inline'));
    }

    if (/^https?:\/\//i.test(row.storedPath)) {
      const blobResponse = await fetch(row.storedPath);
      if (!blobResponse.ok) {
        res.status(404).json({ error: 'Attachment file not found' });
        return;
      }
      res.send(Buffer.from(await blobResponse.arrayBuffer()));
      return;
    }

    if (!fs.existsSync(row.storedPath)) {
      res.status(404).json({ error: 'Attachment file not found' });
      return;
    }
    fs.createReadStream(row.storedPath).pipe(res);
  });

  app.delete('/api/attachments/:id', async (req, res) => {
    const id = Number(req.params.id);
    const row = await db
      .prepare('SELECT id, stored_path as storedPath, is_custom as isCustom FROM attachments WHERE id = ?')
      .get(id) as { id: number; storedPath: string; isCustom: number } | undefined;

    if (!row) {
      res.status(404).json({ error: 'Attachment not found' });
      return;
    }
    if (!row.isCustom) {
      res.status(403).json({ error: 'Built-in study attachments cannot be deleted.' });
      return;
    }

    await db.prepare('DELETE FROM attachments WHERE id = ?').run(id);
    if (/^https?:\/\//i.test(row.storedPath)) {
      try {
        await del(row.storedPath);
      } catch {
        // Keep the attachment record deletion authoritative if object cleanup fails.
      }
    } else if (row.storedPath && fs.existsSync(row.storedPath)) {
      try {
        fs.unlinkSync(row.storedPath);
      } catch {
        // Ignore cleanup errors
      }
    }
    res.json({ deleted: true });
  });

  // ---------------------------------------------------------------------------
  // Glossary / Lexicon
  // ---------------------------------------------------------------------------
  app.get('/api/glossary', async (req, res) => {
    const { search, language, category } = req.query as Record<string, string | undefined>;
    const conditions: string[] = [];
    const params: string[] = [];

    if (language && language !== 'all') {
      conditions.push('g.language = ?');
      params.push(language);
    }
    if (category && category !== 'all') {
      conditions.push('g.category = ?');
      params.push(category);
    }
    if (search && search.trim()) {
      const like = `%${search.trim()}%`;
      conditions.push(
        '(g.term LIKE ? OR g.transliteration LIKE ? OR g.definition LIKE ? OR g.original_script LIKE ?)'
      );
      params.push(like, like, like, like);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const rows = await db
      .prepare(
        `SELECT
          g.id, g.term, g.original_script as originalScript, g.language,
          g.transliteration, g.pronunciation, g.category, g.definition,
          g.related_topic_slug as relatedTopicSlug, t.title as relatedTopicTitle
        FROM glossary_terms g
        LEFT JOIN topics t ON t.slug = g.related_topic_slug
        ${whereClause}
        ORDER BY g.term ASC`
      )
      .all(...params);

    res.json(rows);
  });

  // ---------------------------------------------------------------------------
  // Quizzes & Catechetical Examination Engine
  // ---------------------------------------------------------------------------
  app.get('/api/quizzes/overview', async (_req, res) => {
    const byDiscipline = await db
      .prepare(
        `SELECT
          d.slug, d.name, d.greek_title as greekTitle, d.subtitle, d.icon, d.accent_color as accentColor,
          (SELECT COUNT(*) FROM quiz_questions qq WHERE qq.discipline_slug = d.slug) as questionCount,
          (SELECT COUNT(*) FROM topics t WHERE t.discipline_slug = d.slug) as topicCount,
          (SELECT MAX(qa.percentage) FROM quiz_attempts qa WHERE qa.discipline_slug = d.slug) as bestPercentage,
          (SELECT COUNT(*) FROM quiz_attempts qa WHERE qa.discipline_slug = d.slug) as attemptCount
        FROM disciplines d
        ORDER BY d.sort_order ASC`
      )
      .all();

    const byTopic = await db
      .prepare(
        `SELECT
          t.slug, t.title, t.discipline_slug as disciplineSlug, d.name as disciplineName,
          t.difficulty,
          (SELECT COUNT(*) FROM quiz_questions qq WHERE qq.topic_slug = t.slug) as questionCount,
          (SELECT MAX(qa.percentage) FROM quiz_attempts qa WHERE qa.topic_slug = t.slug) as bestPercentage,
          (SELECT COUNT(*) FROM quiz_attempts qa WHERE qa.topic_slug = t.slug) as attemptCount
        FROM topics t
        JOIN disciplines d ON d.slug = t.discipline_slug
        ORDER BY d.sort_order ASC, t.id ASC`
      )
      .all();

    const missedCount = (
      await db.prepare('SELECT COUNT(*) as c FROM missed_questions').get() as { c: number }
    ).c;

    const history = await db
      .prepare(
        `SELECT
          id, title, mode, discipline_slug as disciplineSlug, topic_slug as topicSlug,
          score, total_questions as totalQuestions, percentage,
          duration_seconds as durationSeconds, created_at as createdAt
        FROM quiz_attempts
        ORDER BY id DESC
        LIMIT 20`
      )
      .all();

    res.json({
      byDiscipline,
      byTopic,
      missedCount,
      history,
    });
  });

  app.post('/api/quizzes/generate', async (req, res) => {
    const {
      scope = 'discipline',
      topicSlug,
      disciplineSlug,
      disciplineSlugs,
      difficulty = 'all',
      count = 10,
    } = req.body || {};

    const conditions: string[] = [];
    const params: Array<string | number> = [];
    let quizTitle = 'Comprehensive Paideia Examination';

    if (scope === 'topic' && topicSlug) {
      conditions.push('qq.topic_slug = ?');
      params.push(topicSlug);
      const t = await db.prepare('SELECT title FROM topics WHERE slug = ?').get(topicSlug) as
        | { title: string }
        | undefined;
      quizTitle = t ? `Topic Quiz: ${t.title}` : 'Topic Quiz';
    } else if (scope === 'discipline' && disciplineSlug) {
      conditions.push('qq.discipline_slug = ?');
      params.push(disciplineSlug);
      const d = await db.prepare('SELECT name FROM disciplines WHERE slug = ?').get(disciplineSlug) as
        | { name: string }
        | undefined;
      quizTitle = d ? `${d.name} Examination` : 'Discipline Quiz';
    } else if (
      scope === 'custom' &&
      Array.isArray(disciplineSlugs) &&
      disciplineSlugs.length > 0
    ) {
      const placeholders = disciplineSlugs.map(() => '?').join(',');
      conditions.push(`qq.discipline_slug IN (${placeholders})`);
      params.push(...disciplineSlugs);
      quizTitle =
        disciplineSlugs.length === 1
          ? 'Focused Theological Examination'
          : `Multi-Discipline Synod Exam (${disciplineSlugs.length} Wings)`;
    } else if (scope === 'missed') {
      conditions.push('qq.id IN (SELECT question_id FROM missed_questions)');
      quizTitle = 'Review Missed Questions';
    }

    if (difficulty && difficulty !== 'all' && scope !== 'missed') {
      conditions.push('qq.difficulty = ?');
      params.push(difficulty);
    }

    const whereClause = conditions.length > 0 ? `WHERE ${conditions.join(' AND ')}` : '';
    const maxCount = Math.max(1, Math.min(Number(count) || 10, 50));

    const rows = await db
      .prepare(
        `SELECT
          qq.id, qq.topic_slug as topicSlug, t.title as topicTitle,
          qq.discipline_slug as disciplineSlug, d.name as disciplineName,
          qq.question_type as questionType, qq.difficulty,
          qq.prompt, qq.excerpt_context as excerptContext,
          qq.options_json as optionsJson
        FROM quiz_questions qq
        JOIN topics t ON t.slug = qq.topic_slug
        JOIN disciplines d ON d.slug = qq.discipline_slug
        ${whereClause}
        ORDER BY RANDOM()
        LIMIT ?`
      )
      .all(...params, maxCount) as Array<Record<string, unknown>>;

    const questions = rows.map((q) => ({
      id: q.id,
      topicSlug: q.topicSlug,
      topicTitle: q.topicTitle,
      disciplineSlug: q.disciplineSlug,
      disciplineName: q.disciplineName,
      questionType: q.questionType,
      difficulty: q.difficulty,
      prompt: q.prompt,
      excerptContext: q.excerptContext,
      options: safeJsonParse<string[]>(q.optionsJson as string, []),
    }));

    res.json({
      title: quizTitle,
      scope,
      topicSlug: scope === 'topic' ? topicSlug : null,
      disciplineSlug: scope === 'discipline' ? disciplineSlug : null,
      questions,
    });
  });

  app.post('/api/quizzes/check', async (req, res) => {
    const { questionId, selectedIndex } = req.body ?? {};
    if (!Number.isSafeInteger(questionId) || !Number.isSafeInteger(selectedIndex) || selectedIndex < 0) {
      return res.status(400).json({ error: 'Choose a valid answer first.' });
    }
    const question = await db.prepare(
      'SELECT correct_index as correctIndex, options_json as optionsJson, explanation, source_reference as sourceReference FROM quiz_questions WHERE id = ?'
    ).get(questionId);
    if (!question) return res.status(404).json({ error: 'Question no longer available.' });
    if (selectedIndex >= safeJsonParse<string[]>(String(question.optionsJson), []).length) {
      return res.status(400).json({ error: 'Choose a valid answer first.' });
    }
    const { correctIndex, explanation, sourceReference } = question;
    return res.json({ correctIndex, explanation, sourceReference });
  });

  app.post('/api/quizzes/submit', async (req, res) => {
    const {
      title = 'Theological Quiz',
      mode = 'study',
      disciplineSlug = null,
      topicSlug = null,
      durationSeconds = 0,
      answers = [],
    } = req.body || {};

    if (!Array.isArray(answers) || answers.length === 0 || answers.length > 50 ||
        !answers.every((answer) => Number.isSafeInteger(answer?.questionId) && Number.isSafeInteger(answer?.selectedIndex)) ||
        new Set(answers.map((answer) => answer.questionId)).size !== answers.length) {
      res.status(400).json({ error: 'Submit between 1 and 50 distinct questions with integer answer indices.' });
      return;
    }

    const getQuestion = await db.prepare(
      `SELECT
        qq.id, qq.topic_slug as topicSlug, t.title as topicTitle,
        qq.discipline_slug as disciplineSlug, d.name as disciplineName,
        qq.prompt, qq.options_json as optionsJson, qq.correct_index as correctIndex,
        qq.explanation, qq.source_reference as sourceReference
       FROM quiz_questions qq
       JOIN topics t ON t.slug = qq.topic_slug
       JOIN disciplines d ON d.slug = qq.discipline_slug
       WHERE qq.id = ?`
    );

    let score = 0;
    const gradedDetails: Array<Record<string, unknown>> = [];

    for (const ans of answers) {
      const qRow = await getQuestion.get(Number(ans.questionId)) as Record<string, unknown> | undefined;
      if (!qRow) continue;

      const selectedIndex = Number(ans.selectedIndex);
      const correctIndex = Number(qRow.correctIndex);
      const isCorrect = selectedIndex === correctIndex;
      if (isCorrect) score += 1;

      gradedDetails.push({
        questionId: qRow.id,
        topicSlug: qRow.topicSlug,
        topicTitle: qRow.topicTitle,
        disciplineSlug: qRow.disciplineSlug,
        disciplineName: qRow.disciplineName,
        prompt: qRow.prompt,
        options: safeJsonParse<string[]>(qRow.optionsJson as string, []),
        selectedIndex,
        correctIndex,
        isCorrect,
        explanation: qRow.explanation,
        sourceReference: qRow.sourceReference,
      });
    }

    const totalQuestions = gradedDetails.length;
    if (totalQuestions === 0) {
      res.status(400).json({ error: 'No valid question IDs submitted.' });
      return;
    }

    const percentage = Math.round((score / totalQuestions) * 1000) / 10;

    let attemptId = 0;
    await db.transaction!(async (transactionDb) => {
      const recordMiss = transactionDb.prepare(
        `INSERT INTO missed_questions (question_id, miss_count, last_missed_at)
         VALUES (?, 1, datetime('now'))
         ON CONFLICT(question_id) DO UPDATE SET
           miss_count = miss_count + 1,
           last_missed_at = datetime('now')`
      );
      const clearMiss = transactionDb.prepare('DELETE FROM missed_questions WHERE question_id = ?');

      for (const detail of gradedDetails) {
        await (detail.isCorrect ? clearMiss : recordMiss).run(Number(detail.questionId));
      }
      const insertRes = await transactionDb
        .prepare(
          `INSERT INTO quiz_attempts (
            title, mode, discipline_slug, topic_slug, score, total_questions,
            percentage, duration_seconds, details_json
          ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
        )
        .run(
          String(title),
          mode === 'exam' ? 'exam' : 'study',
          disciplineSlug || null,
          topicSlug || null,
          score,
          totalQuestions,
          percentage,
          Math.max(0, Number(durationSeconds) || 0),
          JSON.stringify(gradedDetails)
        );
      attemptId = Number(insertRes.lastInsertRowid);
    });

    res.status(201).json({
      attemptId,
      title,
      mode,
      score,
      totalQuestions,
      percentage,
      durationSeconds,
      details: gradedDetails,
    });
  });

  // ---------------------------------------------------------------------------
  // Global Search (Topics, Sources, Attachments, Glossary)
  // ---------------------------------------------------------------------------
  app.get('/api/search', async (req, res) => {
    const q = String(req.query.q || '').trim();
    if (!q) {
      res.json({ topics: [], sources: [], attachments: [], glossary: [] });
      return;
    }
    const like = `%${q}%`;

    const topics = await db
      .prepare(
        `SELECT t.slug, t.title, t.subtitle, t.discipline_slug as disciplineSlug, d.name as disciplineName
         FROM topics t
         JOIN disciplines d ON d.slug = t.discipline_slug
         WHERE t.title LIKE ? OR t.subtitle LIKE ? OR t.summary LIKE ? OR t.sections_json LIKE ? OR t.key_terms_json LIKE ? OR t.excerpts_json LIKE ?
         LIMIT 8`
      )
      .all(like, like, like, like, like, like);

    const sources = await db
      .prepare(
        `SELECT s.id, s.title, s.author, s.repository, s.url, s.topic_slug as topicSlug, t.title as topicTitle
         FROM sources s
         JOIN topics t ON t.slug = s.topic_slug
         WHERE s.title LIKE ? OR s.author LIKE ? OR s.summary LIKE ?
         LIMIT 6`
      )
      .all(like, like, like);

    const attachments = await db
      .prepare(
        `SELECT a.id, a.title, a.attachment_kind as attachmentKind, a.topic_slug as topicSlug, t.title as topicTitle
         FROM attachments a
         JOIN topics t ON t.slug = a.topic_slug
         WHERE a.title LIKE ? OR a.description LIKE ? OR a.preview_text LIKE ?
         LIMIT 6`
      )
      .all(like, like, like);

    const glossary = await db
      .prepare(
        `SELECT term, original_script as originalScript, language, definition, related_topic_slug as relatedTopicSlug
         FROM glossary_terms
         WHERE term LIKE ? OR transliteration LIKE ? OR definition LIKE ?
         LIMIT 6`
      )
      .all(like, like, like);

    res.json({ topics, sources, attachments, glossary });
  });

  // ---------------------------------------------------------------------------
  // Production SPA Static Serving (Express 5 compatible wildcard)
  // ---------------------------------------------------------------------------
  const distDir = path.resolve(process.cwd(), 'dist');
  if (!process.env.VERCEL && fs.existsSync(distDir)) {
    app.use(express.static(distDir));
    app.get('/{*splat}', async (req, res, next) => {
      if (req.path.startsWith('/api/')) {
        next();
        return;
      }
      const indexHtml = path.join(distDir, 'index.html');
      if (fs.existsSync(indexHtml)) {
        res.sendFile(indexHtml);
      } else {
        next();
      }
    });
  }

  return app;
}
