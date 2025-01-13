/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        purple:{
          300:"#E0E3FF",
          500:"#5202AB",
          700:"#6800e7"
        }
      }
    },
  },
  plugins: [],
}

