import * as dayjs from 'dayjs';

export const getAgeFromDate = (birthday: Date) => {
  return dayjs().diff(dayjs(birthday), 'y');
};

export const formatBrDate = (dateString: Date) => {
  const date = new Date(dateString);
  return `${date.toLocaleDateString()} às ${date.toLocaleTimeString()} `;
};

export const formatBrDateWithoutHours = (dateString: Date) => {
  return dayjs(dateString).format('DD/MM/YYYY');
};

export const convertMinutesToTime = (totalMinutes = 0): string => {
  if (!totalMinutes || totalMinutes === 0) return '00:00';

  const hours = parseInt((totalMinutes / 60).toString());
  const minutes = totalMinutes - hours * 60;
  const timeFormatted = `${hours.toString().padStart(2, '0')}:${minutes
    .toString()
    .padStart(2, '0')}`;

  return timeFormatted;
};

export const convertDiferenceBetweenDates = (data: any) => {
  let diff = 0
  diff = dayjs().diff(data, 'hours')
  if (diff < 24) {
    return `${diff} horas atrás`
  }
  diff = dayjs().diff(data, 'days')
  if (diff < 30) {
    return `${diff} dias`
  }

  const newData = dayjs(data)
  return `${newData.date()} ${newData.month()} ${newData.year()}`
}

export const convertDatesFromObject = (data: any) => {
  const prepareData = (item: any) => {
    return {
      ...item,
      createdAt: item.createdAt ? convertDiferenceBetweenDates(item.createdAt) : null,
      updatedAt: item.updatedAt ? formatBrDate(item.updatedAt) : null,
      deletedAt: item.deletedAt ? formatBrDate(item.deletedAt) : null,
    };
  };

  if (data.length) {
    return data.map((item) => prepareData(item));
  }

  if (!Object.keys(data).length) return data;

  return prepareData(data);
};
