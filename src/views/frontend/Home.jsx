import { useState, useEffect } from "react";
import { NavLink } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import HeroSwiper from "../../components/HeroSwiper";
import PuffSeriesSwiper from "../../components/PuffSeriesSwiper";

import { getPopularProducts } from "../../services/products";

function Home() {
  const [popularItems, setPopularItems] = useState([]);
  useEffect(() => {
    getPopularProducts()
      .then((data) => setPopularItems(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <>
      <section className="container-fluid p-0 vh-100">
        <div className="row g-0">
          <HeroSwiper />
        </div>
      </section>

      <section className="container-fluid px-0 py-64 py-lg-120 bg-taupe-200 ">
        <div className="row g-0 align-items-center">
          <div className="col-lg-7">
            <Swiper
              slidesPerView={1.5}
              spaceBetween={24}
              className="brandSwiper"
              breakpoints={{
                576: {
                  slidesPerView: 2.5,
                  spaceBetween: 24,
                },
              }}
            >
              <SwiperSlide>
                <img
                  src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/vertical/lanuit-1770554583639.jpg?raw=true"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/vertical/lanuit-1770554601495.jpg?raw=true"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/vertical/lanuit-1770554616007.jpg?raw=true"
                  alt=""
                />
              </SwiperSlide>
              <SwiperSlide>
                <img
                  src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/SHOP/lanuit-1769934311571.jpg?raw=true"
                  alt=""
                />
              </SwiperSlide>
            </Swiper>
          </div>
          <div className="col-lg-5 p-24">
            <div className="text-content px-lg-40">
              <h2 className="eng-display-s text-primary mb-12">La Nuit Puff</h2>
              <h3 className="text-primary cn-heading-h3 mb-20">晚上不是用來寂寞的，是用來被安慰的</h3>
              <p className="text-gray-800 mb-12">
                La Nuit PUFF
                起初是一間只在夜裡開門的小甜點店，專門接收那些入夜後還醒著的靈魂。有些人為了工作熬夜，有些人只是單純地，沒辦法睡。
              </p>
              <p className="text-gray-800 mb-28">
                我們不問理由，只遞上一顆爆漿的泡芙—— 酥脆外皮下，是軟綿溫柔的甜，像一種不言而喻的擁抱。
              </p>
              <NavLink
                to="/about"
                className="btn-puff btn-puff-outline btn-puff-eng-m eng-label-m"
              >
                about us
              </NavLink>
            </div>
          </div>
        </div>
      </section>
      <section className="container py-64 py-lg-120">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-32 ">
          <h2 className="eng-display-xl text-primary mb-24 m-lg-0">Our Puffs</h2>
          <button className="btn-puff btn-puff-primary btn-puff-eng-l eng-label-l">SHOP</button>
        </div>

        <div className="row align-items-stretch border-start border-primary">
          <PuffSeriesSwiper />
        </div>
      </section>
      <section className="section-popular container-fluid py-64 py-lg-80">
        <div className="container">
          <div className="row">
            <h2 className="text-center text-lg-start  eng-display-xl text-primary mb-40 mb-lg-56">Popular </h2>
            <Swiper
              slidesPerView={1.2}
              spaceBetween={16}
              breakpoints={{
                768: {
                  slidesPerView: 2.2,
                  spaceBetween: 24,
                },
                992: {
                  slidesPerView: 4,
                  spaceBetween: 24,
                  allowTouchMove: false,
                },
              }}
            >
              {popularItems.map((item) => (
                <SwiperSlide>
                  <div key={item.title}>
                    <NavLink
                      className="text-decoration-none"
                      to={`/product/${item.id}`}
                    >
                      <div className="card product-card border-0 rounded-0">
                        {/* 1. 圖片區域 */}
                        <div className="product-img-container position-relative overflow-hidden">
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                          />
                          <button
                            className="btn-addToCart"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                            }}
                          >
                            Add To Cart
                          </button>
                        </div>

                        {/* 3. 文字區域 */}
                        <div className="card-body bg-taupe-200 py-20 px-16">
                          <p className="eng-label-s text-blue-400 mb-4">/ Comforting Hug</p>
                          <div className="d-flex justify-content-between mb-4">
                            <p className="cn-heading-h5 text-primary mb-0">{item.title}</p>
                            <p className="eng-heading-h5 text-primary mb-0">NT.{item.price}</p>
                          </div>
                          <p className="eng-label-s text-primary mb-0">Silence at 3 AM</p>
                        </div>
                      </div>
                    </NavLink>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
      <section className="container py-64 py-lg-120">
        <div className="row">
          <div className="col-lg-7">
            <h3 className="text-primary eng-display-xl mb-52">Our Puffs</h3>
            <ul className="list-unstyled pe-lg-80">
              <li className="d-flex flex-column flex-lg-row align-items-center mb-28">
                <img
                  src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E7%89%B9%E8%89%B2icon/Frame%2024.png?raw=true"
                  alt=""
                  style={{ width: "80px", height: "80px" }}
                  className="mb-20 mb-lg-0 me-lg-40"
                />
                <div>
                  <h4 className="cn-heading-h4 text-center text-lg-start text-secondary mb-8">絲絨雲朵卡士達</h4>
                  <p className="cn-body-m-bold text-center text-lg-start text-gray-800 mb-8">
                    介於絲絨與雲朵間，霧氣般輕盈的慰藉
                  </p>
                  <p className="cn-body-m text-center text-lg-start text-gray-800">
                    捨棄黏膩，以低溫慢速攪打揉入空氣感。質地如霧氣般輕盈化口，是深夜裡最安靜的溫柔擁抱。
                  </p>
                </div>
              </li>
              <li className="d-flex flex-column flex-lg-row align-items-center mb-28">
                <img
                  src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E7%89%B9%E8%89%B2icon/Frame%2024.png?raw=true"
                  alt=""
                  style={{ width: "80px", height: "80px" }}
                  className="mb-20 mb-lg-0 me-lg-40"
                />
                <div>
                  <h4 className="cn-heading-h4 text-center text-lg-start text-secondary mb-8">絲絨雲朵卡士達</h4>
                  <p className="cn-body-m-bold text-center text-lg-start text-gray-800 mb-8">
                    介於絲絨與雲朵間，霧氣般輕盈的慰藉
                  </p>
                  <p className="cn-body-m text-center text-lg-start text-gray-800">
                    捨棄黏膩，以低溫慢速攪打揉入空氣感。質地如霧氣般輕盈化口，是深夜裡最安靜的溫柔擁抱。
                  </p>
                </div>
              </li>
              <li className="d-flex flex-column flex-lg-row align-items-center mb-28">
                <img
                  src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E7%89%B9%E8%89%B2icon/Frame%2024.png?raw=true"
                  alt=""
                  style={{ width: "80px", height: "80px" }}
                  className="mb-20 mb-lg-0 me-lg-40"
                />
                <div>
                  <h4 className="cn-heading-h4 text-center text-lg-start text-secondary mb-8">絲絨雲朵卡士達</h4>
                  <p className="cn-body-m-bold text-center text-lg-start text-gray-800 mb-8">
                    介於絲絨與雲朵間，霧氣般輕盈的慰藉
                  </p>
                  <p className="cn-body-m text-center text-lg-start text-gray-800">
                    捨棄黏膩，以低溫慢速攪打揉入空氣感。質地如霧氣般輕盈化口，是深夜裡最安靜的溫柔擁抱。
                  </p>
                </div>
              </li>
            </ul>
          </div>
          <div className="col-lg-5  p-0 px-lg-12">
            <img
              src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E6%88%90%E7%86%9F%E8%8B%A6%E7%94%9C%E7%B3%BB/%E5%A8%81%E5%A3%AB%E5%BF%8C%E7%84%A6%E7%B3%96%E6%B3%A1%E8%8A%99/lanuit-1768122185329.jpg?raw=true"
              alt=""
              style={{ objectFit: "cover" }}
              className="img-fluid  h-100"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
