import { Navigate } from "react-router";

// 使用者登入
export const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? (
    children
  ) : (
    <Navigate
      to="/Login"
      replace
    />
  );
};

// 登入後不能去登入頁
export const PublicRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  return isLoggedIn ? (
    <Navigate
      to="/user"
      replace
    />
  ) : (
    children
  );
};

// 後臺登入
export const ProtectedAdminRoute = ({ children }) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");

  if (!token) {
    return (
      <Navigate
        to="/admin-login"
        replace
      />
    );
  }

  return children;
};
