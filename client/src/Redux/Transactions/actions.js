import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import createRequest from '../../Utils/createRequest';
import Constants from './constants';

export const requestFetchTransactions = createAsyncThunk(
  Constants.FETCH_TRANSACTIONS,
  ({ limit, offset, search }, { rejectWithValue }) => {
    let url = `/api/transactions?limit=${limit}&offset=${offset}`;
    if (search) { url += `&${search}`; }
    const request = createRequest(url, 'GET', {});
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

export const requestUpdateTransaction = createAsyncThunk(
  Constants.UPDATE_TRANSACTION,
  ({ id, transaction }, { rejectWithValue }) => {
    const request = createRequest(`/api/transactions/${id}`, 'PUT', transaction);
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

