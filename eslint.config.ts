import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import globals from 'globals';
import * as ts from 'typescript-eslint';

export default ts.config(
  // Ignore patterns (.eslintignore)
  {
    ignores: ['**/build/**', '**/dist/**', '**/node_modules/**'],
  },

  // Files to scan
  { files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'] },

  // Shared configs
  js.configs.recommended,
  ...ts.configs.recommended,
  reactPlugin.configs.flat.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginPrettierRecommended,

  // Add compatibility
  ...fixupConfigRules(new FlatCompat().extends('plugin:react-hooks/recommended')),

  // Custom config
  {
    languageOptions: {
      parser: ts.parser,
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
