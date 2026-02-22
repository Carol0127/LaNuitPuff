import { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router";
import { getProductById } from "../../services/products";

import QtyInput from "../../components/QtyInput";
import ProductDetailSwiper from "../../components/ProductDetailSwiper";
import PopularCardSwiper from "../../components/PopularCardSwiper";
import { handleAddToCart } from "../../hooks/handleAddToCart";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  const [spec, setSpec] = useState("solo");
  const [iconfill, setIconFill] = useState(false);

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    getProductById(id).then((data) => {
      if (data) {
        setProduct(data);
      }
    });
  }, [id]);

  const [activeTab, setActiveTab] = useState("storage"); // 預設保存方式
  const tabs = [
    { id: "storage", label: "保存方式", engLabel: "Storage" },
    { id: "delivery", label: "配送方式", engLabel: "Delivery" },
    { id: "faq", label: "常見問題", engLabel: "Q&A" },
  ];

  if (!product) {
    return (
      <div className="container mt-100 d-flex justify-content-center">
        <div
          className="spinner-border text-primary"
          role="status"
        >
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="container mt-80 mb-28 mb-xl-0 mt-xl-80 py-xl-80">
        <div className="row">
          <div className="px-0 px-lg-12 col-xl-8  mb-28 mb-xl-0">
            <ProductDetailSwiper product={product} />
          </div>
          <div className="col-xl-4  d-flex flex-column justify-content-between">
            <nav
              aria-label="breadcrumb"
              className="mb-24 mb-xl-0"
            >
              <ol className="breadcrumb">
                <li className="breadcrumb-item cn-label-m text-gray-800">
                  <NavLink to="/">Home</NavLink>
                </li>
                <li className="breadcrumb-item cn-label-m text-gray-800">
                  <NavLink to="/products">Product</NavLink>
                </li>
                <li
                  className="breadcrumb-item cn-label-m text-secondary active"
                  aria-current="page"
                >
                  {product.category}
                </li>
              </ol>
            </nav>
            <div className="mb-24 mb-lg-0">
              <p className="eng-label-m text-primary mb-4">{product.category}</p>
              <div className="d-flex align-items-center justify-content-between">
                <h1 className="cn-heading-h1 text-primary ">{product.title}</h1>
                <button className="btn border-0">
                  <span
                    className="material-symbols-outlined text-primary align-bottom cursor-pointer"
                    style={{
                      fontVariationSettings: iconfill ? "'FILL' 1" : "'FILL' 0",
                    }}
                    onClick={() => setIconFill(!iconfill)}
                  >
                    favorite
                  </span>
                </button>
              </div>
            </div>
            <h3 className="cn-body-s-regular mb-24 mb-xl-0">{product.content}</h3>
            <h2 className="productPrice text-primary mb-24 mb-xl-0">NT.{product.price}</h2>
            <div>
              <p className="cn-label-m mb-16 text-gray-800">規格</p>
              <button
                className={`btn-puff btn-puff-outline btn-puff-cn-m me-xl-12 mb-16 mb-xl-0 ${spec === "solo" ? "active" : ""}`}
                onClick={() => setSpec("solo")}
              >
                單顆·Solo
              </button>
              <button
                className="btn-puff btn-puff-outline btn-puff-cn-m mb-16 mb-xl-0"
                disabled
              >
                6入禮盒·Collection
              </button>
            </div>
            <div>
              <p className="cn-label-m mb-16 text-gray-800">數量</p>
              <div className="d-flex flex-column flex-lg-row align-items-center mb-16">
                <QtyInput
                  value={quantity}
                  onChange={setQuantity}
                />
                <button
                  className="w-100 eng-label-l btn-puff-yellow btn-puff-eng-l btn-puff"
                  onClick={() => handleAddToCart(product.id, quantity)}
                >
                  Add To Cart
                </button>
              </div>
            </div>
            <NavLink to="/cart">
              <button
                className="w-100 eng-label-l btn-puff-outline btn-puff-eng-l btn-puff"
                onClick={() => handleAddToCart(product.id, quantity)}
              >
                Buy It Now
              </button>
            </NavLink>
          </div>
        </div>
      </section>

      <section className="container py-64 pb-lg-80 pt-lg-40 border-top">
        <div className="row mt-60">
          {/* 左側：側邊導航 */}
          <div className="col-lg-3 mb-40 mb-lg-0">
            <ul className="list-unstyled">
              {tabs.map((tab) => (
                <li
                  key={tab.id}
                  className="mb-12"
                >
                  <button
                    type="button"
                    className={`sidebar-tab-item ${activeTab === tab.id ? "active" : ""}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div className="d-flex align-items-center justify-content-between">
                      <span className="cn-body-m-bold">{tab.label}</span>
                      <span className="material-symbols-outlined fs-5 arrow-icon">chevron_right</span>
                    </div>
                    <span className="eng-label-s d-block opacity-50">{tab.engLabel}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* 右側：內容區塊 */}
          <div className="col-lg-8 offset-lg-1">
            <div className="tab-content">
              {/* 1. Storage */}
              {activeTab === "storage" && (
                <div className="animate-fadeIn">
                  <div className="info-block mb-48">
                    <h4 className="cn-body-m-bold text-primary mb-16 d-flex align-items-center">
                      <span className="material-symbols-outlined me-12 text-secondary">schedule</span>
                      最佳賞味與新鮮堅持 / Freshness
                    </h4>
                    <p className="cn-body-m-regular text-gray-700 lh-lg ps-36">
                      我們建議在收到商品後的 <strong className="text-secondary">6 小時內</strong>{" "}
                      享用，這是口感最巔峰的時刻。若未立即食用，請務必密封冷藏，並於 24 小時內食用完畢。
                    </p>
                  </div>
                  <div className="info-block mb-48">
                    <h4 className="cn-body-m-bold text-primary mb-16 d-flex align-items-center">
                      <span className="material-symbols-outlined me-12 text-secondary">ac_unit</span>
                      冷凍保存與口感變化 / Storage
                    </h4>
                    <p className="cn-body-m-regular text-gray-700 lh-lg ps-36">
                      收到後立即放入密封袋內置於冷凍庫，最多可保存 3 日。冷凍後的內餡會轉化為如 Gelato
                      般的絲滑綿密。提醒您：家用冰箱易有食材異味，強烈建議使用真空盒或雙層密封袋保存。
                    </p>
                  </div>
                  <div className="info-block">
                    <h4 className="cn-body-m-bold text-primary mb-16 d-flex align-items-center">
                      <span className="material-symbols-outlined me-12 text-secondary">oven_gen</span>
                      專業級回烤復甦術 / Revival
                    </h4>
                    <p className="cn-body-m-regular text-gray-700 lh-lg ps-36">
                      若外殼受潮變軟，可將烤箱預熱至 180°C，關火後利用餘溫回烤 2-3 分鐘。出爐後請置於常溫 1
                      分鐘，待外殼遇冷空氣收縮定型，即可找回脆度。
                    </p>
                  </div>
                </div>
              )}

              {/* 2. Delivery */}
              {activeTab === "delivery" && (
                <div className="animate-fadeIn">
                  <div className="info-block mb-48">
                    <h4 className="cn-body-m-bold text-primary mb-16 d-flex align-items-center">
                      <span className="material-symbols-outlined me-12 text-secondary">local_shipping</span>
                      全程 -18°C 冷凍低溫宅配 / Logistics
                    </h4>
                    <p className="cn-body-m-regular text-gray-700 lh-lg ps-36">
                      嚴選「黑貓宅急便」低溫物流。單筆消費滿 <strong className="text-secondary">NT.2,000</strong>{" "}
                      即享免運，未達門檻則統一收取 NT.180 運費（含專業防撞包材）。
                    </p>
                  </div>
                  <div className="info-block">
                    <h4 className="cn-body-m-bold text-primary mb-16 d-flex align-items-center">
                      <span className="material-symbols-outlined me-12 text-secondary">calendar_month</span>
                      接單現做：出貨排程說明 / Schedule
                    </h4>
                    <p className="cn-body-m-regular text-gray-700 lh-lg ps-36">
                      所有訂單皆為「付款後開始製作」。訂單成立後約 3-5 個工作天內依序出貨。如遇節慶物流量大，建議提前 10
                      日訂購。
                    </p>
                  </div>
                </div>
              )}

              {/* 3. FAQ */}
              {activeTab === "faq" && (
                <div className="animate-fadeIn">
                  <div className="info-block mb-48">
                    <h4 className="cn-body-m-bold text-primary mb-16 d-flex align-items-center">
                      <span className="material-symbols-outlined me-12 text-secondary">quiz</span>
                      收到包裹時商品有受損怎麼辦？ / Assistance
                    </h4>
                    <p className="cn-body-m-regular text-gray-700 lh-lg ps-36">
                      若發現外盒嚴重毀損，請於「收到當日」拍照留存並透過官方 LINE
                      聯繫，我們承諾將第一時間為您辦理補寄或退款。
                    </p>
                  </div>
                  <div className="info-block">
                    <h4 className="cn-body-m-bold text-primary mb-16 d-flex align-items-center">
                      <span className="material-symbols-outlined me-12 text-secondary">egg_alt</span>
                      過敏原與成分透明化 / Ingredients
                    </h4>
                    <p className="cn-body-m-regular text-gray-700 lh-lg ps-36">
                      僅使用法國發酵奶油、日本麵粉、殺菌蛋液與大溪地香草籽。本產品含有
                      <strong className="text-secondary-dark">蛋、奶類與麩質穀物</strong>，不建議過敏者食用。
                    </p>
                  </div>
                </div>
              )}
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
  );
}

export default ProductDetail;
