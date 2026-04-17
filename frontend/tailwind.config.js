/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],

  theme: {
    extend: {
      fontFamily: {
        heading: ['Canela', 'serif'],
        body: ['Inter', 'sans-serif'],
      },

      colors: {
        primary: '#C89632',
      }
    },
  },

  plugins: [require("@tailwindcss/typography")],
}