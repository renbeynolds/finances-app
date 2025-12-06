import { Category } from "../Categories/types";

export type Budget = {
  id: number;
  amount: number;
  categoryId: number;
  categoryName: string;
};

export type BudgetWithCategory = Budget & {
  category: Category;
};
