import { apiGet } from '../Utils';

export const getTagRegexRules = async (tagId: number) =>
  await apiGet<string[]>(`/api/tags/${tagId}/rules`);
