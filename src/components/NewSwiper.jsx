import { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
function NewSwiper() {
  const newsData = [
    {
      id: 1,
      title: "深夜微光：台北快閃店登陸",
      desc: "La Nuit PUFF 將於信義區展開為期一週的「深夜出口」快閃計畫。現場將限量供應「酸甜告白系」新品，邀請你在忙碌的歸途，帶走一份專屬的慰藉。現場拍照分享即贈限定小禮。",
      date: "2025.09.12",
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553966402.jpg?raw=true",
    },
    {
      id: 2,
      title: "大人味的深夜對話：品酒組限定 85 折",
      desc: "即日起至本月底，凡購買「成熟苦甜系」威士忌焦糖泡芙兩入，即可享有 85 折優惠。讓陳年的酒香與焦糖的苦韻，陪伴你與靈魂進行一場最誠實的對話。",
      date: "2025.10.05",
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E6%88%90%E7%86%9F%E8%8B%A6%E7%94%9C%E7%B3%BB/%E5%A8%81%E5%A3%AB%E5%BF%8C%E7%84%A6%E7%B3%96%E6%B3%A1%E8%8A%99/lanuit-1768122185329.jpg?raw=true",
    },
    {
      id: 3,
      title: "夜貓專屬：凌晨下單免運優惠",
      desc: "致所有捨不得結束這一天的人。凡於每日凌晨 00:00 - 04:00 間下單，結帳輸入優惠碼「MIDNIGHT」，不限金額享免運優惠。讓提神夜貓系的深焙香氣，成為你隔日醒來的動力。",
      date: "2025.11.20",
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553929390.jpg?raw=true",
    },
    {
      id: 4,
      tag: "節日禮盒",
      title: "年末巨獻：對抗平庸的驚喜禮物",
      desc: "「La Nuit 全系列典藏禮盒」預購正式開啟。集結五大系列經典口味，包含爆漿驚喜系的強烈衝擊。在年末之際，用一份濃郁的流心，犒賞這一整年不曾放棄的自己。",
      date: "2025.12.01",
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553993875.jpg?raw=true",
    },
  ];
  const swiperRef = useRef(null);
  return (
    <>
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={true}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="newSwiper"
      >
        {newsData.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="row g-0 align-items-stretch">
              <div className="col-lg-7 position-relative">
                <img
                  src={item.img}
                  alt={item.title}
                />
              </div>

              {/* 右側文字區：col-lg-7 */}
              <div className="col-lg-5 d-flex justify-content-center  bg-taupe-200 py-lg-40 py-20 px-16 ">
                <div className="newsText">
                  <h4 className="text-primary cn-heading-h4 mb-12">{item.title}</h4>
                  <p className="cn-body-m-regular text-gray-800 mb-12">{item.desc}</p>

                  <div className="d-flex justify-content-between align-items-center">
                    <span className="text-primary text-primary cn-body-s">{item.date}</span>

                    <div className="d-flex flex-row gap-3">
                      <button
                        className="btn border-0 p-0 primary"
                        onClick={() => swiperRef.current?.slidePrev()}
                      >
                        <span className="material-symbols-outlined text-primary align-bottom">arrow_left_alt</span>
                      </button>
                      <button
                        className="btn border-0 p-0 primary"
                        onClick={() => swiperRef.current?.slideNext()}
                      >
                        <span className="material-symbols-outlined text-primary align-bottom">arrow_right_alt</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default NewSwiper;
