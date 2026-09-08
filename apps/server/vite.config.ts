import { defineConfig } from "vite-plus";

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },

  test: {
    include: ["src/**/*.test.ts", "test/**/*.{test,spec}.ts"],
    coverage: {
      reporter: ["html-spa"],
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
