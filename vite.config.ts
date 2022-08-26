import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "./src"),
      "@comps": resolve(__dirname, "./src/components"),
      "@images": resolve(__dirname, "./src/assets/images"),
    },
  },
});
