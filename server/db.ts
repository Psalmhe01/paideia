import { Pool } from '@neondatabase/serverless';
import { DatabaseSync } from 'node:sqlite';
import fs from 'node:fs';
import path from 'node:path';

export interface PreparedStatement {
  get(...params: unknown[]): any;
  all(...params: unknown[]): any;
  run(...params: unknown[]): any;
}

export interface DatabaseHandle {
  prepare(sql: string): PreparedStatement;
  exec(sql: string): Promise<void> | void;
  transaction<T>(callback: (transactionDb: DatabaseHandle) => Promise<T>): Promise<T>;
  close(): void | Promise<void>;
}

export interface DbInstance {
  db: DatabaseHandle;
  dataDir: string;
  uploadsDir: string;
  seedFilesDir: string;
  ready: Promise<void>;
  storage: 'sqlite' | 'postgres';
}

const POSTGRES_SCHEMA = `
CREATE TABLE IF NOT EXISTS disciplines (
  slug TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  greek_title TEXT NOT NULL,
  transliteration TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  accent_color TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0
);
CREATE TABLE IF NOT EXISTS topics (
  id BIGSERIAL PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  discipline_slug TEXT NOT NULL REFERENCES disciplines(slug) ON DELETE CASCADE,
  title TEXT NOT NULL,
  subtitle TEXT NOT NULL,
  summary TEXT NOT NULL,
  difficulty TEXT NOT NULL DEFAULT 'Foundational',
  reading_minutes INTEGER NOT NULL DEFAULT 10,
  era TEXT NOT NULL DEFAULT '',
  scripture_refs_json TEXT NOT NULL DEFAULT '[]',
  sections_json TEXT NOT NULL DEFAULT '[]',
  excerpts_json TEXT NOT NULL DEFAULT '[]',
  perspectives_json TEXT NOT NULL DEFAULT '[]',
  key_terms_json TEXT NOT NULL DEFAULT '[]',
  related_topic_slugs_json TEXT NOT NULL DEFAULT '[]',
  is_custom INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD HH24:MI:SS')
);
CREATE TABLE IF NOT EXISTS sources (
  id BIGSERIAL PRIMARY KEY,
  topic_slug TEXT NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  year TEXT NOT NULL DEFAULT '',
  repository TEXT NOT NULL DEFAULT 'User Contributed',
  source_type TEXT NOT NULL DEFAULT 'Primary Text',
  url TEXT NOT NULL,
  citation TEXT NOT NULL DEFAULT '',
  summary TEXT NOT NULL DEFAULT '',
  is_custom INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD HH24:MI:SS')
);
CREATE TABLE IF NOT EXISTS attachments (
  id BIGSERIAL PRIMARY KEY,
  topic_slug TEXT NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  source_id BIGINT REFERENCES sources(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  file_name TEXT NOT NULL,
  stored_path TEXT NOT NULL,
  mime_type TEXT NOT NULL,
  file_size BIGINT NOT NULL DEFAULT 0,
  attachment_kind TEXT NOT NULL DEFAULT 'Uploaded Document',
  preview_text TEXT NOT NULL DEFAULT '',
  is_custom INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD HH24:MI:SS')
);
CREATE TABLE IF NOT EXISTS quiz_questions (
  id BIGSERIAL PRIMARY KEY,
  topic_slug TEXT NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
  discipline_slug TEXT NOT NULL REFERENCES disciplines(slug) ON DELETE CASCADE,
  question_type TEXT NOT NULL DEFAULT 'multiple_choice',
  difficulty TEXT NOT NULL DEFAULT 'Foundational',
  prompt TEXT NOT NULL,
  excerpt_context TEXT NOT NULL DEFAULT '',
  options_json TEXT NOT NULL,
  correct_index INTEGER NOT NULL,
  explanation TEXT NOT NULL,
  source_reference TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS glossary_terms (
  id BIGSERIAL PRIMARY KEY,
  term TEXT NOT NULL UNIQUE,
  original_script TEXT NOT NULL,
  language TEXT NOT NULL,
  transliteration TEXT NOT NULL,
  pronunciation TEXT NOT NULL,
  category TEXT NOT NULL,
  definition TEXT NOT NULL,
  related_topic_slug TEXT NOT NULL DEFAULT ''
);
CREATE TABLE IF NOT EXISTS topic_progress (
  topic_slug TEXT PRIMARY KEY REFERENCES topics(slug) ON DELETE CASCADE,
  studied INTEGER NOT NULL DEFAULT 0,
  bookmarked INTEGER NOT NULL DEFAULT 0,
  notes TEXT NOT NULL DEFAULT '',
  last_studied_at TEXT NOT NULL DEFAULT to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD HH24:MI:SS')
);
CREATE TABLE IF NOT EXISTS quiz_attempts (
  id BIGSERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  mode TEXT NOT NULL DEFAULT 'study',
  discipline_slug TEXT,
  topic_slug TEXT,
  score INTEGER NOT NULL,
  total_questions INTEGER NOT NULL,
  percentage DOUBLE PRECISION NOT NULL,
  duration_seconds INTEGER NOT NULL DEFAULT 0,
  details_json TEXT NOT NULL DEFAULT '[]',
  created_at TEXT NOT NULL DEFAULT to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD HH24:MI:SS')
);
CREATE TABLE IF NOT EXISTS missed_questions (
  question_id BIGINT PRIMARY KEY REFERENCES quiz_questions(id) ON DELETE CASCADE,
  miss_count INTEGER NOT NULL DEFAULT 1,
  last_missed_at TEXT NOT NULL DEFAULT to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD HH24:MI:SS')
);
CREATE INDEX IF NOT EXISTS idx_topics_discipline ON topics(discipline_slug);
CREATE INDEX IF NOT EXISTS idx_sources_topic ON sources(topic_slug);
CREATE INDEX IF NOT EXISTS idx_attachments_topic ON attachments(topic_slug);
CREATE INDEX IF NOT EXISTS idx_attachments_source ON attachments(source_id);
CREATE INDEX IF NOT EXISTS idx_questions_topic ON quiz_questions(topic_slug);
CREATE INDEX IF NOT EXISTS idx_questions_discipline ON quiz_questions(discipline_slug);
`;

function toPostgresSql(sql: string): string {
  let placeholder = 0;
  let output = '';
  let singleQuoted = false;
  let doubleQuoted = false;

  for (let index = 0; index < sql.length; index += 1) {
    const char = sql[index];
    const next = sql[index + 1];

    if (singleQuoted) {
      output += char;
      if (char === "'" && next === "'") {
        output += next;
        index += 1;
      } else if (char === "'") {
        singleQuoted = false;
      }
      continue;
    }

    if (doubleQuoted) {
      output += char;
      if (char === '"' && next === '"') {
        output += next;
        index += 1;
      } else if (char === '"') {
        doubleQuoted = false;
      }
      continue;
    }

    if (char === "'") singleQuoted = true;
    if (char === '"') doubleQuoted = true;
    if (char === '?') {
      placeholder += 1;
      output += `$${placeholder}`;
    } else {
      output += char;
    }
  }

  return output
    .replace(/\bdatetime\('now'\)/gi, "to_char((now() AT TIME ZONE 'UTC'), 'YYYY-MM-DD HH24:MI:SS')")
    .replace(/\bLIKE\b/gi, 'ILIKE')
    .replace(/\bAS\s+([a-z_][a-z0-9_]*[A-Z][A-Za-z0-9_]*)\b/g, 'AS "$1"');
}

type PostgresResult = {
  rows: Array<Record<string, unknown>>;
  fields: Array<{ name: string; dataTypeID: number }>;
  rowCount: number | null;
};

type PostgresConnection = {
  query(sql: string, params?: unknown[]): Promise<PostgresResult>;
  release?: () => void;
};

function normalizePostgresRows(result: PostgresResult): Record<string, unknown>[] {
  const numericTypes = new Set([20, 21, 23, 700, 701, 1700]);
  return result.rows.map((row) => {
    const normalized = { ...row } as Record<string, unknown>;
    for (const field of result.fields) {
      const value = normalized[field.name];
      if (numericTypes.has(field.dataTypeID) && typeof value === 'string') {
        const parsed = Number(value);
        if (Number.isFinite(parsed)) normalized[field.name] = parsed;
      }
    }
    return normalized;
  });
}

function withReturningId(sql: string): string {
  if (/\bRETURNING\b/i.test(sql)) return sql;
  const table = sql.match(/^\s*INSERT\s+INTO\s+([a-z_]+)/i)?.[1]?.toLowerCase();
  if (!table || !['topics', 'sources', 'attachments', 'quiz_questions', 'glossary_terms', 'quiz_attempts'].includes(table)) {
    return sql;
  }
  return `${sql.trim().replace(/;$/, '')} RETURNING id`;
}

class PostgresDatabase implements DatabaseHandle {
  constructor(
    private readonly pool: Pool,
    private readonly client?: PostgresConnection
  ) {}

  prepare(sql: string): PreparedStatement {
    const normalized = toPostgresSql(sql);
    const query = withReturningId(normalized);
    const execute = async (params: unknown[]) => {
      const connection = (this.client || this.pool) as unknown as PostgresConnection;
      return connection.query(query, params);
    };

    return {
      get: async (...params) => {
        const result = await execute(params);
        return normalizePostgresRows(result)[0];
      },
      all: async (...params) => {
        const result = await execute(params);
        return normalizePostgresRows(result);
      },
      run: async (...params) => {
        const result = await execute(params);
        const id = normalizePostgresRows(result)[0]?.id;
        return {
          lastInsertRowid: id === undefined ? undefined : Number(id),
          changes: result.rowCount ?? 0,
        };
      },
    };
  }

  async exec(sql: string): Promise<void> {
    await (this.client || this.pool).query(sql);
  }

  async close(): Promise<void> {
    if (!this.client) await this.pool.end();
  }

  async transaction<T>(callback: (transactionDb: DatabaseHandle) => Promise<T>): Promise<T> {
    const client = await this.pool.connect() as unknown as PostgresConnection;
    try {
      await client.query('BEGIN');
      const result = await callback(new PostgresDatabase(this.pool, client));
      await client.query('COMMIT');
      return result;
    } catch (error) {
      await client.query('ROLLBACK');
      throw error;
    } finally {
      client.release?.();
    }
  }
}

let defaultInstance: DbInstance | null = null;
let remotePool: Pool | null = null;

function createSqliteDatabase(customDataDir?: string): DbInstance {
  const dataDir = customDataDir || path.resolve(process.cwd(), 'data');
  const uploadsDir = path.join(dataDir, 'uploads');
  const seedFilesDir = path.join(dataDir, 'seed-attachments');

  fs.mkdirSync(dataDir, { recursive: true });
  fs.mkdirSync(uploadsDir, { recursive: true });
  fs.mkdirSync(seedFilesDir, { recursive: true });

  const nativeDb = new DatabaseSync(path.join(dataDir, 'paideia.db'));
  nativeDb.exec('PRAGMA journal_mode = WAL;');
  nativeDb.exec('PRAGMA foreign_keys = ON;');
  nativeDb.exec(`
    CREATE TABLE IF NOT EXISTS disciplines (
      slug TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      greek_title TEXT NOT NULL,
      transliteration TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      description TEXT NOT NULL,
      icon TEXT NOT NULL,
      accent_color TEXT NOT NULL,
      sort_order INTEGER NOT NULL DEFAULT 0
    );
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT NOT NULL UNIQUE,
      discipline_slug TEXT NOT NULL REFERENCES disciplines(slug) ON DELETE CASCADE,
      title TEXT NOT NULL,
      subtitle TEXT NOT NULL,
      summary TEXT NOT NULL,
      difficulty TEXT NOT NULL DEFAULT 'Foundational',
      reading_minutes INTEGER NOT NULL DEFAULT 10,
      era TEXT NOT NULL DEFAULT '',
      scripture_refs_json TEXT NOT NULL DEFAULT '[]',
      sections_json TEXT NOT NULL DEFAULT '[]',
      excerpts_json TEXT NOT NULL DEFAULT '[]',
      perspectives_json TEXT NOT NULL DEFAULT '[]',
      key_terms_json TEXT NOT NULL DEFAULT '[]',
      related_topic_slugs_json TEXT NOT NULL DEFAULT '[]',
      is_custom INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS sources (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_slug TEXT NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
      title TEXT NOT NULL,
      author TEXT NOT NULL,
      year TEXT NOT NULL DEFAULT '',
      repository TEXT NOT NULL DEFAULT 'User Contributed',
      source_type TEXT NOT NULL DEFAULT 'Primary Text',
      url TEXT NOT NULL,
      citation TEXT NOT NULL DEFAULT '',
      summary TEXT NOT NULL DEFAULT '',
      is_custom INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_slug TEXT NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
      source_id INTEGER REFERENCES sources(id) ON DELETE SET NULL,
      title TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      file_name TEXT NOT NULL,
      stored_path TEXT NOT NULL,
      mime_type TEXT NOT NULL,
      file_size INTEGER NOT NULL DEFAULT 0,
      attachment_kind TEXT NOT NULL DEFAULT 'Uploaded Document',
      preview_text TEXT NOT NULL DEFAULT '',
      is_custom INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS quiz_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      topic_slug TEXT NOT NULL REFERENCES topics(slug) ON DELETE CASCADE,
      discipline_slug TEXT NOT NULL REFERENCES disciplines(slug) ON DELETE CASCADE,
      question_type TEXT NOT NULL DEFAULT 'multiple_choice',
      difficulty TEXT NOT NULL DEFAULT 'Foundational',
      prompt TEXT NOT NULL,
      excerpt_context TEXT NOT NULL DEFAULT '',
      options_json TEXT NOT NULL,
      correct_index INTEGER NOT NULL,
      explanation TEXT NOT NULL,
      source_reference TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS glossary_terms (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      term TEXT NOT NULL UNIQUE,
      original_script TEXT NOT NULL,
      language TEXT NOT NULL,
      transliteration TEXT NOT NULL,
      pronunciation TEXT NOT NULL,
      category TEXT NOT NULL,
      definition TEXT NOT NULL,
      related_topic_slug TEXT NOT NULL DEFAULT ''
    );
    CREATE TABLE IF NOT EXISTS topic_progress (
      topic_slug TEXT PRIMARY KEY REFERENCES topics(slug) ON DELETE CASCADE,
      studied INTEGER NOT NULL DEFAULT 0,
      bookmarked INTEGER NOT NULL DEFAULT 0,
      notes TEXT NOT NULL DEFAULT '',
      last_studied_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS quiz_attempts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      mode TEXT NOT NULL DEFAULT 'study',
      discipline_slug TEXT,
      topic_slug TEXT,
      score INTEGER NOT NULL,
      total_questions INTEGER NOT NULL,
      percentage REAL NOT NULL,
      duration_seconds INTEGER NOT NULL DEFAULT 0,
      details_json TEXT NOT NULL DEFAULT '[]',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE TABLE IF NOT EXISTS missed_questions (
      question_id INTEGER PRIMARY KEY REFERENCES quiz_questions(id) ON DELETE CASCADE,
      miss_count INTEGER NOT NULL DEFAULT 1,
      last_missed_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
    CREATE INDEX IF NOT EXISTS idx_topics_discipline ON topics(discipline_slug);
    CREATE INDEX IF NOT EXISTS idx_sources_topic ON sources(topic_slug);
    CREATE INDEX IF NOT EXISTS idx_attachments_topic ON attachments(topic_slug);
    CREATE INDEX IF NOT EXISTS idx_attachments_source ON attachments(source_id);
    CREATE INDEX IF NOT EXISTS idx_questions_topic ON quiz_questions(topic_slug);
    CREATE INDEX IF NOT EXISTS idx_questions_discipline ON quiz_questions(discipline_slug);
  `);

  const db: DatabaseHandle = {
    prepare: (sql) => nativeDb.prepare(sql) as unknown as PreparedStatement,
    exec: (sql) => nativeDb.exec(sql),
    close: () => nativeDb.close(),
    transaction: async (callback) => {
      nativeDb.exec('BEGIN IMMEDIATE');
      try {
        const result = await callback(db);
        nativeDb.exec('COMMIT');
        return result;
      } catch (error) {
        nativeDb.exec('ROLLBACK');
        throw error;
      }
    },
  };

  return {
    db,
    dataDir,
    uploadsDir,
    seedFilesDir,
    ready: Promise.resolve(),
    storage: 'sqlite',
  };
}

function createPostgresDatabase(): DbInstance {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error('DATABASE_URL is required for the Vercel deployment. Connect a Neon Postgres database and redeploy.');
  }

  remotePool ??= new Pool({ connectionString, max: 1 });
  const db = new PostgresDatabase(remotePool);
  const dataDir = path.resolve(process.cwd(), 'data');
  const uploadsDir = path.join(dataDir, 'uploads');
  const seedFilesDir = path.resolve(process.cwd(), 'public', 'seed-attachments');

  return {
    db,
    dataDir,
    uploadsDir,
    seedFilesDir,
    ready: (async () => {
      for (const statement of POSTGRES_SCHEMA.split(/;\s*(?:\r?\n|$)/).map((item) => item.trim()).filter(Boolean)) {
        await db.exec(statement);
      }
    })(),
    storage: 'postgres',
  };
}

export function createDatabase(customDataDir?: string): DbInstance {
  if (process.env.VERCEL && !process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL is required on Vercel. Connect a Neon Postgres database, then redeploy.');
  }
  return process.env.DATABASE_URL ? createPostgresDatabase() : createSqliteDatabase(customDataDir);
}

export function getDb(): DbInstance {
  if (!defaultInstance) {
    defaultInstance = createDatabase(process.env.PAIDEIA_DATA_DIR);
  }
  return defaultInstance;
}
