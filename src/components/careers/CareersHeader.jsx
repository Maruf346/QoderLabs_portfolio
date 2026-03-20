import { motion } from 'framer-motion'
import { staggerContainer, slideUp } from '@utils/animations'
import { cn } from '@utils/cn'

const VALUES = [
  { label: 'Remote-first',     icon: RemoteIcon  },
  { label: 'Async by default', icon: AsyncIcon   },
  { label: 'Results-driven',   icon: ResultsIcon },
  { label: 'High trust',       icon: TrustIcon   },
]

export default function CareersHeader({ openCount = 0 }) {
  return (
    <section className="relative pt-36 pb-14 md:pt-44 md:pb-16 bg-surface-50 overflow-hidden">

      {/* Gradient glow — top left green, top right red */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[480px] h-[360px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 0% 0%, rgba(58,107,42,0.09) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[360px] h-[280px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 100% 0%, rgba(174,56,32,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0D0D12 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Bottom rule — gradient line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #6B6218 20%, #9E481A 50%, #6B6218 80%, transparent)',
          opacity: 0.25,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow — gradient dot */}
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: 'var(--gradient-logo)' }}
            />
            We're hiring
          </motion.p>

          {/* Headline — "QoderLabs" is gradient */}
          <motion.h1
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-[clamp(2.4rem,6vw,4rem)]',
              'leading-[1.06] tracking-[-0.036em]',
              'mb-5 max-w-2xl',
            )}
          >
            Careers at{' '}
            <span className="text-gradient-logo">QoderLabs</span>
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

          {/* Open roles count */}
          <motion.div variants={slideUp} className="flex items-center gap-4 mb-10">
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white shadow-card"
              style={{
                boxShadow:
                  '0 1px 3px rgba(13,13,18,0.05), 0 4px 16px rgba(13,13,18,0.05), inset 0 0 0 1px rgba(142,86,42,0.18)',
              }}
            >
              {/* Live pulse dot — gradient fill */}
              <span className="relative flex w-2 h-2 shrink-0">
                <span
                  className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-50"
                  style={{ background: 'var(--gradient-logo)' }}
                />
                <span
                  className="relative inline-flex rounded-full h-2 w-2"
                  style={{ background: 'var(--gradient-logo)' }}
                />
              </span>
              <span className="text-sm font-medium font-body text-ink">
                {openCount} open position{openCount !== 1 ? 's' : ''}
              </span>
            </div>
          </motion.div>

          {/* Culture value chips */}
          <motion.div variants={slideUp} className="flex flex-wrap gap-2">
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

/* ── Value icons ─────────────────────────────────────────────── */
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
