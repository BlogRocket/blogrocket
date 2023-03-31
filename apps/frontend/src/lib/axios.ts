import { refreshAuth } from '@/features/auth';
import storage from '@/utils/storage';
import Axios from 'axios';

export const axios = Axios.create({
  baseURL: 'http://localhost:3000/api/v0',
});

axios.interceptors.request.use((config) => {
  const token = storage.getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  config.headers.Accept = 'application/json';
  return config;
});


const interceptAxios = () => {
  const interceptor = axios.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      axios.interceptors.response.eject(interceptor);
      
      console.log('Refreshing ...')
      return refreshAuth({ refresh: storage.getToken('refresh') })
        .then(async (response) => {
          storage.setToken(response.data.access);
          storage.setToken(response.data.refresh, 'refresh');
          error.response.config.headers.Authorization = `Bearer ${response.data.access}`;
          const res = await axios.request(error.response.config);
          return res.data;
        })
        .catch((err) => {
          storage.clearToken();
          storage.clearToken('refresh');
          window.location.reload();
          return Promise.reject(err);
        })
        .finally(interceptAxios); // re-attach the interceptor
    }
  );
}

interceptAxios();
