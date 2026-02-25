import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { addCart, createOrder, getCart, removeAllItem, removeItem, uploadQty } from "../../services/cart";
import { SuccessToast, ErrorToast } from "../../components/Toast";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartData: [],
    final_total: 0,
  },
  reducers: {
    setCart: (state, action) => {
      state.cartData = action.payload.carts;
      state.final_total = action.payload.final_total;
    },
  },
});

export const { setCart } = cartSlice.actions;
export default cartSlice.reducer;

// --- Thunks ---
// 1. 取得購物車
export const fetchCartAsync = createAsyncThunk("cart/fetchCart", async (_, { dispatch }) => {
  try {
    const res = await getCart();
    if (res.success) {
      dispatch(setCart(res.data));
    }
  } catch {
    ErrorToast.fire({
      title: "讀取失敗",
      text: "無法取得清單，請檢查網路連線",
    });
  }
});

// 2. 加入購物車
export const addToCartAsync = createAsyncThunk("cart/addToCart", async ({ id, qty }, { dispatch }) => {
  try {
    const res = await addCart(id, qty);
    if (res && res.success) {
      SuccessToast.fire({
        title: "已加入購物車",
        text: `成功加入 ${qty} 個甜點`,
      });
      dispatch(fetchCartAsync());
    } else {
      ErrorToast.fire({
        title: "加入失敗",
        text: res?.message || "商品可能已售完",
      });
    }
  } catch {
    ErrorToast.fire({
      title: "系統錯誤",
      text: "連線不穩定，請稍後再試",
    });
  }
});

// 3. 刪除物品
export const removeItemAsync = createAsyncThunk("cart/removeItemAsync", async ({ id }, { dispatch }) => {
  try {
    const res = await removeItem(id);
    if (res && res.success) {
      SuccessToast.fire({
        title: "已刪除物品",
      });
      dispatch(fetchCartAsync());
    } else {
      ErrorToast.fire({
        title: "刪除失敗",
        text: res?.message || "請檢查網路狀態",
      });
    }
  } catch {
    ErrorToast.fire({
      title: "系統錯誤",
      text: "無法連接伺服器",
    });
  }
});

// 4.清空購物車
export const removeAllItemAsync = createAsyncThunk("cart/removeAllItem", async (_, { dispatch }) => {
  try {
    const res = await removeAllItem();

    if (res.success) {
      SuccessToast.fire({
        title: "購物車已清空",
      });
      dispatch(fetchCartAsync());
    } else {
      ErrorToast.fire({
        title: "清空失敗",
        text: res.message || "請稍後再試",
      });
    }
  } catch {
    ErrorToast.fire({
      title: "系統錯誤",
      text: "無法連接伺服器",
    });
  }
});

// 5. 更新數量
export const updateQtyAsync = createAsyncThunk("cart/updateQty", async ({ cartId, productId, qty }, { dispatch }) => {
  try {
    const res = await uploadQty(cartId, productId, qty);
    if (res && res.success) {
      dispatch(fetchCartAsync());
    } else {
      ErrorToast.fire({
        title: "更新失敗",
        text: res?.message || "數量變更未成功",
      });
    }
  } catch {
    ErrorToast.fire({
      title: "系統錯誤",
      text: "無法連接伺服器，請稍後再試",
    });
  }
});

// 6.運費邏輯
export const selectCartSummary = (state) => {
  const { cartData, final_total } = state.cart;

  const SHIPPING_THRESHOLD = 500;
  const SHIPPING_FEE = 60;

  const subtotal = final_total;
  const isFreeShipping = subtotal >= SHIPPING_THRESHOLD;
  const shippingCharge = cartData.length > 0 && !isFreeShipping ? SHIPPING_FEE : 0;
  const amountToFree = Math.max(0, SHIPPING_THRESHOLD - subtotal);
  const totalAmount = subtotal + shippingCharge;

  return {
    subtotal,
    isFreeShipping,
    shippingCharge,
    amountToFree,
    totalAmount,
    SHIPPING_THRESHOLD,
  };
};

// 7.送出訂單
export const createOrderAsync = createAsyncThunk("cart/createOrder", async (orderData, { dispatch }) => {
  try {
    const response = await createOrder(orderData);
    if (response.success) {
      dispatch(fetchCartAsync());
      return response;
    }
  } catch {
    ErrorToast.fire({
      title: "系統錯誤",
      text: "無法連接伺服器，請稍後再試",
    });
  }
});
