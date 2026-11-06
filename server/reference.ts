import { readFileSync } from 'node:fs';
import { gunzipSync } from 'node:zlib';
import { Router } from 'express';
import { bibleBookCodeAliases, bibleEditions, bookTitles, catholicOldTestament, newTestament } from '../shared/reference.js';
import type { BibleBook, BibleEdition, BibleHit, BibleVerse, StrongEntry } from '../shared/reference.js';

function readDataset<T>(name: string): T {
  return JSON.parse(gunzipSync(readFileSync(new URL('./data/reference/' + name + '.json.gz', import.meta.url))).toString('utf8'));
}

function normalize(value: string) {
  return value.normalize('NFKD').replace(/\p{M}/gu, '').toLowerCase().replace(/ς/g, 'σ')
    .replace(/[ʼʻ’']/g, '').replace(/\s+/g, ' ').trim();
}

type BibleText = Record<string, Record<string, BibleVerse[]>>;
const bibles = new Map<BibleEdition, { text: BibleText; books: BibleBook[]; index: { term: string; hit: BibleHit }[] }>();

function getBible(edition: BibleEdition) {
  const cached = bibles.get(edition);
  if (cached) return cached;
  const sourceText = readDataset<BibleText>(edition);
  const text = Object.fromEntries(Object.entries(sourceText).map(([code, chapters]) => [bibleBookCodeAliases[code] ?? code, chapters])) as BibleText;
  const codes = edition === 'webc' ? [...catholicOldTestament, ...newTestament] : Object.keys(text);
  const books: BibleBook[] = codes.map((code) => ({
    code, title: bookTitles[code] ?? code, chapters: Object.keys(text[code]),
    testament: newTestament.has(code) ? 'New' : 'Old',
  }));
  const index = books.flatMap(({ code }) => Object.entries(text[code]).flatMap(([chapter, verses]) =>
    verses.map(([verse, content]) => ({ term: normalize(content), hit: { book: code, chapter, verse, text: content } }))));
  const bible = { text, books, index };
  bibles.set(edition, bible);
  return bible;
}

let strongs: { byId: Map<string, StrongEntry>; index: { entry: StrongEntry; short: string; full: string }[] } | undefined;
function getStrongs() {
  if (!strongs) {
    const entries = readDataset<StrongEntry[]>('strongs');
    strongs = {
      byId: new Map(entries.map((entry) => [entry.id, entry])),
      index: entries.map((entry) => ({
        entry,
        short: normalize([entry.lemma, entry.transliteration, entry.pronunciation].join(' ')),
        full: normalize([entry.definition, entry.renderings].join(' ')),
      })),
    };
  }
  return strongs;
}

const strongId = (value: string) => value.toUpperCase().replace(/^([HG])0+(?=\d)/, '$1');
const queryString = (value: unknown) => typeof value === 'string' ? value.trim().slice(0, 120) : '';

export const referenceRouter = Router();

referenceRouter.get('/bible/:edition/books', (req, res) => {
  const edition = bibleEditions.find(({ id }) => id === req.params.edition);
  if (!edition) return res.status(404).json({ error: 'Bible edition not found.' });
  return res.json(getBible(edition.id).books);
});

referenceRouter.get('/bible/:edition/search', (req, res) => {
  const edition = bibleEditions.find(({ id }) => id === req.params.edition);
  if (!edition) return res.status(404).json({ error: 'Bible edition not found.' });
  const term = normalize(queryString(req.query.q));
  if (term.length < 2) return res.status(400).json({ error: 'Enter at least two characters.' });
  const hits: BibleHit[] = [];
  const book = queryString(req.query.book).toUpperCase();
  for (const row of getBible(edition.id).index) {
    if ((!book || book === row.hit.book) && row.term.includes(term)) hits.push(row.hit);
    if (hits.length >= 60) break;
  }
  return res.json(hits);
});

referenceRouter.get('/bible/:edition/:book/:chapter', (req, res) => {
  const edition = bibleEditions.find(({ id }) => id === req.params.edition);
  const requestedCode = req.params.book.toUpperCase();
  const code = bibleBookCodeAliases[requestedCode] ?? requestedCode;
  const chapter = req.params.chapter;
  if (!edition || !Object.hasOwn(bookTitles, code) || !/^\d{1,3}$/.test(chapter)) {
    return res.status(404).json({ error: 'Bible passage not found.' });
  }
  const verses = getBible(edition.id).text[code]?.[chapter];
  return verses ? res.json(verses) : res.status(404).json({ error: 'Bible passage not found.' });
});

referenceRouter.get('/lexicon', (req, res) => {
  const raw = queryString(req.query.q);
  const term = normalize(raw);
  const byNumber = /^[hg]0*\d+$/i.test(raw) ? strongId(raw) : '';
  const language = queryString(req.query.language);
  const page = Math.max(1, Math.min(1000, Number.parseInt(queryString(req.query.page), 10) || 1));
  const { index, byId } = getStrongs();
  const primary: StrongEntry[] = [];
  const definitions: StrongEntry[] = [];
  for (const { entry, short, full } of index) {
    if (language && language !== entry.language) continue;
    if (byNumber ? entry.id === byNumber : !term || short.includes(term)) primary.push(entry);
    else if (!byNumber && full.includes(term)) definitions.push(entry);
  }
  const matches = primary.concat(definitions);
  const size = 24;
  res.json({ entries: matches.slice((page - 1) * size, page * size), page, pages: Math.max(1, Math.ceil(matches.length / size)), total: matches.length, corpusSize: byId.size });
});

referenceRouter.get('/lexicon/:id', (req, res) => {
  const entry = getStrongs().byId.get(strongId(req.params.id));
  return entry ? res.json(entry) : res.status(404).json({ error: 'Lexicon entry not found.' });
});
