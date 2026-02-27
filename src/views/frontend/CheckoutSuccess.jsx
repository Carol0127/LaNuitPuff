import { useParams, NavLink } from "react-router";
import CartStep from "../../components/CartStep";

function CheckoutSuccess() {
  const { orderId } = useParams();

  return (
    <>
      <section className="bg-taupe-200  mt-80 mt-lg-100 py-64 py-lg-80">
        <div className="container">
          <div className="row">
            <h1 className="eng-display-xl text-primary mb-32">/ Completed</h1>
            <CartStep step={3} />
            <h2 className="cn-heading-h1 text-primary text-center mb-24">您的訂單已成功送出！烘焙即將開始</h2>
            <p className="cn-body-m-regular text-primary text-center mb-20">
              每一顆泡芙都將承載著 La Nuit 的心意開始製作。請準備好愉快的心情，迎接泡芙！
            </p>
            <p className="cn-body-m-bold text-primary text-center mb-32">Order ID{orderId}</p>
            <div className="d-flex justify-content-center">
              <NavLink
                to="/user"
                className="btn-puff btn-puff-outline btn-puff-cn-l cn-label-l me-20"
              >
                訂單追蹤
              </NavLink>
              <NavLink
                to="/products"
                className="btn-puff btn-puff-primary btn-puff-cn-l cn-label-l"
              >
                繼續購物
              </NavLink>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default CheckoutSuccess;
