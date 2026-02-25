import { api } from "./api";
const { VITE_API_PATH } = import.meta.env;

export const getCart = async () => {
  try {
    const res = await api.get(`/api/${VITE_API_PATH}/cart`);
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

export const addCart = async (productId, qty) => {
  const data = {
    data: {
      product_id: productId,
      qty: Number(qty),
    },
  };
  try {
    const res = await api.post(`/api/${VITE_API_PATH}/cart`, data);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const removeItem = async (id) => {
  try {
    const res = await api.delete(`/api/${VITE_API_PATH}/cart/${id}`);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const removeAllItem = async () => {
  try {
    const res = await api.delete(`api/${VITE_API_PATH}/carts`);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const uploadQty = async (cartId, productId, qty) => {
  const data = {
    data: {
      product_id: productId,
      qty: Number(qty),
    },
  };
  try {
    const res = await api.put(`/api/${VITE_API_PATH}/cart/${cartId}`, data);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const createOrder = async (orderData) => {
  try {
    const res = await api.post(`/api/${VITE_API_PATH}/order`, {
      data: orderData,
    });
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};

export const payOrder = async (id) => {
  try {
    const res = await api.post(`/api/${VITE_API_PATH}/pay/${id}`);
    return res.data;
  } catch (error) {
    return error.response?.data;
  }
};
