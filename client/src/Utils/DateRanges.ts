import moment, { Moment } from 'moment';

type DateRange = [Moment, Moment];

export default {
  last30Days: (): DateRange => [moment().subtract(30, 'days'), moment()],
  last365Days: (): DateRange => [moment().subtract(1, 'year'), moment()],
  thisMonth: (): DateRange => [
    moment().startOf('month'),
    moment().endOf('month'),
  ],
  lastMonth: (): DateRange => [
    moment().subtract(1, 'month').startOf('month'),
    moment().subtract(1, 'month').endOf('month'),
  ],
};
