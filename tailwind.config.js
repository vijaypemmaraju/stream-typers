/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {},
  },
  // eslint-disable-next-line
  plugins: [require('@tailwindcss/typography'), require('daisyui')],
};
