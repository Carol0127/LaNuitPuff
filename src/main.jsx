import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style/all.scss";
import { RouterProvider } from "react-router";
import { router } from "./router.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Provider } from "react-redux";
import { store } from "./store/store.js";
import "sweetalert2/src/sweetalert2.scss";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
