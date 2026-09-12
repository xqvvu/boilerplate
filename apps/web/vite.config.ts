import path from "node:path";

import stylex from "@stylexjs/unplugin";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite-plus";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, ".", "");

  return {
    resolve: {
      tsconfigPaths: true,
    },

    server: {
      proxy: {
        "/api": {
          target: env["SERVER_API_BASE_URL"],
        },
      },
    },

    plugins: [
      stylex.vite({
        useCSSLayers: true,
        dev: process.env.NODE_ENV === "development",
        runtimeInjection: false,
        lightningcssOptions: {},
      }),
      devtools(),
      tanstackRouter({
        target: "react",
        quoteStyle: "double",
        addExtensions: false,
        autoCodeSplitting: true,
        generatedRouteTree: path.join(import.meta.dirname, "src/route-tree.gen.ts"),
      }),
      viteReact(),
    ],

    test: {
      include: ["src/**/*.{test,spec}.{ts,tsx}", "test/**/*.{test,spec}.{ts,tsx}"],
      coverage: {
        provider: "v8",
        reporter: ["text", "html-spa"],
      },
    },
  };
});
