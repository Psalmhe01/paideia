import { Link, NavLink, Route, Routes, matchPath, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import React, { lazy, Suspense, useEffect, useState } from 'react';
import {
  Library,
  BookOpen,
  BookOpenText,
  BookCopy,
  ChartNoAxesCombined,
  GitFork,
  Route as RouteIcon,
  Globe,
  GraduationCap,
  Languages,
  StickyNote,
  Search,
  Sun,
  Moon,
  Menu,
  X,
} from 'lucide-react';
import { api } from './api';
import type {
  AttachmentItem,
  DashboardStats,
  DisciplineSummary,
  SourceItem,
  TopicDetail,
  TopicSummary,
} from './types';
import { DashboardView } from './components/DashboardView';
import { CatalogView } from './components/CatalogView';
import { SourcesVaultView } from './components/SourcesVaultView';
import { QuizCenterView, type InitialQuizRequest } from './components/QuizCenterView';
import { NotebookView } from './components/LexiconAndNotebookViews';
import { AddAttachmentModal, AddSourceModal } from './components/ResourceModals';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DisciplineIcon } from './components/DisciplineIcon';

const TopicStudyView = lazy(() => import('./components/TopicStudyView').then((module) => ({ default: module.TopicStudyView })));
const AttachmentModal = lazy(() => import('./components/AttachmentModal').then((module) => ({ default: module.AttachmentModal })));
const BibleView = lazy(() => import('./components/ReferenceViews').then((module) => ({ default: module.BibleView })));
const ReferenceLexicon = lazy(() => import('./components/ReferenceViews').then((module) => ({ default: module.ReferenceLexicon })));
const AtlasView = lazy(() => import('./components/ExploreViews').then((module) => ({ default: module.AtlasView })));
const TraditionsView = lazy(() => import('./components/ExploreViews').then((module) => ({ default: module.TraditionsView })));
const BooksView = lazy(() => import('./components/ExploreViews').then((module) => ({ default: module.BooksView })));
const StudyPathsView = lazy(() => import('./components/ExploreViews').then((module) => ({ default: module.StudyPathsView })));

export default function App() {
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('paideia-theme') === 'dark');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { pathname, key: locationKey } = useLocation();
  const [params, setParams] = useSearchParams();
  const topicSlug = matchPath('/study/:slug', pathname)?.params.slug;

  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [disciplines, setDisciplines] = useState<DisciplineSummary[]>([]);
  const [allTopics, setAllTopics] = useState<TopicSummary[]>([]);
  const [filteredTopics, setFilteredTopics] = useState<TopicSummary[]>([]);
  const [allSources, setAllSources] = useState<SourceItem[]>([]);

  // Catalog filter state
  const selectedDiscipline = params.get('wing') || 'all';
  function setSelectedDiscipline(slug: string) {
    setParams(slug === 'all' ? {} : { wing: slug });
  }
  const [catalogSearch, setCatalogSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  // Active Topic detail
  const [loadedTopic, setLoadedTopic] = useState<TopicDetail | null>(null);
  const activeTopic = loadedTopic?.slug === topicSlug ? loadedTopic : null;
  const [failedTopic, setFailedTopic] = useState<string>();
  const [topicRevision, setTopicRevision] = useState(0);
  const [coreError, setCoreError] = useState(false);

  // Quiz launch bridge
  const [quizRequest, setQuizRequest] = useState<InitialQuizRequest | null>(null);

  // Modals
  const [previewAttachment, setPreviewAttachment] = useState<AttachmentItem | null>(null);
  const [sourceModalOpen, setSourceModalOpen] = useState(false);
  const [sourceModalTopic, setSourceModalTopic] = useState<string | undefined>(undefined);
  const [attachmentModalOpen, setAttachmentModalOpen] = useState(false);
  const [attachmentModalTopic, setAttachmentModalTopic] = useState<string | undefined>(undefined);
  const [attachmentModalSourceId, setAttachmentModalSourceId] = useState<number | null>(null);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [vaultRefreshVersion, setVaultRefreshVersion] = useState(0);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('paideia-theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileMenuOpen(false);
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchModalOpen((open) => !open);
      }
    }
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  useEffect(() => {
    void refreshCoreData();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!topicSlug) return;
    let current = true;
    setFailedTopic(undefined);
    api.getTopic(topicSlug).then(
      (topic) => { if (current) setLoadedTopic(topic); },
      () => { if (current) setFailedTopic(topicSlug); },
    );
    return () => { current = false; };
  }, [topicSlug, topicRevision]);

  useEffect(() => {
    let current = true;
    api.getTopics({
      discipline: selectedDiscipline,
      search: catalogSearch,
      difficulty: difficultyFilter,
      status: statusFilter,
    }).then(
      (topics) => { if (current) setFilteredTopics(topics); },
      () => { if (current) setCoreError(true); },
    );
    return () => { current = false; };
  }, [selectedDiscipline, catalogSearch, difficultyFilter, statusFilter, vaultRefreshVersion]);

  async function refreshCoreData() {
    try {
      const [statsData, discData, topicsData, sourcesData] = await Promise.all([
        api.getStats(), api.getDisciplines(), api.getTopics(), api.getSources(),
      ]);
      setStats(statsData);
      setDisciplines(discData);
      setAllTopics(topicsData);
      setAllSources(sourcesData);
      setVaultRefreshVersion((v) => v + 1);
      setCoreError(false);
    } catch {
      setCoreError(true);
    }
  }

  function openTopic(slug: string) {
    navigate('/study/' + encodeURIComponent(slug));
  }

  async function refreshActiveTopic() {
    setTopicRevision((revision) => revision + 1);
  }

  function navigateToDiscipline(slug: string) {
    navigate(slug === 'all' ? '/study' : '/study?wing=' + encodeURIComponent(slug));
  }

  function launchTopicQuiz(slug: string) {
    navigate('/quizzes?' + new URLSearchParams({ topic: slug }));
  }

  function launchDisciplineQuiz(slug: string) {
    navigate('/quizzes?' + new URLSearchParams({ wing: slug }));
  }

  const quizTopic = params.get('topic');
  const quizWing = params.get('wing');
  useEffect(() => {
    if (pathname !== '/quizzes') return;
    const nonce = Date.now();
    setQuizRequest(quizTopic
      ? { scope: 'topic', slug: quizTopic, nonce }
      : quizWing ? { scope: 'discipline', slug: quizWing, nonce } : null);
  }, [pathname, locationKey, quizTopic, quizWing]);

  const navItems = [
    { to: '/', label: 'Sanctuary Overview', icon: Library },
    { to: '/study', label: 'Study Curriculum', icon: BookOpen },
    { to: '/paths', label: 'Guided Study Paths', icon: RouteIcon },
    { to: '/quizzes', label: 'Quiz Gymnasium', icon: GraduationCap },
    { to: '/notebook', label: 'Study Notebook', icon: StickyNote },
    { to: '/bible', label: 'Bible Reader', icon: BookOpenText },
    { to: '/lexicon', label: 'Theological Lexicon', icon: Languages },
    { to: '/atlas', label: 'History & Concept Atlas', icon: ChartNoAxesCombined },
    { to: '/traditions', label: 'Christian Traditions', icon: GitFork },
    { to: '/books', label: 'Christian Books', icon: BookCopy },
    { to: '/sources', label: 'Sources & Attachments', icon: Globe },
  ];

  function renderNav(items: typeof navItems) {
    return items.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        end={to === '/'}
        onClick={() => setMobileMenuOpen(false)}
        className={({ isActive }) => 'flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-xs font-semibold transition ' +
          (isActive
            ? 'bg-amber-900 text-white dark:bg-amber-800'
            : 'text-stone-700 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-900')}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
        {label}
      </NavLink>
    ));
  }

  return (
    <div className="min-h-screen min-w-0 flex overflow-x-clip bg-[#faf7f2] dark:bg-[#12100e] text-stone-900 dark:text-stone-100">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 shrink-0 flex-col border-r border-stone-200/90 dark:border-stone-800 bg-[#f5efe4]/80 dark:bg-stone-950/80 sticky top-0 h-screen">
        {/* Brand Header */}
        <Link to="/" className="px-6 py-6 border-b border-stone-200/80 dark:border-stone-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-800 to-stone-900 text-amber-100 flex items-center justify-center font-display text-2xl font-bold shadow-sm">
              Π
            </div>
            <div>
              <span className="font-display text-2xl font-bold tracking-tight block leading-none">
                Paideia
              </span>
              <span className="text-[11px] text-amber-900/80 dark:text-amber-400/80 font-medium">
                Theological Library • παιδεία
              </span>
            </div>
          </div>
        </Link>

        {/* Quick Search Trigger */}
        <div className="px-4 pt-4">
          <button
            onClick={() => setSearchModalOpen(true)}
            className="w-full px-3.5 py-2 rounded-xl bg-white/90 dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-xs text-stone-500 flex items-center justify-between hover:border-amber-700/50 transition"
          >
            <span className="inline-flex items-center gap-2">
              <Search className="w-3.5 h-3.5 text-amber-800 dark:text-amber-400" />
              Search Library...
            </span>
            <kbd className="px-1.5 py-0.5 rounded bg-stone-100 dark:bg-stone-800 text-[10px] font-mono">
              ⌘K
            </kbd>
          </button>
        </div>

        {/* Main Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
              Reading Rooms
            </span>
            {renderNav(navItems.slice(0, 5))}
          </div>
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-stone-500">Reference rooms</span>
            {renderNav(navItems.slice(5))}
          </div>

          {/* Wings Quick Jump */}
          <div className="space-y-1">
            <span className="px-3 text-[10px] font-bold uppercase tracking-widest text-stone-400">
              Theological Wings
            </span>
            {disciplines.map((d) => (
              <button
                key={d.slug}
                onClick={() => navigateToDiscipline(d.slug)}
                className={`w-full flex items-center justify-between gap-2 px-3.5 py-2 rounded-xl text-xs transition ${
                  pathname === '/study' && selectedDiscipline === d.slug
                    ? 'bg-stone-200 dark:bg-stone-800 font-semibold text-amber-900 dark:text-amber-300'
                    : 'text-stone-600 dark:text-stone-400 hover:bg-stone-200/50 dark:hover:bg-stone-900'
                }`}
              >
                <span className="inline-flex items-center gap-2.5 truncate">
                  <DisciplineIcon name={d.icon} className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  <span className="truncate">{d.name}</span>
                </span>
                <span className="text-[10px] text-stone-400">{d.topicCount}</span>
              </button>
            ))}
          </div>
        </nav>

        {/* Bottom Theme Switcher */}
        <div className="p-4 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between text-xs">
          <span className="text-stone-500">
            {darkMode ? 'Scriptorium Night' : 'Parchment Day'}
          </span>
          <button
            onClick={() => setDarkMode((d) => !d)}
            className="p-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 text-stone-700 dark:text-amber-300 hover:border-amber-700 transition"
            aria-label="Toggle reading theme"
          >
            {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 min-w-0 flex flex-col pt-14 lg:pt-0">
        {/* Mobile Top Header */}
        <header className="lg:hidden fixed inset-x-0 top-0 z-50 flex h-14 items-center justify-between px-4 bg-[#f5efe4]/95 dark:bg-stone-950/95 backdrop-blur-xs border-b border-stone-200 dark:border-stone-800">
          <Link to="/" className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-amber-900 text-amber-100 flex items-center justify-center font-display text-lg font-bold">
              Π
            </div>
            <span className="font-display text-xl font-bold">Paideia</span>
          </Link>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setSearchModalOpen(true)}
              className="p-2 rounded-lg text-stone-600 dark:text-stone-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setDarkMode((d) => !d)}
              className="p-2 rounded-lg text-stone-600 dark:text-amber-300"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen((o) => !o)}
              className="p-2 rounded-lg text-stone-700 dark:text-stone-200"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </header>

        {mobileMenuOpen && (
          <>
            <button
              type="button"
              className="lg:hidden fixed inset-0 z-40 bg-stone-950/30"
              aria-label="Close navigation menu"
              onClick={() => setMobileMenuOpen(false)}
            />
            <nav
              id="mobile-navigation"
              aria-label="Mobile navigation"
              className="lg:hidden fixed inset-x-0 top-14 z-50 grid grid-cols-2 gap-x-2 gap-y-1 overflow-y-auto border-b border-stone-200 bg-[#f5efe4] px-4 py-3 shadow-xl dark:border-stone-800 dark:bg-stone-950"
              style={{ maxHeight: 'calc(100dvh - 3.5rem)' }}
            >
              {renderNav(navItems)}
            </nav>
          </>
        )}

        <main id="main-content" className="flex-1 min-w-0 max-w-6xl w-full mx-auto px-4 sm:px-8 pt-6 sm:pt-8">
          {coreError && <div role="alert" className="ref-card mb-4">The study server could not be reached. <button className="ref-link" onClick={refreshCoreData}>Try again</button></div>}
          <Suspense fallback={<p role="status">Opening the reading room…</p>}>
          <Routes>
          <Route path="/" element={
            <DashboardView
              stats={stats}
              onSelectDiscipline={navigateToDiscipline}
              onOpenTopic={openTopic}
              onStartDisciplineQuiz={launchDisciplineQuiz}
              onOpenQuizzes={() => navigate('/quizzes')}
              onOpenSources={() => navigate('/sources')}
              onOpenGlobalSearch={() => setSearchModalOpen(true)}
            />
          } />
          <Route path="/study" element={
            <CatalogView
              disciplines={disciplines}
              topics={filteredTopics}
              selectedDiscipline={selectedDiscipline}
              onSelectDiscipline={setSelectedDiscipline}
              searchQuery={catalogSearch}
              onSearchChange={setCatalogSearch}
              difficultyFilter={difficultyFilter}
              onDifficultyChange={setDifficultyFilter}
              statusFilter={statusFilter}
              onStatusChange={setStatusFilter}
              onOpenTopic={openTopic}
              onStartTopicQuiz={launchTopicQuiz}
              onTopicCreated={async (slug) => {
                await refreshCoreData();
                openTopic(slug);
              }}
            />
          } />
          <Route path="/study/:slug" element={activeTopic ? (

            <TopicStudyView
              key={activeTopic.slug}
              topic={activeTopic}
              onBackToDiscipline={navigateToDiscipline}
              onOpenTopic={openTopic}
              onStartTopicQuiz={launchTopicQuiz}
              onPreviewAttachment={setPreviewAttachment}
              onOpenAddSource={(tSlug) => {
                setSourceModalTopic(tSlug);
                setSourceModalOpen(true);
              }}
              onOpenAddAttachment={(tSlug, srcId) => {
                setAttachmentModalTopic(tSlug);
                setAttachmentModalSourceId(srcId ?? null);
                setAttachmentModalOpen(true);
              }}
              onRefreshTopic={refreshActiveTopic}
              onProgressChanged={refreshCoreData}
            />
          ) : failedTopic === topicSlug ? (
            <div className="ref-card" role="alert">This study module could not be loaded. <Link className="ref-link" to="/study">Browse the curriculum</Link></div>
          ) : <p role="status">Opening the study module…</p>} />
          <Route path="/sources" element={

            <SourcesVaultView
              disciplines={disciplines}
              onOpenTopic={openTopic}
              onPreviewAttachment={setPreviewAttachment}
              onOpenAddSource={() => {
                setSourceModalTopic(undefined);
                setSourceModalOpen(true);
              }}
              onOpenAddAttachment={(tSlug, srcId) => {
                setAttachmentModalTopic(tSlug);
                setAttachmentModalSourceId(srcId ?? null);
                setAttachmentModalOpen(true);
              }}
              refreshVersion={vaultRefreshVersion}
              onDataChanged={refreshCoreData}
            />
          } />
          <Route path="/quizzes" element={
            <QuizCenterView
              initialRequest={quizRequest}
              onClearInitialRequest={() => setQuizRequest(null)}
              onOpenTopic={openTopic}
              onQuizCompleted={refreshCoreData}
            />
          } />
          <Route path="/notebook" element={<NotebookView stats={stats} onOpenTopic={openTopic} />} />
          <Route path="/bible/:edition?/:book?/:chapter?" element={<BibleView />} />
          <Route path="/lexicon/:entry?" element={<ReferenceLexicon onOpenTopic={openTopic} />} />
          <Route path="/atlas/:chart?" element={<AtlasView />} />
          <Route path="/traditions/:tradition?" element={<TraditionsView />} />
          <Route path="/books" element={<BooksView />} />
          <Route path="/paths/:pathSlug?" element={<StudyPathsView topics={allTopics} />} />
          <Route path="*" element={<div className="ref-card"><h1 className="ref-heading">Room not found</h1><Link className="ref-link" to="/">Return to the overview</Link></div>} />
          </Routes>
          </Suspense>
        </main>
      </div>

      {/* Modals */}
      {previewAttachment && (
        <Suspense fallback={null}>
          <AttachmentModal attachment={previewAttachment} onClose={() => setPreviewAttachment(null)} />
        </Suspense>
      )}

      <AddSourceModal
        isOpen={sourceModalOpen}
        onClose={() => setSourceModalOpen(false)}
        topics={allTopics}
        defaultTopicSlug={sourceModalTopic}
        onCreated={async () => {
          await refreshCoreData();
          if (topicSlug) await refreshActiveTopic();
        }}
      />

      <AddAttachmentModal
        isOpen={attachmentModalOpen}
        onClose={() => setAttachmentModalOpen(false)}
        topics={allTopics}
        sources={allSources}
        defaultTopicSlug={attachmentModalTopic}
        defaultSourceId={attachmentModalSourceId}
        onCreated={async () => {
          await refreshCoreData();
          if (topicSlug) await refreshActiveTopic();
        }}
      />

      <GlobalSearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
        onOpenTopic={openTopic}
        onOpenSourcesVault={() => navigate('/sources')}
      />
    </div>
  );
}
