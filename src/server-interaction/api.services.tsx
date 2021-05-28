import axios, {AxiosRequestConfig, Method, AxiosInstance} from "axios";
import {IMethodUrlObject} from "../@types/ApiServices";

const {NODE_ENV, REACT_APP_BASE_URL_DEV, REACT_APP_BASE_URL_BUILD, REACT_APP_BASE_URL_TEST} = process.env;
const baseURL = NODE_ENV === "development" ? REACT_APP_BASE_URL_DEV : NODE_ENV === "production" ? REACT_APP_BASE_URL_BUILD : REACT_APP_BASE_URL_TEST;
const axiosInstance: AxiosInstance = axios.create({
    baseURL,
});
const checkTokenInterceptors = () => {
    return axiosInstance.interceptors.request.use((config) => {
        let cancelToken = axios.CancelToken;
        if (!localStorage.getItem("authToken")) {
            config.cancelToken = new cancelToken((cancel) => cancel("No token provided"));
        }
        if (localStorage.getItem("authToken")) {
            config.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem("authToken") as string)}`
        }
        console.log(config.headers)
        return config;
    }, (error) => {
        return Promise.reject((error));
    })
}
export const callApi = (url: string, method: Method, body?: any, requestConfig?: AxiosRequestConfig) => {
    const notRequiredTokenApis: IMethodUrlObject[] = [{url: "/login", method: "POST"}];
    const checkRequiredToken = notRequiredTokenApis.findIndex((api) => api.url === url && api.method.toLowerCase() === method.toLowerCase());
    let tokenInterceptors: number | undefined;
    if (checkRequiredToken === -1) {
        tokenInterceptors = checkTokenInterceptors();
    }
    return axiosInstance.request({
        url,
        method,
        data: body ? body : {},
        ...requestConfig,
    }).finally(() => {
        if (typeof tokenInterceptors === "number") {
            axiosInstance.interceptors.request.eject(tokenInterceptors);
        }
    })

}