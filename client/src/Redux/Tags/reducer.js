// Reducer Template
import { createSlice } from '@reduxjs/toolkit';
import { requestCreateTag, requestFetchTags } from './actions';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {},
  reducers: {},
  extraReducers: {
    [requestFetchTags.fulfilled]: (state, action) => {
      action.payload.forEach((t) => { state[t.id] = t; });
    },
    [requestCreateTag.fulfilled]: (state, action) => {
      state[action.payload.id] = action.payload;
    }
  }
});

export default tagsSlice.reducer;
