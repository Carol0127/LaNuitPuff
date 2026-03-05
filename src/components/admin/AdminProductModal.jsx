import { useImageUpload } from "../../hooks/useImageUpload";
import { addProduct, editProduct } from "../../services/admin";
import { ErrorToast, SuccessToast } from "../Toast";

function AdminProductModal({
  modalMode,
  tempProduct,
  setTempProduct,
  closeModal,
  productModalRef,
  uploadImg,
  fetchProducts,
}) {
  const { handleUpload, isUploading } = useImageUpload(uploadImg);
  // 1. 欄位變更處理
  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setTempProduct((prev) => ({
      ...prev,
      [id]: type === "checkbox" ? checked : value,
    }));
  };

  // 2. 多圖處理
  const handleImagesChange = (index, value) => {
    const newImages = [...tempProduct.imagesUrl];
    newImages[index] = value;
    setTempProduct((prev) => ({ ...prev, imagesUrl: newImages }));
  };

  // 3. 新增圖片
  const addImageColumn = () => {
    if ((tempProduct.imagesUrl?.length || 0) >= 5) {
      alert("最多五張圖喔！");
      return;
    }
    setTempProduct((prev) => ({
      ...prev,
      imagesUrl: [...(prev.imagesUrl || []), ""],
    }));
  };

  // 4. 刪除最後一欄
  const removeImageColumn = () => {
    const newImages = [...tempProduct.imagesUrl];
    newImages.pop();
    setTempProduct((prev) => ({ ...prev, imagesUrl: newImages }));
  };

  // 5. 主圖上傳
  const handleMainImgUpload = async (e) => {
    const imgUrl = await handleUpload(e);
    if (imgUrl) {
      setTempProduct((prev) => ({ ...prev, imageUrl: imgUrl }));
    }
  };

  // 6. 提交表單
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      ...tempProduct,
      origin_price: Number(tempProduct.origin_price),
      price: Number(tempProduct.price),
      is_enabled: tempProduct.is_enabled ? 1 : 0,
    };

    try {
      let res;
      if (modalMode === "create") {
        res = await addProduct(payload);
      } else {
        res = await editProduct(tempProduct.id, payload);
      }

      if (res?.success) {
        SuccessToast.fire({
          title: modalMode === "create" ? "已成功新增商品" : "已成功編輯商品資訊",
        });

        await fetchProducts();
        closeModal();
      } else {
        ErrorToast.fire({ title: modalMode === "create" ? "新增失敗，請重新上傳" : "編輯失敗，請重新編輯" });
      }
    } catch (error) {
      ErrorToast.fire({ title: "提交失敗", message: error });
    }
  };
  return (
    <>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModal"
        aria-hidden="true"
        ref={productModalRef}
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleSubmit}>
              <div className={`modal-header ${modalMode === "create" ? "bg-secondary" : "bg-primary"}`}>
                <h5
                  className="modal-title cn-heading-h5 text-taupe-200"
                  id="editModalLabel"
                >
                  {modalMode === "create" ? "新增商品" : `編輯商品`}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={closeModal}
                ></button>
              </div>
              <div className="modal-body p-24 bg-taupe-200">
                <div className="container-fluid p-0">
                  <div className="row">
                    <div className="col-lg-4">
                      <div className="row">
                        <div className="col-12 mb-32">
                          <label className="cn-label-m mb-8 text-primary d-block">產品主圖</label>

                          {/* 預覽視窗 */}
                          <div
                            className="border bg-white d-flex align-items-center justify-content-center mb-16 "
                            style={{ height: "240px" }}
                          >
                            {tempProduct.imageUrl ? (
                              <img
                                src={tempProduct.imageUrl}
                                className="img-fluid h-100 w-100 object-fit-cover"
                                alt="主圖預覽"
                              />
                            ) : (
                              <span className="text-gray-500">尚未上傳圖片</span>
                            )}
                          </div>

                          {/* 上傳按鈕 */}
                          <div className="mb-16">
                            <label
                              htmlFor="mainFile"
                              className="form-label cn-body-s-regular"
                            >
                              {isUploading ? "圖片上傳中..." : "上傳檔案"}
                            </label>
                            <input
                              className="form-control"
                              type="file"
                              id="mainFile"
                              onChange={handleMainImgUpload}
                              disabled={isUploading}
                            />
                          </div>

                          {/* 網址輸入 */}
                          <div>
                            <label
                              htmlFor="imageUrl"
                              className="form-label cn-body-s-regular"
                            >
                              或貼上圖片網址
                            </label>
                            <input
                              id="imageUrl"
                              type="text"
                              className="form-control"
                              placeholder="https://..."
                              value={tempProduct.imageUrl || ""}
                              onChange={handleInputChange}
                            />
                          </div>
                        </div>
                        <div className="col-12 mb-32">
                          <div className="d-flex justify-content-between mb-2">
                            <label className="text-primary">產品細節圖</label>
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-primary"
                              onClick={addImageColumn}
                            >
                              新增欄位
                            </button>
                          </div>

                          {tempProduct.imagesUrl?.map((url, index) => (
                            <div
                              key={index}
                              className="mb-3 border-bottom pb-2"
                            >
                              <input
                                type="text"
                                className="form-control mb-2"
                                placeholder={`圖片網址 ${index + 1}`}
                                value={url}
                                onChange={(e) => handleImagesChange(index, e.target.value)}
                              />
                              {url && (
                                <img
                                  src={url}
                                  className="img-fluid"
                                  style={{ maxHeight: "100px" }}
                                />
                              )}
                            </div>
                          ))}

                          {tempProduct.imagesUrl?.length > 0 && (
                            <button
                              type="button"
                              className="btn btn-sm btn-outline-danger w-100"
                              onClick={removeImageColumn}
                            >
                              刪除最後一個欄位
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-8">
                      <div className="row">
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="title"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            產品中文名稱
                          </label>
                          <input
                            id="title"
                            type="text"
                            className="form-control bg-taupe-200"
                            value={tempProduct.title}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="title_eng"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            產品英文名稱
                          </label>
                          <input
                            id="title_eng"
                            type="text"
                            className="form-control bg-taupe-200"
                            value={tempProduct.title_eng || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="category"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            分類
                          </label>
                          <input
                            id="category"
                            type="text"
                            className="form-control bg-taupe-200"
                            value={tempProduct.category}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="category_eng"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            分類英文名稱
                          </label>
                          <input
                            id="category_eng"
                            type="text"
                            className="form-control bg-taupe-200"
                            value={tempProduct.category_eng || ""}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-12 mb-24">
                          <label
                            htmlFor="unit"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            單位
                          </label>
                          <input
                            id="unit"
                            type="text"
                            className="form-control bg-taupe-200"
                            value={tempProduct.unit}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-12 mb-24">
                          <label
                            htmlFor="description"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            描述
                          </label>
                          <textarea
                            className="form-control bg-taupe-200 rounded-2 border p-12 shadow-none"
                            id="description"
                            rows="5"
                            value={tempProduct.description}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="origin_price"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            原價
                          </label>
                          <input
                            id="origin_price"
                            type="number"
                            className="form-control bg-taupe-200"
                            value={tempProduct.origin_price}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="price"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            售價
                          </label>
                          <input
                            id="price"
                            type="number"
                            className="form-control bg-taupe-200"
                            value={tempProduct.price}
                            onChange={handleInputChange}
                          />
                        </div>
                        <div className="col-12 mb-24">
                          <label
                            htmlFor="content"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            內容
                          </label>
                          <textarea
                            className="form-control bg-taupe-200 rounded-2 border p-12 shadow-none"
                            id="content"
                            rows="5"
                            value={tempProduct.content}
                            onChange={handleInputChange}
                          ></textarea>
                        </div>
                        <div className="col-12 mb-24">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              id="is_enabled"
                              checked={tempProduct.is_enabled}
                              onChange={handleInputChange}
                            />
                            <label
                              className="cn-label-m mb-8 mb-lg-16 text-primary"
                              htmlFor="is_enabled"
                            >
                              是否啟用
                            </label>
                          </div>
                        </div>
                      </div>
                    </div>
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
                  type="submit"
                  className="btn-puff btn-puff-primary btn-puff-cn-m"
                >
                  {modalMode === "create" ? "確認新增" : "儲存修改"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminProductModal;
