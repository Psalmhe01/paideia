import React, { useEffect, useState } from 'react';
import { Search, BookOpen, CheckCircle2, Bookmark, StickyNote } from 'lucide-react';
import { api } from '../api';
import type { DashboardStats, GlossaryItem } from '../types';

export function LexiconView({
  onOpenTopic,
}: {
  onOpenTopic: (slug: string) => void;
}) {
  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('all');
  const [items, setItems] = useState<GlossaryItem[]>([]);
  const [review, setReview] = useState(false);
  const [position, setPosition] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    let current = true;
    setPosition(0);
    setRevealed(false);
    api.getGlossary({ search, language }).then(
      (data) => { if (current) { setItems(data); setError(false); } },
      () => { if (current) setError(true); },
    );
    return () => { current = false; };
  }, [search, language]);

  return (
    <div className="space-y-6">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
          Lexicon Theologicum • Sacred Languages
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Curriculum Glossary
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl mt-1">
          Master the technical vocabulary of Patristic councils, biblical exegesis, and Reformed & Scholastic dogmatics.
        </p>
      </div>

      <div className="grid sm:grid-cols-12 gap-3 p-4 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search term, Greek/Hebrew script, or definition (e.g., homoousios, hesed, theosis)..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
          />
        </div>
        <div className="sm:col-span-4">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
          >
            <option value="all">All glossary categories</option>
            <option value="Theology">Theological vocabulary</option>
            <option value="Greek">Greek (Ἑλληνική)</option>
            <option value="Latin">Latin (Lingua Latina)</option>
            <option value="Hebrew">Hebrew (עִבְרִית)</option>
          </select>
        </div>
      </div>

      <div className="flex flex-wrap justify-between items-center gap-3">
        <p className="text-sm ref-muted" role="status">{error ? 'The glossary could not be loaded.' : items.length + ' glossary terms'}</p>
        <button className="ref-button" type="button" aria-pressed={review} onClick={() => setReview((previous) => !previous)}>Flashcard review</button>
      </div>
      {!error && !items.length && <p className="ref-card">No matching terms. Try a different search or category.</p>}
      {review && items[position] && <article className="ref-card space-y-4" aria-label="Flashcard">
        <p className="ref-kicker">Card {position + 1} of {items.length}</p>
        <h2 className="ref-heading">{items[position].term}</h2>
        {items[position].originalScript && <p className="font-reading text-xl">{items[position].originalScript}</p>}
        {revealed && <div className="ref-inset space-y-2" aria-live="polite">
          <p className="font-reading text-lg">{items[position].definition}</p>
          <button className="ref-link text-sm" onClick={() => onOpenTopic(items[position].relatedTopicSlug)}>Open the related study module</button>
        </div>}
        <div className="flex flex-wrap gap-2">
          <button className="ref-button" disabled={position === 0} onClick={() => { setPosition((index) => index - 1); setRevealed(false); }}>Previous term</button>
          <button className="ref-button ref-button-primary" onClick={() => setRevealed((open) => !open)} aria-expanded={revealed}>{revealed ? 'Hide definition' : 'Reveal definition'}</button>
          <button className="ref-button" disabled={position === items.length - 1} onClick={() => { setPosition((index) => index + 1); setRevealed(false); }}>Next term</button>
        </div>
      </article>}
      {!review && <div className="grid md:grid-cols-2 gap-4">
        {items.map((g) => (
          <div
            key={g.id}
            className="rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 flex flex-col justify-between space-y-3 shadow-xs"
          >
            <div className="space-y-2">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
                    {g.term}
                  </h3>
                  <p className="text-xs text-stone-500">
                    <span className="font-reading italic text-sm text-amber-800 dark:text-amber-400">
                      {g.originalScript}
                    </span>{' '}
                    {g.pronunciation && ' · [' + g.pronunciation + ']'}
                  </p>
                </div>
                <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-xs font-medium text-stone-600 dark:text-stone-300">
                  {g.language}
                </span>
              </div>

              <p className="font-reading text-base text-stone-700 dark:text-stone-300 leading-relaxed">
                {g.definition}
              </p>
            </div>

            {g.relatedTopicSlug && (
              <div className="pt-3 border-t border-stone-200/70 dark:border-stone-800 flex items-center justify-between text-xs">
                <span className="text-stone-500">{g.category}</span>
                <button
                  onClick={() => onOpenTopic(g.relatedTopicSlug)}
                  className="inline-flex items-center gap-1 font-semibold text-amber-800 dark:text-amber-400 hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" />
                  Study: {g.relatedTopicTitle || 'Related Module'}
                </button>
              </div>
            )}
          </div>
        ))}
      </div>}
    </div>
  );
}

export function NotebookView({
  stats,
  onOpenTopic,
}: {
  stats: DashboardStats | null;
  onOpenTopic: (slug: string) => void;
}) {
  const items = stats?.notebookItems || [];

  return (
    <div className="space-y-6 pb-12">
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
          Adversaria & Marginalia
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
          Personal Scholarly Notebook
        </h1>
        <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl mt-1">
          Review your completed modules, bookmarked theological loci, and saved study reflections.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="rounded-3xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-12 text-center space-y-3">
          <StickyNote className="w-10 h-10 mx-auto text-amber-700/70" />
          <h3 className="font-display text-2xl font-bold text-stone-800 dark:text-stone-200">
            Your Study Notebook Is Ready
          </h3>
          <p className="text-sm text-stone-500 max-w-md mx-auto">
            Open any study topic to bookmark it, mark it completed, or record personal theological reflections in the marginalia sidebar.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.slug}
              className="rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-3 shadow-xs"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-semibold">
                    {item.disciplineName}
                  </span>
                  {Boolean(item.studied) && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-semibold">
                      <CheckCircle2 className="w-3 h-3" /> Studied
                    </span>
                  )}
                  {Boolean(item.bookmarked) && (
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 dark:bg-stone-800 text-amber-800 dark:text-amber-300">
                      <Bookmark className="w-3 h-3 fill-current" /> Bookmarked
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onOpenTopic(item.slug)}
                  className="px-3.5 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 text-white text-xs font-semibold transition"
                >
                  Open Study Room
                </button>
              </div>

              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
                {item.title}
              </h3>

              {item.notes && item.notes.trim() ? (
                <div className="p-4 rounded-xl bg-amber-50/70 dark:bg-stone-950 border-l-4 border-amber-700 font-reading text-base text-stone-800 dark:text-stone-200 whitespace-pre-line">
                  {item.notes}
                </div>
              ) : (
                <p className="text-xs italic text-stone-400">No written notes recorded yet.</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
