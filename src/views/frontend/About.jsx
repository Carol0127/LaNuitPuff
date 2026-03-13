import PuffFeatures from "../../components/PuffFeatures";
import PuffSeriesSwiper from "../../components/PuffSeriesSwiper";

import Contact from "../../components/Contact";
import Articles from "../../components/Articles";
import { useNavigate } from "react-router";

function About() {
  const navigate = useNavigate();

  const gridData = [
    { engLabel: "/ Founded", number: "2020", content: "創立於台北" },
    { engLabel: "/ Flavours", number: "12+", content: "經典口味" },
    { engLabel: "/ Orders", number: "3K+", content: "幸福訂單" },
    { engLabel: "/ Delivery", number: "全台", content: "冷鏈配送" },
  ];
  const standFor = [
    {
      number: "01",
      engLabel: "/ Poetry in Every Bite",
      cnTitle: "每口都是詩",
      content: "每款泡芙都有一個故事，一個名字。我們用食材說話，讓口感成為語言，讓每一口都值得被記住。",
    },
    {
      number: "02",
      engLabel: "/ Craft Without Compromise",
      cnTitle: "工藝不妥協",
      content: "每一批泡芙當日現做，外殼膨脹的比例、卡士達流動的程度，都有不能讓步的標準。因為你值得最好的那一口。",
    },
    {
      number: "03",
      engLabel: "/ Happiness Has No Curfew",
      cnTitle: "幸福無宵禁",
      content: "深夜不應該只有孤獨和疲憊。我們希望每一個撐過今天的人，都能在某個深夜，好好寵愛自己一次。",
    },
  ];

  const milesStones = [
    {
      engLabel: "/ The Beginning ‧ 2022",
      cnTitle: "深夜廚房的起點",
      content: "Carol 在台北的小廚房裡測試了三十幾種配方。沒有商標，只有一個執念：做出那口她一直在找的泡芙。",
    },
    {
      engLabel: "/ A Name, A Feeling ‧ 2023",
      cnTitle: "第一個有名字的泡芙",
      content: "「凌晨三點的靜謐」上線，隔天售罄。那時候我們才知道，不只有我們需要這樣的深夜陪伴。",
    },
    {
      engLabel: "/ Delivered with Care ‧ 2024",
      cnTitle: "送到你手上",
      content: "冷鏈配送上線，全台宅配。深夜的甜蜜終於可以跨越距離，在任何一個需要它的地方出現。",
    },
    {
      engLabel: "/ A Gift Worth Keeping ‧ 2025",
      cnTitle: "Collection 禮盒問世",
      content: "精裝禮盒以深夜藍呈現，讓這份心意從視覺到味覺都值得被好好珍藏。",
    },
    {
      engLabel: "/ Back to the Land ‧ 2026",
      cnTitle: "回到台灣土地",
      content: "與在地農場合作，讓每個季節的限定口味都有真實的來歷。好食材是對你最直接的承諾。",
    },
  ];

  return (
    <>
      <section>
        <img
          src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/banner/ver.4/lanuit-1770553929390.jpg?raw=true"
          alt="hero"
          className="vh-lg-50 vh-100 w-100 object-fit-cover"
        />
      </section>
      <section className="bg-taupe-200 py-64 py-lg-120">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-7 mb-24 mb-lg-64">
              <h1 className="text-primary eng-heading-italic-h3 mb-12 mb-lg-32">/ Our Story</h1>
              <h2 className="text-primary cn-diplay-s mb-12 mb-lg-32">深夜裡的甜蜜心意</h2>
              <p className="text-gray-800 cn-body-m-regular">
                La Nuit Puff
                是一個關於「夜晚」與「溫柔」的甜點品牌。我們相信，最真實的幸福感，往往在深夜悄悄降臨——一口泡芙，就是那個瞬間。
              </p>
            </div>
            <div className="col-lg-1"></div>
            <div
              data-aos="fade-down"
              className="col-lg-4 mb-24 mb-lg-64"
            >
              <div className="row">
                {gridData.map((item) => (
                  <div
                    key={item.engLabel}
                    className="col-6"
                  >
                    <div className="p-20 text-center ">
                      <p className="text-primary eng-heading-h5 mb-8">{item.engLabel}</p>
                      <p className="text-primary cn-heading-h3 mb-8">{item.number}</p>
                      <p className="text-primary cn-body-s-regular">{item.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="col-lg-6">
              <img
                src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/aboutPuff.png?raw=true"
                alt="抹茶泡芙"
                className="mb-24 mb-lg-0 "
                data-aos="fade-down"
              />
            </div>
            <div className="col-lg-1"></div>
            <div className="col-lg-5">
              <p className="text-primary eng-heading-italic-h3 mb-12 mb-lg-32">/ La Nuit Puff</p>
              <p className="text-primary cn-heading-h3 mb-12 mb-lg-32">我們不只是泡芙</p>
              <p className="text-gray-800 cn-body-m-regular">
                每一顆泡芙都有名字，每個名字都是一種情緒。 我們做的不是甜點，是深夜裡你給自己的那個允許。
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="pb-64 py-lg-120">
        <PuffFeatures />
      </section>
      <section className="bg-primary py-lg-120 py-64">
        <div className="container">
          <div className="row">
            <h4 className="text-secondary eng-heading-h5 mb-20">/ What We Stand For</h4>
            <h3 className="text-taupe-200 cn-display-s mb-24">我們所堅持的事情</h3>
            <ul className="list-unstyled d-flex flex-column flex-lg-row gap-24 m-0">
              {standFor.map((item, index) => (
                <li
                  data-aos="fade-right"
                  data-aos-delay={index * 300}
                  key={item.number}
                  className="bg-taupe-200 py-48 py-lg-64 px-24"
                >
                  <div className="pb-20 mb-20 border-bottom border-secondary">
                    <h4 className="text-primary cn-display-s mb-12">{item.number}</h4>
                    <h5 className="text-primary eng-heading-h6">{item.engLabel}</h5>
                  </div>
                  <p className="text-primary cn-heading-h3 mb-12">{item.cnTitle}</p>
                  <p className="text-gray-800">{item.content}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      <section className="pt-64 py-lg-120">
        <div className="container">
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
        </div>
      </section>
      <section className="py-64 py-lg-120 bg-taupe-200">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 mb-24 mb-lg-0">
              <h4 className="text-secondary eng-heading-h5 mb-12">/ Milestones</h4>
              <h3 className="text-primary cn-display-s">走到這裡的每一步</h3>
            </div>
            <div className="col-lg-8">
              <ul className="list-unstyled border-top">
                {milesStones.map((item, index) => (
                  <li
                    data-aos="fade-down"
                    data-aos-delay={index * 150}
                    key={item.cnTitle}
                    className={`py-28 ${index < milesStones.length - 1 ? "border-bottom " : ""}`}
                  >
                    <h5 className="eng-heading-h6 text-secondary mb-12">{item.engLabel}</h5>
                    <h4 className="text-primary cn-body-m-bold mb-12">{item.cnTitle}</h4>
                    <p className="cn-body-s-regular text-gray-800">{item.content}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <section className="section-articles py-64 pt-lg-120 pb-lg-80 mb-lg-120 mb-64">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div
                data-aos="fade-down"
                className="pb-lg-40 border-bottom border-secondary d-lg-flex align-items-end mb-lg-40 mb-24 pb-24"
              >
                <div>
                  <h2 className="text-primary cn-display-s mb-20">深夜的閱讀時光</h2>
                  <p className="eng-heading-italic-h5 text-secondary mb-24 mb-lg-0">
                    Stories from the kitchen, the field, and the deep of night.
                  </p>
                </div>
                <div className="d-flex align-items-center ms-auto">
                  <button className="btn border-0 p-0 me-3 swiper-prev-btn">
                    <span className="material-symbols-outlined text-primary">arrow_left_alt</span>
                  </button>
                  <button className="btn border-0 p-0 swiper-next-btn">
                    <span className="material-symbols-outlined text-primary">arrow_right_alt</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div
              className="col-12 pe-0 pe-lg-12"
              data-aos="fade-down"
              data-aos-delay="150"
            >
              <Articles />
            </div>
          </div>
        </div>
      </section>
      <section className="container-fluid pt-lg-120 position-relative overflow-hidden">
        <div className="row row d-flex align-items-end justify-content-end">
          <Contact />
        </div>
      </section>
    </>
  );
}

export default About;
