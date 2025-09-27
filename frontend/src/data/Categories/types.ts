export type Category = {
  id: number;
  name: string;
  type: string;
  color: string | undefined;
  iconUrl: string | undefined;
  parentCategoryId: number | undefined;
};

export type CategoriesOverTime = {
  categoryId: number;
  date: string;
  amount: number;
};
