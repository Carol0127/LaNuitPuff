import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/thumbs";

function ProductDetailSwiper({ product }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const allImages = product ? [product.imageUrl, ...(product.imagesUrl || [])] : [];

  return (
    <div className="product-swiper-container">
      {/* 1. 主大圖 */}
      <Swiper
        loop={true}
        spaceBetween={10}
        thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
        modules={[FreeMode, Thumbs]}
        className="productFirstImgs"
      >
        {allImages.map((img, index) => (
          <SwiperSlide key={`main-${index}`}>
            <img
              src={img}
              alt="product"
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* 2. 縮圖 */}
      <Swiper
        onSwiper={setThumbsSwiper}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        slideToClickedSlide={true}
        breakpoints={{
          1024: {
            // 1024px 以上：垂直模式
            direction: "vertical",
            slidesPerView: 4,
            spaceBetween: 20,
          },
          0: {
            // 1024px 以下：水平滑動模式
            direction: "horizontal",
            slidesPerView: "auto", // 配合 CSS 寬度實現流暢滑動
            spaceBetween: 12,
            centeredSlides: false,
          },
        }}
        className="productImgs"
      >
        {allImages.map((img, index) => (
          <SwiperSlide
            key={`thumb-${index}`}
            className="thumb-item"
          >
            <img
              src={img}
              alt="thumb"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default ProductDetailSwiper;
