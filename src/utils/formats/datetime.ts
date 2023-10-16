import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import isoWeek from 'dayjs/plugin/isoWeek';
import isDate from 'lodash/isDate';

dayjs.locale('ja');
dayjs.extend(isoWeek);

export const changeLocale = (locale: string): void => {
  dayjs.locale(locale);
};
export const toLocalStringTime = (date: Date): string => {
  return dayjs(date).format('YYYY-MM-DD HH:mm:ss');
};

export const formatDate = (
  date: Date | string | number,
  defaultFormat = '',
) => {
  if (!date) {
    return '';
  }
  return `${dayjs(date).format(defaultFormat)}`;
};

export const getReservationDays = () => {
  let dateArray = [];
  let currentDate = dayjs();
  let stopDate = dayjs().add(1, 'year');
  while (currentDate <= stopDate) {
    dateArray.push({
      label: dayjs(currentDate).format('YYYY年MM月DD日'),
      value: currentDate,
    });
    currentDate = dayjs(currentDate).add(1, 'days');
  }
  return dateArray;
};

export const getReservationHours = () => {
  let dateArray = [];
  for (let i = 0; i < 24; i += 1) {
    dateArray.push({
      label: `${i}`,
      value: i,
    });
  }
  return dateArray;
};

export const getReservationMinutes = () => {
  let dateArray = [
    {label: '00', value: 0},
    {label: '15', value: 15},
    {label: '30', value: 30},
    {label: '45', value: 45},
  ];
  return dateArray;
};

export const isSameDay = (a: Date, b: Date) => {
  if (isDate(a) && isDate(b)) {
    return (
      a?.getFullYear() === b?.getFullYear() &&
      a?.getMonth() === b?.getMonth() &&
      a?.getDate() === b?.getDate()
    );
  }
  return false;
};

export const compareMonth = (a: Date, b: Date) => {
  return dayjs(a).isSame(b, 'month');
};

export const formatTimeReservation = (date: any) => {
  return dayjs()
    .set('hour', date?.hour)
    .set('minute', date?.minute)
    .format('HH:mm');
};

export const getISOWeekday = (date: Date | string | number) => {
  return dayjs(date).isoWeekday();
};
