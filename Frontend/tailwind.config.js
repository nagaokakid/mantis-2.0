/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'Helvetica', 'Arial', 'sans-serif']
      },
      colors: {
        "logoText": "#4ebf76",
        "customGreen": "#0A0"
      }
    },
  },
  plugins: [require("daisyui")],
}

