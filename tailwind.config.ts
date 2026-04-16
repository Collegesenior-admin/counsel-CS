import scrollbarHide from 'tailwind-scrollbar-hide';

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1200px',
        'tablet': '640px',
      },
      herotext: {
        fontSize: '10px',
        fontWeight: '200',
        lineHeight: '56px',
        color: '#FFFFFF',
      },
    },
    },
plugins: [
  scrollbarHide
],
};

export default config;