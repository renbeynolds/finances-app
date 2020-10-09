// Reducer Template
import { createSlice } from '@reduxjs/toolkit';
import { requestFetchTags } from './actions';

const tagsSlice = createSlice({
  name: 'tags',
  initialState: {},
  reducers: {},
  extraReducers: {
    [requestFetchTags.fulfilled]: (state, action) => {
      action.payload.forEach((t) => { state[t.id] = t; });
    }
  }
});

export default tagsSlice.reducer;
