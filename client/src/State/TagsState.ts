import { atom, selector } from 'recoil';
import { apiGet } from '../Utils';

export const tagsQuery = selector({
  key: 'tagsQuery',
  get: async () => await apiGet<ITag[]>('/api/tags'),
});

export const tagsState = atom({
  key: 'tags',
  default: tagsQuery,
});
