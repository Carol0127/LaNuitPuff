import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProducts } from "../../services/products";

const productSlice = createSlice({
  name: "product",
  initialState: {
    productData: [],
    pagination: {},
  },
  reducers: {
    setProductsData: (state, action) => {
      state.productData = action.payload.products;
      state.pagination = action.payload.pagination;
    },
    sortProducts: (state, action) => {
      const order = action.payload;
      if (order === "low") {
        state.productData.sort((a, b) => a.price - b.price);
      } else if (order === "high") {
        state.productData.sort((a, b) => b.price - a.price);
      }
    },
  },
});

export const { setProductsData, sortProducts } = productSlice.actions;
export default productSlice.reducer;

export const fetchProductsAsync = createAsyncThunk("product/fetchProducts", async (arg, { dispatch }) => {
  try {
    const { page = 1, category = "" } = arg || {};
    const res = await getProducts(page, category);

    if (res.success) {
      dispatch(setProductsData(res));
    }
  } catch (error) {
    console.error("抓取商品失敗", error);
  }
});
