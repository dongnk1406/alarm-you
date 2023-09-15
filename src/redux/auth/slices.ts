import {PayloadAction, createAction, createSlice} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {persistConfig} from '../mmkvStorage';
import reactotron from 'reactotron-react-native';

interface IAuthState {
  loading: boolean;
  userToken: string | null;
  user: {} | null;
}

const initialState: IAuthState = {
  loading: false,
  userToken: null,
  user: null,
};

export const getUserInfoRequest = createAction(
  'getUserInfoRequest',
  (payload?: any, onSuccess?: any, onFailed?: any) => {
    return {
      payload: payload,
      meta: onSuccess,
      error: onFailed,
    };
  },
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    getSignInRequest: (state, action: PayloadAction<any>) => {
      state.userToken = action.payload?.id;
      state.user = action.payload;
    },
    getSignOutRequest: (state, action: PayloadAction<string | null>) => {
      state.userToken = null;
    },
  },
});

export const authReducer = persistReducer(
  persistConfig('auth'),
  authSlice.reducer,
);

export const {getSignInRequest, getSignOutRequest} = authSlice.actions;
