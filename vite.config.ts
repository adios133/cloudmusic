import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";
export default defineConfig({
  plugins: [Vue(), VueJsx()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("src", import.meta.url))
    }
  },
  server: {
    port: 5566,
    proxy: {
      "/api": {
        changeOrigin: true,
        target: "http://localhost:3000",
        rewrite(path) {
          return path.replace("/api", "");
        }
      }
    }
  }
});
