import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import CartStep from "../../components/CartStep";
import { createOrderAsync, fetchCartAsync, selectCartSummary } from "../../store/slices/cartSlice";
import TwCitySelector from "tw-city-selector";
import Swal from "sweetalert2";
import { payOrder } from "../../services/cart";
import { useNavigate } from "react-router";
import { NavLink } from "react-router";
import CheckouTotalsMobile from "../../components/CheckoutTotalsMobile";

function Checkout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cartData } = useSelector((state) => state.cart);
  const { subtotal, isFreeShipping, shippingCharge, amountToFree, totalAmount } = useSelector(selectCartSummary);

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const copyBuyerInfo = () => {
    const currentValues = getValues();
    setValue("name", currentValues.buyerName, { shouldValidate: true });
    setValue("tel", currentValues.buyerTel, { shouldValidate: true });
    setValue("email", currentValues.buyerEmail, { shouldValidate: true });
  };

  useEffect(() => {
    new TwCitySelector({
      el: "#tw-selector",
      elCounty: "#county", // 縣市 select 的 id
      elDistrict: "#district", // 鄉鎮 select 的 id
      bootstrapStyle: false, // 關閉套件自帶樣式
    });

    const handleSelectChange = () => {
      const county = document.getElementById("county").value;
      const district = document.getElementById("district").value;
      setValue("city", county, { shouldValidate: true });
      setValue("district", district, { shouldValidate: true });
    };

    const el = document.getElementById("tw-selector");
    el.addEventListener("change", handleSelectChange);

    return () => el.removeEventListener("change", handleSelectChange);
  }, [setValue]);

  const onSubmit = async (data) => {
    const orderData = {
      user: {
        name: data.name,
        email: data.email,
        tel: data.tel,
        address: `${data.city}${data.district}${data.address}`,
      },
      message: `${data.note || "無"}`,
    };

    const result = await dispatch(createOrderAsync(orderData));

    if (createOrderAsync.fulfilled.match(result) && result.payload.success) {
      const orderId = result.payload.orderId;
      const payRes = await payOrder(orderId);
      if (payRes.success) {
        reset();
        navigate(`/checkout-success/${orderId}`); // 跳轉
      } else {
        Swal.fire("訂單已成立但付款失敗", payRes.message, "warning");
      }
    } else {
      Swal.fire("訂單送出失敗", result.payload?.message || "請檢查欄位", "error");
    }
  };

  return (
    <>
      <section className="bg-taupe-200 mt-80 mt-lg-100 py-64 py-lg-80">
        <div className="container">
          <div className="row  align-items-start">
            <h1 className="eng-display-xl text-primary mb-32">/ Your Cart</h1>
            <CartStep step={2} />
            <div className="col-lg-8">
              <form
                id="checkout-form"
                onSubmit={handleSubmit(onSubmit)}
              >
                <div className="mb-24 p-24 bg-white border">
                  <div className="row ">
                    <h3 className="cn-body-xl-bold text-blue-400 mb-20 mb-lg-28">訂購人資訊</h3>

                    <div className="col-lg-6 mb-lg-0 mb-20">
                      <label
                        htmlFor="buyerName"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        訂購人名稱
                      </label>
                      <input
                        id="buyerName"
                        {...register("buyerName", {
                          required: "請輸入姓名",
                          minLength: { value: 2, message: "姓名至少 2 個字" },
                        })}
                        className={`form-control  ${errors.name ? "border-danger" : "border-primary"}`}
                        placeholder="請輸入姓名"
                      />
                      {errors.buyerName && <p className="text-danger cn-label-s mt-8">{errors.buyerName.message}</p>}
                    </div>
                    <div className="col-lg-6 mb-20 mb-lg-28">
                      <label
                        htmlFor="buyerTel"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        訂購人電話
                      </label>
                      <input
                        id="buyerTel"
                        type="tel"
                        {...register("buyerTel", {
                          required: "請輸入電話",
                          minLength: { value: 8, message: "電話至少 8 碼" },
                          pattern: {
                            value: /^\d+$/,
                            message: "電話僅能輸入數字",
                          },
                        })}
                        className={`form-control  ${errors.tel ? "border-danger" : "border-primary"}`}
                        placeholder="0912345678"
                      />
                      {errors.buyerTel && <p className="text-danger cn-label-s mt-8">{errors.buyerTel.message}</p>}
                    </div>
                    <div className="col">
                      <label
                        htmlFor="buyerEmail"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        訂購人電子信箱
                      </label>
                      <input
                        id="buyerEmail"
                        {...register("buyerEmail", {
                          required: "請輸入電子信箱",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email 格式不正確",
                          },
                        })}
                        className={`form-control  ${errors.name ? "border-danger" : "border-primary"}`}
                        placeholder="請輸入電子信箱"
                      />
                      {errors.buyerEmail && <p className="text-danger cn-label-s mt-8">{errors.buyerEmail.message}</p>}
                    </div>
                  </div>
                </div>

                <div className="mb-24 p-20 p-lg-40 bg-blue-100">
                  <h5 className="cn-body-m-bold text-primary mb-20">配送狀態查詢</h5>
                  <ol className="mb-0 ps-16 cn-body-s-regular text-gray-800">
                    <li>點選「會員中心」之「訂單查詢」，點選訂單編號，即可查看訂單配送狀態</li>
                    <li>如訂單狀態已進入「準備出貨」，恕無法更改訂單</li>
                    <li>如訂購之商品無法順利出貨或缺貨，我們將以 Email 或電話主動通知您</li>
                  </ol>
                </div>

                <div className="mb-24 p-24 bg-white border">
                  <div className="row ">
                    <div className="d-flex justify-content-between align-items-center mb-28">
                      <h3 className="cn-body-xl-bold text-blue-400 ">寄送資訊</h3>
                      <button
                        type="button"
                        className="btn-puff btn-puff-outline btn-puff-cn-m cn-label-m-regular text-primay"
                        onClick={copyBuyerInfo}
                      >
                        同訂購人資料
                      </button>
                    </div>
                    <div className="col-lg-6 mb-20 mb-lg-28">
                      <label
                        htmlFor="name"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        收件人名稱
                      </label>
                      <input
                        id="name"
                        {...register("name", {
                          required: "請輸入姓名",
                          minLength: { value: 2, message: "姓名至少 2 個字" },
                        })}
                        className={`form-control  ${errors.name ? "border-danger" : "border-primary"}`}
                        placeholder="請輸入姓名"
                      />
                      {errors.name && <p className="text-danger cn-label-s mt-8">{errors.name.message}</p>}
                    </div>
                    <div className="col-lg-6 mb-20 mb-lg-28">
                      <label
                        htmlFor="tel"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        收件人電話
                      </label>
                      <input
                        id="tel"
                        type="tel"
                        {...register("tel", {
                          required: "請輸入電話",
                          minLength: { value: 8, message: "電話至少 8 碼" },
                          pattern: {
                            value: /^\d+$/,
                            message: "電話僅能輸入數字",
                          },
                        })}
                        className={`form-control  ${errors.tel ? "border-danger" : "border-primary"}`}
                        placeholder="0912345678"
                      />
                      {errors.tel && <p className="text-danger cn-label-s mt-8">{errors.tel.message}</p>}
                    </div>
                    <div className="col mb-20 mb-lg-28">
                      <label
                        htmlFor="email"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        收件人電子信箱
                      </label>
                      <input
                        id="email"
                        {...register("email", {
                          required: "請輸入電子信箱",
                          pattern: {
                            value: /^\S+@\S+$/i,
                            message: "Email 格式不正確",
                          },
                        })}
                        className={`form-control  ${errors.name ? "border-danger" : "border-primary"}`}
                        placeholder="請輸入電子信箱"
                      />
                      {errors.email && <p className="text-danger cn-label-s mt-8">{errors.email.message}</p>}
                    </div>
                    <div
                      className="row "
                      id="tw-selector"
                    >
                      <div className="col-lg-6 mb-20 mb-lg-28 ">
                        <label className="cn-label-m mb-8 mb-lg-16 text-primary ">縣市</label>
                        <select
                          id="county"
                          className="form-select border-0 border-bottom border-gray-500 rounded-0"
                        ></select>
                        <input
                          type="hidden"
                          {...register("city", { required: "請選擇縣市" })}
                        />
                        {/* 錯誤訊息 */}
                        {(errors.city || errors.district) && (
                          <p className="text-danger cn-label-s mt-8">請完整選擇配送地區</p>
                        )}
                      </div>

                      <div className="col-lg-6 mb-20 mb-lg-28">
                        <label className="cn-label-m mb-8 mb-lg-16 text-primary ">鄉鎮地區</label>
                        <select
                          id="district"
                          className="form-select border-0 border-bottom border-gray-500 rounded-0"
                        ></select>
                        <input
                          type="hidden"
                          {...register("district", { required: "請選擇鄉鎮" })}
                        />
                      </div>
                    </div>
                    {/* 詳細地址 */}
                    <div className="col-12">
                      <label className="cn-label-m mb-8 mb-lg-16 text-primary d-block">地址</label>
                      <input
                        {...register("address", { required: "請輸入詳細地址" })}
                        className={`form-control border-0 border-bottom rounded-0 bg-transparent px-0 pb-8 ${
                          errors.address ? "border-danger" : "border-primary"
                        }`}
                        placeholder="請輸入詳細地址"
                      />
                    </div>
                  </div>
                </div>
                <div className="mb-24 p-24 bg-white border">
                  <h3 className="cn-body-xl-bold text-blue-400 mb-20 mb-lg-28">訂單備註</h3>
                  <textarea
                    {...register("note")}
                    className="form-control border  p-12 shadow-none"
                    id="orderNote"
                    rows="5"
                    placeholder="如有宅配或包裝需求可填寫，備註：泡芙皆為純手工製作恕無法協助客製化"
                  ></textarea>
                </div>
                <div className=" p-24 bg-white border">
                  <h3 className="cn-body-xl-bold text-blue-400 mb-20 mb-lg-28">付款方式</h3>

                  <div className="d-lg-flex">
                    <div className="form-check mb-16 mb-lg-16 me-16">
                      <input
                        {...register("paymentMethod", { required: "請選擇付款方式" })}
                        className="form-check-input "
                        type="radio"
                        value="creditCard"
                        id="payCreditCard"
                      />
                      <label
                        className="form-check-label cn-label-m text-gray-800"
                        htmlFor="payCreditCard"
                      >
                        信用卡付款
                      </label>
                    </div>
                    <div className="form-check mb-16 mb-lg-16 me-16">
                      <input
                        {...register("paymentMethod", { required: "請選擇付款方式" })}
                        className="form-check-input "
                        type="radio"
                        value="applePay"
                        id="applePay"
                      />
                      <label
                        className="form-check-label cn-label-m text-gray-800"
                        htmlFor="applePay"
                      >
                        Apple Pay
                      </label>
                    </div>
                    <div className="form-check mb-16 mb-lg-16 ">
                      <input
                        {...register("paymentMethod", { required: "請選擇付款方式" })}
                        className="form-check-input"
                        type="radio"
                        value="cod" // Cash on Delivery
                        id="payCOD"
                      />
                      <label
                        className="form-check-label cn-label-m text-gray-800"
                        htmlFor="payCOD"
                      >
                        貨到付款
                      </label>
                    </div>
                  </div>

                  {/* 錯誤訊息 */}
                  {errors.paymentMethod && (
                    <p className="text-danger cn-label-s mt-8">{errors.paymentMethod.message}</p>
                  )}
                </div>
              </form>
              <CheckouTotalsMobile
                cartData={cartData}
                subtotal={subtotal}
                isFreeShipping={isFreeShipping}
                shippingCharge={shippingCharge}
                amountToFree={amountToFree}
                totalAmount={totalAmount}
              />
            </div>

            <div
              className="col-lg-4 sticky-lg-top d-none d-lg-block"
              style={{ top: "124px" }}
            >
              <div className="p-24 bg-white border border-1">
                <h3 className="eng-heading-italic-h2 text-primary mb-28">Cart Totals</h3>
                <div className="mb-24">
                  <h4 className="cn-body-s-bold text-primary mb-24">商品明細</h4>
                  <ul className="cn-label-s list-unstyled  border-1 border-bottom mb-24">
                    {cartData.map((item) => {
                      return (
                        <li
                          key={item.id}
                          className="row g-0 align-items-center mb-24"
                        >
                          <div className="col-4">
                            <p className="mb-0 ">{item.product.title}</p>
                          </div>

                          <div className="col-4 text-center">
                            <p className="mb-0 ">單顆·Solo</p>
                          </div>

                          <div className="col-2 text-center">
                            <p className="mb-0">{item.qty}份</p>
                          </div>

                          <div className="col-2 text-end">
                            <p className="mb-0 ">NT.{item.final_total}</p>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                  <ul className="list-unstyled order-1 border-bottom mb-24">
                    <li className="d-flex justify-content-between mb-24">
                      <h4 className="cn-body-s-bold text-primary ">小計</h4>
                      <p className="cn-body-s">NT.{subtotal}</p>
                    </li>
                    <li className="d-flex justify-content-between mb-16">
                      <h4 className="cn-body-s-bold text-primary ">運費</h4>
                      <p className={`cn-body-s mb-0 ${isFreeShipping ? "text-success" : "text-gray-800"}`}>
                        {isFreeShipping ? "免運費" : `NT.${shippingCharge}`}
                      </p>
                    </li>
                    <li className="d-flex justify-content-between mb-24">
                      <p className="text-gray-800 cn-label-s mb-0">全館滿五百免運</p>
                      <p className={`cn-label-s mb-0 ${isFreeShipping ? "text-success" : "text-gray-800"}`}>
                        {isFreeShipping ? "🎉 已享免運" : `距離免運還差 NT.${amountToFree}`}
                      </p>
                    </li>
                  </ul>
                  <div className="d-flex justify-content-between">
                    <p className="cn-body-s-bold text-primary">合計</p>
                    <p className="cn-body-s-regular text-gray-800">NT.{totalAmount}</p>
                  </div>
                </div>
                <div>
                  <NavLink
                    className="w-100 mb-16"
                    to="/cart"
                  >
                    <button className="w-100 btn-puff btn-puff-outline btn-puff-cn-m cn-label-m ">返回購物車</button>
                  </NavLink>
                  <button
                    type="submit"
                    form="checkout-form"
                    className="btn-puff btn-puff-primary btn-puff-cn-m cn-label-m w-100"
                  >
                    送出訂單
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Checkout;
