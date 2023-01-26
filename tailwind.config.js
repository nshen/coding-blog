/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          ...defaultTheme.fontFamily.sans,
          "PingFang SC",
          "Microsoft Yahei",
        ],
        serif: [...defaultTheme.fontFamily.serif, "STSong", "SimSun"],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
