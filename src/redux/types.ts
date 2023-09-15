// when use in component, remember use dispatch(etc).unwrap() with call request for get full data or error
// https://redux-toolkit.js.org/api/createAsyncThunk#checking-errors-after-dispatching

import {AnyAction, AsyncThunk} from '@reduxjs/toolkit';

export type GenericAsyncThunk = AsyncThunk<unknown, unknown, any>;

export type PendingAction = ReturnType<GenericAsyncThunk['pending']>;
export type RejectedAction = ReturnType<GenericAsyncThunk['rejected']>;
export type FulfilledAction = ReturnType<GenericAsyncThunk['fulfilled']>;

export function isPendingAction(action: AnyAction): action is PendingAction {
  return action.type.endsWith('/pending');
}

export function isRejectedAction(action: AnyAction): action is RejectedAction {
  return action.type.endsWith('/rejected');
}

export function isFulfilledAction(
  action: AnyAction,
): action is FulfilledAction {
  return action.type.endsWith('/fulfilled');
}
