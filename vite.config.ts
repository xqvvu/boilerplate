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
        jsPlugins: ["@stylexjs/eslint-plugin"],
        rules: {
          "@stylexjs/valid-styles": "error",
          "@stylexjs/no-unused": "error",
          "@stylexjs/valid-shorthands": "warn",
          "@stylexjs/sort-keys": "warn",
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
