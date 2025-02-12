import dayjs from 'dayjs';
import { createContext, Dispatch } from 'react';

type DateFilterAction = {
  type: 'SET';
  payload: [string, string];
};

export const DefaultDateFilter: [string, string] = [
  dayjs().startOf('month').format('YYYY-MM-DD'),
  dayjs().endOf('month').format('YYYY-MM-DD'),
];

export const DateFilterContext =
  createContext<[string, string]>(DefaultDateFilter);

export const DateFilterDispatchContext =
  createContext<Dispatch<DateFilterAction> | null>(null);

export const DateFilterReducer = (
  state: [string, string],
  action: DateFilterAction
) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};
