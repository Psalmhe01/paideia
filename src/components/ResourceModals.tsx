import React, { useEffect, useState } from 'react';
import {
  X,
  Globe,
  Search,
  Plus,
  Upload,
  FileText,
  ExternalLink,
  Loader2,
  Check,
} from 'lucide-react';
import { api } from '../api';
import type { DiscoveredResource, SourceItem, TopicSummary } from '../types';

export function AddSourceModal({
  isOpen,
  onClose,
  topics,
  defaultTopicSlug,
  onCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  topics: TopicSummary[];
  defaultTopicSlug?: string;
  onCreated: () => void;
}) {
  const [tab, setTab] = useState<'discover' | 'manual'>('discover');
  const [topicSlug, setTopicSlug] = useState(defaultTopicSlug || topics[0]?.slug || '');
  const [searchQuery, setSearchQuery] = useState('Augustine Confessions');
  const [results, setResults] = useState<DiscoveredResource[]>([]);
  const [searching, setSearching] = useState(false);
  const [addedUrls, setAddedUrls] = useState<Record<string, boolean>>({});

  // Manual form fields
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [year, setYear] = useState('');
  const [repository, setRepository] = useState('CCEL');
  const [sourceType, setSourceType] = useState('Primary Text');
  const [url, setUrl] = useState('');
  const [citation, setCitation] = useState('');
  const [summary, setSummary] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultTopicSlug) setTopicSlug(defaultTopicSlug);
    else if (!topicSlug && topics[0]?.slug) setTopicSlug(topics[0].slug);
  }, [defaultTopicSlug, topics]);

  useEffect(() => {
    if (isOpen && tab === 'discover') {
      runDiscovery(searchQuery);
    }
  }, [isOpen, tab]);

  if (!isOpen) return null;

  async function runDiscovery(q: string) {
    setSearching(true);
    setError('');
    try {
      const items = await api.discoverOnlineSources(q);
      setResults(items);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Discovery failed');
    } finally {
      setSearching(false);
    }
  }

  async function handleImportDiscovered(item: DiscoveredResource) {
    if (!topicSlug) return;
    try {
      await api.addSource({
        topicSlug,
        title: item.title,
        author: item.author,
        year: item.year,
        repository: item.repository,
        sourceType: item.sourceType,
        url: item.url,
        citation: item.citation,
        summary: item.summary,
      });
      setAddedUrls((prev) => ({ ...prev, [item.url]: true }));
      onCreated();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to attach resource');
    }
  }

  async function handleManualSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topicSlug || !title.trim() || !url.trim()) {
      setError('Topic, Title, and URL are required.');
      return;
    }
    setSaving(true);
    setError('');
    try {
      await api.addSource({
        topicSlug,
        title,
        author: author || 'Scholarly Author',
        year,
        repository,
        sourceType,
        url,
        citation,
        summary,
      });
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save source');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-3xl max-h-[90vh] flex flex-col rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
              Add Online Theological Source
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Search live open-access digital libraries (Project Gutenberg, Open Library, CCEL, New Advent) or attach any URL.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Target Topic Selector + Mode Tabs */}
        <div className="px-6 py-3 bg-stone-100/70 dark:bg-stone-950/60 border-b border-stone-200 dark:border-stone-800 space-y-3">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-stone-600 dark:text-stone-400 mb-1">
              Target Paideia Study Topic
            </label>
            <select
              value={topicSlug}
              onChange={(e) => setTopicSlug(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-700 text-sm text-stone-900 dark:text-stone-100"
            >
              {topics.map((t) => (
                <option key={t.slug} value={t.slug}>
                  [{t.disciplineName}] {t.title}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setTab('discover')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition ${
                tab === 'discover'
                  ? 'bg-amber-900 text-white dark:bg-amber-600'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
              }`}
            >
              <Search className="w-3.5 h-3.5" />
              Discover Online Archives (Live Search)
            </button>
            <button
              type="button"
              onClick={() => setTab('manual')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition ${
                tab === 'manual'
                  ? 'bg-amber-900 text-white dark:bg-amber-600'
                  : 'bg-white dark:bg-stone-900 text-stone-600 dark:text-stone-300 border border-stone-200 dark:border-stone-700'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              Attach Custom Online URL
            </button>
          </div>
        </div>

        {error && (
          <div className="mx-6 mt-3 px-4 py-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 text-xs">
            {error}
          </div>
        )}

        <div className="flex-1 overflow-y-auto p-6">
          {tab === 'discover' ? (
            <div className="space-y-4">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  runDiscovery(searchQuery);
                }}
                className="flex gap-2"
              >
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search Church Fathers, Pascal, Chesterton, Eusebius, Aquinas, Luther..."
                  className="flex-1 px-3.5 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                />
                <button
                  type="submit"
                  disabled={searching}
                  className="px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 text-white text-sm font-medium inline-flex items-center gap-1.5"
                >
                  {searching ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    <Search className="w-4 h-4" />
                  )}
                  Search
                </button>
              </form>

              <div className="flex flex-wrap gap-1.5 text-xs">
                {[
                  'Early Church Fathers',
                  'Blaise Pascal',
                  'Chesterton Orthodoxy',
                  'Eusebius',
                  'Westminster Confession',
                  'John of Damascus',
                ].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => {
                      setSearchQuery(preset);
                      runDiscovery(preset);
                    }}
                    className="px-2.5 py-1 rounded-full bg-stone-200/70 dark:bg-stone-800 hover:bg-amber-100 dark:hover:bg-amber-950/60 text-stone-700 dark:text-stone-300 transition"
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <div className="space-y-3">
                {results.map((item, idx) => {
                  const isAdded = Boolean(addedUrls[item.url]);
                  return (
                    <div
                      key={`${item.url}-${idx}`}
                      className="p-4 rounded-xl border border-stone-200 dark:border-stone-800 bg-white dark:bg-stone-950/50 flex items-start justify-between gap-4"
                    >
                      <div className="space-y-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-2 text-xs">
                          <span className="px-2 py-0.5 rounded-md bg-amber-100 dark:bg-amber-950/70 text-amber-900 dark:text-amber-300 font-medium">
                            {item.repository}
                          </span>
                          <span className="text-stone-500">{item.author}</span>
                          {item.year && <span className="text-stone-400">({item.year})</span>}
                        </div>
                        <h4 className="font-semibold text-stone-900 dark:text-stone-100 text-sm">
                          {item.title}
                        </h4>
                        <p className="text-xs text-stone-600 dark:text-stone-400 line-clamp-2">
                          {item.summary}
                        </p>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-amber-800 dark:text-amber-400 hover:underline"
                        >
                          Inspect Online Source <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                      <button
                        type="button"
                        disabled={isAdded}
                        onClick={() => handleImportDiscovered(item)}
                        className={`shrink-0 px-3 py-2 rounded-xl text-xs font-semibold inline-flex items-center gap-1.5 transition ${
                          isAdded
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/70 dark:text-emerald-300'
                            : 'bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white'
                        }`}
                      >
                        {isAdded ? (
                          <>
                            <Check className="w-3.5 h-3.5" /> Attached
                          </>
                        ) : (
                          <>
                            <Plus className="w-3.5 h-3.5" /> Attach to Topic
                          </>
                        )}
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ) : (
            <form onSubmit={handleManualSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-3">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Resource Title *
                  </label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g., Maximus the Confessor — Chapters on Love"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Author / Editor
                  </label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    placeholder="e.g., Maximus the Confessor"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Date / Era
                  </label>
                  <input
                    type="text"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    placeholder="e.g., c. AD 626"
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Online Repository
                  </label>
                  <select
                    value={repository}
                    onChange={(e) => setRepository(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  >
                    <option value="CCEL">CCEL</option>
                    <option value="New Advent">New Advent</option>
                    <option value="Early Christian Writings">Early Christian Writings</option>
                    <option value="Project Gutenberg">Project Gutenberg</option>
                    <option value="Open Library">Open Library</option>
                    <option value="STEP Bible / Academic">STEP Bible / Academic</option>
                    <option value="Creeds & Confessions">Creeds & Confessions</option>
                    <option value="User Contributed">User Contributed</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Source Type
                  </label>
                  <select
                    value={sourceType}
                    onChange={(e) => setSourceType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  >
                    <option value="Primary Text">Primary Text</option>
                    <option value="Treatise">Treatise</option>
                    <option value="Council / Creed">Council / Creed</option>
                    <option value="Commentary">Commentary</option>
                    <option value="Reference / Lexicon">Reference / Lexicon</option>
                    <option value="Historical Archive">Historical Archive</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Online URL *
                  </label>
                  <input
                    type="url"
                    required
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://www.ccel.org/..."
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Bibliographic Citation
                  </label>
                  <input
                    type="text"
                    value={citation}
                    onChange={(e) => setCitation(e.target.value)}
                    placeholder="Edition, volume, translator..."
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                    Summary / Study Relevance
                  </label>
                  <textarea
                    rows={2}
                    value={summary}
                    onChange={(e) => setSummary(e.target.value)}
                    placeholder="Brief description of what scholars will learn from this source..."
                    className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 rounded-xl text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 text-white text-sm font-medium"
                >
                  {saving ? 'Saving...' : 'Save Online Resource'}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export function AddAttachmentModal({
  isOpen,
  onClose,
  topics,
  sources,
  defaultTopicSlug,
  defaultSourceId,
  onCreated,
}: {
  isOpen: boolean;
  onClose: () => void;
  topics: TopicSummary[];
  sources: SourceItem[];
  defaultTopicSlug?: string;
  defaultSourceId?: number | null;
  onCreated: () => void;
}) {
  const [mode, setMode] = useState<'file' | 'markdown'>('file');
  const [topicSlug, setTopicSlug] = useState(defaultTopicSlug || topics[0]?.slug || '');
  const [sourceId, setSourceId] = useState<string>(
    defaultSourceId ? String(defaultSourceId) : ''
  );
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [attachmentKind, setAttachmentKind] = useState('Study Guide PDF');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [textContent, setTextContent] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (defaultTopicSlug) setTopicSlug(defaultTopicSlug);
    else if (!topicSlug && topics[0]?.slug) setTopicSlug(topics[0].slug);
  }, [defaultTopicSlug, topics]);

  useEffect(() => {
    setSourceId(defaultSourceId ? String(defaultSourceId) : '');
  }, [defaultSourceId, isOpen]);

  if (!isOpen) return null;

  const filteredSources = sources.filter((s) => s.topicSlug === topicSlug);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!topicSlug || !title.trim()) {
      setError('Topic and Attachment Title are required.');
      return;
    }
    if (mode === 'file' && !selectedFile) {
      setError('Please choose a file to upload (PDF, Markdown, TXT, Image, etc.).');
      return;
    }
    if (mode === 'markdown' && !textContent.trim()) {
      setError('Please enter your study attachment content.');
      return;
    }

    setSaving(true);
    setError('');
    try {
      const fd = new FormData();
      fd.append('topicSlug', topicSlug);
      if (sourceId) fd.append('sourceId', sourceId);
      fd.append('title', title.trim());
      fd.append('description', description.trim());
      fd.append('attachmentKind', attachmentKind);
      if (mode === 'file' && selectedFile) {
        fd.append('file', selectedFile);
      } else {
        fd.append('textContent', textContent);
      }

      await api.uploadAttachment(fd);
      setTitle('');
      setDescription('');
      setSelectedFile(null);
      setTextContent('');
      onCreated();
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload attachment');
    } finally {
      setSaving(false);
    }
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl max-h-[90vh] flex flex-col rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-200 dark:border-stone-800">
          <div>
            <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100">
              Attach Document or Study Companion
            </h3>
            <p className="text-xs text-stone-500 dark:text-stone-400">
              Upload a PDF, image, or document—or compose a Markdown study sheet—and attach it to a Topic or directly to an Online Source.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:bg-stone-200/60 dark:hover:bg-stone-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-6 space-y-4">
          {error && (
            <div className="px-4 py-2 rounded-xl bg-rose-100 dark:bg-rose-950/60 text-rose-800 dark:text-rose-200 text-xs">
              {error}
            </div>
          )}

          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setMode('file')}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition ${
                mode === 'file'
                  ? 'bg-amber-900 text-white dark:bg-amber-600'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              Upload File (PDF, MD, TXT, Image)
            </button>
            <button
              type="button"
              onClick={() => {
                setMode('markdown');
                setAttachmentKind('Scholarly Notes');
              }}
              className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold inline-flex items-center justify-center gap-1.5 transition ${
                mode === 'markdown'
                  ? 'bg-amber-900 text-white dark:bg-amber-600'
                  : 'bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-300'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              Write Markdown Study Attachment
            </button>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Study Topic *
              </label>
              <select
                value={topicSlug}
                onChange={(e) => {
                  setTopicSlug(e.target.value);
                  setSourceId('');
                }}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
              >
                {topics.map((t) => (
                  <option key={t.slug} value={t.slug}>
                    [{t.disciplineName}] {t.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Link Directly to an Online Source (Optional — "Attachments to Sources")
              </label>
              <select
                value={sourceId}
                onChange={(e) => setSourceId(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
              >
                <option value="">General Topic Attachment (Not tied to a single URL)</option>
                {filteredSources.map((s) => (
                  <option key={s.id} value={String(s.id)}>
                    [{s.repository}] {s.title}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Attachment Title *
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g., Reading Outline on De Trinitate Book I"
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Attachment Kind
              </label>
              <select
                value={attachmentKind}
                onChange={(e) => setAttachmentKind(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
              >
                <option value="Study Guide PDF">Study Guide PDF</option>
                <option value="Primary Excerpt PDF">Primary Excerpt PDF</option>
                <option value="Exegetical Worksheet">Exegetical Worksheet</option>
                <option value="Diagram / Chart">Diagram / Chart</option>
                <option value="Scholarly Notes">Scholarly Notes</option>
                <option value="Uploaded Document">Uploaded Document</option>
              </select>
            </div>

            <div className="sm:col-span-2">
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Description
              </label>
              <input
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Concise summary of this attachment..."
                className="w-full px-3 py-2 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm"
              />
            </div>
          </div>

          {mode === 'file' ? (
            <div className="p-5 rounded-xl border-2 border-dashed border-stone-300 dark:border-stone-700 bg-stone-50/70 dark:bg-stone-950/40 text-center">
              <Upload className="w-8 h-8 mx-auto text-amber-800 dark:text-amber-400 mb-2" />
              <input
                type="file"
                onChange={(e) => {
                  const f = e.target.files?.[0] || null;
                  setSelectedFile(f);
                  if (f && !title) {
                    setTitle(f.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
                  }
                }}
                className="block w-full text-xs text-stone-600 dark:text-stone-300 file:mr-3 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-amber-900 file:text-white hover:file:bg-amber-800 cursor-pointer"
              />
              {selectedFile && (
                <p className="mt-2 text-xs text-emerald-700 dark:text-emerald-400 font-medium">
                  Selected: {selectedFile.name} ({Math.round(selectedFile.size / 1024)} KB)
                </p>
              )}
            </div>
          ) : (
            <div>
              <label className="block text-xs font-medium text-stone-600 dark:text-stone-400 mb-1">
                Markdown / Excerpt Content *
              </label>
              <textarea
                rows={7}
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="# Primary Reading Notes&#10;## Key Thesis&#10;- Point 1..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-white dark:bg-stone-950 border border-stone-300 dark:border-stone-700 text-sm font-mono"
              />
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-sm text-stone-600 dark:text-stone-300 hover:bg-stone-200/60 dark:hover:bg-stone-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-5 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 text-white text-sm font-medium"
            >
              {saving ? 'Uploading...' : 'Save Attachment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
