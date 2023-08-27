/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.tsx",
    "./pages/**/*.ts",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.tsx",
    "./components/**/*.ts",
  ],
  purge: [
    // Other purge options...
    "./components/**/*.tsx", // Include dynamic classes in components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#466060",
        text: "#222222",
        button: {
          default: "#518c9c",
          hover: "#6da5b5",
          hoverLighten: "#a6ccd4",
        },
        link: {
          default: "#4e8c9c",
          hover: "#6da5b5",
        },
        accent1: "#9BA9B1",
        accent2: "#B88E7B",
        accent3: "#A86442",
        bg1: "#f9f9f9",
        bg2: "#ebebeb",
        border: "#d6d6d6",
      },
    },
  },
  plugins: [],
  darkMode: "class",
};
