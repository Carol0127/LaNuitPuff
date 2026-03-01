import { NavLink } from "react-router";

import { Swiper, SwiperSlide } from "swiper/react";
import HeroSwiper from "../../components/HeroSwiper";
import PuffSeriesSwiper from "../../components/PuffSeriesSwiper";
import NewSwiper from "../../components/NewSwiper";
import PopularCardSwiper from "../../components/PopularCardSwiper";

function Home() {
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
        <section
          data-aos="fade-right"
          className="container py-64 py-lg-120"
        >
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center mb-32 ">
            <h2 className="eng-display-xl text-primary mb-24 m-lg-0">Our Puffs</h2>
            <button className="btn-puff btn-puff-primary btn-puff-eng-l eng-label-l">SHOP</button>
          </div>

          <div className="row align-items-stretch ">
            <PuffSeriesSwiper />
          </div>
        </section>
        <section className="section-popular py-64 py-lg-80 pe-0">
          <div className="container pe-0">
            <div className="row me-0">
              <h2 className="text-center text-lg-start eng-display-xl text-primary mb-40 mb-lg-56">Popular</h2>
            </div>
            <div data-aos="zoom-in">
              <PopularCardSwiper />
            </div>
          </div>
        </section>
        <section className="container py-64 py-lg-120">
          <div className="row flex-column-reverse flex-lg-row">
            <div
              data-aos="fade-right"
              className="col-lg-7"
            >
              <h3 className="text-center text-lg-start text-primary eng-display-xl mb-52">Our Puffs</h3>
              <ul className="list-unstyled pe-lg-80">
                <li className="d-flex flex-column flex-md-row align-items-center mb-28">
                  <img
                    src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E7%89%B9%E8%89%B2icon/Frame%2024.png?raw=true"
                    alt="絲絨雲朵卡士達"
                    className="mb-20 mb-md-0 me-md-40 puffSpecialImg"
                  />
                  <div>
                    <h4 className="cn-heading-h4 text-center text-md-start text-secondary mb-8">絲絨雲朵卡士達</h4>
                    <p className="cn-body-m-bold text-center text-md-start text-gray-800 mb-8">
                      介於絲絨與雲朵間，霧氣般輕盈的慰藉
                    </p>
                    <p className="cn-body-m-regular text-center text-md-start text-gray-800">
                      捨棄黏膩，以低溫慢速攪打揉入空氣感。質地如霧氣般輕盈化口，是深夜裡最安靜的溫柔擁抱。
                    </p>
                  </div>
                </li>
                <li className="d-flex flex-column flex-md-row align-items-center mb-28">
                  <img
                    src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E7%89%B9%E8%89%B2icon/Frame%2025.png?raw=true"
                    alt="秒計酥脆脆皮"
                    className="mb-20 mb-md-0 me-md-40 puffSpecialImg"
                  />
                  <div>
                    <h4 className="cn-heading-h4 text-center text-md-start text-primary mb-8">秒計酥脆脆皮</h4>
                    <p className="cn-body-m-bold text-center text-md-start text-gray-800 mb-8">
                      精確到秒的烘烤，深夜唯一的華麗騷動
                    </p>
                    <p className="cn-body-m-regular text-center text-md-start text-gray-800">
                      在精準溫濕度下誕生。咬下的瞬間，那聲清脆的「喀嚓」聲，是我們對完美層次的偏執堅持。
                    </p>
                  </div>
                </li>
                <li className="d-flex flex-column flex-md-row align-items-center ">
                  <img
                    src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E7%89%B9%E8%89%B2icon/Frame%2026.png?raw=true"
                    alt="嚴選各地新鮮原料"
                    className="mb-20 mb-md-0 me-md-40 puffSpecialImg"
                  />
                  <div>
                    <h4 className="cn-heading-h4 text-center text-md-start text-secondary mb-8">嚴選各地新鮮原料</h4>
                    <p className="cn-body-m-bold text-center text-md-start text-gray-800 mb-8">
                      跨越時區的採集，只為濃縮一份美好
                    </p>
                    <p className="cn-body-m-regular text-center text-md-start text-gray-800">
                      從大溪地香草到西西里開心果。我們收集全球最誠摯的原料，將遠方的美好，濃縮成這一顆給你的慰藉。
                    </p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-lg-5 mb-32 mb-lg-0 p-0 px-lg-12">
              <img
                src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E6%88%90%E7%86%9F%E8%8B%A6%E7%94%9C%E7%B3%BB/%E5%A8%81%E5%A3%AB%E5%BF%8C%E7%84%A6%E7%B3%96%E6%B3%A1%E8%8A%99/lanuit-1768122185329.jpg?raw=true"
                alt=""
                className="puffSpecial img-fluid"
              />
            </div>
          </div>
        </section>
        <section
          id="news"
          data-aos="fade-down"
          className="container-fluid p-0 "
        >
          <NewSwiper />
        </section>
        <section
          id="contact"
          data-aos="fade-left"
          className="container-fluid pt-80 pt-lg-120 position-relative"
        >
          <div className="row d-flex align-items-end justify-content-end">
            <div className="col-lg-10 p-0 position-relative">
              <div className="main-img-wrapper position-relative">
                <img
                  src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553966402.jpg?raw=true"
                  alt="Contact Banner"
                  className="d-block contactBanner"
                />

                <img
                  src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/SHOP/lanuit-1769934311571.jpg?raw=true"
                  alt="Shop Detail"
                  className="position-absolute top-100 start-80 translate-middle  d-none d-xl-block shopDetail"
                />
              </div>
              <div className="d-flex flex-column align-items-center align-items-lg-start py-28 ps-lg-4">
                <h3 className="eng-display-xl text-primary mb-12">Contact</h3>
                <p className="cn-heading-h4 text-primary mb-20 mb-lg-12">台北信義店</p>
                <ul className="list-unstyled d-flex align-items-center align-items-lg-start flex-column cn-body-m text-gray-800">
                  <li className="d-flex flex-column align-items-center flex-lg-row mb-24 mb-lg-8">
                    <p className="cn-body-m-regular text-nowrap mb-4 me-lg-3">門市地址</p>
                    <p className="cn-body-m-regular">台北市信義區信義街666街66號1樓</p>
                  </li>
                  <li className="d-flex flex-column align-items-center flex-lg-row mb-24 mb-lg-8">
                    <p className="text-nowrap mb-4 me-lg-3">門市電話</p>
                    <p className="cn-body-m-regular">02-2222-222</p>
                  </li>
                  <li className="d-flex flex-column align-items-center flex-lg-row">
                    <p className="text-nowrap mb-4 me-lg-3">營業時間</p>
                    <p className="cn-body-m-regular">PM 10:00 - AM 04:00</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Home;
