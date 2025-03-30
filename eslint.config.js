import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import boundaries from "eslint-plugin-boundaries";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      boundaries,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            { from: "features", allow: ["shared", "entities"] },
            { from: "widgets", allow: ["shared", "entities", "features"] },
            {
              from: "pages",
              allow: ["shared", "entities", "features", "widgets"],
            },
            {
              from: "app",
              allow: [
                "shared",
                "entities",
                "features",
                "widgets",
                "pages",
                "processes",
              ],
            },
          ],
        },
      ],
    },
    settings: {
      boundaries: {
        defaultIgnore: ["**/*.test.ts", "**/*.stories.tsx"],
        path: {
          alias: "@",
        },
        elements: [
          { type: "shared", pattern: "src/shared/*" },
          { type: "entities", pattern: "src/entities/*" },
          { type: "features", pattern: "src/features/*" },
          { type: "widgets", pattern: "src/widgets/*" },
          { type: "pages", pattern: "src/pages/*" },
          { type: "processes", pattern: "src/processes/*" },
          { type: "app", pattern: "src/app/*" },
        ],
      },
    },
  },
);
