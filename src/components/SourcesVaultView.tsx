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
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-amber-800 dark:text-amber-400">
            Ad Fontes • Primary Repositories & Study Companions
          </span>
          <h1 className="font-display text-3xl sm:text-4xl font-bold text-stone-900 dark:text-stone-100">
            Online Sources & Attachments Vault
          </h1>
          <p className="text-sm text-stone-600 dark:text-stone-400 max-w-2xl mt-1">
            Browse open-access patristic, conciliar, and Reformation repositories alongside downloadable PDF readers, worksheets, and uploaded attachments linked to them.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={onOpenAddSource}
            className="px-4 py-2.5 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition"
          >
            <Globe className="w-4 h-4" />
            Discover / Add Online Source
          </button>
          <button
            onClick={() => onOpenAddAttachment()}
            className="px-4 py-2.5 rounded-xl bg-stone-900 hover:bg-stone-800 dark:bg-stone-800 text-white text-xs font-semibold inline-flex items-center gap-1.5 shadow-xs transition"
          >
            <Plus className="w-4 h-4" />
            Upload Attachment
          </button>
        </div>
      </div>

      {/* Mode Switcher */}
      <div className="flex flex-wrap gap-2 border-b border-stone-200 dark:border-stone-800 pb-3">
        <button
          onClick={() => setActiveTab('sources')}
          className={`min-w-0 flex-1 justify-center px-3 py-2 rounded-xl text-sm text-center font-semibold inline-flex items-center gap-2 transition ${
            activeTab === 'sources'
              ? 'bg-stone-900 text-white dark:bg-amber-600'
              : 'bg-[#fffdf9] dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800'
          }`}
        >
          <Globe className="w-4 h-4" />
          Online Theological Sources ({sources.length})
        </button>
        <button
          onClick={() => setActiveTab('attachments')}
          className={`min-w-0 flex-1 justify-center px-3 py-2 rounded-xl text-sm text-center font-semibold inline-flex items-center gap-2 transition ${
            activeTab === 'attachments'
              ? 'bg-stone-900 text-white dark:bg-amber-600'
              : 'bg-[#fffdf9] dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-800'
          }`}
        >
          <Paperclip className="w-4 h-4" />
          Attachments & Study PDFs ({attachments.length})
        </button>
      </div>

      {/* Filters */}
      <div className="grid min-w-0 sm:grid-cols-12 gap-3 p-4 rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-200 dark:border-stone-800">
        <div className="min-w-0 sm:col-span-5 relative">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by author, treatise, creed, or keyword..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
          />
        </div>

        <div className="min-w-0 sm:col-span-4">
          <select
            value={disciplineFilter}
            onChange={(e) => setDisciplineFilter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
          >
            <option value="all">All Theological Disciplines</option>
            {disciplines.map((d) => (
              <option key={d.slug} value={d.slug}>
                {d.name}
              </option>
            ))}
          </select>
        </div>

        <div className="min-w-0 sm:col-span-3">
          {activeTab === 'sources' ? (
            <select
              value={repoFilter}
              onChange={(e) => setRepoFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
            >
              <option value="all">All Repositories</option>
              <option value="CCEL">CCEL</option>
              <option value="New Advent">New Advent</option>
              <option value="Early Christian Writings">Early Christian Writings</option>
              <option value="Project Gutenberg">Project Gutenberg</option>
              <option value="Open Library">Open Library</option>
              <option value="STEP Bible / Academic">STEP Bible / Academic</option>
              <option value="Creeds & Confessions">Creeds & Confessions</option>
              <option value="User Contributed">User Contributed</option>
            </select>
          ) : (
            <select
              value={kindFilter}
              onChange={(e) => setKindFilter(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 text-sm"
            >
              <option value="all">All Attachment Kinds</option>
              <option value="Study Guide PDF">Study Guide PDF</option>
              <option value="Primary Excerpt PDF">Primary Excerpt PDF</option>
              <option value="Diagram / Chart">Diagram / Chart</option>
              <option value="Exegetical Worksheet">Exegetical Worksheet</option>
              <option value="Scholarly Notes">Scholarly Notes</option>
              <option value="Uploaded Document">Uploaded Document</option>
            </select>
          )}
        </div>
      </div>

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
  );
}
