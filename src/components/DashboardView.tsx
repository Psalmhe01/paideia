import { Link } from 'react-router-dom';
import React from 'react';
import {
  BookOpen,
  Library,
  GraduationCap,
  Globe,
  Paperclip,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  Bookmark,
  Trophy,
  Search,
} from 'lucide-react';
import type { DashboardStats } from '../types';
import { DisciplineIcon, getAccentClasses } from './DisciplineIcon';

export function DashboardView({
  stats,
  onSelectDiscipline,
  onOpenTopic,
  onStartDisciplineQuiz,
  onOpenQuizzes,
  onOpenSources,
  onOpenGlobalSearch,
}: {
  stats: DashboardStats | null;
  onSelectDiscipline: (slug: string) => void;
  onOpenTopic: (slug: string) => void;
  onStartDisciplineQuiz: (slug: string) => void;
  onOpenQuizzes: () => void;
  onOpenSources: () => void;
  onOpenGlobalSearch: () => void;
}) {
  const totals = stats?.totals;

  return (
    <div className="space-y-10 pb-12">
      {/* Hero Banner */}
      <section className="relative overflow-hidden rounded-3xl border border-amber-900/20 dark:border-amber-500/20 archive-hero bg-[#251925] text-stone-100 p-8 sm:p-11 shadow-xl">
        <div className="absolute -right-12 -top-12 w-72 h-72 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
        <div className="relative max-w-2xl space-y-5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/25 text-amber-300 text-xs font-medium tracking-wide">
            <Sparkles className="w-3.5 h-3.5" />
            ΠΑΙΔΕΙΑ · THEOLOGICAL LIBRARY
          </div>

          <h1 className="font-display text-4xl sm:text-5xl font-bold leading-tight text-amber-50">
            A library for studying Christian thought
          </h1>

          <p className="font-reading text-lg sm:text-xl text-stone-300 leading-relaxed">
            Read Scripture and primary sources, trace two millennia of church history, and study how Christian traditions approach the questions of faith.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onSelectDiscipline('all')}
              className="px-5 py-2.5 rounded-xl bg-[#a24d15] hover:bg-[#884014] text-white text-sm font-semibold inline-flex items-center gap-2 transition shadow-md"
            >
              <BookOpen className="w-4 h-4" />
              Browse the curriculum
            </button>
            <button
              onClick={onOpenQuizzes}
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/15 border border-white/15 text-amber-100 text-sm font-semibold inline-flex items-center gap-2 transition"
            >
              <GraduationCap className="w-4 h-4" />
              Practice with quizzes
            </button>
            <button
              onClick={onOpenSources}
              className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 text-stone-200 text-sm font-medium inline-flex items-center gap-2 transition"
            >
              <Paperclip className="w-4 h-4" />
              Sources & Attachments
            </button>
            <button
              onClick={onOpenGlobalSearch}
              className="px-4 py-2.5 rounded-xl bg-black/25 hover:bg-black/40 border border-white/10 text-stone-300 text-xs font-medium inline-flex items-center gap-2 transition"
            >
              <Search className="w-3.5 h-3.5" />
              Search Library (Ctrl+K)
            </button>
          </div>
        </div>
      </section>

      <section aria-label="Reference rooms" className="grid grid-cols-2 xl:grid-cols-4 gap-3">
        {[
          { to: '/bible', title: 'Bible Reader', detail: 'Search and read two complete editions.', icon: BookOpen },
          { to: '/atlas', title: 'History & Concept Atlas', detail: 'Explore events and compare ideas.', icon: Globe },
          { to: '/paths', title: 'Guided Study Paths', detail: 'Follow a sequence and track progress.', icon: GraduationCap },
          { to: '/books', title: 'Christian Books', detail: 'Find a classic and start reading.', icon: Library },
        ].map(({ to, title, detail, icon: Icon }) => (
          <Link key={to} to={to} className="ref-card ref-interactive space-y-2">
            <Icon size={19} className="text-amber-800 dark:text-amber-400" aria-hidden="true" />
            <h2 className="font-display text-xl font-bold leading-tight">{title}</h2>
            <p className="text-xs ref-muted">{detail}</p>
          </Link>
        ))}
      </section>

      {/* Scholar Metrics Strip */}
      {totals && (
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              <span>Study Progress</span>
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
                {totals.studiedTopics} / {totals.topics}
              </span>
              <span className="text-xs text-stone-500">topics studied</span>
            </div>
            <div className="mt-2.5 h-1.5 rounded-full bg-stone-200 dark:bg-stone-800 overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all"
                style={{
                  width: `${totals.topics ? Math.round((totals.studiedTopics / totals.topics) * 100) : 0}%`,
                }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              <span>Fontes & Attachments</span>
              <Globe className="w-4 h-4 text-amber-700 dark:text-amber-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
                {totals.sources}
              </span>
              <span className="text-xs text-stone-500">
                online sources • {totals.attachments} attachments
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
              CCEL, New Advent, Gutenberg & PDF companions
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              <span>Quiz Examination Bank</span>
              <Trophy className="w-4 h-4 text-amber-600" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
                {totals.quizAttempts > 0 ? `${totals.averageQuizPercentage}%` : `${totals.questions}`}
              </span>
              <span className="text-xs text-stone-500">
                {totals.quizAttempts > 0
                  ? `avg across ${totals.quizAttempts} attempts`
                  : 'curated questions ready'}
              </span>
            </div>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
              {totals.questions} questions across {totals.disciplines} wings
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200/90 dark:border-stone-800 shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              <span>Lexicon & Notebook</span>
              <Bookmark className="w-4 h-4 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="mt-2 flex items-baseline gap-2">
              <span className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
                {totals.glossary}
              </span>
              <span className="text-xs text-stone-500">curriculum glossary terms</span>
            </div>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
              {totals.bookmarkedTopics} bookmarks • {totals.notesCount} study notes
            </p>
          </div>
        </section>
      )}

      {/* Eight Wings of the Theological Library */}
      <section className="space-y-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="font-display text-3xl font-bold text-stone-900 dark:text-stone-100">
              Wings of the Theological Library
            </h2>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              Select a theological discipline to study its primary concepts, inspect attached sources, or test your knowledge.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-5">
          {(stats?.disciplines || []).map((d) => {
            const accent = getAccentClasses(d.accentColor);
            const totalT = d.totalTopics ?? d.topicCount ?? 0;
            const studiedT = d.studiedTopics ?? d.studiedCount ?? 0;
            return (
              <div
                key={d.slug}
                className={`group flex flex-col justify-between rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border ${accent.border} p-5 shadow-xs hover:shadow-md transition`}
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className={`p-2.5 rounded-xl ${accent.iconBg}`}>
                      <DisciplineIcon name={d.icon} className="w-5 h-5" />
                    </div>
                    <span className="font-reading italic text-sm text-stone-500 dark:text-stone-400">
                      {d.greekTitle}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-400 transition">
                      {d.name}
                    </h3>
                    <p className="text-xs font-medium text-amber-800/90 dark:text-amber-400/90 mt-0.5">
                      {d.subtitle}
                    </p>
                  </div>

                  <p className="text-xs leading-relaxed text-stone-600 dark:text-stone-400 line-clamp-3">
                    {d.description}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-stone-200/70 dark:border-stone-800 space-y-3">
                  <div className="flex items-center justify-between text-xs text-stone-500 dark:text-stone-400">
                    <span>
                      {studiedT}/{totalT} topics • {d.sourceCount} sources
                    </span>
                    {d.bestQuizScore != null ? (
                      <span className="font-semibold text-emerald-700 dark:text-emerald-400">
                        Best: {Math.round(d.bestQuizScore)}%
                      </span>
                    ) : (
                      <span>{d.questionCount} quiz Qs</span>
                    )}
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onSelectDiscipline(d.slug)}
                      className="flex-1 py-2 px-3 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 dark:hover:bg-stone-700 text-white text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition"
                    >
                      Study Wing <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => onStartDisciplineQuiz(d.slug)}
                      title={`Take ${d.name} Quiz`}
                      className="py-2 px-3 rounded-xl bg-amber-100 hover:bg-amber-200 dark:bg-amber-950/70 dark:hover:bg-amber-900/70 text-amber-900 dark:text-amber-200 text-xs font-semibold transition"
                    >
                      Quiz
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Featured Pathways & Recent Scholar Activity */}
      <section className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
              Recommended Foundational Pathways
            </h3>
            <span className="text-xs text-stone-500">Curated Entry Points</span>
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            {[
              {
                slug: 'trinity-theology-proper',
                tag: 'Systematic Doctrine',
                title: 'Theology Proper & The Holy Trinity',
                blurb: 'Nicene homoousios, Cappadocian hypostases, and inseparable operations.',
              },
              {
                slug: 'theories-of-atonement',
                tag: 'Soteriology',
                title: 'Models & Mysteries of the Atonement',
                blurb: 'Christus Victor, Recapitulation, Satisfaction, and Penal Substitution.',
              },
              {
                slug: 'grammatical-historical-exegesis',
                tag: 'Hermeneutics',
                title: 'Grammatical-Historical Exegesis',
                blurb: 'Context, literary genre, Analogia Fidei, and avoiding lexical fallacies.',
              },
              {
                slug: 'biblical-canon-textual-criticism',
                tag: 'Bible History',
                title: 'Formation of the Canon & Manuscripts',
                blurb: 'Papyri, Sinaiticus, Athanasius’s 39th Festal Letter, and canon recognition.',
              },
              {
                slug: 'apostolic-fathers',
                tag: 'Church Fathers',
                title: 'The Apostolic Fathers (AD 70–150)',
                blurb: '1 Clement, The Didache, Ignatius, Polycarp, and Epistle to Diognetus.',
              },
              {
                slug: 'classical-cosmological-arguments',
                tag: 'Apologetics',
                title: 'Classical Natural Theology',
                blurb: 'Aquinas’s Quinque Viae, Kalam cosmology, fine-tuning, and Anselm.',
              },
            ].map((item) => (
              <button
                key={item.slug}
                onClick={() => onOpenTopic(item.slug)}
                className="text-left p-4 rounded-xl border border-stone-200/90 dark:border-stone-800 hover:border-amber-700/50 dark:hover:border-amber-500/50 bg-stone-50/50 dark:bg-stone-950/40 transition group"
              >
                <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                  {item.tag}
                </span>
                <h4 className="font-display text-lg font-bold text-stone-900 dark:text-stone-100 group-hover:text-amber-800 dark:group-hover:text-amber-300 mt-0.5">
                  {item.title}
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-400 mt-1 line-clamp-2">
                  {item.blurb}
                </p>
              </button>
            ))}
          </div>
        </div>

        {/* Patristic Meditation + Recent Quiz Attempts */}
        <div className="rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-6 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
              Patristic Inscription
            </span>
            <blockquote className="font-reading italic text-lg leading-relaxed text-stone-800 dark:text-stone-200 border-l-2 border-amber-700 pl-4">
              “Thou awakest us to delight in Thy praise; for Thou madest us for Thyself, and our heart is restless, until it repose in Thee.”
            </blockquote>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              — Augustine of Hippo, <span className="italic">Confessions</span> I.1.1 (c. AD 397)
            </p>
          </div>

          <div className="pt-4 border-t border-stone-200 dark:border-stone-800 space-y-2.5">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-stone-500 dark:text-stone-400">
              Recent Examination Activity
            </h4>
            {stats?.recentAttempts && stats.recentAttempts.length > 0 ? (
              <div className="space-y-2">
                {stats.recentAttempts.slice(0, 3).map((att) => (
                  <div
                    key={att.id}
                    className="flex items-center justify-between text-xs p-2.5 rounded-lg bg-stone-100/80 dark:bg-stone-800/60"
                  >
                    <span className="font-medium text-stone-800 dark:text-stone-200 truncate pr-2">
                      {att.title}
                    </span>
                    <span className="shrink-0 font-bold text-amber-800 dark:text-amber-400">
                      {att.score}/{att.totalQuestions} ({att.percentage}%)
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-stone-500 dark:text-stone-400">
                No quiz attempts recorded yet. Test your understanding in the Quiz Gymnasium!
              </p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
