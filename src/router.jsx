import { createHashRouter } from "react-router";
import FrontendLayout from "./layout/FrontendLayout";
import AdminLayout from "./layout/AdminLayout";

import Home from "./views/frontend/Home";
import Products from "./views/frontend/Products";
import ProductDetail from "./views/frontend/ProductDetail";
import Cart from "./views/frontend/Cart";
import Checkout from "./views/frontend/Checkout";
import CheckoutSuccess from "./views/frontend/CheckoutSuccess";
import Login from "./views/frontend/Login";
import User from "./views/frontend/User";

import { ProtectedRoute, PublicRoute, ProtectedAdminRoute } from "./ProtectedRoute";
import UserOrderList from "./views/frontend/UserOrderList";
import UserProfile from "./views/frontend/UserProfile";
import UserFavorite from "./views/frontend/UserFavorite";
import AdminLogin from "./views/admin/AdminLogin";
import AdminIndex from "./views/admin/AdminIndex";
import AdminOrders from "./views/admin/AdminOrders";

export const router = createHashRouter([
  {
    path: "/",
    element: <FrontendLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "products",
        element: <Products />,
      },
      {
        path: "product/:id",
        element: <ProductDetail />,
      },
      {
        path: "cart",
        element: <Cart />,
      },
      {
        path: "checkout",
        element: <Checkout />,
      },
      {
        path: "checkout-success/:orderId",
        element: <CheckoutSuccess />,
      },
      {
        path: "login",
        element: (
          <PublicRoute>
            <Login />
          </PublicRoute>
        ),
      },
      {
        path: "user",
        element: (
          <ProtectedRoute>
            <User />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <UserOrderList />,
          },
          {
            path: "/user/profile",
            element: <UserProfile />,
          },
          {
            path: "/user/favorite",
            element: <UserFavorite />,
          },
        ],
      },
    ],
  },
  {
    path: "/adminLogin",
    element: <AdminLogin />,
  },
  {
    path: "/admin",
    element: (
      <ProtectedAdminRoute>
        <AdminLayout />
      </ProtectedAdminRoute>
    ),
    children: [
      {
        index: true,
        element: <AdminIndex />,
      },
      {
        path: "orders",
        element: <AdminOrders />,
      },
    ],
  },
]);
