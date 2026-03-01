import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style/all.scss";
import { RouterProvider } from "react-router";
import { router } from "./router.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "sweetalert2/src/sweetalert2.scss";
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init({
  duration: 1200,
  offset: 200,
  once: true,
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>,
);
