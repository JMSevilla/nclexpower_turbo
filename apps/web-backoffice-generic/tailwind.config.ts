import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    fontFamily: {
      primary: "Playfair Display",
      body: "Work Sans",
      logo: "Proxima Nova",
      main: "Abyssinica SIL",
      subtitle: "Roboto Slab",
    },
    container: {
      padding: {
        DEFAULT: "1rem",
        lg: "3rem",
      },
    },
    screens: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
    },
    extend: {
      colors: {
        primary: "#ffffff", // white
        secondary: "#fdf9ff", // light gray
        gray: "#eff0f5", //gray
        curveGray: "#202731", // dark gray
        curveBlue: "#3c31dd", // blue
        sideBar: "#051e34", //dark blue
        sideBarTab: "#122c44", // light gray
        sideBarTabHover: "#253d53", // white gray
        blue: "#1a73e8", // blue
        accent: {
          DEFAULT: "#bd321c", //red,
          hoverToRed: "#bd321c", // red,
          hoverToBlack: "#000000", // black
          hoverToWhite: "#ffffff", // white'
        },
        paragraph: "#878e99",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
