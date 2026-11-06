import { useState } from 'react';
import { ArrowDown, ArrowRight, BookOpen, CheckCircle2, ExternalLink, GitFork, Search } from 'lucide-react';
import { Link, useParams, useSearchParams } from 'react-router-dom';
import { scriptureUrl } from '../../shared/reference';
import { conceptCharts, eras, historyEvents } from '../data/atlas';
import { books } from '../data/books';
import { axes, traditions } from '../data/traditions';
import pathsData from '../data/studyPaths.json';
import type { TopicSummary } from '../types';
import { EditorialHero } from './EditorialHero';
import { editorialImages } from '../data/editorialImages';
import { studyImageFor } from '../data/editorialImages';
import { SearchFilterPanel } from './SearchFilterPanel';

function ReadingLink({ href, children }: { href: string; children: React.ReactNode }) {
  return href.startsWith('/') ? <Link to={href} className="ref-link">{children}</Link> :
    <a href={href} className="ref-link" target="_blank" rel="noreferrer">{children} <ExternalLink aria-hidden="true" size={12} className="inline" /></a>;
}

export function AtlasView() {
  const { chart = 'history' } = useParams();
  const concept = conceptCharts.find(({ id }) => id === chart);
  const atlasImage = concept ? studyImageFor(concept.id, `${concept.title} ${concept.question}`) : editorialImages.history;
  return (
    <div className="ref-page">
      <EditorialHero eyebrow="Visual study room" title={concept?.title ?? 'History & concept atlas'}
        description={concept?.explanation ?? 'Follow key events through time and compare how Christian thinkers answer enduring questions.'}
        image={atlasImage.src} imageAlt={atlasImage.alt} />
      <nav className="ref-tabs" aria-label="Atlas charts">
        <Link className="ref-button" to="/atlas" aria-current={chart === 'history' ? 'page' : undefined}>History timeline</Link>
        {conceptCharts.map((item) => <Link key={item.id} className="ref-button" aria-current={chart === item.id ? 'page' : undefined} to={'/atlas/' + item.id}>{item.title}</Link>)}
      </nav>
      {chart === 'history' ? <Timeline /> : concept ? <ConceptChart key={chart} chart={concept} /> : <p className="ref-card">Chart unavailable. <Link to="/atlas" className="ref-link">Open the timeline</Link></p>}
    </div>
  );
}

const categories = ['Councils', 'Texts', 'Church & society'];
function Timeline() {
  const [params, setParams] = useSearchParams();
  const era = eras.find(({ id }) => id === params.get('era')) ?? eras[0];
  const type = params.get('type') ?? '';
  const events = historyEvents.filter((event) => event.year >= era.start && event.year < era.end && (!type || event.type === type));
  const selected = events.find((event) => String(event.year) === params.get('year')) ?? events.find((event) => event.year === 325) ?? events[0];
  const setFilter = (nextEra: string, nextType: string, year?: number) => setParams({
    era: nextEra, ...(nextType ? { type: nextType } : {}), ...(year ? { year: String(year) } : {}),
  });
  return (
    <section className="ref-card space-y-5" aria-labelledby="timeline-heading">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><p className="ref-kicker">Chronology</p><h2 id="timeline-heading" className="ref-heading">Milestones in Church History</h2></div>
        <label className="ref-field">Event type
          <select value={type} onChange={(event) => setFilter(era.id, event.target.value)}>
            <option value="">All milestones</option>
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>
      <div className="ref-tabs" aria-label="Timeline period">
        {eras.map((item) => <button className="ref-button" key={item.id} aria-pressed={era.id === item.id} onClick={() => setFilter(item.id, type)}>{item.label}</button>)}
      </div>
      <div className="flex flex-wrap gap-4 text-xs ref-muted" aria-label="Chart legend">
        {categories.map((item) => <span key={item} className="inline-flex items-center gap-2"><i className="timeline-key" data-type={item} />{item}</span>)}
        <span>{events.length} milestones · Dates shown in CE</span>
      </div>
      {events.length ? (
        <ol className="history-timeline" aria-label={`${era.label} milestones`}>
          {events.map((event, index) => {
            const isSelected = event === selected;
            const side = index % 2 === 0 ? 'right' : 'left';
            return (
              <li key={event.year} className="history-timeline__item" data-side={side}>
                <span className="history-timeline__marker" data-type={event.type} aria-hidden="true" />
                <article className="history-timeline__card" data-selected={isSelected}>
                  <button type="button" className="history-timeline__select" aria-pressed={isSelected}
                    aria-label={`${isSelected ? 'Selected: ' : 'Explore '}${event.date}, ${event.title}`}
                    onClick={() => setFilter(era.id, type, event.year)}>
                    <span className="history-timeline__meta"><time>{event.date}</time><span className="history-timeline__type" data-type={event.type}>{event.type}</span></span>
                    <strong className="history-timeline__title">{event.title}</strong>
                    <span className="history-timeline__summary">{event.description}</span>
                    <span className="history-timeline__more">{isSelected ? 'Selected milestone' : 'Explore milestone'} <ArrowRight size={14} aria-hidden="true" /></span>
                  </button>
                  {isSelected && (
                    <div className="history-timeline__details" aria-live="polite">
                      <span className="history-timeline__place">{event.place}</span>
                      <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
                        <ReadingLink href={event.source}>{event.sourceLabel}</ReadingLink>
                        {event.topic && <Link to={'/study/' + event.topic} className="ref-link">Related study <ArrowRight size={14} className="inline" /></Link>}
                      </div>
                    </div>
                  )}
                </article>
              </li>
            );
          })}
        </ol>
      ) : <p className="ref-inset" role="status">No milestones match this period and category. Try another filter.</p>}
    </section>
  );
}

function ConceptChart({ chart }: { chart: (typeof conceptCharts)[number] }) {
  const [first, setFirst] = useState(0);
  const [second, setSecond] = useState(1);
  return (
    <section className="ref-card space-y-5">
      <div><p className="ref-kicker">Compare two readings</p><h2 className="ref-heading">{chart.question}</h2><p className="ref-deck">{chart.explanation}</p></div>
      <div className="grid sm:grid-cols-2 gap-4">
        {([[first, setFirst], [second, setSecond]] as const).map(([current, setCurrent], side) => {
          const row = chart.rows[current];
          return (
            <div className="ref-inset space-y-4" key={side}>
              <label className="ref-field">{side ? 'Second perspective' : 'First perspective'}
                <select value={current} onChange={(event) => setCurrent(Number(event.target.value))}>
                  {chart.rows.map((item, index) => <option key={item.name} value={index}>{item.name}</option>)}
                </select>
              </label>
              <ol className="concept-flow" aria-label={row.name + ' sequence'}>
                {row.cells.map((cell, index) => (
                  <li key={cell}>
                    <div className="concept-stage"><p className="ref-kicker">{index + 1} · {chart.labels[index]}</p><p className="font-reading text-lg">{cell}</p></div>
                    {index < row.cells.length - 1 && <ArrowDown size={18} className="mx-auto my-1 opacity-60" aria-hidden="true" />}
                  </li>
                ))}
              </ol>
              <div className="flex flex-col items-start gap-2 text-sm">
                <Link className="ref-link" to={scriptureUrl(row.passage)}><BookOpen size={14} className="inline" /> {row.passage}</Link>
                <ReadingLink href={row.url}>{row.reading}</ReadingLink>
              </div>
            </div>
          );
        })}
      </div>
      <Link className="ref-button" to={'/study/' + chart.topic}>Read the full study module <ArrowRight size={16} /></Link>
    </section>
  );
}

export function TraditionsView() {
  const { tradition } = useParams();
  const [params, setParams] = useSearchParams();
  const primary = traditions.find(({ id }) => id === (tradition ?? 'catholic'));
  const other = traditions.find((item) => item !== primary && item.id === params.get('compare'));
  const families = [...new Set(traditions.map(({ family }) => family))];
  return (
    <div className="ref-page">
      <EditorialHero eyebrow="Churches & denominations" title="Christian traditions"
        description="Explore how Christian communities describe faith, worship, and practice."
        image={editorialImages.orthodox.src} imageAlt={editorialImages.orthodox.alt} />
      <div className="tradition-map" aria-label="Traditions grouped by historical family">
        <div className="tradition-root"><GitFork aria-hidden="true" size={18} /> Christian traditions</div>
        <div className="tradition-branches">
          {families.map((family) => (
            <section key={family} className="ref-card space-y-2">
              <h2 className="ref-kicker">{family}</h2>
              {traditions.filter((item) => item.family === family).map((item) => (
                <Link key={item.id} className="ref-button w-full justify-start" aria-current={primary === item ? 'page' : undefined}
                  to={'/traditions/' + item.id + (other && other !== item ? '?compare=' + other.id : '')}>{item.name}</Link>
              ))}
            </section>
          ))}
        </div>
      </div>
      {!primary ? <p className="ref-card">Choose a tradition above to open a profile.</p> :
        <section className="ref-card space-y-5">
          <div className="flex flex-wrap gap-4 justify-between items-end">
            <div><p className="ref-kicker">{primary.origin}</p><h2 className="ref-heading">{primary.name}</h2></div>
            <label className="ref-field">Compare with
              <select value={other?.id ?? ''} onChange={(event) => setParams(event.target.value ? { compare: event.target.value } : {})}>
                <option value="">Choose a tradition</option>
                {traditions.filter((item) => item !== primary).map(({ id, name }) => <option key={id} value={id}>{name}</option>)}
              </select>
            </label>
          </div>
          <div className={other ? 'grid sm:grid-cols-2 gap-4' : ''}>
            {[primary, ...(other ? [other] : [])].map((item) => (
              <article key={item.id} className="ref-inset space-y-4">
                <h3 className="ref-heading">{item.name}</h3>
                <p className="font-reading text-lg">{item.introduction}</p>
                <dl className="space-y-3 text-sm">
                  {axes.map((axis) => <div key={axis.id} className="border-t border-stone-200 dark:border-stone-700 pt-3"><dt className="font-semibold">{axis.label}</dt><dd className="mt-1 ref-muted">{item.practices[axis.id]}</dd></div>)}
                </dl>
                <ReadingLink href={item.source}>{item.sourceLabel}</ReadingLink>
              </article>
            ))}
          </div>
          <Link to="/atlas" className="ref-link">See the historical timeline <ArrowRight size={14} className="inline" /></Link>
        </section>
      }
    </div>
  );
}

export function BooksView() {
  const [search, setSearch] = useState('');
  const [shelf, setShelf] = useState('');
  const shelves = [...new Set(books.map((book) => book.shelf))].sort();
  const filtered = books.filter((book) => (!shelf || book.shelf === shelf) && (book.title + ' ' + book.author + ' ' + book.note).toLowerCase().includes(search.trim().toLowerCase()));
  return (
    <div className="ref-page">
      <EditorialHero eyebrow="Open reading collection" title="Christian books"
        description="A considered shelf of primary texts, theology, and spiritual classics."
        image={editorialImages.library.src} imageAlt={editorialImages.library.alt} />
      <div className="search-results-layout">
        <SearchFilterPanel title="Search the shelves">
          <label className="ref-field">Title, author, or subject
            <span className="relative block"><Search aria-hidden="true" className="absolute left-3 top-3" size={15} /><input type="search" className="pl-9 w-full" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search books" /></span>
          </label>
          <label className="ref-field">Shelf
            <select value={shelf} onChange={(event) => setShelf(event.target.value)}><option value="">All shelves</option>{shelves.map((item) => <option key={item}>{item}</option>)}</select>
          </label>
        </SearchFilterPanel>
        <div className="search-results-layout__results">
      <p className="ref-muted text-sm" role="status">{filtered.length} {filtered.length === 1 ? 'work' : 'works'}</p>
      <div className="grid sm:grid-cols-2 gap-4">
        {filtered.map((book) => (
          <article key={book.title} className="ref-card book-card">
            <div className="book-cover" data-shelf={book.shelf} aria-hidden="true"><BookOpen size={22} /><span>{book.author.split(' ').at(-1)}</span></div>
            <div className="min-w-0 space-y-2">
              <p className="ref-kicker">{book.shelf} · {book.era}</p>
              <h2 className="ref-heading">{book.title}</h2>
              <p className="text-sm font-semibold">{book.author}</p>
              <p className="font-reading text-lg leading-snug">{book.note}</p>
              <ReadingLink href={book.href}>Read at {book.archive}</ReadingLink>
            </div>
          </article>
        ))}
      </div>
      {filtered.length === 0 && <p className="ref-card">No matching books. Try a different title, author, or shelf.</p>}
        </div>
      </div>
    </div>
  );
}

export function StudyPathsView({ topics }: { topics: TopicSummary[] }) {
  const { pathSlug } = useParams();
  const paths = pathsData;
  const path = paths.find(({ slug }) => slug === pathSlug);
  const topicMap = new Map(topics.map((topic) => [topic.slug, topic]));
  const finished = (steps: { slug: string }[]) => steps.filter((step) => topicMap.get(step.slug)?.studied).length;
  return (
    <div className="ref-page">
      <EditorialHero eyebrow="Guided curriculum" title="Study paths"
        description="Follow a thoughtful sequence of studies, at your own pace."
        image={editorialImages.history.src} imageAlt={editorialImages.history.alt} />
      {path ? (
        <article className="ref-card space-y-5">
          <Link to="/paths" className="ref-link">← All study paths</Link>
          <div><p className="ref-kicker">{path.difficulty} · {finished(path.steps)} / {path.steps.length} complete</p><h2 className="ref-heading">{path.title}</h2><p className="ref-deck">{path.description}</p></div>
          <ol className="space-y-3">
            {path.steps.map((step, index) => (
              <li key={step.slug} className="ref-inset flex gap-4">
                <span className="step-marker" aria-label={topicMap.get(step.slug)?.studied ? 'Studied' : 'Step ' + (index + 1)}>{topicMap.get(step.slug)?.studied ? <CheckCircle2 size={20} /> : index + 1}</span>
                <div><Link to={'/study/' + step.slug} className="ref-link font-semibold">{topicMap.get(step.slug)?.title ?? step.title}</Link><p className="font-reading text-lg mt-1">{step.rationale}</p></div>
              </li>
            ))}
          </ol>
        </article>
      ) : pathSlug ? <p className="ref-card">Path unavailable. <Link className="ref-link" to="/paths">See the available paths</Link></p> :
        <div className="grid md:grid-cols-2 gap-4">
          {paths.map((item) => (
            <Link key={item.slug} to={'/paths/' + item.slug} className="ref-card ref-interactive space-y-3">
              <p className="ref-kicker">{item.difficulty} · {item.steps.length} modules</p>
              <h2 className="ref-heading">{item.title}</h2>
              <p className="ref-muted">{item.subtitle}</p>
              <progress className="block w-full h-2 accent-amber-800" max={item.steps.length} value={finished(item.steps)} aria-label={item.title + ' completion'} />
              <p className="text-xs ref-muted">{finished(item.steps)} of {item.steps.length} studied</p>
            </Link>
          ))}
        </div>}
    </div>
  );
}
