import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import createRequest from '../../Utils/createRequest';
import Constants from './constants';

export const requestFetchAccount = createAsyncThunk(
  Constants.FETCH_ACCOUNT,
  (accountId, { rejectWithValue }) => {
    const request = createRequest(`/api/accounts/${accountId}`, 'GET', {});
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

export const requestFetchAccounts = createAsyncThunk(
  Constants.FETCH_ACCOUNTS,
  (_, { rejectWithValue }) => {
    const request = createRequest('/api/accounts', 'GET', {});
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

export const requestFetchAccountOptions = createAsyncThunk(
  Constants.FETCH_ACCOUNT_OPTIONS,
  (_, { rejectWithValue }) => {
    const request = createRequest('/api/accounts/options', 'GET', {});
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

export const requestCreateAccount = createAsyncThunk(
  Constants.CREATE_ACCOUNT,
  (account, { rejectWithValue }) => {
    const request = createRequest('/api/accounts', 'POST', account);
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

export const requestUpdateAccount = createAsyncThunk(
  Constants.UPDATE_ACCOUNT,
  ({ id, account }, { rejectWithValue }) => {
    const request = createRequest(`/api/accounts/${id}`, 'PUT', account);
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
