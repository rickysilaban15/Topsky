/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors');

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
      },
      colors: {
        primary: colors.indigo,
        secondary: colors.slate,
        success: colors.green,
        danger: colors.red,
        warning: colors.amber,

        // Tambahan warna untuk UI/UX login modern
        background: {
          DEFAULT: '#0f172a', // slate-900
          soft: '#1e293b',     // slate-800
          card: '#1e293b',     // slate-800 (bisa diganti sesuai kebutuhan)
        },
      },
      spacing: {
        'header-height': '64px',
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        card: '0 10px 25px rgba(0,0,0,0.1)',
      },
      backgroundSize: {
        'size-200': '200% 200%',
      },
      animation: {
        gradient: 'gradient-animation 18s ease infinite',
      },
      keyframes: {
        'gradient-animation': {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
    },
  },
  plugins: [],
};
