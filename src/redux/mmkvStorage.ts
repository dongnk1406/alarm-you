import {PersistConfig, Storage} from 'redux-persist';
import {MMKV} from 'react-native-mmkv';

const storage = new MMKV();

const mmkvStorage: Storage = {
  setItem: (key, value) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: key => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: key => {
    storage.delete(key);
    return Promise.resolve();
  },
};

export const persistConfig = (key: string, params?: PersistConfig<any>) => ({
  key,
  version: 1,
  storage: mmkvStorage,
  timeout: 0,
  ...params,
});

export default mmkvStorage;
