import {GenericAbortSignal} from 'axios';
import apiRequest from '../request';

export const getListDucks = async (signal: GenericAbortSignal) => {
  return apiRequest.get('/list', {signal});
};
