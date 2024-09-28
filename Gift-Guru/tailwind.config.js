/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        btnColor : '#127fd8',
        btnHover : '#51b1ff',
      },
      fontFamily:{
        openSans: ['"Open Sans"', 'sans-serif'],  
      },
    },
  },
  plugins: [],
}

