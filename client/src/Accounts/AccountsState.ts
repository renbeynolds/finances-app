import _ from 'lodash';
import { atom, selector, selectorFamily } from 'recoil';
import { apiGet } from '../Utils';
import { AccountDTO } from './AccountDTO';

export const accountsQuery = selector({
  key: 'accountsQuery',
  get: async () => await apiGet<AccountDTO[]>('/api/accounts'),
});

export const accountsState = atom({
  key: 'accounts',
  default: accountsQuery,
});

export const accountState = selectorFamily({
  key: 'account',
  get:
    (accountId: number) =>
    ({ get }) => {
      const accounts = get(accountsState);
      return _.find(accounts, { id: accountId });
    },
});
