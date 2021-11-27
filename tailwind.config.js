const colors = require('tailwindcss/colors')

module.exports = {
  // mode: 'jit',
  purge: [
    './src/**/*.{js,jsx,ts,tsx,vue}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {   
    extend: {
      colors: {
        yellow: {
          light: '#FFDB6D',
          mid: '#FDE7DA',
        },
        pink: '#F6606D'
      },
      fontSize: {
        'logo': '3vw'
      },
      spacing: {
        item: '200px'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require( 'tailwindcss' ),
		require( 'precss' ),
		require( 'autoprefixer' )
  ],
}
