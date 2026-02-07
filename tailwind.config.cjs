/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        monaer: {
          primary: '#0067B2',
          'primary-dark': '#005699',
          'primary-light': '#1E88E5',
          secondary: '#FF6B35',
          'secondary-dark': '#E55A2B',
          accent: '#00C853',
          'accent-dark': '#00A843',
          dark: '#1a1a1a',
          gray: '#6c757d',
          'light-gray': '#f8f9fa',
          white: '#ffffff',
        }
      },
      fontFamily: {
        'poppins': ['Poppins', 'Inter', 'sans-serif'],
        'jetbrains': ['JetBrains Mono', 'monospace'],
        'space': ['Space Grotesk', 'sans-serif'],
      },
      boxShadow: {
        'monaer': '0 4px 20px rgba(0, 103, 178, 0.15)',
        'monaer-hover': '0 8px 30px rgba(0, 103, 178, 0.25)',
      }
    },
  },
  plugins: [],
}
