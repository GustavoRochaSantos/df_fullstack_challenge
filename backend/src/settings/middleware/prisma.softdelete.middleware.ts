import { Logger } from '@nestjs/common';
const logger = new Logger();

const findMethods = [
  'findFirst',
  'findFirstOrThrow',
  'findMany',
  'findUnique',
  'findUniqueOrThrow',
];
export async function PrismaSoftDeleteMiddleware(params, next) {
  if (findMethods.includes(params.action)) {
    if (!params.args.where) {
      params.args.where = {};
    }
    params.args.where.isDeleted = false;
    logger.log(params);
  }
  const result = await next(params);

  return result;
}
