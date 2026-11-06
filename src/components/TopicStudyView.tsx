import { TrinityGuide } from './TrinityGuide';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { scriptureUrl } from '../../shared/reference';
import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Bookmark,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileText,
  Globe,
  GraduationCap,
  Paperclip,
  Plus,
  Quote,
  Trash2,
  Eye,
  Download,
  BookOpen,
} from 'lucide-react';
import type { AttachmentItem, TopicDetail } from '../types';
import { formatBytes } from './DisciplineIcon';
import { api } from '../api';
import { EditorialHero } from './EditorialHero';
import { studyImageFor } from '../data/editorialImages';
import { NoteEditor } from './NoteEditor';

export function TopicStudyView({
  topic,
  onBackToDiscipline,
  onOpenTopic,
  onStartTopicQuiz,
  onPreviewAttachment,
  onOpenAddSource,
  onOpenAddAttachment,
  onRefreshTopic,
  onProgressChanged,
}: {
  topic: TopicDetail;
  onBackToDiscipline: (disciplineSlug: string) => void;
  onOpenTopic: (slug: string) => void;
  onStartTopicQuiz: (slug: string) => void;
  onPreviewAttachment: (att: AttachmentItem) => void;
  onOpenAddSource: (topicSlug: string) => void;
  onOpenAddAttachment: (topicSlug: string, sourceId?: number | null) => void;
  onRefreshTopic: () => void;
  onProgressChanged: () => void;
}) {
  const [fontScale, setFontScale] = useState<'base' | 'lg' | 'xl'>('lg');
  const [notes, setNotes] = useState(topic.progress.notes || '');
  const [savedNotes, setSavedNotes] = useState(topic.progress.notes || '');
  const [savingNotes, setSavingNotes] = useState(false);
  const [notesSavedMsg, setNotesSavedMsg] = useState(false);
  const [notesError, setNotesError] = useState('');

  useEffect(() => {
    setNotes(topic.progress.notes || '');
    setSavedNotes(topic.progress.notes || '');
    setNotesError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [topic.slug]);

  const standaloneAttachments = topic.attachments.filter((a) => !a.sourceId);

  const proseSizeClass =
    fontScale === 'base'
      ? 'text-base leading-relaxed'
      : fontScale === 'lg'
        ? 'text-lg leading-relaxed'
        : 'text-xl leading-loose';

  async function toggleStudied() {
    await api.updateProgress(topic.slug, { studied: !topic.progress.studied });
    onRefreshTopic();
    onProgressChanged();
  }

  async function toggleBookmarked() {
    await api.updateProgress(topic.slug, { bookmarked: !topic.progress.bookmarked });
    onRefreshTopic();
    onProgressChanged();
  }

  async function saveNotes() {
    setSavingNotes(true);
    setNotesError('');
    try {
      await api.updateProgress(topic.slug, { notes });
      setSavedNotes(notes);
      setNotesSavedMsg(true);
      onProgressChanged();
      setTimeout(() => setNotesSavedMsg(false), 2500);
    } catch {
      setNotesError('Could not save this note. Please try again.');
    } finally {
      setSavingNotes(false);
    }
  }

  async function deleteNotes() {
    setSavingNotes(true);
    setNotesError('');
    try {
      await api.updateProgress(topic.slug, { notes: '' });
      setNotes('');
      setSavedNotes('');
      onProgressChanged();
    } catch {
      setNotesError('Could not delete this note. Please try again.');
    } finally {
      setSavingNotes(false);
    }
  }

  async function handleDeleteSource(id: number) {
    await api.deleteSource(id);
    onRefreshTopic();
    onProgressChanged();
  }

  async function handleDeleteAttachment(id: number) {
    await api.deleteAttachment(id);
    onRefreshTopic();
    onProgressChanged();
  }

  return (
    <div className="min-w-0 space-y-8 pb-16">
      {/* Top Action & Breadcrumb Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-stone-200 dark:border-stone-800">
        <button
          onClick={() => onBackToDiscipline(topic.disciplineSlug)}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-stone-600 dark:text-stone-400 hover:text-amber-800 dark:hover:text-amber-400 transition"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to {topic.disciplineName} ({topic.disciplineGreek})
        </button>

        <div className="flex flex-wrap items-center gap-2">
          {/* Font Scale Switcher */}
          <div className="inline-flex items-center rounded-xl border border-stone-200 dark:border-stone-800 bg-[#fffdf9] dark:bg-stone-900 p-0.5 text-xs">
            {(['base', 'lg', 'xl'] as const).map((sz, idx) => (
              <button
                key={sz}
                onClick={() => setFontScale(sz)}
                className={`px-2.5 py-1 rounded-lg font-serif font-semibold transition ${
                  fontScale === sz
                    ? 'bg-amber-900 text-white dark:bg-amber-600'
                    : 'text-stone-600 dark:text-stone-400'
                }`}
                title="Reading text size"
              >
                {idx === 0 ? 'A-' : idx === 1 ? 'A' : 'A+'}
              </button>
            ))}
          </div>

          <button
            onClick={toggleBookmarked}
            className={`px-3 py-1.5 rounded-xl border text-xs font-semibold inline-flex items-center gap-1.5 transition ${
              topic.progress.bookmarked
                ? 'bg-amber-100 border-amber-300 text-amber-900 dark:bg-amber-950/70 dark:border-amber-700 dark:text-amber-200'
                : 'bg-[#fffdf9] dark:bg-stone-900 border-stone-200 dark:border-stone-800 text-stone-700 dark:text-stone-300'
            }`}
          >
            <Bookmark
              className={`w-3.5 h-3.5 ${topic.progress.bookmarked ? 'fill-current' : ''}`}
            />
            {topic.progress.bookmarked ? 'Bookmarked' : 'Bookmark'}
          </button>

          <button
            onClick={toggleStudied}
            className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition ${
              topic.progress.studied
                ? 'bg-emerald-700 text-white hover:bg-emerald-600'
                : 'bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white'
            }`}
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            {topic.progress.studied ? 'Completed' : 'Mark Studied'}
          </button>

          {topic.quizSummary.questionCount > 0 && (
            <button
              onClick={() => onStartTopicQuiz(topic.slug)}
              className="px-3.5 py-1.5 rounded-xl bg-amber-700 hover:bg-amber-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              Take Topic Quiz ({topic.quizSummary.questionCount})
            </button>
          )}
        </div>
      </div>

      <EditorialHero eyebrow={`${topic.disciplineName} · ${topic.disciplineGreek} · ${topic.difficulty}`}
        title={topic.title} description={`${topic.subtitle}. ${topic.summary}`}
        image={studyImageFor(topic.disciplineSlug).src} imageAlt={studyImageFor(topic.disciplineSlug).alt}
        className="study-editorial-hero">
        <div className="study-hero-meta"><span><Clock className="w-3.5 h-3.5" /> {topic.readingMinutes} min study</span>
          {topic.era && <span>{topic.era}</span>}
          {topic.quizSummary.bestPercentage != null && <span>Quiz mastery {Math.round(topic.quizSummary.bestPercentage)}%</span>}
        </div>
        {topic.scriptureRefs.length > 0 && <div className="study-hero-scriptures">
          <span><BookOpen className="w-3.5 h-3.5" /> Key passages</span>
          {topic.scriptureRefs.map((ref) => <Link key={ref} to={scriptureUrl(ref)} title="Read in the Bible room">{ref}</Link>)}
        </div>}
      </EditorialHero>

      {(['church-history', 'soteriology', 'hermeneutics', 'eschatology'].includes(topic.disciplineSlug)) && (
        <aside className="ref-inset flex flex-wrap items-center justify-between gap-3">
          <div><p className="ref-kicker">Visual study guide</p><p className="font-reading text-lg">Explore the related timeline or comparison chart.</p></div>
          <Link className="ref-button" to={({ 'church-history': '/atlas', soteriology: '/atlas/atonement', hermeneutics: '/atlas/interpretation', eschatology: '/atlas/millennium' } as Record<string, string>)[topic.disciplineSlug]}>Open the atlas</Link>
        </aside>
      )}

      {['trinity-theology-proper', 'trinitarian-orthodoxy-nicaea', 'the-trinity', 'trinity'].includes(topic.slug) && <TrinityGuide />}

      {/* Main Two-Column Scholarly Layout */}
      <div className="grid min-w-0 lg:grid-cols-12 gap-8">
        {/* Left / Center Reading Column */}
        <div className="min-w-0 lg:col-span-8 space-y-8">
          {/* Exposition Sections */}
          <div className="space-y-6">
            {topic.sections.map((sec, idx) => (
              <section
                key={idx}
                id={`section-${idx}`}
                className="min-w-0 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 p-4 sm:p-8 space-y-4 shadow-xs"
              >
                <div className="min-w-0 flex items-baseline gap-3">
                  <span className="font-display text-2xl font-bold text-amber-800/70 dark:text-amber-500/70">
                    {String(idx + 1).padStart(2, '0')}.
                  </span>
                  <h2 className="min-w-0 break-words font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100">
                    {sec.heading}
                  </h2>
                </div>
                <div className={'article-markdown font-reading text-stone-800 dark:text-stone-200 ' + proseSizeClass}>
                  <ReactMarkdown>{sec.body}</ReactMarkdown>
                </div>
                {sec.keyTakeaway && (
                  <div className="mt-4 p-4 rounded-xl bg-amber-50/90 dark:bg-amber-950/30 border-l-4 border-amber-700 dark:border-amber-500">
                    <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-900 dark:text-amber-400 mb-0.5">
                      Thesis & Takeaway
                    </span>
                    <p className="text-sm text-stone-800 dark:text-stone-200 font-medium">
                      {sec.keyTakeaway}
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Primary Source Excerpts */}
          {topic.excerpts.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                <Quote className="w-6 h-6 text-amber-800 dark:text-amber-400" />
                Voices from the Primary Sources
              </h2>
              <div className="space-y-4">
                {topic.excerpts.map((ex, i) => (
                  <blockquote
                    key={i}
                    className="rounded-2xl bg-gradient-to-br from-[#fcf8f0] to-[#f7f0e2] dark:from-stone-900 dark:to-stone-950 border border-amber-900/20 dark:border-amber-500/20 p-6 space-y-3"
                  >
                    <p className="font-reading italic text-xl leading-relaxed text-stone-900 dark:text-stone-100">
                      “{ex.quote}”
                    </p>
                    <footer className="flex flex-wrap items-center justify-between gap-2 text-xs text-stone-600 dark:text-stone-400 pt-2 border-t border-amber-900/10 dark:border-stone-800">
                      <div>
                        <strong className="text-stone-900 dark:text-stone-200">{ex.author}</strong>,{' '}
                        <span className="italic">{ex.work}</span> ({ex.year}) — {ex.citation}
                      </div>
                      {ex.sourceUrl && (
                        <a
                          href={ex.sourceUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 font-semibold text-amber-800 dark:text-amber-400 hover:underline"
                        >
                          Read Full Primary Text <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </footer>
                  </blockquote>
                ))}
              </div>
            </section>
          )}

          {/* Comparative Theological Perspectives */}
          {topic.perspectives.length > 0 && (
            <section className="space-y-4">
              <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
                Historical & Confessional Perspectives
              </h2>
              <div className="grid sm:grid-cols-2 gap-4">
                {topic.perspectives.map((p, i) => (
                  <div
                    key={i}
                    className="rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 space-y-2"
                  >
                    <span className="inline-block px-2.5 py-0.5 rounded-full bg-amber-100/80 dark:bg-amber-950/60 text-amber-900 dark:text-amber-300 text-xs font-semibold">
                      {p.tradition}
                    </span>
                    <p className="text-xs font-medium text-stone-500 dark:text-stone-400">
                      Key Representatives: {p.proponent}
                    </p>
                    <p className="text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                      {p.summary}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* ONLINE RESOURCES & COMPANION ATTACHMENTS */}
          <section
            id="sources-and-attachments"
            className="min-w-0 rounded-3xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-8 space-y-6"
          >
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  Fontes & Companion Documents
                </span>
                <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
                  Online Sources & Linked Attachments
                </h2>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                  Explore authoritative open-access texts alongside downloadable study PDFs, worksheets, and notes attached directly to them.
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() => onOpenAddSource(topic.slug)}
                  className="px-3.5 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition"
                >
                  <Globe className="w-3.5 h-3.5" />
                  + Online Source
                </button>
                <button
                  onClick={() => onOpenAddAttachment(topic.slug, null)}
                  className="px-3.5 py-2 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition"
                >
                  <Paperclip className="w-3.5 h-3.5" />
                  + Attach File / Note
                </button>
              </div>
            </div>

            {/* Online Sources List (each showing its attached files!) */}
            <div className="space-y-4">
              {topic.sources.map((src) => (
                <div
                  key={src.id}
                  className="min-w-0 rounded-2xl border border-stone-200 dark:border-stone-800 bg-stone-50/70 dark:bg-stone-950/50 p-4 sm:p-5 space-y-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1.5 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 text-xs">
                        <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-semibold">
                          {src.repository}
                        </span>
                        <span className="px-2 py-0.5 rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
                          {src.sourceType}
                        </span>
                        <span className="text-stone-500">
                          {src.author} {src.year ? `(${src.year})` : ''}
                        </span>
                      </div>

                      <h3 className="break-words font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                        <a
                          href={src.url}
                          target="_blank"
                          rel="noreferrer"
                          className="min-w-0 break-words hover:text-amber-800 dark:hover:text-amber-400 inline-flex items-center gap-1.5"
                        >
                          {src.title}
                          <ExternalLink className="w-4 h-4 shrink-0 text-amber-700 dark:text-amber-400" />
                        </a>
                      </h3>

                      {src.summary && (
                        <p className="text-sm text-stone-600 dark:text-stone-400">{src.summary}</p>
                      )}
                      {src.citation && (
                        <p className="text-[11px] italic text-stone-500">Citation: {src.citation}</p>
                      )}
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => onOpenAddAttachment(topic.slug, src.id)}
                        title="Attach a companion PDF, note, or worksheet directly to this online source"
                        className="px-2.5 py-1.5 rounded-lg bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 hover:border-amber-700 text-xs font-medium text-stone-700 dark:text-stone-300 inline-flex items-center gap-1 transition"
                      >
                        <Plus className="w-3.5 h-3.5" /> Attach
                      </button>
                      {src.isCustom && (
                        <button
                          onClick={() => handleDeleteSource(src.id)}
                          title="Remove custom source"
                          className="p-1.5 rounded-lg text-rose-600 hover:bg-rose-100 dark:hover:bg-rose-950/60"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Nested Attachments linked specifically to this Online Source */}
                  {src.attachments && src.attachments.length > 0 && (
                    <div className="pl-4 border-l-2 border-amber-700/40 space-y-2 pt-1">
                      <span className="block text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                        Attached Source Companions ({src.attachments.length})
                      </span>
                      {src.attachments.map((att) => (
                        <div
                          key={att.id}
                          className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
                        >
                          <div className="flex items-start gap-2.5 min-w-0">
                            <FileText className="w-4 h-4 text-amber-800 dark:text-amber-400 mt-0.5 shrink-0" />
                            <div className="min-w-0">
                              <p className="text-xs font-semibold text-stone-900 dark:text-stone-100 truncate">
                                {att.title}
                              </p>
                              <p className="text-[11px] text-stone-500">
                                {att.attachmentKind} • {att.fileName} ({formatBytes(att.fileSize)})
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <button
                              onClick={() => onPreviewAttachment(att)}
                              className="px-2.5 py-1 rounded-lg bg-amber-100/80 hover:bg-amber-200 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 text-xs font-semibold inline-flex items-center gap-1"
                            >
                              <Eye className="w-3 h-3" /> Read / View
                            </button>
                            <a
                              href={att.downloadUrl}
                              download
                              className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 dark:bg-stone-800 text-stone-700 dark:text-stone-200 text-xs font-medium inline-flex items-center gap-1"
                            >
                              <Download className="w-3 h-3" /> Download
                            </a>
                            {att.isCustom && (
                              <button
                                onClick={() => handleDeleteAttachment(att.id)}
                                className="p-1 text-rose-600 hover:bg-rose-100 rounded-md"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* General Topic Attachments (not tied to a single URL) */}
            {standaloneAttachments.length > 0 && (
              <div className="space-y-2.5 pt-3 border-t border-stone-200 dark:border-stone-800">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Additional Topic Study Attachments ({standaloneAttachments.length})
                </h3>
                {standaloneAttachments.map((att) => (
                  <div
                    key={att.id}
                    className="flex flex-wrap items-center justify-between gap-3 p-3.5 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200 dark:border-stone-800"
                  >
                    <div className="flex items-start gap-2.5 min-w-0">
                      <Paperclip className="w-4 h-4 text-amber-800 dark:text-amber-400 mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {att.title}
                        </p>
                        <p className="text-xs text-stone-500">
                          {att.attachmentKind} • {att.fileName} ({formatBytes(att.fileSize)})
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => onPreviewAttachment(att)}
                        className="px-3 py-1.5 rounded-lg bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 text-xs font-semibold inline-flex items-center gap-1"
                      >
                        <Eye className="w-3.5 h-3.5" /> View
                      </button>
                      <a
                        href={att.downloadUrl}
                        download
                        className="px-3 py-1.5 rounded-lg bg-stone-200/70 hover:bg-stone-300/70 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-medium inline-flex items-center gap-1"
                      >
                        <Download className="w-3.5 h-3.5" /> Download
                      </a>
                      {att.isCustom && (
                        <button
                          onClick={() => handleDeleteAttachment(att.id)}
                          className="p-1.5 text-rose-600 hover:bg-rose-100 rounded-lg"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </section>
        </div>

        {/* Right Scholarly Marginalia Column */}
        <aside className="min-w-0 lg:col-span-4 space-y-6">
          {/* Key Theological Terms */}
          {topic.keyTerms.length > 0 && (
            <div className="rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 space-y-3.5">
              <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                Key Theological Terms
              </h3>
              <div className="space-y-3">
                {topic.keyTerms.map((kt, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-stone-50 dark:bg-stone-950/60 border border-stone-200/80 dark:border-stone-800 space-y-1"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-1">
                      <span className="font-semibold text-sm text-amber-900 dark:text-amber-300">
                        {kt.term}
                      </span>
                      {kt.originalScript && (
                        <span className="font-reading italic text-xs text-stone-500">
                          {kt.originalScript}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
                      {kt.definition}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Study notes are also editable from the notebook page. */}
          <section className="min-w-0 space-y-3" aria-labelledby="study-note-heading">
            <div className="flex flex-wrap items-end justify-between gap-2">
              <div>
                <h3 id="study-note-heading" className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">Study notebook</h3>
                <p className="mt-1 text-xs text-stone-500 dark:text-stone-400">Keep one living note for this topic. Format it here or continue in your notebook.</p>
              </div>
              <Link to={`/notebook/${encodeURIComponent(topic.slug)}`} className="text-xs font-semibold text-amber-900 underline-offset-4 hover:underline dark:text-amber-300">Open notebook</Link>
            </div>
            <NoteEditor
              value={notes}
              onChange={(value) => { setNotes(value); setNotesSavedMsg(false); setNotesError(''); }}
              onSave={saveNotes}
              onDelete={savedNotes.trim() ? deleteNotes : undefined}
              dirty={notes !== savedNotes}
              saving={savingNotes}
              saved={notesSavedMsg || (!!savedNotes.trim() && notes === savedNotes)}
              error={notesError}
              compact
            />
          </section>

          {/* Topic Quiz Callout */}
          {topic.quizSummary.questionCount > 0 && (
            <div className="rounded-2xl bg-gradient-to-br from-amber-900 to-stone-900 text-white p-6 space-y-3 shadow-md">
              <div className="flex items-center gap-2 text-amber-300 text-xs font-semibold uppercase tracking-wider">
                <GraduationCap className="w-4 h-4" />
                Catechetical Examination
              </div>
              <h3 className="font-display text-2xl font-bold">Test Your Mastery</h3>
              <p className="text-xs text-stone-200 leading-relaxed">
                Ready to verify what you have studied? Take the {topic.quizSummary.questionCount}-question examination covering primary sources, terminology, and doctrinal nuances.
              </p>
              <button
                onClick={() => onStartTopicQuiz(topic.slug)}
                className="w-full py-2.5 px-4 rounded-xl bg-amber-500 hover:bg-amber-400 text-stone-950 text-xs font-bold transition"
              >
                Launch Topic Quiz ({topic.quizSummary.questionCount} Questions)
              </button>
            </div>
          )}

          {/* Cross-Referenced Topics */}
          {topic.relatedTopics.length > 0 && (
            <div className="rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 space-y-3">
              <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                Cross-Referenced Concepts
              </h3>
              <div className="space-y-2">
                {topic.relatedTopics.map((rel) => (
                  <button
                    key={rel.slug}
                    onClick={() => onOpenTopic(rel.slug)}
                    className="w-full text-left p-3 rounded-xl bg-stone-50 hover:bg-amber-50/70 dark:bg-stone-950/60 dark:hover:bg-stone-800 border border-stone-200/80 dark:border-stone-800 transition"
                  >
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      {rel.disciplineName}
                    </span>
                    <p className="text-sm font-semibold text-stone-900 dark:text-stone-100 mt-0.5">
                      {rel.title}
                    </p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
