export type DifficultyLevel = 'Foundational' | 'Intermediate' | 'Advanced';

export interface DisciplineSummary {
  slug: string;
  name: string;
  greekTitle: string;
  transliteration: string;
  subtitle: string;
  description: string;
  icon: string;
  accentColor: string;
  sortOrder: number;
  topicCount?: number;
  totalTopics?: number;
  studiedCount?: number;
  studiedTopics?: number;
  sourceCount: number;
  attachmentCount: number;
  questionCount: number;
  bestQuizPercentage?: number | null;
  bestQuizScore?: number | null;
  attemptCount?: number;
}

export interface TopicSummary {
  id: number;
  slug: string;
  disciplineSlug: string;
  disciplineName: string;
  disciplineGreek: string;
  accentColor: string;
  title: string;
  subtitle: string;
  summary: string;
  difficulty: DifficultyLevel;
  readingMinutes: number;
  era: string;
  scriptureRefs: string[];
  isCustom: boolean;
  studied: boolean;
  bookmarked: boolean;
  hasNotes: boolean;
  sourceCount: number;
  attachmentCount: number;
  questionCount: number;
}

export interface AttachmentItem {
  id: number;
  topicSlug: string;
  topicTitle?: string;
  disciplineSlug?: string;
  disciplineName?: string;
  sourceId: number | null;
  sourceTitle?: string | null;
  sourceUrl?: string | null;
  title: string;
  description: string;
  fileName: string;
  mimeType: string;
  fileSize: number;
  attachmentKind: string;
  previewText: string;
  isCustom: boolean;
  createdAt: string;
  fileUrl: string;
  downloadUrl: string;
}

export interface SourceItem {
  id: number;
  topicSlug: string;
  topicTitle?: string;
  disciplineSlug?: string;
  disciplineName?: string;
  title: string;
  author: string;
  year: string;
  repository: string;
  sourceType: string;
  url: string;
  citation: string;
  summary: string;
  isCustom: boolean;
  createdAt: string;
  attachments: AttachmentItem[];
}

export interface TopicDetail {
  id: number;
  slug: string;
  disciplineSlug: string;
  disciplineName: string;
  disciplineGreek: string;
  disciplineTransliteration: string;
  accentColor: string;
  title: string;
  subtitle: string;
  summary: string;
  difficulty: DifficultyLevel;
  readingMinutes: number;
  era: string;
  isCustom: boolean;
  scriptureRefs: string[];
  sections: Array<{ heading: string; body: string; keyTakeaway?: string }>;
  excerpts: Array<{
    author: string;
    work: string;
    year: string;
    quote: string;
    citation: string;
    sourceUrl?: string;
  }>;
  perspectives: Array<{ tradition: string; proponent: string; summary: string }>;
  keyTerms: Array<{
    term: string;
    originalScript?: string;
    transliteration?: string;
    definition: string;
  }>;
  relatedTopics: Array<{
    slug: string;
    title: string;
    subtitle: string;
    difficulty: DifficultyLevel;
    disciplineSlug: string;
    disciplineName: string;
  }>;
  sources: SourceItem[];
  attachments: AttachmentItem[];
  progress: {
    studied: boolean;
    bookmarked: boolean;
    notes: string;
    lastStudiedAt: string | null;
  };
  quizSummary: {
    questionCount: number;
    attemptCount: number;
    bestPercentage: number | null;
  };
}

export interface GlossaryItem {
  id: number;
  term: string;
  originalScript: string;
  language: string;
  transliteration: string;
  pronunciation: string;
  category: string;
  definition: string;
  relatedTopicSlug: string;
  relatedTopicTitle?: string | null;
}

export interface QuizQuestion {
  id: number;
  topicSlug: string;
  topicTitle: string;
  disciplineSlug: string;
  disciplineName: string;
  questionType: 'multiple_choice' | 'source_attribution' | 'true_false' | 'term_identification';
  difficulty: DifficultyLevel;
  prompt: string;
  excerptContext?: string;
  options: string[];
}

export interface QuizFeedback {
  correctIndex: number;
  explanation: string;
  sourceReference: string;
}

export interface GeneratedQuiz {
  title: string;
  scope: string;
  topicSlug: string | null;
  disciplineSlug: string | null;
  questions: QuizQuestion[];
}

export interface QuizSubmissionResult {
  attemptId: number;
  title: string;
  mode: 'study' | 'exam';
  score: number;
  totalQuestions: number;
  percentage: number;
  durationSeconds: number;
  details: Array<{
    questionId: number;
    topicSlug: string;
    topicTitle: string;
    disciplineSlug: string;
    disciplineName: string;
    prompt: string;
    options: string[];
    selectedIndex: number;
    correctIndex: number;
    isCorrect: boolean;
    explanation: string;
    sourceReference: string;
  }>;
}

export interface QuizAttemptSummary {
  id: number;
  title: string;
  mode: 'study' | 'exam';
  disciplineSlug: string | null;
  topicSlug: string | null;
  score: number;
  totalQuestions: number;
  percentage: number;
  durationSeconds: number;
  createdAt: string;
}

export interface QuizOverviewData {
  byDiscipline: Array<{
    slug: string;
    name: string;
    greekTitle: string;
    subtitle: string;
    icon: string;
    accentColor: string;
    questionCount: number;
    topicCount: number;
    bestPercentage: number | null;
    attemptCount: number;
  }>;
  byTopic: Array<{
    slug: string;
    title: string;
    disciplineSlug: string;
    disciplineName: string;
    difficulty: DifficultyLevel;
    questionCount: number;
    bestPercentage: number | null;
    attemptCount: number;
  }>;
  missedCount: number;
  history: QuizAttemptSummary[];
}

export interface DashboardStats {
  totals: {
    disciplines: number;
    topics: number;
    studiedTopics: number;
    bookmarkedTopics: number;
    notesCount: number;
    sources: number;
    attachments: number;
    questions: number;
    glossary: number;
    quizAttempts: number;
    averageQuizPercentage: number;
    missedQuestions: number;
  };
  disciplines: DisciplineSummary[];
  recentAttempts: QuizAttemptSummary[];
  notebookItems: Array<{
    slug: string;
    title: string;
    subtitle: string;
    disciplineSlug: string;
    disciplineName: string;
    studied: number;
    bookmarked: number;
    notes: string;
    lastStudiedAt: string;
  }>;
}

export interface DiscoveredResource {
  title: string;
  author: string;
  year: string;
  repository: string;
  sourceType: string;
  url: string;
  citation: string;
  summary: string;
}
