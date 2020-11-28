// Reducer Template
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    uploadId: null,
    accountId: null,
    tags: [],
    startDate: null,
    endDate: null
  },
  reducers: {

    // Upload
    setUploadIdFilter: {
      reducer: (state, action) => {
        state.uploadId = action.payload;
      },
      prepare: (uploadId) => ({ payload: uploadId })
    },
    clearUploadIdFilter(state) {
      state.uploadId = null;
    },

    // Account
    setAccountIdFilter: {
      reducer: (state, action) => {
        state.accountId = action.payload;
      },
      prepare: (accountId) => ({ payload: accountId })
    },
    clearAccountIdFilter(state) {
      state.accountId = null;
    },

    // Tags
    addTagFilter: {
      reducer: (state, action) => {
        state.tags.push(action.payload);
      },
      prepare: (tag) => ({ payload: tag })
    },
    removeTagFilter: {
      reducer: (state, action) => {
        state.tags = state.tags.filter(t => t.id !== action.payload.id);
      },
      prepare: (tag) => ({ payload: tag })
    },

    // Start Date
    setStartDateFilter: {
      reducer: (state, action) => {
        state.startDate = action.payload;
      },
      prepare: (startDate) => ({ payload: startDate })
    },
    clearStartDateFilter(state) {
      state.startDate = null;
    },

    // End Date
    setEndDateFilter: {
      reducer: (state, action) => {
        state.endDate = action.payload;
      },
      prepare: (endDate) => ({ payload: endDate })
    },
    clearEndDateFilter(state) {
      state.endDate = null;
    },

  },
  extraReducers: {}
});

export const {
  setUploadIdFilter,
  clearUploadIdFilter,
  setAccountIdFilter,
  clearAccountIdFilter,
  addTagFilter,
  removeTagFilter,
  setStartDateFilter,
  clearStartDateFilter,
  setEndDateFilter,
  clearEndDateFilter
} = filtersSlice.actions;

export default filtersSlice.reducer;
