import useSWR from "swr";
import { CategoriesFetcher } from "./fetchers";

export const useCategories = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/categories`,
    CategoriesFetcher,
  );
  return {
    categories: data ? data.data : null,
    categoriesLoading: isLoading,
    categoriesError: error,
    categoriesMutate: mutate,
  };
};
