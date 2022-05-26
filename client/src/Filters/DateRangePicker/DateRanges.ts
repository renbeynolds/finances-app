import moment from 'moment';

type DateRange = [moment.Moment, moment.Moment];

const dateRanges: Record<string, DateRange> = {
  'This Month': [moment().startOf('month'), moment().endOf('month')],
  'Last Month': [
    moment().subtract(1, 'month').startOf('month'),
    moment().subtract(1, 'month').endOf('month'),
  ],
  'Last 30 Days': [
    moment().subtract(30, 'days').startOf('day'),
    moment().endOf('day'),
  ],
  'Last 365 Days': [
    moment().subtract(1, 'year').startOf('day'),
    moment().endOf('day'),
  ],
};

export default dateRanges;
