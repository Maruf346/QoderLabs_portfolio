import { motion } from 'framer-motion'
import { staggerContainer, slideUp } from '@utils/animations'
import { CATEGORIES } from '@data/projects'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Portfolio Header
   — Page hero: title + description
   — Filterable category tab strip
   — Active tab: solid brand-ink fill
   — No gradients in tab strip; subtle gradient accent in headline
═══════════════════════════════════════════════════════════════ */

export default function PortfolioHeader({ activeCategory, onCategoryChange }) {
  return (
    <section className="relative pt-36 pb-0 md:pt-44 bg-surface-50 overflow-hidden">

      {/* Background dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0F0F14 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Subtle top glow — kept very faint */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(74,127,212,0.09) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* ── Headline block ───────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          {/* Eyebrow */}
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-5"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
            Our Work
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-[clamp(2.6rem,6vw,4.5rem)]',
              'leading-[1.04] tracking-[-0.038em]',
              'mb-5',
            )}
          >
            Products we're{' '}
            <span
              style={{
                background: 'var(--gradient-logo)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              proud of.
            </span>
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-xl"
          >
            A selection of the digital products, platforms, and systems
            we've designed and engineered for clients across industries.
          </motion.p>
        </motion.div>

        {/* ── Category filter tabs ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.35, ease: [0.4, 0, 0.2, 1] }}
          className="flex items-center gap-1.5 flex-wrap pb-0"
          role="tablist"
          aria-label="Filter projects by category"
        >
          {CATEGORIES.map(({ value, label }) => {
            const isActive = activeCategory === value
            return (
              <button
                key={value}
                role="tab"
                aria-selected={isActive}
                onClick={() => onCategoryChange(value)}
                className={cn(
                  'relative px-4 py-2 rounded-xl',
                  'text-sm font-medium font-body',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
                  isActive
                    ? 'bg-ink text-white shadow-lift'
                    : 'bg-white border border-surface-200 text-ink-muted hover:text-ink hover:border-surface-300 shadow-card',
                )}
              >
                {label}

                {/* Active underline tab indicator */}
                {isActive && (
                  <motion.span
                    layoutId="portfolio-tab-indicator"
                    className="absolute inset-0 rounded-xl bg-ink"
                    style={{ zIndex: -1 }}
                    transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                  />
                )}
              </button>
            )
          })}
        </motion.div>

        {/* Divider below tabs */}
        <div className="mt-8 h-px bg-surface-200" />
      </div>
    </section>
  )
}
