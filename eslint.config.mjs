import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "next-env.d.ts",
    ],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": "off", // ignore unused vars
      "prefer-const": "off", // ignore let -> const errors

      // 🚨 Suppress Next.js / React warnings
      "react-hooks/exhaustive-deps": "off", // ignore missing deps in useEffect
      "@next/next/no-img-element": "off", // allow <img>
      "@next/next/no-page-custom-font": "off", // ignore font import warning
    }
    
    
  },
];

export default eslintConfig;
