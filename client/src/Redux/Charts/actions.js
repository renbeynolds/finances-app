import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import createRequest from '../../Utils/createRequest';
import Constants from './constants';

export const requestFetchSpendingOverTimeData = createAsyncThunk(
  Constants.FETCH_SPENDING_OVER_TIME_DATA,
  ({ search }, { rejectWithValue }) => {
    let url = '/api/charts/spending_over_time';
    if (search) { url += `?${search}`; }
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

export const requestFetchAccountBalanceOverTimeData = createAsyncThunk(
  Constants.FETCH_ACCOUNT_BALANCE_OVER_TIME_DATA,
  (accountId, { rejectWithValue }) => {
    let url = `/api/charts/account_balance_over_time/${accountId}`;
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

export const requestFetchCombinedAccountBalanceOverTimeData = createAsyncThunk(
  Constants.FETCH_COMBINED_ACCOUNT_BALANCE_OVER_TIME_DATA,
  ({ dateStrings, bucket }, { rejectWithValue }) => {
    let url = `/api/charts/account_balance_over_time?startDate=${dateStrings[0]}&endDate=${dateStrings[1]}&bucket=${bucket}`;
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