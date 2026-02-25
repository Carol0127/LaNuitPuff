import { createHashRouter } from "react-router";
import FrontendLayout from "./layout/FrontendLayout";
import Home from "./views/frontend/Home";
import Products from "./views/frontend/Products";
import ProductDetail from "./views/frontend/ProductDetail";
import Cart from "./views/frontend/Cart";
import Checkout from "./views/frontend/Checkout";
import CheckoutSuccess from "./views/frontend/CheckoutSuccess";

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
    ],
  },
]);
