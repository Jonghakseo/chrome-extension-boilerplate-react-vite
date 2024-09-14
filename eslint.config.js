import js from '@eslint/js';
import tailwind from 'eslint-plugin-tailwindcss';

export default [
  js.configs.recommended,
  ...tailwind.configs['flat/recommended'],
  {
    settings: {
      tailwindcss: {
        config: 'packages/tailwind-config/tailwind.config.ts',
        callees: ['classnames', 'clsx', 'ctl'],
        cssFiles: ['**/*.css', '!**/node_modules', '!**/.*', '!**/dist', '!**/build'],
        removeDuplicates: true,
        skipClassAttribute: false,
        whitelist: [],
        tags: [],
        classRegex: '^class(Name)?$',
      },
    },
  },
];
