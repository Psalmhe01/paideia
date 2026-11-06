import { Link } from 'react-router-dom';
import type { CSSProperties } from 'react';
import {
  ArrowRight,
  BookOpen,
  BookOpenText,
  ChartNoAxesCombined,
  GitFork,
  GraduationCap,
  Languages,
  Library,
  Search,
} from 'lucide-react';
import type { DashboardStats } from '../types';
import { EditorialHero } from './EditorialHero';
import { editorialImages } from '../data/editorialImages';

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
  const firstDiscipline = stats?.disciplines?.[0];

  return (
    <div className="home-editorial page-enter">
      <EditorialHero
        eyebrow="Paideia · παιδεία · formation through learning"
        title="Explore the depth of Christian thought."
        description="Read Scripture. Meet the voices of the church. Follow ideas across time."
        image={editorialImages.sanctuary.src}
        imageAlt={editorialImages.sanctuary.alt}
        size="large"
        className="home-hero"
      >
        <button className="editorial-button editorial-button--light" onClick={() => onSelectDiscipline('all')}>
          Enter the library <ArrowRight size={16} />
        </button>
        <button className="editorial-text-button" onClick={onOpenGlobalSearch}>
          <Search size={15} /> Search all resources
        </button>
      </EditorialHero>

      <section className="home-section" aria-labelledby="explore-heading">
        <div className="home-section__heading">
          <div><p className="editorial-label">Reading rooms</p><h2 id="explore-heading">Choose a way in.</h2></div>
          <p>One tradition, many paths of discovery.</p>
        </div>
        <div className="explore-card-grid">
          <Link to="/study" className="explore-image-card" style={{ '--card-image': `url("${editorialImages.library.src}")` } as CSSProperties}>
            <span className="explore-image-card__icon"><BookOpen size={18} /></span><span className="explore-image-card__copy"><small>Guided learning</small><strong>Theology & study</strong><span>Explore the curriculum <ArrowRight size={14} /></span></span>
          </Link>
          <Link to="/bible" className="explore-image-card" style={{ '--card-image': `url("${editorialImages.scripture.src}")` } as CSSProperties}>
            <span className="explore-image-card__icon"><BookOpenText size={18} /></span><span className="explore-image-card__copy"><small>Read the text</small><strong>The Bible</strong><span>Open the reader <ArrowRight size={14} /></span></span>
          </Link>
          <Link to="/atlas" className="explore-image-card" style={{ '--card-image': `url("${editorialImages.history.src}")` } as CSSProperties}>
            <span className="explore-image-card__icon"><ChartNoAxesCombined size={18} /></span><span className="explore-image-card__copy"><small>Follow the story</small><strong>History & ideas</strong><span>Explore the atlas <ArrowRight size={14} /></span></span>
          </Link>
          <Link to="/traditions" className="explore-image-card" style={{ '--card-image': `url("${editorialImages.orthodox.src}")` } as CSSProperties}>
            <span className="explore-image-card__icon"><GitFork size={18} /></span><span className="explore-image-card__copy"><small>See the traditions</small><strong>Church & belief</strong><span>Compare perspectives <ArrowRight size={14} /></span></span>
          </Link>
        </div>
      </section>

      <section className="home-section" aria-labelledby="featured-heading">
        <div className="home-section__heading">
          <div><p className="editorial-label">A place to begin</p><h2 id="featured-heading">Ideas that shaped the faith.</h2></div>
          <Link className="editorial-inline-link" to="/study">Browse all studies <ArrowRight size={15} /></Link>
        </div>
        <div className="featured-study-grid">
          {[
            { slug: 'trinity-theology-proper', topic: 'Systematic theology', title: 'The Trinity', image: editorialImages.orthodox },
            { slug: 'apostolic-fathers', topic: 'Early Christianity', title: 'The Apostolic Fathers', image: editorialImages.history },
            { slug: 'biblical-canon-textual-criticism', topic: 'Scripture & history', title: 'How the Bible took shape', image: editorialImages.manuscript },
          ].map((item) => (
            <button key={item.slug} className="featured-study-card" onClick={() => onOpenTopic(item.slug)}>
              <img src={item.image.src} alt={item.image.alt} loading="lazy" />
              <span className="featured-study-card__content"><small>{item.topic}</small><strong>{item.title}</strong><span>Open study <ArrowRight size={14} /></span></span>
            </button>
          ))}
        </div>
      </section>

      {totals && <section className="library-counts" aria-label="Library contents">
        <div><strong>{totals.topics}</strong><span>study modules</span></div>
        <div><strong>{totals.glossary}</strong><span>lexicon entries</span></div>
        <div><strong>{totals.sources + totals.attachments}</strong><span>sources & files</span></div>
        <div><strong>{totals.questions}</strong><span>review questions</span></div>
      </section>}

      <section className="home-cta-band">
        <div><p className="editorial-label">Make it your study</p><h2>Read closely. Keep what matters.</h2><p>Save verses, record notes, and return to the questions you are exploring.</p></div>
        <div className="home-cta-band__actions">
          <Link to="/notebook" className="editorial-button editorial-button--dark">Open your notebook <ArrowRight size={16} /></Link>
          <Link to="/lexicon" className="editorial-inline-link"><Languages size={15} /> Explore the lexicon</Link>
          <Link to="/books" className="editorial-inline-link"><Library size={15} /> Browse Christian books</Link>
          <button className="editorial-inline-link" onClick={onOpenQuizzes}><GraduationCap size={15} /> Practice with a quiz</button>
          <button className="editorial-inline-link" onClick={() => { if (firstDiscipline) onStartDisciplineQuiz(firstDiscipline.slug); else onOpenQuizzes(); }}>Start a quick review</button>
          <button className="editorial-inline-link" onClick={onOpenSources}>Browse sources</button>
        </div>
      </section>

      {totals && totals.topics > 0 && <div className="home-progress-note" aria-label="Your progress">
        <span>Your reading</span><strong>{totals.studiedTopics} of {totals.topics} studies completed</strong>
        <div><i style={{ width: `${Math.round((totals.studiedTopics / totals.topics) * 100)}%` }} /></div>
      </div>}
    </div>
  );
}
