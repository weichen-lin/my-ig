const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xss: '320px',
      xs: '480px',
      sm: '576px',
      md: '768px',
      '4xl': '1800px',
      ...defaultTheme.screens,
    },
    extend: {},
  },
  plugins: [],
}

// 'sm' | 'md' | 'lg' | 'xl' | '2xl'
// screens: {
//       sm: '480px',
//       md: '768px',
//       lg: '976px',
//       xl: '1440px',
//     },
