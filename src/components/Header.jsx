import { NavLink } from "react-router";
import { useState, useEffect } from "react";
function Header() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        isScrolled && setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isScrolled]);

  return (
    <>
      <nav
        className={`navbar navbar-expand-lg navbar-dark p-0 fixed-top transition-navbar ${
          isScrolled ? "bg-primary" : "bg-transparent"
        }`}
      >
        <div className="container px-16 py-12 py-lg-20">
          {/* 1. LOGO */}
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

          {/* 2. 右側 Icon (User/Cart) */}
          <div className="d-flex align-items-center order-lg-3">
            <ul className="navbar-nav flex-row">
              <li>
                <NavLink
                  className="nav-link me-20 me-lg-0"
                  to="/user"
                >
                  <span className="material-symbols-outlined icon-fill align-bottom">person</span>
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="nav-link  me-20 me-lg-0"
                  to="/cart"
                >
                  <span className="material-symbols-outlined icon-fill align-bottom">shopping_cart</span>
                </NavLink>
              </li>
            </ul>

            {/* 漢堡按鈕  */}
            <button
              className="navbar-toggler border-0 p-0"
              type="button"
              data-bs-toggle="offcanvas"
              data-bs-target="#offcanvasNavbar"
              aria-controls="offcanvasNavbar"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
          </div>

          {/* 4. Offcanvas 側邊選單本體 */}
          <div
            className="offcanvas offcanvas-end bg-primary"
            tabIndex="-1"
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
          >
            <div className="offcanvas-header px-16 py-20">
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
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
                    className="nav-link eng-heading-h5"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link   eng-heading-h5"
                    to="/About"
                  >
                    About
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link   eng-heading-h5"
                    to="/Shop"
                  >
                    Shop
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link   eng-heading-h5"
                    to="/News"
                  >
                    News
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link   eng-heading-h5"
                    to="/Contact"
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </div>

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
              <p className="text-blue-300 text-center eng-label-s m-0">
                2026 © Copyright By La Nuit Puff. <br />
                All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Header;
