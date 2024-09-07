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
        "buttonHover": "#22C55E"
      }
    },
  },
  plugins: [require("daisyui")],
}

