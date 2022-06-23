import moment from 'moment';
import { atom, selector } from 'recoil';
import DateRanges from './DateRangePicker/DateRanges';

export const DEFAULT_DATE_RANGE_NAME = 'This Month';

const DEFAULT_DATE_RANGE = DateRanges[DEFAULT_DATE_RANGE_NAME];

export const DATE_FILTER_FORMAT = 'YYYY-MM-DD';

export const startDateFilterAtom = atom<string>({
  key: 'startDateFilter',
  default: DEFAULT_DATE_RANGE[0].format(DATE_FILTER_FORMAT),
});

export const endDateFilterAtom = atom<string>({
  key: 'endDateFilter',
  default: DEFAULT_DATE_RANGE[1].format(DATE_FILTER_FORMAT),
});

export const startDateFilterPreviousAtom = selector<string>({
  key: 'startDateFilterPrevious',
  get: ({ get }) => {
    const startDate = moment(get(startDateFilterAtom));
    const endDate = moment(get(endDateFilterAtom));
    const daysBetween = endDate.diff(startDate, 'days');
    return startDate
      .subtract(daysBetween + 1, 'days')
      .format(DATE_FILTER_FORMAT);
  },
});

export const endDateFilterPreviousAtom = selector<string>({
  key: 'endDateFilterPrevious',
  get: ({ get }) => {
    const startDate = moment(get(startDateFilterAtom));
    const endDate = moment(get(endDateFilterAtom));
    const daysBetween = endDate.diff(startDate, 'days');
    return endDate.subtract(daysBetween + 1, 'days').format(DATE_FILTER_FORMAT);
  },
});
