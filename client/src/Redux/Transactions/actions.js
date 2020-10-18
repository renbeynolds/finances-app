import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import createFormDataRequest from '../../Utils/createFormDataRequest';
import createRequest from '../../Utils/createRequest';
import Constants from './constants';

export const requestFetchTransactions = createAsyncThunk(
  Constants.FETCH_TRANSACTIONS,
  ({limit, offset}, { rejectWithValue }) => {
    const request = createRequest(`/api/transactions?limit=${limit}&offset=${offset}`, 'GET', {});
    return Axios(request).then((response) => {
      return response.data;
    }).catch((error) => {
      if (error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue([error.response.statusText]);
      }
    });
  }
);

export const requestUploadTransactions = createAsyncThunk(
  Constants.UPLOAD_TRANSACTIONS,
  ({ accountId, file }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('accountId', accountId);
    formData.append('file', file);
    const request = createFormDataRequest('/api/transactions', 'POST', formData);
    return Axios(request).then((response) => {
      return response.data;
    }).catch((error) => {
      if (error.response.data.errors) {
        return rejectWithValue(error.response.data.errors);
      } else {
        return rejectWithValue([error.response.statusText]);
      }
    });
  }
);