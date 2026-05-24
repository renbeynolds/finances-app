import currency from "currency.js";
import dayjs from "dayjs";

export const MoneyInputToCents = (value: string): number => {
  return Math.trunc(Number(value) * 100);
};

export const FormatMoney = (amount: number) =>
  currency(amount, { fromCents: true }).format();

export const FormatMoneyDollars = (amount: number) =>
  currency(amount, { fromCents: true }).format().split(".")[0];

export const FormatMoneyThousands = (amount: number) => `$${amount / 100000}k`;

export const FormatMoneyMillions = (amount: number) =>
  `$${amount / 100000000}m`;

export const FormatMoneyDynamic = (amount: number) => {
  if (amount >= 100000000) return FormatMoneyMillions(amount);
  if (amount >= 100000) return FormatMoneyThousands(amount);
  return FormatMoneyDollars(amount);
};

export const PreviousNMonths = (dateRange: [string, string], n: number) => {
  return [
    dayjs(dateRange[0]).subtract(n, "month").format("YYYY-MM-DD"),
    dayjs(dateRange[1]).subtract(1, "month").format("YYYY-MM-DD"),
  ];
};

export const FormatMonthString = (input: string): string =>
  dayjs(input).format("MMM YY");

export const FormatDayString = (input: string): string =>
  dayjs(input).format("MMM, DD YYYY");

export const MonthStringToTimestamp = (input: string): number =>
  dayjs(input).startOf("month").unix();
