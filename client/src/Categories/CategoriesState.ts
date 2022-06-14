import _ from 'lodash';
import { atom, selector, selectorFamily } from 'recoil';
import { apiGet } from '../Utils';
import { CategoryDTO } from './CategoryDTO';

export const categoriesQuery = selector({
  key: 'categoriesQuery',
  get: async () => await apiGet<CategoryDTO[]>('/api/categories'),
});

export const categoriesState = atom({
  key: 'categories',
  default: categoriesQuery,
});

export const categoryState = selectorFamily({
  key: 'category',
  get:
    (categoryId?: number | null) =>
    ({ get }) => {
      if (!categoryId) {
        return null;
      }
      const categories = get(categoriesState);
      return _.find(categories, { id: categoryId });
    },
});
