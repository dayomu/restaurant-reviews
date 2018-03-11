import axios from 'axios';

export const chibbisAPI = axios.create({
  baseURL: 'https://arh.chibbistest.ru/api/',
  timeout: 3000,
  responseType: 'json'
});