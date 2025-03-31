import { BankAccountFormValues } from '../../components/BankAccountForm';
import { Response } from '../Response';
import { BankAccount } from './types';

export const requestCreateBankAccount = async (
  values: BankAccountFormValues,
): Promise<Response<BankAccount>> => {
  return fetch('/api/accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  }).then((response) => response.json());
};

export const requestUpdateBankAccount = async (
  id: number,
  values: BankAccountFormValues,
): Promise<Response<BankAccount>> => {
  return fetch(`/api/accounts/${id}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  }).then((response) => response.json());
};
