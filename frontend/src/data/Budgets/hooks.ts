import dayjs from "dayjs";
import { useContext } from "react";
import useSWR from "swr";
import { TransactionFiltersContext } from "../../context/TransactionFiltersContext";
import { useCategories } from "../Categories/hooks";
import {
  BudgetActualsFetcher,
  BudgetFetcher,
  BudgetsFetcher,
} from "./fetchers";
import { BudgetsViewData } from "./types";

export const useBudget = (budgetId?: number) => {
  const { data, error, isLoading, mutate } = useSWR(
    budgetId ? `/api/budgets/${budgetId}` : null,
    BudgetFetcher,
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
    BudgetsFetcher,
  );
  return {
    budgets: data ? data.data : null,
    budgetsLoading: isLoading,
    budgetsError: error,
    budgetsMutate: mutate,
  };
};

export const useBudgetActuals = (month: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/budgets/actuals?month=${month}`,
    BudgetActualsFetcher,
  );
  return {
    budgetActuals: data ? data.data : null,
    budgetActualsLoading: isLoading,
    budgetActualsError: error,
    budgetActualsMutate: mutate,
  };
};

export const useBudgetsViewData = (): {
  data: BudgetsViewData[] | null;
  isLoading: boolean;
  error: any;
} => {
  const transactionFilters = useContext(TransactionFiltersContext);

  const { budgets, budgetsLoading, budgetsError } = useBudgets();
  const { budgetActuals, budgetActualsLoading, budgetActualsError } =
    useBudgetActuals(dayjs(transactionFilters.Date[0]).format("YYYY-MM"));
  const { categories, categoriesLoading, categoriesError } = useCategories();

  if (budgetsLoading || categoriesLoading || budgetActualsLoading) {
    return {
      data: null,
      isLoading: true,
      error: null,
    };
  }

  if (budgetsError || categoriesError || budgetActualsError) {
    return {
      data: null,
      isLoading: false,
      error: budgetsError || categoriesError || budgetActualsError,
    };
  }

  const budgetsData = categories!.map((category) => {
    const budget = budgets!.find((budget) => budget.categoryId === category.id);
    const budgetActual = budgetActuals!.find(
      (budgetActual) => budgetActual.categoryId === category.id,
    );
    return {
      ...category,
      budget: budget?.amount,
      actual: budgetActual!.amount,
    };
  });

  return {
    data: budgetsData,
    isLoading: false,
    error: null,
  };
};
