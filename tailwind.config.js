/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserratRegular: ["MontserratRegular"],
        montserratBold: ["MontserratBold"],
      },
      colors: {
        primaryColor: "#0066F5",
        secondaryColor: "#CCE0FD",
        disabledBtn: "#99C2FB",
        red: "#EA133E",
        title: "#000E23",
        subTitle: "#6B7C97",
        green: "#34A853",
        sidebarText: "#021D48",
      },
    },
  },
  plugins: [],
};
