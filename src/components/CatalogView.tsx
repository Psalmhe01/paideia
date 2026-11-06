import React, { useState } from 'react';
import {
  Search,
  ArrowRight,
  Clock,
  Globe,
  Paperclip,
  GraduationCap,
  CheckCircle2,
  Bookmark,
  Plus,
  X,
} from 'lucide-react';
import type { DisciplineSummary, TopicSummary } from '../types';
import { api } from '../api';
import { EditorialHero } from './EditorialHero';
import { editorialImages } from '../data/editorialImages';
import { studyImageFor } from '../data/editorialImages';
import { SearchFilterPanel } from './SearchFilterPanel';

export function CatalogView({
  disciplines,
  topics,
  selectedDiscipline,
  onSelectDiscipline,
  searchQuery,
  onSearchChange,
  difficultyFilter,
  onDifficultyChange,
  statusFilter,
  onStatusChange,
  onOpenTopic,
  onStartTopicQuiz,
  onTopicCreated,
}: {
  disciplines: DisciplineSummary[];
  topics: TopicSummary[];
  selectedDiscipline: string;
  onSelectDiscipline: (slug: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  difficultyFilter: string;
  onDifficultyChange: (d: string) => void;
  statusFilter: string;
  onStatusChange: (s: string) => void;
  onOpenTopic: (slug: string) => void;
  onStartTopicQuiz: (slug: string) => void;
  onTopicCreated: (newSlug: string) => void;
}) {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newDiscipline, setNewDiscipline] = useState(
    selectedDiscipline !== 'all' ? selectedDiscipline : disciplines[0]?.slug || 'doctrine'
  );
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newDifficulty, setNewDifficulty] = useState('Intermediate');
  const [newEra, setNewEra] = useState('Patristic & Reformation');
  const [newScriptures, setNewScriptures] = useState('');
  const [newHeading, setNewHeading] = useState('Core Theological Exposition');
  const [newBody, setNewBody] = useState('');
  const [saving, setSaving] = useState(false);

  const activeDiscObj = disciplines.find((d) => d.slug === selectedDiscipline);

  async function handleCreateTopic(e: React.FormEvent) {
    e.preventDefault();
    if (!newTitle.trim() || !newSummary.trim()) return;
    setSaving(true);
    try {
      const created = await api.createTopic({
        disciplineSlug: newDiscipline,
        title: newTitle.trim(),
        subtitle: newSubtitle.trim() || 'Scholarly Theological Module',
        summary: newSummary.trim(),
        difficulty: newDifficulty,
        readingMinutes: 10,
        era: newEra.trim(),
        scriptureRefs: newScriptures
          .split(',')
          .map((s) => s.trim())
          .filter(Boolean),
        sections: [
          {
            heading: newHeading.trim() || 'Theological Exposition',
            body: newBody.trim() || newSummary.trim(),
          },
        ],
      });
      setShowCreateModal(false);
      setNewTitle('');
      setNewSubtitle('');
      setNewSummary('');
      setNewBody('');
      onTopicCreated(created.slug);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="space-y-6 pb-12">
      <EditorialHero
        eyebrow={activeDiscObj ? `${activeDiscObj.greekTitle} · ${activeDiscObj.transliteration}` : 'Theological curriculum'}
        title={activeDiscObj ? activeDiscObj.name : 'Study the Christian tradition'}
        description={activeDiscObj?.description ?? 'Explore doctrine, Scripture, church history, and the questions that shaped Christian thought.'}
        image={editorialImages.library.src}
        imageAlt={editorialImages.library.alt}
        className="page-hero--catalog"
      >
        <button onClick={() => setShowCreateModal(true)} className="editorial-button editorial-button--light">
          <Plus className="w-4 h-4" /> Add a study topic
        </button>
      </EditorialHero>

      <div className="search-results-layout">
        <SearchFilterPanel title="Refine study topics">
          <label className="ref-field">Discipline
            <select value={selectedDiscipline} onChange={(event) => onSelectDiscipline(event.target.value)}>
              <option value="all">All disciplines</option>
              {disciplines.map((discipline) => <option key={discipline.slug} value={discipline.slug}>{discipline.name}</option>)}
            </select>
          </label>
          <label className="ref-field">Search topics
            <span className="relative block"><Search className="absolute left-3 top-3" size={15} aria-hidden="true" /><input type="search" value={searchQuery} onChange={(event) => onSearchChange(event.target.value)} placeholder="Concept, thinker, council…" className="pl-9 w-full" /></span>
          </label>
          <label className="ref-field">Difficulty
            <select value={difficultyFilter} onChange={(event) => onDifficultyChange(event.target.value)}>
              <option value="all">All levels</option><option value="Foundational">Foundational</option><option value="Intermediate">Intermediate</option><option value="Advanced">Advanced</option>
            </select>
          </label>
          <label className="ref-field">Study status
            <select value={statusFilter} onChange={(event) => onStatusChange(event.target.value)}>
              <option value="all">All statuses</option><option value="unstudied">Unstudied</option><option value="studied">Studied</option><option value="bookmarked">Bookmarked</option>
            </select>
          </label>
          <button type="button" className="ref-button" onClick={() => { onSelectDiscipline('all'); onSearchChange(''); onDifficultyChange('all'); onStatusChange('all'); }}>Reset filters</button>
        </SearchFilterPanel>

        <div className="search-results-layout__results">
      <p className="ref-muted text-sm" role="status">{topics.length} {topics.length === 1 ? 'study topic' : 'study topics'}</p>
      {topics.length === 0 ? (
        <div className="text-center py-16 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
          <p className="font-display text-2xl text-stone-700 dark:text-stone-300">
            No theological modules match your current filters.
          </p>
          <button
            onClick={() => {
              onSelectDiscipline('all');
              onSearchChange('');
              onDifficultyChange('all');
              onStatusChange('all');
            }}
            className="mt-3 text-sm text-amber-800 dark:text-amber-400 underline"
          >
            Reset all filters
          </button>
        </div>
      ) : (
        <div className="grid min-w-0 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {topics.map((topic) => {
            const image = studyImageFor(topic.disciplineSlug, `${topic.title} ${topic.slug}`);
            return (
              <article key={topic.slug} className="study-topic-card">
                <button type="button" className="study-topic-card__visual" onClick={() => onOpenTopic(topic.slug)} aria-label={`Open ${topic.title}`}>
                  <img src={image.src} alt={image.alt} loading="lazy" />
                  <span className="study-topic-card__shade" aria-hidden="true" />
                  <span className="study-topic-card__visual-labels"><span>{topic.disciplineName}</span><span>{topic.difficulty}</span></span>
                  <span className="study-topic-card__visual-status">
                    {topic.studied && <span><CheckCircle2 size={13} /> Studied</span>}
                    {topic.bookmarked && <Bookmark size={15} fill="currentColor" aria-label="Bookmarked" />}
                  </span>
                  <span className="study-topic-card__visual-link">Explore study <ArrowRight size={14} /></span>
                </button>

                <div className="study-topic-card__body">
                  <div className="study-topic-card__title-group">
                    <p className="study-topic-card__subtitle">{topic.subtitle}</p>
                    <h2><button type="button" onClick={() => onOpenTopic(topic.slug)}>{topic.title}</button></h2>
                  </div>
                  <p className="study-topic-card__summary">{topic.summary}</p>

                  {topic.scriptureRefs.length > 0 && <div className="study-topic-card__scriptures" aria-label="Key Scripture references">
                    {topic.scriptureRefs.slice(0, 2).map((ref) => <span key={ref}>{ref}</span>)}
                    {topic.scriptureRefs.length > 2 && <span>+{topic.scriptureRefs.length - 2}</span>}
                  </div>}

                  <div className="study-topic-card__footer">
                    <div className="study-topic-card__meta">
                      <span><Clock size={13} /> {topic.readingMinutes} min</span>
                      <span><Globe size={13} /> {topic.sourceCount} sources</span>
                      {topic.attachmentCount > 0 && <span><Paperclip size={13} /> {topic.attachmentCount} files</span>}
                    </div>
                    <div className="study-topic-card__actions">
                      {topic.questionCount > 0 && <button type="button" className="study-topic-card__quiz" onClick={() => onStartTopicQuiz(topic.slug)}>
                        <GraduationCap size={14} /> Quiz
                      </button>}
                      <button type="button" className="study-topic-card__open" onClick={() => onOpenTopic(topic.slug)}>Open study <ArrowRight size={14} /></button>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
        </div>
      </div>

      {/* Create Custom Topic Modal */}
      {showCreateModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4"
          onClick={() => setShowCreateModal(false)}
        >
          <div
            className="w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-300 dark:border-stone-700 p-6 shadow-2xl space-y-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between">
              <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
                Add Custom Theological Study Topic
              </h3>
              <button
                onClick={() => setShowCreateModal(false)}
                className="p-1.5 rounded-lg text-stone-500 hover:bg-stone-200/60"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreateTopic} className="space-y-3.5">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Theological Discipline
                  </label>
                  <select
                    value={newDiscipline}
                    onChange={(e) => setNewDiscipline(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  >
                    {disciplines.map((d) => (
                      <option key={d.slug} value={d.slug}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Difficulty Level
                  </label>
                  <select
                    value={newDifficulty}
                    onChange={(e) => setNewDifficulty(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  >
                    <option value="Foundational">Foundational</option>
                    <option value="Intermediate">Intermediate</option>
                    <option value="Advanced">Advanced</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Topic Title *
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="e.g., Covenant Theology & The Marrow Controversy"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                />
              </div>

              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={newSubtitle}
                    onChange={(e) => setNewSubtitle(e.target.value)}
                    placeholder="Historical & Dogmatic Analysis"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Historical Era
                  </label>
                  <input
                    type="text"
                    value={newEra}
                    onChange={(e) => setNewEra(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Key Scripture References (comma-separated)
                </label>
                <input
                  type="text"
                  value={newScriptures}
                  onChange={(e) => setNewScriptures(e.target.value)}
                  placeholder="Genesis 17:7, Galatians 3:29, Hebrews 13:20"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Executive Summary *
                </label>
                <textarea
                  rows={2}
                  required
                  value={newSummary}
                  onChange={(e) => setNewSummary(e.target.value)}
                  placeholder="Concise overview of this theological concept..."
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                  Main Exposition Section Heading & Body
                </label>
                <input
                  type="text"
                  value={newHeading}
                  onChange={(e) => setNewHeading(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm mb-2"
                />
                <textarea
                  rows={5}
                  value={newBody}
                  onChange={(e) => setNewBody(e.target.value)}
                  placeholder="Full theological exposition... (After saving, you can attach online sources and PDF/Markdown files directly!)"
                  className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl text-sm text-stone-600 dark:text-stone-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-sm font-semibold"
                >
                  {saving ? 'Creating...' : 'Create Study Module'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
