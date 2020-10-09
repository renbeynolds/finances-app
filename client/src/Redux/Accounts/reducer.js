// Reducer Template
import { createSlice } from '@reduxjs/toolkit';
import { requestCreateAccount, requestFetchAccounts } from './actions';

const accountsSlide = createSlice({
  name: 'accounts',
  initialState: {},
  reducers: {},
  extraReducers: {
    [requestFetchAccounts.fulfilled]: (state, action) => {
      action.payload.forEach((a) => { state[a.id] = a; });
    },
    [requestCreateAccount.fulfilled]: (state, action) => {
      state[action.payload.id] = action.payload;
    }
  }
});

export default accountsSlide.reducer;
