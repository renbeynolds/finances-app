import { Fetcher } from 'swr';
import { Account } from './data/Account';
import { Category } from './data/Category';
import { Response } from './data/Response';
import { Transaction } from './data/Transaction';
import { Upload } from './data/Upload';

export const AccountsEndpoint = '/api/accounts';
export const AccountsFetcher: Fetcher<Response<Account[]>, string> = () =>
  fetch(AccountsEndpoint).then((res) => res.json());

export const UploadsEndpoint = '/api/uploads';
export const UploadsFetcher: Fetcher<Response<Upload[]>, string> = () =>
  fetch(UploadsEndpoint).then((res) => res.json());

export const CategoriesEndpoint = '/api/categories';
export const CategoriesFetcher: Fetcher<Response<Category[]>, string> = () =>
  fetch(CategoriesEndpoint).then((res) => res.json());

export const TransactionsEndpoint = '/api/transactions';
export const TransactionsFetcher: Fetcher<
  Response<Transaction[]>,
  string
> = () => fetch(TransactionsEndpoint).then((res) => res.json());
