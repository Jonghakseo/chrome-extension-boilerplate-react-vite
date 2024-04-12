/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{ts,tsx}'],
  content: [],
  theme: {
    extend: {},
  },
  plugins: [require('daisyui')],
};
