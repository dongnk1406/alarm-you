import {createAsyncThunk} from '@reduxjs/toolkit';
import {getListDucks} from 'src/services/apis';
import {GlobalUIService} from 'src/services/globalUI';

export const getListDucksRequest = createAsyncThunk(
  'home/getListDucks',
  async (_, thunkAPI) => {
    try {
      GlobalUIService.showLoading();
      const response = await getListDucks(thunkAPI.signal);
      return response;
    } catch (error) {
      thunkAPI.rejectWithValue(error);
    } finally {
      GlobalUIService.hideLoading();
    }
  },
);
