import _ from 'lodash';
import { atom, selector } from 'recoil';
import { accountsState } from '../Accounts/AccountsState';
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

export type UploadListItem = UploadDTO & {
  accountName?: string;
};

export const uploadsListState = selector<UploadListItem[]>({
  key: 'uploadsListState',
  get: ({ get }) => {
    const uploads = get(uploadsState);
    const accounts = get(accountsState);

    return uploads.map((u) => ({
      ...u,
      accountName: _.find(accounts, { id: u.accountId })?.name,
    }));
  },
});
