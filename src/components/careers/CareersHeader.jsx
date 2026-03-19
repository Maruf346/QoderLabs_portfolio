import { motion } from 'framer-motion'
import { staggerContainer, slideUp } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Careers Header
   — Minimal page hero, NO gradients
   — Solid surface-50 background
   — Strong typography, left-aligned
   — Culture values strip below headline
═══════════════════════════════════════════════════════════════ */

const VALUES = [
  { label: 'Remote-first',    icon: RemoteIcon },
  { label: 'Async by default',icon: AsyncIcon },
  { label: 'Results-driven',  icon: ResultsIcon },
  { label: 'High trust',      icon: TrustIcon },
]

export default function CareersHeader({ openCount = 0 }) {
  return (
    <section className="relative pt-36 pb-14 md:pt-44 md:pb-16 bg-surface-50 overflow-hidden">

      {/* Dot grid — solid ink dots, very faint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0F0F14 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Solid bottom border */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-surface-200" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow */}
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-5"
          >
            {/* Solid dot — no gradient */}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            We're hiring
          </motion.p>

          {/* Headline — solid ink, no gradient text */}
          <motion.h1
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-[clamp(2.4rem,6vw,4rem)]',
              'leading-[1.06] tracking-[-0.036em]',
              'mb-5 max-w-2xl',
            )}
          >
            Careers at QoderLabs
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base sm:text-lg leading-relaxed max-w-xl mb-10"
          >
            We're a small, high-output team that builds exceptional digital products.
            If you care deeply about craft, love shipping real software, and want to
            work with clients who are building something meaningful — you'll fit right in.
          </motion.p>

          {/* Open roles count — solid bg pill */}
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-10">
            <div className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-2 rounded-xl',
              'bg-white border border-surface-200',
              'shadow-card',
            )}>
              {/* Live dot — solid brand-green */}
              <span className="relative flex w-2 h-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-50" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-green" />
              </span>
              <span className="text-sm font-medium font-body text-ink">
                {openCount} open position{openCount !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>

          {/* Culture values strip — solid bg chips */}
          <motion.div
            variants={slideUp}
            className="flex flex-wrap gap-2"
          >
            {VALUES.map(({ label, icon: Icon }) => (
              <div
                key={label}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-3.5 py-2 rounded-xl',
                  'bg-white border border-surface-200',
                  'text-xs font-body font-medium text-ink-muted',
                  'shadow-card',
                )}
              >
                <Icon />
                {label}
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Value icons — minimal solid strokes ─────────────────────── */
function RemoteIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="#9898AE" strokeWidth="1.2"/>
      <path d="M1 6.5h11M6.5 1C5 3 4 4.6 4 6.5S5 10 6.5 12M6.5 1C8 3 9 4.6 9 6.5S8 10 6.5 12"
        stroke="#9898AE" strokeWidth="1.1" strokeLinecap="round"/>
    </svg>
  )
}

function AsyncIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="#9898AE" strokeWidth="1.2"/>
      <path d="M6.5 4v2.5l1.5 1.5" stroke="#9898AE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ResultsIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M1.5 10L4.5 6.5 7 8.5 11.5 3" stroke="#9898AE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TrustIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M6.5 1.5L2 3.5v3c0 2.761 2.015 5 4.5 5s4.5-2.239 4.5-5v-3L6.5 1.5z"
        stroke="#9898AE" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M4.5 6.5l1.5 1.5 2.5-2.5"
        stroke="#9898AE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
