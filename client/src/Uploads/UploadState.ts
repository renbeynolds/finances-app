import { atom, selector } from 'recoil';
import { apiGet } from '../Utils';
import { UploadDTO } from './UploadDTO';

export const uploadsQuery = selector({
  key: 'uploadsQuery',
  get: async () => await apiGet<UploadDTO[]>('/api/uploads'),
});

export const uploadsState = atom({
  key: 'uploads',
  default: uploadsQuery,
});
