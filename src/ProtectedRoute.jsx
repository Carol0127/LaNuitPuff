import { Navigate } from "react-router";

// 只有登入才能看
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
