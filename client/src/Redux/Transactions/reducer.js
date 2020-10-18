import { createSlice } from '@reduxjs/toolkit';
import { requestFetchTransactions } from './actions';

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
    }
  }
});

export default transactionsSlide.reducer;
