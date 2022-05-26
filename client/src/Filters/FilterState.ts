import { atom } from 'recoil';
import DateRanges from '../Utils/DateRanges';

const DEFAULT_DATE_RANGE = DateRanges.last30Days();

export const startDateFilterAtom = atom<moment.Moment>({
  key: 'startDateFilter',
  default: DEFAULT_DATE_RANGE[0],
});

export const endDateFilterAtom = atom<moment.Moment>({
  key: 'endDateFilter',
  default: DEFAULT_DATE_RANGE[1],
});
