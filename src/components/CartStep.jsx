import React from "react";

const CartStep = ({ step = 1 }) => {
  const steps = [
    { id: 1, label: "購物車內容" },
    { id: 2, label: "填寫資料及付款方式" },
    { id: 3, label: "訂購完成" },
  ];

  return (
    <div className="cart-step-container d-flex align-items-center justify-content-between mb-32 ">
      {steps.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className={`step-node d-flex align-items-center ${step >= item.id ? "active" : ""}`}>
            <div className="step-circle me-12">
              <span className="step-circle-text">{item.id}</span>
            </div>
            <span className="step-label cn-label-m">{item.label}</span>
          </div>

          {index < steps.length - 1 && <div className={`step-line ${step > item.id ? "active" : ""}`}></div>}
        </React.Fragment>
      ))}
    </div>
  );
};
export default CartStep;
