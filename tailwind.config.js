/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {

      /* ── Typography ─────────────────────────────────────── */
      fontFamily: {
        display: ['"Syne"',    'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },

      /* ── Brand Color Palette ────────────────────────────── */
      colors: {
        brand: {
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
          50:  '#F8F8FA',
          100: '#F2F2F6',
          200: '#E8E8EE',
          300: '#D6D6E0',
        },
        ink: {
          DEFAULT: '#0D0D12',
          muted:   '#56566E',
          light:   '#94949E',
        },
      },

      /* ── Gradient backgrounds ───────────────────────────── */
      backgroundImage: {
        /* Name wordmark: green → amber → red */
        'brand-name':
          'linear-gradient(90deg, #3A7A3A 0%, #7A8B2E 25%, #B8832A 50%, #C4622D 75%, #C13B2A 100%)',

        /* Full logo swirl: warm reds through cool blues */
        'brand-logo':
          'linear-gradient(135deg, #C13B2A 0%, #C4622D 15%, #B8832A 30%, #7A8B2E 45%, #3A7A3A 55%, #2A6B5A 65%, #4A7FD4 80%, #6B4A9B 100%)',

        /* Very soft tint for section backgrounds */
        'brand-soft':
          'linear-gradient(135deg, rgba(193,59,42,0.05) 0%, rgba(184,131,42,0.04) 35%, rgba(58,122,58,0.05) 55%, rgba(74,127,212,0.05) 80%, rgba(107,74,155,0.04) 100%)',

        /* Hero ambient glow */
        'hero-glow':
          'radial-gradient(ellipse 90% 60% at 50% -5%, rgba(74,127,212,0.13) 0%, transparent 68%)',

        /* Warm hero glow variant */
        'hero-glow-warm':
          'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(196,98,45,0.09) 0%, rgba(74,127,212,0.07) 50%, transparent 70%)',
      },

      /* ── Shadow / Glow System ───────────────────────────── */
      boxShadow: {
        /* ── Neutral card shadows — layered for realism ── */
        'card':         '0 1px 3px rgba(13,13,18,0.05), 0 4px 16px rgba(13,13,18,0.05)',
        'card-hover':   '0 2px 8px rgba(13,13,18,0.06), 0 12px 40px rgba(13,13,18,0.09)',
        'lift':         '0 2px 8px rgba(13,13,18,0.08), 0 4px 16px rgba(13,13,18,0.06)',
        'lift-hover':   '0 4px 16px rgba(13,13,18,0.10), 0 16px 48px rgba(13,13,18,0.10)',
        'xs':           '0 1px 2px rgba(13,13,18,0.06)',

        /* ── Brand glow — soft, premium, light-bg tuned ── */
        /*    Blue — primary brand accent                   */
        'glow-sm':      '0 0 16px rgba(74,127,212,0.14), 0 0 4px  rgba(74,127,212,0.08)',
        'glow-md':      '0 0 28px rgba(74,127,212,0.20), 0 0 8px  rgba(74,127,212,0.12)',
        'glow-lg':      '0 0 48px rgba(74,127,212,0.26), 0 0 16px rgba(74,127,212,0.14)',

        /*    Green — success, active states                */
        'glow-green-sm':'0 0 16px rgba(58,122,58,0.16),  0 0 4px  rgba(58,122,58,0.09)',
        'glow-green-md':'0 0 28px rgba(58,122,58,0.22),  0 0 8px  rgba(58,122,58,0.12)',

        /*    Warm (orange/red) — CTA, highlight            */
        'glow-warm-sm': '0 0 16px rgba(196,98,45,0.15),  0 0 4px  rgba(196,98,45,0.09)',
        'glow-warm-md': '0 0 28px rgba(196,98,45,0.22),  0 0 8px  rgba(196,98,45,0.12)',

        /*    Purple — premium, featured                    */
        'glow-purple-sm':'0 0 16px rgba(107,74,155,0.15), 0 0 4px rgba(107,74,155,0.09)',
        'glow-purple-md':'0 0 28px rgba(107,74,155,0.22), 0 0 8px rgba(107,74,155,0.12)',

        /*    Multi-color — matches full logo gradient      */
        'glow-brand':
          '0 0 24px rgba(193,59,42,0.10), 0 0 40px rgba(74,127,212,0.12), 0 0 16px rgba(107,74,155,0.08)',
      },

      /* ── Border Radius ──────────────────────────────────── */
      borderRadius: {
        'sm':  '0.375rem',
        'md':  '0.625rem',
        'lg':  '0.875rem',
        'xl':  '1.125rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.5rem',
      },

      /* ── Spacing extras ─────────────────────────────────── */
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '26':  '6.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      /* ── Max widths ─────────────────────────────────────── */
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },

      /* ── Animations ─────────────────────────────────────── */
      animation: {
        'fade-up':     'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':     'fadeIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-down':   'fadeDown 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'spin-slow':   'spin 10s linear infinite',
        'pulse-soft':  'pulseSoft 3s ease-in-out infinite',
        'float':       'float 7s ease-in-out infinite',
        'shimmer':     'shimmer 2.4s linear infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(22px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
        },
        fadeDown: {
          from: { opacity: '0', transform: 'translateY(-16px)' },
          to:   { opacity: '1', transform: 'translateY(0)'     },
        },
        fadeIn: {
          from: { opacity: '0' },
          to:   { opacity: '1' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1'   },
          '50%':      { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)'  },
          '50%':      { transform: 'translateY(-9px)' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition:  '200% 0' },
        },
      },

      /* ── Transition timing ──────────────────────────────── */
      transitionTimingFunction: {
        'expo':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'snappy': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      transitionDuration: {
        '180': '180ms',
        '220': '220ms',
        '380': '380ms',
        '420': '420ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}
