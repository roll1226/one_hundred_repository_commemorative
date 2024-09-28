import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import { configDefaults } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 3000,
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
      "src/types/**", // TODO: 追々 Feature-Slices Design に合わせて修正
    ],
  },
  build: {
    rollupOptions: {
      input: "src/main.tsx", // TODO: 追々 Feature-Slices Design に合わせて修正
    },
  },
});
