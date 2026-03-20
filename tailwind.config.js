/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],

  theme: {
    extend: {

      /* ── Typography ──────────────────────────────────────── */
      fontFamily: {
        display: ['"Syne"',    'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },

      /* ── Brand color palette ─────────────────────────────── */
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

      /* ── Gradient system ─────────────────────────────────── */
      backgroundImage: {

        /*
         * GLOSSY LOGO GRADIENT — exact 9-stop match to the logo
         *
         * The logo's gloss comes from 3 layers visually:
         *   1. Warm highlight (orange/gold) at top — specular catch light
         *   2. Saturated mid hues — the main colour identity
         *   3. Deep shadow (near-black purple/navy) at overlap zones
         *
         * This single gradient replicates all three zones:
         *   0–16%   → warm highlight arm (red→orange→gold shine)
         *   24–54%  → colour transition (olive→green→teal)
         *   68–100% → cool shadow arm (blue→deep purple→dark overlap)
         */
        /* brand-logo now matches name.png earth-tone palette */
        'brand-logo':
          'linear-gradient(90deg, #3A6B2A 0%, #4A7A2A 12%, #6B6218 28%, #8B5518 44%, #9E481A 58%, #AE3820 72%, #98261E 86%, #8A1E16 100%)',

        /*
         * NAME GRADIENT — pixel-sampled from name.png
         *
         * Sampled per letter:
         *   Q  → #3A6B2A  deep forest green
         *   O  → #4A7A2A  olive green
         *   D  → #6B6218  dark olive-khaki
         *   E  → #8B5518  warm brown-olive
         *   R  → #9E481A  burnt orange-brown
         *   L  → #AE3820  brick red
         *   A  → #A62E24  deeper red
         *   B  → #98261E  crimson
         *   S  → #8A1E16  dark crimson
         *
         * Pure left-to-right. Earth tones only.
         * No blue, no purple, no yellow, no grey.
         */
        'brand-name':
          'linear-gradient(90deg, #3A6B2A 0%, #4A7A2A 12%, #6B6218 28%, #8B5518 44%, #9E481A 58%, #AE3820 72%, #98261E 86%, #8A1E16 100%)',

        /*
         * GLOSSY SHINE OVERLAY
         * Layer this ON TOP of brand-logo at low opacity (0.15–0.22)
         * to simulate the specular highlight in the logo.
         *
         * Usage (inline or CSS):
         *   <div className="relative">
         *     <div className="bg-brand-logo ..." />
         *     <div className="absolute inset-0 bg-brand-gloss opacity-20 mix-blend-screen rounded-[inherit]" />
         *   </div>
         */
        'brand-gloss':
          'linear-gradient(145deg, rgba(255,255,255,0.65) 0%, rgba(255,235,190,0.35) 18%, rgba(255,255,255,0.10) 38%, rgba(0,0,0,0) 55%, rgba(0,0,10,0.10) 80%, rgba(0,0,20,0.28) 100%)',

        /*
         * GLOSSY DEPTH SHADOW
         * Apply at opacity 0.4–0.6 using mix-blend-multiply
         * to deepen the overlap zones (the dark purple area
         * where the two arms of the Q cross each other).
         */
        'brand-depth':
          'linear-gradient(160deg, transparent 0%, rgba(20,5,40,0.0) 30%, rgba(15,3,30,0.50) 65%, rgba(8,2,18,0.70) 85%, rgba(25,8,55,0.55) 100%)',

        /* Very soft ambient wash — section backgrounds */
        'brand-soft':
          'linear-gradient(135deg, rgba(193,59,42,0.05) 0%, rgba(184,131,42,0.04) 35%, rgba(58,122,58,0.045) 55%, rgba(74,127,212,0.055) 80%, rgba(107,74,155,0.045) 100%)',

        /* Hero top glow */
        'hero-glow':
          'radial-gradient(ellipse 80% 55% at 50% -5%, rgba(74,127,212,0.13) 0%, transparent 70%)',

        /* CTA dark section */
        'cta-dark':
          'linear-gradient(160deg, #0D0D12 0%, #14141f 55%, #0d1117 100%)',
      },

      /* ── Shadow / Glow system ────────────────────────────── */
      boxShadow: {

        /* Card depth */
        'card':       '0 1px 3px rgba(13,13,18,0.05), 0 4px 16px rgba(13,13,18,0.05)',
        'card-hover': '0 2px 8px rgba(13,13,18,0.06), 0 12px 40px rgba(13,13,18,0.09)',

        /* Button lift */
        'lift':       '0 2px 8px rgba(13,13,18,0.10), 0 4px 16px rgba(13,13,18,0.07)',
        'lift-hover': '0 4px 16px rgba(13,13,18,0.13), 0 12px 40px rgba(13,13,18,0.10)',

        /*
         * GLOSSY GLOW SHADOWS
         * Two-layer structure per glow:
         *   Layer 1 — tight inner ring (saturated colour)
         *   Layer 2 — wide outer diffuse (luminance bleed)
         * This matches the soft halo visible around the logo.
         */

        /* Blue */
        'glow-sm':  '0 0 8px  rgba(74,127,212,0.22), 0 0 28px rgba(74,127,212,0.10)',
        'glow-md':  '0 0 16px rgba(74,127,212,0.28), 0 0 52px rgba(74,127,212,0.12)',
        'glow-lg':  '0 0 28px rgba(74,127,212,0.34), 0 0 84px rgba(74,127,212,0.14)',

        /* Warm red/orange */
        'glow-warm-sm': '0 0 8px  rgba(193,59,42,0.24), 0 0 28px rgba(196,98,45,0.10)',
        'glow-warm-md': '0 0 16px rgba(193,59,42,0.30), 0 0 52px rgba(196,98,45,0.12)',
        'glow-warm-lg': '0 0 28px rgba(193,59,42,0.36), 0 0 84px rgba(196,98,45,0.14)',

        /* Green */
        'glow-green-sm': '0 0 8px  rgba(58,122,58,0.22), 0 0 28px rgba(58,122,58,0.10)',
        'glow-green-md': '0 0 16px rgba(58,122,58,0.28), 0 0 52px rgba(58,122,58,0.11)',

        /* Purple */
        'glow-purple-sm': '0 0 8px  rgba(107,74,155,0.22), 0 0 28px rgba(107,74,155,0.10)',
        'glow-purple-md': '0 0 16px rgba(107,74,155,0.28), 0 0 52px rgba(107,74,155,0.11)',

        /*
         * BRAND MULTI-COLOUR GLOW
         * Matches the full logo halo: warm inner + cool outer.
         * Use on hero elements, featured cards, or logo itself.
         */
        'glow-brand-sm':
          '0 0 10px rgba(196,98,45,0.20), 0 0 32px rgba(74,127,212,0.13), 0 0 64px rgba(107,74,155,0.08)',
        'glow-brand-md':
          '0 0 18px rgba(196,98,45,0.24), 0 0 54px rgba(74,127,212,0.17), 0 0 96px rgba(107,74,155,0.10)',
        'glow-brand-lg':
          '0 0 28px rgba(196,98,45,0.28), 0 0 76px rgba(74,127,212,0.21), 0 0 128px rgba(107,74,155,0.12)',

        /*
         * GLOSS INNER HIGHLIGHT
         * Simulates the bright specular edge on a glossy surface.
         * Apply as inset shadow on gradient elements.
         * Usage: shadow-gloss-top or shadow-gloss-side
         */
        'gloss-top':
          'inset 0 1.5px 0 rgba(255,255,255,0.35), inset 0 0 12px rgba(255,230,180,0.12)',
        'gloss-side':
          'inset 1.5px 0 0 rgba(255,255,255,0.20), inset -1px 0 0 rgba(0,0,0,0.15)',
      },

      /* ── Border radius ───────────────────────────────────── */
      borderRadius: {
        'sm':  '0.375rem',
        'md':  '0.625rem',
        'lg':  '0.875rem',
        'xl':  '1.125rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.75rem',
      },

      /* ── Spacing extras ──────────────────────────────────── */
      spacing: {
        '18':  '4.5rem',
        '22':  '5.5rem',
        '30':  '7.5rem',
        '34':  '8.5rem',
        '128': '32rem',
        '144': '36rem',
      },

      /* ── Animations ──────────────────────────────────────── */
      animation: {
        'fade-up':    'fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) forwards',
        'fade-in':    'fadeIn 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
        'spin-slow':  'spin 10s linear infinite',
        'pulse-soft': 'pulseSoft 3s ease-in-out infinite',
        'float':      'float 6s ease-in-out infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        /* Gloss sweep — animate a highlight across a surface */
        'shimmer':    'shimmer 2.6s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(20px)' },
          to:   { opacity: '1', transform: 'translateY(0)'    },
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
          '0%':   { transform: 'translateX(-120%) skewX(-15deg)', opacity: '0'  },
          '25%':  { opacity: '1'  },
          '75%':  { opacity: '0.7'},
          '100%': { transform: 'translateX(220%)  skewX(-15deg)', opacity: '0'  },
        },
      },

      /* ── Easing ──────────────────────────────────────────── */
      transitionTimingFunction: {
        'expo':   'cubic-bezier(0.16, 1, 0.3, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
        'smooth': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'snappy': 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
      },

      /* ── Max widths ──────────────────────────────────────── */
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
    },
  },

  plugins: [],
}
