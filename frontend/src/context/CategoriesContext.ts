import React, { createContext, Dispatch } from 'react';
import useSWR from 'swr';
import { Category } from '../data/Category';
import { CategoriesEndpoint, CategoriesFetcher } from '../Fetchers';

type CategoriesAction = {
  type: 'SET';
  payload: Category[];
};

export const DefaultCategories = [];

export const CategoriesContext = createContext<Category[]>(DefaultCategories);

export const CategoriesDispatchContext =
  createContext<Dispatch<CategoriesAction> | null>(null);

export const CategoriesReducer = (
  state: Category[],
  action: CategoriesAction
) => {
  switch (action.type) {
    case 'SET':
      return action.payload;
    default:
      return state;
  }
};

export const UseLazyCategories = () => {
  const categories = React.useContext(CategoriesContext);
  const dispatchCategories = React.useContext(CategoriesDispatchContext);

  const { data, error, isLoading } = useSWR(
    categories.length === 0 ? CategoriesEndpoint : null,
    CategoriesFetcher
  );

  React.useEffect(() => {
    if (!error && !isLoading && data) {
      dispatchCategories!({ type: 'SET', payload: data.data });
    }
  }, [data, error, isLoading]);

  return categories;
};
