import { NavLink } from "react-router";

function Footer() {
  return (
    <>
      <div className="bg-primary px-16 py-24 py-lg-40">
        <div className="container p-0">
          <div className="d-lg-flex justify-content-between align-items-center mb-40">
            <div className="mb-40 mb-lg-0 d-flex flex-column   align-items-center align-items-lg-start">
              <img
                src="https://github.com/Carol0127/LaNuitPuffProducts/blob/main/LOGO/logo%E6%A9%AB2.png?raw=true"
                alt="LOGO"
                style={{ width: "184px" }}
                className="mb-20"
              />
              <ul className="navbar-nav flex-row flex-wrap">
                <li className="nav-item me-20">
                  <NavLink
                    className="nav-link p-0 eng-heading-h5 text-white"
                    to="/"
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item me-20">
                  <NavLink
                    className="nav-link p-0 eng-heading-h5 text-white"
                    to="/Product"
                  >
                    Product
                  </NavLink>
                </li>
                <li className="nav-item me-20">
                  <NavLink
                    className="nav-link p-0 eng-heading-h5 text-white"
                    to="/Contact"
                  >
                    Contact
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink
                    className="nav-link p-0 eng-heading-h5 text-white"
                    to="/Policy"
                  >
                    Policy
                  </NavLink>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="eng-heading-italic-h3 text-white mb-20">Stay in the Night</h3>
              <div className="subscription-bar d-flex align-items-baseline border-bottom border-white flex-row">
                <input
                  type="email"
                  className="form-control bg-transparent border-0 p-0 text-white eng-heading-h6 subscription-input"
                  placeholder="Enter Your Email"
                />
                <button className="btn btn-link text-decoration-none p-0 text-secondary eng-heading-h6 ms-3">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p className="text-blue-300 eng-label-s m-0">2026 © Copyright By La Nuit Puff. All Rights Reserved.</p>
            <ul className="navbar-nav justify-content-center flex-row">
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
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;
