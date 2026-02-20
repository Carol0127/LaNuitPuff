import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

function HeroSwiper() {
  return (
    <div className="hero-swiper-container">
      <Swiper
        pagination={{ clickable: true }}
        modules={[Pagination, Autoplay]}
        className="HeroSwiper"
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        loop={true}
      >
        <SwiperSlide>
          <img
            src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553914215.jpg?raw=true"
            alt="甜蜜擁抱系列"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553929390.jpg?raw=true"
            alt="提神夜貓系列"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553966402.jpg?raw=true"
            alt="酸甜告白系列"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553993875.jpg?raw=true"
            alt="爆漿驚喜系列"
          />
        </SwiperSlide>
        <SwiperSlide>
          <img
            src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770554293006.jpg?raw=true"
            alt="成熟苦甜系列"
          />
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default HeroSwiper;
