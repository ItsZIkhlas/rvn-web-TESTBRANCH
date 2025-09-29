/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    // Replace default breakpoints completely
    screens: {
      xs: "570px", // extra small
      "mobile": "640px",
      sm: "650px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1800px",
    },
    extend: {
      // Any other customizations like colors, spacing, etc.
    },
  },
  plugins: [],
};
