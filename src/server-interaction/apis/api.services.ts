import axios, { AxiosRequestConfig, Method, AxiosInstance } from 'axios';
import { notRequiredTokenApis, noLoadingApis } from './apis-list';
import {
  checkTokenOnResponse,
  checkTokenInterceptors,
  offLoadingInterceptors,
  onLoadingInterceptors,
} from './interceptors.services';
import { IMethodUrlObject } from '../../@types/ApiServices';

const baseURL = process.env.REACT_APP_BASE_URL;
const axiosInstance: AxiosInstance = axios.create({
  baseURL,
});
const isApiMatch = (
  url: string,
  method: Method,
  testArray: IMethodUrlObject[]
) => {
  return testArray.findIndex(
    (api) =>
      api.url === url && api.method.toLowerCase() === method.toLowerCase()
  );
};
export const callApi = (
  url: string,
  method: Method,
  body?: any,
  requestConfig?: AxiosRequestConfig
) => {
  let tokenInterceptors: number | undefined;
  let tokenOnLoading: number | undefined;
  let tokenOffLoading: number | undefined;
  let tokenCheckResponse: number | undefined;
  if (isApiMatch(url, method, notRequiredTokenApis) < 0) {
    tokenInterceptors = checkTokenInterceptors(axiosInstance);
    tokenCheckResponse = checkTokenOnResponse(axiosInstance);
  }
  if (
    isApiMatch(url, method, noLoadingApis) < 0 &&
    !url.includes('conversations')
  ) {
    tokenOnLoading = onLoadingInterceptors(axiosInstance);
    tokenOffLoading = offLoadingInterceptors(axiosInstance);
  }
  return axiosInstance
    .request({
      url,
      method,
      data: body ? body : {},
      ...requestConfig,
    })
    .finally(() => {
      if (typeof tokenInterceptors === 'number') {
        axiosInstance.interceptors.request.eject(tokenInterceptors);
      }
      if (typeof tokenCheckResponse === 'number') {
        axios.interceptors.response.eject(tokenCheckResponse);
      }
      if (typeof tokenOnLoading === 'number') {
        axiosInstance.interceptors.request.eject(tokenOnLoading);
      }
      if (typeof tokenOffLoading === 'number') {
        axiosInstance.interceptors.request.eject(tokenOffLoading);
      }
    });
};
