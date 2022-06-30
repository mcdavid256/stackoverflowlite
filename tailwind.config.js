/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}",'./node_modules/tw-elements/dist/js/**/*.js'],
  
  theme: {
    fontFamily: {
      'poppins': ['Poppins', 'sans-serif'],
      'roboto': ['Roboto', 'sans-serif'] 
    },
    container: {
      center:true,
      padding:'2rem'
    },
    container_full:{
      center:true,
      width:'100%',
      padding:'2rem'
    }
  },
  plugins: [
    require('tw-elements/dist/plugin')
  ],
}
