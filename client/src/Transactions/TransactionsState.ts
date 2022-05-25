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

    // const startDate = get(startDateState) || moment('1800-01-01');
    // const endDate = get(endDateState) || moment();

    // const tagId = get(tagFilter);
    // const tagIdQuery = tagId ? `&tagId=${tagId}` : '';

    // const uploadId = get(uploadFilter);
    // const uploadIdQuery = uploadId ? `&uploadId=${uploadId}` : '';

    // return await apiGet<PaginatedResponse<TransactionDTO>>(
    //   `/api/transactions?limit=${pageSize}&offset=${offset}&startDate=${startDate.format(
    //     'YYYY-MM-DD'
    //   )}&endDate=${endDate.format('YYYY-MM-DD')}${tagIdQuery}${uploadIdQuery}`
    // );

    return await apiGet<PaginatedResponse<TransactionDTO>>(
      `/api/transactions?limit=${pageSize}&offset=${offset}`
    );
  },
});
