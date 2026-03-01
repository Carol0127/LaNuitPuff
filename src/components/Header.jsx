import { NavLink, useLocation } from "react-router";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchCartAsync } from "../store/slices/cartSlice";
import { useScroll } from "../hooks/scrollToHash";

function Header() {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  const { scrollToAnchor } = useScroll();
  const isTransparentPage = pathname === "/" || pathname === "/Products";

  const closeMenu = () => {
    const closeBtn = document.querySelector("#offcanvasNavbar .btn-close");
    if (closeBtn) closeBtn.click();
  };

  const handleNavClick = (id) => {
    scrollToAnchor(id);
    closeMenu();
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      if (pathname === "/") {
        const newsEl = document.getElementById("news");
        const contactEl = document.getElementById("contact");
        const scrollPos = window.scrollY + 250;

        if (contactEl && scrollPos >= contactEl.offsetTop) {
          setActiveSection("contact");
        } else if (newsEl && scrollPos >= newsEl.offsetTop) {
          setActiveSection("news");
        } else {
          setActiveSection("");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // 初始化執行

    return () => {
      window.removeEventListener("scroll", handleScroll);
      setActiveSection(""); // 在這裡清空就不會觸發同步渲染報錯
    };
  }, [pathname]);

  const { cartData } = useSelector((state) => state.cart);
  const cartCount = cartData?.length || 0;

  useEffect(() => {
    dispatch(fetchCartAsync());
  }, [dispatch]);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-dark p-0 fixed-top transition-navbar ${
          !isTransparentPage || isScrolled ? "bg-primary shadow-sm" : "bg-transparent"
        }`}
      >
        <div className="container px-16 py-12 py-lg-20">
          <NavLink
            className="navbar-brand me-auto p-0"
            to="/"
          >
            <img
              src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/LOGO/logo%E6%AD%A3.png?raw=true"
              alt="LOGO"
              style={{ width: "80px" }}
            />
          </NavLink>

          <div className="d-flex align-items-center order-lg-3">
            <ul className="navbar-nav flex-row">
              <li>
                <NavLink
                  className="nav-link me-20 me-lg-0"
                  to="/Login"
                >
                  <span className="material-symbols-outlined">person</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link me-20 me-lg-0 position-relative"
                  to="/cart"
                >
                  <span className="material-symbols-outlined">shopping_cart</span>
                  {cartCount > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill text-primary bg-blue-300">
                      {cartCount}
                    </span>
                  )}
                </NavLink>
              </li>
            </ul>
            <button
              className="navbar-toggler text-taupe-200 border-0 p-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
            >
              <span class="material-symbols-outlined">dehaze</span>
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
                className="navbar-nav justify-content-center flex-grow-1 pe-3 text-center"
                style={{ gap: "24px" }}
              >
                <li className="nav-item">
                  <NavLink
                    className={({ isActive }) =>
                      `nav-link eng-heading-h5 ${isActive && activeSection === "" ? "active" : ""}`
                    }
                    to="/"
                    onClick={closeMenu()}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link eng-heading-h5"
                    to="/About"
                    onClick={closeMenu()}
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link eng-heading-h5"
                    to="/Products"
                    onClick={closeMenu()}
                  >
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link eng-heading-h5 w-100 bg-transparent border-0 ${
                      activeSection === "news" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("news")}
                  >
                    News
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link eng-heading-h5 w-100 bg-transparent border-0 ${
                      activeSection === "contact" ? "active" : ""
                    }`}
                    onClick={() => handleNavClick("contact")}
                  >
                    Contact
                  </button>
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
                2026 © Copyright By La Nuit Puff. <br /> All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
