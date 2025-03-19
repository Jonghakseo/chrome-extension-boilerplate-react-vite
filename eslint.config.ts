import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintPluginImportX from 'eslint-plugin-import-x';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import reactPlugin from 'eslint-plugin-react';
import fg from 'fast-glob';
import globals from 'globals';
import { config, configs as tsConfigs, parser as tsParser } from 'typescript-eslint';
import path from 'path';
import type { FixupConfigArray } from '@eslint/compat';

const getTsConfigPaths = async () => {
  const files = await fg(['tsconfig.json', '**/tsconfig.json', '!**/node_modules/**']);
  return files.map(file => path.relative(process.cwd(), file));
};

const tsConfigPaths = await getTsConfigPaths();

export default config(
  // Shared configs
  js.configs.recommended,
  ...tsConfigs.recommended,
  jsxA11y.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  eslintPluginPrettierRecommended,
  ...fixupConfigRules(new FlatCompat().extends('plugin:react-hooks/recommended') as FixupConfigArray),
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    ...reactPlugin.configs.flat.recommended,
    ...reactPlugin.configs.flat['jsx-runtime'],
  },

  {
    ignores: ['**/build/**', '**/dist/**', '**/node_modules/**', 'chrome-extension/manifest.js'],
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx}'],
    languageOptions: {
      parser: tsParser,
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
      'import-x/resolver': {
        typescript: {
          project: tsConfigPaths,
        },
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/consistent-type-imports': 'error',
      'react/prop-types': 'off',
      'prefer-const': 'error',
      'no-var': 'error',
      'func-style': ['error', 'expression', { allowArrowFunctions: true }],
      'import-x/order': [
        'error',
        {
          'newlines-between': 'never',
          alphabetize: { order: 'asc', caseInsensitive: true },
          groups: ['external', 'internal', 'builtin', 'type', 'object'],
        },
      ],
      'import-x/no-unresolved': 'off',
      'import-x/default': 'error',
      'import-x/export': 'error',
      'import-x/no-named-as-default': 'error',
      'import-x/newline-after-import': 'error',
    },
    linterOptions: {
      reportUnusedDisableDirectives: 'error',
    },
  },
);
