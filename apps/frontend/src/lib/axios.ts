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
  const interceptor = axios.interceptors.response.use((response) => {
    return response.data
  },
    (error) => {
      if (error.response.status !== 401) {
        return Promise.reject(error);
      }

      /*
       * When response code is 401, try to refresh the token.
       * Eject the interceptor so it doesn't loop in case
       * token refresh causes the 401 response.
        
       * Must be re-attached later on or the token refresh will only happen once
       */
      axios.interceptors.response.eject(interceptor);

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
          return Promise.reject(err);
        })
        .finally(interceptAxios); // re-attach the interceptor
    }
  );
}

interceptAxios();