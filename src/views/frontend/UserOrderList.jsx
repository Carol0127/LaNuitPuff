import { useEffect, useState } from "react";
import { getOrders } from "../../services/cart";
function UserOrderList() {
  const [orders, setOrders] = useState([]);

  // 將時間戳轉換為 YYYY/MM/DD
  const formatDate = (timestamp) => {
    if (!timestamp) return "無日期資料";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const orderStatus = [
    { text: "In Progress / 烘焙中", color: "text-primary", border: "border-primary rounded-0" },
    { text: "In Progress / 配送中", color: "text-info", border: "border-info rounded-0" },
    { text: "Completed / 已送達", color: "text-success", border: "border-success rounded-0" },
    { text: "Pending / 確認訂單中", color: "text-gray-500", border: "border-gray-500 rounded-0" },
  ];

  useEffect(() => {
    const fetchOrderData = async () => {
      const res = await getOrders();
      if (res?.success) {
        setOrders(res.orders);
      }
    };
    fetchOrderData();
  }, []);
  return (
    <>
      <div>
        <h3 className="eng-heading-italic-h1 text-primary mb-28">/ Order List</h3>
        {orders.map((item, index) => {
          const currentStatus = !item.is_paid ? orderStatus[3] : orderStatus[index % (orderStatus.length - 1)];
          return (
            <div
              key={item.id}
              className="bg-white border px-16 py-20 p-lg-32 mb-28"
            >
              <div className="d-flex flex-column  flex-lg-row justify-content-between align-items-lg-center mb-20 mb-lg-24">
                <p className="cn-body-s-regular text-gray-800 mb-16 mb-lg-0">編號{item.id}</p>
                <p className="cn-body-s-regular text-gray-800  mb-16 mb-lg-0">日期 {formatDate(item.paid_date)}</p>
                <span className={`badge border px-12 py-8 cn-label-s ${currentStatus.color} ${currentStatus.border}`}>
                  {currentStatus.text}
                </span>
              </div>
              <ul className="list-unstyled mb-20 mb-lg-24 border-bottom">
                {Object.values(item.products).map((productItem) => (
                  <li
                    className="mb-24 mb-lg-16"
                    key={productItem.id}
                  >
                    <div className="d-flex align-items-center">
                      <div style={{ flexShrink: 0 }}>
                        <img
                          src={productItem.product.imageUrl}
                          className="orderListImg me-16 me-lg-32"
                        />
                      </div>

                      <div className="flex-grow-1">
                        <div className="row align-items-center">
                          {/* 商品名稱 */}
                          <div className="col-12 col-lg-4">
                            <p className="cn-body-s-bold text-primary mb-16 mb-lg-0">{productItem.product.title}</p>
                          </div>

                          {/* 規格、數量、單價 */}
                          <div className="col-12 col-lg-5">
                            <div className="d-lg-flex justify-content-start">
                              <p className="cn-label-m text-gray-800 mb-16 mb-lg-0 me-lg-40">單顆·Solo</p>
                              <p className="cn-label-m text-gray-800 mb-16 mb-lg-0 me-lg-40">數量 {productItem.qty}</p>
                              <p className="cn-label-m text-gray-800 ">單價 {productItem.product.price}</p>
                            </div>
                          </div>

                          {/* 小計金額 */}
                          <div className="col-12 col-lg-3 text-end">
                            <p className="cn-body-l-regular text-primary mb-0 mt-12 mt-lg-0">NT.{productItem.total}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <ul className="list-unstyled mb-0">
                <li className="d-flex justify-content-between mb-24 mb-lg-20">
                  <h4 className="cn-body-s-regular text-gray-800">Subtotal / 小計</h4>
                  <p className="cn-body-s-regular text-gray-800">NT.{item.total}</p>
                </li>
                <li className="d-flex justify-content-between mb-24 mb-lg-24">
                  <h4 className="cn-body-s-regular text-gray-800">Shipping / 運費</h4>
                  <p className="cn-body-s-regular text-gray-800 mb-0">
                    {item.total >= 500 ? <span className="text-success">免運費</span> : "NT.60"}
                  </p>
                </li>
                <li className="d-flex align-items-center justify-content-between">
                  <h3 className="cn-body-s-bold text-primary">Total Amount / 總計</h3>
                  <p className="eng-heading-h3 text-primary">
                    NT.{(item.total + (item.total >= 500 ? 0 : 60)).toLocaleString()}
                  </p>
                </li>
              </ul>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default UserOrderList;
