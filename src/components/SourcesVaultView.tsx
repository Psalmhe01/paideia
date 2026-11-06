import React, { useEffect, useState } from 'react';
import {
  Globe,
  Paperclip,
  Search,
  ExternalLink,
  Eye,
  Download,
  Plus,
  Trash2,
  FileText,
} from 'lucide-react';
import { api } from '../api';
import type { AttachmentItem, DisciplineSummary, SourceItem } from '../types';
import { formatBytes } from './DisciplineIcon';
import { EditorialHero } from './EditorialHero';
import { editorialImages } from '../data/editorialImages';
import { SearchFilterPanel } from './SearchFilterPanel';

export function SourcesVaultView({
  disciplines,
  onOpenTopic,
  onPreviewAttachment,
  onOpenAddSource,
  onOpenAddAttachment,
  refreshVersion,
  onDataChanged,
}: {
  disciplines: DisciplineSummary[];
  onOpenTopic: (slug: string) => void;
  onPreviewAttachment: (att: AttachmentItem) => void;
  onOpenAddSource: () => void;
  onOpenAddAttachment: (topicSlug?: string, sourceId?: number | null) => void;
  refreshVersion: number;
  onDataChanged: () => void;
}) {
  const [activeTab, setActiveTab] = useState<'sources' | 'attachments'>('sources');
  const [disciplineFilter, setDisciplineFilter] = useState('all');
  const [repoFilter, setRepoFilter] = useState('all');
  const [kindFilter, setKindFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sources, setSources] = useState<SourceItem[]>([]);
  const [attachments, setAttachments] = useState<AttachmentItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, [activeTab, disciplineFilter, repoFilter, kindFilter, search, refreshVersion]);

  async function loadData() {
    setLoading(true);
    try {
      const [srcList, attList] = await Promise.all([
        api.getSources({
          discipline: disciplineFilter,
          repository: repoFilter,
          search,
        }),
        api.getAttachments({
          discipline: disciplineFilter,
          kind: kindFilter,
          search,
        }),
      ]);
      setSources(srcList);
      setAttachments(attList);
    } finally {
      setLoading(false);
    }
  }

  async function handleDeleteSource(id: number) {
    await api.deleteSource(id);
    loadData();
    onDataChanged();
  }

  async function handleDeleteAttachment(id: number) {
    await api.deleteAttachment(id);
    loadData();
    onDataChanged();
  }

  return (
    <div className="min-w-0 space-y-6 pb-12">
      <EditorialHero
        eyebrow="Ad fontes · return to the sources"
        title="Primary texts & study materials"
        description="Explore historic writings, trusted repositories, and downloadable study guides."
        image={editorialImages.manuscript.src}
        imageAlt={editorialImages.manuscript.alt}
        className="page-hero--sources"
      >
        <div className="flex flex-wrap gap-2">
          <button
            onClick={onOpenAddSource}
            className="editorial-button editorial-button--light"
          >
            <Globe className="w-4 h-4" />
            Discover / Add Online Source
          </button>
          <button
            onClick={() => onOpenAddAttachment()}
            className="editorial-button editorial-button--light"
          >
            <Plus className="w-4 h-4" />
            Upload Attachment
          </button>
        </div>
      </EditorialHero>

      <div className="search-results-layout">
        <SearchFilterPanel title="Search the library">
          <div className="grid gap-2">
            <span className="ref-kicker">Browse collection</span>
            <button type="button" onClick={() => setActiveTab('sources')} aria-pressed={activeTab === 'sources'} className={`ref-button inline-flex items-center justify-start gap-2 ${activeTab === 'sources' ? 'ref-button-primary' : ''}`}><Globe size={15} /> Sources ({sources.length})</button>
            <button type="button" onClick={() => setActiveTab('attachments')} aria-pressed={activeTab === 'attachments'} className={`ref-button inline-flex items-center justify-start gap-2 ${activeTab === 'attachments' ? 'ref-button-primary' : ''}`}><Paperclip size={15} /> Attachments ({attachments.length})</button>
          </div>
          <label className="ref-field">Search
            <span className="relative block"><Search className="absolute left-3 top-3" size={15} aria-hidden="true" /><input type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Author, text, creed…" className="pl-9 w-full" /></span>
          </label>
          <label className="ref-field">Discipline
            <select value={disciplineFilter} onChange={(event) => setDisciplineFilter(event.target.value)}>
              <option value="all">All disciplines</option>{disciplines.map((discipline) => <option key={discipline.slug} value={discipline.slug}>{discipline.name}</option>)}
            </select>
          </label>
          {activeTab === 'sources' ? (
            <label className="ref-field">Repository
              <select value={repoFilter} onChange={(event) => setRepoFilter(event.target.value)}>
                <option value="all">All repositories</option><option value="CCEL">CCEL</option><option value="New Advent">New Advent</option><option value="Early Christian Writings">Early Christian Writings</option><option value="Project Gutenberg">Project Gutenberg</option><option value="Open Library">Open Library</option><option value="STEP Bible / Academic">STEP Bible / Academic</option><option value="Creeds & Confessions">Creeds & Confessions</option><option value="User Contributed">User Contributed</option>
              </select>
            </label>
          ) : (
            <label className="ref-field">Attachment type
              <select value={kindFilter} onChange={(event) => setKindFilter(event.target.value)}>
                <option value="all">All attachment types</option><option value="Study Guide PDF">Study Guide PDF</option><option value="Primary Excerpt PDF">Primary Excerpt PDF</option><option value="Diagram / Chart">Diagram / Chart</option><option value="Exegetical Worksheet">Exegetical Worksheet</option><option value="Scholarly Notes">Scholarly Notes</option><option value="Uploaded Document">Uploaded Document</option>
              </select>
            </label>
          )}
          <button type="button" className="ref-button" onClick={() => { setSearch(''); setDisciplineFilter('all'); setRepoFilter('all'); setKindFilter('all'); }}>Reset filters</button>
        </SearchFilterPanel>
        <div className="search-results-layout__results">
          <p className="ref-muted text-sm" role="status">{loading ? 'Loading collection…' : `${activeTab === 'sources' ? sources.length : attachments.length} results`}</p>

      {/* Content */}
      {loading ? (
        <div className="text-center py-12 text-sm text-stone-500">Loading library vault...</div>
      ) : activeTab === 'sources' ? (
        <div className="grid min-w-0 md:grid-cols-2 gap-4">
          {sources.map((src) => (
            <div
              key={src.id}
              className="min-w-0 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-semibold">
                      {src.repository}
                    </span>
                    <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300">
                      {src.sourceType}
                    </span>
                  </div>
                  <button
                    onClick={() => onOpenTopic(src.topicSlug)}
                    className="text-amber-800 dark:text-amber-400 hover:underline font-medium"
                  >
                    {src.disciplineName} →
                  </button>
                </div>

                <h3 className="min-w-0 break-words font-display text-xl font-bold text-stone-900 dark:text-stone-100">
                  <a
                    href={src.url}
                    target="_blank"
                    rel="noreferrer"
                    className="min-w-0 break-words hover:text-amber-800 dark:hover:text-amber-400 inline-flex items-center gap-1.5"
                  >
                    {src.title}
                    <ExternalLink className="w-4 h-4 shrink-0 text-amber-700" />
                  </a>
                </h3>

                <p className="text-xs font-medium text-stone-500">
                  {src.author} {src.year ? `(${src.year})` : ''} • Topic:{' '}
                  <button
                    onClick={() => onOpenTopic(src.topicSlug)}
                    className="underline hover:text-amber-800 dark:hover:text-amber-300"
                  >
                    {src.topicTitle}
                  </button>
                </p>

                <p className="break-words text-sm text-stone-700 dark:text-stone-300 leading-relaxed">
                  {src.summary}
                </p>

                {/* Linked Attachments Preview */}
                {src.attachments && src.attachments.length > 0 && (
                  <div className="pt-2 space-y-1.5">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800 dark:text-amber-400">
                      Attached Companions ({src.attachments.length})
                    </span>
                    {src.attachments.map((att) => (
                      <div
                        key={att.id}
                        className="flex items-center justify-between gap-2 p-2.5 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-xs"
                      >
                        <span className="font-medium text-stone-800 dark:text-stone-200 truncate">
                          {att.title}
                        </span>
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            onClick={() => onPreviewAttachment(att)}
                            className="px-2 py-1 rounded-md bg-amber-100 dark:bg-amber-950 text-amber-900 dark:text-amber-200 font-semibold"
                          >
                            View
                          </button>
                          <a
                            href={att.downloadUrl}
                            download
                            className="px-2 py-1 rounded-md bg-stone-200/70 dark:bg-stone-800 text-stone-700 dark:text-stone-200"
                          >
                            PDF/File
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 flex items-center justify-between gap-2">
                <a
                  href={src.url}
                  target="_blank"
                  rel="noreferrer"
                  className="text-xs font-semibold text-amber-800 dark:text-amber-400 hover:underline inline-flex items-center gap-1"
                >
                  Open External Source <ExternalLink className="w-3.5 h-3.5" />
                </a>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onOpenAddAttachment(src.topicSlug, src.id)}
                    className="px-2.5 py-1 rounded-lg border border-stone-300 dark:border-stone-700 text-xs font-medium hover:border-amber-700 inline-flex items-center gap-1"
                  >
                    <Paperclip className="w-3 h-3" /> Attach File
                  </button>
                  {src.isCustom && (
                    <button
                      onClick={() => handleDeleteSource(src.id)}
                      className="p-1 text-rose-600 hover:bg-rose-100 rounded-md"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="grid min-w-0 md:grid-cols-2 gap-4">
          {attachments.map((att) => (
            <div
              key={att.id}
              className="min-w-0 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800 p-4 sm:p-5 flex flex-col justify-between space-y-4 shadow-xs"
            >
              <div className="space-y-2">
                <div className="flex flex-wrap items-start justify-between gap-2 text-xs">
                  <span className="px-2.5 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/80 text-amber-900 dark:text-amber-300 font-semibold">
                    {att.attachmentKind}
                  </span>
                  <span className="min-w-0 break-all text-right text-stone-500">
                    {att.fileName} • {formatBytes(att.fileSize)}
                  </span>
                </div>

                <h3 className="min-w-0 break-words font-display text-xl font-bold text-stone-900 dark:text-stone-100 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-amber-800 dark:text-amber-400 shrink-0" />
                  <span className="min-w-0 break-words">{att.title}</span>
                </h3>

                {att.description && (
                  <p className="break-words text-sm text-stone-700 dark:text-stone-300">{att.description}</p>
                )}

                <div className="text-xs text-stone-500 space-y-0.5">
                  <p>
                    Study Topic:{' '}
                    <button
                      onClick={() => onOpenTopic(att.topicSlug)}
                      className="font-medium text-amber-800 dark:text-amber-400 hover:underline"
                    >
                      {att.topicTitle}
                    </button>
                  </p>
                  {att.sourceTitle && (
                    <p>
                      Attached to Online Source:{' '}
                      <span className="font-medium text-stone-700 dark:text-stone-300">
                        {att.sourceTitle}
                      </span>
                    </p>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-stone-200/80 dark:border-stone-800 flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => onPreviewAttachment(att)}
                    className="px-3.5 py-1.5 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 transition"
                  >
                    <Eye className="w-3.5 h-3.5" /> Preview / Read
                  </button>
                  <a
                    href={att.downloadUrl}
                    download
                    className="px-3.5 py-1.5 rounded-xl bg-stone-200/80 hover:bg-stone-300/80 dark:bg-stone-800 text-stone-800 dark:text-stone-200 text-xs font-semibold inline-flex items-center gap-1.5 transition"
                  >
                    <Download className="w-3.5 h-3.5" /> Download
                  </a>
                </div>
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
        </div>
      </div>
    </div>
  );
}
