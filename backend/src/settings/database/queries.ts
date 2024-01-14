export interface PaginatedResult<T> {
  data: T[];
  meta: {
    total: number;
    lastPage: number;
    currentPage: number;
    perPage: number;
    prev: number | null;
    next: number | null;
  };
}

export type PaginateOptions = {
  page?: number | string;
  perPage?: number | string;
  customData?: (data: any[]) => void;
  removeUnusedFields?: string[];
};

export type PaginateFunction = <T, K>(
  model: any,
  args?: K,
  options?: PaginateOptions,
) => Promise<PaginatedResult<T>>;

export const paginator = (
  defaultOptions: PaginateOptions,
): PaginateFunction => {
  return async (
    model,
    args: any = { where: undefined, select: undefined },
    options,
  ) => {
    const page = Number(options?.page || defaultOptions?.page) || 1;
    const perPage = Number(options?.perPage || defaultOptions?.perPage) || 10;
    const customData = options?.customData;

    const skip = page > 0 ? perPage * (page - 1) : 0;
    const [total, data] = await Promise.all([
      model.count({ where: args.where }),
      model.findMany({
        ...args,
        take: perPage,
        skip,
      }),
    ]);
    const lastPage = Math.ceil(total / perPage);

    let parsedData = data;

    if (options.removeUnusedFields?.length > 0) {
      parsedData = parsedData.map((record) =>
        excludeFields(record, options.removeUnusedFields),
      );
    }

    return {
      data: customData ? customData(parsedData) : parsedData,
      meta: {
        total,
        lastPage,
        currentPage: page,
        perPage,
        prev: page > 1 ? page - 1 : null,
        next: page < lastPage ? page + 1 : null,
      },
    };
  };
};

export const paginate: PaginateFunction = paginator({});

export function excludeFields(record: any, keys: string[]) {
  for (const key of keys) {
    delete record[key];
  }
  return record;
}

export const whereBuilder = (props: any) => {
  const { queries, ...rest } = props;
  const whereArgs = Object.entries(rest).map(([key, value]) => {
    if (value !== null) {
      if (key.indexOf('.') !== -1) {
        const filterByRelation = key.split('.');
        return {
          [filterByRelation[0]]: {
            [filterByRelation[1]]: { contains: value, mode: 'insensitive' },
          },
        };
      }
      switch (key) {
        case 'isActive':
          return { [key]: value === 'true' ? true : false };
        default:
          return { [key]: { contains: value, mode: 'insensitive' } };
      }
    }
  });

  let whereParsed = whereArgs;
  if (queries) {
    const queriesArray = JSON.parse(queries);
    whereParsed = whereArgs.concat(queriesArray);
  }

  return { AND: whereParsed };
};

export const sortBuilder = (sortField: string, sortOrder: string) => {
  const sortByRelation = sortField.split(',');

  if (sortByRelation.length === 2) {
    return { [sortByRelation[0]]: { [sortByRelation[1]]: sortOrder } };
  } else {
    return { [sortField]: sortOrder };
  }
};
