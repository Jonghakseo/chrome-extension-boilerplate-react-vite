const baseConfig = require('@chrome-extension-boilerplate/tailwindcss-config');
const { withUI } = require('@chrome-extension-boilerplate/ui');

/** @type {import('tailwindcss').Config} */
module.exports = withUI({
  ...baseConfig,
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
});
