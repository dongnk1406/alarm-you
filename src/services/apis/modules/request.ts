import axios, {AxiosError} from 'axios';
export const API_DEV_URL = 'https://random-d.uk/api/v2';

const apiRequest = axios.create({
  baseURL: API_DEV_URL,
});

// Add a request interceptor
apiRequest.interceptors.request.use(
  async config => {
    config.url = config.baseURL! + config.url;
    // const accessToken = store.getState().auth.token;
    // const locale = store.getState().common.language || 'en';
    config.timeout = 15000;
    config.headers.Accept = `application/json`;
    config.headers['Content-Type'] = `multipart/form-data`;
    config.headers['X-Requested-With'] = 'XMLHttpRequest';
    // config.headers['locale'] = locale;
    // if (accessToken) {
    //   config.headers.Authorization = accessToken;
    // }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  },
);

// Add a response interceptor
apiRequest.interceptors.response.use(
  response => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    try {
      return response?.data;
    } catch (error) {
      return Promise.reject(error);
    }
  },
  error => {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error

    // const token = state?.auth?.user?.token;
    // if (error.response?.status === 401 && token) {
    //   store.dispatch(getLogoutRequest());
    //   return;
    // }
    console.error(error);
    return Promise.reject(error);
  },
);

export default apiRequest;
