import { apiGet } from '../Utils';

export const getCategoryPrefixRules = async (categoryId: number) =>
  await apiGet<string[]>(`/api/categories/${categoryId}/rules`);
