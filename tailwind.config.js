/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    "./node_modules/flowbite/**/*.js",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["'Roboto', sans-serif"],
      },
      boxShadow: {
        green: '0 4px 6px -1px rgba(22, 163, 74, 0.4), 0 2px 4px -2px rgba(22, 163, 74, 0.3)',
      },
      animation: {
        scroll: "scrollLeft 40s linear infinite",
        'spin-slow': 'spin 8s linear infinite',
      },
      keyframes: {
        scrollLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
      },
    },
  },
  variants: {
    extend: {
      opacity: ['group-hover'],
      translate: ['group-hover'],
    },
  },
  plugins: [require("flowbite/plugin")],
};
