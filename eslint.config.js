import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
import { globalIgnores } from 'eslint/config';
import vitest from 'eslint-plugin-vitest';
import prettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    plugins: {
      prettier,
    },
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    extends: [vitest.configs.recommended],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      // Ajustes para Vitest
      'vitest/no-disabled-tests': 'warn',
      'vitest/no-focused-tests': 'error',
      'vitest/no-identical-title': 'error',
      'vitest/prefer-to-have-length': 'warn',
      'vitest/valid-expect': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
      prettierConfig,
    ],
    plugins: {
      prettier,
    },
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // Prettier integration
      'prettier/prettier': 'error',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React JSX
      'react/react-in-jsx-scope': 'off', // Não necessário no React 17+
      'react/prop-types': 'off', // TypeScript já faz essa validação
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': 'off',
      'react/no-deprecated': 'off',
      'react-refresh/only-export-components': 'off',

      // Desabilitar regras de formatação que conflitam com Prettier
      indent: 'off',
      quotes: 'off',
      semi: 'off',
      'space-before-blocks': 'off',
      'object-curly-spacing': 'off',
      'array-bracket-spacing': 'off',
      'computed-property-spacing': 'off',
      'space-in-parens': 'off',
      'keyword-spacing': 'off',
      'space-infix-ops': 'off',
      'space-unary-ops': 'off',
      'no-multiple-empty-lines': 'off',

      // TypeScript específicas
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',
      'no-useless-catch': 'off',

      // Boas práticas gerais
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
]);
