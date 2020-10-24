import { createAsyncThunk } from '@reduxjs/toolkit';
import Axios from 'axios';
import createFormDataRequest from '../../Utils/createFormDataRequest';
import Constants from './constants';

export const requestCreateUpload = createAsyncThunk(
  Constants.CREATE_UPLOAD,
  ({ accountId, file, preTagged, tagHeader }, { rejectWithValue }) => {
    const formData = new FormData();
    formData.append('accountId', accountId);
    formData.append('file', file);
    formData.append('preTagged', preTagged);
    formData.append('tagHeader', tagHeader);
    const request = createFormDataRequest('/api/uploads', 'POST', formData);
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