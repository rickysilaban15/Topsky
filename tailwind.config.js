/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        success: colors.green,
        danger: colors.red,
        warning: colors.amber,
      },
      // Tambahkan ini untuk kemudahan penggunaan
      backgroundSize: {
        'size-200': '200% 200%',
      },
      animation: {
        'gradient': 'gradient-animation 18s ease infinite',
      },
      keyframes: {
        'gradient-animation': {
          '0%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
          '100%': { 'background-position': '0% 50%' },
        },
      }
    },
  },
  plugins: [],
};