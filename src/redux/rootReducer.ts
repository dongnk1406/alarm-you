import {combineReducers} from '@reduxjs/toolkit';
import {commonReducer} from './slices';

const rootReducer = combineReducers({
  common: commonReducer,
});

export default rootReducer;
