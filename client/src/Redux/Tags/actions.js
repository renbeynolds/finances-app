import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import createRequest from '../../Utils/createRequest';
import Constants from './constants';

export const requestFetchTags = createAsyncThunk(
  Constants.FETCH_TAGS,
  (_, { rejectWithValue }) => {
    const request = createRequest('/v1/tags', 'GET', {});
    return Axios(request).then((response) => {
      return response.data;
    }).catch((error) => {
      if (error.reponse.data.errors) {
        return rejectWithValue(error.reponse.data.errors);
      } else {
        return rejectWithValue(error.response.data.message);
      }
    });
  }
);

