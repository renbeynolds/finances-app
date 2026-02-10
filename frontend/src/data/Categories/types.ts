export type Category = {
  id: number;
  name: string;
  type: string;
  color: string | undefined;
  emoji: string | undefined;
  parentCategoryId: number | undefined;
  budgetId: number | undefined;
};

export type CategoriesOverTime = {
  categoryId: number;
  date: string;
  amount: number;
};

export type TopSpendingCategory = {
  id: number;
  name: string;
  total: number;
};
