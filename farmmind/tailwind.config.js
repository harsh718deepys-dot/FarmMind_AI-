/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        krishi: {
          green: {
            light: '#E8F5E9',
            DEFAULT: '#4CAF50',
            dark: '#2E7D32',
          },
          cream: '#FFFDF7',
          gray: '#F5F5F5'
        }
      }
    },
  },
  plugins: [],
}
