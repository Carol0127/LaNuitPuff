function AdminNewsModal({
  newsModalRef,
  modalMode,
  handleSubmit,
  tempNews,
  handleInputChange,
  closeModal,
  isUploading,
  handleNewsImgUpload,
}) {
  if (!tempNews) return null;
  return (
    <>
      <div
        className="modal fade"
        tabIndex="-1"
        aria-hidden="true"
        ref={newsModalRef}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className={`modal-header ${modalMode === "create" ? "bg-secondary" : "bg-primary"}`}>
              <h5
                className="modal-title text-taupe-200"
                id="exampleModalLabel"
              >
                {modalMode === "create" ? "新增消息" : "編輯消息"}{" "}
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-24 bg-taupe-200">
              <div className="container-fluid p-0">
                <div className="row">
                  <form
                    id="newsForm"
                    onSubmit={handleSubmit}
                  >
                    <div className="col-12 mb-24">
                      <label
                        htmlFor="title"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        產品標題
                      </label>
                      <input
                        id="title"
                        type="text"
                        className="form-control bg-taupe-200"
                        placeholder="請輸入標題"
                        value={tempNews.title}
                        onChange={handleInputChange}
                      />
                    </div>
                    <div className="col-12 mb-24">
                      <label
                        htmlFor="formFile"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        {isUploading ? "圖片上傳中..." : "上傳主圖檔案"}
                      </label>
                      <input
                        className="form-control"
                        type="file"
                        id="formFile"
                        onChange={handleNewsImgUpload}
                        disabled={isUploading}
                      />
                    </div>

                    <div className="col-12 mb-24">
                      <label
                        htmlFor="image"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        主圖網址
                      </label>
                      <input
                        id="image"
                        type="text"
                        className="form-control bg-taupe-200"
                        placeholder="請貼上網址"
                        value={tempNews.image}
                        onChange={handleInputChange}
                      />
                    </div>

                    {tempNews.image && (
                      <div className="col-12 mb-24">
                        <p className="cn-label-m mb-8 text-primary">圖片預覽</p>
                        <img
                          src={tempNews.image}
                          alt="預覽圖"
                          className="img-fluid rounded shadow-sm"
                          style={{ maxHeight: "200px", objectFit: "cover" }}
                        />
                      </div>
                    )}

                    <div className="col-12 mb-24">
                      <label
                        htmlFor="content"
                        className="cn-label-m mb-8 mb-lg-16 text-primary"
                      >
                        消息內容
                      </label>
                      <textarea
                        id="content"
                        className="form-control bg-taupe-200"
                        placeholder="請輸入內容，最多不超過30字"
                        value={tempNews.content || ""}
                        onChange={handleInputChange}
                        rows={5}
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="modal-footer bg-taupe-200">
              <button
                type="button"
                className="btn-puff btn-puff-outline btn-puff-cn-m"
                onClick={closeModal}
              >
                取消
              </button>
              <button
                type="button"
                className="btn-puff btn-puff-primary btn-puff-cn-m"
                onClick={handleSubmit}
              >
                {modalMode === "create" ? "確認新增" : "儲存修改"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminNewsModal;
