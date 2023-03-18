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
      black: "#213547",
      neutral: {
        ...colors.zinc,
        DEFAULT: colors.zinc[500],
      },
      white: "#fff",
      primary: {
        light: '#646cff',
        DEFAULT: '#646cff',
        dark: '#646cff',
      },
      secondary: {
        ...colors.cyan,
        DEFAULT: colors.cyan[500],
      },
      danger: {
        ...colors.rose,
        DEFAULT: colors.rose[500],
      }
    }
  },
  plugins: [],
}
