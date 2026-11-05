import { getDb } from './db.js';
import { ensureSeeded } from './seed.js';
import { createApp } from './app.js';

const PORT = Number(process.env.PORT) || 3001;

async function start() {
  const dbInstance = getDb();
  await ensureSeeded(dbInstance);
  const app = createApp(dbInstance);

  app.listen(PORT, process.env.HOST || '127.0.0.1', () => {
    console.log(`Paideia Theological Library server listening on http://localhost:${PORT}`);
  });
}

start().catch((err) => {
  console.error('Failed to start Paideia server:', err);
  process.exit(1);
});
