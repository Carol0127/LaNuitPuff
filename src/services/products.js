import { api } from "./api";
const { VITE_API_PATH } = import.meta.env;

/*首頁熱門商品 (限定 4 筆)*/
export const getPopularProducts = async () => {
  try {
    const res = await api.get(`/api/${VITE_API_PATH}/products/all`);
    const allProducts = res.data.products;
    const shuffled = [...allProducts].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, 4);
  } catch (error) {
    console.log(error);
  }
};

// 取得商品
export const getProducts = async (page = 1, category = "") => {
  try {
    const res = await api.get(`/api/${VITE_API_PATH}/products`, {
      params: { page, category },
    });
    return res.data;
  } catch (error) {
    console.log(error);
  }
};

/* 取得單一商品細節 */
export const getProductById = async (id) => {
  try {
    const res = await api.get(`/api/${VITE_API_PATH}/product/${id}`);
    return res.data.product;
  } catch (error) {
    console.log("取得單一商品失敗", error);
  }
};
