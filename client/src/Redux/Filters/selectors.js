export const selectSearch = (state) => {
  let search = '';
  if (state.filters.uploadId) {
    search += `&uploadId=${state.filters.uploadId}`;
  }
  if (state.filters.accountId) {
    search += `&accountId=${state.filters.accountId}`;
  }
  if (state.filters.tags.length !== 0) {
    search += `&tagIds=${JSON.stringify(state.filters.tags.map(t => t.id))}`;
  }
  if (state.filters.startDate) {
    search += `&startDate=${state.filters.startDate.format('YYYY-MM-DD')}`;
  }
  if (state.filters.endDate) {
    search += `&endDate=${state.filters.endDate.format('YYYY-MM-DD')}`;
  }
  if (state.filters.untagged) {
    search += `&untagged=true`;
  }
  if (search === '') { return null; }
  return search.substring(1);
};

export const selectUploadIdFilter = (state) => {
  return state.filters.uploadId;
};

export const selectAccountIdFilter = (state) => {
  return state.filters.accountId;
};

export const selectTagsFilter = (state) => {
  return state.filters.tags;
};

export const selectStartDateFilter = (state) => {
  return state.filters.startDate;
};

export const selectEndDateFilter = (state) => {
  return state.filters.endDate;
};

export const selectUntaggedFilter = (state) => {
  return state.filters.untagged;
};