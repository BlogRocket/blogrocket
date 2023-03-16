const defaultTheme = require("tailwindcss/defaultTheme");
const colors = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["DM Sans", ...defaultTheme.fontFamily.sans],
      },
      maxWidth: {
        "8xl": "90rem",
      }
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      black: {
        ...colors.zinc,
        DEFAULT: "#213547",
      },
      white: "#fff",
      primary: {
        light: '#646cff',
        DEFAULT: '#646cff',
        dark: '#646cff',
      },
      secondary: '#06b6d4'
    }
  },
  plugins: [],
}
