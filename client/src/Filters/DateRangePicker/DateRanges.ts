import moment from 'moment';

type DateRange = [moment.Moment, moment.Moment];

const dateRanges: Record<string, DateRange> = {
  'This Month': [moment().startOf('month'), moment()],
  'Last Month': [
    moment().subtract(1, 'month').startOf('month'),
    moment().subtract(1, 'month').endOf('month'),
  ],
  'Year to Date': [moment().startOf('year'), moment()],
  'Last Year': [
    moment().subtract(1, 'year').startOf('year'),
    moment().subtract(1, 'year').endOf('year'),
  ],
};

export default dateRanges;
