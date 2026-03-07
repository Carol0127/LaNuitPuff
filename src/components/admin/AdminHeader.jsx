import { NavLink, useNavigate } from "react-router";
import { SuccessToast } from "../Toast";
import Swal from "sweetalert2";
import { Offcanvas } from "bootstrap";

function AdminHeader() {
  const navigate = useNavigate();
  const handleLogout = () => {
    Swal.fire({
      title: "確定要登出嗎？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4A3B31", // 妳指定的 Primary 深色
      cancelButtonColor: "#9E9E9E",
      confirmButtonText: "是的，登出",
      cancelButtonText: "先不要",
      customClass: {
        title: "cn-heading-h4",
        htmlContainer: "cn-body-m-regular",
        confirmButton: "btn-puff-primary", // 確保妳的 CSS 有這個 class
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();

        document.cookie = "hexToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

        SuccessToast.fire({
          icon: "success",
          title: "已安全登出",
        });

        navigate("/adminLogin");
      }
    });
  };
  const closeOffcanvas = () => {
    const closeBtn = document.querySelector("#offcanvasNavbar .btn-close");
    if (closeBtn) closeBtn.click();
  };
  return (
    <>
      <nav className="navbar navbar-expand-lg bg-primary p-0 fixed-top transition-navbar">
        <div className="container px-16 py-12 py-lg-20">
          <NavLink
            className="navbar-brand me-auto p-0"
            to="/admin"
          >
            <h1 className="eng-heading-h3 text-taupe-200 mb-8">La Nuit Puff</h1>
            <p className="cn-label-m text-taupe-200">店家後台管理</p>
          </NavLink>

          <div className="d-flex align-items-center order-lg-3">
            <button
              className="nav-link me-20 me-lg-0 text-taupe-200"
              onClick={handleLogout}
            >
              <span className="material-symbols-outlined align-bottom">logout</span>
            </button>
            <button
              className="navbar-toggler text-taupe-200 border-0 p-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            >
              <span className="material-symbols-outlined">dehaze</span>
            </button>
          </div>

          <div
            className="offcanvas offcanvas-end bg-primary"
            tabIndex="-1"
            id="offcanvasNavbar"
          >
            <div className="offcanvas-header px-16 py-20">
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                style={{ fontSize: "24px" }}
              ></button>
            </div>
            <div className="offcanvas-body">
              <ul
                className="navbar-nav align-items-center justify-content-center flex-grow-1 pe-3 text-center"
                style={{ gap: "24px" }}
              >
                <li className="nav-item">
                  <NavLink
                    className="nav-link cn-label-l text-taupe-200"
                    to="/admin"
                    onClick={closeOffcanvas}
                  >
                    <div className="d-flex align-items-center">
                      <span className="material-symbols-outlined align-bottom me-8">dashboard</span>
                      <p>數據概覽</p>
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link cn-label-l text-taupe-200"
                    to="/admin/orders"
                    onClick={closeOffcanvas}
                  >
                    <div className="d-flex align-items-center">
                      <span className="material-symbols-outlined align-bottom me-8">event_list</span>
                      <p>訂單管理</p>
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link cn-label-l text-taupe-200"
                    to="/admin/products"
                    onClick={closeOffcanvas}
                  >
                    <div className="d-flex align-items-center">
                      <span className="material-symbols-outlined align-bottom me-8">chef_hat</span>
                      <p>商品管理</p>
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link cn-label-l text-taupe-200"
                    to="/admin/news"
                    onClick={closeOffcanvas}
                  >
                    <div className="d-flex align-items-center">
                      <span className="material-symbols-outlined align-bottom me-8">notifications</span>
                      <p>消息發佈</p>
                    </div>
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link cn-label-l text-taupe-200"
                    to="/admin/articles"
                    onClick={closeOffcanvas}
                  >
                    <div className="d-flex align-items-center">
                      <span className="material-symbols-outlined align-bottom me-8">edit</span>
                      <p>文章編輯</p>
                    </div>
                  </NavLink>
                </li>
              </ul>
            </div>
            {/* Footer 部分 */}
            <div className="offcanvas-footer d-lg-none mb-20">
              <ul className="navbar-nav justify-content-center flex-row mb-16">
                <li className="nav-item me-16">
                  <i
                    className="bi bi-facebook text-blue-300"
                    style={{ fontSize: "24px" }}
                  ></i>
                </li>
                <li>
                  <i
                    className="bi bi-instagram text-blue-300"
                    style={{ fontSize: "24px" }}
                  ></i>
                </li>
              </ul>
              <p className="text-blue-300 text-center eng-label-m m-0">
                2026 © Copyright By La Nuit Puff. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default AdminHeader;
