import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./assets/style/all.scss";
import { RouterProvider } from "react-router";
import { router } from "./router.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import ScrollToHash from "./hooks/scrollToHash.jsx";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
