/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        obsidian: {
          950: '#07090E',
          900: '#0B0E17',
          800: '#141824',
          700: '#1E2436',
          600: '#2D354E',
        },
        fresh: {
          50: '#ECFDF5',
          100: '#D1FAE5',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
        },
        caution: {
          50: '#FFFBEB',
          400: '#FBBF24',
          500: '#F59E0B',
          600: '#D97706',
        },
        danger: {
          50: '#FFF1F2',
          400: '#FB7185',
          500: '#F43F5E',
          600: '#E11D48',
        },
        fridge: {
          400: '#38BDF8',
          500: '#0EA5E9',
          600: '#0284C7',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Outfit', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'glow-fresh': '0 0 24px -4px rgba(16, 185, 129, 0.35)',
        'glow-caution': '0 0 24px -4px rgba(245, 158, 11, 0.35)',
        'glow-danger': '0 0 24px -4px rgba(244, 63, 94, 0.35)',
        'glow-fridge': '0 0 30px -2px rgba(14, 165, 233, 0.3)',
        'bezel': 'inset 0 1px 0 rgba(255, 255, 255, 0.1), 0 8px 32px rgba(0, 0, 0, 0.4)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
