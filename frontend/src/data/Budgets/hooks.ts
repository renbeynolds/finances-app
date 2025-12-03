import useSWR from "swr";
import { BudgetFetcher } from "./fetchers";

export const useBudget = (budgetId?: number) => {
  const { data, error, isLoading } = useSWR(
    budgetId ? `/api/budgets/${budgetId}` : null,
    BudgetFetcher
  );
  return {
    budget: data ? data.data : null,
    isLoading,
    error,
  };
};
