import { CKEditor } from "@ckeditor/ckeditor5-react";
import { uploadImg } from "../../services/admin";
import { ErrorToast, SuccessToast } from "../../components/Toast";

// CKEditor 圖片上傳轉接器
class ArticleImageUploadAdapter {
  constructor(loader) {
    this.loader = loader;
  }
  async upload() {
    const file = await this.loader.file;
    try {
      const res = await uploadImg(file);
      if (res?.success) {
        return { default: res.imageUrl };
      }
      throw new Error(res?.message || "上傳失敗");
    } catch (error) {
      console.error("圖片上傳出錯:", error);
      throw error;
    }
  }
}

function AdminArticlesEdit({ tempArticle, setTempArticle, ClassicEditor, setIsEditing, handleSubmit }) {
  // 處理一般文字輸入
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTempArticle((prev) => ({ ...prev, [name]: value }));
  };

  // 處理文章主視覺圖上傳
  const handleMainImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    try {
      const res = await uploadImg(file);
      if (res?.success) {
        setTempArticle((prev) => ({ ...prev, image: res.imageUrl }));
        SuccessToast.fire({ title: "主圖上傳成功" });
      }
    } catch {
      ErrorToast.fire({ title: "圖片上傳失敗" });
    }
  };

  return (
    <>
      <div className="row">
        <div className="col-12 mb-28">
          <h1 className="cn-heading-h4 text-primary">/ {tempArticle.id ? "編輯文章" : "新增文章"}</h1>
        </div>
        <div className="col-12 bg-white p-24 border border-radius-0">
          {/* 標題 */}
          <div className="mb-28">
            <label className="form-label cn-label-m-regular text-primary">標題</label>
            <input
              name="title"
              type="text"
              className="form-control"
              value={tempArticle.title || ""}
              onChange={handleInputChange}
              placeholder="請輸入標題"
            />
          </div>

          {/* 主視覺圖 */}
          <div className="mb-28">
            <label className="form-label cn-label-m-regular text-primary">文章主視覺圖</label>
            <div className="input-group">
              <input
                name="image"
                type="text"
                className="form-control"
                value={tempArticle.image || ""}
                onChange={handleInputChange}
                placeholder="圖片網址"
              />
              <label className="btn btn-outline-primary mb-0 d-flex align-items-center cursor-pointer">
                上傳檔案
                <input
                  type="file"
                  hidden
                  onChange={handleMainImageUpload}
                  accept="image/*"
                />
              </label>
            </div>
            {tempArticle.image && (
              <img
                src={tempArticle.image}
                alt="預覽"
                className="mt-12 border object-fit-cover"
                style={{ width: "160px", height: "100px" }}
              />
            )}
          </div>

          <div className="row mb-28">
            {/* 作者 */}
            <div className="col-lg-4 mb-28 mb-lg-0">
              <label className="form-label cn-label-m-regular text-primary">作者</label>
              <input
                name="author"
                type="text"
                className="form-control"
                value={tempArticle.author || ""}
                onChange={handleInputChange}
                placeholder="La Nuit Puff 主理人"
              />
            </div>
            {/* 標籤 */}
            <div className="col-lg-4 mb-28 mb-lg-0">
              <label className="form-label cn-label-m-regular text-primary">標籤 (請以逗號分隔)</label>
              <input
                name="tag"
                type="text"
                className="form-control"
                value={Array.isArray(tempArticle.tag) ? tempArticle.tag.join(", ") : ""}
                onChange={(e) =>
                  setTempArticle((prev) => ({
                    ...prev,
                    tag: e.target.value.split(",").map((s) => s.trim()),
                  }))
                }
                placeholder="例如: 甜點工藝, 品牌故事"
              />
            </div>
            {/* 日期 */}
            <div className="col-lg-4">
              <label className="form-label cn-label-m-regular text-primary">發佈日期</label>
              <input
                name="create_at"
                type="date"
                className="form-control"
                value={tempArticle.create_at ? new Date(tempArticle.create_at * 1000).toISOString().split("T")[0] : ""}
                onChange={(e) => {
                  const timestamp = Math.floor(new Date(e.target.value).getTime() / 1000);
                  setTempArticle((prev) => ({ ...prev, create_at: timestamp }));
                }}
              />
            </div>
          </div>

          {/* CKEditor 內容區 */}
          <div className="mb-28 ck-editor-custom">
            <label className="form-label cn-label-m-regular text-primary">文章內容</label>
            <CKEditor
              key={tempArticle.id || "new"}
              editor={ClassicEditor}
              data={tempArticle.content || ""}
              config={{
                licenseKey: "GPL",
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "bulletedList",
                  "numberedList",
                  "blockQuote",
                  "insertTable",
                  "uploadImage",
                  "undo",
                  "redo",
                ],
              }}
              onReady={(editor) => {
                editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
                  return new ArticleImageUploadAdapter(loader);
                };
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setTempArticle((prev) => ({ ...prev, content: data }));
              }}
            />
          </div>

          {/* 底部操作 */}
          <div className="d-lg-flex justify-content-between align-items-center ">
            <div className="form-check mb-12 mb-lg-0">
              <input
                name="isPublic"
                type="checkbox"
                className="form-check-input shadow-none"
                id="isPublic"
                checked={tempArticle.isPublic}
                onChange={(e) => setTempArticle((prev) => ({ ...prev, isPublic: e.target.checked }))}
              />
              <label
                className="form-check-label text-primary"
                htmlFor="isPublic"
              >
                是否公開發佈
              </label>
            </div>
            <div>
              <button
                className="btn-puff btn-puff-outline btn-puff-cn-s me-8"
                onClick={() => setIsEditing(false)}
              >
                取消
              </button>
              <button
                className="btn-puff btn-puff-primary btn-puff-cn-s"
                onClick={handleSubmit}
              >
                {tempArticle.id ? "確認更新" : "確認發佈"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdminArticlesEdit;
