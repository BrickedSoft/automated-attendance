/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/renderer/index.html', './src/renderer/src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        light: {
          bg: '#fff',
          'bg-f8': '#F8F8F8',
          'blue-ff': '#4790FF',
          'black-55': '#555',
          'black-33': '#333',
          'gray-f9': '#F6F7F9'
        }
      },
      fontFamily: {
        sans: ['Rubik', 'sans-serif'],
        primary: ['Rubik']
      },
      height: {
        header: '2rem'
      }
    }
  },
  plugins: []
}
