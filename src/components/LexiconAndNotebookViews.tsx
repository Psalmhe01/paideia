import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Search, BookOpen, CheckCircle2, StickyNote, ArrowLeft, FilePenLine, Plus } from 'lucide-react';
import { api } from '../api';
import type { DashboardStats, GlossaryItem, TopicSummary } from '../types';
import { EditorialHero } from './EditorialHero';
import { editorialImages } from '../data/editorialImages';
import { NoteEditor } from './NoteEditor';
import { SearchFilterPanel } from './SearchFilterPanel';

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
      <EditorialHero eyebrow="Lexicon theologicum · sacred language" title="Theological glossary"
        description="Understand the words and ideas that shaped Christian thought."
        image={editorialImages.library.src} imageAlt={editorialImages.library.alt} />

      <div className="search-results-layout">
        <SearchFilterPanel title="Search the glossary">
          <label className="ref-field">Find a term
            <span className="relative block"><Search className="absolute left-3 top-3" size={15} aria-hidden="true" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Greek, Hebrew, Latin, definition…" className="pl-9 w-full" /></span>
          </label>
          <label className="ref-field">Language or category
            <select value={language} onChange={(event) => setLanguage(event.target.value)}>
              <option value="all">All categories</option><option value="Theology">Theological vocabulary</option><option value="Greek">Greek (Ἑλληνική)</option><option value="Latin">Latin (Lingua Latina)</option><option value="Hebrew">Hebrew (עִבְרִית)</option>
            </select>
          </label>
        </SearchFilterPanel>
        <div className="search-results-layout__results">
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
      </div>
    </div>
  );
}

function notePreview(markdown: string) {
  return markdown
    .replace(/!\[([^\]]*)\]\([^)]+\)/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/^\s*(?:#{1,6}\s|>\s|[-+*]\s|\d+\.\s)/gm, '')
    .replace(/[ *_`~]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export function NotebookView({
  stats,
  topics,
  onOpenTopic,
  onDataChanged,
}: {
  stats: DashboardStats | null;
  topics: TopicSummary[];
  onOpenTopic: (slug: string) => void;
  onDataChanged: () => void | Promise<void>;
}) {
  const navigate = useNavigate();
  const { slug } = useParams();
  const allItems = stats?.notebookItems || [];
  const items = allItems.filter((item) => item.notes.trim());
  const selectedTopic = topics.find((topic) => topic.slug === slug);
  const selectedItem = allItems.find((item) => item.slug === slug);
  const noteTitle = selectedTopic?.title || selectedItem?.title;
  const noteSubtitle = selectedTopic?.subtitle || selectedItem?.subtitle;
  const disciplineName = selectedTopic?.disciplineName || selectedItem?.disciplineName;
  const [notes, setNotes] = useState('');
  const [savedNotes, setSavedNotes] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [savedMessage, setSavedMessage] = useState(false);
  const [showNewNotePicker, setShowNewNotePicker] = useState(false);
  const [newTopicSlug, setNewTopicSlug] = useState('');
  const [confirmLeave, setConfirmLeave] = useState(false);
  const [leaveDestination, setLeaveDestination] = useState<'notebook' | 'study' | null>(null);
  const dirty = notes !== savedNotes;

  useEffect(() => {
    if (!slug) return;
    const initialNotes = selectedItem?.notes || '';
    setNotes(initialNotes);
    setSavedNotes(initialNotes);
    setError('');
    setSavedMessage(false);
    setConfirmLeave(false);
  }, [slug, selectedItem?.notes]);

  async function saveNote(leaveAfter: 'notebook' | 'study' | null = null) {
    if (!slug) return;
    setSaving(true);
    setError('');
    try {
      await api.updateProgress(slug, { notes });
      setSavedNotes(notes);
      setSavedMessage(true);
      await onDataChanged();
      const destination = leaveAfter || leaveDestination;
      if (destination === 'study' && slug) onOpenTopic(slug);
      else if (destination === 'notebook') navigate('/notebook');
    } catch {
      setError('Could not save this note. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  async function deleteNote() {
    if (!slug) return;
    setSaving(true);
    setError('');
    try {
      await api.updateProgress(slug, { notes: '' });
      setNotes('');
      setSavedNotes('');
      await onDataChanged();
      navigate('/notebook');
    } catch {
      setError('Could not delete this note. Please try again.');
    } finally {
      setSaving(false);
    }
  }

  function leaveEditor(discard = false, destination: 'notebook' | 'study' = 'notebook') {
    if (dirty && !discard) {
      setLeaveDestination(destination);
      setConfirmLeave(true);
      return;
    }
    setConfirmLeave(false);
    setLeaveDestination(null);
    if (destination === 'study' && slug) onOpenTopic(slug);
    else navigate('/notebook');
  }

  return (
    <div className="space-y-6 pb-12">
      <EditorialHero eyebrow="Adversaria & marginalia" title={slug ? 'Study note' : 'Your study notebook'}
        description={slug ? 'Write, format, and revisit your reflections alongside the topic that inspired them.' : 'A home for your reflections, questions, and connections from across the curriculum.'}
        image={editorialImages.scripture.src} imageAlt={editorialImages.scripture.alt} />

      {slug ? (
        !noteTitle && topics.length === 0 && !stats ? (
          <div className="ref-card text-sm ref-muted" role="status">Opening your notebook…</div>
        ) : !noteTitle ? (
          <div className="ref-card space-y-3">
            <h2 className="ref-heading">Study topic not found</h2>
            <p className="ref-muted">Choose a topic from the study catalog to start a note.</p>
            <button type="button" className="ref-button" onClick={() => navigate('/notebook')}>Back to notebook</button>
          </div>
        ) : (
          <section className="min-w-0 space-y-4" aria-label="Notebook editor">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <button type="button" onClick={() => leaveEditor()} className="mb-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-900 hover:underline dark:text-amber-300"><ArrowLeft className="h-3.5 w-3.5" /> All notebook cards</button>
                <p className="ref-kicker">{disciplineName || 'Study topic'}</p>
                <h2 className="ref-heading">{noteTitle}</h2>
                {noteSubtitle && <p className="mt-1 text-sm ref-muted">{noteSubtitle}</p>}
              </div>
              <button type="button" onClick={() => leaveEditor(false, 'study')} className="ref-button">Open study topic</button>
            </div>
            {confirmLeave && (
              <div className="flex flex-wrap items-center justify-between gap-3 border border-amber-300 bg-amber-50 p-3 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-100" role="alert">
                <span>You have unsaved changes. Save them before leaving?</span>
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="ref-button ref-button-primary" onClick={() => void saveNote(leaveDestination || 'notebook')}>Save and leave</button>
                  <button type="button" className="ref-button" onClick={() => leaveEditor(true, leaveDestination || 'notebook')}>Discard changes</button>
                  <button type="button" className="ref-button" onClick={() => { setConfirmLeave(false); setLeaveDestination(null); }}>Keep editing</button>
                </div>
              </div>
            )}
            <NoteEditor
              value={notes}
              onChange={(value) => { setNotes(value); setSavedMessage(false); setError(''); }}
              onSave={saveNote}
              onDelete={savedNotes.trim() ? deleteNote : undefined}
              dirty={dirty}
              saving={saving}
              saved={savedMessage || (!!savedNotes.trim() && !dirty)}
              error={error}
            />
          </section>
        )
      ) : (
        <>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm ref-muted" role="status">{stats ? `${items.length} ${items.length === 1 ? 'note' : 'notes'} saved` : 'Loading your notes…'} · one living note per study topic</p>
            <button type="button" className="ref-button ref-button-primary inline-flex items-center gap-2" onClick={() => setShowNewNotePicker((open) => !open)} aria-expanded={showNewNotePicker}><Plus className="h-4 w-4" /> New note</button>
          </div>
          {showNewNotePicker && (
            <div className="grid gap-3 border border-stone-200 bg-[#fffdf9] p-4 dark:border-stone-800 dark:bg-stone-900 sm:grid-cols-[1fr_auto]">
              <label className="grid gap-1.5 text-xs font-semibold text-stone-700 dark:text-stone-200">
                Choose a study topic
                <select value={newTopicSlug} onChange={(event) => setNewTopicSlug(event.target.value)} className="min-h-11 w-full border border-stone-300 bg-white px-3 text-sm font-normal dark:border-stone-700 dark:bg-stone-950">
                  <option value="">Select a topic…</option>
                  {topics.map((topic) => <option key={topic.slug} value={topic.slug}>{topic.title} · {topic.disciplineName}{topic.hasNotes ? ' (has a note)' : ''}</option>)}
                </select>
              </label>
              <button type="button" disabled={!newTopicSlug} className="ref-button ref-button-primary self-end inline-flex min-h-11 items-center justify-center gap-2" onClick={() => newTopicSlug && navigate(`/notebook/${encodeURIComponent(newTopicSlug)}`)}><FilePenLine className="h-4 w-4" /> Open editor</button>
            </div>
          )}
          {items.length === 0 ? (
            <div className="ref-card space-y-4 p-8 text-center">
              <StickyNote className="mx-auto h-10 w-10 text-amber-700/70" />
              <div className="space-y-2">
                <h2 className="ref-heading">Your notebook is ready</h2>
                <p className="mx-auto max-w-lg text-sm ref-muted">Start a note from any study topic, then use the formatting tools to shape your reflections. Your saved notes will appear here as cards.</p>
              </div>
              <button type="button" className="ref-button ref-button-primary" onClick={() => navigate('/study')}>Browse study topics</button>
            </div>
          ) : (
            <div className="grid min-w-0 gap-4 md:grid-cols-2 xl:grid-cols-3">
              {items.map((item) => (
                <article key={item.slug} className="flex min-w-0 flex-col border border-stone-200 bg-[#fffdf9] dark:border-stone-800 dark:bg-stone-900">
                  <button type="button" onClick={() => navigate(`/notebook/${encodeURIComponent(item.slug)}`)} className="flex flex-1 flex-col text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-700">
                    <div className="flex w-full items-start justify-between gap-2 border-b border-stone-200/80 px-4 py-3 dark:border-stone-800">
                      <span className="text-[0.66rem] font-bold uppercase tracking-[0.14em] text-amber-900 dark:text-amber-300">{item.disciplineName}</span>
                      <span className="inline-flex shrink-0 items-center gap-1 text-[0.66rem] text-stone-500"><FilePenLine className="h-3.5 w-3.5" /> Study note</span>
                    </div>
                    <div className="flex w-full flex-1 flex-col gap-3 p-4">
                      <h2 className="font-display text-xl font-bold leading-tight text-stone-900 dark:text-stone-100">{item.title}</h2>
                      <p className="line-clamp-5 font-reading text-sm leading-6 text-stone-600 dark:text-stone-300">{notePreview(item.notes).slice(0, 240)}{notePreview(item.notes).length > 240 ? '…' : ''}</p>
                    </div>
                  </button>
                  <div className="flex items-center justify-between border-t border-stone-200 px-4 py-3 dark:border-stone-800">
                    <span className="inline-flex items-center gap-1 text-[0.68rem] text-stone-500">{Boolean(item.studied) && <><CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" /> Studied</>}</span>
                    <button type="button" className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-900 hover:underline dark:text-amber-300" onClick={() => navigate(`/notebook/${encodeURIComponent(item.slug)}`)}>Open note <ArrowLeft className="h-3.5 w-3.5 rotate-180" /></button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
