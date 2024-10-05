import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3001,
    host: "0.0.0.0",
  },
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./setupTests.ts",
    include: ["**/__tests__/**/*.test.(tsx|ts)"],
    exclude: [
      ...configDefaults.exclude,
      "**/assets/**",
      "**/coverage/**",
      "**/dist/**",
      "src/app/types/**",
    ],
  },
  build: {
    rollupOptions: {
      input: "src/app/main.tsx",
    },
  },
});
