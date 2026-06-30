import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    rollupOptions: {
      output: {
        // Vite 8 (rolldown) requires manualChunks as a function.
        // Splitting vendor libs into stable chunks improves long-term caching:
        // app code changes don't bust the react/motion/gsap caches.
        manualChunks(id: string) {
          if (!id.includes("node_modules")) return;
          if (
            id.includes("/react/") ||
            id.includes("/react-dom/") ||
            id.includes("/react-router")
          ) {
            return "react-vendor";
          }
          if (id.includes("/motion/") || id.includes("/framer-motion/")) {
            return "motion-vendor";
          }
          if (id.includes("/gsap/")) {
            return "gsap-vendor";
          }
        },
      },
    },
  },
});
