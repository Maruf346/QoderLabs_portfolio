import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   CTA Banner — Final conversion section
   — Full-width, premium gradient background
   — Centered headline + subtext + dual CTA buttons
   — Floating orb blobs for depth
   — Subtle dot-grid overlay
   — Fade + scale entrance animation
═══════════════════════════════════════════════════════════════ */

const containerVariants = {
  hidden:  {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

export default function CTA() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* ── Gradient background ──────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(135deg, #0F0F14 0%, #1a1a2e 40%, #16213e 70%, #0f1923 100%)',
        }}
        aria-hidden="true"
      />

      {/* ── Coloured orb blobs ───────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

        {/* Top-left warm orb */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.7, 0.5] }}
          transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(196,98,45,0.22) 0%, transparent 65%)',
            filter: 'blur(48px)',
          }}
        />

        {/* Center-top cool orb */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.4, 0.65, 0.4] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full"
          style={{
            background: 'radial-gradient(ellipse, rgba(74,127,212,0.25) 0%, transparent 65%)',
            filter: 'blur(56px)',
          }}
        />

        {/* Bottom-right purple orb */}
        <motion.div
          animate={{ scale: [1, 1.10, 1], opacity: [0.4, 0.60, 0.4] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute -bottom-32 -right-32 w-[480px] h-[480px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(107,74,155,0.22) 0%, transparent 65%)',
            filter: 'blur(48px)',
          }}
        />

        {/* Bottom-left green accent */}
        <motion.div
          animate={{ scale: [1, 1.05, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(58,122,58,0.18) 0%, transparent 65%)',
            filter: 'blur(40px)',
          }}
        />
      </div>

      {/* ── Dot-grid overlay ─────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* ── Top edge gradient border ─────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'var(--gradient-logo)', opacity: 0.4 }}
      />

      {/* ── Content ──────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.default}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >

          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-1.5 rounded-full',
              'text-xs font-mono font-medium tracking-widest uppercase',
              'bg-white/10 border border-white/15',
              'text-white/70',
            )}>
              <span
                className="w-1.5 h-1.5 rounded-full animate-pulse-soft"
                style={{ background: 'var(--gradient-logo)' }}
              />
              Let's build together
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h2
            variants={itemVariants}
            className={cn(
              'font-display font-bold text-white',
              'text-4xl sm:text-5xl md:text-6xl lg:text-[3.5rem]',
              'leading-[1.04] tracking-[-0.038em]',
              'mb-5',
            )}
          >
            Have an idea?{' '}
            <br className="hidden sm:block" />
            <span
              style={{
                background: 'var(--gradient-logo)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Let's build it.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-white/60 text-base sm:text-lg leading-relaxed max-w-md mb-10 font-body"
          >
            Whether it's a product, a platform, or a proof of concept — we'll take
            it from napkin sketch to polished, production-ready reality.
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 mb-12"
          >
            {/* Primary */}
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-7 py-3.5 rounded-xl',
                  'font-body font-semibold text-sm text-white',
                  'cursor-pointer select-none',
                  'shadow-glow-sm hover:shadow-glow-md',
                  'transition-shadow duration-300',
                )}
                style={{
                  background: 'var(--gradient-logo)',
                  display: 'inline-flex',
                }}
              >
                Get in Touch
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 6.5h9M7.5 2.5l4 4-4 4"
                    stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </motion.span>
            </Link>

            {/* Secondary */}
            <Link to="/portfolio">
              <motion.span
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-7 py-3.5 rounded-xl',
                  'font-body font-medium text-sm text-white/80',
                  'bg-white/8 border border-white/15',
                  'hover:text-white',
                  'transition-colors duration-200',
                  'cursor-pointer select-none',
                )}
                style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.08)' }}
              >
                See Our Work
              </motion.span>
            </Link>
          </motion.div>

          {/* Bottom trust line */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-2 sm:gap-5"
          >
            {[
              '✓ Free initial consultation',
              '✓ No contracts, no lock-in',
              '✓ Response within 24 hrs',
            ].map((item) => (
              <span
                key={item}
                className="text-xs font-mono text-white/40 tracking-wide"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom edge gradient border ───────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'var(--gradient-logo)', opacity: 0.25 }}
      />
    </section>
  )
}
