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
