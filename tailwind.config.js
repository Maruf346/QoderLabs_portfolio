/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ['"Syne"', 'sans-serif'],
        body: ['"DM Sans"', 'sans-serif'],
        mono: ['"DM Mono"', 'monospace'],
      },
      colors: {
        brand: {
          red:    '#E8523A',
          orange: '#F0874A',
          yellow: '#F5C842',
          green:  '#3DAA6E',
          teal:   '#2E8B8B',
          blue:   '#4A7FD4',
          purple: '#7C5CBF',
          pink:   '#D4607A',
        },
        surface: {
          50:  '#FAFAFA',
          100: '#F4F4F6',
          200: '#EAEAEE',
          300: '#D8D8E0',
        },
        ink: {
          DEFAULT: '#0F0F14',
          muted:   '#5A5A72',
          light:   '#9898AE',
        },
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #E8523A 0%, #F0874A 20%, #F5C842 38%, #3DAA6E 55%, #4A7FD4 75%, #7C5CBF 100%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, rgba(232,82,58,0.12) 0%, rgba(240,135,74,0.10) 20%, rgba(245,200,66,0.08) 38%, rgba(61,170,110,0.10) 55%, rgba(74,127,212,0.12) 75%, rgba(124,92,191,0.10) 100%)',
        'hero-glow':
          'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(74,127,212,0.15) 0%, transparent 70%)',
      },
      boxShadow: {
        'glow-sm':    '0 0 20px rgba(74,127,212,0.15)',
        'glow-md':    '0 0 40px rgba(74,127,212,0.20)',
        'glow-lg':    '0 0 80px rgba(74,127,212,0.25)',
        'card':       '0 2px 24px rgba(15,15,20,0.06), 0 1px 4px rgba(15,15,20,0.04)',
        'card-hover': '0 8px 48px rgba(15,15,20,0.10), 0 2px 8px rgba(15,15,20,0.06)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'spin-slow':  'spin 8s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.6' },
        },
      },
      transitionTimingFunction: {
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
    },
  },
  plugins: [],
}
