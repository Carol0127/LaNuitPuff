import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { checkLogin } from "./services/admin";
import AdminCheckLoading from "./components/admin/AdminCheckLoading";

// 1. 使用者登入
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

// 2. 登入後不能去登入頁
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

// 3. 後臺登入
export const ProtectedAdminRoute = ({ children }) => {
  const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, "$1");
  const [status, setStatus] = useState(token ? "checking" : "fail");

  useEffect(() => {
    if (!token) return;
    checkLogin().then((res) => {
      setStatus(res?.success ? "ok" : "fail");
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  if (status === "checking") return <AdminCheckLoading />;
  if (status === "fail")
    return (
      <Navigate
        to="/adminLogin"
        replace
      />
    );
  return children;
};
