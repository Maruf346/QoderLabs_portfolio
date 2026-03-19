/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {

      // ─── Typography ───────────────────────────────────────────
      fontFamily: {
        display: ['"Syne"',    'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },

      // ─── Brand Color Palette (extracted from logo + name assets) ──
      colors: {
        brand: {
          // Logo swirl colors (red → orange → yellow → green → teal → blue → purple → pink)
          red:    '#C13B2A',
          orange: '#C4622D',
          amber:  '#B8832A',
          olive:  '#7A8B2E',
          green:  '#3A7A3A',
          teal:   '#2A6B5A',
          blue:   '#4A7FD4',
          purple: '#6B4A9B',
          pink:   '#C45A7A',
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

      // ─── Gradients ────────────────────────────────────────────
      backgroundImage: {
        // Matches the name.png left→right gradient: green → olive → amber → orange → red
        'brand-name':
          'linear-gradient(90deg, #3A7A3A 0%, #7A8B2E 25%, #B8832A 50%, #C4622D 75%, #C13B2A 100%)',

        // Full logo swirl gradient (all stops)
        'brand-logo':
          'linear-gradient(135deg, #C13B2A 0%, #C4622D 15%, #B8832A 30%, #7A8B2E 45%, #3A7A3A 55%, #2A6B5A 65%, #4A7FD4 80%, #6B4A9B 100%)',

        // Soft tinted version for backgrounds / cards
        'brand-soft':
          'linear-gradient(135deg, rgba(193,59,42,0.08) 0%, rgba(196,98,45,0.07) 20%, rgba(184,131,42,0.06) 38%, rgba(58,122,58,0.07) 55%, rgba(74,127,212,0.08) 75%, rgba(107,74,155,0.07) 100%)',

        // Hero glow radial
        'hero-glow':
          'radial-gradient(ellipse 80% 55% at 50% 0%, rgba(74,127,212,0.14) 0%, transparent 70%)',

        // Subtle top-edge glow for navbar
        'nav-glow':
          'radial-gradient(ellipse 60% 40% at 50% 0%, rgba(58,122,58,0.10) 0%, transparent 100%)',
      },

      // ─── Shadows / Glow ───────────────────────────────────────
      boxShadow: {
        // Subtle multi-color glow (matches logo palette)
        'glow-sm':    '0 0 16px rgba(74,127,212,0.14)',
        'glow-md':    '0 0 32px rgba(74,127,212,0.20)',
        'glow-lg':    '0 0 64px rgba(74,127,212,0.26)',
        'glow-green': '0 0 24px rgba(58,122,58,0.20)',
        'glow-warm':  '0 0 24px rgba(196,98,45,0.18)',

        // Card depth
        'card':       '0 2px 24px rgba(15,15,20,0.06), 0 1px 4px rgba(15,15,20,0.04)',
        'card-hover': '0 8px 48px rgba(15,15,20,0.10), 0 2px 8px rgba(15,15,20,0.06)',

        // Lifted button / interactive elements
        'lift':       '0 4px 16px rgba(15,15,20,0.10), 0 1px 4px rgba(15,15,20,0.06)',
        'lift-hover': '0 8px 32px rgba(15,15,20,0.14), 0 2px 8px rgba(15,15,20,0.08)',
      },

      // ─── Border Radius ────────────────────────────────────────
      borderRadius: {
        // System: 4 → 8 → 12 → 16 → 24 → 32
        'sm':  '0.25rem',   // 4px  — badges, tags
        'md':  '0.5rem',    // 8px  — inputs, small buttons
        'lg':  '0.75rem',   // 12px — buttons
        'xl':  '1rem',      // 16px — cards, panels
        '2xl': '1.5rem',    // 24px — modals, sections
        '3xl': '2rem',      // 32px — hero elements
        '4xl': '2.5rem',    // 40px — pill shapes
      },

      // ─── Spacing additions ────────────────────────────────────
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      // ─── Animations ───────────────────────────────────────────
      animation: {
        'fade-up':    'fadeUp 0.6s ease forwards',
        'fade-in':    'fadeIn 0.5s ease forwards',
        'fade-down':  'fadeDown 0.5s ease forwards',
        'spin-slow':  'spin 10s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-10px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0.55' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':      { transform: 'translateY(-8px)' },
        },
      },

      // ─── Easing ───────────────────────────────────────────────
      transitionTimingFunction: {
        'spring':      'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth':      'cubic-bezier(0.4, 0, 0.2, 1)',
        'ease-in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },

      // ─── Max Widths ───────────────────────────────────────────
      maxWidth: {
        '8xl':  '88rem',
        '9xl':  '96rem',
      },
    },
  },
  plugins: [],
}
