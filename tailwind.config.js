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
      typography: {
        DEFAULT: {
          css: {
            // prose-code:before:content-none prose-code:after:content-none prose-code:bg-gray-600
            code: {
              color: "var(--tw-prose-code)",
              fontWeight: "400",
              marginLeft: "0.2rem",
              marginRight: "0.2rem",
              padding: "0.2rem 0.5rem",
              backgroundColor: "#e5e7eb", // gray-200
              borderRadius: "0.25rem", //rounded
            },
            "code::before": {
              content: "none",
            },
            "code::after": {
              content: "none",
            },
            pre: {
              color: "var(--tw-prose-pre-code)",
              backgroundColor: "var(--tw-prose-pre-bg)",
              overflowX: "auto",
              fontWeight: "400",
            },
            "pre code": {
              backgroundColor: "transparent",
              borderWidth: "0",
              borderRadius: "0",
              padding: "0",
              fontWeight: "inherit",
              color: "inherit",
              fontSize: "inherit",
              fontFamily: "inherit",
              lineHeight: "inherit",
            },
            "pre code::before": {
              content: "none",
            },
            "pre code::after": {
              content: "none",
            },
          },
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
