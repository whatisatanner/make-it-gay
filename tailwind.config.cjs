/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,jsx,tsx}"
  ],
  theme: {
    extend: {
      fluidType: {
        setings: {
          prefix: 'fluid-',
        }
      }
    },
  },
  plugins: [require('tailwind-fluid-typography')],
}
