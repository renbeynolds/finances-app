import dayjs from 'dayjs';

type DateRange = [dayjs.Dayjs, dayjs.Dayjs];

const dateRanges: Record<string, DateRange> = {
  'This Month': [dayjs().startOf('month'), dayjs()],
  'Last Month': [
    dayjs().subtract(1, 'month').startOf('month'),
    dayjs().subtract(1, 'month').endOf('month'),
  ],
  'Year to Date': [dayjs().startOf('year'), dayjs()],
  'Last Year': [
    dayjs().subtract(1, 'year').startOf('year'),
    dayjs().subtract(1, 'year').endOf('year'),
  ],
};

export default dateRanges;
