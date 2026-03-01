import { useEffect } from "react";
import { NavLink, useLocation, Outlet, useNavigate } from "react-router";

import { SuccessToast } from "../../components/Toast";
import Swal from "sweetalert2";
import AOS from "aos";

function User() {
  const navigate = useNavigate();
  const menuItems = [
    { name: "訂單追蹤", path: "/user", icon: "local_shipping" },
    { name: "個人資料", path: "/user/profile", icon: "description" },
    { name: "我的最愛", path: "/user/favorite", icon: "favorite" },
  ];

  const handleLogout = () => {
    Swal.fire({
      title: "確定要登出嗎？",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4A3B31",
      cancelButtonColor: "#9E9E9E",
      confirmButtonText: "是的，登出",
      cancelButtonText: "先不要",
      customClass: {
        title: "cn-heading-h4",
        htmlContainer: "cn-body-m-regular",
        confirmButton: "btn-puff-primary",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.clear();
        sessionStorage.clear();
        SuccessToast.fire({
          icon: "success",
          title: "已安全登出",
        });
        navigate("/login");
      }
    });
  };

  const location = useLocation();
  useEffect(() => {
    AOS.refresh();
  }, [location.pathname]);
  return (
    <>
      <section className="bg-taupe-200 py-64 mt-64 py-lg-120 mt-lg-80">
        <div className="container">
          <div className="row align-items-start">
            <div
              className="col-lg-3 mb-24 mb-lg-0 sticky-lg-top"
              style={{ top: "124px" }}
            >
              <div className="bg-white border p-32">
                <h1 className="cn-heading-h4 text-primary mb-32">會員中心</h1>
                <div className="d-flex aligm-otems-center mb-32">
                  <img
                    src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/LOGO/web.png?raw=true"
                    alt="logo"
                    style={{ width: "60px", height: "60px" }}
                    className="me-32"
                  />
                  <div>
                    <p className="cn-body-m-regular text-primary mb-8">王小美</p>
                    <p className="cn-body-s-regular text-gray-800">Level 2 Member</p>
                  </div>
                </div>
                <ul className="list-unstyled mb-0">
                  {menuItems.map((item) => (
                    <li
                      key={item.path}
                      className="w-auto mb-16 "
                    >
                      <NavLink
                        to={item.path}
                        end
                        className={({ isActive }) =>
                          ` d-flex align-items-center py-8 cn-body-s-regular ${
                            isActive ? "text-primary" : "text-gray-500"
                          }`
                        }
                      >
                        <span className="material-symbols-outlined align-bottom me-8">{item.icon}</span>
                        {item.name}
                      </NavLink>
                    </li>
                  ))}
                  <li className="w-auto py-8">
                    <button
                      type="button"
                      className="btn p-0 cn-body-s-regular text-gray-500 w-100 text-start"
                      onClick={handleLogout}
                    >
                      <span className="material-symbols-outlined align-bottom me-8">logout</span>會員登出
                    </button>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-9">
              <div className="row g-16 g-lg-24 mb-48 flex-nowrap overflow-x-auto pb-12">
                <div className="col-10 col-lg-4 flex-shrink-0 ">
                  <div className="bg-white border px-20 py-28 h-100">
                    <span className="material-symbols-outlined align-bottom text-primary mb-12">local_shipping</span>
                    <p className="text-gray-800 cn-heading-h5 mb-12">當前訂單狀態</p>
                    <p className="text-primary cn-body-l-bold mb-12">師傅烘焙中</p>
                    <p className="text-gray-500 cn-label-s">ORD-123456</p>
                  </div>
                </div>
                <div className="col-10 col-lg-4 flex-shrink-0 ">
                  <div className="bg-white border px-20 py-28 h-100">
                    <span className="material-symbols-outlined align-bottom text-primary mb-12">savings</span>
                    <p className="text-gray-800 cn-heading-h5 mb-12">年度消費</p>
                    <p className="text-primary cn-body-l-bold mb-12">NT.9,999</p>
                    <p className="text-gray-500 cn-label-s">今年已累計10筆訂單</p>
                  </div>
                </div>
                <div className="col-10 col-lg-4 flex-shrink-0 ">
                  <div className="bg-white border px-20 py-28 h-100">
                    <span className="material-symbols-outlined align-bottom text-primary mb-12">workspace_premium</span>
                    <p className="text-gray-800 cn-heading-h5 mb-12">會員等級</p>
                    <p className="text-primary cn-body-l-bold mb-12">沉思守夜人</p>
                    <p className="text-gray-500 cn-label-s">20:00-03:00 下單 5 次 即可升級</p>
                  </div>
                </div>
              </div>
              <div
                key={location.pathname}
                data-aos="fade-right"
                data-aos-duration="800"
              >
                <Outlet />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default User;
