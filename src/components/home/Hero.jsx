import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion'
import { staggerSlow, slideUp, fadeIn, transition, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Hero Section
   — Full-viewport opening section
   — Centered layout: headline → sub → CTAs → trust bar
   — Subtle radial glow + floating orbs in background
   — Mouse-tracking parallax on orbs (desktop only)
   — Staggered text entrance on mount
═══════════════════════════════════════════════════════════════ */

/* Stagger container — fires immediately on mount */
const heroContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.13,
      delayChildren:   0.15,
    },
  },
}

const heroItem = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
  },
}

const SERVICES = ['Web Development', 'AI Automation', 'Mobile Apps', 'CMS Solutions']

export default function Hero() {
  const containerRef = useRef(null)

  // Mouse-parallax for background orbs
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)

  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const orb1X = useTransform(smoothX, [-1, 1], [-18, 18])
  const orb1Y = useTransform(smoothY, [-1, 1], [-14, 14])
  const orb2X = useTransform(smoothX, [-1, 1], [14, -14])
  const orb2Y = useTransform(smoothY, [-1, 1], [10, -10])
  const orb3X = useTransform(smoothX, [-1, 1], [-8, 8])
  const orb3Y = useTransform(smoothY, [-1, 1], [-18, 18])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left) / rect.width  - 0.5) * 2)
    mouseY.set(((e.clientY - rect.top)  / rect.height - 0.5) * 2)
  }
  const handleMouseLeave = () => {
    mouseX.set(0)
    mouseY.set(0)
  }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-surface-50"
    >
      {/* ── Background layer ─────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* Main radial glow — top center */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[600px]"
          style={{
            background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(74,127,212,0.11) 0%, rgba(58,122,58,0.07) 45%, transparent 70%)',
          }}
        />

        {/* Orb 1 — top-left warm */}
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          className="absolute -top-20 -left-20 w-[480px] h-[480px] rounded-full"
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(196,98,45,0.10) 0%, rgba(184,131,42,0.06) 50%, transparent 70%)',
              filter: 'blur(48px)',
            }}
          />
        </motion.div>

        {/* Orb 2 — bottom-right cool */}
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          className="absolute -bottom-32 -right-24 w-[520px] h-[520px] rounded-full"
          animate={{ scale: [1, 1.08, 1] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(107,74,155,0.10) 0%, rgba(74,127,212,0.07) 50%, transparent 70%)',
              filter: 'blur(56px)',
            }}
          />
        </motion.div>

        {/* Orb 3 — center-right green accent */}
        <motion.div
          style={{ x: orb3X, y: orb3Y }}
          className="absolute top-1/3 right-0 w-[360px] h-[360px] rounded-full"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          aria-hidden="true"
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(42,107,90,0.09) 0%, rgba(58,122,58,0.05) 50%, transparent 70%)',
              filter: 'blur(44px)',
            }}
          />
        </motion.div>

        {/* Fine dot grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0F0F14 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
      </div>

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-4xl mx-auto"
        >

          {/* Eyebrow pill */}
          <motion.div variants={heroItem} className="mb-7">
            <span className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-1.5 rounded-full',
              'text-xs font-mono font-medium tracking-widest uppercase',
              'bg-white/80 border border-surface-300',
              'text-ink-muted shadow-card',
            )}>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-soft"
                style={{ background: 'var(--gradient-logo)' }}
              />
              Premium Software Agency
            </span>
          </motion.div>

          {/* Main headline */}
          <motion.h1
            variants={heroItem}
            className={cn(
              'font-display font-bold',
              'text-[clamp(2.6rem,7vw,5.5rem)]',
              'leading-[1.02] tracking-[-0.04em]',
              'text-ink mb-6',
            )}
          >
            From{' '}
            <span
              style={{
                background: 'var(--gradient-logo)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Concept
            </span>
            <br />
            to{' '}
            <span
              style={{
                background: 'var(--gradient-name)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Creation.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={heroItem}
            className={cn(
              'font-body text-base sm:text-lg md:text-xl',
              'text-ink-muted leading-relaxed',
              'max-w-xl mb-10',
            )}
          >
            We design and build exceptional digital products — web apps, AI tools,
            and mobile experiences — for companies that refuse to settle for average.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row items-center gap-3 mb-14"
          >
            {/* Primary CTA */}
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={transition.springSnappy}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-7 py-3.5 rounded-xl',
                  'font-body font-medium text-sm text-white',
                  'bg-ink',
                  'shadow-lift hover:shadow-lift-hover',
                  'transition-shadow duration-200',
                  'cursor-pointer select-none',
                )}
                style={{ display: 'inline-flex' }}
              >
                Get Started
                <ArrowRightIcon />
              </motion.span>
            </Link>

            {/* Secondary CTA */}
            <Link to="/portfolio">
              <motion.span
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={transition.springSnappy}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-7 py-3.5 rounded-xl',
                  'font-body font-medium text-sm text-ink',
                  'bg-white border border-surface-300',
                  'hover:border-ink/20 hover:bg-surface-50',
                  'shadow-card hover:shadow-card-hover',
                  'transition-all duration-200',
                  'cursor-pointer select-none',
                )}
                style={{ display: 'inline-flex' }}
              >
                View Our Work
                <PlayIcon />
              </motion.span>
            </Link>
          </motion.div>

          {/* Trust bar — "We work with" */}
          <motion.div variants={heroItem} className="flex flex-col items-center gap-3">
            <p className="text-xs font-mono text-ink-light uppercase tracking-widest">
              Technologies we work with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SERVICES.map((s, i) => (
                <motion.span
                  key={s}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + i * 0.07, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                  className={cn(
                    'px-3 py-1 rounded-full',
                    'text-xs font-mono font-medium',
                    'bg-white border border-surface-200',
                    'text-ink-muted',
                    'shadow-card',
                  )}
                >
                  {s}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
        aria-hidden="true"
      >
        <p className="text-[10px] font-mono tracking-widest uppercase text-ink-light">Scroll</p>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 rounded-full overflow-hidden bg-surface-300"
        >
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-1/2 rounded-full"
            style={{ background: 'var(--gradient-logo)' }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

/* ── Icon helpers ────────────────────────────────────────────── */
function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 6.5h9M7.5 2.5l4 4-4 4"
        stroke="currentColor" strokeWidth="1.5"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

function PlayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <rect x="1" y="1" width="11" height="11" rx="3"
        stroke="currentColor" strokeWidth="1.3"
      />
      <path d="M5 4.5l4 2-4 2V4.5z"
        fill="currentColor"
      />
    </svg>
  )
}
