import useSWR from "swr";
import { BudgetFetcher } from "./fetchers";

export const useBudget = (budgetId?: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    budgetId ? `/api/budgets/${budgetId}` : null,
    BudgetFetcher
  );
  return {
    budget: data ? data.data : null,
    budgetLoading: isLoading,
    budgetError: error,
    budgetMutate: mutate,
  };
};
