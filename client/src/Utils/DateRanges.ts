import moment from 'moment';

export default {
  last30Days: () => [moment().subtract(30, 'days'), moment()],
  last365Days: () => [moment().subtract(1, 'year'), moment()],
  thisMonth: () => [moment().startOf('month'), moment()],
  lastMonth: () => [
    moment().subtract(1, 'month').startOf('month'),
    moment().subtract(1, 'month').endOf('month'),
  ],
};
