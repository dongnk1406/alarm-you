import axios from 'axios';

const request = axios.create({
  baseURL: 'https://some-domain.com/api/',
  timeout: 15000,
  headers: {'X-Custom-Header': 'foobar'},
});

export default request;
