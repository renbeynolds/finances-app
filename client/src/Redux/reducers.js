import { combineReducers } from 'redux';
import tagReducer from './Tags/reducer.js';

export const rootReducer = combineReducers({
    tags: tagReducer
});