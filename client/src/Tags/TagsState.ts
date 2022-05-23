import _ from 'lodash';
import { atom, selector, selectorFamily } from 'recoil';
import { apiGet } from '../Utils';
import { TagDTO } from './TagDTO';

export const tagsQuery = selector({
  key: 'tagsQuery',
  get: async () => await apiGet<TagDTO[]>('/api/tags'),
});

export const tagsState = atom({
  key: 'tags',
  default: tagsQuery,
});

export const tagState = selectorFamily({
  key: 'tag',
  get:
    (tagId?: number | null) =>
    ({ get }) => {
      if (!tagId) {
        return null;
      }
      const tags = get(tagsState);
      return _.find(tags, { id: tagId });
    },
});
