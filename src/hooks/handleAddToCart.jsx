import { addCart } from "../services/cart";

export const handleAddToCart = async (id, count) => {
  const res = await addCart(id, count);
  if (res.success) {
    alert("已加入購物車！");
  } else {
    alert(`加入失敗：${res.message}`);
  }
};
