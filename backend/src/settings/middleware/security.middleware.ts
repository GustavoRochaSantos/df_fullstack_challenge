import { NextFunction, Request, Response } from 'express';

export async function NestJSLogMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  //res.setHeader('Access-Control-Allow-Credentials', 'true');

  next();
}
