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
    include: ["src/**/__tests__/**/*.{test,spec}.(tsx|ts)"],
    exclude: [
      ...configDefaults.exclude,
      "**/assets/**",
      "**/coverage/**",
      "**/dist/**",
      "src/app/types/**",
      "**/*.config.ts",
    ],
    coverage: {
      exclude: [
        ...(configDefaults.coverage.exclude ?? []),
        "**/assets/**",
        "**/coverage/**",
        "**/dist/**",
        "src/app/types/**",
        "**/*.config.ts",
      ],
    },
  },
  build: {
    rollupOptions: {
      input: "src/app/main.tsx",
    },
  },
});
