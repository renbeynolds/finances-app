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

export const requestSuppressRecurringTransactions = createAsyncThunk(
  Constants.SUPPRESS_RECURRING_TRANSACTIONS,
  (recurrenceIds, { rejectWithValue }) => {
    let url = '/api/recurring_transactions/suppress';
    const request = createRequest(url, 'PUT', { recurrenceIds });
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

export const requestLinkRecurringTransactions = createAsyncThunk(
  Constants.LINK_RECURRING_TRANSACTIONS,
  (recurrenceIds, { rejectWithValue }) => {
    let url = '/api/recurring_transactions/link';
    const request = createRequest(url, 'PUT', { recurrenceIds });
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
