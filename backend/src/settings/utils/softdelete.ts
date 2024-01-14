import * as dayjs from 'dayjs';

export const softDeleteData = {
  isDeleted: true,
  deletedAt: dayjs().toDate(),
  isActive: false,
};
