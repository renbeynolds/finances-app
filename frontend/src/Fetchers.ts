import { Fetcher } from 'swr';
import { Account } from './data/Account';
import { Response } from './data/Response';

export const AccountsEndpoint = '/api/accounts';
export const AccountsFetcher: Fetcher<Response<Account[]>, string> = () =>
  fetch(AccountsEndpoint).then((res) => res.json());
