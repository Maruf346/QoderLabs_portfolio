import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { viewport, ease, transition } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   CTA Banner — Final premium polish
   — Dark premium bg with refined orb system
   — Coordinated stagger entrance
   — Primary button: gradient fill with soft multi-color glow
   — Trust bullets: staggered fade-in
   — Top/bottom accent lines use logo gradient at low opacity
═══════════════════════════════════════════════════════════════ */

const containerVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const itemVariants = {
  hidden:  { opacity: 0, y: 18, filter: 'blur(3px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.65, ease: ease.expo },
  },
}

const TRUST_ITEMS = [
  '✓ Free initial consultation',
  '✓ No contracts, no lock-in',
  '✓ Reply within 24 hrs',
]

export default function CTA() {
  return (
    <section className="relative py-28 md:py-36 overflow-hidden" aria-label="Call to action">

      {/* ── Solid dark base ─────────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: 'linear-gradient(160deg, #0D0D12 0%, #141420 50%, #0f1420 100%)' }}
        aria-hidden="true"
      />

      {/* ── Ambient orbs ────────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">

        {/* Top-left warm */}
        <motion.div
          animate={{ scale: [1, 1.08, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-40 -left-32 w-[540px] h-[540px]"
          style={{
            background: 'radial-gradient(circle, rgba(196,98,45,0.22) 0%, transparent 62%)',
            filter:     'blur(52px)',
          }}
        />

        {/* Center-top blue */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.45, 0.65, 0.45] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          className="absolute -top-24 left-1/2 -translate-x-1/2 w-[640px] h-[420px]"
          style={{
            background: 'radial-gradient(ellipse, rgba(74,127,212,0.26) 0%, transparent 62%)',
            filter:     'blur(60px)',
          }}
        />

        {/* Bottom-right purple */}
        <motion.div
          animate={{ scale: [1, 1.10, 1], opacity: [0.45, 0.62, 0.45] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
          className="absolute -bottom-36 -right-28 w-[500px] h-[500px]"
          style={{
            background: 'radial-gradient(circle, rgba(107,74,155,0.22) 0%, transparent 62%)',
            filter:     'blur(52px)',
          }}
        />

        {/* Bottom-left green */}
        <motion.div
          animate={{ scale: [1, 1.06, 1], opacity: [0.35, 0.52, 0.35] }}
          transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          className="absolute bottom-0 left-1/4 w-[320px] h-[320px]"
          style={{
            background: 'radial-gradient(circle, rgba(58,122,58,0.18) 0%, transparent 62%)',
            filter:     'blur(44px)',
          }}
        />
      </div>

      {/* ── Dot grid ────────────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.032]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* ── Top edge gradient line ───────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'var(--gradient-logo)', opacity: 0.35 }}
      />

      {/* ── Content ──────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.default}
          className="flex flex-col items-center text-center max-w-[46rem] mx-auto"
        >

          {/* Eyebrow */}
          <motion.div variants={itemVariants} className="mb-6">
            <span className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-1.5 rounded-full',
              'text-xs font-mono font-medium tracking-widest uppercase',
              'bg-white/8 border border-white/14',
              'text-white/60',
            )}
              style={{ backgroundColor: 'rgba(255,255,255,0.08)' }}
            >
              <motion.span
                animate={{ opacity: [0.4, 1, 0.4] }}
                transition={{ duration: 2.2, repeat: Infinity }}
                className="w-1.5 h-1.5 rounded-full"
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
              'text-[clamp(2.4rem,6vw,4rem)]',
              'leading-[1.05] tracking-[-0.040em]',
              'mb-5',
            )}
          >
            Have an idea?{' '}
            <br className="hidden sm:block" />
            <span className="text-gradient-logo">
              Let's build it.
            </span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            variants={itemVariants}
            className="text-white/55 text-base sm:text-lg leading-[1.72] max-w-[36rem] mb-10 font-body"
          >
            Whether it's a product, a platform, or a proof of concept — we'll take
            it from napkin sketch to polished, production-ready reality.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 mb-10"
          >
            {/* Primary — gradient fill + multi-color glow */}
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={transition.spring}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-8 py-4 rounded-xl',
                  'font-body font-semibold text-sm text-white',
                  'cursor-pointer select-none',
                  'transition-shadow duration-[260ms]',
                )}
                style={{
                  display:    'inline-flex',
                  background: 'var(--gradient-logo)',
                  boxShadow:  '0 0 20px rgba(193,59,42,0.20), 0 0 36px rgba(74,127,212,0.16), 0 4px 16px rgba(13,13,18,0.24)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 0 28px rgba(193,59,42,0.28), 0 0 52px rgba(74,127,212,0.22), 0 8px 32px rgba(13,13,18,0.32)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow =
                    '0 0 20px rgba(193,59,42,0.20), 0 0 36px rgba(74,127,212,0.16), 0 4px 16px rgba(13,13,18,0.24)'
                }}
              >
                Get in Touch
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >→</motion.span>
              </motion.span>
            </Link>

            {/* Secondary */}
            <Link to="/portfolio">
              <motion.span
                whileHover={{ scale: 1.02, backgroundColor: 'rgba(255,255,255,0.12)' }}
                whileTap={{ scale: 0.97 }}
                transition={transition.spring}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-8 py-4 rounded-xl',
                  'font-body font-medium text-sm text-white/65',
                  'border border-white/14',
                  'hover:text-white',
                  'transition-colors duration-[200ms] cursor-pointer select-none',
                )}
                style={{ display: 'inline-flex', backgroundColor: 'rgba(255,255,255,0.07)' }}
              >
                See Our Work
              </motion.span>
            </Link>
          </motion.div>

          {/* Trust bullets */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-3 sm:gap-7"
          >
            {TRUST_ITEMS.map((item, i) => (
              <motion.span
                key={item}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={viewport.default}
                transition={{ delay: 0.6 + i * 0.10, duration: 0.45 }}
                className="text-xs font-mono text-white/35 tracking-wide"
              >
                {item}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* ── Bottom edge line ─────────────────────────── */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'var(--gradient-logo)', opacity: 0.20 }}
      />
    </section>
  )
}
