import { useCallback, useEffect, useRef, useState } from "react";
import { Modal } from "bootstrap";
import { addArticle, delArticle, editArticle, getArticles, uploadImg } from "../../services/admin";
import { ConfirmDeleteModal, ErrorToast, SuccessToast } from "../../components/Toast";
import { useImageUpload } from "../../hooks/useImageUpload"; // 1. 引入 Hook
import AdminNewsModal from "../../components/admin/AdminNewsModal";
import Navigation from "../../components/Navigation";

function AdminNews() {
  const [news, setNews] = useState([]);
  const [pagination, setPagination] = useState({}); // 新增：存放分頁資訊
  const [currentPage, setCurrentPage] = useState(1); // 新增：目前頁碼
  const [modalMode, setModalMode] = useState("create");
  const [tempNews, setTempNews] = useState({ title: "", image: "", content: "" });
  const { handleUpload, isUploading } = useImageUpload(uploadImg);

  // Modal 實例控制
  const newsModalRef = useRef(null);
  const modalInstance = useRef(null);

  const openModal = (mode, item = null) => {
    setModalMode(mode);
    if (mode === "create") {
      setTempNews({ title: "", image: "", content: "", description: "" });
    } else {
      setTempNews({ ...item, content: item.content || item.description || "" });
    }
    modalInstance.current.show();
  };
  const closeModal = () => {
    modalInstance.current.hide();
  };

  const fetchArticles = useCallback(async (page = 1) => {
    try {
      const res = await getArticles(page);
      if (res?.success) {
        const filteredNews = res.articles.filter((item) => item.category === "最新消息");
        setNews(filteredNews);
        setPagination(res.pagination);
      }
    } catch {
      ErrorToast.fire({ title: "取得資料失敗" });
    }
  }, []);

  useEffect(() => {
    let isMounted = true;

    // 定義一個內部的 async 函式來執行，這能避開 ESLint 對直接 setState 的敏感度
    const loadData = async () => {
      if (!isMounted) return;
      await fetchArticles(currentPage);
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchArticles, currentPage]);

  useEffect(() => {
    if (newsModalRef.current) {
      modalInstance.current = new Modal(newsModalRef.current);
    }
    return () => {
      if (modalInstance.current) {
        modalInstance.current.dispose();
      }
    };
  }, []);

  // 欄位監控
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    setTempNews((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  // 圖片上傳
  const handleNewsImgUpload = async (e) => {
    const imgUrl = await handleUpload(e);

    if (imgUrl) {
      setTempNews((prev) => ({
        ...prev,
        image: imgUrl,
      }));
    }
  };

  // 提交
  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      title: tempNews.title,
      image: tempNews.image,
      content: tempNews.content,
      description: tempNews.content,
      category: "最新消息",
      create_at: tempNews.create_at || Math.floor(Date.now() / 1000),
      isPublic: true,
      author: "La Nuit PUFF",
    };

    try {
      let res;
      if (modalMode === "create") {
        res = await addArticle({ data: payload });
      } else {
        res = await editArticle(tempNews.id, { data: payload });
      }

      if (res?.success) {
        SuccessToast.fire({ title: "儲存成功" });
        fetchArticles(currentPage);
        closeModal();
      } else {
        ErrorToast.fire({ title: res.message || "提交失敗" });
      }
    } catch {
      ErrorToast.fire({ title: "提交失敗" });
    }
  };

  // 刪除文章
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

  return (
    <>
      <section className="bg-taupe-200 py-64 mt-80">
        <div className="container mb-40 mb-lg-48">
          <div className="row">
            <div className="col-12 mb-28">
              <div className="justify-content-between align-items-center d-flex">
                <h1 className="cn-heading-h4 text-primary">/ 消息發佈</h1>
                <button
                  type="button"
                  className="btn-puff btn-puff-primary btn-puff-cn-l cn-label-l"
                  onClick={() => openModal("create")}
                >
                  新增消息
                </button>
              </div>
            </div>
            <div className="col-12">
              <div className="bg-primary p-20 d-none d-lg-flex ">
                <div className="col-lg-4">
                  <p className="cn-body-m-bold text-taupe-200">發佈日期</p>
                </div>
                <div className="col-lg-4">
                  <p className="cn-body-m-bold text-center text-taupe-200">標題</p>
                </div>
                <div className="col-lg-4">
                  <p className="cn-body-m-bold text-end text-taupe-200 me-48">操作</p>
                </div>
              </div>
              <ul className="list-unstyled">
                {news.map((item) => (
                  <li
                    key={item.id}
                    className="py-24 px-20 bg-white border-bottom d-lg-flex align-items-center"
                  >
                    <div className="col-lg-4 mb-20 mb-lg-0">
                      <p className="text-primary cn-body-m-bold mb-8">
                        {new Date(item.create_at * 1000).toLocaleDateString().replace(/\//g, ".")}
                      </p>
                    </div>

                    <div className="col-lg-4 mb-20 mb-lg-0">
                      <p className="text-primary cn-body-m-bold text-lg-center">{item.title}</p>
                    </div>

                    <div className="col-lg-4 text-lg-end">
                      <button
                        type="button"
                        className="btn-puff btn-puff-outline btn-puff-cn-s cn-label-m me-4"
                        onClick={() => openModal("edit", item)}
                      >
                        編輯
                      </button>
                      <button
                        type="button"
                        className="btn-puff btn-puff-outline-danger btn-puff-cn-s cn-label-m"
                        onClick={() => handelDelArticle(item.id)}
                      >
                        刪除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex justify-content-start">
                <Navigation
                  pagination={pagination}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>
      <AdminNewsModal
        newsModalRef={newsModalRef}
        modalMode={modalMode}
        handleSubmit={handleSubmit}
        tempNews={tempNews}
        handleInputChange={handleInputChange}
        openModal={openModal}
        closeModal={closeModal}
        isUploading={isUploading}
        handleNewsImgUpload={handleNewsImgUpload}
      />
    </>
  );
}

export default AdminNews;
