import { Fetcher } from 'swr';
import { TransactionFilters } from './context/TransactionFiltersContext';
import { AmountOverTime } from './data/AmountOverTime';
import { AmountVsAverage } from './data/AmountVsAverage';
import { IncomeVsExpense } from './data/IncomeVsExpense';
import { Response } from './data/Response';
import { TopSpendingCategory } from './data/TopSpendingCategory';
import { Transaction } from './data/Transaction';
import { Upload } from './data/Upload';

export const NetWorthOverTimeEndpoint = (from: string, to: string) =>
  `/api/insights/net_worth?from=${from}&to=${to}`;
export const AccountBalanceOverTimeEndpoint = (
  accountId: string,
  from: string,
  to: string,
) => `/api/accounts/${accountId}/balance_over_time?from=${from}&to=${to}`;
export const AmountOverTimeFetcher: Fetcher<
  Response<AmountOverTime[]>,
  string
> = (url) => fetch(url).then((res) => res.json());

export const UploadsEndpoint = '/api/uploads';
export const UploadsFetcher: Fetcher<Response<Upload[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

const transactionFiltersToQueryParams = (
  transactionFilters: TransactionFilters,
  ignoreDateRange: boolean,
) =>
  ignoreDateRange
    ? ''
    : `from=${transactionFilters.Date[0]}&to=${transactionFilters.Date[1]}` +
      `&description=${transactionFilters.Description}` +
      `&min=${transactionFilters.Amount[0] !== undefined ? transactionFilters.Amount[0] : ''}&max=${transactionFilters.Amount[1] !== undefined ? transactionFilters.Amount[1] : ''}` +
      `&comment=${transactionFilters.Comment}`;

export const TransactionsEndpoint = (
  page: number,
  pageSize: number,
  transactionFilters: TransactionFilters,
  accountId?: string,
  uploadId?: string,
  categoryId?: string,
  ignoreDateRange: boolean = false,
) =>
  `/api/transactions?page=${page}&limit=${pageSize}&` +
  transactionFiltersToQueryParams(transactionFilters, ignoreDateRange) +
  `&account_id=${accountId !== undefined ? accountId : ''}` +
  `&upload_id=${uploadId !== undefined ? uploadId : ''}` +
  `&category_id=${categoryId !== undefined ? categoryId : ''}`;
export const TransactionsFetcher: Fetcher<Response<Transaction[]>, string> = (
  url,
) => fetch(url).then((res) => res.json());

export const FilteredTransactionsTotalEndpoint = (
  transactionFilters: TransactionFilters,
) =>
  `/api/transactions/total?` +
  transactionFiltersToQueryParams(transactionFilters, false);
export const AmountFetcher: Fetcher<Response<number>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const TopSpendingCategoriesEndpoint =
  '/api/insights/top_spending_categories';
export const TopSpendingCategoriesFetcher: Fetcher<
  Response<TopSpendingCategory[]>,
  string
> = (url) => fetch(url).then((res) => res.json());

export const IncomeVsAverageEndpoint = '/api/insights/income_vs_average';
export const ExpenseVsAverageEndpoint = '/api/insights/expense_vs_average';
export const AmountVsAverageFetcher: Fetcher<
  Response<AmountVsAverage>,
  string
> = (url) => fetch(url).then((res) => res.json());

export const IncomeVsExpenseEndpoint = '/api/insights/income_vs_expense';
export const IncomeVsExpenseFetcher: Fetcher<
  Response<IncomeVsExpense[]>,
  string
> = (url) => fetch(url).then((res) => res.json());
