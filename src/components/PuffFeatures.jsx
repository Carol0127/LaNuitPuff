function PuffFeatures() {
  const puffFeatures = [
    {
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E7%89%B9%E8%89%B2icon/Frame%2024.png?raw=true",
      alt: "絲絨雲朵卡士達",
      titleColor: "text-secondary",
      title: "絲絨雲朵卡士達",
      subtitle: "介於絲絨與雲朵間，霧氣般輕盈的慰藉",
      desc: "捨棄黏膩，以低溫慢速攪打揉入空氣感。質地如霧氣般輕盈化口，是深夜裡最安靜的溫柔擁抱。",
    },
    {
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E7%89%B9%E8%89%B2icon/Frame%2025.png?raw=true",
      alt: "秒計酥脆脆皮",
      titleColor: "text-primary",
      title: "秒計酥脆脆皮",
      subtitle: "精確到秒的烘烤，深夜唯一的華麗騷動",
      desc: "在精準溫濕度下誕生。咬下的瞬間，那聲清脆的「喀嚓」聲，是我們對完美層次的偏執堅持。",
    },
    {
      img: "https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E7%89%B9%E8%89%B2icon/Frame%2026.png?raw=true",
      alt: "嚴選各地新鮮原料",
      titleColor: "text-secondary",
      title: "嚴選各地新鮮原料",
      subtitle: "跨越時區的採集，只為濃縮一份美好",
      desc: "從大溪地香草到西西里開心果。我們收集全球最誠摯的原料，將遠方的美好，濃縮成這一顆給你的慰藉。",
    },
  ];
  return (
    <>
      <section className="container ">
        <div className="row flex-column-reverse flex-lg-row">
          <div
            data-aos="fade-right"
            className="col-lg-7"
          >
            <h3 className="text-center text-lg-start text-primary eng-display-xl mb-52">Our Puffs</h3>
            <ul className="list-unstyled pe-lg-80">
              {puffFeatures.map((item, index) => (
                <li
                  key={item.alt}
                  className={`d-flex flex-column flex-md-row align-items-center ${
                    index < puffFeatures.length - 1 ? "mb-28" : ""
                  }`}
                >
                  <img
                    src={item.img}
                    alt={item.alt}
                    className="mb-20 mb-md-0 me-md-40 puffSpecialImg"
                  />
                  <div>
                    <h4 className={`cn-heading-h4 text-center text-md-start ${item.titleColor} mb-8`}>{item.title}</h4>
                    <p className="cn-body-m-bold text-center text-md-start text-gray-800 mb-8">{item.subtitle}</p>
                    <p className="cn-body-m-regular text-center text-md-start text-gray-800">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-lg-5 mb-32 mb-lg-0 p-0 px-lg-12">
            <img
              src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/%E6%88%90%E7%86%9F%E8%8B%A6%E7%94%9C%E7%B3%BB/%E5%A8%81%E5%A3%AB%E5%BF%8C%E7%84%A6%E7%B3%96%E6%B3%A1%E8%8A%99/lanuit-1768122185329.jpg?raw=true"
              alt="PuffFeatures"
              className="puffSpecial img-fluid"
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default PuffFeatures;
