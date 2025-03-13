import { Fetcher } from 'swr';
import { Account } from './data/Account';
import { AmountVsAverage } from './data/AmountVsAverage';
import { Category } from './data/Category';
import { IncomeVsExpense } from './data/IncomeVsExpense';
import { Response } from './data/Response';
import { TopSpendingCategory } from './data/TopSpendingCategory';
import { Transaction } from './data/Transaction';
import { Upload } from './data/Upload';

export const AccountsEndpoint = '/api/accounts';
export const AccountsFetcher: Fetcher<Response<Account[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const AccountFetcher: Fetcher<Response<Account>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const UploadsEndpoint = '/api/uploads';
export const UploadsFetcher: Fetcher<Response<Upload[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const CategoriesEndpoint = '/api/categories';
export const CategoriesFetcher: Fetcher<Response<Category[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const TransactionsEndpoint = '/api/transactions';
export const TransactionsFetcher: Fetcher<Response<Transaction[]>, string> = (
  url,
) => fetch(url).then((res) => res.json());

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
