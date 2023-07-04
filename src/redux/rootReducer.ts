import {combineReducers} from '@reduxjs/toolkit';
import {authReducer, commonReducer} from './slices';

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
});

export default rootReducer;
