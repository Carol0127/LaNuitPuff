import { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";

function PuffSeriesSwiper() {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);
  const puffSeries = [
    {
      title: "甜蜜擁抱系",
      subTitle: "那些沒說出口的委屈，就讓甜味替你溫柔地包裹起來",
      desc: "有些時候，我們不需要解決問題的力量，只需要一個不帶批判的擁抱。選用純粹奶香與經典食材，像是微涼深夜，為靈魂披上一件剛烘乾的羊毛毯。",
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553914215.jpg?raw=true",
    },
    {
      title: "提神夜貓系",
      subTitle: "燈還亮著，是因為靈魂還在深夜裡尋找出口",
      desc: "獻給為了理想熬夜、或捨不得結束這一天的人。用高濃度可可與深焙咖啡的焦香，陪伴你在凌晨三點，與靈感進行一場深度的對話。",
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553929390.jpg?raw=true",
    },
    {
      title: "酸甜告白系",
      subTitle: "所有關於你的往事，都在深夜的酸甜裡重新顯影",
      desc: "憶有時是覆盆子的酸，有時是白巧克力的甜。用莓果與花香的清爽感，讓沈重的心事在舌尖冷靜下來，留下如霧般朦朧的餘味。",
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553966402.jpg?raw=true",
    },
    {
      title: "成熟苦甜系",
      subTitle: "成人世界的辛酸，只有經過陳年的酒與茶最懂",
      desc: "獻給理解「生活不易」的大人們。不提供廉價的快樂，而是將威士忌、紅酒與抹茶的苦韻轉化為優雅，陪你敬這難熬的人生",
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770554293006.jpg?raw=true",
    },
    {
      title: "爆漿驚喜系",
      subTitle: "生活太沈悶？那就用驚喜來對抗平庸吧",
      desc: "當外殼崩塌，內餡如岩漿般流出，那是壓抑一整天後最徹底的情緒釋放。專治夜晚的無趣，用濃郁的流心在口中綻放一場華麗的冒險。",
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553993875.jpg?raw=true",
    },
  ];
  return (
    <>
      <div className="col-lg-5 ps-lg-0 mb-24 mb-lg-0 d-flex flex-column justify-content-center border-start border-primary">
        <div className="text-content-wrapper px-lg-28">
          <div className="d-flex justify-content-between align-items-center mb-12">
            <h3
              className="cn-heading-h3 text-primary m-0"
              key={activeIndex}
            >
              {puffSeries[activeIndex].title}
            </h3>

            <div className="arrows d-flex align-items-center ms-auto">
              <button
                className="btn border-0 p-0 me-3"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <span className="material-symbols-outlined">arrow_left_alt</span>
              </button>
              <button
                className="btn border-0 p-0"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <span className="material-symbols-outlined">arrow_right_alt</span>
              </button>
            </div>
          </div>

          <div style={{ minHeight: "120px" }}>
            <p className="text-gray-800 cn-body-m-bold mb-12">{puffSeries[activeIndex].subTitle}</p>
            <p className="text-gray-800 cn-body-m-regular">{puffSeries[activeIndex].desc}</p>
          </div>

          <div className="dots d-flex gap-2 mt-16">
            {puffSeries.map((_, i) => (
              <span
                key={i}
                className={`dot ${activeIndex === i ? "active" : ""}`}
                onClick={() => swiperRef.current?.slideToLoop(i)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* 右側圖片 */}
      <div className="col-lg-7 px-lg-12 p-0">
        <Swiper
          modules={[Autoplay, EffectFade]}
          effect="fade"
          loop={true}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          autoplay={{ delay: 5000 }}
          className=" puffSeriesSwiper"
        >
          {puffSeries.map((item, i) => (
            <SwiperSlide key={i}>
              <img
                src={item.img}
                alt={item.title}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default PuffSeriesSwiper;
