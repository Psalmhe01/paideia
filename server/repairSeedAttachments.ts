import { getDb } from './db.js';
import fs from 'node:fs';
import { ALL_SEED_DISCIPLINES, ALL_SEED_TOPICS } from './data/index.js';
import { generateSeedAttachmentFile } from './pdfGenerator.js';

async function main() {
  const instance = getDb();

  try {
    await instance.ready;
    fs.mkdirSync(instance.seedFilesDir, { recursive: true });

    const disciplineNames = new Map(ALL_SEED_DISCIPLINES.map((discipline) => [discipline.slug, discipline.name]));
    const generatedRows: Array<{
      topicSlug: string;
      sourceTitle: string | null;
      title: string;
      description: string;
      fileName: string;
      storedPath: string;
      mimeType: string;
      fileSize: number;
      attachmentKind: string;
      previewText: string;
    }> = [];

    for (const topic of ALL_SEED_TOPICS) {
      const disciplineName = disciplineNames.get(topic.disciplineSlug) || topic.disciplineSlug;

      for (const spec of topic.attachments) {
        const sourceTitle = spec.linkedSourceIndex === undefined
          ? null
          : topic.sources[spec.linkedSourceIndex]?.title ?? null;
        const generated = await generateSeedAttachmentFile(
          spec,
          topic.title,
          disciplineName,
          sourceTitle,
          instance.seedFilesDir
        );

        generatedRows.push({
          topicSlug: topic.slug,
          sourceTitle,
          title: spec.title,
          description: spec.description,
          fileName: generated.fileName,
          storedPath: instance.storage === 'postgres'
            ? `seed-attachments/${generated.fileName}`
            : generated.storedPath,
          mimeType: generated.mimeType,
          fileSize: generated.fileSize,
          attachmentKind: spec.attachmentKind,
          previewText: generated.previewText,
        });
      }
    }

    let updated = 0;
    let inserted = 0;

    await instance.db.transaction(async (db) => {
      const findSource = await db.prepare(
        `SELECT id FROM sources
         WHERE topic_slug = ? AND title = ? AND is_custom = 0
         ORDER BY id ASC LIMIT 1`
      );
      const findAttachment = await db.prepare(
        `SELECT id FROM attachments
         WHERE topic_slug = ? AND title = ? AND is_custom = 0
         ORDER BY id ASC LIMIT 1`
      );
      const updateAttachment = await db.prepare(
        `UPDATE attachments SET
          source_id = ?, description = ?, file_name = ?, stored_path = ?, mime_type = ?,
          file_size = ?, attachment_kind = ?, preview_text = ?
         WHERE id = ?`
      );
      const insertAttachment = await db.prepare(
        `INSERT INTO attachments (
          topic_slug, source_id, title, description, file_name, stored_path, mime_type,
          file_size, attachment_kind, preview_text, is_custom
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)`
      );

      for (const row of generatedRows) {
        const source = row.sourceTitle
          ? await findSource.get(row.topicSlug, row.sourceTitle) as { id: number } | undefined
          : undefined;
        const existing = await findAttachment.get(row.topicSlug, row.title) as { id: number } | undefined;
        const values = [
          source?.id ?? null,
          row.description,
          row.fileName,
          row.storedPath,
          row.mimeType,
          row.fileSize,
          row.attachmentKind,
          row.previewText,
        ];

        if (existing) {
          await updateAttachment.run(...values, existing.id);
          updated += 1;
        } else {
          await insertAttachment.run(
            row.topicSlug,
            source?.id ?? null,
            row.title,
            row.description,
            row.fileName,
            row.storedPath,
            row.mimeType,
            row.fileSize,
            row.attachmentKind,
            row.previewText
          );
          inserted += 1;
        }
      }
    });

    console.log(`Repaired built-in attachments: ${updated} updated, ${inserted} inserted.`);
  } finally {
    await instance.db.close?.();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
