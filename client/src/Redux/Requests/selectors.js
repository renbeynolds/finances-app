export const selectRequestStatus = (state, name) => {
  const status = state.requests[name];
  if (!status) { return { loading: false, errors: [] }; }
  return status;
};

export const createLoadingSelector = (actions) => (state) => {
  const actionsLoading = actions.map((action) => {
    return selectRequestStatus(state, `${action}`).loading;
  });
  return actionsLoading.includes(true);
};
