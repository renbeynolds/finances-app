import { combineReducers } from 'redux';
import accountReducer from './Accounts/reducer.js';
import tagReducer from './Tags/reducer.js';

export const rootReducer = combineReducers({
    tags: tagReducer,
    accounts: accountReducer
});