import { selector } from 'recoil';
import { tagFilter } from '../../Filters/FiltersState';
import { apiGet } from '../../Utils';

export const tagSpendingOverTimeQuery = selector({
  key: 'tagSpendingOverTimeQuery',
  get: async ({ get }) => {
    const tagId = get(tagFilter);
    return await apiGet<any>(
      `/api/charts/tag_spending_over_time?tagId=${tagId}`
    );
  },
});
