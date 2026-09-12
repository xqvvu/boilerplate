import { defineConfig } from "vite-plus";

const ignorePatterns = ["**/route-tree.gen.ts", "**/node_modules", "**/dist", "**/*.md"];

export default defineConfig({
  run: {
    enablePrePostScripts: true,
    cache: {
      tasks: true,
    },
  },

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

    plugins: ["typescript", "eslint", "unicorn"],

    overrides: [
      {
        files: ["apps/web/**", "packages/ui/**"],
        plugins: ["react", "react-perf", "vitest"],
        jsPlugins: ["@stylexjs/eslint-plugin", "@tanstack/eslint-plugin-query"],
        rules: {
          // @stylexjs/eslint-plugin "flat/recommended"
          "@stylexjs/valid-styles": "error",
          "@stylexjs/no-unused": "error",
          "@stylexjs/valid-shorthands": "warn",
          "@stylexjs/sort-keys": "warn",

          // @tanstack/eslint-plugin-query "flat/recommended"
          "@tanstack/query/exhaustive-deps": "error",
          "@tanstack/query/no-rest-destructuring": "warn",
          "@tanstack/query/stable-query-client": "error",
          "@tanstack/query/no-unstable-deps": "error",
          "@tanstack/query/infinite-query-property-order": "error",
          "@tanstack/query/no-void-query-fn": "error",
          "@tanstack/query/mutation-property-order": "error",
        },
      },
      {
        files: ["apps/server/**"],
        plugins: ["node", "vitest"],
      },
    ],
  },

  check: {
    fmt: true,
    lint: true,
  },

  staged: {
    "*.{js,jsx,ts,tsx,mjs,cjs}": ["vp check --fix"],
    "*.{json,css,yaml,yml}": ["vp fmt --write"],
  },
});
