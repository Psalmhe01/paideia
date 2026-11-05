import fs from 'node:fs';
import path from 'node:path';
import { ALL_SEED_DISCIPLINES, ALL_SEED_TOPICS } from './data/index.js';
import { generateSeedAttachmentFile } from './pdfGenerator.js';

const outputDir = path.resolve(process.cwd(), 'public', 'seed-attachments');
const disciplineNames = new Map(ALL_SEED_DISCIPLINES.map((discipline) => [discipline.slug, discipline.name]));

fs.mkdirSync(outputDir, { recursive: true });

for (const topic of ALL_SEED_TOPICS) {
  const disciplineName = disciplineNames.get(topic.disciplineSlug) || topic.disciplineSlug;
  for (const attachment of topic.attachments) {
    const linkedSourceTitle =
      attachment.linkedSourceIndex !== undefined
        ? topic.sources[attachment.linkedSourceIndex]?.title ?? null
        : null;
    await generateSeedAttachmentFile(
      attachment,
      topic.title,
      disciplineName,
      linkedSourceTitle,
      outputDir
    );
  }
}

console.log(`Prepared ${ALL_SEED_TOPICS.reduce((total, topic) => total + topic.attachments.length, 0)} built-in study attachments.`);
