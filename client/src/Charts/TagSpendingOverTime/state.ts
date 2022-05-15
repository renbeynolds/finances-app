import { selector } from 'recoil';
import { apiGet } from '../../Utils';

export const tagSpendingOverTimeQuery = selector({
  key: 'tagSpendingOverTimeQuery',
  get: async () => await apiGet<any[]>('/api/charts/tag_spending_over_time'),
});
