module.exports = {
  content: [
    './src/app/*.{js,ts,jsx,tsx}',  // Including all pages
    './components/**/*.{js,ts,jsx,tsx}',  // Including all components
  ],
  theme: {
    extend: {
          fontSize: {
        '10xl': '8rem',  // Custom size, 128px
        '11xl': '10rem', // Custom size, 160px
        '12xl': '15rem', // Custom size, 192px
      },
      colors: {
        navy: {
          700: '#2C3E50',  // Navy blue background
          900: '#1A2530',  // Darker navy for the border
        },
        olive: {
          500: '#7C7C3C',  // Olive background
          700: '#606030',  // Darker olive for the border
        },
      },

    },
  },
  plugins: [],
};