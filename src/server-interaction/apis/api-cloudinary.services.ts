import axios from "axios";
import {offLoadingInterceptors, onLoadingInterceptors} from "./interceptors.services";

const baseURL = process.env.REACT_APP_CLOUDINARY_URL as string;

export const axiosCloudinary = axios.create({
    baseURL
});

onLoadingInterceptors(axiosCloudinary);
offLoadingInterceptors(axiosCloudinary);
