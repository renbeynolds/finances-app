import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import _ from 'lodash';
import createRequest from '../../Utils/createRequest';
import Constants from './constants';

export const requestFetchSpendingOverTimeData = createAsyncThunk(
  Constants.FETCH_SPENDING_OVER_TIME_DATA,
  ({search}, { rejectWithValue }) => {
    let url = '/api/charts/spending_over_time';
    if (search && !_.isEmpty(search)) { url += `?search=${JSON.stringify(search)}`; }
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