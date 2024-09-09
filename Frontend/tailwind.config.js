/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        "logoText": "#4ebf76",
        "customGreen": "#0A0",
        "buttonHover": "#03de03"
      }
    },
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],
}

