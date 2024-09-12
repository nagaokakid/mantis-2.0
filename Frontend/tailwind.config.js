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
        "customGreen": "#00AA00",
        "buttonHover": "#009300",
        "tableHover": "#c9ffc9",
        "link": "#1a56db",
        "ticketButton": "#00babd",
        "ticketButtonHover": "#01a8ab"
      }
    },
  },
  plugins: [require("daisyui"), require('flowbite/plugin')],
}

