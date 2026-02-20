import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
// import './index.css'
import "./assets/style/all.scss";
import App from "./App.jsx";
import { RouterProvider } from "react-router";
import { router } from "./router.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
