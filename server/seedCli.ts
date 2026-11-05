import { getDb } from './db.js';
import { ensureSeeded } from './seed.js';

async function main() {
  const instance = getDb();
  await ensureSeeded(instance, true);
  const topics = await instance.db.prepare('SELECT COUNT(*) as c FROM topics').get() as { c: number };
  const sources = await instance.db.prepare('SELECT COUNT(*) as c FROM sources').get() as { c: number };
  const attachments = await instance.db.prepare('SELECT COUNT(*) as c FROM attachments').get() as { c: number };
  const questions = await instance.db.prepare('SELECT COUNT(*) as c FROM quiz_questions').get() as { c: number };
  console.log(
    `Paideia seeded: ${topics.c} topics, ${sources.c} online sources, ${attachments.c} attachments, ${questions.c} quiz questions.`
  );
  await instance.db.close?.();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
