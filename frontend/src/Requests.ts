import { AccountFormValues } from './components/AccountForm';
import { Account } from './data/Account';
import { Response } from './data/Response';
import { Transaction } from './data/Transaction';

export const requestUpdateTransaction = async (
  transaction: Transaction,
): Promise<Response<Transaction>> => {
  // TODO: Separate response / request data types
  return fetch(`/api/transactions/${transaction.id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(transaction),
  }).then((response) => response.json());
};

export const requestCreateAccount = async (
  values: AccountFormValues,
): Promise<Response<Account>> => {
  return fetch('/api/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  }).then((response) => response.json());
};

export const requestUpdateAccount = async (
  id: number,
  values: AccountFormValues,
): Promise<Response<Account>> => {
  return fetch(`/api/accounts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  }).then((response) => response.json());
};
