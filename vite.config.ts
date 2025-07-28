import { defineConfig } from "vite";
import Vue from "@vitejs/plugin-vue";
import VueJsx from "@vitejs/plugin-vue-jsx";
import { fileURLToPath, URL } from "node:url";
import Components from "unplugin-vue-components/vite";
import { VantResolver } from "unplugin-vue-components/resolvers";
export default defineConfig({
  plugins: [
    Vue(),
    VueJsx(),
    Components({
      resolvers: [VantResolver()]
    })
  ],
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
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  }
});
