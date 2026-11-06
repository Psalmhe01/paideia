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
import { AddAttachmentModal, AddSourceModal } from './components/ResourceModals';
import { GlobalSearchModal } from './components/GlobalSearchModal';
import { DisciplineIcon } from './components/DisciplineIcon';

const TopicStudyView = lazy(() => import('./components/TopicStudyView').then((module) => ({ default: module.TopicStudyView })));
const NotebookView = lazy(() => import('./components/LexiconAndNotebookViews').then((module) => ({ default: module.NotebookView })));
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
    const content = document.getElementById('main-content');
    if (!content) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const observed = new Set<Element>();
    const revealTargets = '.ref-page > *, .ref-card, .ref-inset, .study-topic-card, .explore-image-card, .featured-study-card, .book-card, .path-card, .home-section, .history-timeline__card';
    const observer = !reduceMotion && 'IntersectionObserver' in window
      ? new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-revealed');
          observer?.unobserve(entry.target);
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -36px 0px' })
      : undefined;
    const scan = () => {
      content.querySelectorAll(revealTargets).forEach((element) => {
        if (observed.has(element)) return;
        observed.add(element);
        element.classList.add('scroll-reveal');
        const siblings = element.parentElement ? Array.from(element.parentElement.children) : [];
        (element as HTMLElement).style.setProperty('--reveal-delay', `${Math.min(Math.max(0, siblings.indexOf(element)), 5) * 55}ms`);
        if (observer) observer.observe(element);
        else element.classList.add('is-revealed');
      });
    };
    scan();
    const mutations = new MutationObserver(scan);
    mutations.observe(content, { childList: true, subtree: true });
    return () => { mutations.disconnect(); observer?.disconnect(); };
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
    { to: '/', label: 'Overview', icon: Library },
    { to: '/study', label: 'Study curriculum', icon: BookOpen },
    { to: '/paths', label: 'Guided study paths', icon: RouteIcon },
    { to: '/quizzes', label: 'Quizzes', icon: GraduationCap },
    { to: '/notebook', label: 'My notebook', icon: StickyNote },
    { to: '/bible', label: 'Bible', icon: BookOpenText },
    { to: '/lexicon', label: 'Lexicon', icon: Languages },
    { to: '/atlas', label: 'History & concepts', icon: ChartNoAxesCombined },
    { to: '/traditions', label: 'Christian traditions', icon: GitFork },
    { to: '/books', label: 'Books', icon: BookCopy },
    { to: '/sources', label: 'Sources & attachments', icon: Globe },
  ];

  function renderNav(items: typeof navItems) {
    return items.map(({ to, label, icon: Icon }) => (
      <NavLink
        key={to}
        to={to}
        end={to === '/'}
        onClick={() => setMobileMenuOpen(false)}
        className={({ isActive }) => 'site-menu-link ' + (isActive ? 'is-active' : '')}
      >
        <Icon className="w-4 h-4" aria-hidden="true" />
        {label}
      </NavLink>
    ));
  }

  return (
    <div className="min-h-screen min-w-0 flex flex-col overflow-x-clip bg-[#faf7f2] dark:bg-[#12100e] text-stone-900 dark:text-stone-100">
      <header className="site-header sticky top-0 z-40">
        <div className="site-header__inner">
          <Link to="/" className="site-brand" aria-label="Paideia overview">
            <span className="site-brand__mark" aria-hidden="true">Π</span>
            <span className="site-brand__copy"><strong>Paideia</strong><small>Learn the Christian tradition</small></span>
          </Link>
          <nav className="site-primary-nav" aria-label="Main navigation">
            {[
              { to: '/study', label: 'Study' },
              { to: '/bible', label: 'Scripture' },
              { to: '/atlas', label: 'History & ideas' },
              { to: '/traditions', label: 'Traditions' },
            ].map(({ to, label }) => <NavLink key={to} to={to} className={({ isActive }) => isActive ? 'is-active' : ''}>{label}</NavLink>)}
          </nav>
          <div className="site-header__actions">
            <button onClick={() => setSearchModalOpen(true)} className="site-icon-button" aria-label="Search the library"><Search size={19} /></button>
            <button onClick={() => setDarkMode((d) => !d)} className="site-icon-button" aria-label="Toggle reading theme">
              {darkMode ? <Sun size={19} /> : <Moon size={19} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="site-menu-toggle"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
              aria-controls="site-navigation"
            >
              <span>{mobileMenuOpen ? 'Close' : 'Explore'}</span>
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && <>
        <button type="button" className="site-menu-backdrop" aria-label="Close navigation menu" onClick={() => setMobileMenuOpen(false)} />
        <nav id="site-navigation" aria-label="Explore Paideia" className="site-menu-panel">
          <div className="site-menu-panel__inner">
            <div className="site-menu-intro"><span>Explore Paideia</span><p>Read, compare, and follow ideas through Christian history.</p></div>
            <div className="site-menu-grid">{renderNav(navItems)}</div>
            {disciplines.length > 0 && <div className="site-discipline-links">
              <span className="site-menu-label">Study by discipline</span>
              <div>{disciplines.map((discipline) => <button key={discipline.slug} onClick={() => { setMobileMenuOpen(false); navigateToDiscipline(discipline.slug); }}>
                <DisciplineIcon name={discipline.icon} className="w-4 h-4" />{discipline.name}<small>{discipline.topicCount}</small>
              </button>)}</div>
            </div>}
          </div>
        </nav>
      </>}

      <main id="main-content" className="flex-1 min-w-0 w-full max-w-[1440px] mx-auto px-4 sm:px-8 lg:px-10 pt-5 sm:pt-8">
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
          <Route path="/notebook/:slug?" element={<NotebookView stats={stats} topics={allTopics} onOpenTopic={openTopic} onDataChanged={refreshCoreData} />} />
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

      <footer className="site-footer">
        <div className="site-footer__inner">
          <Link to="/" className="site-brand"><span className="site-brand__mark" aria-hidden="true">Π</span><span className="site-brand__copy"><strong>Paideia</strong><small>Study with care.</small></span></Link>
          <p>A thoughtful library for Scripture, theology, and the history of Christian ideas.</p>
          <nav aria-label="Footer navigation"><Link to="/study">Study</Link><Link to="/bible">Bible</Link><Link to="/atlas">Atlas</Link><Link to="/sources">Sources</Link></nav>
        </div>
        <div className="site-footer__bottom">
          <span>Paideia · παιδεία</span>
          <div className="site-footer__credits">
            <a href="https://unsplash.com" target="_blank" rel="noreferrer">Photography via Unsplash</a>
            <a href="https://digmanclass.universiteitleiden.nl/glossary/" target="_blank" rel="noreferrer">Manuscript image: Leiden University</a>
            <a href="https://commons.wikimedia.org/wiki/File:Atelier-d%27impression-par-Jan-Van-der-Straet-XVIe.jpg" target="_blank" rel="noreferrer">Printing workshop: Codex · CC BY-SA 3.0</a>
          </div>
        </div>
      </footer>

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
