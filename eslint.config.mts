import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import ts from 'typescript-eslint';

export default ts.config(
  // Ignore patterns (.eslintignore)
  {
    ignores: ['**/build/**', '**/dist/**', '**/node_modules/**', 'tailwind.config.ts', 'watch.js'],
  },

  // Files to scan
  { files: ['**/*.{js,ts,tsx}'] },

  // Shared configs
  js.configs.recommended,
  ...ts.configs.recommended,
  reactPlugin.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintPluginPrettierRecommended,

  // Add compatibility
  // ts-expect-error - mismatched typings
  ...fixupConfigRules(new FlatCompat().extends('plugin:react-hooks/recommended')),
  // ...fixupConfigRules(new FlatCompat().extends('plugin:react-hooks/recommended', 'plugin:import/recommended')),

  // Custom config
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
      globals: {
        ...globals.browser,
        ...globals.es2020,
        ...globals.node,
        chrome: 'readonly',
      },
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'react/prop-types': 'off',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
);
