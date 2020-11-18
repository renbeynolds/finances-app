export const selectTransactionSearch = (state) => {
  let search = '';
  if (state.filters.transactions.uploadId) {
    search += `&uploadId=${state.filters.transactions.uploadId}`;
  }
  if (state.filters.transactions.accountId) {
    search += `&accountId=${state.filters.transactions.accountId}`;
  }
  if (state.filters.transactions.tags.length !== 0) {
    search += `&tagIds=${JSON.stringify(state.filters.transactions.tags.map(t => t.id))}`;
  }
  if (search === '') { return null; }
  return search.substring(1);
};

export const selectTransactionUploadIdFilter = (state) => {
  return state.filters.transactions.uploadId;
};

export const selectTransactionAccountIdFilter = (state) => {
  return state.filters.transactions.accountId;
};

export const selectTransactionTagsFilter = (state) => {
  return state.filters.transactions.tags;
};