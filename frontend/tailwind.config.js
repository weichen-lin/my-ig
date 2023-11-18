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
    extend: {
      backgroundColor: {
        googleDriveGray: '#ededed',
      },
    },
  },
  plugins: [],
}
