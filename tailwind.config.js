/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    screens: {
      xs: "570px",
      mobile: "640px",
      sm: "650px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
      "3xl": "1800px",
    },
    extend: {
      keyframes: {
        borderAnimation: {
          "0%": { "background-position": "0% 50%" },
          "50%": { "background-position": "100% 50%" },
          "100%": { "background-position": "0% 50%" },
        },
      },
      animation: {
        borderAnimation: "borderAnimation 6s linear infinite",
      },
    },
  },
  plugins: [],
};
