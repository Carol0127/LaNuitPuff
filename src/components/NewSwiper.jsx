import { useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, EffectFade, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/effect-fade";
import { getArticles } from "../services/admin";
function NewSwiper() {
  const [news, setNews] = useState([]);
  const swiperRef = useRef(null);
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const res = await getArticles();
        const filteredNews = res.articles.filter((item) => item.category === "最新消息");
        setNews(filteredNews);
      } catch (error) {
        console.error("Swiper 取得消息失敗:", error);
      }
    };
    fetchNews();
  }, []);
  if (news.length === 0) return null;
  return (
    <>
      <Swiper
        modules={[Navigation, EffectFade, Autoplay]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        loop={news.length > 1}
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        className="newSwiper"
      >
        {news.map((item) => (
          <SwiperSlide key={item.id}>
            <div className="row g-0 align-items-stretch">
              <div className="col-lg-7 position-relative">
                <img
                  src={item.image}
                  alt={item.title}
                />
              </div>

              {/* 右側文字區：col-lg-7 */}
              <div className="col-lg-5 d-flex justify-content-center  bg-taupe-200 py-lg-40 py-20 px-16 ">
                <div className="newsText">
                  <h4 className="text-primary cn-heading-h4 mb-12">{item.title}</h4>
                  <p className="cn-body-m-regular text-gray-800 mb-12">{item.description}</p>

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
