// Reducer Template
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    transactions: {
      uploadId: null,
      tags: []
    }
  },
  reducers: {

    // Upload
    setTransactionUploadIdFilter: {
      reducer: (state, action) => {
        state.transactions.uploadId = action.payload;
      },
      prepare: (uploadId) => ({ payload: uploadId })
    },
    clearTransactionUploadIdFilter(state) {
      state.transactions.uploadId = null;
    },

    // Tags
    addTransactionTagFilter: {
      reducer: (state, action) => {
        state.transactions.tags.push(action.payload);
      },
      prepare: (tag) => ({ payload: tag })
    },
    removeTransactionTagFilter: {
      reducer: (state, action) => {
        state.transactions.tags = state.transactions.tags.filter(t => t.id !== action.payload.id);
      },
      prepare: (tag) => ({ payload: tag })
    }

  },
  extraReducers: {}
});

export const {
  setTransactionUploadIdFilter,
  clearTransactionUploadIdFilter,
  addTransactionTagFilter,
  removeTransactionTagFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;
