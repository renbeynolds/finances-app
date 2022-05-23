import { selector } from 'recoil';
import { apiGet } from '../../Utils';

export const incomeVsExpenseQuery = selector({
  key: 'incomeVsExpenseQuery',
  get: async () => await apiGet<any[]>('/api/charts/income_vs_expense'),
});
