import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import tsParser from "@typescript-eslint/parser";

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    plugins: {
      tsParser,
    },
  },
  {
    files: ["**/connect.ts"],
    rules: {
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
// Обратил внимание на ошибки eslint касательно файла connect.ts (две ошибки, о которых упоминалось в код ревью). Более подробные объяснения находятся в connect.ts
