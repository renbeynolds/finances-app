import { apiGet } from '../Utils';

export const getTagPrefixRules = async (tagId: number) =>
  await apiGet<string[]>(`/api/tags/${tagId}/rules`);
