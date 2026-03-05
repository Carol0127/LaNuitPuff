import { useState, useEffect, useRef, useCallback } from "react";
import { delProduct, getProducts, uploadImg } from "../../services/admin";
import Navigation from "../../components/Navigation";

import { Modal } from "bootstrap";

import { ConfirmDeleteModal, ErrorToast, SuccessToast } from "../../components/Toast";
import AdminProductModal from "../../components/admin/AdminProductModal";

const initialForm = {
  title: "",
  title_eng: "",
  category: "",
  category_eng: "",
  unit: "",
  origin_price: 0,
  price: 0,
  description: "",
  content: "",
  is_enabled: false,
  imageUrl: "",
  imagesUrl: [],
};

function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [currentPage, setCurrentPage] = useState(1);

  const [tempProduct, setTempProduct] = useState(initialForm);
  const [modalMode, setModalMode] = useState("create");

  const fetchProducts = useCallback(async () => {
    try {
      const res = await getProducts(currentPage);
      if (res?.success) {
        setProducts(res.products || []);
        setPagination(res.pagination || {});
      }
      return res;
    } catch {
      ErrorToast({ title: "取得資料失敗" });
      return null;
    }
  }, [currentPage]);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      const res = await fetchProducts();
      if (res && isMounted) {
        setProducts(res.products || []);
        setPagination(res.pagination || {});
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [fetchProducts]);

  //  Modal 的 Ref
  const productModalRef = useRef(null);
  const modalInstance = useRef(null);

  useEffect(() => {
    if (productModalRef.current && !modalInstance.current) {
      modalInstance.current = new Modal(productModalRef.current);
    }

    return () => {
      if (modalInstance.current) {
        modalInstance.current.dispose();
      }
    };
  }, []);

  const openModal = (mode, product = initialForm) => {
    setModalMode(mode);
    setTempProduct({
      ...product,
      imagesUrl: product.imagesUrl || [],
    });
    modalInstance.current.show();
  };

  const closeModal = () => {
    modalInstance.current.hide();
  };

  const handleDel = async (id) => {
    const result = await ConfirmDeleteModal.fire();

    if (result.isConfirmed) {
      try {
        const res = await delProduct(id);

        if (res.success) {
          SuccessToast.fire({ title: "訂單已成功刪除" });
          fetchProducts();
        } else {
          ErrorToast.fire({ title: "刪除失敗" });
        }
      } catch {
        ErrorToast.fire({ title: "伺服器錯誤" });
      }
    }
  };

  return (
    <>
      <section className="bg-taupe-200 py-64 mt-80">
        <div className="container mb-20 mb-lg-28">
          <div className="row">
            <div className="col-12 mb-28">
              <div className="justify-content-between align-items-center d-flex">
                <h1 className="cn-heading-h4 text-primary">/ 訂單管理</h1>
                <button
                  type="button"
                  className="btn-puff btn-puff-primary btn-puff-cn-l cn-label-l"
                  onClick={() => openModal("create")}
                >
                  新增商品
                </button>
              </div>
            </div>
            <div className="col-12">
              {/* 表頭 */}
              <div className="bg-primary p-20 d-none d-lg-flex ">
                <div className="col-lg-4">
                  <p className="cn-body-m-bold text-taupe-200">產品名稱</p>
                </div>
                <div className="col-lg-2">
                  <p className="cn-body-m-bold text-center text-taupe-200">類別</p>
                </div>
                <div className="col-lg-1">
                  <p className="cn-body-m-bold text-center text-taupe-200">原價</p>
                </div>
                <div className="col-lg-1">
                  <p className="cn-body-m-bold text-center text-taupe-200">售價</p>
                </div>
                <div className="col-lg-2">
                  <p className="cn-body-m-bold text-center text-taupe-200">是否啟用</p>
                </div>
                <div className="col-lg-2">
                  <p className="cn-body-m-bold text-taupe-200 text-center">操作</p>
                </div>
              </div>
              {/* 訂單 */}
              <ul className="list-unstyled">
                {products.map((item) => (
                  <li
                    key={item.id}
                    className="py-24 px-20 bg-white border-bottom d-lg-flex align-items-center"
                  >
                    {/* 產品名稱 / ID */}
                    <div className="col-lg-4 mb-20 mb-lg-0">
                      <p className="text-primary cn-body-m-bold mb-8">{item.title}</p>
                      <p className="text-gray-500 cn-body-s-regular">{item.title_eng}</p>
                    </div>

                    {/* 類別 */}
                    <div className="col-lg-2 mb-20 mb-lg-0">
                      <p className="text-primary cn-body-m-bold text-lg-center">{item.category}</p>
                    </div>

                    {/* 原價 */}
                    <div className="col-lg-1 d-none d-lg-flex mb-20 mb-lg-0">
                      <p className="text-gray-500 cn-body-m-bold text-lg-center w-100">NT.{item.origin_price}</p>
                    </div>

                    {/* 售價 */}
                    <div className="col-lg-1 mb-20 mb-lg-0">
                      <p className="text-primary cn-body-m-bold text-lg-center">NT.{item.price}</p>
                    </div>

                    {/* 是否啟用 */}
                    <div className="col-lg-2 mb-20 mb-lg-0">
                      {item.is_enabled ? (
                        <p className="text-success cn-body-m-bold text-lg-center">已啟用</p>
                      ) : (
                        <p className="text-danger cn-body-m-bold text-lg-center">未啟用</p>
                      )}
                    </div>

                    <div className="col-lg-2 text-lg-center">
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
                        onClick={() => handleDel(item.id)}
                      >
                        刪除
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="d-flex ">
                <Navigation
                  pagination={pagination}
                  setCurrentPage={setCurrentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <AdminProductModal
        modalMode={modalMode}
        tempProduct={tempProduct}
        setTempProduct={setTempProduct}
        fetchProducts={fetchProducts}
        closeModal={closeModal}
        productModalRef={productModalRef}
        uploadImg={uploadImg}
        SuccessToast={SuccessToast}
        ErrorToast={ErrorToast}
      />
    </>
  );
}

export default AdminProducts;
