import moment from 'moment';

export default {
    yearToDate: () => [moment().subtract(1, 'year'), moment()],
    thisMonth: () => [moment().startOf('month'), moment().endOf('month')],
    lastMonth: () => [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
}