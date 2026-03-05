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

// 取得商品
export const getProducts = async (page = 1) => {
  try {
    const res = await apiAuth.get(`/api/${VITE_API_PATH}/admin/products?page=${page}`);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// 新增商品
export const addProduct = async (data) => {
  try {
    const res = await apiAuth.post(`/api/${VITE_API_PATH}/admin/product`, { data });
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// 修改商品
export const editProduct = async (id, data) => {
  try {
    const res = await apiAuth.put(`/api/${VITE_API_PATH}/admin/product/${id}`, { data });
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// 刪除商品
export const delProduct = async (id) => {
  try {
    const res = await apiAuth.delete(`/api/${VITE_API_PATH}/admin/product/${id}`);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

// 上傳主圖
export const uploadImg = async (file) => {
  const formData = new FormData();
  formData.append("file-to-upload", file);
  try {
    const res = await apiAuth.post(`/api/${VITE_API_PATH}/admin/upload`, formData);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// 取得文章
export const getArticles = async (page = 1) => {
  try {
    const res = await apiAuth.get(`/api/${VITE_API_PATH}/admin/articles?page=${page}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// 發送文章
export const addArticle = async (data) => {
  try {
    const res = await apiAuth.post(`/api/${VITE_API_PATH}/admin/article`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// 編輯文章
export const editArticle = async (id, data) => {
  try {
    const res = await apiAuth.put(`/api/${VITE_API_PATH}/admin/article/${id}`, data);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};

// 刪除文章
export const delArticle = async (id) => {
  try {
    const res = await apiAuth.delete(`/api/${VITE_API_PATH}/admin/article/${id}`);
    return res.data;
  } catch (error) {
    return error.response.data;
  }
};
