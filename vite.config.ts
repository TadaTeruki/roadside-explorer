import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/reversegeocoding': {
        target: 'https://map.yahooapis.jp/geoapi/V1/reverseGeoCoder',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/reversegeocoding/, ''),
      },
    },
  },
});
