import dayjs from 'dayjs';
import { InvestmentAccountBalanceFormValues } from '../../components/Accounts/InvestmentAccountBalanceForm';
import { InvestmentAccountFormValues } from '../../components/Accounts/InvestmentAccountForm';
import { Response } from '../Response';
import { InvestmentAccount } from './types';

export const requestCreateInvestmentAccount = async (
  values: InvestmentAccountFormValues,
): Promise<Response<InvestmentAccount>> => {
  return fetch('/api/investment_accounts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(values),
  }).then((response) => response.json());
};

export const requestRecordInvestmentAccountBalance = async (
  id: number,
  values: InvestmentAccountBalanceFormValues,
): Promise<Response<InvestmentAccount>> => {
  return fetch(`/api/investment_accounts/${id}/balance`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      ...values,
      balance: `${values.balance}`,
      date: dayjs(values.date!).format('YYYY-MM-DD'),
    }),
  }).then((response) => response.json());
};
