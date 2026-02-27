import { useState } from "react";
import { useForm } from "react-hook-form";
import { ErrorToast, SuccessToast } from "../../components/Toast";

function UserProfile() {
  const [isEditing, setIsEditing] = useState(false);

  // 分開控制三個密碼框的隱私狀態
  const [showOld, setShowOld] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showCheck, setShowCheck] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
  } = useForm({
    mode: "onTouched",
    defaultValues: {
      name: "王小美",
      tel: "0911222333",
      email: "xiaomei.wang@example.com",
    },
  });

  const handleCancel = () => {
    reset();
    setIsEditing(false);
    // 重設所有眼睛狀態
    setShowOld(false);
    setShowNew(false);
    setShowCheck(false);
  };

  const onSubmit = (data) => {
    if ((data.newPassword || data.checkNewPassword) && !data.oldPassword) {
      ErrorToast.fire({ title: "修改密碼請先輸入目前密碼" });
      return;
    }
    SuccessToast.fire({ title: "個人資料已成功更新" });
    setIsEditing(false);
    reset({ ...data, oldPassword: "", newPassword: "", checkNewPassword: "" });
  };

  return (
    <>
      <h3 className="eng-heading-italic-h1 text-primary mb-28">/ Profile</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* 基本資料區塊 */}
        <div className="bg-white border p-lg-32 px-16 py-24 mb-28">
          <p className="cn-body-m-regular text-primary mb-32">基本資料 / Information</p>
          <div className="row">
            <div className="col-lg-6 mb-20">
              <label className="cn-label-m mb-8 text-gray-800">姓名</label>
              <input
                {...register("name", { required: "姓名為必填" })}
                className={`form-control text-primary ${!isEditing ? "border-0 " : ""} ${
                  errors.name ? "is-invalid" : ""
                }`}
                readOnly={!isEditing}
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>

            <div className="col-lg-6 mb-20">
              <label className="cn-label-m mb-8 text-gray-800">連絡電話</label>
              <input
                {...register("tel", { required: "電話為必填" })}
                className={`form-control text-primary ${!isEditing ? "border-0 " : ""} ${
                  errors.tel ? "is-invalid" : ""
                }`}
                readOnly={!isEditing}
              />
              {errors.tel && <div className="invalid-feedback">{errors.tel.message}</div>}
            </div>

            <div className="col-12">
              <label className="cn-label-m mb-8 text-gray-800">電子信箱</label>
              <input
                {...register("email", {
                  required: "Email 為必填",
                  pattern: { value: /^\S+@\S+$/i, message: "Email 格式不正確" },
                })}
                className={`form-control text-primary ${!isEditing ? "border-0 " : ""} ${
                  errors.email ? "is-invalid" : ""
                }`}
                readOnly={!isEditing}
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
          </div>
        </div>

        {/* 安全設定區塊 */}
        {isEditing && (
          <div className="bg-white border p-lg-32 px-16 py-24 mb-28">
            <p className="cn-body-m-regular text-primary mb-32">安全設定 / Security </p>
            <div className="row">
              {/* 目前密碼 */}
              <div className="col-12 mb-28">
                <label className="cn-label-m mb-8 text-gray-800">目前密碼</label>
                <div className="input-group">
                  <input
                    type={showOld ? "text" : "password"}
                    {...register("oldPassword", { required: "請輸入密碼" })}
                    className="form-control text-primary"
                    placeholder="請輸入密碼"
                  />
                  <button
                    className="btn border-0"
                    type="button"
                    onClick={() => setShowOld(!showOld)}
                  >
                    <span className="material-symbols-outlined align-middle">
                      {showOld ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
                {errors.oldPassword && <div className="text-danger cn-label-s mt-4">{errors.oldPassword.message}</div>}
              </div>

              {/* 新密碼 */}
              <div className="col-lg-6 mb-28">
                <label className="cn-label-m mb-8 text-gray-800">新密碼</label>
                <div className="input-group">
                  <input
                    type={showNew ? "text" : "password"}
                    {...register("newPassword", { minLength: { value: 8, message: "密碼至少 8 碼" } })}
                    className="form-control text-primary"
                    placeholder="請輸入新密碼"
                  />
                  <button
                    className="btn border-0"
                    type="button"
                    onClick={() => setShowNew(!showNew)}
                  >
                    <span className="material-symbols-outlined align-middle">
                      {showNew ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
                {errors.newPassword && <div className="text-danger cn-label-s mt-4">{errors.newPassword.message}</div>}
              </div>

              {/* 確認新密碼 */}
              <div className="col-lg-6 mb-28">
                <label className="cn-label-m mb-8 text-gray-800">確認新密碼</label>
                <div className="input-group">
                  <input
                    type={showCheck ? "text" : "password"}
                    {...register("checkNewPassword", {
                      validate: (value) => value === getValues("newPassword") || "兩次密碼輸入不一致",
                    })}
                    className="form-control text-primary"
                    placeholder="再次輸入新密碼"
                  />
                  <button
                    className="btn border-0"
                    type="button"
                    onClick={() => setShowCheck(!showCheck)}
                  >
                    <span className="material-symbols-outlined align-middle">
                      {showCheck ? "visibility" : "visibility_off"}
                    </span>
                  </button>
                </div>
                {errors.checkNewPassword && (
                  <div className="text-danger cn-label-s mt-4">{errors.checkNewPassword.message}</div>
                )}
              </div>
            </div>
          </div>
        )}

        {!isEditing ? (
          <>
            <div className="d-flex justify-content-end">
              <button
                className="btn-puff btn-puff-outline btn-puff-cn-m"
                onClick={() => setIsEditing(true)}
              >
                編輯資料
              </button>
            </div>
          </>
        ) : (
          <div className="d-flex gap-12 justify-content-end">
            <button
              type="button"
              className="btn-puff btn-puff-outline btn-puff-cn-m cn-label-m"
              onClick={handleCancel}
            >
              取消
            </button>
            <button
              type="button"
              className="w-auto btn-puff btn-puff-cn-m btn-puff-primary"
              onClick={handleSubmit(onSubmit)}
            >
              儲存變更 / Save
            </button>
          </div>
        )}
      </form>
    </>
  );
}

export default UserProfile;
