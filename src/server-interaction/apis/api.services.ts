import axios, {AxiosRequestConfig, Method, AxiosInstance} from "axios";
import {notRequiredTokenApis} from "./apis-list";
import {
    checkTokenInterceptors,
    offLoadingInterceptors,
    onLoadingInterceptors
} from "./interceptors.services";

const baseURL = process.env.REACT_APP_BASE_URL;
const axiosInstance: AxiosInstance = axios.create({
    baseURL,
});
onLoadingInterceptors(axiosInstance);
offLoadingInterceptors(axiosInstance);
export const callApi = (
    url: string,
    method: Method,
    body?: any,
    requestConfig?: AxiosRequestConfig
) => {
    const checkRequiredToken = notRequiredTokenApis.findIndex(
        (api) =>
            api.url === url && api.method.toLowerCase() === method.toLowerCase()
    );


    let tokenInterceptors: number | undefined;
    if (checkRequiredToken === -1) {
        tokenInterceptors = checkTokenInterceptors(axiosInstance);
    }
    return axiosInstance
        .request({
            url,
            method,
            data: body ? body : {},
            ...requestConfig,
        })
        .finally(() => {
            if (typeof tokenInterceptors === "number") {
                axiosInstance.interceptors.request.eject(tokenInterceptors);
            }
        });
};
