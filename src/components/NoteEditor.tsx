import React, { useLayoutEffect, useRef, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import {
  Bold,
  Eye,
  Heading2,
  Italic,
  Link2,
  List,
  ListOrdered,
  Pencil,
  Quote,
  Save,
  Trash2,
} from 'lucide-react';

type NoteEditorProps = {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void | Promise<void>;
  onDelete?: () => void | Promise<void>;
  dirty: boolean;
  saving?: boolean;
  saved?: boolean;
  error?: string;
  compact?: boolean;
  placeholder?: string;
};

const toolButtonClass = 'inline-flex h-9 w-9 items-center justify-center border border-stone-200 bg-white text-stone-700 transition hover:bg-amber-50 hover:text-amber-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-amber-700 disabled:opacity-40 dark:border-stone-700 dark:bg-stone-900 dark:text-stone-200 dark:hover:bg-stone-800';

function escapeHtml(value: string) {
  return value.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;');
}

function safeHref(value: string) {
  const href = value.trim();
  return /^(https?:\/\/|mailto:|\/|#)/i.test(href) && !/^\/\//.test(href) ? href : '';
}

function markdownInlineToHtml(value: string) {
  return escapeHtml(value)
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/__([^_]+)__/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/_([^_]+)_/g, '<em>$1</em>')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, text: string, url: string) => {
      const href = safeHref(url);
      return href ? `<a href="${escapeHtml(href)}">${text}</a>` : text;
    });
}

function markdownToHtml(markdown: string) {
  const lines = markdown.replace(/\r/g, '').split('\n');
  const blocks: string[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (!line.trim()) { index++; continue; }
    const heading = line.match(/^(#{1,3})\s+(.*)$/);
    if (heading) {
      const level = heading[1].length;
      blocks.push(`<h${level}>${markdownInlineToHtml(heading[2])}</h${level}>`);
      index++;
      continue;
    }
    if (/^\s*(?:---+|___+|\*\*\*+)\s*$/.test(line)) {
      blocks.push('<hr>');
      index++;
      continue;
    }
    if (/^\s*>/.test(line)) {
      const quoted: string[] = [];
      while (index < lines.length && /^\s*>/.test(lines[index])) quoted.push(lines[index++].replace(/^\s*>\s?/, ''));
      blocks.push(`<blockquote><p>${markdownInlineToHtml(quoted.join(' '))}</p></blockquote>`);
      continue;
    }
    const unordered = /^\s*[-+*]\s+/.test(line);
    const ordered = /^\s*\d+\.\s+/.test(line);
    if (unordered || ordered) {
      const list: string[] = [];
      const marker = unordered ? /^\s*[-+*]\s+/ : /^\s*\d+\.\s+/;
      while (index < lines.length && marker.test(lines[index])) list.push(`<li>${markdownInlineToHtml(lines[index++].replace(marker, ''))}</li>`);
      blocks.push(`<${unordered ? 'ul' : 'ol'}>${list.join('')}</${unordered ? 'ul' : 'ol'}>`);
      continue;
    }
    const paragraph = [line];
    index++;
    while (index < lines.length && lines[index].trim() && !/^(#{1,3})\s|^\s*>|^\s*[-+*]\s+|^\s*\d+\.\s+/.test(lines[index])) paragraph.push(lines[index++]);
    blocks.push(`<p>${markdownInlineToHtml(paragraph.join(' '))}</p>`);
  }
  return blocks.join('');
}

function inlineNodesToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return (node.textContent || '').replace(/\u00a0/g, ' ');
  if (node.nodeType !== Node.ELEMENT_NODE) return '';
  const element = node as HTMLElement;
  const content = Array.from(element.childNodes).map(inlineNodesToMarkdown).join('');
  switch (element.tagName) {
    case 'STRONG': case 'B': return `**${content}**`;
    case 'EM': case 'I': return `*${content}*`;
    case 'CODE': return `\`${content}\``;
    case 'A': {
      const href = safeHref(element.getAttribute('href') || '');
      return href ? `[${content}](${href})` : content;
    }
    case 'BR': return '\n';
    default: return content;
  }
}

function listItemToMarkdown(item: HTMLElement, marker: string): string {
  const text = Array.from(item.childNodes)
    .filter((node) => !(node instanceof HTMLElement && (node.tagName === 'UL' || node.tagName === 'OL')))
    .map(inlineNodesToMarkdown).join('').trim();
  const nested = Array.from(item.children)
    .filter((child) => child.tagName === 'UL' || child.tagName === 'OL')
    .flatMap((list) => Array.from(list.children).map((child) => listItemToMarkdown(child as HTMLElement, list.tagName === 'OL' ? '1. ' : '- ')));
  return [marker + text, ...nested.map((line) => `  ${line}`)].join('\n');
}

function blockNodesToMarkdown(nodes: NodeListOf<ChildNode> | HTMLCollection) {
  const blocks: string[] = [];
  for (const node of Array.from(nodes)) {
    if (node.nodeType === Node.TEXT_NODE) {
      const text = (node.textContent || '').trim();
      if (text) blocks.push(text);
      continue;
    }
    if (!(node instanceof HTMLElement)) continue;
    const tag = node.tagName;
    if (/^H[1-6]$/.test(tag)) {
      const level = Math.min(3, Number(tag[1]));
      blocks.push(`${'#'.repeat(level)} ${inlineNodesToMarkdown(node).trim()}`);
    } else if (tag === 'BLOCKQUOTE') {
      const quoted = blockNodesToMarkdown(node.childNodes) || inlineNodesToMarkdown(node).trim();
      blocks.push(quoted.split('\n').map((line) => `> ${line}`).join('\n'));
    } else if (tag === 'UL' || tag === 'OL') {
      const marker = tag === 'OL' ? '1. ' : '- ';
      blocks.push(Array.from(node.children).filter((child) => child.tagName === 'LI').map((child) => listItemToMarkdown(child as HTMLElement, marker)).join('\n'));
    } else if (tag === 'HR') {
      blocks.push('---');
    } else if (tag === 'P' || tag === 'DIV') {
      blocks.push(node.querySelector('p,h1,h2,h3,blockquote,ul,ol')
        ? blockNodesToMarkdown(node.childNodes)
        : inlineNodesToMarkdown(node).trim());
    } else {
      blocks.push(inlineNodesToMarkdown(node).trim());
    }
  }
  return blocks.filter(Boolean).join('\n\n');
}

function htmlToMarkdown(editor: HTMLElement) {
  return blockNodesToMarkdown(editor.childNodes).replace(/\n{3,}/g, '\n\n').trim();
}

export function NoteEditor({
  value,
  onChange,
  onSave,
  onDelete,
  dirty,
  saving = false,
  saved = false,
  error,
  compact = false,
  placeholder = 'Record reflections, questions, citations, and connections…',
}: NoteEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const lastEmittedValue = useRef<string | null>(null);
  const [preview, setPreview] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useLayoutEffect(() => {
    const editor = editorRef.current;
    if (!editor) return;
    if (lastEmittedValue.current === value) {
      lastEmittedValue.current = null;
      return;
    }
    const html = markdownToHtml(value);
    if (editor.innerHTML !== html) editor.innerHTML = html;
  }, [value, preview]);

  function syncEditorValue() {
    if (!editorRef.current) return;
    const markdown = htmlToMarkdown(editorRef.current);
    lastEmittedValue.current = markdown;
    onChange(markdown);
  }

  function runCommand(command: string, commandValue?: string) {
    const editor = editorRef.current;
    if (!editor) return;
    editor.focus();
    document.execCommand(command, false, commandValue);
    syncEditorValue();
  }

  function insertLink() {
    const editor = editorRef.current;
    if (!editor) return;
    const selection = window.getSelection();
    if (!selection) return;
    editor.focus();
    if (!selection.toString()) document.execCommand('insertText', false, 'link text');
    const activeSelection = window.getSelection();
    const range = activeSelection?.rangeCount ? activeSelection.getRangeAt(0) : null;
    if (range && range.collapsed && range.startContainer.nodeType === Node.TEXT_NODE) {
      const length = 'link text'.length;
      const start = Math.max(0, range.startOffset - length);
      range.setStart(range.startContainer, start);
      activeSelection?.removeAllRanges();
      activeSelection?.addRange(range);
    }
    const url = window.prompt('Enter the link address', 'https://');
    if (url == null) return;
    const normalized = safeHref(url);
    if (!normalized) return;
    document.execCommand('createLink', false, normalized);
    syncEditorValue();
  }

  function handleEditorKeyDown(event: React.KeyboardEvent<HTMLDivElement>) {
    if (!(event.ctrlKey || event.metaKey)) return;
    const key = event.key.toLowerCase();
    if (key === 'b' || key === 'i') {
      event.preventDefault();
      runCommand(key === 'b' ? 'bold' : 'italic');
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLDivElement>) {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    document.execCommand('insertText', false, text);
    syncEditorValue();
  }

  return (
    <div className="note-editor min-w-0 overflow-hidden border border-stone-200 bg-white dark:border-stone-700 dark:bg-stone-950">
      <div className="flex flex-wrap items-center justify-between gap-2 border-b border-stone-200 bg-stone-50 px-3 py-2 dark:border-stone-800 dark:bg-stone-900">
        <div className="flex flex-wrap items-center gap-1" role="toolbar" aria-label="Note formatting">
          <button type="button" className={toolButtonClass} disabled={preview} title="Bold (Ctrl+B)" aria-label="Bold" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('bold')}><Bold className="h-4 w-4" /></button>
          <button type="button" className={toolButtonClass} disabled={preview} title="Italic (Ctrl+I)" aria-label="Italic" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('italic')}><Italic className="h-4 w-4" /></button>
          <span aria-hidden="true" className="mx-1 h-6 border-l border-stone-300 dark:border-stone-700" />
          <button type="button" className={toolButtonClass} disabled={preview} title="Heading" aria-label="Heading" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('formatBlock', '<h2>')}><Heading2 className="h-4 w-4" /></button>
          <button type="button" className={toolButtonClass} disabled={preview} title="Bulleted list" aria-label="Bulleted list" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('insertUnorderedList')}><List className="h-4 w-4" /></button>
          <button type="button" className={toolButtonClass} disabled={preview} title="Numbered list" aria-label="Numbered list" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('insertOrderedList')}><ListOrdered className="h-4 w-4" /></button>
          <button type="button" className={toolButtonClass} disabled={preview} title="Block quote" aria-label="Block quote" onMouseDown={(event) => event.preventDefault()} onClick={() => runCommand('formatBlock', '<blockquote>')}><Quote className="h-4 w-4" /></button>
          <button type="button" className={toolButtonClass} disabled={preview} title="Insert link" aria-label="Insert link" onMouseDown={(event) => event.preventDefault()} onClick={insertLink}><Link2 className="h-4 w-4" /></button>
        </div>
        <button type="button" className="inline-flex h-9 items-center gap-1.5 border border-stone-200 px-3 text-xs font-semibold text-stone-700 hover:bg-white dark:border-stone-700 dark:text-stone-200 dark:hover:bg-stone-800" onClick={() => setPreview((previous) => !previous)} aria-pressed={preview}>
          {preview ? <Pencil className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
          {preview ? 'Edit' : 'Preview'}
        </button>
      </div>

      {preview ? (
        <div className={`article-markdown min-w-0 overflow-auto px-5 py-5 text-stone-800 dark:text-stone-200 ${compact ? 'min-h-48 max-h-[28rem]' : 'min-h-[24rem] max-h-[65vh]'}`}>
          {value.trim() ? <ReactMarkdown>{value}</ReactMarkdown> : <p className="italic text-stone-400">Your formatted note will appear here.</p>}
        </div>
      ) : (
        <div
          ref={editorRef}
          contentEditable
          suppressContentEditableWarning
          role="textbox"
          aria-multiline="true"
          aria-label="Study note text"
          data-placeholder={placeholder}
          onInput={syncEditorValue}
          onKeyDown={handleEditorKeyDown}
          onPaste={handlePaste}
          onClick={(event) => { if ((event.target as HTMLElement).closest('a')) event.preventDefault(); }}
          className={`note-editor__surface article-markdown min-w-0 overflow-auto px-5 py-4 font-reading text-base leading-7 text-stone-800 outline-none focus:ring-2 focus:ring-inset focus:ring-amber-700/40 dark:text-stone-100 ${compact ? 'min-h-48 max-h-[28rem]' : 'min-h-[24rem] max-h-[65vh]'}`}
        />
      )}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-stone-200 bg-stone-50 px-3 py-3 dark:border-stone-800 dark:bg-stone-900">
        <div className="min-h-5 text-xs" aria-live="polite">
          {error ? <span className="font-medium text-rose-700 dark:text-rose-300">{error}</span>
            : saving ? <span className="text-stone-500">Saving note…</span>
              : dirty ? <span className="text-amber-800 dark:text-amber-300">Unsaved changes</span>
                : saved ? <span className="text-emerald-700 dark:text-emerald-300">All changes saved</span>
                  : <span className="text-stone-500">Rich text · Ctrl/⌘ + B or I</span>}
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {onDelete && !dirty && value.trim() && (
            confirmDelete ? (
              <>
                <span className="text-xs text-rose-700 dark:text-rose-300">Delete this note?</span>
                <button type="button" onClick={() => { void onDelete(); setConfirmDelete(false); }} className="inline-flex min-h-9 items-center gap-1.5 border border-rose-300 px-3 text-xs font-semibold text-rose-800 hover:bg-rose-50 dark:border-rose-900 dark:text-rose-300 dark:hover:bg-rose-950/40"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
                <button type="button" onClick={() => setConfirmDelete(false)} className="min-h-9 border border-stone-300 px-3 text-xs font-semibold text-stone-700 dark:border-stone-700 dark:text-stone-200">Cancel</button>
              </>
            ) : (
              <button type="button" onClick={() => setConfirmDelete(true)} className="inline-flex min-h-9 items-center gap-1.5 border border-stone-300 px-3 text-xs font-semibold text-stone-600 hover:border-rose-300 hover:text-rose-800 dark:border-stone-700 dark:text-stone-300 dark:hover:text-rose-300"><Trash2 className="h-3.5 w-3.5" /> Delete note</button>
            )
          )}
          <button type="button" onClick={() => { void onSave(); }} disabled={!dirty || saving || (!value.trim() && !onDelete)} className="inline-flex min-h-9 items-center gap-1.5 bg-stone-900 px-4 text-xs font-semibold text-white transition hover:bg-amber-900 disabled:cursor-not-allowed disabled:opacity-45 dark:bg-amber-600 dark:hover:bg-amber-500">
            <Save className="h-3.5 w-3.5" /> {saving ? 'Saving…' : 'Save note'}
          </button>
        </div>
      </div>
    </div>
  );
}
