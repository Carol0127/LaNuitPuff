import { useState, useEffect } from "react";

import { Swiper, SwiperSlide } from "swiper/react";
import { getPopularProducts } from "../services/products";
import { NavLink } from "react-router";
import { useDispatch } from "react-redux";
import { addToCartAsync } from "../store/slices/cartSlice";

function PopularCardSwiper() {
  const [popularItems, setPopularItems] = useState([]);

  useEffect(() => {
    getPopularProducts()
      .then((data) => setPopularItems(data))
      .catch((err) => console.error(err));
  }, []);

  const dispatch = useDispatch();

  return (
    <>
      <Swiper
        data-aos="fade-down"
        className="w-100"
        slidesPerView={1.2}
        spaceBetween={16}
        breakpoints={{
          768: {
            slidesPerView: 2.2,
            spaceBetween: 24,
          },
          1024: {
            slidesPerView: 3.5,
            spaceBetween: 24,
            allowTouchMove: true,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 24,
            allowTouchMove: false,
          },
        }}
      >
        {popularItems.map((item) => (
          <SwiperSlide key={item.id}>
            <NavLink
              className="text-decoration-none d-block w-100 h-100"
              to={`/product/${item.id}`}
            >
              <div className="card product-card border-0 rounded-0 w-100">
                <div className="product-img-container position-relative overflow-hidden">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-100 d-block"
                  />
                  <button
                    className="btn-addToCart"
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      dispatch(addToCartAsync({ id: item.id, qty: 1 }));
                    }}
                  >
                    Add To Cart
                  </button>
                </div>

                <div className="card-body bg-taupe-200 py-20 px-16">
                  <p className="eng-label-s text-blue-400 mb-8">/ Comforting Hug</p>
                  <div className="d-flex align-items-center justify-content-between mb-8">
                    <p className="cn-heading-h5 text-primary mb-0">{item.title}</p>
                    <p className="eng-heading-h5 text-primary mb-0">NT.{item.price}</p>
                  </div>
                  <p className="eng-label-s text-primary mb-0">Silence at 3 AM</p>
                </div>
              </div>
            </NavLink>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default PopularCardSwiper;
