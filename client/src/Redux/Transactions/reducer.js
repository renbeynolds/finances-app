import { createSlice } from '@reduxjs/toolkit';
import { requestFetchTransactions, requestUploadTransactions } from './actions';

const transactionsSlide = createSlice({
  name: 'transactions',
  initialState: {},
  reducers: {},
  extraReducers: {
    [requestFetchTransactions.fulfilled]: (state, action) => {
      action.payload.forEach((t) => { state[t.id] = t; });
    },
    [requestUploadTransactions.fulfilled]: (state, action) => {
      action.payload.forEach((t) => { state[t.id] = t; });
    }
  }
});

export default transactionsSlide.reducer;
