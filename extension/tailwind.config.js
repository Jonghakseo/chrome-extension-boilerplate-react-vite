/** @type {import('tailwindcss').Config} */
export default {
  purge: ['./index.html', './src/**/*.{ts,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        primary1: '#2FE4AB',
        primary2: '#16968E',
        text1: '#D9EEF3',
        text2: '#9CC2C9',
        text3: '#475E64',
        background1: '#091011',
        background2: '#111F22',
        background3: '#182D32',
        background4: '#243D42',
        background5: '#2D4D53',
      },
    },
  },
  plugins: [require('daisyui')],
};
