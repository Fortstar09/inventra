/** @type {import('tailwindcss').Config} */
module.exports = {
  presets: [require("nativewind/preset")],
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#6C63FF",
          100: "#FAFAFF",
          200: "#3F3D56",
        },
      
      },
      fontFamily: {
        briextralight: ["BricolageGrotesque-ExtraLight", "sans-serif"],
        brilight: ["BricolageGrotesque-Light", "sans-serif"],
        briregular: ["BricolageGrotesque-Regular", "sans-serif"],
        brimedium: ["BricolageGrotesque-Medium", "sans-serif"],
        brisemibold: ["BricolageGrotesque-SemiBold", "sans-serif"],
        bribold: ["BricolageGrotesque-Bold", "sans-serif"],
        briextrabold: ["BricolageGrotesque-ExtraBold", "sans-serif"],
        briblack: ["BricolageGrotesque-Black", "sans-serif"],
      },
    },
  },
  plugins: [],
};
