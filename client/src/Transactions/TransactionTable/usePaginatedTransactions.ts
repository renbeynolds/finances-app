import React, { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import {
  endDateFilterAtom,
  startDateFilterAtom,
} from '../../Filters/FilterState';
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
  tagId?: number,
  type?: TransactionType
) => {
  const startDate = useRecoilValue(startDateFilterAtom);
  const endDate = useRecoilValue(endDateFilterAtom);

  const [state, setState] = React.useState<RequestState>({
    data: [],
    loading: false,
    totalTransactions: 0,
  });
  const offset = PAGE_SIZE * (pageNumber - 1);

  useEffect(() => {
    const fetchData = async () => {
      const tagIdQuery = tagId ? `&tagId=${tagId}` : '';
      const typeQuery = type ? `&type=${type}` : '';

      const response = await apiGet<PaginatedResponse<TransactionDTO>>(
        `/api/transactions?limit=${PAGE_SIZE}&offset=${offset}&startDate=${startDate}&endDate=${endDate}${tagIdQuery}${typeQuery}`
      );
      setState({
        data: response.data,
        loading: false,
        totalTransactions: response.pagination.total,
      });
    };
    setState((currentState) => ({ ...currentState, loading: true }));
    fetchData();
  }, [setState, offset, startDate, endDate, tagId, type]);

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
