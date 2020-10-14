// Reducer Template
import { createSlice } from '@reduxjs/toolkit';
import { requestCreateTag, requestFetchTag, requestFetchTags, requestUpdateTag } from './actions';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {},
  reducers: {},
  extraReducers: {
    [requestFetchTag.fulfilled]: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    [requestFetchTags.fulfilled]: (state, action) => {
      action.payload.forEach((t) => { state[t.id] = t; });
    },
    [requestCreateTag.fulfilled]: (state, action) => {
      state[action.payload.id] = action.payload;
    },
    [requestUpdateTag.fulfilled]: (state, action) => {
      state[action.payload.id] = action.payload;
    }
  }
});

export default tagsSlice.reducer;
