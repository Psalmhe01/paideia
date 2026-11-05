export const bibleEditions = [
  { id: 'webp', name: 'World English Bible', canon: 'Protestant · 66 books', source: 'https://ebible.org/find/details.php?id=engwebp' },
  { id: 'webc', name: 'World English Bible', canon: 'Catholic · 73 books', source: 'https://ebible.org/find/details.php?id=engwebc' },
] as const;

export type BibleEdition = (typeof bibleEditions)[number]['id'];

export const bookTitles: Record<string, string> = {
  GEN: 'Genesis', EXO: 'Exodus', LEV: 'Leviticus', NUM: 'Numbers', DEU: 'Deuteronomy',
  JOS: 'Joshua', JDG: 'Judges', RUT: 'Ruth', '1SA': '1 Samuel', '2SA': '2 Samuel',
  '1KI': '1 Kings', '2KI': '2 Kings', '1CH': '1 Chronicles', '2CH': '2 Chronicles',
  EZR: 'Ezra', NEH: 'Nehemiah', EST: 'Esther', ESG: 'Esther', JOB: 'Job', PSA: 'Psalms',
  PRO: 'Proverbs', ECC: 'Ecclesiastes', SNG: 'Song of Songs', ISA: 'Isaiah', JER: 'Jeremiah',
  LAM: 'Lamentations', EZK: 'Ezekiel', DAN: 'Daniel', DAG: 'Daniel', HOS: 'Hosea',
  JOL: 'Joel', AMO: 'Amos', OBA: 'Obadiah', JON: 'Jonah', MIC: 'Micah', NAM: 'Nahum',
  HAB: 'Habakkuk', ZEP: 'Zephaniah', HAG: 'Haggai', ZEC: 'Zechariah', MAL: 'Malachi',
  TOB: 'Tobit', JDT: 'Judith', '1MA': '1 Maccabees', '2MA': '2 Maccabees',
  WIS: 'Wisdom', SIR: 'Sirach', BAR: 'Baruch',
  MAT: 'Matthew', MRK: 'Mark', LUK: 'Luke', JHN: 'John', ACT: 'Acts', ROM: 'Romans',
  '1CO': '1 Corinthians', '2CO': '2 Corinthians', GAL: 'Galatians', EPH: 'Ephesians',
  PHP: 'Philippians', COL: 'Colossians', '1TH': '1 Thessalonians', '2TH': '2 Thessalonians',
  '1TI': '1 Timothy', '2TI': '2 Timothy', TIT: 'Titus', PHM: 'Philemon', HEB: 'Hebrews',
  JAS: 'James', '1PE': '1 Peter', '2PE': '2 Peter', '1JN': '1 John', '2JN': '2 John',
  '3JN': '3 John', JUD: 'Jude', REV: 'Revelation',
};
export const catholicOldTestament = 'GEN EXO LEV NUM DEU JOS JDG RUT 1SA 2SA 1KI 2KI 1CH 2CH EZR NEH TOB JDT ESG 1MA 2MA JOB PSA PRO ECC SNG WIS SIR ISA JER LAM BAR EZK DAG HOS JOL AMO OBA JON MIC NAM HAB ZEP HAG ZEC MAL'.split(' ');
export const newTestament = new Set(Object.keys(bookTitles).slice(Object.keys(bookTitles).indexOf('MAT')));

export interface BibleBook {
  code: string;
  title: string;
  chapters: string[];
  testament: 'Old' | 'New';
}
export type BibleVerse = [number: string, text: string];
export interface BibleHit {
  book: string;
  chapter: string;
  verse: string;
  text: string;
}
export interface StrongEntry {
  id: string;
  language: 'Hebrew' | 'Aramaic' | 'Greek';
  lemma: string;
  transliteration: string;
  pronunciation: string;
  derivation: string;
  definition: string;
  renderings: string;
}

export const bibleUrl = (edition: BibleEdition, book: string, chapter: string, verse?: string) =>
  '/bible/' + edition + '/' + book.toLowerCase() + '/' + chapter + (verse ? '#verse-' + verse : '');

export function scriptureUrl(reference: string) {
  const match = reference.trim().match(/^((?:[1-3]\s*)?[a-z][a-z\s]+?)\s+(\d+)(?::(\d+))?/i);
  if (!match) return '/bible?q=' + encodeURIComponent(reference);
  const name = match[1].toLowerCase().replace(/\s+/g, ' ');
  const aliases: Record<string, string> = { psalm: 'PSA', 'song of solomon': 'SNG', canticles: 'SNG', acts: 'ACT' };
  const book = aliases[name] ?? Object.keys(bookTitles).find((key) => bookTitles[key].toLowerCase() === name);
  if (!book) return '/bible?q=' + encodeURIComponent(reference);
  const singleChapter = ['OBA', 'PHM', '2JN', '3JN', 'JUD'].includes(book);
  const useVerse = singleChapter && !match[3];
  const edition = ['TOB', 'JDT', '1MA', '2MA', 'WIS', 'SIR', 'BAR'].includes(book) ? 'webc' : 'webp';
  return bibleUrl(edition, book, useVerse ? '1' : match[2], useVerse ? match[2] : match[3]);
}
