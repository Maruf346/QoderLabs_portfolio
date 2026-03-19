import { motion } from 'framer-motion'
import { pageTransition, staggerContainer, slideUp, viewport } from '@utils/animations'
import { getAllJobs } from '@data/jobs'
import CareersHeader from '@components/careers/CareersHeader'
import JobList       from '@components/careers/JobList'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Careers Page — solid colors only, no gradients

   Layout:
     1. CareersHeader  — headline, tagline, culture value chips
     2. Two-column body:
          Left  → Why work here (perks + culture)
          Right → Job listings with department filter
     3. Bottom CTA strip
═══════════════════════════════════════════════════════════════ */

const openJobs = getAllJobs()

const PERKS = [
  {
    color:   '#4A7FD4',
    colorBg: 'rgba(74,127,212,0.09)',
    title:   'Fully remote',
    body:    'Work from anywhere. We care about output, not where you open your laptop.',
  },
  {
    color:   '#3A7A3A',
    colorBg: 'rgba(58,122,58,0.09)',
    title:   'Competitive salary',
    body:    'Market-rate pay reviewed annually. We share salary bands in every job post.',
  },
  {
    color:   '#C4622D',
    colorBg: 'rgba(196,98,45,0.09)',
    title:   'Real ownership',
    body:    'You own your work end-to-end. No micro-management, no unnecessary process.',
  },
  {
    color:   '#6B4A9B',
    colorBg: 'rgba(107,74,155,0.09)',
    title:   'Learning budget',
    body:    '$1,500/year for courses, books, and conferences. We invest in your growth.',
  },
  {
    color:   '#2A6B5A',
    colorBg: 'rgba(42,107,90,0.09)',
    title:   '4-day week option',
    body:    'After 6 months, you can opt into a compressed 4-day schedule at full pay.',
  },
  {
    color:   '#B8832A',
    colorBg: 'rgba(184,131,42,0.09)',
    title:   'Async-first culture',
    body:    'Minimal meetings. We communicate clearly in writing and respect deep work.',
  },
]

export default function Careers() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 1 ── Page header */}
      <CareersHeader openCount={openJobs.length} />

      {/* 2 ── Main body */}
      <section className="py-16 md:py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.9fr] gap-14 lg:gap-20 items-start">

            {/* ── Left: Why work here ────────────────── */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.default}
              className="lg:sticky lg:top-28 flex flex-col gap-6"
            >
              <motion.div variants={slideUp}>
                <p className="text-xs font-mono font-medium uppercase tracking-[0.15em] text-ink-light mb-3">
                  Why QoderLabs
                </p>
                <h2 className="font-display font-bold text-2xl md:text-3xl text-ink tracking-[-0.024em] leading-snug mb-3">
                  A small team that does big work.
                </h2>
                <p className="text-sm text-ink-muted leading-relaxed">
                  We're not a big agency. We're a tight crew of engineers, designers,
                  and strategists who care deeply about the quality of what we ship.
                  Here's what makes working here different.
                </p>
              </motion.div>

              {/* Perks grid — 2 cols, solid colored icons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3">
                {PERKS.map((perk, i) => (
                  <PerkCard key={perk.title} perk={perk} index={i} />
                ))}
              </div>
            </motion.div>

            {/* ── Right: Job listings ────────────────── */}
            <div>
              <JobList />
            </div>
          </div>
        </div>
      </section>

      {/* 3 ── Bottom CTA strip — solid dark, no gradient */}
      <BottomCTA />
    </motion.div>
  )
}

/* ─── Perk Card ──────────────────────────────────────────────── */
function PerkCard({ perk, index }) {
  const { color, colorBg, title, body } = perk
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.default}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'flex flex-col gap-2 p-4',
        'bg-white rounded-xl',
        'border border-surface-200',
        'shadow-card',
      )}
    >
      {/* Solid dot accent — no gradient */}
      <div
        className="w-2 h-2 rounded-full"
        style={{ backgroundColor: color }}
      />
      <p className="font-body font-semibold text-sm text-ink">{title}</p>
      <p className="text-xs text-ink-muted leading-relaxed">{body}</p>
    </motion.div>
  )
}

/* ─── Bottom CTA strip — solid bg-ink ───────────────────────── */
function BottomCTA() {
  return (
    <section className="py-16 md:py-20 bg-ink border-t border-white/5">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport.default}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-6"
        >
          <div className="max-w-lg">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/40 mb-2">
              Questions?
            </p>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-white tracking-[-0.022em] leading-snug mb-2">
              Not sure if you're the right fit?
            </h2>
            <p className="text-sm text-white/55 leading-relaxed">
              Drop us a message. We're happy to talk through a role before you apply.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <a
              href="/contact"
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'px-6 py-3 rounded-xl',
                'text-sm font-medium font-body',
                // Solid white button — no gradient
                'bg-white text-ink',
                'hover:bg-surface-100',
                'transition-colors duration-150',
                'shadow-lift',
              )}
            >
              Get in touch
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2.5l3.5 3.5L6 9.5"
                  stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="#jobs"
              className={cn(
                'inline-flex items-center justify-center gap-2',
                'px-6 py-3 rounded-xl',
                'text-sm font-medium font-body',
                'bg-transparent text-white/60',
                'border border-white/15',
                'hover:text-white hover:border-white/30',
                'transition-colors duration-150',
              )}
            >
              Browse roles
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
