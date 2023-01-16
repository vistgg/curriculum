// eslint-disable-next-line @typescript-eslint/no-var-requires
const { purple } = require("tailwindcss/colors");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{tsx,html}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: purple
      },
      fontFamily: {
        sans: ["var(--font-inter)"]
      }
    }
  },
  plugins: [
    require("@tailwindcss/line-clamp"),
    require("@tailwindcss/forms"),
    require("tailwindcss-patterns")
  ]
};
