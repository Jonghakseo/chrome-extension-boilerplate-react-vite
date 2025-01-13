import deepmerge from 'deepmerge';
import type { Config } from 'tailwindcss/types/config.js';

export function withUI(tailwindConfig: Config): Config {
  return deepmerge(tailwindConfig, {
    content: ['../../packages/ui/lib/**/*.{tsx,ts,js,jsx}'],
  });
}
