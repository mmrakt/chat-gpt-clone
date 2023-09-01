/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}", // Note the addition of the `app` directory.
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gray: {
          200: "#202123",
          400: "#353441",
          500: "#41404F",
          550: "#4B4A53",
          600: "#555869",
          700: "#8F8EA1",
          800: "#c5c5d2",
        },
      },
    },
  },
  plugins: [],
};
