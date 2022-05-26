import { atom } from 'recoil';
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
