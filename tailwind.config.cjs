/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundColor: {
        'main': '#333333',
        'secondary': '#1F1F20'
      },
      colors: {
        'main': '#333333',
        'secondary': '#1F1F20',
      }
    },
  },
  plugins: [],
};
