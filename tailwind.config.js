/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          light: "#F7F3EE",
          medium: "#D8C3A5",
          dark: "#594A42"
        }
      }
    }
  },
  plugins: [],
};
