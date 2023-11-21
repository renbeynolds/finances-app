import dayjs from 'dayjs';
import _ from 'lodash';
import { atom, selector } from 'recoil';
import DateRanges from './DateRangePicker/DateRanges';
import { isFullMonth } from '../Utils/DateUtils';

export const DEFAULT_DATE_RANGE_NAME = 'This Month';

const DEFAULT_DATE_RANGE = _.find(DateRanges, {
  label: DEFAULT_DATE_RANGE_NAME,
});

export const DATE_FILTER_FORMAT = 'YYYY-MM-DD';

export const startDateFilterAtom = atom<string>({
  key: 'startDateFilter',
  default: DEFAULT_DATE_RANGE!.value[0].format(DATE_FILTER_FORMAT),
});

export const endDateFilterAtom = atom<string>({
  key: 'endDateFilter',
  default: DEFAULT_DATE_RANGE!.value[1].format(DATE_FILTER_FORMAT),
});

export const startDateFilterPreviousAtom = selector<string>({
  key: 'startDateFilterPrevious',
  get: ({ get }) => {
    const startDateFilter = get(startDateFilterAtom);
    const endDateFilter = get(endDateFilterAtom);
    const startDate = dayjs(startDateFilter);
    const endDate = dayjs(endDateFilter);

    if (isFullMonth(startDateFilter, endDateFilter)) {
      return startDate
        .subtract(15, 'day')
        .startOf('month')
        .format(DATE_FILTER_FORMAT)
    }

    const daysBetween = endDate.diff(startDate, 'days');
    return startDate
      .subtract(daysBetween + 1, 'days')
      .format(DATE_FILTER_FORMAT);
  },
});

export const endDateFilterPreviousAtom = selector<string>({
  key: 'endDateFilterPrevious',
  get: ({ get }) => {
    const startDateFilter = get(startDateFilterAtom);
    const endDateFilter = get(endDateFilterAtom);
    const startDate = dayjs(startDateFilter);
    const endDate = dayjs(endDateFilter);

    if (isFullMonth(startDateFilter, endDateFilter)) {
      return startDate
        .subtract(15, 'day')
        .endOf('month')
        .format(DATE_FILTER_FORMAT)
    }

    const daysBetween = endDate.diff(startDate, 'days');
    return endDate
      .subtract(daysBetween + 1, 'days')
      .format(DATE_FILTER_FORMAT);
  },
});
