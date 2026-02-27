import { useEffect } from "react";
import CartStep from "../../components/CartStep";
import CartTable from "../../components/CartTable";
import PopularCardSwiper from "../../components/PopularCardSwiper";
import { NavLink } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartAsync, selectCartSummary } from "../../store/slices/cartSlice";
import { useCartActions } from "../../hooks/useCartActions";
function Cart() {
  const { clearCartWithConfirm } = useCartActions();
  const dispatch = useDispatch();

  const { cartData } = useSelector((state) => state.cart);
  const { subtotal, isFreeShipping, shippingCharge, amountToFree, totalAmount } = useSelector(selectCartSummary);

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  return (
    <>
      {cartData.length > 0 ? (
        <>
          <section className="bg-taupe-200 mt-80 mt-lg-100 py-64 py-lg-80">
            <div className="container">
              <div className="row">
                <h1 className="eng-display-xl text-primary mb-32">/ Your Cart</h1>
                <CartStep step={1} />
                <CartTable
                  getCartData={() => dispatch(fetchCartAsync())}
                  cartData={cartData}
                />
                <div className="mb-32 d-lg-flex justify-content-between align-items-center">
                  <p className="mb-24 mb-lg-0 cn-body-s-regular text-primary">有優惠券？別忘記使用了</p>
                  <div className="d-flex ">
                    <input
                      type="text"
                      className="form-control bg-transparent border-0 eng-label-m text-primary me-12 me-lg-20"
                      placeholder="Coupang"
                    />

                    <button
                      className="btn-puff btn-puff-outline btn-puff-eng-m   eng-label-m"
                      type="button"
                    >
                      Apply
                    </button>
                  </div>
                </div>
                <div className="p-12">
                  <div className="bg-white border border-1 mb-32 py-28 px-16">
                    <h3 className="eng-heading-italic-h2 text-primary mb-28">Cart Totals</h3>
                    <ul className="list-unstyled ">
                      <li className="d-flex justify-content-between mb-24">
                        <p className="text-primary cn-body-s-bold mb-0">小計</p>
                        <p className="text-gray-800 cn-body-s mb-0">NT.{subtotal}</p>
                      </li>
                      <li className="d-flex justify-content-between mb-8">
                        <p className="text-primary cn-body-s-bold mb-0">運費</p>
                        <p className={`cn-body-s mb-0 ${isFreeShipping ? "text-success" : "text-gray-800"}`}>
                          {isFreeShipping ? "免運費" : `NT.${shippingCharge}`}
                        </p>
                      </li>

                      <li className="d-flex justify-content-between pb-24 border-bottom mb-24">
                        <p className="text-gray-600 cn-label-s mb-0">全館滿五百免運</p>
                        <p className={`cn-label-s mb-0 ${isFreeShipping ? "text-success" : "text-gray-500"}`}>
                          {isFreeShipping ? "🎉 已享免運" : `距離免運還差 NT.${amountToFree}`}
                        </p>
                      </li>
                      <li className="d-flex justify-content-between ">
                        <p className="text-primary cn-body-s-bold mb-0">合計</p>
                        <p className="text-primary cn-body-s-regular mb-0">NT.{totalAmount}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="d-flex flex-column flex-lg-row justify-content-end">
                  <button
                    className="btn-puff btn-puff-outline btn-puff-cn-m mb-24 mb-lg-0 me-lg-24 w-auto"
                    onClick={clearCartWithConfirm}
                  >
                    清空購物車
                  </button>
                  <NavLink
                    className=" w-lg-auto"
                    to="/checkout"
                  >
                    <button className="w-100 btn-puff btn-puff-primary btn-puff-cn-m">前往結帳</button>
                  </NavLink>
                </div>
              </div>
            </div>
          </section>
          <section className="position-relative overflow-hidden container-fluid pe-0 py-64 py-lg-80 bg-primary">
            <p className="collection">Collection Collection</p>
            <div className="container">
              <div className="row">
                <h2 className="text-center text-lg-start eng-display-xl text-taupe-200 mb-40 mb-lg-56">Popular</h2>
                <PopularCardSwiper />
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          <section
            className="bg-taupe-200 mt-80 mt-lg-100 py-64 py-lg-120 d-flex align-items-center justify-content-center "
            style={{ minHeight: "63vh" }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-md-6 text-center">
                  <div className="mb-32">
                    <span
                      className="material-symbols-outlined text-gray-400"
                      style={{ fontSize: "120px", opacity: 0.6 }}
                    >
                      shopping_basket
                    </span>
                  </div>

                  {/* 文字提示 */}
                  <h2 className="cn-heading-h2 text-primary mb-16">您的購物車目前是空的</h2>
                  <p className="cn-body-m-regular text-gray-600 mb-40">
                    似乎還沒有選購任何泡芙呢？
                    <br />
                    快去挑選一些美味填充您的生活吧！
                  </p>

                  {/* 引導按鈕 */}
                  <NavLink
                    to="/products"
                    className="btn-puff btn-puff-primary btn-puff-cn-m px-48"
                  >
                    回到商店
                  </NavLink>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
}

export default Cart;
