import { useState } from "react";
import { useNavigate } from "react-router";

const policies = [
  {
    id: "privacy",
    engLabel: "/ Privacy Policy",
    cnTitle: "隱私權政策",
    sections: [
      {
        title: "個人資料蒐集",
        content: [
          "本站蒐集之個人資料包含：姓名、電子郵件、配送地址、聯絡電話及訂單相關資訊。",
          "資料僅用於訂單處理、配送安排及客服聯繫，不會販售或提供予第三方。",
          "您可隨時來信要求查詢、更正或刪除個人資料。",
        ],
      },
      {
        title: "Cookie 使用",
        content: [
          "本站使用 Cookie 以提升瀏覽體驗，包含記憶購物車內容及分析網站流量。",
          "您可透過瀏覽器設定拒絕 Cookie，但部分功能可能因此受限。",
        ],
      },
      {
        title: "資料安全",
        content: [
          "本站採用 SSL 加密傳輸，確保您的個人資料在傳輸過程中受到保護。",
          "如有任何隱私相關問題，請聯繫 service@lanuitpuff.com",
        ],
      },
    ],
  },
  {
    id: "return",
    engLabel: "/ Return Policy",
    cnTitle: "退換貨政策",
    sections: [
      {
        title: "退換貨條件",
        content: [
          "因食品安全考量，泡芙商品一經出貨恕不接受退換貨，敬請見諒。",
          "若收到商品有明顯破損或品質異常，請於收貨後 24 小時內附上照片聯繫客服。",
          "經確認為商品瑕疵，將安排補寄或退款，不需退回原商品。",
        ],
      },
      {
        title: "退款方式",
        content: [
          "退款將於確認後 7 個工作天內退回原付款帳戶。",
          "信用卡退款依各家銀行作業時間，約需 7–14 個工作天入帳。",
        ],
      },
    ],
  },
  {
    id: "shipping",
    engLabel: "/ Shipping Policy",
    cnTitle: "配送政策",
    sections: [
      {
        title: "配送範圍與時間",
        content: [
          "目前提供全台灣本島冷鏈宅配，離島地區暫不提供服務。",
          "訂單於週一至週五 12:00 前成立，隔日配送；12:00 後訂單則於後天配送。",
          "週末及國定假日不出貨，請提前安排訂購時間。",
        ],
      },
      {
        title: "運費說明",
        content: [
          "單筆訂單滿 NT$1,500 免運費，未滿則收取運費 NT$150。",
          "冷鏈配送需有人簽收，請確認收件時間與地址，若無人簽收需重新安排配送，將酌收 NT$100 處理費。",
        ],
      },
      {
        title: "配送注意事項",
        content: [
          "泡芙收到後請立即冷藏，並於 3 天內食用完畢，風味最佳。",
          "配送過程中若因不可抗力因素（如天災、道路中斷）導致延誤，本站將盡速通知並協助處理。",
        ],
      },
    ],
  },
  {
    id: "terms",
    engLabel: "/ Terms of Use",
    cnTitle: "使用條款",
    sections: [
      {
        title: "服務使用規範",
        content: [
          "本網站所有內容，包含文字、圖片、商標及設計，均受著作權法保護，未經授權不得轉載或使用。",
          "使用者不得以任何方式干擾本站正常運作，或從事任何違法行為。",
        ],
      },
      {
        title: "訂單成立與取消",
        content: [
          "訂單送出後即視為成立，如需取消請於 2 小時內聯繫客服。",
          "超過 2 小時後訂單已進入備貨流程，恕無法取消。",
          "本站保留因不可抗力因素取消訂單之權利，並將全額退款。",
        ],
      },
      {
        title: "免責聲明",
        content: [
          "本站商品圖片僅供參考，實際商品以收到為準，外觀可能因手工製作而略有差異。",
          "本站不對因網路問題、設備因素或不可抗力所造成之損失負責。",
        ],
      },
    ],
  },
];

function Policy() {
  const [active, setActive] = useState("privacy");
  const navigate = useNavigate();
  const current = policies.find((p) => p.id === active);

  return (
    <>
      {/* Hero */}
      <section className="bg-primary pt-120 pb-64">
        <div className="container">
          <p className="eng-heading-italic-h5 text-secondary mb-12">/ Legal & Policies</p>
          <h1 className="cn-display-s text-taupe-200">服務條款與政策</h1>
        </div>
      </section>

      {/* 內容 */}
      <section className="bg-taupe-200 py-64 py-lg-120">
        <div className="container">
          <div className="row">
            {/* 左側導航 */}
            <div className="col-lg-3 mb-32 mb-lg-0">
              <ul className="list-unstyled">
                {policies.map((p) => (
                  <li key={p.id}>
                    <button
                      className={`btn rounded-0 border-0 p-0 text-start w-100 py-16 border-bottom cn-body-s-regular ${
                        active === p.id ? "text-secondary" : "text-gray-800"
                      }`}
                      style={{ borderColor: "var(--bs-secondary) !important" }}
                      onClick={() => setActive(p.id)}
                    >
                      <span className="eng-label-s text-secondary d-block mb-4">{p.engLabel}</span>
                      <span
                        className={active === p.id ? "cn-body-m-bold text-primary" : "cn-body-s-regular text-gray-800"}
                      >
                        {p.cnTitle}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-lg-1 d-none d-lg-block" />

            {/* 右側內容 */}
            <div className="col-lg-8">
              <div className="pb-32 mb-40 border-bottom border-secondary">
                <p className="eng-heading-italic-h5 text-secondary mb-8">{current.engLabel}</p>
                <h2 className="cn-heading-h2 text-primary">{current.cnTitle}</h2>
              </div>

              {current.sections.map((section, i) => (
                <div
                  key={i}
                  className={`${i < current.sections.length - 1 ? "mb-40 pb-40 border-bottom border-secondary" : ""}`}
                >
                  <h3 className="cn-body-m-bold text-primary mb-20">{section.title}</h3>
                  <ul className="list-unstyled">
                    {section.content.map((item, j) => (
                      <li
                        key={j}
                        className="d-flex gap-12 mb-12 cn-body-s-regular text-gray-800"
                      >
                        <span className="text-secondary flex-shrink-0">—</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              <div className="mt-64 pt-40 border-top border-secondary">
                <button
                  className="btn-puff btn-puff-outline btn-puff-eng-m eng-label-m d-flex align-items-center gap-8"
                  onClick={() => navigate(-1)}
                >
                  <span className="material-symbols-outlined align-bottom">arrow_left_alt</span>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Policy;
