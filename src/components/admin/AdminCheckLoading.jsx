function AdminCheckLoading() {
  return (
    <>
      <div
        className="vh-100 d-flex flex-column justify-content-center align-items-center bg-taupe-200"
        style={{ transition: "opacity 0.3s" }}
      >
        <div className="text-center">
          {/* 品牌 Logo 或 文字 */}
          <h2 className="eng-heading-h2 text-primary mb-4 animate__animated animate__pulse animate__infinite">
            La Nuit Puff
          </h2>

          {/* 質感 Spinner */}
          <div className="d-flex align-items-center justify-content-center mb-3">
            <div
              className="spinner-grow text-primary"
              role="status"
              style={{ width: "0.8rem", height: "0.8rem", margin: "0 4px" }}
            ></div>
            <div
              className="spinner-grow text-primary"
              role="status"
              style={{ width: "0.8rem", height: "0.8rem", margin: "0 4px", animationDelay: "0.2s" }}
            ></div>
            <div
              className="spinner-grow text-primary"
              role="status"
              style={{ width: "0.8rem", height: "0.8rem", margin: "0 4px", animationDelay: "0.4s" }}
            ></div>
          </div>

          {/* 提示文字 */}
          <p
            className="cn-label-m text-gray-600 tracking-widest"
            style={{ letterSpacing: "2px" }}
          >
            安全驗證中
          </p>
        </div>
      </div>
    </>
  );
}

export default AdminCheckLoading;
