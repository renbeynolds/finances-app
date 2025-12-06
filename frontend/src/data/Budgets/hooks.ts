import dayjs from "dayjs";
import { useContext } from "react";
import useSWR from "swr";
import { TransactionFiltersContext } from "../../context/TransactionFiltersContext";
import { useCategories } from "../Categories/hooks";
import { BudgetActualsFetcher, BudgetFetcher, BudgetsFetcher } from "./fetchers";
import { BudgetWithCategoryAndActual } from "./types";

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

export const useBudgetActuals = (month: string) => {
  const { data, error, isLoading, mutate } = useSWR(
    `/api/budgets/actuals?month=${month}`,
    BudgetActualsFetcher
  );
  return {
    budgetActuals: data ? data.data : null,
    budgetActualsLoading: isLoading,
    budgetActualsError: error,
    budgetActualsMutate: mutate,
  };
};

export const useBudgetsViewData = (): { budgets: BudgetWithCategoryAndActual[] | null; budgetsLoading: boolean; budgetsError: any } => {

  const transactionFilters = useContext(TransactionFiltersContext);

  const { budgets, budgetsLoading, budgetsError } = useBudgets();
  const { budgetActuals, budgetActualsLoading, budgetActualsError } = useBudgetActuals(dayjs(transactionFilters.Date[0]).format("YYYY-MM"));
  const { categories, categoriesLoading, categoriesError } = useCategories();

  if (budgetsLoading || categoriesLoading || budgetActualsLoading) {
    return {
      budgets: null,
      budgetsLoading: true,
      budgetsError: null,
    };
  }

  if (budgetsError || categoriesError || budgetActualsError) {
    return {
      budgets: null,
      budgetsLoading: false,
      budgetsError: budgetsError || categoriesError || budgetActualsError,
    };
  }

  console.log(budgetActuals)

  const budgetsData = budgets!.map((budget) => {
    const category = categories!.find((category) => category.id === budget.categoryId);
    const budgetActual = budgetActuals!.find((budgetActual) => budgetActual.budgetId === budget.id);
    return {
      ...budget,
      category: category!,
      actual: budgetActual!.amount,
    };
  });

  return {
    budgets: budgetsData,
    budgetsLoading: false,
    budgetsError: null,
  };
};