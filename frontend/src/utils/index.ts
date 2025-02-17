import currency from 'currency.js';
import dayjs from 'dayjs';

export const FormatMoney = (amount: number) =>
  currency(amount, { fromCents: true }).format();

export const PreviousNMonths = (dateRange: [string, string], n: number) => {
  return [
    dayjs(dateRange[0]).subtract(n, 'month').format('YYYY-MM-DD'),
    dayjs(dateRange[1]).subtract(1, 'month').format('YYYY-MM-DD'),
  ];
};
