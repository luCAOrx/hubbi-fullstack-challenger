import importHelpers from "eslint-plugin-import-helpers";
import prettier from "eslint-plugin-prettier";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import typescriptEslint from "typescript-eslint";

import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default typescriptEslint.config(
  ...compat.extends("prettier"),
  js.configs.recommended,
  typescriptEslint.configs.recommended,
  {
    ignores: ["**/node_modules", "**/dist"],
    files: ["**/*.ts", "**/*.mjs"],
    plugins: {
      prettier,
      "import-helpers": importHelpers,
    },

    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },

      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        parser: typescriptEslint.parser,
        project: "./tsconfig.json",
      },
    },

    rules: {
      "prettier/prettier": "error",

      "import-helpers/order-imports": [
        "warn",
        {
          newlinesBetween: "always",
          groups: [
            ["module", "absolute"],
            "/^@/",
            ["parent", "sibling", "index"],
          ],

          alphabetize: {
            order: "asc",
            ignoreCase: true,
          },
        },
      ],

      "array-callback-return": "off",
      "@typescript-eslint/naming-convention": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-extraneous-class": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-identifiers": "off",
    },
  },
);
