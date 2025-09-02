import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { globalIgnores } from 'eslint/config'
import jest from 'eslint-plugin-jest'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
  },
  {
    files: ['**/*.test.{ts,tsx}', '**/*.spec.{ts,tsx}'],
    extends: [
      jest.configs.recommended,
    ],
    languageOptions: {
      globals: {
        ...globals.jest,
        ...globals.browser,
      },
    },
    rules: {
      'jest/no-disabled-tests': 'warn',
      'jest/no-focused-tests': 'error',
      'jest/no-identical-title': 'error',
      'jest/prefer-to-have-length': 'warn',
      'jest/valid-expect': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // React JSX
      'react/react-in-jsx-scope': 'off', // Não necessário no React 17+
      'react/prop-types': 'off', // TypeScript já faz essa validação
      'react/no-unescaped-entities': 'off',
      'react/no-unknown-property': 'off',
      'react/no-deprecated': 'off',

      // Indentação e formatação
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'space-before-blocks': ['error', 'always'],

      // Espaçamento em objetos e arrays
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'computed-property-spacing': ['error', 'never'],
      'space-in-parens': ['error', 'never'],
      'space-before-blocks': ['error', 'always'],
      'keyword-spacing': ['error', { 'before': true, 'after': true }],
      'space-infix-ops': 'error',
      'space-unary-ops': ['error', { 'words': true, 'nonwords': false }],

      // Controle de linhas em branco
      'no-multiple-empty-lines': ['error', { 'max': 1, 'maxEOF': 0 }],

      // TypeScript específicas
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-explicit-any': 'warn',

      // Boas práticas gerais
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  },
])
