module.exports = {
  content: ["./**/*.html", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      colors: {
        purple: {
          DEFAULT: '#7F3FBF',
        },
        dark: {
          DEFAULT: '#2D2D2D',
        },
      },
    },
  },
  plugins: [
    require('flowbite/plugin')
  ]
};
