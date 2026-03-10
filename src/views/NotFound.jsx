import { NavLink } from "react-router";

function NotFound() {
  return (
    <>
      <section className="bg-taupe-200 py-64 mt-80 py-lg-120">
        <div className="container d-flex align-items-center justify-content-center">
          <div className="row">
            <div className="col-12">
              <div
                data-aos="fade-down"
                className="text-center"
              >
                {/* big 404 */}
                <p className="eng-heading-italic-h1 text-primary">404</p>
                <hr
                  className="border-secondary opacity-100 mx-auto mb-20"
                  style={{ width: 32 }}
                />

                {/* label */}
                <p className="eng-label-m text-secondary mb-12">/ Page Not Found</p>

                {/* title */}
                <h1 className="cn-heading-h2 text-primary mb-16">找不到你要的頁面</h1>

                {/* sub */}
                <p className="cn-body-s-regular text-gary-800 opacity-50 mb-40">
                  頁面可能已移除或網址有誤。
                  <br />
                  <span className="eng-label-s">The page you're looking for doesn't exist.</span>
                </p>

                {/* cta */}
                <div className="d-flex gap-12 justify-content-center flex-wrap">
                  <NavLink
                    to="/"
                    className="btn-puff btn-puff-outline btn-puff-eng-l eng-label-l"
                  >
                    Back to Home
                  </NavLink>
                  <NavLink
                    to="/products"
                    className="btn-puff btn-puff-yellow btn-puff-eng-l eng-label-l"
                  >
                    Browse Products
                  </NavLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default NotFound;
