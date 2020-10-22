// Reducer Template
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
      transactions: {
        uploadId: null
      }
  },
  reducers: {
    
    // Upload
    setTransactionUploadIdFilter: {
      reducer: (state, action) => {
        state.transactions.uploadId = action.payload;
      },
      prepare: (uploadId) => {
        return { payload: uploadId }
      }
    },
    clearTransactionUploadIdFilter(state) {
      state.transactions.uploadId = null;
    }


  },
  extraReducers: {}
});

export const {
    setTransactionUploadIdFilter,
    clearTransactionUploadIdFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;
