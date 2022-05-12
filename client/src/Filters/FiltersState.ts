import _ from 'lodash';
import { atom, selector } from 'recoil';
import { TagDTO } from '../Tags/TagDTO';
import { tagsState } from '../Tags/TagsState';
import DateRanges from '../Utils/DateRanges';

const DEFAULT_DATE_RANGE = DateRanges.last30Days();

export const startDateState = atom({
  key: 'startDate',
  default: DEFAULT_DATE_RANGE[0],
});

export const endDateState = atom({
  key: 'endDate',
  default: DEFAULT_DATE_RANGE[1],
});

export const tagFilter = atom<number | null>({
  key: 'tagFilter',
  default: null,
});

export const tagObjectFilter = selector({
  key: 'tagObjectFilter',
  get: async ({ get }) => {
    const tags = get(tagsState);
    const tagId = get(tagFilter);
    return _.find(tags, { id: tagId }) as TagDTO;
  },
});
