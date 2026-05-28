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
      fontFamily: {
        sans: ['"Poppins"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        poppins: ['"Poppins"', 'sans-serif'],
      },

      screens: {
        '3xl': '1200px',
        tablet: '640px',
      },

      herotext: {
        fontSize: '10px',
        fontWeight: '200',
        lineHeight: '56px',
        color: '#FFFFFF',
      },

      /* ADD THIS */
      keyframes: {
        marquee: {
          '0%': {
            transform: 'translateX(0%)',
          },
          '100%': {
            transform: 'translateX(-50%)',
          },
        },
      },

      animation: {
        'marquee': 'marquee 30s linear infinite',
      },
    },
  },

  plugins: [scrollbarHide],
};

export default config;
