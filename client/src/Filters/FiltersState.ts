import { atom } from 'recoil';
import DateRanges from '../Utils/DateRanges';

const DEFAULT_DATE_RANGE = DateRanges.last30Days();

export const startDateState = atom({
  key: 'startDate',
  default: DEFAULT_DATE_RANGE[0],
});

export const endDateState = atom({
  key: 'endDate',
  default: DEFAULT_DATE_RANGE[1],
});

export const tagFilter = atom<number | null>({
  key: 'tagFilter',
  default: null,
});
