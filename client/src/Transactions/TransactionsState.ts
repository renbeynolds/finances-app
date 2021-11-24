import { atom, selector } from 'recoil';
import { apiGet } from '../Utils';
import { PaginatedResponse } from '../Utils/PaginatedResponse';
import { TransactionDTO } from './TransactionDTO';

export const DEFAULT_TRANSACTIONS_PAGE_NUM = 1;
export const DEFAULT_TRANSACTIONS_PAGE_SIZE = 10;

export const transactionsPageNum = atom({
  key: 'transactionsPageNum',
  default: DEFAULT_TRANSACTIONS_PAGE_NUM,
});

export const transactionsPageSize = atom({
  key: 'transactionsPageSize',
  default: DEFAULT_TRANSACTIONS_PAGE_SIZE,
});

export const paginatedTransactions = selector({
  key: 'paginatedTransactions',
  get: async ({ get }) => {
    const pageNum = get(transactionsPageNum);
    const pageSize = get(transactionsPageSize);

    const offset = pageSize * (pageNum - 1);

    return await apiGet<PaginatedResponse<TransactionDTO>>(
      `/api/transactions?limit=${pageSize}&offset=${offset}`
    );
  },
});
