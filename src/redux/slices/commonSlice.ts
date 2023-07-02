import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {ELanguage} from 'src/shared/interfaces';
import {persistConfig} from '../mmkvStorage';

interface ICommonState {
  language: ELanguage;
}

const initialState: ICommonState = {
  language: ELanguage.ENGLISH,
};

export const commonSlice = createSlice({
  name: 'common',
  initialState: initialState,
  reducers: {
    updateLanguage: (state, action: PayloadAction<ELanguage>) => {
      state.language = action.payload;
    },
  },
});

export const commonReducer = persistReducer(
  persistConfig('common'),
  commonSlice.reducer,
);

export const {updateLanguage} = commonSlice.actions;
