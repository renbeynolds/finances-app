import moment from 'moment';
import { selector } from 'recoil';
import {
  endDateState,
  startDateState,
  uploadFilter,
} from '../../Filters/FiltersState';
import { apiGet } from '../../Utils';
import { TopSpendingTagDTO } from './TopSpendingTagDTO';

export const topSpendingTagsQuery = selector<TopSpendingTagDTO[]>({
  key: 'topSpendingTagsQuery',
  get: async ({ get }) => {
    const startDate = get(startDateState) || moment('1800-01-01');
    const endDate = get(endDateState) || moment();
    const uploadId = get(uploadFilter);
    const uploadIdQuery = uploadId ? `&uploadId=${uploadId}` : '';

    return await apiGet<any[]>(
      `/api/charts/top_spending_tags?startDate=${startDate.format(
        'YYYY-MM-DD'
      )}&endDate=${endDate.format('YYYY-MM-DD')}${uploadIdQuery}`
    );
  },
});
