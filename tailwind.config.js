/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkgreen: "#0f3d2e",
        lightgreen: "#34d399",
      },
    },
  },
  plugins: [],
};
