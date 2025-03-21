import dayjs from 'dayjs';
import { createContext, Dispatch } from 'react';

type DateFilter = [string, string];
type AmountFilter = [number | undefined, number | undefined];

type TransactionFilters = {
  Date: DateFilter;
  Description: string;
  Comment: string;
  Amount: AmountFilter;
};

export type TransactionFiltersAction =
  | { type: 'SET_DATE_FILTER'; payload: DateFilter }
  | { type: 'SET_DESCRIPTION_FILTER'; payload: string }
  | { type: 'SET_COMMENT_FILTER'; payload: string }
  | { type: 'SET_AMOUNT_FILTER'; payload: AmountFilter };

const DefaultDateFilter: DateFilter = [
  dayjs().startOf('month').format('YYYY-MM-DD'),
  dayjs().endOf('month').format('YYYY-MM-DD'),
];

export const DefaultTransactionFilters: TransactionFilters = {
  Date: DefaultDateFilter,
  Description: '',
  Comment: '',
  Amount: [undefined, undefined],
};

export const TransactionFiltersContext = createContext<TransactionFilters>(
  DefaultTransactionFilters,
);

export const TransactionFiltersDispatchContext =
  createContext<Dispatch<TransactionFiltersAction> | null>(null);

export const TransactionFiltersReducer = (
  state: TransactionFilters,
  action: TransactionFiltersAction,
) => {
  switch (action.type) {
    case 'SET_DATE_FILTER':
      return { ...state, Date: action.payload };
    case 'SET_DESCRIPTION_FILTER':
      return { ...state, Description: action.payload };
    case 'SET_COMMENT_FILTER':
      return { ...state, Comment: action.payload };
    case 'SET_AMOUNT_FILTER':
      return { ...state, Amount: action.payload };
    default:
      return state;
  }
};
