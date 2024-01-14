import { Logger } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

const logger = new Logger();

export async function NestJSLogMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  if (req.url.indexOf('logs') !== -1 || process.env.API_LOG !== 'true') {
    next();
    return;
  }

  const record = {
    date: new Date(),
    method: req.method,
    endpoint: req.url,
    query: JSON.stringify(req.query),
    params: JSON.stringify(req.params),
    body: JSON.stringify(req.body) || '{}',
  }

  if (process.env.ENV === 'dev') logger.debug('NESTJS', record);
  next();
}
