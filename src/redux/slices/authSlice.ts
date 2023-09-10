import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {persistConfig} from '../mmkvStorage';

interface IAuthState {
  userToken: string | null;
}

const initialState: IAuthState = {
  userToken: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    setUserToken: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
    setSignIn: (state, action: PayloadAction<string>) => {
      state.userToken = action.payload;
    },
    setSignOut: (state, action: PayloadAction<string | null>) => {
      state.userToken = null;
    },
  },
});

export const authReducer = persistReducer(
  persistConfig('auth'),
  authSlice.reducer,
);

export const {setUserToken, setSignIn, setSignOut} = authSlice.actions;
