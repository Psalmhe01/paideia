import { useId, useState, type ReactNode } from 'react';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';

export function SearchFilterPanel({
  children,
  title = 'Search & filters',
  className = '',
}: {
  children: ReactNode;
  title?: string;
  className?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const contentId = useId();

  return (
    <aside className={`search-filter-panel ${className}`} data-expanded={expanded} aria-label={title}>
      <button
        type="button"
        className="search-filter-panel__toggle"
        onClick={() => setExpanded((previous) => !previous)}
        aria-expanded={expanded}
        aria-controls={contentId}
      >
        <span><SlidersHorizontal size={16} /> {title}</span>
        <ChevronDown className="search-filter-panel__chevron" size={16} />
      </button>
      <div id={contentId} className="search-filter-panel__content">
        <h2 className="search-filter-panel__title">{title}</h2>
        <div className="search-filter-panel__fields">{children}</div>
      </div>
    </aside>
  );
}
