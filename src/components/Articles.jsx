import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import { getArticles } from "../services/articles";
function Articles() {
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data.filter((item) => item.category === "article"));
    };
    fetchArticles();
  }, []);

  return (
    <>
      <Swiper
        modules={[Navigation]}
        spaceBetween={16}
        slidesPerView={1.2}
        navigation={{
          prevEl: ".swiper-prev-btn",
          nextEl: ".swiper-next-btn",
        }}
        breakpoints={{
          768: { slidesPerView: 2.5, spaceBetween: 24 },
          992: { slidesPerView: 3, spaceBetween: 24 },
        }}
      >
        {articles.map((article) => (
          <SwiperSlide key={article.id}>
            <div
              className="article-card d-flex flex-column h-100"
              onClick={() => navigate(`/articles/${article.id}`)}
            >
              <img
                src={article.image}
                alt={article.title}
                className="articles-img"
              />
              <div className="bg-taupe-200 py-28 px-16 flex-grow-1 d-flex flex-column">
                <div className="d-flex justify-content-between mb-12  ">
                  <span className="eng-label-s text-blue-400">
                    {new Date(article.create_at * 1000).toLocaleDateString("zh-TW", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                </div>
                <h3 className="cn-heading-h5 text-primary mb-12  ">{article.title}</h3>
                <p className="cn-body-s-regular text-gray-500 mb-auto text-truncate-2">
                  {article.description
                    ? article.description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
                    : "暫無內容"}
                </p>
                <div className="d-flex justify-content-between align-items-center mt-24 pt-24 border-top border-secondary ">
                  <span className="cn-body-s-regular text-primary readMore">閱讀全文 / Read More</span>
                  <span className="material-symbols-outlined align-bottom text-primary readMore">arrow_right_alt</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default Articles;
