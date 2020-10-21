// Reducer Template
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
      transactions: {}
  },
  reducers: {
    setTransactionUploadFilter: {
      reducer: (state, action) => {
        if (state.transactions.upload) {
            state.transactions.upload.id = action.payload;
        } else {
            state.transactions.upload = { id: action.payload };
        }
      },
      prepare: (uploadId) => {
        return { payload: uploadId }
      }
    }
  },
  extraReducers: {}
});

export const {
    setTransactionUploadFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;
