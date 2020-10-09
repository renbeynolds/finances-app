import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import createRequest from '../../Utils/createRequest';
import Constants from './constants';

export const requestFetchAccounts = createAsyncThunk(
  Constants.FETCH_ACCOUNTS,
  (_, { rejectWithValue }) => {
    const request = createRequest('/v1/accounts', 'GET', {});
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

export const requestCreateAccount = createAsyncThunk(
  Constants.CREATE_ACCOUNT,
  (account, { rejectWithValue }) => {
    const request = createRequest('/v1/accounts', 'POST', account);
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
