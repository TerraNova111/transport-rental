/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        '3xl': '1920px', // добавляем breakpoint для Full HD
        '4xl': '2560px', // добавляем breakpoint для сверхшироких экранов
      },
    },
  },
  plugins: [],
};
