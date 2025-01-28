/** @type {import('tailwindcss').Config} */
import flowbite from 'flowbite-react/tailwind';
import tailwindScrollbar from 'tailwind-scrollbar';

import colors from 'tailwindcss/colors';

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}', // Include all source files
    './public/index.html', // Include your main HTML
    flowbite.content(),
  ],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1280px',
      '2xl': '1536px',
      '3xl': '1920px',
    },
    colors: {
      red: colors.rose,
      pink: colors.fuchsia,
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },

    extend: {},
  },
  plugins: [flowbite.plugin(), tailwindScrollbar()],
};
