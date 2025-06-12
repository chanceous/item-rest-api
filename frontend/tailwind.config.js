/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        meli: {
          background: '#EBEBEB',
          yellow: '#FFF159',
          blue: '#3483FA',
          dark: '#333333',
          gray: '#666666',
          lightgray: '#999999',
          green: '#00A650',
        },
      },
      lineHeight: {
        '1.18': '1.18',
      },
      fontFamily: {
        sans: ['Proxima Nova', 'Roboto', 'Arial', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.3s ease-out',
      },
    },
  },
  plugins: [],
};