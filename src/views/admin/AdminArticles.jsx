import { useCallback, useEffect, useState } from "react";
import { addArticle, delArticle, editArticle, getArticles } from "../../services/admin";
import Navigation from "../../components/Navigation";

import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { ConfirmDeleteModal, ErrorToast, SuccessToast } from "../../components/Toast";
import AdminArticlesEdit from "../../components/admin/AdminArticleEdit";

function AdminArticles() {
  const [articles, setArticles] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [isEditing, setIsEditing] = useState(false);
  const [tempArticle, setTempArticle] = useState({
    title: "",
    content: "",
    author: "",
    create_at: "",
    isPublic: false,
    image: "",
    tag: [],
    category: "article",
  });

  const handleEdit = (item = null) => {
    if (item) {
      setTempArticle({
        ...item,
        content: item.content || item.description || "",
        isPublic: !!item.isPublic,
        tag: Array.isArray(item.tag) ? item.tag : [],
        image: item.image || "",
        category: "article",
      });
    } else {
      setTempArticle({
        title: "",
        content: "",
        author: "La Nuit Puff",
        create_at: Math.floor(Date.now() / 1000),
        isPublic: false,
        tag: [],
        image: "",
        category: "article",
      });
    }
    setIsEditing(true);
  };

  const handleSubmit = async () => {
    try {
      const cleanTags = tempArticle.tag.filter((t) => t.trim() !== "");
      const articleData = {
        ...tempArticle,
        tag: cleanTags,
        isPublic: !!tempArticle.isPublic,
        description: tempArticle.content,
      };

      const payload = { data: articleData };
      const apiCall = tempArticle.id ? () => editArticle(tempArticle.id, payload) : () => addArticle(payload);

      const res = await apiCall();

      if (res?.success) {
        SuccessToast.fire({
          title: tempArticle.id ? "編輯成功" : "新增成功",
        });
        setIsEditing(false);
        fetchArticles();
      } else {
        ErrorToast.fire({
          title: res?.message || "儲存失敗",
        });
      }
    } catch (error) {
      ErrorToast.fire({
        title: "儲存失敗",
      });
      console.error(error);
    }
  };

  const handelDelArticle = async (id) => {
    const result = await ConfirmDeleteModal.fire();
    if (result.isConfirmed) {
      try {
        const res = await delArticle(id);
        if (res?.success) {
          SuccessToast.fire({ title: "刪除成功" });
          fetchArticles();
        } else {
          ErrorToast.fire({ title: res.message || "刪除失敗" });
        }
      } catch (error) {
        console.error("刪除錯誤:", error);
        ErrorToast.fire({ title: "系統發生錯誤" });
      }
    }
  };

  const fetchArticles = useCallback(async () => {
    try {
      const res = await getArticles(currentPage);
      if (res?.success) {
        const filtered = res.articles.filter((item) => item.category === "article");
        setArticles(filtered);
        setPagination(res.pagination);
      }
    } catch (error) {
      console.error("讀取失敗", error);
    }
  }, [currentPage]);

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  console.log(articles);

  return (
    <>
      <section className="bg-taupe-200 py-32 py-lg-64 mt-80">
        <div className="container">
          {isEditing ? (
            <AdminArticlesEdit
              tempArticle={tempArticle}
              setTempArticle={setTempArticle}
              ClassicEditor={ClassicEditor}
              setIsEditing={setIsEditing}
              handleSubmit={handleSubmit}
            />
          ) : (
            <div className="row">
              <div className="col-12 mb-28">
                <div className="justify-content-between align-items-center d-flex">
                  <h1 className="cn-heading-h4 text-primary">/ 文章發佈</h1>
                  <button
                    type="button"
                    className="btn-puff btn-puff-primary btn-puff-cn-l cn-label-l"
                    onClick={() => handleEdit()}
                  >
                    新增文章
                  </button>
                </div>
              </div>
              {articles.map((item) => (
                <div
                  className="col-12 col-lg-6 mb-24"
                  key={item.id}
                >
                  <div className="px-16 py-24 bg-white border d-lg-flex align-items-center h-100">
                    <img
                      src={item.image || "https://placehold.co/400x300?text=No+Image"}
                      alt={item.title}
                      className="object-fit-cover articlesImg mb-28 mb-lg-0"
                    />
                    <div className="ms-lg-24">
                      <p className="eng-label-s text-gray-500 mb-8">
                        {new Date(item.create_at * 1000).toLocaleDateString().replace(/\//g, ".")}
                      </p>
                      <h2 className="cn-heading-h5 text-primary mb-8">{item.title}</h2>
                      <p className="cn-body-s-regular text-gray-700 text-truncate-2 mb-20">
                        {item.description
                          ? item.description.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ")
                          : "暫無內容"}
                      </p>
                      <div className="d-flex justify-content-end gap-2">
                        <button
                          className="btn-puff btn-puff-outline btn-puff-cn-s cn-label-s"
                          onClick={() => handleEdit(item)}
                        >
                          編輯文章
                        </button>
                        <button
                          className="btn-puff btn-puff-outline-danger btn-puff-cn-s cn-label-s"
                          onClick={() => handelDelArticle(item.id)}
                        >
                          刪除
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <div className="d-flex justify-content-start col-12">
                <Navigation
                  pagination={pagination}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

export default AdminArticles;
