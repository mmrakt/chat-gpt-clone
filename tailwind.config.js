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
          100: "#040409",
          200: "#202123",
          300: "#28282d",
          400: "#343541",
          500: "#444654",
          550: "#4B4A53",
          600: "#555869",
          700: "#8F8EA1",
          800: "#c5c5d2",
          850: "#dcdce6",
          900: "#ECECF1",
          950: "#f7f7f8",
        },
      },
    },
  },
  plugins: [],
};
