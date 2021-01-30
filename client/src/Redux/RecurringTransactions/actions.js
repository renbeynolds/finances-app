import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import createRequest from '../../Utils/createRequest';
import Constants from './constants';

export const requestFetchRecurringTransactions = createAsyncThunk(
  Constants.FETCH_RECURRING_TRANSACTIONS,
  (_, { rejectWithValue }) => {
    let url = '/api/recurring_transactions';
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
