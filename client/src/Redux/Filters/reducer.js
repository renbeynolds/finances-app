// Reducer Template
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
      transactions: {}
  },
  reducers: {
    
    // Upload
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
    },
    clearTransactionUploadFilter(state) {
      delete state.transactions.upload;
    }


  },
  extraReducers: {}
});

export const {
    setTransactionUploadFilter,
    clearTransactionUploadFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;
