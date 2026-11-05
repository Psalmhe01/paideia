import { getDb } from './db.js';
import { ensureSeeded } from './seed.js';

async function main() {
  const instance = getDb();
  await ensureSeeded(instance, true);
  const topics = instance.db.prepare('SELECT COUNT(*) as c FROM topics').get() as { c: number };
  const sources = instance.db.prepare('SELECT COUNT(*) as c FROM sources').get() as { c: number };
  const attachments = instance.db.prepare('SELECT COUNT(*) as c FROM attachments').get() as { c: number };
  const questions = instance.db.prepare('SELECT COUNT(*) as c FROM quiz_questions').get() as { c: number };
  console.log(
    `Paideia seeded: ${topics.c} topics, ${sources.c} online sources, ${attachments.c} attachments, ${questions.c} quiz questions.`
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
