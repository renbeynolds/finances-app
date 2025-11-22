import { Fetcher } from "swr";
import { TransactionFilters } from "./context/TransactionFiltersContext";
import { AmountOverTime } from "./data/AmountOverTime";
import { AmountVsAverage } from "./data/AmountVsAverage";
import { CurrentNetWorth } from "./data/CurrentNetWorth";
import { ExpensesOverTime } from "./data/ExpensesOverTime";
import { IncomeVsExpense } from "./data/IncomeVsExpense";
import { Response } from "./data/Response";
import { Transaction } from "./data/Transaction";
import { Upload } from "./data/Upload";

export const CategoryOverTimeEndpoint = (
  from: string,
  to: string,
  categoryId: string
) => `/api/categories/${categoryId}/amount_over_time?from=${from}&to=${to}`;
export const NetWorthOverTimeEndpoint = (from: string, to: string) =>
  `/api/trends/net_worth_over_time?from=${from}&to=${to}`;
export const CurrentNetWorthEndpoint = () => `/api/trends/net_worth`;
export const ExpensesOverTimeEndpoint = (from: string, to: string) =>
  `/api/trends/expenses_over_time?from=${from}&to=${to}`;
export const AccountBalanceOverTimeEndpoint = (
  accountId: string,
  from: string,
  to: string
) => `/api/bank_accounts/${accountId}/balance_over_time?from=${from}&to=${to}`;
export const InvestmentAccountBalanceOverTimeEndpoint = (
  accountId: string,
  from: string,
  to: string
) =>
  `/api/investment_accounts/${accountId}/balance_over_time?from=${from}&to=${to}`;
export const AmountOverTimeFetcher: Fetcher<
  Response<AmountOverTime[]>,
  string
> = (url) => fetch(url).then((res) => res.json());

export const CurrentNetWorthFetcher: Fetcher<
  Response<CurrentNetWorth>,
  string
> = (url) => fetch(url).then((res) => res.json());

export const ExpensesOverTimeFetcher: Fetcher<
  Response<ExpensesOverTime[]>,
  string
> = (url) => fetch(url).then((res) => res.json());

export const UploadsEndpoint = "/api/uploads";
export const UploadsFetcher: Fetcher<Response<Upload[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const TransactionFiltersToQueryParams = (
  transactionFilters: TransactionFilters,
  ignoreDateRange: boolean
) =>
  ignoreDateRange
    ? ""
    : `from=${transactionFilters.Date[0]}&to=${transactionFilters.Date[1]}` +
      `&description=${transactionFilters.Description}` +
      `&min=${transactionFilters.Amount[0] !== undefined ? transactionFilters.Amount[0] : ""}&max=${transactionFilters.Amount[1] !== undefined ? transactionFilters.Amount[1] : ""}` +
      `&comment=${transactionFilters.Comment}`;

export const TransactionsEndpoint = (
  page: number,
  pageSize: number,
  transactionFilters: TransactionFilters,
  accountId?: string,
  uploadId?: string,
  categoryId?: string,
  ignoreDateRange: boolean = false
) =>
  `/api/transactions?page=${page}&limit=${pageSize}&` +
  TransactionFiltersToQueryParams(transactionFilters, ignoreDateRange) +
  `&account_id=${accountId !== undefined ? accountId : ""}` +
  `&upload_id=${uploadId !== undefined ? uploadId : ""}` +
  `&category_id=${categoryId !== undefined ? categoryId : ""}`;
export const TransactionsFetcher: Fetcher<Response<Transaction[]>, string> = (
  url
) => fetch(url).then((res) => res.json());

export const IncomeVsAverageEndpoint = "/api/snapshot/income_vs_average";
export const ExpenseVsAverageEndpoint = "/api/snapshot/expense_vs_average";
export const AmountVsAverageFetcher: Fetcher<
  Response<AmountVsAverage>,
  string
> = (url) => fetch(url).then((res) => res.json());

export const IncomeVsExpenseEndpoint = "/api/trends/income_vs_expense";
export const IncomeVsExpenseFetcher: Fetcher<
  Response<IncomeVsExpense[]>,
  string
> = (url) => fetch(url).then((res) => res.json());
