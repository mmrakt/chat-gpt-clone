/// <reference types="vitest" />
import react from "@vitejs/plugin-react";
import path from "path";
import svgr from "vite-plugin-svgr";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [react(), svgr()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["./src/app/_test/setupTest.ts"],
    coverage: {
      reporter: ["text", "html"],
      include: ["src/*.{test}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
  },
  resolve: {
    alias: {
      "@app": path.resolve(__dirname, "./src/app"),
    },
  },
});
