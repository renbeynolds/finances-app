import { createSlice } from '@reduxjs/toolkit';
import { requestFetchTransactions, requestUpdateTransaction } from './actions';

const transactionsSlide = createSlice({
  name: 'transactions',
  initialState: {},
  reducers: {},
  extraReducers: {
    [requestFetchTransactions.fulfilled]: (state, action) => {
      return (action.payload.data).reduce((result, transaction) => {
        result[transaction.id] = transaction;
        return result;
      }, {});
    },
    [requestUpdateTransaction.fulfilled]: (state, action) => {
      state[action.payload.id] = action.payload;
    }
  }
});

export default transactionsSlide.reducer;
