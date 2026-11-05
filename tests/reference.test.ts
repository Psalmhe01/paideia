import { describe, expect, it } from 'vitest';
import express from 'express';
import request from 'supertest';
import { referenceRouter } from '../server/reference.js';
import { bibleUrl, scriptureUrl } from '../shared/reference.js';
import { ALL_SEED_TOPICS } from '../server/data/index.js';
import { conceptCharts, historyEvents } from '../src/data/atlas.js';
import paths from '../src/data/studyPaths.json' with { type: 'json' };

const app = express().use('/reference', referenceRouter);

describe('Bundled reference collections', () => {
  it('indexes both Bible editions with their full book and chapter counts', async () => {
    const protestant = await request(app).get('/reference/bible/webp/books').expect(200);
    const catholic = await request(app).get('/reference/bible/webc/books').expect(200);
    expect(protestant.body).toHaveLength(66);
    expect(catholic.body).toHaveLength(73);
    const chapters = (books: { chapters: string[] }[]) => books.reduce((total, book) => total + book.chapters.length, 0);
    expect(chapters(protestant.body)).toBe(1189);
    expect(chapters(catholic.body)).toBe(1328);
    expect(catholic.body.find((book: { code: string }) => book.code === 'TOB')).toMatchObject({ title: 'Tobit', testament: 'Old' });

    const john = await request(app).get('/reference/bible/webp/jhn/3').expect(200);
    expect(john.body).toContainEqual(['16', expect.stringContaining('God so loved the world')]);
    await request(app).get('/reference/bible/webc/tob/1').expect(200);
    await request(app).get('/reference/bible/webp/tob/1').expect(404);
    await request(app).get('/reference/bible/webp/jhn/999').expect(404);
    const results = await request(app).get('/reference/bible/webp/search').query({ q: 'loved the world', book: 'JHN' }).expect(200);
    expect(results.body).toContainEqual(expect.objectContaining({ book: 'JHN', chapter: '3', verse: '16' }));
  });

  it('finds lexicon entries by number, original script and transliteration', async () => {
    const entry = await request(app).get('/reference/lexicon/g03056').expect(200);
    expect(entry.body).toMatchObject({ id: 'G3056', lemma: 'λόγος', language: 'Greek' });
    for (const query of ['λογος', 'logos', 'G3056']) {
      const results = await request(app).get('/reference/lexicon').query({ q: query, language: 'Greek' }).expect(200);
      expect(results.body.entries).toContainEqual(expect.objectContaining({ id: 'G3056' }));
      expect(results.body.corpusSize).toBe(14197);
    }
    const hebrew = await request(app).get('/reference/lexicon/H7225').expect(200);
    expect(hebrew.body).toMatchObject({ id: 'H7225', language: 'Hebrew' });
    await request(app).get('/reference/lexicon/G99999').expect(404);
  });

  it('links Scripture citations and every curated path and chart to existing modules', () => {
    expect(scriptureUrl('John 3:16–18')).toBe(bibleUrl('webp', 'JHN', '3', '16'));
    expect(scriptureUrl('Jude 3')).toBe('/bible/webp/jud/1#verse-3');
    expect(scriptureUrl('1 Corinthians 10:1–13')).toBe('/bible/webp/1co/10#verse-1');
    expect(scriptureUrl('Wisdom 3:1')).toBe('/bible/webc/wis/3#verse-1');
    const moduleSlugs = new Set(ALL_SEED_TOPICS.map(({ slug }) => slug));
    expect(paths).toHaveLength(8);
    for (const path of paths) {
      for (const step of path.steps) expect(moduleSlugs.has(step.slug), step.slug).toBe(true);
    }
    for (const item of [...conceptCharts, ...historyEvents]) {
      if (item.topic) expect(moduleSlugs.has(item.topic), item.topic).toBe(true);
    }
  });
});
