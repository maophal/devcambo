const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // hanuman: ["var(--font-hanuman)"],
        sans: ["var(--font-hanuman)", ...defaultTheme.fontFamily.sans]
      }
    },
  },
  plugins: [],
};
