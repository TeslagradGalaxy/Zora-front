import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080", // 后端 API 地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""), // 去掉请求前缀
      },
    },
  },
});
