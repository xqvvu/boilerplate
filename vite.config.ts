import { defineConfig } from "vite-plus";

const ignorePatterns = ["**/route-tree.gen.ts", "**/node_modules", "**/dist"];

export default defineConfig({
  fmt: {
    ignorePatterns,

    printWidth: 100,
    sortImports: true,
    sortPackageJson: true,
  },

  lint: {
    ignorePatterns,

    options: {
      typeAware: true,
      typeCheck: true,
    },

    plugins: ["typescript"],

    overrides: [
      {
        files: ["apps/web/**", "packages/ui/**"],
        plugins: ["react"],
        jsPlugins: ["@stylexjs/eslint-plugin"],
        rules: {
          "@stylexjs/valid-styles": "error",
          "@stylexjs/no-unused": "error",
          "@stylexjs/valid-shorthands": "warn",
          "@stylexjs/sort-keys": "warn",
        },
      },
    ],
  },
});
