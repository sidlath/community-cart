/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: '#F5EDE0',
        'cream-light': '#FFFBF3',
        ink: '#2A1810',
        'ink-soft': '#5C4938',
        clay: '#8B6F5C',
        terra: '#C73A1F',
        'terra-light': '#E8743C',
        leaf: '#1F8A3F',
        'leaf-light': '#7BC97D',
        sand: '#E8DCCA',
        'sand-dark': '#D4C4AE',
      },
      fontFamily: {
        display: ['Fraunces', 'serif'],
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      animation: {
        'pulse-dot': 'pulse-dot 1.6s ease-in-out infinite',
        'slide-up': 'slide-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both',
        'float-soft': 'float-soft 6s ease-in-out infinite',
        'count-bump': 'count-bump 0.5s ease',
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.3', transform: 'scale(0.8)' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        'float-soft': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'count-bump': {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
