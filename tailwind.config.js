/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
        accent: '#ef4444',
        base: '#111827',
        background: '#f9fafb',
      },
      boxShadow: {
        brutal: '4px 4px 0px 0px rgba(17,24,39,1)',
      },
      animation: {
        wiggle: 'wiggle 3s ease-in-out infinite',
        'slight-bounce': 'slight-bounce 2s ease-in-out infinite',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: false,
    base: false,
    styled: false,
  },
}