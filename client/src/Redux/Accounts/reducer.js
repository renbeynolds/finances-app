import { createSlice } from '@reduxjs/toolkit';
import { requestCreateAccount, requestFetchAccounts, requestUpdateAccount } from './actions';

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
    },
    [requestUpdateAccount.fulfilled]: (state, action) => {
      state[action.payload.id] = action.payload;
    }
  }
});

export default accountsSlide.reducer;
