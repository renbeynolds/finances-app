import dayjs from 'dayjs';

export const isFullMonth = (start: string, end: string): bool => {
  start = dayjs(start);
  end = dayjs(end);
  const startIsFirstOfMonth = start.startOf('month').isSame(start, 'day');
  const endIsLastOfMonth = end.endOf('month').isSame(end, 'day');
  return startIsFirstOfMonth && endIsLastOfMonth;
};
