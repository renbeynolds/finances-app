export const selectTransactionsArray = (state) => {
  return Object.values(state.transactions);
};