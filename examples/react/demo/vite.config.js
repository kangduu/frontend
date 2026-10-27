import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      mock: "/mock",
      src: "/src",
      "@assets": "/src/assets",
      "@components": "/src/components",
      "@pages": "/src/pages",
      "@routes": "/src/routes",
      "@styles": "/src/styles",
    },
  },
  plugins: [react()],
});
