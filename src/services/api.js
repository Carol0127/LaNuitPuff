import axios from "axios";

export const env = import.meta.env;
export const { VITE_API_BASE, VITE_API_PATH } = env;

// 1. 前台 API (無需認證)
export const api = axios.create({
  baseURL: VITE_API_BASE,
});

// 2. 後台 API (需要認證)
export const apiAuth = axios.create({
  baseURL: VITE_API_BASE,
});

apiAuth.interceptors.request.use(
  (config) => {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);
