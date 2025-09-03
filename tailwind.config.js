/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "edai-gold": "#E6B652",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};