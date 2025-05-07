import deepmerge from 'deepmerge';
import type { Config } from 'tailwindcss';

export const withUI = (tailwindConfig: Config): Config =>
  deepmerge(tailwindConfig, {
    content: ['../../packages/ui/lib/**/*.tsx'],
  });
