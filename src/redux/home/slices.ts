// https://redux.js.org/tutorials/essentials/part-5-async-logic#reducers-and-loading-actions

import {createSlice} from '@reduxjs/toolkit';
import {isFulfilledAction, isPendingAction, isRejectedAction} from '../types';
import {getListDucksRequest} from './thunks';
import {IHomeState} from './types';

const initialState: IHomeState = {
  listDucks: [],
  loading: false,
  currentRequestId: undefined,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState: initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getListDucksRequest.fulfilled, (state, action: any) => {
        state.listDucks = action.payload;
      })
      .addMatcher(isPendingAction, (state, action) => {
        state.loading = true;
        state.currentRequestId = action.meta.requestId;
      })
      .addMatcher(isFulfilledAction || isRejectedAction, (state, action) => {
        // check duplicate request
        if (state.currentRequestId === action.meta.requestId && state.loading) {
          state.loading = false;
          state.currentRequestId = undefined;
        }
      });
  },
});

export const homeReducer = homeSlice.reducer;

export const {} = homeSlice.actions;
