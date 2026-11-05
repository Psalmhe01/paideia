import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import React, { useState } from 'react';
import { X, Download, ExternalLink, FileText, Eye } from 'lucide-react';
import type { AttachmentItem } from '../types';
import { formatBytes } from './DisciplineIcon';

export function AttachmentModal({
  attachment,
  onClose,
}: {
  attachment: AttachmentItem | null;
  onClose: () => void;
}) {
  const isPdf = attachment?.mimeType?.split(';', 1)[0] === 'application/pdf';
  const isImage = /^image\/(?:jpeg|png|gif|webp|avif|bmp)$/i.test(attachment?.mimeType?.split(';', 1)[0] ?? '');
  const [viewMode, setViewMode] = useState<'rendered' | 'pdf'>('rendered');

  if (!attachment) return null;

  const showPdfFrame = isPdf && (viewMode === 'pdf' || !attachment.previewText);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={attachment.title}
      onKeyDown={(event) => { if (event.key === "Escape") onClose(); }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-xs p-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-4xl max-h-[90vh] flex flex-col rounded-2xl bg-[#fffdf9] dark:bg-stone-900 border border-stone-300 dark:border-stone-700 shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 px-6 py-4 border-b border-stone-200 dark:border-stone-800 bg-stone-100/70 dark:bg-stone-950/60">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2 text-xs text-amber-800 dark:text-amber-400 font-medium mb-1">
              <span className="px-2 py-0.5 rounded-full bg-amber-100 dark:bg-amber-950/70">
                {attachment.attachmentKind}
              </span>
              <span>•</span>
              <span>{attachment.fileName}</span>
              <span>({formatBytes(attachment.fileSize)})</span>
            </div>
            <h3 className="font-display text-2xl font-bold text-stone-900 dark:text-stone-100 truncate">
              {attachment.title}
            </h3>
            {attachment.sourceTitle && (
              <p className="text-xs text-stone-600 dark:text-stone-400 mt-0.5">
                Companion attachment linked to online source:{' '}
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  {attachment.sourceTitle}
                </span>
              </p>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-lg text-stone-500 hover:text-stone-900 dark:hover:text-stone-100 hover:bg-stone-200/60 dark:hover:bg-stone-800 transition"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar for PDF + Readable Text */}
        {isPdf && attachment.previewText && (
          <div className="flex items-center justify-between px-6 py-2.5 bg-stone-50 dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 text-xs">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode('rendered')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                  viewMode === 'rendered'
                    ? 'bg-amber-900 text-white dark:bg-amber-600'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
                }`}
              >
                <FileText className="w-3.5 h-3.5" />
                Reader View
              </button>
              <button
                onClick={() => setViewMode('pdf')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg font-medium transition ${
                  viewMode === 'pdf'
                    ? 'bg-amber-900 text-white dark:bg-amber-600'
                    : 'text-stone-600 dark:text-stone-300 hover:bg-stone-200/70 dark:hover:bg-stone-800'
                }`}
              >
                <Eye className="w-3.5 h-3.5" />
                Embedded PDF Document
              </button>
            </div>
            <a
              href={attachment.fileUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 text-amber-800 dark:text-amber-400 hover:underline font-medium"
            >
              Open PDF in New Tab <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-6">
          {showPdfFrame ? (
            <iframe
              src={attachment.fileUrl}
              title={attachment.title}
              className="w-full h-[62vh] rounded-xl border border-stone-200 dark:border-stone-700 bg-white"
            />
          ) : isImage ? (
            <div className="flex justify-center">
              <img
                src={attachment.fileUrl}
                alt={attachment.title}
                className="max-h-[65vh] rounded-xl border border-stone-200 dark:border-stone-700"
              />
            </div>
          ) : attachment.previewText ? (
            <div className="article-markdown font-reading text-lg text-stone-800 dark:text-stone-200 max-w-3xl mx-auto">
              <ReactMarkdown remarkPlugins={[remarkGfm]} components={{
                table: ({ children }) => <div className="ref-table-scroll" role="region" aria-label="Comparison table" tabIndex={0}><table>{children}</table></div>,
              }}>{attachment.previewText}</ReactMarkdown>
            </div>
          ) : (
            <div className="text-center py-12 space-y-3">
              <FileText className="w-12 h-12 mx-auto text-stone-400" />
              <p className="text-stone-600 dark:text-stone-300">
                {attachment.description || 'Binary document attachment ready to open or download.'}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 border-t border-stone-200 dark:border-stone-800 bg-stone-50 dark:bg-stone-950/50">
          <p className="text-xs text-stone-500 dark:text-stone-400 truncate">
            {attachment.description}
          </p>
          <div className="flex items-center gap-2.5 shrink-0">
            <a
              href={attachment.downloadUrl}
              download
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-900 hover:bg-amber-800 dark:bg-amber-600 dark:hover:bg-amber-500 text-white text-sm font-medium transition shadow-xs"
            >
              <Download className="w-4 h-4" />
              Download File
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
