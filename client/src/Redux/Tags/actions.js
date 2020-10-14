import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import createRequest from '../../Utils/createRequest';
import Constants from './constants';

export const requestFetchTag = createAsyncThunk(
  Constants.FETCH_TAG,
  (tagId, { rejectWithValue }) => {
    const request = createRequest(`/api/tags/${tagId}`, 'GET', {});
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

export const requestFetchTags = createAsyncThunk(
  Constants.FETCH_TAGS,
  (_, { rejectWithValue }) => {
    const request = createRequest('/api/tags', 'GET', {});
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

export const requestCreateTag = createAsyncThunk(
  Constants.CREATE_TAG,
  (tag, { rejectWithValue }) => {
    const request = createRequest('/api/tags', 'POST', tag);
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

export const requestUpdateTag = createAsyncThunk(
  Constants.UPDATE_TAG,
  (tag, { rejectWithValue }) => {
    const request = createRequest(`/api/tags/${tag.id}`, 'PUT', tag);
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