import type {
  AttachmentItem,
  DashboardStats,
  DisciplineSummary,
  DiscoveredResource,
  GeneratedQuiz,
  GlossaryItem,
  QuizOverviewData,
  QuizFeedback,
  QuizSubmissionResult,
  SourceItem,
  TopicDetail,
  TopicSummary,
} from './types';

async function jsonRequest<T>(url: string, init?: RequestInit): Promise<T> {
  const res = await fetch(url, {
    ...init,
    headers: {
      ...(init?.body instanceof FormData ? {} : { 'Content-Type': 'application/json' }),
      ...(init?.headers || {}),
    },
  });

  if (!res.ok) {
    let errMsg = `Request failed (${res.status})`;
    try {
      const data = await res.json();
      if (data?.error) errMsg = data.error;
    } catch {
      // ignore
    }
    throw new Error(errMsg);
  }
  return res.json() as Promise<T>;
}

export const api = {
  getStats: () => jsonRequest<DashboardStats>('/api/stats'),

  getDisciplines: () => jsonRequest<DisciplineSummary[]>('/api/disciplines'),

  getTopics: (params?: {
    discipline?: string;
    search?: string;
    difficulty?: string;
    status?: string;
  }) => {
    const sp = new URLSearchParams();
    if (params?.discipline) sp.set('discipline', params.discipline);
    if (params?.search) sp.set('search', params.search);
    if (params?.difficulty) sp.set('difficulty', params.difficulty);
    if (params?.status) sp.set('status', params.status);
    const qs = sp.toString();
    return jsonRequest<TopicSummary[]>(`/api/topics${qs ? `?${qs}` : ''}`);
  },

  getTopic: (slug: string) => jsonRequest<TopicDetail>(`/api/topics/${encodeURIComponent(slug)}`),

  createTopic: (payload: {
    disciplineSlug: string;
    title: string;
    subtitle: string;
    summary: string;
    difficulty: string;
    readingMinutes: number;
    era: string;
    scriptureRefs: string[];
    sections: Array<{ heading: string; body: string; keyTakeaway?: string }>;
  }) =>
    jsonRequest<{ slug: string }>('/api/topics', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  updateProgress: (
    slug: string,
    payload: { studied?: boolean; bookmarked?: boolean; notes?: string }
  ) =>
    jsonRequest<{ topicSlug: string; studied: boolean; bookmarked: boolean; notes: string }>(
      `/api/topics/${encodeURIComponent(slug)}/progress`,
      {
        method: 'PUT',
        body: JSON.stringify(payload),
      }
    ),

  getSources: (params?: {
    discipline?: string;
    repository?: string;
    sourceType?: string;
    search?: string;
  }) => {
    const sp = new URLSearchParams();
    if (params?.discipline) sp.set('discipline', params.discipline);
    if (params?.repository) sp.set('repository', params.repository);
    if (params?.sourceType) sp.set('sourceType', params.sourceType);
    if (params?.search) sp.set('search', params.search);
    const qs = sp.toString();
    return jsonRequest<SourceItem[]>(`/api/sources${qs ? `?${qs}` : ''}`);
  },

  discoverOnlineSources: (q: string) =>
    jsonRequest<DiscoveredResource[]>(`/api/sources/discover?q=${encodeURIComponent(q)}`),

  addSource: (payload: {
    topicSlug: string;
    title: string;
    author: string;
    year: string;
    repository: string;
    sourceType: string;
    url: string;
    citation: string;
    summary: string;
  }) =>
    jsonRequest<{ id: number; topicSlug: string; title: string; url: string }>('/api/sources', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  deleteSource: (id: number) =>
    jsonRequest<{ deleted: boolean }>(`/api/sources/${id}`, { method: 'DELETE' }),

  getAttachments: (params?: { discipline?: string; kind?: string; search?: string }) => {
    const sp = new URLSearchParams();
    if (params?.discipline) sp.set('discipline', params.discipline);
    if (params?.kind) sp.set('kind', params.kind);
    if (params?.search) sp.set('search', params.search);
    const qs = sp.toString();
    return jsonRequest<AttachmentItem[]>(`/api/attachments${qs ? `?${qs}` : ''}`);
  },

  uploadAttachment: (formData: FormData) =>
    jsonRequest<AttachmentItem>('/api/attachments', {
      method: 'POST',
      body: formData,
    }),

  deleteAttachment: (id: number) =>
    jsonRequest<{ deleted: boolean }>(`/api/attachments/${id}`, { method: 'DELETE' }),

  getGlossary: (params?: { search?: string; language?: string; category?: string }) => {
    const sp = new URLSearchParams();
    if (params?.search) sp.set('search', params.search);
    if (params?.language) sp.set('language', params.language);
    if (params?.category) sp.set('category', params.category);
    const qs = sp.toString();
    return jsonRequest<GlossaryItem[]>(`/api/glossary${qs ? `?${qs}` : ''}`);
  },

  getQuizOverview: () => jsonRequest<QuizOverviewData>('/api/quizzes/overview'),

  generateQuiz: (payload: {
    scope: 'topic' | 'discipline' | 'custom' | 'missed';
    topicSlug?: string;
    disciplineSlug?: string;
    disciplineSlugs?: string[];
    difficulty?: string;
    count?: number;
  }) =>
    jsonRequest<GeneratedQuiz>('/api/quizzes/generate', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  checkQuizAnswer: (questionId: number, selectedIndex: number) =>
    jsonRequest<QuizFeedback>('/api/quizzes/check', {
      method: 'POST',
      body: JSON.stringify({ questionId, selectedIndex }),
    }),

  submitQuiz: (payload: {
    title: string;
    mode: 'study' | 'exam';
    disciplineSlug?: string | null;
    topicSlug?: string | null;
    durationSeconds: number;
    answers: Array<{ questionId: number; selectedIndex: number }>;
  }) =>
    jsonRequest<QuizSubmissionResult>('/api/quizzes/submit', {
      method: 'POST',
      body: JSON.stringify(payload),
    }),

  globalSearch: (q: string) =>
    jsonRequest<{
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
    }>(`/api/search?q=${encodeURIComponent(q)}`),
};
