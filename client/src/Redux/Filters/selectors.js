export const selectTransactionFilters = (state) => {
    return state.filters.transactions;
};

export const selectTransactionUploadFilter = (state) => {
    return state.filters.transactions.upload ? state.filters.transactions.upload.id : undefined;
}