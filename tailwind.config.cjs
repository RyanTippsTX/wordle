/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        patua: ['Patua One', 'serif'],
      },
      keyframes: {
        'rapid-spin': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' }, // 3 full spins
        },
      },
      animation: {
        'rapid-spin': 'rapid-spin 400ms ease-out',
      },
    },
  },
};
