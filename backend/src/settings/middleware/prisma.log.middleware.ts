import { Logger } from '@nestjs/common';
import prisma from '../database/prismaService';
import { log } from 'console';
const logger = new Logger();

const RequestWithoutLogs = ['ApiLog', 'PrismaLog'];

export async function PrismaLogMiddleware(params, next) {
  if (
    RequestWithoutLogs.includes(params.model) ||
    process.env.API_LOG !== 'true'
  ) {
    const result = await next(params);
    return result;
  }

  const record = {
    date: new Date(),
    model: params.model,
    action: params.action,
    args: JSON.stringify(params.args) || '{}',
  }

  if (process.env.ENV === 'dev') logger.debug('PRISMA LOG', record);

  const result = await next(params);

  return result;
}
