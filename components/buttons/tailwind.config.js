// eslint-disable-next-line @typescript-eslint/no-var-requires
const baseConfig = require('@chrome-extension-boilerplate/tailwindcss-config');

/** @type {import('tailwindcss').Config} */
module.exports = {
  ...baseConfig,
  content: ['./index.html', './lib/**/*.{js,ts,jsx,tsx}'],
};
