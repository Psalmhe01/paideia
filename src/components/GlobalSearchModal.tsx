import { Link } from 'react-router-dom';
import { scriptureUrl } from '../../shared/reference';
import React, { useEffect, useState } from 'react';
import { Search, X, BookOpen, Globe, Paperclip, Languages, ExternalLink } from 'lucide-react';
import { api } from '../api';

export function GlobalSearchModal({
  isOpen,
  onClose,
  onOpenTopic,
  onOpenSourcesVault,
}: {
  isOpen: boolean;
  onClose: () => void;
  onOpenTopic: (slug: string) => void;
  onOpenSourcesVault: () => void;
}) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<{
    topics: Array<{
      slug: string;
      title: string;
      subtitle: string;
      disciplineSlug: string;
      disciplineName: string;
    }>;
    sources: Array<{
      id: number;
      title: string;
      author: string;
      repository: string;
      url: string;
      topicSlug: string;
      topicTitle: string;
    }>;
    attachments: Array<{
      id: number;
      title: string;
      attachmentKind: string;
      topicSlug: string;
      topicTitle: string;
    }>;
    glossary: Array<{
      term: string;
      originalScript: string;
      language: string;
      definition: string;
      relatedTopicSlug: string;
    }>;
  } | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    if (!query.trim()) {
      setResults(null);
      return;
    }
    let current = true;
    const timer = setTimeout(() => {
      api.globalSearch(query).then(
        (data) => { if (current) setResults(data); },
        () => { if (current) setResults(null); },
      );
    }, 150);
    return () => { current = false; clearTimeout(timer); };
  }, [query, isOpen]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Search the library"
      onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 bg-black/65 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[80vh] flex flex-col rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-stone-200 dark:border-stone-800">
          <Search className="w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0" />
          <input
            autoFocus
            aria-label="Search the library"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search topics, Church Fathers, councils, online sources, PDFs, Greek/Latin terms..."
            className="flex-1 bg-transparent outline-none text-sm text-stone-900 dark:text-stone-100"
          />
          <button
            onClick={onClose}
            aria-label="Close search"
            className="p-1.5 rounded-lg text-stone-400 hover:text-stone-700 dark:hover:text-stone-200"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4 space-y-5">
          {!query.trim() ? (
            <div className="py-8 text-center space-y-2 text-xs text-stone-500">
              <p>Try searching for: “Chalcedon”, “Athanasius”, “Atonement”, “Quadriga”, “Dead Sea Scrolls”, or “Homoousios”</p>
            </div>
          ) : (
            <>
              <nav aria-label="Search reference collections" className="ref-tabs">
                <Link className="ref-button" to={scriptureUrl(query)} onClick={onClose}>Find in Scripture</Link>
                <Link className="ref-button" to={'/lexicon?' + new URLSearchParams({ q: query.trim() })} onClick={onClose}>Find in Strong’s</Link>
              </nav>
              {results?.topics && results.topics.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 px-2">
                    <BookOpen className="w-3.5 h-3.5" /> Study Topics
                  </div>
                  {results.topics.map((t) => (
                    <button
                      key={t.slug}
                      onClick={() => {
                        onOpenTopic(t.slug);
                        onClose();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-amber-50 dark:hover:bg-stone-800 transition"
                    >
                      <span className="text-[10px] font-semibold uppercase text-amber-800 dark:text-amber-400">
                        {t.disciplineName}
                      </span>
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {t.title}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {results?.sources && results.sources.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 px-2">
                    <Globe className="w-3.5 h-3.5" /> Online Sources
                  </div>
                  {results.sources.map((s) => (
                    <div
                      key={s.id}
                      className="flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <button
                        onClick={() => {
                          onOpenTopic(s.topicSlug);
                          onClose();
                        }}
                        className="text-left min-w-0"
                      >
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100 truncate">
                          {s.title}
                        </p>
                        <p className="text-xs text-stone-500">
                          {s.repository} • {s.author}
                        </p>
                      </button>
                      <a
                        href={s.url}
                        target="_blank"
                        rel="noreferrer"
                        className="p-1.5 text-amber-800 dark:text-amber-400"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  ))}
                </div>
              )}

              {results?.attachments && results.attachments.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 px-2">
                    <Paperclip className="w-3.5 h-3.5" /> Companion Attachments
                  </div>
                  {results.attachments.map((a) => (
                    <button
                      key={a.id}
                      onClick={() => {
                        onOpenTopic(a.topicSlug);
                        onClose();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                        {a.title}
                      </p>
                      <p className="text-xs text-stone-500">
                        {a.attachmentKind} • {a.topicTitle}
                      </p>
                    </button>
                  ))}
                </div>
              )}

              {results?.glossary && results.glossary.length > 0 && (
                <div className="space-y-1.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5 px-2">
                    <Languages className="w-3.5 h-3.5" /> Lexicon Terms
                  </div>
                  {results.glossary.map((g) => (
                    <button
                      key={g.term}
                      onClick={() => {
                        if (g.relatedTopicSlug) onOpenTopic(g.relatedTopicSlug);
                        else onOpenSourcesVault();
                        onClose();
                      }}
                      className="w-full text-left px-3 py-2.5 rounded-xl hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <p className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                        {g.term}{' '}
                        <span className="font-reading italic font-normal text-amber-800 dark:text-amber-400">
                          ({g.originalScript})
                        </span>
                      </p>
                      <p className="text-xs text-stone-500 line-clamp-1">{g.definition}</p>
                    </button>
                  ))}
                </div>
              )}

              {results &&
                results.topics.length === 0 &&
                results.sources.length === 0 &&
                results.attachments.length === 0 &&
                results.glossary.length === 0 && (
                  <p className="text-center py-8 text-sm text-stone-500">
                    No matching entries found for “{query}”.
                  </p>
                )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
