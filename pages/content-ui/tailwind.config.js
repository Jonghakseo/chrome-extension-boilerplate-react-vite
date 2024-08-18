const baseConfig = require('@extension/tailwindcss-config');
const { withUI } = require('@extension/ui');

/** @type {import('tailwindcss').Config} */
module.exports = withUI({
  ...baseConfig,
  content: ['src/**/*.{ts,tsx}'],
});
