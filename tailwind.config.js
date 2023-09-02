/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fill: {
      current: "currentColor",
    },
    extend: {
      keyframes: {
        slideRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
      },

      animation: {
        slideRightError: "slideRight 10s linear forwards",
        slideRightSuccess: "slideRight 3s linear forwards",
      },
      backgroundColor: {
        rvx: "#0039cb",
        buttonBG:
          "[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-gray-700 via-gray-900 to-black",
      },
      textColor: {
        rvx: "#0039cb",
      },
    },
  },
  plugins: [],
};
