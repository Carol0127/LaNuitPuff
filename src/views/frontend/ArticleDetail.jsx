import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { getArticleById, getArticles } from "../../services/articles";
import Articles from "../../components/Articles";

function ArticleDetail() {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const data = await getArticles();
      setArticles(data.filter((item) => item.category === "article"));
    };
    fetchArticles();
  }, []);

  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await getArticleById(id);
      setArticle(data);
    };
    fetch();
    window.scrollTo(0, 0);
  }, [id]);

  if (!article) {
    return (
      <div className="container mt-80 py-lg-120 vh-100 d-flex flex-column align-items-center justify-content-center">
        <div className="text-center">
          <h2 className="eng-heading-italic-h1 text-primary mb-0 animate-loading-text">La Nuit Puff</h2>
          <div className="loading-bar-container mx-auto mt-24">
            <div className="loading-bar-fill"></div>
          </div>
          <p className="cn-label-m text-primary mt-32 tracking-widest">文章載入中</p>
        </div>
      </div>
    );
  }

  return (
    <>
      {/* Hero */}
      <section>
        <img
          src={article.image || "https://placehold.co/1920x600?text=La+Nuit+Puff"}
          alt={article.title}
          className="w-100 object-fit-cover"
          style={{ height: "400px", marginTop: "80px" }}
          data-aos="fade-in"
          data-aos-duration="800"
        />
      </section>

      {/* 文章內容 */}
      <section className="bg-taupe-200 py-64 py-lg-120">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-10">
              {/* 麵包屑 */}
              <nav
                aria-label="breadcrumb"
                className="mb-32"
                data-aos="fade-down"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item cn-label-m text-gray-800">
                    <span
                      className="cursor-pointer"
                      onClick={() => navigate("/")}
                    >
                      Home
                    </span>
                  </li>
                  <li className="breadcrumb-item cn-label-m text-gray-800">
                    <span
                      className="cursor-pointer"
                      onClick={() => navigate("/about")}
                    >
                      About
                    </span>
                  </li>
                  <li className="breadcrumb-item cn-label-m text-secondary active">{article.category}</li>
                </ol>
              </nav>

              {/* 標題區 */}
              <div
                className="mb-40 pb-40 border-bottom border-secondary"
                data-aos="fade-down"
              >
                <div className="d-flex align-items-center gap-16 mb-20">
                  <span className="eng-label-s text-blue-400">
                    {new Date(article.create_at * 1000).toLocaleDateString("zh-TW", {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    })}
                  </span>
                  {article.tag?.[0] && (
                    <span className="eng-label-s text-secondary border border-secondary px-8 py-4">
                      {article.tag[0]}
                    </span>
                  )}
                </div>
                <h1 className="text-primary cn-heading-h2 mb-20">{article.title}</h1>
                <p className="eng-heading-italic-h5 text-secondary">/ {article.author}</p>
              </div>

              {/* 文章本文 */}
              <div
                className="article-content cn-body-m-regular text-gray-800"
                dangerouslySetInnerHTML={{ __html: article.content }}
                data-aos="fade-down"
              />

              {/* 返回按鈕 */}
              <div className="mt-64 pt-40 border-top border-secondary">
                <button
                  className="btn-puff btn-puff-outline btn-puff-eng-m eng-label-m d-flex align-items-center gap-8"
                  onClick={() => navigate(-1)}
                >
                  <span className="material-symbols-outlined align-bottom">arrow_left_alt</span>
                  Back
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 底部文章區 */}
      <section className="position-relative overflow-hidden container-fluid pe-0 py-64 py-lg-80 bg-primary">
        <p className="collection">Articles Articles</p>
        <div className="container pe-0">
          <div className="row me-0">
            <div
              className="pb-lg-40 border-bottom border-secondary d-lg-flex align-items-end mb-lg-40 mb-24 pb-24"
              data-aos="fade-down"
            >
              <div>
                <h2 className="text-taupe-200 cn-display-s mb-20">深夜的閱讀時光</h2>
                <p className="eng-heading-italic-h5 text-secondary mb-24 mb-lg-0">
                  Stories from the kitchen, the field, and the deep of night.
                </p>
              </div>
              <div className="d-flex align-items-center ms-auto">
                <button className="btn border-0 p-0 me-3 swiper-prev-btn">
                  <span className="material-symbols-outlined text-taupe-200">arrow_left_alt</span>
                </button>
                <button className="btn border-0 p-0 swiper-next-btn">
                  <span className="material-symbols-outlined text-taupe-200">arrow_right_alt</span>
                </button>
              </div>
            </div>
          </div>
          <div className="row me-0">
            <div
              className="col-12 p-0"
              data-aos="fade-in"
            >
              <Articles articles={articles} />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ArticleDetail;
