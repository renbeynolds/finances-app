import { Category } from "../Categories/types";

export type Budget = {
  id: number;
  amount: number;
  categoryId: number;
  categoryName: string;
};

export type BudgetsViewData = Category & {
  actual: number;
  budget?: number;
};

export type BudgetActual = {
  budgetId: number;
  categoryId: number;
  amount: number;
};
