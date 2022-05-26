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
  startDate: string,
  endDate: string,
  tagId?: number
) => {
  const [state, setState] = React.useState<RequestState>({
    data: [],
    loading: false,
    totalTransactions: 0,
  });
  const offset = PAGE_SIZE * (pageNumber - 1);

  useEffect(() => {
    const fetchData = async () => {
      const tagIdQuery = tagId ? `&tagId=${tagId}` : '';

      const response = await apiGet<PaginatedResponse<TransactionDTO>>(
        `/api/transactions?limit=${PAGE_SIZE}&offset=${offset}&startDate=${startDate}&endDate=${endDate}${tagIdQuery}`
      );
      setState({
        data: response.data,
        loading: false,
        totalTransactions: response.pagination.total,
      });
    };
    setState((currentState) => ({ ...currentState, loading: true }));
    fetchData();
  }, [setState, offset, startDate, endDate, tagId]);

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
