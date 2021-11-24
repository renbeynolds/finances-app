import { atom, selector } from 'recoil';
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
