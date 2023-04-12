/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ['Inter'],
      },
      colors: {
        white: '#FFFFFF',
        red: '#DC5C66',
        black: {
          100: '#2E2E2E',
          200: '#1E1E1E',
          300: '#000000',
        },
        violet: '#8B7AD6',
        purple: '#AF67E6',
        teal: '#418CAE',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar')({ nocompatible: true }),
    require('flowbite/plugin'),
  ],
};
