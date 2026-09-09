import { defineConfig } from "vite-plus";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },

  test: {
    include: ["src/**/*.{test,spec}.{ts,tsx}", "test/**/*.{test,spec}.{ts,tsx}"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html-spa"],
    },
  },

  pack: {
    entry: ["src/main.ts"],
    format: "esm",
    clean: true,
    minify: true,
    dts: {
      enabled: false,
    },
    sourcemap: true,
  },
});
