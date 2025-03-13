
import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import tsParser from '@typescript-eslint/parser';

export default tseslint.config(
  eslint.configs.recommended,
  tseslint.configs.recommended,
  {
    "plugins": {
      tsParser,
    }
  }
);
