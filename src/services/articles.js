import { api, VITE_API_PATH } from "./api";

export const getArticles = async (page = 1) => {
  try {
    const res = await api.get(`/api/${VITE_API_PATH}/articles?page=${page}`);
    return res.data.articles;
  } catch (error) {
    return error.response?.data;
  }
};

export const getArticleById = async (id) => {
  try {
    const res = await api.get(`/api/${VITE_API_PATH}/article/${id}`);
    return res.data.article;
  } catch (error) {
    return error.response?.data;
  }
};
