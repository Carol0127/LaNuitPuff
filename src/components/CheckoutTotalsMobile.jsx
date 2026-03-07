import { useEffect, useState } from "react";

function CheckouTotalsMobile({ cartData, subtotal, isFreeShipping, shippingCharge, amountToFree, totalAmount }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const offcanvasEl = document.getElementById("mobileCartDetails");
    if (!offcanvasEl) return;

    offcanvasEl.addEventListener("show.bs.offcanvas", () => setIsOpen(true));
    offcanvasEl.addEventListener("hide.bs.offcanvas", () => setIsOpen(false));
  }, []);
  return (
    <>
      <div
        className="offcanvas offcanvas-bottom d-lg-none bg-taupe-200 offcanvas-custom-checkout"
        tabIndex="-1"
        id="mobileCartDetails"
      >
        <div className="offcanvas-header border-top p-20 pb-0">
          <h4 className="eng-heading-italic-h2 text-primary mb-0">Cart Totals</h4>
          <button
            className="btn-close"
            type="button"
            data-bs-dismiss="offcanvas"
          ></button>
        </div>
        <div className="offcanvas-body p-20 pt-16">
          <h3 className="cn-body-s-bold text-primary mb-20">商品明細</h3>
          <ul className="list-unstyled mb-0">
            {cartData.map((item) => (
              <li
                key={item.id}
                className="mb-20 cn-label-m text-gray-800"
              >
                <div className="row gx-2 align-items-center">
                  <div className="col">
                    <span className="d-block">{item.product.title}</span>
                  </div>

                  <div className="col-2 text-center text-nowrap">{item.qty}份</div>

                  <div className="col-4 text-end text-primary-600">NT.{item.final_total}</div>
                </div>
              </li>
            ))}
            <hr className="my-24" />
            <li className="d-flex justify-content-between cn-label-m mb-20">
              <span className="cn-body-s-bold text-primary">小計</span>
              <span className="cn-body-s-regular text-gray-800">NT.{subtotal}</span>
            </li>
            <li className="d-flex justify-content-between cn-label-m mb-16">
              <span className="cn-body-s-bold text-primary">運費</span>
              <span className="cn-body-s-regular text-gray-800">
                {isFreeShipping ? "免運費" : `NT.${shippingCharge}`}
              </span>
            </li>
            <li className="d-flex justify-content-between">
              <p className="text-gray-800 cn-label-s mb-0">全館滿五百免運</p>
              <p className={`cn-label-s mb-0 ${isFreeShipping ? "text-success" : "text-gray-800"}`}>
                {isFreeShipping ? "🎉 已享免運" : `距離免運還差 NT.${amountToFree}`}
              </p>
            </li>
          </ul>
        </div>
      </div>

      {/* 常駐底部金額列 */}
      <div className="fixed-bottom d-lg-none shadow-lg bg-primary text-white fixed-checkout-bar">
        <div className="py-20 px-16">
          <div className="container-fluid p-0">
            <div className="d-flex justify-content-between align-items-center">
              <div
                className="flex-grow-1"
                role="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#mobileCartDetails"
              >
                <div className="d-flex align-items-center mb-8">
                  <span className="cn-body-m-bold me-8">合計 NT.{totalAmount}</span>
                  <span className="material-symbols-outlined fs-6">{isOpen ? "expand_more" : "expand_less"}</span>
                </div>
                <p className="cn-label-m text-blue-300 mb-0">
                  {isFreeShipping ? "🎉 已享免運" : `距離免運還差 NT.${amountToFree}`}
                </p>
              </div>
              <button
                type="submit"
                form="checkout-form"
                className="btn-puff btn-puff-white btn cn-label-l text-primary"
              >
                送出訂單
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CheckouTotalsMobile;
