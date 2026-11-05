import type { Request, Response } from 'express';
import { app } from './_app.js';

export default function handler(req: Request, res: Response): void {
  const requestUrl = new URL(req.url || '/', 'http://paideia.local');
  const originalPath = requestUrl.searchParams.get('__paideia_path');

  if (originalPath) {
    requestUrl.searchParams.delete('__paideia_path');
    const query = requestUrl.searchParams.toString();
    req.url = `${originalPath}${query ? `?${query}` : ''}`;
  }

  app(req, res);
}
