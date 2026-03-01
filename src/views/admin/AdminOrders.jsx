import { useEffect, useMemo, useRef, useState } from "react";
import { delAllOrder, delOrder, editOrder } from "../../services/admin";
import { useForm } from "react-hook-form";

import Swal from "sweetalert2";
import { ConfirmDeleteModal, ErrorToast, SuccessToast } from "../../components/Toast";
import * as bootstrap from "bootstrap";
import EditModal from "../../components/admin/EditModal";

import { useAdminOrders } from "../../hooks/adminOrders";
import Navigation from "../../components/Navigation";

function AdminOrders() {
  const { register, handleSubmit, reset, control } = useForm();
  const [searchTerm, setSearchTerm] = useState("");
  const { orders, pagination, setCurrentPage, refreshOrders } = useAdminOrders();
  // 將時間戳轉換為 YYYY/MM/DD
  const formatDate = (timestamp) => {
    if (!timestamp) return "無日期資料";
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
  };

  const modalRef = useRef(null); // 用來存放 Modal 實例
  const modalElement = useRef(null); // 用來綁定 DOM
  useEffect(() => {
    modalRef.current = new bootstrap.Modal(modalElement.current);
  }, []);

  const openEditModal = (order) => {
    reset({
      ...order,
      shipped: "黑貓冷凍宅配",
      shippedId: "尚未出貨",
      status: "待烘焙",
    });
    modalRef.current.show();
  };

  const handleFormSubmit = (e) => {
    handleSubmit(onSubmit)(e);
  };

  const onSubmit = async (formData) => {
    try {
      const payload = {
        ...formData,
        is_paid: formData.is_paid === "true" || formData.is_paid === true,
      };

      const res = await editOrder(formData.id, { data: payload });

      if (res.success) {
        SuccessToast.fire({
          title: "已成功更新訂單資訊",
        });
        modalRef.current?.hide();
        refreshOrders();
      } else {
        ErrorToast.fire({
          title: "訂單資訊更新失敗",
        });
      }
    } catch (error) {
      console.error("發送請求出錯", error);
      ErrorToast.fire({ title: "伺服器連線錯誤" });
    }
  };

  const handleDel = async (id) => {
    const result = await ConfirmDeleteModal.fire();

    if (result.isConfirmed) {
      try {
        const res = await delOrder(id);

        if (res.success) {
          SuccessToast.fire({ title: "訂單已成功刪除" });
          refreshOrders();
        } else {
          ErrorToast.fire({ title: "刪除失敗" });
        }
      } catch {
        ErrorToast.fire({ title: "伺服器錯誤" });
      }
    }
  };
  const handleAllDel = async () => {
    const result = await ConfirmDeleteModal.fire();

    if (result.isConfirmed) {
      try {
        const res = await delAllOrder();

        if (res.success) {
          SuccessToast.fire({ title: "所有訂單已清空" });
          refreshOrders(1);
        } else {
          ErrorToast.fire({ title: "刪除失敗" });
        }
      } catch {
        ErrorToast.fire({ title: "伺服器錯誤" });
      }
    }
  };

  // 分頁狀態
  const [currentTab, setCurrentTab] = useState("全部");
  const filteredOrders = useMemo(() => {
    const ordersWithStatus = orders.map((order) => ({
      ...order,
      status: order.status || "待烘焙",
    }));

    let result = ordersWithStatus;

    // 2. 進行 Tab 分類過濾
    if (currentTab !== "全部") {
      result = result.filter((order) => order.status === currentTab);
    }

    // 3. 進行關鍵字搜尋過濾
    if (searchTerm.trim()) {
      const keyword = searchTerm.toLowerCase();
      result = result.filter(
        (order) => order.id.toLowerCase().includes(keyword) || order.user.name.toLowerCase().includes(keyword),
      );
    }

    return result;
  }, [orders, currentTab, searchTerm]);

  return (
    <>
      <section className="bg-taupe-200 py-64 mt-80">
        <div className="container mb-20 mb-lg-28">
          <div className="row">
            <div className="col-lg-9 mb-20 mb-lg-0">
              <h1 className="cn-heading-h4 text-primary w-100">/ 訂單管理</h1>
            </div>
            <div className="col-lg-3">
              <div className="input-group justify-content-end">
                <span className="input-group-text rounded-0 bg-white border-0">
                  <span className="material-symbols-outlined  align-bottom ">search</span>
                </span>
                <input
                  type="text"
                  className="form-control form-control-no-border ps-0"
                  placeholder="搜尋訂單編號或姓名"
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            {/* 選單 */}
            <div className="col-12 mb-28 overflow-x-auto">
              <ul
                className="nav flex-nowrap"
                id="orders-tab"
                role="tablist"
                style={{ width: "max-content", minWidth: "100%" }}
              >
                {["全部", "待處理", "待烘焙", "已出貨", "已完成"].map((tab) => (
                  <li
                    className="nav-item "
                    key={tab}
                    role="presentation"
                  >
                    <button
                      className={`nav-link nav-link-admin-orders flex-shrink-0 me-8 ${
                        currentTab === tab ? "active" : ""
                      }`}
                      type="button"
                      onClick={() => setCurrentTab(tab)}
                    >
                      {tab}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            {/* 內容 */}
            <div
              className="tab-content"
              id="pills-tabContent"
            >
              <div
                className="tab-pane fade show active"
                id="all"
                role="tabpanel"
                aria-labelledby="all-tab"
              >
                {/* 表頭 */}
                <div className="bg-primary p-20 d-none d-lg-flex ">
                  <div className="col-lg-4">
                    <p className="cn-body-m-bold text-taupe-200">訂單編號/日期</p>
                  </div>
                  <div className="col-lg-2">
                    <p className="cn-body-m-bold text-taupe-200">顧客資訊</p>
                  </div>
                  <div className="col-lg-2">
                    <p className="cn-body-m-bold text-taupe-200">總額/付款方式</p>
                  </div>
                  <div className="col-lg-2">
                    <p className="cn-body-m-bold text-taupe-200">狀態</p>
                  </div>
                  <div className="col-lg-2">
                    <p className="cn-body-m-bold text-taupe-200">操作</p>
                  </div>
                </div>
                {/* 訂單 */}
                <ul className="list-unstyled">
                  {filteredOrders.length > 0 ? (
                    filteredOrders.map((order) => (
                      <li
                        key={order.id}
                        className="py-24 px-20 bg-white border-bottom d-lg-flex align-items-center"
                      >
                        <div className="col-lg-4 mb-20 mb-lg-0">
                          <p className="text-primary cn-body-m-bold mb-4 mb-lg-8">ID{order.id}</p>
                          <p className="text-gray-500 cn-body-s-regular">{formatDate(order.create_at)}</p>
                        </div>
                        <div className="col-lg-2 mb-20 mb-lg-0">
                          <p className="text-primary cn-body-m-bold mb-4 mb-lg-8">{order.user.name}</p>
                          <p className="text-gray-500 cn-body-s-regular">{order.user.tel}</p>
                        </div>
                        <div className="col-lg-2 mb-20 mb-lg-0">
                          <p className="text-primary cn-body-m-bold mb-4 mb-lg-8">NT.{order.total}</p>
                          <p className="text-gray-500 cn-body-s-regular">{order.is_paid ? "已付款" : "未付款"}</p>
                        </div>
                        <div className="col-lg-2 mb-20 mb-lg-0">
                          <p className="text-primary cn-body-m-bold mb-4 mb-lg-8">{order.status}</p>
                        </div>
                        <div className="col-lg-2 ">
                          <button
                            type="button"
                            className="btn-puff btn-puff-primary btn-puff-cn-s cn-label-s me-8"
                            onClick={() => openEditModal(order)}
                          >
                            編輯訂單
                          </button>
                          <button
                            type="button"
                            className="btn btn-outline"
                            onClick={() => handleDel(order.id)}
                          >
                            <span className="material-symbols-outlined align-bottom text-danger">delete</span>
                          </button>
                        </div>
                      </li>
                    ))
                  ) : (
                    <li className="py-40 text-center bg-white border-bottom">
                      <p className="text-gray-500">目前沒有「{currentTab}」狀態的訂單</p>
                    </li>
                  )}
                </ul>
              </div>
            </div>
            <div className="d-flex justify-content-between">
              <Navigation
                pagination={pagination}
                setCurrentPage={setCurrentPage}
              />
              <button
                type="button"
                className="btn-puff btn-puff-outline btn-puff-cn-m cn-label-m"
                onClick={() => handleAllDel()}
              >
                全部刪除
              </button>
            </div>
          </div>
        </div>
      </section>
      <EditModal
        modalElement={modalElement}
        modalRef={modalRef}
        register={register}
        control={control}
        handleFormSubmit={handleFormSubmit}
      />
    </>
  );
}

export default AdminOrders;
