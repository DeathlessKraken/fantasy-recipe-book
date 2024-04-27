/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'media',
  theme: {
    extend: {
      textColor: {
        default: '#1a1a1a'
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['PT Serif', 'serif'],
      }
    },
  },
  // eslint-disable-next-line no-undef
  plugins: [require("daisyui")],
}