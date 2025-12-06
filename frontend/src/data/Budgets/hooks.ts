import useSWR from "swr";
import { useCategories } from "../Categories/hooks";
import { BudgetFetcher, BudgetsFetcher } from "./fetchers";
import { BudgetWithCategory } from "./types";

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

export const useBudgets = () => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/budgets`,
    BudgetsFetcher
  );
  return {
    budgets: data ? data.data : null,
    budgetsLoading: isLoading,
    budgetsError: error,
    budgetsMutate: mutate,
  };
};

export const useBudgetsWithCategories = (): { budgets: BudgetWithCategory[] | null; budgetsLoading: boolean; budgetsError: any } => {
  const { budgets, budgetsLoading, budgetsError } = useBudgets();
  const { categories, categoriesLoading, categoriesError } = useCategories();

  if (budgetsLoading || categoriesLoading) {
    return {
      budgets: null,
      budgetsLoading: true,
      budgetsError: null,
    };
  }

  if (budgetsError || categoriesError) {
    return {
      budgets: null,
      budgetsLoading: false,
      budgetsError: budgetsError || categoriesError,
    };
  }

  const budgetsWithCategories = budgets!.map((budget) => {
    const category = categories!.find((category) => category.id === budget.categoryId);
    return {
      ...budget,
      category: category!,
    };
  });

  return {
    budgets: budgetsWithCategories,
    budgetsLoading: false,
    budgetsError: null,
  };
};