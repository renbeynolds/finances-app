import dayjs from 'dayjs';
import React from 'react';

type DateRange = [dayjs.Dayjs, dayjs.Dayjs];

const dateRanges: { label: React.ReactNode; value: DateRange }[] = [
  {
    label: 'This Month',
    value: [dayjs().startOf('month'), dayjs().endOf('month')],
  },
  {
    label: 'Last Month',
    value: [
      dayjs().subtract(1, 'month').startOf('month'),
      dayjs().subtract(1, 'month').endOf('month'),
    ],
  },
  {
    label: 'Year to Date',
    value: [dayjs().startOf('year'), dayjs()],
  },
  {
    label: 'Last Year',
    value: [
      dayjs().subtract(1, 'year').startOf('year'),
      dayjs().subtract(1, 'year').endOf('year'),
    ],
  },
];

export default dateRanges;
