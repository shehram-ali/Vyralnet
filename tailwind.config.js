/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#5EBD3E',
        secondary: '#03DAC6',
        error: '#B00020',
        background: '#F8F8FB',
        surface: '#F5F5F5',
      },
    },
  },
  plugins: [],
}
