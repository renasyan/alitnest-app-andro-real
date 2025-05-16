/** @type {import('tailwindcss').Config} */

module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        PoppinsMedium: ["PoppinsMedium", "sans-serif"],
        PoppinsBold: ["PoppinsBold", "sans-serif"],
        PoppinsSemiBold: ["PoppinsSemiBold", "sans-serif"],
        PoppinsExtraBold: ["PoppinsExtraBold", "sans-serif"],
        PoppinsBlack: ["PoppinsBlack", "sans-serif"],
      },
      colors: {
        background: "#FAFAFA",
        baseColor: "#00B4D8",
        gelapDikit: "#0077B6",
        gelapBanget: "#03045E",
        terangDikit: "#90E0EF",
        terangBanget: "#CAF0F8",
        abuAbu: "#ABABAB",
        hitam: "#121212",
        // white: '#FFFFFF',
        // primary: '#E6407B',
        // secondary: '#CCC',
        // highlight: '#FF2353',
        // grey: '#605B57',
        // lightGrey: '#B1B5C7'
      },
    },
  },
  plugins: [],
};
