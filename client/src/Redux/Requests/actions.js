import { createAction } from '@reduxjs/toolkit';

export const resetRequest = createAction('requests/reset', (name) => {
  return {
    payload: {
      name: name,
      state: {
        loading: false,
        errors: []
      }
    }
  };
});
