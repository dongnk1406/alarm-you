import {combineReducers} from '@reduxjs/toolkit';
import {commonReducer} from './slices';
import {homeReducer} from './home/slices';
import {authReducer} from './auth';

const rootReducer = combineReducers({
  common: commonReducer,
  auth: authReducer,
  home: homeReducer,
});

export default rootReducer;
