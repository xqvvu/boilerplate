import path from "node:path";

import stylex from "@stylexjs/unplugin";
import { devtools } from "@tanstack/devtools-vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";

const config = defineConfig({
  resolve: {
    tsconfigPaths: true,
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
});

export default config;
