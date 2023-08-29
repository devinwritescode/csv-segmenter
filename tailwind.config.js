/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    fill: {
      current: "currentColor",
    },
    extend: {
      backgroundColor: {
        rvx: "#0039cb",
      },
      textColor: {
        rvx: "#0039cb",
      },
    },
  },
  plugins: [],
};
