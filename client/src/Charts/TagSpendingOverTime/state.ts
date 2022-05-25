import { selector } from 'recoil';
import { apiGet } from '../../Utils';

export const tagSpendingOverTimeQuery = selector({
  key: 'tagSpendingOverTimeQuery',
  get: async ({ get }) => {
    const tagId = '1';
    return await apiGet<any>(
      `/api/charts/tag_spending_over_time?tagId=${tagId}`
    );
  },
});
