import axios from "axios";

export const env = import.meta.env;
export const { VITE_API_BASE, VITE_API_PATH } = env;

export const api = axios.create({
  baseURL: VITE_API_BASE,
});

// 後台 API（需要認證）
export const apiAuth = axios.create({
  baseURL: VITE_API_BASE,
});
