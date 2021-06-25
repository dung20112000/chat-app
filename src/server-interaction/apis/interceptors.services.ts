import axios, { AxiosInstance } from 'axios';
import store from '../../redux/store';
import { notifyFailed } from '../../helpers/functions/notify.helper';
import {
  onLoading,
  offLoading,
} from '../../redux/actions/loading.actions.redux';

let currentRequests = 0;
let responseCount = 0;
export const checkTokenInterceptors = (axiosInstance: AxiosInstance) => {
  return axiosInstance.interceptors.request.use(
    (config) => {
      let cancelToken = axios.CancelToken;
      if (!localStorage.getItem('authToken')) {
        config.cancelToken = new cancelToken((cancel) =>
          cancel('No token provided')
        );
      }
      if (localStorage.getItem('authToken')) {
        config.headers.Authorization = `Bearer ${JSON.parse(
          localStorage.getItem('authToken') as string
        )}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const checkTokenOnResponse = (axiosInstance: AxiosInstance) => {
  return axiosInstance.interceptors.response.use(
    (response) => {
      console.log(response);
      return response;
    },
    (error) => {
      if (error && error.response) {
        const {
          response: {
            data: { errors },
          },
        } = error;
        if (errors && errors.length > 0) {
          for (const serverError of errors) {
            const { field } = serverError;
            if (field === 'authToken') {
              window.location.href =
                process.env.REACT_APP_LOCAL_URL + '/authenticate/login';
            }
          }
        }
      }
      return Promise.reject(error);
    }
  );
};

export const onLoadingInterceptors = (axiosInstance: AxiosInstance) => {
  return axiosInstance.interceptors.request.use(
    (config) => {
      currentRequests += 1;
      store.dispatch(onLoading());
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
};

export const offLoadingInterceptors = (axiosInstance: AxiosInstance) => {
  return axiosInstance.interceptors.response.use(
    (response) => {
      if (response) {
        currentRequests -= 1;
      }
      if (currentRequests <= 0) {
        store.dispatch(offLoading());
      }
      return response;
    },
    (error) => {
      if (error) {
        currentRequests = -1;
        if (currentRequests <= 0) {
          store.dispatch(offLoading());
        }
        return Promise.reject(error);
      }
    }
  );
};
