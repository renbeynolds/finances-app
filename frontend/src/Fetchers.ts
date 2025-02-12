import { Fetcher } from 'swr';
import { Account } from './data/Account';
import { Category } from './data/Category';
import { Response } from './data/Response';
import { TopSpendingCategory } from './data/TopSpendingCategory';
import { Transaction } from './data/Transaction';
import { Upload } from './data/Upload';

export const AccountsEndpoint = '/api/accounts';
export const AccountsFetcher: Fetcher<Response<Account[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const UploadsEndpoint = '/api/uploads';
export const UploadsFetcher: Fetcher<Response<Upload[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const CategoriesEndpoint = '/api/categories';
export const CategoriesFetcher: Fetcher<Response<Category[]>, string> = (url) =>
  fetch(url).then((res) => res.json());

export const TransactionsEndpoint = '/api/transactions';
export const TransactionsFetcher: Fetcher<Response<Transaction[]>, string> = (
  url
) => fetch(url).then((res) => res.json());

export const TopSpendingCategoriesEndpoint =
  '/api/insights/top_spending_categories';
export const TopSpendingCategoriesFetcher: Fetcher<
  Response<TopSpendingCategory[]>,
  string
> = (url) => fetch(url).then((res) => res.json());
