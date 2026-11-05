import React, { useState } from 'react';
import {
  Search,
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
import { getAccentClasses } from './DisciplineIcon';
import { api } from '../api';

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
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            {activeDiscObj ? `${activeDiscObj.greekTitle} • ${activeDiscObj.transliteration}` : 'Complete Curriculum'}
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            {activeDiscObj ? activeDiscObj.name : 'All Theological Study Topics'}
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl mt-1">
            {activeDiscObj
              ? activeDiscObj.description
              : 'Browse every module across Apologetics, Soteriology, Doctrine, Hermeneutics, Church History, Bible History, Church Fathers, and Moral Theology.'}
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition"
        >
          <Plus className="w-4 h-4" />
          Add Study Topic
        </button>
      </div>

      {/* Discipline Filter Pills */}
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onSelectDiscipline('all')}
          className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
            selectedDiscipline === 'all'
              ? 'bg-stone-900 text-white dark:bg-amber-500 dark:text-stone-950'
              : 'bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-300/70'
          }`}
        >
          All Wings
        </button>
        {disciplines.map((d) => (
          <button
            key={d.slug}
            onClick={() => onSelectDiscipline(d.slug)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition ${
              selectedDiscipline === d.slug
                ? 'bg-amber-900 text-white dark:bg-amber-500 dark:text-stone-950'
                : 'bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300 hover:border-amber-700/50'
            }`}
          >
            {d.name}
          </button>
        ))}
      </div>

      {/* Search & Filter Bar */}
      <div className="grid sm:grid-cols-12 gap-3 p-4 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <div className="sm:col-span-6 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Filter topics by concept, thinker, council, or Greek/Latin term..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
          />
        </div>

        <div className="sm:col-span-3">
          <select
            value={difficultyFilter}
            onChange={(e) => onDifficultyChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
          >
            <option value="all">All Levels</option>
            <option value="Foundational">Foundational</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
        </div>

        <div className="sm:col-span-3">
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
          >
            <option value="all">All Study Statuses</option>
            <option value="unstudied">Unstudied</option>
            <option value="studied">Completed / Studied</option>
            <option value="bookmarked">Bookmarked</option>
          </select>
        </div>
      </div>

      {/* Topic Grid */}
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
        <div className="grid md:grid-cols-2 gap-5">
          {topics.map((topic) => {
            const accent = getAccentClasses(topic.accentColor);
            return (
              <article
                key={topic.slug}
                className="flex flex-col justify-between rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-6 shadow-xs hover:shadow-md hover:border-amber-800/40 dark:hover:border-amber-500/40 transition"
              >
                <div className="space-y-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${accent.badge}`}>
                        {topic.disciplineName}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300 text-xs">
                        {topic.difficulty}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      {topic.studied && (
                        <span
                          title="Marked as Studied"
                          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300 text-[11px] font-medium"
                        >
                          <CheckCircle2 className="w-3 h-3" /> Studied
                        </span>
                      )}
                      {topic.bookmarked && (
                        <Bookmark className="w-4 h-4 text-amber-600 fill-amber-600" />
                      )}
                    </div>
                  </div>

                  <div>
                    <h2
                      onClick={() => onOpenTopic(topic.slug)}
                      className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 hover:text-amber-800 dark:hover:text-amber-400 cursor-pointer leading-snug"
                    >
                      {topic.title}
                    </h2>
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400 mt-0.5">
                      {topic.subtitle}
                    </p>
                  </div>

                  <p className="font-reading text-base text-stone-700 dark:text-stone-300 leading-relaxed line-clamp-3">
                    {topic.summary}
                  </p>

                  {topic.scriptureRefs.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 pt-1">
                      {topic.scriptureRefs.slice(0, 4).map((ref) => (
                        <span
                          key={ref}
                          className="text-[11px] px-2 py-0.5 rounded-md bg-amber-50 dark:bg-stone-800/80 text-amber-900 dark:text-amber-300 border border-amber-900/10"
                        >
                          {ref}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                <div className="pt-4 mt-5 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3 text-xs text-stone-500 dark:text-stone-400">
                    <span className="inline-flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> {topic.readingMinutes}m
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Globe className="w-3.5 h-3.5" /> {topic.sourceCount} sources
                    </span>
                    <span className="inline-flex items-center gap-1">
                      <Paperclip className="w-3.5 h-3.5" /> {topic.attachmentCount} files
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    {topic.questionCount > 0 && (
                      <button
                        onClick={() => onStartTopicQuiz(topic.slug)}
                        className="px-3 py-1.5 rounded-xl bg-amber-100/90 hover:bg-amber-200 dark:bg-amber-950/70 dark:hover:bg-amber-900 text-amber-900 dark:text-amber-200 text-xs font-semibold inline-flex items-center gap-1 transition"
                      >
                        <GraduationCap className="w-3.5 h-3.5" />
                        Quiz ({topic.questionCount})
                      </button>
                    )}
                    <button
                      onClick={() => onOpenTopic(topic.slug)}
                      className="px-4 py-1.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-semibold transition"
                    >
                      Open Study Room
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

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
