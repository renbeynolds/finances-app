import { selector } from 'recoil';
import { endDateState, startDateState } from '../../Filters/FiltersState';
import { apiGet } from '../../Utils';
import { TopSpendingTagDTO } from './TopSpendingTagDTO';

export const topSpendingTagsQuery = selector<TopSpendingTagDTO[]>({
  key: 'topSpendingTagsQuery',
  get: async ({ get }) => {
    const startDate = get(startDateState);
    const endDate = get(endDateState);

    return await apiGet<any[]>(
      `/api/charts/top_spending_tags?startDate=${startDate.format(
        'YYYY-MM-DD'
      )}&endDate=${endDate.format('YYYY-MM-DD')}`
    );
  },
});
