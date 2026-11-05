import type { DbInstance } from './db.js';
import fs from 'node:fs';
import { ALL_SEED_DISCIPLINES, ALL_SEED_GLOSSARY, ALL_SEED_TOPICS } from './data/index.js';
import { generateSeedAttachmentFile } from './pdfGenerator.js';

export async function ensureSeeded(instance: DbInstance, force = false): Promise<void> {
  const { db, seedFilesDir } = instance;
  await instance.ready;
  fs.mkdirSync(seedFilesDir, { recursive: true });

  const existingTopics = new Set(((await db.prepare('SELECT slug FROM topics').all()) as { slug: string }[]).map(({ slug }) => slug));
  const pending = force ? ALL_SEED_TOPICS : ALL_SEED_TOPICS.filter(({ slug }) => !existingTopics.has(slug));
  if (!pending.length) return;

  await db.transaction(async (transactionDb) => {
    const db = transactionDb;
    const disciplineMap = new Map<string, string>();

    const insertDiscipline = await db.prepare(`
      INSERT INTO disciplines (
        slug, name, greek_title, transliteration, subtitle, description, icon, accent_color, sort_order
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(slug) DO UPDATE SET name = excluded.name, greek_title = excluded.greek_title,
        transliteration = excluded.transliteration, subtitle = excluded.subtitle, description = excluded.description,
        icon = excluded.icon, accent_color = excluded.accent_color, sort_order = excluded.sort_order
    `);

    for (const d of ALL_SEED_DISCIPLINES) {
      await insertDiscipline.run(
        d.slug,
        d.name,
        d.greekTitle,
        d.transliteration,
        d.subtitle,
        d.description,
        d.icon,
        d.accentColor,
        d.sortOrder
      );
      disciplineMap.set(d.slug, d.name);
    }

    const insertGlossary = await db.prepare(`
      INSERT INTO glossary_terms (
        term, original_script, language, transliteration, pronunciation, category, definition, related_topic_slug
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(term) DO UPDATE SET original_script = excluded.original_script,
        language = excluded.language, transliteration = excluded.transliteration,
        pronunciation = excluded.pronunciation, category = excluded.category,
        definition = excluded.definition, related_topic_slug = excluded.related_topic_slug
    `);

    for (const g of ALL_SEED_GLOSSARY) {
      await insertGlossary.run(
        g.term,
        g.originalScript,
        g.language,
        g.transliteration,
        g.pronunciation,
        g.category,
        g.definition,
        g.relatedTopicSlug
      );
    }

    const insertTopic = await db.prepare(`
      INSERT INTO topics (
        slug, discipline_slug, title, subtitle, summary, difficulty, reading_minutes, era,
        scripture_refs_json, sections_json, excerpts_json, perspectives_json, key_terms_json,
        related_topic_slugs_json, is_custom
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
      ON CONFLICT(slug) DO UPDATE SET discipline_slug = excluded.discipline_slug, title = excluded.title,
        subtitle = excluded.subtitle, summary = excluded.summary, difficulty = excluded.difficulty,
        reading_minutes = excluded.reading_minutes, era = excluded.era, scripture_refs_json = excluded.scripture_refs_json,
        sections_json = excluded.sections_json, excerpts_json = excluded.excerpts_json, perspectives_json = excluded.perspectives_json,
        key_terms_json = excluded.key_terms_json, related_topic_slugs_json = excluded.related_topic_slugs_json
      WHERE topics.is_custom = 0
    `);

    const insertSource = await db.prepare(`
      INSERT INTO sources (
        topic_slug, title, author, year, repository, source_type, url, citation, summary, is_custom
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `);

    const insertAttachment = await db.prepare(`
      INSERT INTO attachments (
        topic_slug, source_id, title, description, file_name, stored_path, mime_type,
        file_size, attachment_kind, preview_text, is_custom
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)
    `);

    const insertQuestion = await db.prepare(`
      INSERT INTO quiz_questions (
        topic_slug, discipline_slug, question_type, difficulty, prompt, excerpt_context,
        options_json, correct_index, explanation, source_reference
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    for (const topic of pending) {
      const existing = await db.prepare('SELECT is_custom FROM topics WHERE slug = ?').get(topic.slug);
      if (existing?.is_custom || (existing && !force)) continue;
      // Clean any partial seed rows for this topic
      await db.prepare('DELETE FROM attachments WHERE topic_slug = ? AND is_custom = 0').run(topic.slug);
      await db.prepare('DELETE FROM sources WHERE topic_slug = ? AND is_custom = 0').run(topic.slug);
      await db.prepare('DELETE FROM quiz_questions WHERE topic_slug = ?').run(topic.slug);

      await insertTopic.run(
        topic.slug,
        topic.disciplineSlug,
        topic.title,
        topic.subtitle,
        topic.summary,
        topic.difficulty,
        topic.readingMinutes,
        topic.era,
        JSON.stringify(topic.scriptureRefs),
        JSON.stringify(topic.sections),
        JSON.stringify(topic.excerpts),
        JSON.stringify(topic.perspectives),
        JSON.stringify(topic.keyTerms),
        JSON.stringify(topic.relatedTopicSlugs)
      );

      const insertedSourceIds: number[] = [];
      for (const src of topic.sources) {
        const res = await insertSource.run(
          topic.slug,
          src.title,
          src.author,
          src.year,
          src.repository,
          src.sourceType,
          src.url,
          src.citation,
          src.summary
        );
        insertedSourceIds.push(Number(res.lastInsertRowid));
      }

      const disciplineName = disciplineMap.get(topic.disciplineSlug) || topic.disciplineSlug;

      for (const att of topic.attachments) {
        const linkedSourceId =
          att.linkedSourceIndex !== undefined && insertedSourceIds[att.linkedSourceIndex]
            ? insertedSourceIds[att.linkedSourceIndex]
            : null;
        const linkedSourceTitle =
          att.linkedSourceIndex !== undefined && topic.sources[att.linkedSourceIndex]
            ? topic.sources[att.linkedSourceIndex].title
            : null;

        const generated = await generateSeedAttachmentFile(
          att,
          topic.title,
          disciplineName,
          linkedSourceTitle,
          seedFilesDir
        );

        await insertAttachment.run(
          topic.slug,
          linkedSourceId,
          att.title,
          att.description,
          generated.fileName,
          instance.storage === 'postgres'
            ? `seed-attachments/${generated.fileName}`
            : generated.storedPath,
          generated.mimeType,
          generated.fileSize,
          att.attachmentKind,
          generated.previewText
        );
      }

      for (const q of topic.questions) {
        await insertQuestion.run(
          topic.slug,
          topic.disciplineSlug,
          q.questionType,
          q.difficulty,
          q.prompt,
          q.excerptContext || '',
          JSON.stringify(q.options),
          q.correctIndex,
          q.explanation,
          q.sourceReference
        );
      }
    }
  });
}
