import type { Config } from 'tailwindcss';

export default {
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'selector',
} as Omit<Config, 'content'>;
