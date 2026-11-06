import React, { useEffect, useState } from 'react';
import {
  GraduationCap,
  CheckCircle2,
  XCircle,
  Trophy,
  RotateCcw,
  ArrowRight,
  Clock,
  BookOpen,
  AlertCircle,
  Sliders,
} from 'lucide-react';
import { api } from '../api';
import type {
  GeneratedQuiz,
  QuizFeedback,
  QuizOverviewData,
  QuizQuestion,
  QuizSubmissionResult,
} from '../types';
import { DisciplineIcon, getAccentClasses } from './DisciplineIcon';
import { EditorialHero } from './EditorialHero';
import { editorialImages } from '../data/editorialImages';
import { SearchFilterPanel } from './SearchFilterPanel';

export interface InitialQuizRequest {
  scope: 'topic' | 'discipline';
  slug: string;
  nonce: number;
}

function getQuestionTypeLabel(t: QuizQuestion['questionType']): string {
  switch (t) {
    case 'source_attribution':
      return 'Primary Source Attribution';
    case 'term_identification':
      return 'Theological Lexicon';
    case 'true_false':
      return 'Doctrinal Discernment (T/F)';
    default:
      return 'Multiple Choice';
  }
}

function getMasteryRank(pct: number): { title: string; subtitle: string } {
  if (pct >= 90) {
    return {
      title: 'Magister Sacrae Paginae',
      subtitle: 'Exemplary command of primary sources, councils, and doctrinal distinctions.',
    };
  }
  if (pct >= 75) {
    return {
      title: 'Seasoned Disputant',
      subtitle: 'Strong theological grasp with minor nuances remaining to refine.',
    };
  }
  if (pct >= 60) {
    return {
      title: 'Advancing Lector',
      subtitle: 'Solid foundational footing; revisit the cited topics below to deepen mastery.',
    };
  }
  return {
    title: 'Dedicated Catechumen',
    subtitle: 'Every scholar begins in inquiry—review the explanations and study modules below.',
  };
}

export function QuizCenterView({
  initialRequest,
  onClearInitialRequest,
  onOpenTopic,
  onQuizCompleted,
}: {
  initialRequest: InitialQuizRequest | null;
  onClearInitialRequest: () => void;
  onOpenTopic: (slug: string) => void;
  onQuizCompleted: () => void;
}) {
  const [overview, setOverview] = useState<QuizOverviewData | null>(null);
  const [mode, setMode] = useState<'study' | 'exam'>('study');
  const [topicFilter, setTopicFilter] = useState('');

  // Custom Exam Builder state
  const [customDisciplines, setCustomDisciplines] = useState<string[]>([
    'apologetics',
    'soteriology',
    'doctrine',
  ]);
  const [customDifficulty, setCustomDifficulty] = useState('all');
  const [customCount, setCustomCount] = useState(10);

  // Active Quiz Session state
  const [activeQuiz, setActiveQuiz] = useState<GeneratedQuiz | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [revealedInStudy, setRevealedInStudy] = useState<Record<number, QuizFeedback>>({});
  const [checking, setChecking] = useState(false);
  const [startTimeMs, setStartTimeMs] = useState<number>(0);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<QuizSubmissionResult | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    loadOverview();
  }, []);

  useEffect(() => {
    if (initialRequest) {
      if (initialRequest.scope === 'topic') {
        startQuiz({ scope: 'topic', topicSlug: initialRequest.slug, count: 10 });
      } else {
        startQuiz({ scope: 'discipline', disciplineSlug: initialRequest.slug, count: 10 });
      }
      onClearInitialRequest();
    }
  }, [initialRequest]);

  useEffect(() => {
    if (!activeQuiz || result) return;
    const id = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTimeMs) / 1000));
    }, 1000);
    return () => clearInterval(id);
  }, [activeQuiz, result, startTimeMs]);

  async function loadOverview() {
    const data = await api.getQuizOverview();
    setOverview(data);
  }

  async function startQuiz(params: {
    scope: 'topic' | 'discipline' | 'custom' | 'missed';
    topicSlug?: string;
    disciplineSlug?: string;
    disciplineSlugs?: string[];
    difficulty?: string;
    count?: number;
  }) {
    setError('');
    try {
      const generated = await api.generateQuiz(params);
      if (!generated.questions || generated.questions.length === 0) {
        setError('No questions matched that filter combination. Try broadening the difficulty.');
        return;
      }
      setActiveQuiz(generated);
      setCurrentIndex(0);
      setSelectedAnswers({});
      setRevealedInStudy({});
      setResult(null);
      setStartTimeMs(Date.now());
      setElapsedSeconds(0);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start quiz');
    }
  }

  async function finishAndSubmitQuiz() {
    if (!activeQuiz) return;
    setSubmitting(true);
    try {
      const duration = Math.max(1, Math.floor((Date.now() - startTimeMs) / 1000));
      const answersPayload = activeQuiz.questions.map((q) => ({
        questionId: q.id,
        selectedIndex: selectedAnswers[q.id] ?? -1,
      }));
      const res = await api.submitQuiz({
        title: activeQuiz.title,
        mode,
        disciplineSlug: activeQuiz.disciplineSlug,
        topicSlug: activeQuiz.topicSlug,
        durationSeconds: duration,
        answers: answersPayload,
      });
      setResult(res);
      loadOverview();
      onQuizCompleted();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The attempt could not be saved.');
    } finally {
      setSubmitting(false);
    }
  }

  async function checkAnswer(questionId: number, selectedIndex: number) {
    setChecking(true);
    setError('');
    try {
      const feedback = await api.checkQuizAnswer(questionId, selectedIndex);
      setRevealedInStudy((previous) => ({ ...previous, [questionId]: feedback }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'The answer could not be checked.');
    } finally {
      setChecking(false);
    }
  }

  function exitQuiz() {
    setActiveQuiz(null);
    setResult(null);
    loadOverview();
  }

  function toggleCustomDiscipline(slug: string) {
    setCustomDisciplines((prev) =>
      prev.includes(slug) ? prev.filter((s) => s !== slug) : [...prev, slug]
    );
  }

  // =========================================================================
  // 1. QUIZ RESULTS VIEW
  // =========================================================================
  if (activeQuiz && result) {
    const rank = getMasteryRank(result.percentage);
    const missedInAttempt = result.details.filter((d) => !d.isCorrect);

    return (
      <div className="max-w-4xl mx-auto space-y-8 pb-16">
        <div className="rounded-3xl bg-gradient-to-br from-[#231b15] via-[#2e2118] to-[#1b1613] text-stone-100 p-8 sm:p-10 border border-amber-500/25 shadow-xl space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-semibold">
              <Trophy className="w-4 h-4" /> EXAMINATION COMPLETED
            </span>
            <span className="text-xs text-stone-400 inline-flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" /> {result.durationSeconds}s •{' '}
              {result.mode === 'study' ? 'Catechetical Study Mode' : 'Synod Exam Mode'}
            </span>
          </div>

          <div className="grid sm:grid-cols-3 gap-6 items-center">
            <div className="sm:col-span-2 space-y-2">
              <p className="text-xs uppercase tracking-wider text-amber-300/80">{result.title}</p>
              <h1 className="font-display text-4xl font-bold text-amber-50">{rank.title}</h1>
              <p className="font-reading text-lg text-stone-300">{rank.subtitle}</p>
            </div>
            <div className="p-5 rounded-2xl bg-white/10 border border-white/15 text-center">
              <div className="font-display text-5xl font-bold text-amber-300">
                {result.percentage}%
              </div>
              <p className="text-xs text-stone-300 mt-1">
                {result.score} of {result.totalQuestions} Correct
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              onClick={exitQuiz}
              className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-500 text-white text-xs font-semibold transition"
            >
              Back to Quiz Gymnasium
            </button>
            {missedInAttempt.length > 0 && (
              <button
                onClick={() => startQuiz({ scope: 'missed', count: 15 })}
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/15 text-amber-200 text-xs font-semibold inline-flex items-center gap-1.5 transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Drill Missed Questions ({missedInAttempt.length})
              </button>
            )}
          </div>
        </div>

        {/* Detailed Question Review */}
        <div className="space-y-4">
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
            Detailed Theological Commentary & Review
          </h2>

          {result.details.map((item, idx) => (
            <div
              key={item.questionId}
              className={`rounded-2xl p-6 border bg-[#fffdf9] dark:bg-stone-900 space-y-3 ${
                item.isCorrect
                  ? 'border-emerald-600/30'
                  : 'border-rose-600/35'
              }`}
            >
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  {item.isCorrect ? (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 font-semibold">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Correct
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-rose-100 dark:bg-rose-950/70 text-rose-800 dark:text-rose-300 font-semibold">
                      <XCircle className="w-3.5 h-3.5" /> Needs Review
                    </span>
                  )}
                  <span className="text-stone-500">
                    Question {idx + 1} • {item.disciplineName}
                  </span>
                </div>
                <button
                  onClick={() => {
                    exitQuiz();
                    onOpenTopic(item.topicSlug);
                  }}
                  className="inline-flex items-center gap-1 text-amber-800 dark:text-amber-400 font-semibold hover:underline"
                >
                  <BookOpen className="w-3.5 h-3.5" /> Study: {item.topicTitle}
                </button>
              </div>

              <p className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                {item.prompt}
              </p>

              <div className="grid gap-2 text-sm">
                {item.options.map((opt, oIdx) => {
                  const isCorrectOpt = oIdx === item.correctIndex;
                  const isSelectedOpt = oIdx === item.selectedIndex;
                  return (
                    <div
                      key={oIdx}
                      className={`px-3.5 py-2 rounded-xl border text-xs sm:text-sm flex items-center justify-between gap-2 ${
                        isCorrectOpt
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500/50 text-emerald-950 dark:text-emerald-200 font-semibold'
                          : isSelectedOpt
                            ? 'bg-rose-50 dark:bg-rose-950/40 border-rose-500/50 text-rose-900 dark:text-rose-200'
                            : 'bg-stone-50/60 dark:bg-stone-950/40 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                      }`}
                    >
                      <span>{opt}</span>
                      {isCorrectOpt && <span className="text-[11px] font-bold">Correct Answer</span>}
                      {!isCorrectOpt && isSelectedOpt && (
                        <span className="text-[11px] font-bold">Your Selection</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="p-4 rounded-xl bg-amber-50/80 dark:bg-stone-950/80 border-l-4 border-amber-700 text-xs sm:text-sm text-stone-800 dark:text-stone-200 space-y-1">
                <p>{item.explanation}</p>
                {item.sourceReference && (
                  <p className="text-xs italic text-stone-500">
                    Primary Locus / Source: {item.sourceReference}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // =========================================================================
  // 2. ACTIVE INTERACTIVE QUIZ RUNNER
  // =========================================================================
  if (activeQuiz) {
    const q = activeQuiz.questions[currentIndex];
    const total = activeQuiz.questions.length;
    const chosenIdx = selectedAnswers[q.id];
    const feedback = mode === 'study' ? revealedInStudy[q.id] : undefined;
    const answeredCount = Object.keys(selectedAnswers).length;

    return (
      <div className="max-w-3xl mx-auto space-y-6 pb-16">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              {mode === 'study' ? 'Catechetical Study Mode' : 'Synod Examination Mode'}
            </span>
            <h1 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
              {activeQuiz.title}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full bg-stone-200/80 dark:bg-stone-800 text-xs font-mono text-stone-700 dark:text-stone-300 inline-flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {Math.floor(elapsedSeconds / 60)}:{String(elapsedSeconds % 60).padStart(2, '0')}
            </span>
            <button
              onClick={exitQuiz}
              disabled={checking || submitting}
              className="text-xs font-medium text-stone-500 hover:text-stone-900 dark:hover:text-stone-100"
            >
              Exit
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-xs text-stone-500">
            <span>
              Question {currentIndex + 1} of {total}
            </span>
            <span>
              {answeredCount}/{total} answered
            </span>
          </div>
          <div className="h-2 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
            <div
              className="h-full bg-amber-700 dark:bg-amber-500 transition-all"
              style={{ width: `${((currentIndex + 1) / total) * 100}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="rounded-3xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 shadow-md space-y-6">
          <div className="flex flex-wrap items-center gap-2 text-xs">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-semibold">
              {q.disciplineName}
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300">
              {getQuestionTypeLabel(q.questionType)}
            </span>
            <span className="px-2 py-0.5 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-500">
              {q.difficulty}
            </span>
          </div>

          {q.excerptContext && (
            <blockquote className="p-4 rounded-xl bg-amber-50/70 dark:bg-stone-950 border-l-4 border-amber-700 font-reading italic text-lg text-stone-800 dark:text-stone-200">
              {q.excerptContext}
            </blockquote>
          )}

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-stone-900 dark:text-stone-100 leading-snug">
            {q.prompt}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {q.options.map((option, idx) => {
              const isSelected = chosenIdx === idx;
              const isCorrect = idx === feedback?.correctIndex;

              let btnStyle =
                'bg-stone-50/80 hover:bg-amber-50/60 dark:bg-stone-950/60 dark:hover:bg-stone-800/80 border-stone-200 dark:border-stone-800 text-stone-800 dark:text-stone-200';
              if (feedback) {
                if (isCorrect) {
                  btnStyle =
                    'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-600 text-emerald-950 dark:text-emerald-200 font-semibold';
                } else if (isSelected) {
                  btnStyle =
                    'bg-rose-50 dark:bg-rose-950/50 border-rose-600 text-rose-950 dark:text-rose-200';
                }
              } else if (isSelected) {
                btnStyle =
                  'bg-amber-100/80 dark:bg-amber-950/60 border-amber-700 dark:border-amber-500 text-amber-950 dark:text-amber-100 font-semibold';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  disabled={Boolean(feedback) || checking}
                  onClick={() => {
                    setSelectedAnswers((prev) => ({ ...prev, [q.id]: idx }));
                  }}
                  className={`w-full text-left p-4 rounded-2xl border transition flex items-start gap-3 ${btnStyle}`}
                >
                  <span className="w-6 h-6 rounded-full border border-current/30 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                    {String.fromCharCode(65 + idx)}
                  </span>
                  <span className="text-sm sm:text-base leading-relaxed">{option}</span>
                </button>
              );
            })}
          </div>

          {/* Instant Catechetical Explanation in Study Mode */}
          {feedback && (
            <div
              className={`p-4 rounded-2xl border space-y-1.5 ${
                chosenIdx === feedback?.correctIndex
                  ? 'bg-emerald-50/80 dark:bg-emerald-950/30 border-emerald-600/30'
                  : 'bg-amber-50/90 dark:bg-stone-950 border-amber-700/30'
              }`}
            >
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                {chosenIdx === feedback?.correctIndex ? (
                  <span className="text-emerald-800 dark:text-emerald-400 inline-flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> Well Answered!
                  </span>
                ) : (
                  <span className="text-rose-800 dark:text-rose-400 inline-flex items-center gap-1">
                    <AlertCircle className="w-4 h-4" /> Theological Clarification
                  </span>
                )}
              </div>
              <p className="text-sm text-stone-800 dark:text-stone-200 leading-relaxed">
                {feedback.explanation}
              </p>
              <p className="text-xs italic text-stone-500">Source: {feedback.sourceReference}</p>
            </div>
          )}

          {error && <p role="alert" className="text-sm text-rose-800 dark:text-rose-300">{error}</p>}

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-stone-200 dark:border-stone-800">
            <button
              type="button"
              disabled={currentIndex === 0}
              onClick={() => setCurrentIndex((i) => Math.max(0, i - 1))}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 dark:text-stone-400 disabled:opacity-40 hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              ← Previous
            </button>

            <div className="flex items-center gap-2.5">
              {mode === 'study' && chosenIdx !== undefined && !feedback && (
                <button
                  type="button"
                  onClick={() => checkAnswer(q.id, chosenIdx)}
                  disabled={checking}
                  className="px-5 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 text-white text-xs font-semibold transition"
                >
                  Check Answer
                </button>
              )}

              {currentIndex < total - 1 ? (
                <button
                  type="button"
                  disabled={chosenIdx === undefined || checking}
                  onClick={() => setCurrentIndex((i) => i + 1)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-700 text-white text-xs font-semibold disabled:opacity-40 inline-flex items-center gap-1.5 transition"
                >
                  Next Question <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  type="button"
                  disabled={chosenIdx === undefined || submitting || checking}
                  onClick={finishAndSubmitQuiz}
                  className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-bold disabled:opacity-40 transition shadow-sm"
                >
                  {submitting ? 'Grading Examination...' : 'Submit & View Results'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 3. GYMNASIUM HUB VIEW
  // =========================================================================
  const filteredTopics = (overview?.byTopic || []).filter(
    (t) =>
      !topicFilter.trim() ||
      t.title.toLowerCase().includes(topicFilter.toLowerCase()) ||
      t.disciplineName.toLowerCase().includes(topicFilter.toLowerCase())
  );

  return (
    <div className="space-y-8 pb-16">
      <EditorialHero eyebrow="Γυμνάσιον · practice & review" title="Test what you understand"
        description="Build familiarity with Scripture, doctrine, and the voices of Christian history."
        image={editorialImages.classical.src} imageAlt={editorialImages.classical.alt} className="page-hero--quiz">
        <div className="quiz-mode-toggle">
          <button
            onClick={() => setMode('study')}
            className={mode === 'study' ? 'is-selected' : ''}
          >
            Study mode
          </button>
          <button
            onClick={() => setMode('exam')}
            className={mode === 'exam' ? 'is-selected' : ''}
          >
            Exam mode
          </button>
        </div>
      </EditorialHero>

      {error && (
        <div className="p-4 rounded-2xl bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 text-sm">
          {error}
        </div>
      )}

      {/* Missed Questions Banner */}
      {overview && overview.missedCount > 0 && (
        <div className="p-5 rounded-2xl bg-amber-100/70 dark:bg-amber-950/40 border border-amber-700/30 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="font-display text-xl font-bold text-amber-950 dark:text-amber-200">
              Spaced Mastery Review Available ({overview.missedCount} Missed Questions)
            </h3>
            <p className="text-xs text-amber-900/80 dark:text-amber-300/80">
              Answer previously missed questions accurately to clear them from your review queue!
            </p>
          </div>
          <button
            onClick={() => startQuiz({ scope: 'missed', count: 15 })}
            className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 text-white text-xs font-semibold inline-flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Start Review Drill
          </button>
        </div>
      )}

      {/* Discipline Examinations */}
      <section className="space-y-4">
        <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
          Examinations by Theological Wing
        </h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {(overview?.byDiscipline || []).map((d) => {
            const accent = getAccentClasses(d.accentColor);
            return (
              <div
                key={d.slug}
                className="rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-5 flex flex-col justify-between space-y-4 shadow-xs"
              >
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className={`p-2 rounded-xl ${accent.iconBg}`}>
                      <DisciplineIcon name={d.icon} className="w-5 h-5" />
                    </div>
                    {d.bestPercentage != null && (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/70 text-emerald-800 dark:text-emerald-300 text-xs font-bold">
                        Best: {Math.round(d.bestPercentage)}%
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                    {d.name}
                  </h3>
                  <p className="text-xs text-stone-500">
                    {d.questionCount} questions across {d.topicCount} modules
                  </p>
                </div>

                <button
                  onClick={() =>
                    startQuiz({ scope: 'discipline', disciplineSlug: d.slug, count: 10 })
                  }
                  className="w-full py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition"
                >
                  <GraduationCap className="w-3.5 h-3.5" /> Start 10-Question Quiz
                </button>
              </div>
            );
          })}
        </div>
      </section>

      {/* Custom Multi-Discipline Synod Builder */}
      <section className="rounded-3xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 sm:p-8 space-y-5">
        <div className="flex items-center gap-2">
          <Sliders className="w-5 h-5 text-amber-800 dark:text-amber-400" />
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
            Custom Comprehensive Synod Examination Builder
          </h2>
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500">
            1. Select Wings to Include
          </label>
          <div className="flex flex-wrap gap-2">
            {(overview?.byDiscipline || []).map((d) => {
              const active = customDisciplines.includes(d.slug);
              return (
                <button
                  key={d.slug}
                  type="button"
                  onClick={() => toggleCustomDiscipline(d.slug)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold border transition ${
                    active
                      ? 'bg-amber-900 border-amber-900 text-white dark:bg-amber-600 dark:border-amber-600'
                      : 'bg-stone-50 dark:bg-stone-950 border-stone-200 dark:border-stone-800 text-stone-600 dark:text-stone-400'
                  }`}
                >
                  {d.name}
                </button>
              );
            })}
          </div>
        </div>

        <div className="grid sm:grid-cols-3 gap-4 items-end">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              2. Difficulty Filter
            </label>
            <select
              value={customDifficulty}
              onChange={(e) => setCustomDifficulty(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
            >
              <option value="all">All Difficulty Levels</option>
              <option value="Foundational">Foundational Only</option>
              <option value="Intermediate">Intermediate Only</option>
              <option value="Advanced">Advanced Only</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-500 mb-1">
              3. Question Count
            </label>
            <select
              value={customCount}
              onChange={(e) => setCustomCount(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
            >
              <option value={5}>5 Questions (Quick Check)</option>
              <option value={10}>10 Questions (Standard)</option>
              <option value={15}>15 Questions (Colloquium)</option>
              <option value={25}>25 Questions (Comprehensive Exam)</option>
            </select>
          </div>

          <button
            type="button"
            disabled={customDisciplines.length === 0}
            onClick={() =>
              startQuiz({
                scope: 'custom',
                disciplineSlugs: customDisciplines,
                difficulty: customDifficulty,
                count: customCount,
              })
            }
            className="py-2.5 px-5 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 text-white text-sm font-semibold disabled:opacity-40 transition"
          >
            Generate Custom Examination
          </button>
        </div>
      </section>

      {/* Topic-by-Topic Quizzes */}
      <section className="space-y-4">
        <div className="search-results-layout">
          <SearchFilterPanel title="Find topic quizzes">
            <label className="ref-field">Search study topics
              <input type="search" value={topicFilter} onChange={(event) => setTopicFilter(event.target.value)} placeholder="Topic or discipline" />
            </label>
          </SearchFilterPanel>
          <div className="search-results-layout__results">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
            Topic-Focused Quizzes
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-3">
          {filteredTopics
            .filter((t) => t.questionCount > 0)
            .map((t) => (
              <div
                key={t.slug}
                className="flex items-center justify-between gap-4 p-4 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800"
              >
                <div className="min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                    {t.disciplineName} • {t.difficulty}
                  </span>
                  <h4 className="font-semibold text-sm text-stone-900 dark:text-stone-100 truncate">
                    {t.title}
                  </h4>
                  <p className="text-xs text-stone-500">
                    {t.questionCount} questions
                    {t.bestPercentage != null ? ` • Best: ${Math.round(t.bestPercentage)}%` : ''}
                  </p>
                </div>
                <button
                  onClick={() => startQuiz({ scope: 'topic', topicSlug: t.slug, count: 10 })}
                  className="shrink-0 px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/70 text-amber-900 dark:text-amber-200 text-xs font-semibold transition"
                >
                  Take Quiz
                </button>
              </div>
            ))}
        </div>
          </div>
        </div>
      </section>

      {/* Past Examination History */}
      {overview && overview.history.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
            Examination Ledger (Recent Attempts)
          </h2>
          <div className="rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 overflow-hidden">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-stone-100/80 dark:bg-stone-950/60 text-stone-600 dark:text-stone-400 border-b border-stone-200 dark:border-stone-800">
                <tr>
                  <th className="px-4 py-3 font-semibold">Examination</th>
                  <th className="px-4 py-3 font-semibold">Mode</th>
                  <th className="px-4 py-3 font-semibold">Score</th>
                  <th className="px-4 py-3 font-semibold">Duration</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-200/70 dark:divide-stone-800">
                {overview.history.map((h) => (
                  <tr key={h.id}>
                    <td className="px-4 py-3 font-medium text-stone-900 dark:text-stone-100">
                      {h.title}
                    </td>
                    <td className="px-4 py-3 text-stone-500 capitalize">{h.mode}</td>
                    <td className="px-4 py-3 font-bold text-amber-800 dark:text-amber-400">
                      {h.score}/{h.totalQuestions} ({h.percentage}%)
                    </td>
                    <td className="px-4 py-3 text-stone-500">{h.durationSeconds}s</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}
    </div>
  );
}
