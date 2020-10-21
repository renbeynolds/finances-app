import { combineReducers } from 'redux';
import accountReducer from './Accounts/reducer';
import filterReducer from './Filters/reducer';
import requestReducer from './Requests/reducer';
import tagReducer from './Tags/reducer';
import transactionReducer from './Transactions/reducer';
import uploadReducer from './Uploads/reducer';

export const rootReducer = combineReducers({
  tags: tagReducer,
  accounts: accountReducer,
  transactions: transactionReducer,
  uploads: uploadReducer,
  filters: filterReducer,
  requests: requestReducer
});