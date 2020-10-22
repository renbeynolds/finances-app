export const selectTransactionSearch = (state) => {
    if (state.filters.transactions.uploadId) {
        return `uploadId=${state.filters.transactions.uploadId}`;
    }
    return null;
};

export const selectTransactionUploadIdFilter = (state) => {
    return state.filters.transactions.uploadId;
}