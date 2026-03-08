import { NavLink, useNavigate } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import HeroSwiper from "../../components/HeroSwiper";
import PuffSeriesSwiper from "../../components/PuffSeriesSwiper";
import NewSwiper from "../../components/NewSwiper";
import PopularCardSwiper from "../../components/PopularCardSwiper";
import PuffFeatures from "../../components/PuffFeatures";
import Contact from "../../components/Contact";

function Home() {
  const navigate = useNavigate();
  return (
    <>
      <div className="overflow-hidden">
        <section className="container-fluid p-0 vh-100">
          <div className="row g-0">
            <HeroSwiper />
          </div>
        </section>
        <section className="container-fluid px-0 py-64 py-lg-120 bg-taupe-200 ">
          <div className="row g-0 align-items-center">
            <div
              data-aos="fade-right"
              className="col-lg-7"
            >
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
                    alt="甜蜜擁抱系"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/vertical/lanuit-1770554601495.jpg?raw=true"
                    alt="提神夜貓系"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/vertical/lanuit-1770554616007.jpg?raw=true"
                    alt="酸甜告白系"
                  />
                </SwiperSlide>
                <SwiperSlide>
                  <img
                    src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/SHOP/lanuit-1769934311571.jpg?raw=true"
                    alt="信義店照片"
                  />
                </SwiperSlide>
              </Swiper>
            </div>
            <div
              data-aos="fade-left"
              className="col-lg-5 p-24"
            >
              <div className="text-content px-lg-40">
                <h2 className="eng-display-s text-primary mb-12">La Nuit Puff</h2>
                <h3 className="text-primary cn-heading-h3 mb-20">晚上不是用來寂寞的，是用來被安慰的</h3>
                <p className="cn-body-m-regular text-gray-800 mb-12">
                  La Nuit PUFF
                  起初是一間只在夜裡開門的小甜點店，專門接收那些入夜後還醒著的靈魂。有些人為了工作熬夜，有些人只是單純地，沒辦法睡。
                </p>
                <p className="cn-body-m-regular text-gray-800 mb-28">
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
            <button
              className="btn-puff btn-puff-primary btn-puff-eng-l eng-label-l"
              onClick={() => navigate("/products")}
            >
              SHOP
            </button>
          </div>

          <div
            data-aos="fade-down"
            className="row align-items-stretch "
          >
            <PuffSeriesSwiper />
          </div>
        </section>
        <section className="section-popular py-64 py-lg-80 pe-0">
          <div
            data-aos="fade-down"
            className="container pe-0"
          >
            <div className="row me-0">
              <h2 className="text-center text-lg-start eng-display-xl text-primary mb-40 mb-lg-56">Popular</h2>
            </div>
            <div>
              <PopularCardSwiper />
            </div>
          </div>
        </section>
        <section className="py-64 py-lg-120">
          <PuffFeatures />
        </section>

        <section
          id="news"
          className="container-fluid p-0 "
        >
          <NewSwiper />
        </section>
        <section
          id="contact"
          className="container-fluid pt-80 pt-lg-120 position-relative"
        >
          <div className="row row d-flex align-items-end justify-content-end">
            <Contact />
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
