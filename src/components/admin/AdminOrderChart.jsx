import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useState } from "react";

// 註冊 Chart.js 組件
ChartJS.register(ArcElement, Tooltip, Legend);

function AdminOrderChart({ orders = [] }) {
  // 讓管理後台可以切換「數量」或「金額」視角
  const [viewMode, setViewMode] = useState("qty");

  // --- 1. 數據清洗與統計 ---
  const productMap = {};
  orders.forEach((order) => {
    // 透過 Object.values 拆解 Firebase 的產品物件結構
    const productList = Object.values(order.products || {});
    productList.forEach((item) => {
      const name = item.product?.title || "未知名稱";
      // 根據切換狀態決定累加 數量 或 金額
      const val = viewMode === "qty" ? Number(item.qty) || 0 : Number(item.final_total) || 0;
      productMap[name] = (productMap[name] || 0) + val;
    });
  });

  // --- 2. 排序與 Top 5 合併邏輯 ---
  const sortedProducts = Object.entries(productMap).sort((a, b) => b[1] - a[1]);
  const top5 = sortedProducts.slice(0, 5);
  const othersSum = sortedProducts.slice(5).reduce((sum, item) => sum + item[1], 0);

  const labels = top5.map((item) => item[0]);
  const data = top5.map((item) => item[1]);

  if (othersSum > 0) {
    labels.push("其他品項");
    data.push(othersSum);
  }

  const totalDisplay = data.reduce((a, b) => a + b, 0);

  // --- 3. 視覺配色 (使用妳提供的品牌規範色號) ---
  const laNuitPalette = [
    "#011242", // Primary 600
    "#011549", // Primary 500
    "#5C6FA3", // Primary 400
    "#9AA9CC", // Primary 300
    "#C9D1E3", // Primary 200
    "#E5E5E5", // Neutral 200
  ];

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: laNuitPalette,
        borderColor: "#ffffff",
        borderWidth: 2,
        hoverOffset: 15,
      },
    ],
  };

  return (
    <>
      <div className="container-fluid p-0">
        <div
          className="btn-group btn-group-sm"
          role="group"
        >
          <button
            type="button"
            className={`btn ${viewMode === "qty" ? "btn-primary" : "btn-outline-primary"}`}
            style={{ borderRadius: "0" }}
            onClick={() => setViewMode("qty")}
          >
            數量
          </button>
          <button
            type="button"
            className={`btn ${viewMode === "amount" ? "btn-primary" : "btn-outline-primary"}`}
            style={{ borderRadius: "0" }}
            onClick={() => setViewMode("amount")}
          >
            金額
          </button>
        </div>
      </div>

      <div className="row align-items-center">
        <div
          className="col-md-7"
          style={{ height: "320px", position: "relative" }}
        >
          <Doughnut
            data={chartData}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: { display: false },
              },
            }}
          />
        </div>

        <div className="col-md-5">
          <ul className="list-unstyled mb-0">
            {labels.map((label, index) => (
              <li
                key={label}
                className="d-flex justify-content-between align-items-center border-bottom py-12"
                style={{ fontSize: "14px" }}
              >
                <div className="d-flex align-items-center">
                  <span
                    style={{
                      display: "inline-block",
                      width: "8px",
                      height: "8px",
                      backgroundColor: laNuitPalette[index],
                      marginRight: "10px",
                    }}
                  ></span>
                  <span className="text-primary">{label}</span>
                </div>
                <span
                  className="fw-bold"
                  style={{ color: "#011242" }}
                >
                  {viewMode === "qty" ? `${data[index]} 份` : `$${data[index].toLocaleString()}`}
                </span>
              </li>
            ))}

            {/* 總計列 */}
            <li className="d-flex justify-content-between pt-3">
              <span className="fw-bold">總計</span>
              <span
                className="fw-bold text-primary"
                style={{ fontSize: "1.2rem" }}
              >
                {viewMode === "qty" ? `${totalDisplay} 份` : `NT$ ${totalDisplay.toLocaleString()}`}
              </span>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default AdminOrderChart;
