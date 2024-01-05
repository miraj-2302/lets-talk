/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'nunito': ['Nunito', 'sans-serif', ],
        'open': ['Open Sans', 'sans-serif', ],
        'poppins': ['Poppins', 'sans-serif', ],
        
      },
      colors:{
        'primary': '#5F35F5',

        'shadows': 'drop-shadows (0px 4px 4px 0px rgba(0, 0, 0, 0.25));'

      },
      // dropShadow : {
      //   '3xl': '(0px 4px 4px 0px rgba(0, 0, 0, 0.25)'
      // }
    },
  },
  plugins: [],
}