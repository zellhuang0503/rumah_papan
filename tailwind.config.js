/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F1592C',        // primary_orange
        secondary: '#242527',      // primary_dark
        bg: '#EAE1D4',            // primary_cream
        neutral: {
          black: '#181818',
          gray: '#939393',
          light: '#F1F1F1',
        },
      },
      fontFamily: {
        sans: ['"Noto Sans TC"', 'sans-serif'],
        serif: ['"Roboto Slab"', 'serif'],
        handwriting: ['cursive'],
      },
      screens: {
        'xs': '375px',
        'desktop': '1440px',
      },
    },
  },
  plugins: [],
}
