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
