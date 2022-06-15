export interface CreateCategoryCMD {
  name: string;
  color?: string;
  parentCategoryId?: number;
  prefixPatterns: string[];
}
