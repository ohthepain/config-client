import axios, { AxiosInstance, AxiosResponse, AxiosError } from "axios";

import { useStore } from "../store";

const axiosInstance: AxiosInstance = axios.create();

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError) => {
    console.log(
      "AxiosInterceptor: error",
      error.response?.status,
      error.response?.data,
    );
    if (error.response?.status === 401) {
      useStore.getState().setToken(null);
      console.error("Unauthorized. Redirecting to login page...");
    } else {
      console.error("Error occurred during the request:", error);
    }
    return Promise.reject(error);
  },
);

export default axiosInstance;
