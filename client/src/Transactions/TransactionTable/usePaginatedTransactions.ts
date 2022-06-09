import React, { useEffect } from 'react';
import { apiGet } from '../../Utils';
import { PaginatedResponse } from '../../Utils/PaginatedResponse';
import { TransactionDTO } from '../TransactionDTO';

const PAGE_SIZE = 10;

interface RequestState {
  data: TransactionDTO[];
  loading: boolean;
  totalTransactions: number;
}

export const usePaginatedTransactions = (
  pageNumber: number,
  startDate?: string,
  endDate?: string,
  tagId?: number,
  uploadId?: number,
  accountId?: number,
  type?: TransactionType
) => {
  const [state, setState] = React.useState<RequestState>({
    data: [],
    loading: false,
    totalTransactions: 0,
  });
  const offset = PAGE_SIZE * (pageNumber - 1);

  useEffect(() => {
    const fetchData = async () => {
      const startDateQuery = startDate ? `&startDate=${startDate}` : '';
      const endDateQuery = endDate ? `&endDate=${endDate}` : '';
      const tagIdQuery = tagId ? `&tagId=${tagId}` : '';
      const uploadIdQuery = uploadId ? `&uploadId=${uploadId}` : '';
      const accountIdQuery = accountId ? `&accountId=${accountId}` : '';
      const typeQuery = type ? `&type=${type}` : '';

      const response = await apiGet<PaginatedResponse<TransactionDTO>>(
        `/api/transactions?limit=${PAGE_SIZE}&offset=${offset}${startDateQuery}${endDateQuery}${tagIdQuery}${uploadIdQuery}${typeQuery}${accountIdQuery}`
      );
      setState({
        data: response.data,
        loading: false,
        totalTransactions: response.pagination.total,
      });
    };
    setState((currentState) => ({ ...currentState, loading: true }));
    fetchData();
  }, [setState, offset, startDate, endDate, tagId, accountId, uploadId, type]);

  const updateTransaction = (transaction: TransactionDTO) => {
    setState((currentState) => ({
      ...currentState,
      data: currentState.data.map((t) =>
        t.id === transaction.id ? transaction : t
      ),
    }));
  };

  return { ...state, updateTransaction };
};
