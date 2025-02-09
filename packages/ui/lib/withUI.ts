import deepmerge from 'deepmerge';
import type { Config } from 'tailwindcss/types/config';

export function withUI(tailwindConfig: Config): Config {
  return deepmerge(tailwindConfig, {
    content: ['./node_modules/@extension/ui/lib/**/*.{tsx,ts,js,jsx}'],
  });
}
