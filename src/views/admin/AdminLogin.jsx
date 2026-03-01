import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "../../services/admin";
import { useNavigate } from "react-router";
import { ErrorToast, SuccessToast } from "../../components/Toast";

function AdminLogin() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
  });

  const onSubmit = async (formData) => {
    const data = {
      username: formData.mail,
      password: formData.password,
    };
    try {
      const res = await login(data);

      if (res && res.success) {
        SuccessToast.fire({
          title: "登入成功",
          text: "管理員您好，系統已就緒。",
        }).then(() => {
          navigate("/admin");
        });
      } else {
        ErrorToast.fire({
          title: "登入失敗",
          text: "帳號或密碼錯誤",
        });
      }
    } catch {
      ErrorToast.fire({
        title: "系統錯誤",
        text: "目前無法連線至伺服器，請稍後再試",
      });
    }
  };

  return (
    <>
      <section className="bg-taupe-200 vh-100">
        <div className="container">
          <div className="row justify-content-center align-items-center vh-100">
            <div className="col-lg-4">
              <div className="bg-white border px-lg-28 py-lg-40 mb-20">
                <div className="mb-40">
                  <h1 className="text-primary eng-heading-h2 mb-8 text-center">La Nuit Puff</h1>
                  <p className="text-gray-800 cn-body-m-regular text-center">店家後台管理</p>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="col mb-28">
                    <label
                      htmlFor="mail"
                      className="cn-label-m mb-8 mb-lg-16 text-primary"
                    >
                      管理員帳號
                    </label>
                    <input
                      id="mail"
                      type="email"
                      className="form-control"
                      {...register("mail", {
                        required: "請輸入信箱",
                        pattern: {
                          value: /^\S+@\S+$/i,
                          message: "Email 格式不正確",
                        },
                      })}
                      placeholder="請輸入信箱"
                    />
                    {errors.mail && <p className="text-danger cn-label-s mt-8">{errors.mail.message}</p>}
                  </div>
                  <div className="col mb-28">
                    <label
                      htmlFor="password"
                      className="cn-label-m mb-8 mb-lg-16 text-primary"
                    >
                      管理員密碼
                    </label>
                    <div className="input-group">
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        className="form-control"
                        {...register("password", {
                          required: "請輸入密碼",
                          minLength: { value: 8, message: "密碼至少 8 碼" },
                        })}
                        placeholder="請輸入密碼"
                      />
                      <button
                        className={`btn border-0 ${errors.password ? "border-danger" : "border-primary"}`}
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        style={{ zIndex: 4 }}
                      >
                        <span className="material-symbols-outlined align-middle">
                          {showPassword ? "visibility" : "visibility_off"}
                        </span>
                      </button>
                    </div>
                    {errors.password && <p className="text-danger cn-label-s mt-8">{errors.password.message}</p>}
                  </div>
                  <button
                    type="submit"
                    className="btn-puff btn-puff-primary btn-puff-cn-m cn-label-m w-100"
                  >
                    進入系統
                  </button>
                </form>
              </div>
              <p className="cn-label-s text-gray-500 text-center">
                2026 © Copyright By La Nuit Puff. All Rights Reserved.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default AdminLogin;
