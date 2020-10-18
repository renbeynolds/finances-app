import { combineReducers } from 'redux';
import accountReducer from './Accounts/reducer';
import requestReducer from './Requests/reducer';
import tagReducer from './Tags/reducer';
import transactionReducer from './Transactions/reducer';

export const rootReducer = combineReducers({
  tags: tagReducer,
  accounts: accountReducer,
  transactions: transactionReducer,
  requests: requestReducer
});