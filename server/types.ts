export type DifficultyLevel = 'Foundational' | 'Intermediate' | 'Advanced';

export interface TopicSection {
  heading: string;
  body: string;
  keyTakeaway?: string;
}

export interface PrimaryExcerpt {
  author: string;
  work: string;
  year: string;
  quote: string;
  citation: string;
  sourceUrl?: string;
}

export interface TheologicalPerspective {
  tradition: string;
  proponent: string;
  summary: string;
}

export interface KeyTermInline {
  term: string;
  originalScript?: string;
  transliteration?: string;
  definition: string;
}

export interface SeedAttachmentSpec {
  key: string;
  title: string;
  description: string;
  attachmentKind:
    | 'Primary Excerpt PDF'
    | 'Study Guide PDF'
    | 'Exegetical Worksheet'
    | 'Scholarly Notes'
    | 'Diagram / Chart';
  format: 'pdf' | 'markdown';
  linkedSourceIndex?: number; // Index into topic's sources array if attached directly to an online source
  documentTitle: string;
  documentSubtitle: string;
  sections: { heading: string; content: string }[];
}

export interface SeedSourceSpec {
  title: string;
  author: string;
  year: string;
  repository: string;
  sourceType:
    | 'Primary Text'
    | 'Treatise'
    | 'Council / Creed'
    | 'Reference / Lexicon'
    | 'Commentary'
    | 'Historical Archive';
  url: string;
  citation: string;
  summary: string;
}

export interface SeedQuestionSpec {
  questionType: 'multiple_choice' | 'source_attribution' | 'true_false' | 'term_identification';
  difficulty: DifficultyLevel;
  prompt: string;
  excerptContext?: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  sourceReference: string;
}

export interface SeedTopicSpec {
  slug: string;
  disciplineSlug: string;
  title: string;
  subtitle: string;
  summary: string;
  difficulty: DifficultyLevel;
  readingMinutes: number;
  era: string;
  scriptureRefs: string[];
  sections: TopicSection[];
  excerpts: PrimaryExcerpt[];
  perspectives: TheologicalPerspective[];
  keyTerms: KeyTermInline[];
  relatedTopicSlugs: string[];
  sources: SeedSourceSpec[];
  attachments: SeedAttachmentSpec[];
  questions: SeedQuestionSpec[];
}

export interface SeedDisciplineSpec {
  slug: string;
  name: string;
  greekTitle: string;
  transliteration: string;
  subtitle: string;
  description: string;
  icon: string;
  accentColor: string;
  sortOrder: number;
}

export interface SeedGlossarySpec {
  term: string;
  originalScript: string;
  language: 'Greek' | 'Latin' | 'Hebrew' | 'Theology';
  transliteration: string;
  pronunciation: string;
  category: string;
  definition: string;
  relatedTopicSlug: string;
}
