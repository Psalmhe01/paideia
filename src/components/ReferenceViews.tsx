import { useEffect, useState, type FormEvent } from 'react';
import { ArrowLeft, ArrowRight, BookOpen, Bookmark, Search } from 'lucide-react';
import { Link, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { bibleEditions, bibleUrl, bookTitles, scriptureUrl } from '../../shared/reference';
import type { BibleBook, BibleHit, BibleVerse, StrongEntry } from '../../shared/reference';
import { LexiconView } from './LexiconAndNotebookViews';

function useReference<T>(path: string | null) {
  const [result, setResult] = useState<{ path: string; data?: T; error?: string }>();
  useEffect(() => {
    if (!path) return;
    const controller = new AbortController();
    async function load() {
      try {
        const res = await fetch('/api/reference' + path, { signal: controller.signal });
        const data = await res.json();
        if (!res.ok) throw new Error(data.error ?? 'The resource could not be opened.');
        if (!controller.signal.aborted) setResult({ path: path!, data });
      } catch (error) {
        if (!controller.signal.aborted) setResult({ path: path!, error: error instanceof Error ? error.message : 'The resource could not be opened.' });
      }
    }
    void load();
    return () => controller.abort();
  }, [path]);
  return result?.path === path ? result : undefined;
}

type SavedVerse = { url: string; label: string };
function readBookmarks(): SavedVerse[] {
  try {
    const saved: unknown = JSON.parse(localStorage.getItem('paideia-verses') ?? '[]');
    return Array.isArray(saved) ? saved.filter((item) => typeof item?.url === 'string' && item.url.startsWith('/bible/') && typeof item.label === 'string') : [];
  } catch {
    return [];
  }
}

export function BibleView() {
  const { edition: editionParam, book: bookParam, chapter: chapterParam } = useParams();
  const { hash } = useLocation();
  const [params, setParams] = useSearchParams();
  const navigate = useNavigate();
  const edition = bibleEditions.find(({ id }) => id === (editionParam ?? 'webp'));
  const id = edition?.id ?? 'webp';
  const bookCode = (bookParam ?? 'jhn').toUpperCase();
  const chapter = chapterParam ?? '1';
  const q = params.get('q') ?? '';
  const bookFilter = params.get('in') ?? '';
  const [query, setQuery] = useState(q);
  const [scope, setScope] = useState(bookFilter);
  const [saved, setSaved] = useState(readBookmarks);
  const [fontScale, setFontScale] = useState(1);

  const books = useReference<BibleBook[]>(edition ? '/bible/' + id + '/books' : null);
  const book = books?.data?.find(({ code }) => code === bookCode);
  const text = useReference<BibleVerse[]>(edition && !q
    ? '/bible/' + id + '/' + encodeURIComponent(bookCode) + '/' + encodeURIComponent(chapter) : null);
  const hits = useReference<BibleHit[]>(edition && q
    ? '/bible/' + id + '/search?' + new URLSearchParams({ q, book: bookFilter }) : null);

  useEffect(() => { setQuery(q); setScope(bookFilter); }, [q, bookFilter]);
  useEffect(() => {
    if (text?.data && hash.startsWith('#verse-')) {
      document.getElementById(hash.slice(1))?.scrollIntoView({ block: 'center' });
    }
  }, [text, hash]);

  if (!edition) return <div className="ref-card" role="alert">Edition unavailable. <Link className="ref-link" to="/bible">Open the Bible reader</Link></div>;

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    const term = query.trim();
    const target = scriptureUrl(term);
    if (target.startsWith('/bible/')) {
      const passage = id === 'webc'
        ? target.replace('/webp/', '/webc/').replace('/est/', '/esg/').replace('/dan/', '/dag/')
        : target;
      navigate(passage);
    } else {
      setParams(term ? { q: term, ...(scope ? { in: scope } : {}) } : {});
    }
  }

  function changeEdition(next: typeof id) {
    const mapped = next === 'webc'
      ? ({ EST: 'ESG', DAN: 'DAG' }[bookCode] ?? bookCode)
      : ({ ESG: 'EST', DAG: 'DAN' }[bookCode] ?? bookCode);
    const catholicOnly = ['TOB', 'JDT', '1MA', '2MA', 'WIS', 'SIR', 'BAR'];
    const nextBook = next === 'webp' && catholicOnly.includes(mapped) ? 'GEN' : mapped;
    navigate(bibleUrl(next, nextBook, nextBook === bookCode ? chapter : '1') + (q ? '?' + new URLSearchParams({ q }) : ''));
  }

  function toggleVerse(number: string) {
    const url = bibleUrl(id, bookCode, chapter, number);
    const next = saved.some((item) => item.url === url)
      ? saved.filter((item) => item.url !== url)
      : [...saved, { url, label: (book?.title ?? bookCode) + ' ' + chapter + ':' + number + ' · ' + id.toUpperCase() }];
    setSaved(next);
    localStorage.setItem('paideia-verses', JSON.stringify(next));
  }

  function adjacent(offset: number) {
    if (!book || !books?.data) return undefined;
    const chapterIndex = book.chapters.indexOf(chapter);
    if (chapterIndex < 0) return undefined;
    const within = book.chapters[chapterIndex + offset];
    if (within) return bibleUrl(id, book.code, within);
    const nextBook = books.data[books.data.indexOf(book) + offset];
    if (nextBook) return bibleUrl(id, nextBook.code, offset > 0 ? nextBook.chapters[0] : nextBook.chapters.at(-1)!);
  }
  const previous = adjacent(-1);
  const next = adjacent(1);

  return (
    <div className="ref-page">
      <header>
        <p className="ref-kicker">Scripture room</p>
        <h1 className="ref-title">Bible Reader</h1>
        <p className="ref-deck">Read every chapter, search the text, and save verses in this browser.</p>
      </header>
      <div className="ref-card space-y-4">
        <div className="grid gap-3 sm:grid-cols-3">
          <label className="ref-field">Edition
            <select aria-label="Edition" value={id} onChange={(event) => changeEdition(event.target.value as typeof id)}>
              {bibleEditions.map((item) => <option key={item.id} value={item.id}>{item.canon}</option>)}
            </select>
          </label>
          <label className="ref-field">Book
            <select aria-label="Book" value={book?.code ?? ''} disabled={!books?.data} onChange={(event) => navigate(bibleUrl(id, event.target.value, '1'))}>
              {!book && <option value="">Choose a book</option>}
              {(['Old', 'New'] as const).map((testament) => (
                <optgroup key={testament} label={testament + ' Testament'}>
                  {books?.data?.filter((item) => item.testament === testament).map((item) => <option key={item.code} value={item.code}>{item.title}</option>)}
                </optgroup>
              ))}
            </select>
          </label>
          <label className="ref-field">Chapter
            <select aria-label="Chapter" value={chapter} disabled={!book} onChange={(event) => navigate(bibleUrl(id, bookCode, event.target.value))}>
              {book?.chapters.map((number) => <option key={number} value={number}>{number}</option>)}
            </select>
          </label>
        </div>
        <form className="grid sm:grid-cols-[1fr_12rem_auto] items-end gap-3" onSubmit={submitSearch}>
          <label className="ref-field">Find a phrase or passage
            <input type="search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="e.g. John 3:16 or living water" />
          </label>
          <label className="ref-field">Search in
            <select value={scope} onChange={(event) => setScope(event.target.value)}>
              <option value="">Entire Bible</option>
              {books?.data?.map((item) => <option key={item.code} value={item.code}>{item.title}</option>)}
            </select>
          </label>
          <button className="ref-button ref-button-primary" type="submit"><Search size={16} /> Search</button>
        </form>
        <details className="text-sm">
          <summary className="cursor-pointer font-semibold">Saved verses ({saved.length})</summary>
          {saved.length ? <ul className="mt-2 space-y-2">{saved.map((item) => <li key={item.url}><Link className="ref-link" to={item.url}>{item.label}</Link></li>)}</ul>
            : <p className="mt-2 ref-muted">Use the bookmark icon beside a verse to save it here.</p>}
        </details>
      </div>
      {books?.error && <p role="alert">{books.error}</p>}
      {q ? (
        <section className="ref-card space-y-3" aria-label="Verse search results">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h2 className="ref-heading">Results for “{q}”</h2>
            <Link className="ref-link" to={bibleUrl(id, bookCode, chapter)}>Back to reading</Link>
          </div>
          {!hits && <p role="status">Searching the Bible…</p>}
          {hits?.error && <p role="alert">{hits.error}</p>}
          {hits?.data?.length === 0 && <p className="ref-muted">No verses matched this phrase.</p>}
          {hits?.data?.length === 60 && <p className="ref-muted text-sm">Showing the first 60 results. Choose a book or enter a more specific phrase to narrow the search.</p>}
          {hits?.data?.map(({ book: code, chapter: ch, verse, text: content }) => (
            <Link key={code + ch + ':' + verse} className="block border-t border-stone-200 py-3 dark:border-stone-700" to={bibleUrl(id, code, ch, verse)}>
              <span className="ref-link">{bookTitles[code]} {ch}:{verse}</span>
              <p className="font-reading text-lg">{content}</p>
            </Link>
          ))}
        </section>
      ) : (
        <article className="ref-card bible-paper">
          <div className="flex flex-wrap items-end justify-between gap-2">
            <div><p className="ref-kicker">{id.toUpperCase()} · {book?.testament ?? ''} Testament</p><h2 className="ref-heading">{book?.title ?? bookTitles[bookCode] ?? 'Passage'} {chapter}</h2></div>
            <div className="flex gap-1" aria-label="Reading size">
              <button className="ref-button" disabled={fontScale <= 0.85} aria-label="Decrease text size" onClick={() => setFontScale((value) => value - 0.15)}>A−</button>
              <button className="ref-button" disabled={fontScale >= 1.44} aria-label="Increase text size" onClick={() => setFontScale((value) => value + 0.15)}>A+</button>
            </div>
          </div>
          {!text && <p className="mt-5" role="status">Opening the passage…</p>}
          {text?.error && <p className="mt-5" role="alert">{text.error} Choose another book or chapter above.</p>}
          <ol className="mt-4 space-y-2" style={{ fontSize: 1.3 * fontScale + 'rem' }}>
            {text?.data?.map(([number, content]) => {
              const url = bibleUrl(id, bookCode, chapter, number);
              const bookmarked = saved.some((item) => item.url === url);
              return (
                <li key={number} id={'verse-' + number} className="bible-verse" data-focused={hash === '#verse-' + number}>
                  <Link to={url} aria-label={'Link to verse ' + number} className="ref-link text-sm font-semibold pt-1">{number}</Link>
                  <span className="font-reading leading-relaxed">{content}</span>
                  <button className="verse-save" aria-label={(bookmarked ? 'Remove saved verse ' : 'Save verse ') + number} aria-pressed={bookmarked} onClick={() => toggleVerse(number)}><Bookmark size={16} fill={bookmarked ? 'currentColor' : 'none'} /></button>
                </li>
              );
            })}
          </ol>
          <nav aria-label="Chapter navigation" className="mt-6 flex flex-wrap justify-between gap-3">
            {previous ? <Link className="ref-button" to={previous}><ArrowLeft size={16} /> Previous chapter</Link> : <span />}
            {next && <Link className="ref-button" to={next}>Next chapter <ArrowRight size={16} /></Link>}
          </nav>
        </article>
      )}
      <p className="text-sm ref-muted"><a className="ref-link" href={edition.source}>{edition.name} · {edition.canon}</a>. Public-domain verse text from eBible.org.</p>
    </div>
  );
}

interface LexiconPage {
  entries: StrongEntry[];
  page: number;
  pages: number;
  total: number;
  corpusSize: number;
}

function Lemma({ entry }: { entry: StrongEntry }) {
  return <span lang={entry.language === 'Greek' ? 'grc' : entry.language === 'Aramaic' ? 'arc' : 'he'} dir="auto">{entry.lemma}</span>;
}

export function ReferenceLexicon({ onOpenTopic }: { onOpenTopic: (slug: string) => void }) {
  const { entry: entryId } = useParams();
  const [params, setParams] = useSearchParams();
  const glossary = params.get('view') === 'glossary' && !entryId;
  const q = params.get('q') ?? '';
  const language = params.get('language') ?? '';
  const [draft, setDraft] = useState(q);
  const listing = useReference<LexiconPage>(!entryId && !glossary ? '/lexicon?' + params : null);
  const detail = useReference<StrongEntry>(entryId ? '/lexicon/' + encodeURIComponent(entryId) : null);

  useEffect(() => { setDraft(q); }, [q]);

  function updateSearch(nextQuery: string, nextLanguage: string) {
    setParams({ ...(nextQuery.trim() ? { q: nextQuery.trim() } : {}), ...(nextLanguage ? { language: nextLanguage } : {}) });
  }

  return (
    <div className="ref-page">
      <header>
        <p className="ref-kicker">Language room</p>
        <h1 className="ref-title">Lexicon</h1>
        <p className="ref-deck">Explore biblical Greek, Hebrew, and Aramaic headwords, or review the vocabulary of the curriculum.</p>
      </header>
      <nav className="ref-tabs" aria-label="Lexicon collections">
        <Link className="ref-button" aria-current={!glossary ? 'page' : undefined} to="/lexicon">Strong’s dictionaries</Link>
        <Link className="ref-button" aria-current={glossary ? 'page' : undefined} to="/lexicon?view=glossary">Theological glossary</Link>
      </nav>
      {glossary ? <LexiconView onOpenTopic={onOpenTopic} /> : entryId ? (
        <article className="ref-card space-y-4">
          <Link to={'/lexicon' + (params.size ? '?' + params : '')} className="ref-link">← Back to results</Link>
          {!detail && <p role="status">Opening entry…</p>}
          {detail?.error && <p role="alert">{detail.error}</p>}
          {detail?.data && <div className="space-y-4">
            <p className="ref-kicker">{detail.data.id} · {detail.data.language}</p>
            <h2 className="ref-title"><Lemma entry={detail.data} /></h2>
            <p className="font-reading text-xl">{detail.data.transliteration}{detail.data.pronunciation && ' · ' + detail.data.pronunciation}</p>
            {([['Definition', detail.data.definition], ['Derivation', detail.data.derivation], ['KJV renderings', detail.data.renderings]] as const).map(([label, content]) => content && (
              <section key={label} className="border-t border-stone-200 pt-3 dark:border-stone-700">
                <h3 className="ref-kicker">{label}</h3>
                <p className="font-reading text-lg">{content.split(/(\b[GH]\d+\b)/g).map((part, index) => /^[GH]\d+$/.test(part) ? <Link key={index} className="ref-link" to={'/lexicon/' + part}>{part}</Link> : part)}</p>
              </section>
            ))}
          </div>}
        </article>
      ) : <>
        <form className="ref-card grid gap-3 sm:grid-cols-[1fr_12rem_auto] items-end" onSubmit={(event) => { event.preventDefault(); updateSearch(draft, language); }}>
          <label className="ref-field">Headword, Strong’s number, or definition
            <input type="search" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="e.g. G3056, λόγος, logos" />
          </label>
          <label className="ref-field">Language
            <select value={language} onChange={(event) => updateSearch(draft, event.target.value)}>
              <option value="">All languages</option>
              <option>Greek</option><option>Hebrew</option><option>Aramaic</option>
            </select>
          </label>
          <button className="ref-button ref-button-primary" type="submit"><Search size={16} /> Find entries</button>
        </form>
        {!listing && <p role="status">Opening the dictionaries…</p>}
        {listing?.error && <p role="alert">{listing.error}</p>}
        {listing?.data && <>
          <p className="ref-muted text-sm" role="status">{listing.data.total.toLocaleString()} results · {listing.data.corpusSize.toLocaleString()} entries in the dictionaries</p>
          {listing.data.entries.length === 0 && <p className="ref-card">No entries on this page. Try another spelling or a Strong’s number.</p>}
          <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {listing.data.entries.map((entry) => (
              <Link key={entry.id} to={'/lexicon/' + entry.id + (params.size ? '?' + params : '')} className="ref-card ref-interactive space-y-2">
                <span className="ref-kicker">{entry.id} · {entry.language}</span>
                <h2 className="ref-heading"><Lemma entry={entry} /></h2>
                <p className="text-sm ref-muted">{entry.transliteration}</p>
                <p className="font-reading text-lg line-clamp-3">{entry.definition || entry.renderings}</p>
              </Link>
            ))}
          </div>
          {listing.data.pages > 1 && <nav aria-label="Lexicon pages" className="flex items-center justify-center gap-3">
            <button type="button" className="ref-button" disabled={listing.data.page <= 1} onClick={() => setParams({ ...Object.fromEntries(params), page: String(listing.data!.page - 1) })}><ArrowLeft size={16} /> Previous</button>
            <span className="text-sm">{listing.data.page} / {listing.data.pages}</span>
            <button type="button" className="ref-button" disabled={listing.data.page >= listing.data.pages} onClick={() => setParams({ ...Object.fromEntries(params), page: String(listing.data!.page + 1) })}>Next <ArrowRight size={16} /></button>
          </nav>}
        </>}
      </>}
      {!glossary && <p className="text-sm ref-muted flex items-start gap-2"><BookOpen size={16} className="shrink-0 mt-0.5" /><span>James Strong’s dictionaries, digital edition by <a className="ref-link" href="https://github.com/openscriptures/strongs">Open Scriptures</a> (CC BY-SA). The entries include historical KJV renderings.</span></p>}
    </div>
  );
}
