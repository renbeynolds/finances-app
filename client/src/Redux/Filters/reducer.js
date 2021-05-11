// Reducer Template
import { createSlice } from '@reduxjs/toolkit';

const filtersSlice = createSlice({
  name: 'filters',
  initialState: {
    uploadId: null,
    accountId: null,
    tagIds: [],
    startDate: null,
    endDate: null,
    untagged: false
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
    addTagIdFilter: {
      reducer: (state, action) => {
        state.tagIds.push(action.payload);
      },
      prepare: (tagId) => ({ payload: tagId })
    },
    removeTagIdFilter: {
      reducer: (state, action) => {
        state.tagIds = state.tagIds.filter(id => id !== action.payload);
      },
      prepare: (tagId) => ({ payload: tagId })
    },
    setSingleTagIdFilter: {
      reducer: (state, action) => {
        state.tagIds = [action.payload];
      },
      prepare: (tagId) => ({ payload: tagId })
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

    // Untagged
    setUntaggedFilter: {
      reducer: (state, action) => {
        state.untagged = action.payload
      },
      prepate: (untagged) => ({ payload: untagged })
    }

  },
  extraReducers: {}
});

export const {
  setUploadIdFilter,
  clearUploadIdFilter,
  setAccountIdFilter,
  clearAccountIdFilter,
  addTagIdFilter,
  removeTagIdFilter,
  setSingleTagIdFilter,
  setStartDateFilter,
  clearStartDateFilter,
  setEndDateFilter,
  clearEndDateFilter,
  setUntaggedFilter,
} = filtersSlice.actions;

export default filtersSlice.reducer;
