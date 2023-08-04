import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";
import path from "path";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [
    vue(),
    laravel(["resources/js/app.js"]),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      "@/": path.resolve(__dirname, "./resources/js/"),
    },
  },
});
