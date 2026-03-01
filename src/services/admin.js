import { api, apiAuth, VITE_API_PATH } from "./api";

// 首次登入
export const login = async (data) => {
  try {
    const res = await api.post(`/admin/signin`, data);
    const { token, expired } = res.data;
    document.cookie = `hexToken=${token}; expires=${new Date(expired)}; path=/`;
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// 驗證登入
export const checkLogin = async () => {
  try {
    const res = await apiAuth.post("/api/user/check");
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// 取得訂單
export const getOrders = async (page = 1) => {
  try {
    const res = await apiAuth.get(`/api/${VITE_API_PATH}/admin/orders?page=${page}`);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// 刪除訂單
export const delOrder = async (id) => {
  try {
    const res = await apiAuth.delete(`/api/${VITE_API_PATH}/admin/order/${id}`);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// 刪除全部訂單
export const delAllOrder = async () => {
  try {
    const res = await apiAuth.delete(`/api/${VITE_API_PATH}/admin/orders/all`);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// 修改訂單
export const editOrder = async (id, orderData) => {
  try {
    const res = await apiAuth.put(`/api/${VITE_API_PATH}/admin/order/${id}`, orderData);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};
