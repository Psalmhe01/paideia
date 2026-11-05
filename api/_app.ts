import { createApp } from '../server/app.js';
import { getDb } from '../server/db.js';

export const app = createApp(getDb());
