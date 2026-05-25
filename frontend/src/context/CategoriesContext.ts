import React, { createContext, Dispatch } from "react";
import useSWR from "swr";
import {
  CategoriesEndpoint,
  CategoriesFetcher,
} from "../data/Categories/fetchers";
import { Category } from "../data/Categories/types";

type CategoriesAction =
  | { type: "SET"; payload: Category[] }
  | { type: "ADD"; payload: Category }
  | { type: "UPDATE"; payload: Category }
  | { type: "DELETE"; payload: number };

export const DefaultCategories = [];

export const CategoriesContext = createContext<Category[]>(DefaultCategories);

export const CategoriesDispatchContext =
  createContext<Dispatch<CategoriesAction> | null>(null);

export const CategoriesReducer = (
  state: Category[],
  action: CategoriesAction,
) => {
  switch (action.type) {
    case "SET":
      return action.payload;
    case "ADD":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((category) =>
        category.id === action.payload.id ? action.payload : category,
      );
    case "DELETE":
      return state.filter((category) => category.id !== action.payload);
    default:
      return state;
  }
};

export const UseLazyCategories = () => {
  const categories = React.useContext(CategoriesContext);
  const dispatchCategories = React.useContext(CategoriesDispatchContext);

  const { data, error, isLoading } = useSWR(
    categories.length === 0 ? CategoriesEndpoint : null,
    CategoriesFetcher,
  );

  React.useEffect(() => {
    if (!error && !isLoading && data) {
      dispatchCategories!({ type: "SET", payload: data.data });
    }
  }, [data, error, isLoading]);

  return categories;
};

export const UseCategoriesDispatch = () => {
  const dispatch = React.useContext(CategoriesDispatchContext);
  if (!dispatch) {
    throw new Error(
      "UseCategoriesDispatch must be used within a CategoriesProvider",
    );
  }
  return dispatch;
};
