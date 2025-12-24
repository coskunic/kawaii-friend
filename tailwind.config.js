/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        kawaii: {
          pink: "#FFD1DC",
          blue: "#AEC6CF",
          yellow: "#FDFD96",
          purple: "#B39EB5",
          text: "#555555",
        },
      },
    },
  },
  plugins: [],
};
