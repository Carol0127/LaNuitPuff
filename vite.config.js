import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  scss: {
    api: "modern-compiler", // 確保這行有加上
    silenceDeprecations: [
      "import", // <--- 針對 @import 警告消音
      "color-functions",
      "global-builtin",
    ],
    quietDeps: true,
  },

  base: process.env.NODE_ENV === "production" ? "/LaNuitPuff/" : "/",
  plugins: [react()],
});
