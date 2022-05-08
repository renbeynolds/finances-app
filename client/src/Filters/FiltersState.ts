import { atom } from 'recoil';
import DateRanges from '../Utils/DateRanges';

const DEFAULT_DATE_RANGE = DateRanges.last365Days();

export const startDateState = atom({
  key: 'startDate',
  default: DEFAULT_DATE_RANGE[0],
});

export const endDateState = atom({
  key: 'endDate',
  default: DEFAULT_DATE_RANGE[1],
});
