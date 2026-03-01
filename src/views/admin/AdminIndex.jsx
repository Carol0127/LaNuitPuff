import { useEffect, useState } from "react";
import { getOrders } from "../../services/admin";

function AdminIndex() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const res = await getOrders();
      if (res && res.success) {
        setOrders(res.orders || []);
      } else {
        console.error("抓取訂單失敗", res?.message);
      }
    };
    fetchOrders();
  }, []);

  // --- 數據加工區 ---

  // 1. 當月營業額 (比對年份與月份)
  const currentMonth = new Date().toLocaleDateString("zh-TW", { year: "numeric", month: "2-digit" });

  const monthlyRevenue = orders
    .filter((order) => {
      const orderMonth = new Date(order.create_at * 1000).toLocaleDateString("zh-TW", {
        year: "numeric",
        month: "2-digit",
      });
      return orderMonth === currentMonth;
    })
    .reduce((sum, order) => sum + (order.total || 0), 0);

  // 2. 待處理訂單 (未付款)
  const pendingCount = orders.filter((order) => !order.is_paid).length;

  // 3. 近期訂單活動
  const recentOrders = orders.slice(0, 5);

  return (
    <>
      <section className="bg-taupe-200 py-64 mt-80">
        <div className="container mb-40 mb-lg-48">
          <div className="row">
            <h1 className="cn-heading-h4 text-primary mb-28">/ 數據概覽</h1>
            <div className="col-lg-4 mb-24 mb-lg-0">
              <div className="bg-white border px-20 py-28 h-100">
                <span className="material-symbols-outlined align-bottom text-primary mb-12">paid</span>
                <p className="text-primary cn-heading-h5 mb-12">當月營業額</p>
                <p className="text-success cn-body-l-bold mb-12">NT.{monthlyRevenue.toLocaleString()}</p>
                <p className="text-success cn-label-s">
                  平均客單價 NT. {orders.length > 0 ? Math.round(monthlyRevenue / orders.length).toLocaleString() : 0}
                </p>
              </div>
            </div>
            <div className="col-lg-4 mb-24 mb-lg-0">
              <div className="bg-white border px-20 py-28 h-100">
                <span className="material-symbols-outlined align-bottom text-primary mb-12">package_2</span>
                <p className="text-primary cn-heading-h5 mb-12">待處理訂單</p>
                <p className="text-info cn-body-l-bold mb-12">{pendingCount}筆</p>
                <p className="text-info cn-label-s">需優先處理</p>
              </div>
            </div>
            <div className="col-lg-4 mb-24 mb-lg-0">
              <div className="bg-white border px-20 py-28 h-100">
                <span className="material-symbols-outlined align-bottom text-primary mb-12">workspace_premium</span>
                <p className="text-primary cn-heading-h5 mb-12">庫存低點警示</p>
                <p className="text-danger cn-body-l-bold mb-12">3件</p>
                <p className="text-danger cn-label-s">商品即將缺貨</p>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-lg-9 mb-40 mb-lg-0">
              <h2 className="cn-heading-h4 text-primary mb-28">/ 銷售圖表</h2>
              <div className="border bg-white p-24">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam repellat ratione repellendus
                  tenetur, nostrum aut. Aliquam aspernatur officiis, fugit iste eveniet nostrum fuga quasi modi eaque
                  molestias ad commodi saepe.
                </p>
              </div>
            </div>
            <div className="col-lg-3 mb-40 mb-lg-0">
              <h3 className="cn-heading-h4 text-primary mb-28">/ 近期訂單活動</h3>
              <div className="bg-white border p-24">
                <ul className="list-unstyled mb-0">
                  {recentOrders.map((order) => (
                    <li
                      className="mb-24"
                      key={order.id}
                    >
                      <p className="text-primary cn-body-s-regular mb-8">{order.user?.name} 下單了</p>
                      <p className="text-primary cn-body-s-regular mb-8">{order.id}</p>
                      <p className="text-gray-500 cn-label-s">
                        {new Date(order.create_at * 1000).toLocaleDateString()}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminIndex;
