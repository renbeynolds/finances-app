export type CategoryType = 'expense' | 'income' | 'transfer';

export interface CategoryDTO {
  id: number;
  parentCategoryId: number;
  name: string;
  color?: string;
  type: CategoryType;
  iconUrl?: string;
}
