import { removeItem, uploadQty } from "../services/cart";

const CartTable = ({ cartData, getCartData }) => {
  const handleRemoveItem = async (id) => {
    const res = await removeItem(id);
    if (res.success) {
      alert("已刪除商品");
      getCartData();
    } else {
      alert(`刪除失敗：${res.message}`);
    }
  };

  const handleUpdateQty = async (item, newQty) => {
    if (newQty < 1) return; // 防止數量小於 1
    const res = await uploadQty(item.id, item.product_id, newQty);
    if (res?.success) {
      // 成功後呼叫父元件傳進來的重新取得資料函式 (例如前面說的 getCartData)
      getCartData();
    } else {
      alert("更新失敗");
    }
  };

  return (
    <div className="cart-container mb-32">
      <div className="cart-header d-none d-lg-flex row g-0 text-white bg-primary py-12 px-16">
        <div className="col-lg-5 cn-body-m-bold">產品</div>
        <div className="col-lg-2 cn-body-m-bold text-center">規格</div>
        <div className="col-lg-2 cn-body-m-bold text-center">數量</div>
        <div className="col-lg-2 cn-body-m-bold text-end">小計</div>
        <div className="col-lg-1"></div>
      </div>

      <div className="mobile-cart-header d-lg-none bg-primary text-white py-12 px-16 cn-body-m-bold">產品</div>

      <div className="cart-body bg-white border border-top-0">
        {cartData.map((item) => (
          <div
            key={item.id}
            className="cart-item row g-0 py-24 px-16 border-bottom"
          >
            {/* 產品欄位 - 手機版 col-12 會自動換行 */}
            <div className="col-12 col-lg-5 d-flex align-items-center mb-16 mb-lg-0">
              <div className="product-img me-16">
                <img
                  src={item.product.imageUrl}
                  alt={item.product.title}
                  className="w-100 h-100 object-fit-cover"
                />
              </div>
              <div className="product-info">
                <h5 className="cn-body-m-regular text-primary mb-16">{item.product.title}</h5>
                <p className="cn-body-s text-gray-600 mb-0">NT.{item.product.price}</p>
              </div>
            </div>

            {/* 規格 */}
            <div className="col-12 col-lg-2 d-flex justify-content-between justify-content-lgnter align-items-center mb-16  mb-lg-0">
              <span className="d-lg-none cn-body-s-regular text-gray-500">規格</span>
              <select className="form-select cn-body-m-regular text-primary w-auto">
                <option value="solo">單顆·Solo</option>
                <option
                  disabled
                  value="box"
                >
                  6入禮盒·Collection
                </option>
              </select>
            </div>

            {/* 數量 */}
            <div className="col-12 col-lg-2 d-flex justify-content-between justify-content-lg-center align-items-center mb-16  mb-lg-0">
              <span className="d-lg-none cn-body-s-regular text-gray-500">數量</span>
              <div className="qty-control d-flex align-items-center">
                <button
                  className="btn border-0 p-8"
                  onClick={() => handleUpdateQty(item, item.qty - 1)}
                >
                  <span className="material-symbols-outlined align-bottom text-primary">remove</span>
                </button>
                <span className="mx-12 cn-body-m-regular text-primary">{item.qty}</span>
                <button className="btn border-0 p-8">
                  <span
                    className="material-symbols-outlined align-bottom text-primary"
                    onClick={() => handleUpdateQty(item, item.qty + 1)}
                  >
                    add
                  </span>
                </button>
              </div>
            </div>

            {/* 小計 */}
            <div className="col-12 col-lg-2 d-flex justify-content-between justify-content-lg-end align-items-center mb-16 mb-lg-0">
              <span className="d-lg-none cn-body-s-regular text-gray-500">小計</span>
              <span className="cn-body-m-regular text-primary">NT.{item.total}</span>
            </div>

            {/* 刪除按鈕 */}
            <div className="col-12 col-lg-1 d-flex justify-content-end align-items-center  mb-lg-0 text-end">
              <button className="btn btn-delete p-0">
                <span
                  className="material-symbols-outlined align-bottom text-primary"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  delete
                </span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CartTable;
