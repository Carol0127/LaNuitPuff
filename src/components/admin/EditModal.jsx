import { useWatch } from "react-hook-form";
function EditModal({ modalElement, handleFormSubmit, control, modalRef, register }) {
  // 表單
  const id = useWatch({ control, name: "id" });
  const total = useWatch({ control, name: "total" });
  const productsMap = useWatch({ control, name: "products" }) || {};
  const products = Object.values(productsMap);

  return (
    <>
      <div
        className="modal fade"
        ref={modalElement}
        id="editModal"
        tabIndex="-1"
        aria-labelledby="editModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <form onSubmit={handleFormSubmit}>
              <div className="modal-header bg-primary">
                <h5
                  className="modal-title mb-12 mb-lg-8 cn-heading-h5 text-taupe-200"
                  id="editModalLabel"
                >
                  編輯訂單
                  <p className="cn-label-m text-taupe-200">{id}</p>
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  aria-label="Close"
                  onClick={() => modalRef.current?.hide()}
                ></button>
              </div>
              <div className="modal-body p-24 bg-taupe-200">
                <div className="container-fluid p-0">
                  <div className="row">
                    <div className="col-lg-6">
                      <h3 className="text-primary cn-heading-h5 mb-24">基本聯絡資訊</h3>
                      <div className="row">
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="name"
                            className="cn-label-m mb-8 mb-lg-16 text-gray-500"
                          >
                            顧客姓名
                          </label>
                          <input
                            {...register("user.name")}
                            id="name"
                            type="text"
                            className="form-control bg-taupe-200 shadow-none"
                          />
                        </div>
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="tel"
                            className="cn-label-m mb-8 mb-lg-16 text-gray-500"
                          >
                            連絡電話
                          </label>
                          <input
                            {...register("user.tel")}
                            id="tel"
                            type="tel"
                            className="form-control bg-taupe-200"
                          />
                        </div>
                        <div className="col-12 mb-32">
                          <label
                            htmlFor="eamil"
                            className="cn-label-m mb-8 mb-lg-16 text-gray-500"
                          >
                            電子信箱
                          </label>
                          <input
                            {...register("user.email")}
                            id="eamil"
                            type="eamil"
                            className="form-control bg-taupe-200"
                          />
                        </div>
                      </div>
                      <h3 className="text-primary cn-heading-h5 mb-24">物流與備註</h3>
                      <div className="row">
                        <div className="col-12 mb-24">
                          <label
                            htmlFor="adress"
                            className="cn-label-m mb-8 mb-lg-16 text-gray-500"
                          >
                            收件地址
                          </label>
                          <input
                            {...register("user.address")}
                            id="adress"
                            type="text"
                            className="form-control bg-taupe-200"
                          />
                        </div>
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="shipped"
                            className="cn-label-m mb-8 mb-lg-16 text-gray-500"
                          >
                            物流方式
                          </label>
                          <input
                            {...register("shipped")}
                            id="shipped"
                            type="text"
                            className="form-control bg-taupe-200"
                          />
                        </div>
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="shippedId"
                            className="cn-label-m mb-8 mb-lg-16 text-gray-500"
                          >
                            物流單號
                          </label>
                          <input
                            {...register("shippedId")}
                            id="shippedId"
                            type="text"
                            className="form-control bg-taupe-200"
                          />
                        </div>
                        <div className="col-12">
                          <label
                            htmlFor="message"
                            className="cn-label-m mb-8 mb-lg-16 text-gray-500"
                          >
                            訂單備註
                          </label>
                          <textarea
                            {...register("message")}
                            className="form-control bg-taupe-200 rounded-2 border p-12 shadow-none"
                            id="orderNote"
                            rows="5"
                          ></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="col-lg-6">
                      <h3 className="text-primary cn-heading-h5 mb-24">訂單狀態管理</h3>
                      <div className="row">
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="orderStates"
                            className="cn-label-m mb-8 mb-lg-16 text-gray-500"
                          >
                            訂單狀態
                          </label>
                          <select
                            {...register("status")}
                            className="form-select border-0 border-bottom bg-taupe-200"
                          >
                            <option value="待處理">待處理</option>
                            <option value="待烘焙">待烘焙</option>
                            <option value="已出貨">已出貨</option>
                            <option value="已完成">已完成</option>
                          </select>
                        </div>
                        <div className="col-6 mb-24">
                          <label
                            htmlFor="orderStates"
                            className="cn-label-m mb-8 mb-lg-16 text-gray-500"
                          >
                            付款狀態
                          </label>
                          <select
                            {...register("is_paid")}
                            className="form-select border-0 border-bottom bg-taupe-200"
                          >
                            <option value={false}>未付款</option>
                            <option value={true}>已付款</option>
                          </select>
                        </div>
                        <div className="col-12">
                          <div className="bg-white border p-16">
                            <p className="cn-label-m">訂購品項</p>
                            <ul className="list-unstyled">
                              {products.map((item) => (
                                <li
                                  key={item.id}
                                  className="border-bottom py-12 d-flex justify-content-between align-items-center"
                                >
                                  <div>
                                    <p className="text-primary cn-label-m mb-12">{item.product.title}</p>
                                    <div className="d-flex">
                                      <p className="text-gray-500 cn-label-m me-12">單顆·Solo</p>
                                      <p className="text-gray-500 cn-label-m me-12">{item.qty}份</p>
                                    </div>
                                  </div>

                                  <p className="text-primary cn-label-m">NT.{item.total}</p>
                                </li>
                              ))}
                            </ul>
                            <div className="d-flex justify-content-between align-items-center">
                              <p className="cn-label-m text-gray-800">總金額</p>
                              <p className="eng-heading-h3 text-primary">NT.{total}</p>
                            </div>
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
                  onClick={() => modalRef.current?.hide()}
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="btn-puff btn-puff-primary btn-puff-cn-m"
                >
                  儲存訂單
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditModal;
