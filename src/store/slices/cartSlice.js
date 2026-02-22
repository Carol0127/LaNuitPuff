import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCart, getCart } from "../../services/cart";
import Toast from "../../components/Toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: [],
    final_total: 0,
  },
  //actions
  reducers: {
    setCart: (state, action) => {
      state.cartData = action.payload.carts;
      state.final_total = action.payload.final_total;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;

export const fetchCartAsync = createAsyncThunk("cart/fetchCart", async (_, { dispatch }) => {
  try {
    const res = await getCart();
    if (res.success) {
      dispatch(setCart(res.data));
    }
  } catch (error) {
    console.error("抓取購物車失敗", error);
  }
});

export const addToCartAsync = createAsyncThunk("cart/addToCart", async ({ id, qty }, { dispatch }) => {
  const res = await addCart(id, qty);
  if (res.success) {
    Toast.fire({
      icon: "success",
      title: `已加入購物車`,
      text: `成功加入 ${qty} 個甜點`,
    });
    dispatch(fetchCartAsync());
  } else {
    Toast.fire({
      icon: "error",
      title: "加入失敗",
      text: res.message || "請稍後再試",
    });
  }
});
