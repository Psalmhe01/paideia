import React from 'react';
import {
  ShieldCheck,
  Flame,
  Landmark,
  Compass,
  ScrollText,
  BookOpen,
  Feather,
  Scale,
  Library,
} from 'lucide-react';

export function DisciplineIcon({
  name,
  className = 'w-5 h-5',
}: {
  name: string;
  className?: string;
}) {
  switch (name) {
    case 'ShieldCheck':
      return <ShieldCheck className={className} />;
    case 'Flame':
      return <Flame className={className} />;
    case 'Landmark':
      return <Landmark className={className} />;
    case 'Compass':
      return <Compass className={className} />;
    case 'ScrollText':
      return <ScrollText className={className} />;
    case 'BookOpen':
      return <BookOpen className={className} />;
    case 'Feather':
      return <Feather className={className} />;
    case 'Scale':
      return <Scale className={className} />;
    default:
      return <Library className={className} />;
  }
}

export function getAccentClasses(color: string): {
  badge: string;
  iconBg: string;
  border: string;
} {
  switch (color) {
    case 'amber':
      return {
        badge: 'bg-amber-100/80 text-amber-900 dark:bg-amber-950/60 dark:text-amber-200',
        iconBg: 'bg-amber-900/10 text-amber-800 dark:bg-amber-500/15 dark:text-amber-300',
        border: 'border-amber-800/20 dark:border-amber-500/25',
      };
    case 'rose':
      return {
        badge: 'bg-rose-100/80 text-rose-900 dark:bg-rose-950/60 dark:text-rose-200',
        iconBg: 'bg-rose-900/10 text-rose-800 dark:bg-rose-500/15 dark:text-rose-300',
        border: 'border-rose-800/20 dark:border-rose-500/25',
      };
    case 'indigo':
      return {
        badge: 'bg-indigo-100/80 text-indigo-900 dark:bg-indigo-950/60 dark:text-indigo-200',
        iconBg: 'bg-indigo-900/10 text-indigo-800 dark:bg-indigo-500/15 dark:text-indigo-300',
        border: 'border-indigo-800/20 dark:border-indigo-500/25',
      };
    case 'emerald':
      return {
        badge: 'bg-emerald-100/80 text-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-200',
        iconBg: 'bg-emerald-900/10 text-emerald-800 dark:bg-emerald-500/15 dark:text-emerald-300',
        border: 'border-emerald-800/20 dark:border-emerald-500/25',
      };
    case 'cyan':
      return {
        badge: 'bg-cyan-100/80 text-cyan-900 dark:bg-cyan-950/60 dark:text-cyan-200',
        iconBg: 'bg-cyan-900/10 text-cyan-800 dark:bg-cyan-500/15 dark:text-cyan-300',
        border: 'border-cyan-800/20 dark:border-cyan-500/25',
      };
    case 'purple':
      return {
        badge: 'bg-purple-100/80 text-purple-900 dark:bg-purple-950/60 dark:text-purple-200',
        iconBg: 'bg-purple-900/10 text-purple-800 dark:bg-purple-500/15 dark:text-purple-300',
        border: 'border-purple-800/20 dark:border-purple-500/25',
      };
    case 'teal':
      return {
        badge: 'bg-teal-100/80 text-teal-900 dark:bg-teal-950/60 dark:text-teal-200',
        iconBg: 'bg-teal-900/10 text-teal-800 dark:bg-teal-500/15 dark:text-teal-300',
        border: 'border-teal-800/20 dark:border-teal-500/25',
      };
    default:
      return {
        badge: 'bg-stone-200/80 text-stone-800 dark:bg-stone-800 dark:text-stone-200',
        iconBg: 'bg-stone-800/10 text-stone-700 dark:bg-stone-500/15 dark:text-stone-300',
        border: 'border-stone-700/20 dark:border-stone-600',
      };
  }
}

export function formatBytes(bytes: number): string {
  if (!bytes || bytes < 1024) return `${bytes || 0} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
}
