import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ErrorToast, SuccessToast } from "../../components/Toast";
import bootstrap from "bootstrap/dist/js/bootstrap.bundle.min.js";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false); // 登入用
  const [showSignupPw, setShowSignupPw] = useState(false); // 註冊用
  const [showSignupCheck, setShowSignupCheck] = useState(false); // 註冊確認用
  const [isSignupLoading, setIsSignupLoading] = useState(false); // 註冊狀態
  const [isLoginLoading, setIsLoginLoading] = useState(false); //登入

  // 1. 登入表單
  const {
    register: registerLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm({ mode: "onTouched" });

  // 2. 註冊表單
  const {
    register: registerSignup,
    handleSubmit: handleSubmitSignup,
    getValues,
    reset: resetSignup,
    formState: { errors: errorsSignup },
  } = useForm({ mode: "onTouched" });

  // 登入提交
  const onLoginSubmit = async () => {
    setIsLoginLoading(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userToken", "abc-123-token");

      SuccessToast.fire({
        title: "登入成功",
        text: "歡迎回來，La Nuit Puff！",
      }).then(() => {
        navigate("/user");
      });
    } catch {
      ErrorToast.fire({
        title: "登入失敗",
        text: "帳號或密碼錯誤，請再試一次",
      });
    } finally {
      setIsLoginLoading(false); // 結束載入
    }
  };

  // 註冊提交
  const onSignupSubmit = async () => {
    setIsSignupLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSignupLoading(false);

    SuccessToast.fire({
      title: "註冊成功",
      text: "歡迎加入！即將為您跳轉至登入頁面",
    }).then(() => {
      resetSignup();
      const loginTabButton = document.querySelector("#login-tab");
      if (loginTabButton) {
        const tab = new bootstrap.Tab(loginTabButton);
        tab.show();
      }
    });
  };

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn");
    if (loginStatus === "true") {
      navigate("/user");
    }
  }, [navigate]);

  return (
    <>
      <section className="py-64 mt-64 mt-lg-80 py-lg-80 bg-taupe-200">
        <div className="container">
          <div className="row">
            <div className="col-lg-4  pe-lg-0 order-2 order-lg-1">
              <div className="bg-primary py-52 px-32 h-100 d-flex flex-column justify-content-center">
                <div className="border-bottom">
                  <p className="eng-display-l text-secondary mb-24">La Nuit Puff</p>
                  <p className="cn-heading-h6 text-taupe-200 mb-16">當城市入睡時，</p>
                  <p className="cn-heading-h6 text-taupe-200 mb-48">我們的美味冒險才正要開始。</p>
                </div>
                <ul className="list-unstyled mt-48">
                  <li className="d-flex align-items-center mb-40">
                    <span class="material-symbols-outlined me-16 align-bottom text-taupe-200 ">
                      confirmation_number
                    </span>
                    <div>
                      <h3 className="eng-heading-italic-h5 text-taupe-200 mb-8">Member coupang</h3>
                      <p className="cn-label-s text-taupe-200">加入會員即享首購現折 $100 優惠券</p>
                    </div>
                  </li>
                  <li className="d-flex align-items-center mb-40">
                    <span class="material-symbols-outlined me-16 align-bottom text-taupe-200 ">cake</span>
                    <div>
                      <h3 className="eng-heading-italic-h5 text-taupe-200 mb-8">Birthday Surprise</h3>
                      <p className="cn-label-s text-taupe-200">生日當月贈送限定泡芙禮盒乙份</p>
                    </div>
                  </li>
                  <li className="d-flex align-items-center ">
                    <span class="material-symbols-outlined me-16 align-bottom text-taupe-200 ">award_star</span>
                    <div>
                      <h3 className="eng-heading-italic-h5 text-taupe-200 mb-8">Points Reward</h3>
                      <p className="cn-label-s text-taupe-200">消費 1 元積 1 點，點數可兌換隱藏版口味</p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-8 mb-24 mb-lg-0 ps-lg-0 order-1 order-lg-2">
              <div className="border bg-white py-lg-80 px-lg-52 py-32 px-24 h-100">
                <div className="login-signup-wrapper">
                  <ul
                    className="nav nav-tabs border-0 mb-32 mb-lg-48 justify-content-center"
                    id="authTab"
                    role="tablist"
                  >
                    <li
                      className="nav-item"
                      role="presentation"
                    >
                      <button
                        className="nav-link active border-0 cn-heading-h5 me-20 me-lg-32 "
                        id="login-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#login-pane"
                        type="button"
                        role="tab"
                      >
                        登入 / Login
                      </button>
                    </li>
                    <li
                      className="nav-item"
                      role="presentation"
                    >
                      <button
                        className="nav-link border-0 cn-heading-h5"
                        id="signup-tab"
                        data-bs-toggle="tab"
                        data-bs-target="#signup-pane"
                        type="button"
                        role="tab"
                      >
                        註冊 / Join
                      </button>
                    </li>
                  </ul>

                  <div
                    className="tab-content "
                    id="authTabContent"
                  >
                    <div
                      className="tab-pane fade show active "
                      id="login-pane"
                      role="tabpanel"
                    >
                      <form onSubmit={handleSubmitLogin(onLoginSubmit)}>
                        <div className=" mb-24">
                          <label
                            htmlFor="memberMail"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            會員信箱
                          </label>
                          <input
                            className={`form-control  ${errorsLogin.memberMail ? "border-danger" : "border-primary"}`}
                            id="memberMail"
                            placeholder="請輸入信箱"
                            type="mail"
                            {...registerLogin("memberMail", {
                              required: "請輸入信箱",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Email 格式不正確",
                              },
                            })}
                          />
                          {errorsLogin.memberMail && (
                            <p className="text-danger cn-label-s mt-8">{errorsLogin.memberMail.message}</p>
                          )}
                        </div>
                        <div className=" mb-24">
                          <label
                            htmlFor="memberPassword"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            會員密碼
                          </label>
                          <div className="input-group">
                            <input
                              className={`form-control  ${
                                errorsLogin.memberPassword ? "border-danger" : "border-primary"
                              }`}
                              id="memberPassword"
                              type={showPassword ? "text" : "password"}
                              placeholder="請輸入密碼"
                              {...registerLogin("memberPassword", {
                                required: "請輸入密碼",
                                minLength: { value: 8, message: "密碼至少 8 碼" },
                              })}
                            />
                            <button
                              className={`btn border-0 ${
                                errorsLogin.memberPassword ? "border-danger" : "border-primary"
                              }`}
                              type="button"
                              onClick={() => setShowPassword(!showPassword)}
                              style={{ zIndex: 4 }}
                            >
                              <span className="material-symbols-outlined align-middle">
                                {showPassword ? "visibility" : "visibility_off"}
                              </span>
                            </button>
                          </div>
                          {errorsLogin.memberPassword && (
                            <p className="text-danger cn-label-s mt-8">{errorsLogin.memberPassword.message}</p>
                          )}
                        </div>
                        <div className="d-flex justify-content-between mb-24">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="stayLogged"
                            />
                            <label
                              className="form-check-label cn-label-m text-primary"
                              for="stayLogged"
                            >
                              記住我
                            </label>
                          </div>
                          <p className="cn-label-m text-gray-500">忘記密碼？</p>
                        </div>
                        <button
                          type="submit"
                          className="btn-puff btn-puff-primary btn-puff-cn-m cn-label-m w-100"
                          disabled={isLoginLoading}
                        >
                          {isLoginLoading ? (
                            <>
                              <span
                                className="spinner-border spinner-border-sm me-8"
                                role="status"
                              ></span>
                              登入中...
                            </>
                          ) : (
                            "登入"
                          )}
                        </button>
                      </form>
                    </div>

                    <div
                      className="tab-pane fade"
                      id="signup-pane"
                      role="tabpanel"
                    >
                      <form onSubmit={handleSubmitSignup(onSignupSubmit)}>
                        <div className="mb-24">
                          <label
                            htmlFor="signupName"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            會員姓名
                          </label>
                          <input
                            type="text"
                            id="signupName"
                            placeholder="請輸入姓名"
                            className={`form-control ${errorsSignup.signupMail ? "border-danger" : "border-primary"}`}
                            {...registerSignup("signupName", {
                              required: "請輸入姓名",
                              minLength: { value: 2, message: "姓名至少 2 字" },
                            })}
                          />
                          {errorsSignup.signupName && (
                            <p className="text-danger mt-8">{errorsSignup.signupName.message}</p>
                          )}
                        </div>
                        <div className="mb-24">
                          <label
                            htmlFor="signupEmail"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            註冊信箱
                          </label>
                          <input
                            type="email"
                            id="signupEmail"
                            placeholder="請輸入電子信箱"
                            className={`form-control ${errorsSignup.signupMail ? "border-danger" : "border-primary"}`}
                            {...registerSignup("signupMail", {
                              required: "請輸入信箱",
                              pattern: {
                                value: /^\S+@\S+$/i,
                                message: "Email 格式不正確",
                              },
                            })}
                          />
                          {errorsSignup.signupMail && (
                            <p className="text-danger mt-8">{errorsSignup.signupMail.message}</p>
                          )}
                        </div>
                        <div className="mb-24">
                          <label
                            htmlFor="signupPassword"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            會員密碼
                          </label>
                          <div className="input-group">
                            <input
                              type={showSignupPw ? "text" : "password"}
                              id="signupPassword"
                              placeholder="設定8位數以上英數組合"
                              className={`form-control ${
                                errorsSignup.signupPassword ? "border-danger" : "border-primary"
                              }`}
                              {...registerSignup("signupPassword", {
                                required: "請輸入密碼",
                                minLength: { value: 8, message: "密碼至少 8 碼" },
                              })}
                            />
                            <button
                              className={`btn border-0 ${
                                errorsLogin.memberPassword ? "border-danger" : "border-primary"
                              }`}
                              type="button"
                              onClick={() => setShowSignupPw(!showSignupPw)}
                              style={{ zIndex: 4 }}
                            >
                              <span className="material-symbols-outlined align-middle">
                                {showSignupPw ? "visibility" : "visibility_off"}
                              </span>
                            </button>
                          </div>
                          {errorsSignup.signupPassword && (
                            <p className="text-danger mt-8">{errorsSignup.signupPassword.message}</p>
                          )}
                        </div>
                        <div className="mb-24">
                          <label
                            htmlFor="signupCheckPassword"
                            className="cn-label-m mb-8 mb-lg-16 text-primary"
                          >
                            確認會員密碼
                          </label>
                          <div className="input-group">
                            <input
                              type={showSignupCheck ? "text" : "password"}
                              id="signupCheckPassword"
                              placeholder="請再次輸入密碼"
                              className={`form-control ${
                                errorsSignup.signupCheckPassword ? "border-danger" : "border-primary"
                              }`}
                              {...registerSignup("signupCheckPassword", {
                                required: "請再次輸入密碼確認",
                                validate: (value) => value === getValues("signupPassword") || "兩次密碼輸入不一致",
                              })}
                            />
                            <button
                              className={`btn border-0 ${
                                errorsLogin.memberPassword ? "border-danger" : "border-primary"
                              }`}
                              type="button"
                              onClick={() => setShowSignupCheck(!showSignupCheck)}
                              style={{ zIndex: 4 }}
                            >
                              <span className="material-symbols-outlined align-middle">
                                {showSignupCheck ? "visibility" : "visibility_off"}
                              </span>
                            </button>
                          </div>
                          {errorsSignup.signupCheckPassword && (
                            <p className="text-danger mt-8">{errorsSignup.signupCheckPassword.message}</p>
                          )}
                        </div>
                        <button
                          type="submit"
                          className="btn-puff btn-puff-primary btn-puff-cn-m cn-label-m w-100 mb-24"
                          disabled={isSignupLoading}
                        >
                          立即註冊
                        </button>
                        <p className="cn-label-m text-gray-800">
                          點擊註冊即表示同意La Nuit Puff的
                          <a
                            className="text-decoration-underline"
                            href="#"
                          >
                            服務條款
                          </a>
                        </p>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
