/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {

    extend: {
      fontFamily:{
        raleway:'Raleway',    
      },
      colors:{
        'primary':'#eff0f3',
        'secondary': '#fffffe',
        'accent':'#6246ea',
        'typing':'#2b2c34'
      }
    }
  },
  plugins: [
  ],
}