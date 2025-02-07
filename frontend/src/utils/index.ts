import currency from 'currency.js';

export const FormatMoney = (amount: number) =>
  currency(amount, { fromCents: true }).format();
