import { defineConfig } from "vite-plus";

const ignorePatterns = ["**/route-tree.gen.ts", "**/node_modules", "**/dist"];

export default defineConfig({
  run: {
    enablePrePostScripts: true,
    cache: {
      tasks: true,
    },
    tasks: {
      dev: {
        command: [],
      },
    },
  },

  create: {
    defaultTemplate: "@xqvvu",
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

  check: {
    fmt: true,
    lint: true,
  },

  staged: {
    "*.{js,jsx,ts,tsx}": "vp check --fix",
    "*.{json,css}": "vp fmt --write",
  },
});
