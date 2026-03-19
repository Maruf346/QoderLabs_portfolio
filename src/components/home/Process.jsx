import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Process Section
   — 4 numbered steps: Concept → Design → Development → Launch
   — Desktop: horizontal timeline with animated connecting line
   — Mobile: vertical stack with left-side line
   — Each step: number badge + icon + title + description
   — Line draws in left→right as section enters viewport
═══════════════════════════════════════════════════════════════ */

const STEPS = [
  {
    number:      '01',
    icon:        ConceptIcon,
    color:       '#4A7FD4',
    colorBg:     'rgba(74,127,212,0.10)',
    title:       'Concept',
    description: 'We deep-dive into your goals, audience, and constraints. Strategy sessions, competitor analysis, and clear scope definition.',
    deliverable: 'Project brief & roadmap',
  },
  {
    number:      '02',
    icon:        DesignIcon,
    color:       '#7A8B2E',
    colorBg:     'rgba(122,139,46,0.10)',
    title:       'Design',
    description: 'User flows, wireframes, and high-fidelity UI — crafted with your brand identity and built for conversion.',
    deliverable: 'Figma prototypes',
  },
  {
    number:      '03',
    icon:        DevIcon,
    color:       '#C4622D',
    colorBg:     'rgba(196,98,45,0.10)',
    title:       'Development',
    description: 'Agile sprints, weekly demos, and clean code. Full-stack implementation with CI/CD pipelines from day one.',
    deliverable: 'Tested, reviewed code',
  },
  {
    number:      '04',
    icon:        LaunchIcon,
    color:       '#6B4A9B',
    colorBg:     'rgba(107,74,155,0.10)',
    title:       'Launch',
    description: "Zero-downtime deployment, performance tuning, and post-launch monitoring. We stay on until you're confident.",
    deliverable: 'Live product + handoff',
  },
]

export default function Process() {
  const lineRef  = useRef(null)
  const isInView = useInView(lineRef, { once: true, margin: '-100px' })

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">

      {/* Subtle top gradient */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[280px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 0%, rgba(107,74,155,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* ── Section header ───────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.default}
          className="text-center mb-16 md:mb-20"
        >
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple opacity-70" />
            How We Work
          </motion.p>

          <motion.h2
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-3xl sm:text-4xl md:text-5xl',
              'leading-[1.08] tracking-[-0.032em]',
              'mb-4',
            )}
          >
            From idea to{' '}
            <span
              style={{
                background: 'var(--gradient-logo)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              live product
            </span>
          </motion.h2>

          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto"
          >
            A battle-tested process refined across 50+ projects. Predictable, transparent,
            and built to deliver on time.
          </motion.p>
        </motion.div>

        {/* ══ Desktop timeline (lg+) ═══════════════════════════ */}
        <div className="hidden lg:block" ref={lineRef}>
          {/* Connecting line track */}
          <div className="relative mb-0">
            <div className="absolute top-[52px] left-[calc(12.5%-2px)] right-[calc(12.5%-2px)] h-px bg-surface-200" />

            {/* Animated fill line */}
            <motion.div
              className="absolute top-[52px] left-[calc(12.5%-2px)] h-px origin-left"
              style={{
                right: 'calc(12.5% - 2px)',
                background: 'var(--gradient-logo)',
              }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: isInView ? 1 : 0 }}
              transition={{ duration: 1.4, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
            />
          </div>

          {/* Step cards */}
          <div className="grid grid-cols-4 gap-6">
            {STEPS.map((step, i) => (
              <DesktopStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>

        {/* ══ Mobile / tablet timeline (<lg) ══════════════════ */}
        <div className="lg:hidden relative">
          {/* Vertical line track */}
          <div
            className="absolute left-[22px] top-6 bottom-6 w-px bg-surface-200"
            aria-hidden="true"
          />

          {/* Animated fill */}
          <motion.div
            className="absolute left-[22px] top-6 w-px origin-top"
            style={{ background: 'var(--gradient-logo)' }}
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.4, 0, 0.2, 1] }}
          />

          <div className="flex flex-col gap-8">
            {STEPS.map((step, i) => (
              <MobileStep key={step.number} step={step} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Desktop Step ───────────────────────────────────────────── */
function DesktopStep({ step, index }) {
  const { number, icon: Icon, color, colorBg, title, description, deliverable } = step

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.default}
      transition={{ duration: 0.55, delay: index * 0.13, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center text-center group"
    >
      {/* Number + icon node */}
      <motion.div
        whileHover={{ scale: 1.06 }}
        transition={{ duration: 0.22 }}
        className={cn(
          'relative w-[52px] h-[52px] rounded-full',
          'flex items-center justify-center',
          'bg-white border-2 border-surface-200',
          'shadow-card mb-6',
          'group-hover:border-current transition-colors duration-300',
          'z-10',
        )}
        style={{ borderColor: `${color}30` }}
      >
        {/* Glow ring on hover */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0, scale: 0.85 }}
          whileHover={{ opacity: 1, scale: 1.18 }}
          transition={{ duration: 0.25 }}
          style={{ background: colorBg }}
        />
        <Icon color={color} />

        {/* Step number chip */}
        <div
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full flex items-center justify-center"
          style={{ background: color }}
        >
          <span className="text-[9px] font-mono font-bold text-white">{index + 1}</span>
        </div>
      </motion.div>

      {/* Content */}
      <div className="flex flex-col gap-2">
        <h3 className="font-display font-semibold text-lg text-ink tracking-[-0.02em]">
          {title}
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed">
          {description}
        </p>

        {/* Deliverable tag */}
        <div className="mt-2 flex justify-center">
          <span
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-mono font-medium"
            style={{
              background: colorBg,
              color,
              border: `1px solid ${color}28`,
            }}
          >
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
              <path d="M1.5 4l2 2 3-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {deliverable}
          </span>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Mobile Step ────────────────────────────────────────────── */
function MobileStep({ step, index }) {
  const { icon: Icon, color, colorBg, title, description, deliverable } = step

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={viewport.default}
      transition={{ duration: 0.45, delay: index * 0.10, ease: [0.4, 0, 0.2, 1] }}
      className="flex gap-5 items-start pl-1"
    >
      {/* Node on the line */}
      <div className="relative shrink-0 mt-0.5">
        <div
          className={cn(
            'w-[44px] h-[44px] rounded-full',
            'flex items-center justify-center',
            'bg-white border border-surface-200',
            'shadow-card z-10 relative',
          )}
          style={{ borderColor: `${color}28` }}
        >
          <Icon color={color} />
        </div>
        {/* Step number */}
        <div
          className="absolute -top-1 -right-1 w-4.5 h-4.5 rounded-full flex items-center justify-center w-[18px] h-[18px]"
          style={{ background: color }}
        >
          <span className="text-[8px] font-mono font-bold text-white">{index + 1}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-1.5 pb-2 flex-1">
        <h3 className="font-display font-semibold text-base text-ink tracking-[-0.018em]">
          {title}
        </h3>
        <p className="text-sm text-ink-muted leading-relaxed">
          {description}
        </p>
        <span
          className="inline-flex items-center gap-1.5 w-fit mt-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium"
          style={{ background: colorBg, color, border: `1px solid ${color}28` }}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
            <path d="M1.5 4l2 2 3-3.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {deliverable}
        </span>
      </div>
    </motion.div>
  )
}

/* ── Step Icons ──────────────────────────────────────────────── */
function ConceptIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="8" r="5" stroke={color} strokeWidth="1.4"/>
      <path d="M7.5 13.5h5M8.5 16h3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8 8l1.5 1.5L13 6" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DesignIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="3" y="3" width="14" height="14" rx="2" stroke={color} strokeWidth="1.4"/>
      <path d="M3 7h14" stroke={color} strokeWidth="1.3"/>
      <path d="M7 7v10" stroke={color} strokeWidth="1.3"/>
      <circle cx="5" cy="5" r="0.7" fill={color}/>
      <path d="M10 10.5h4M10 13h3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function DevIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="4" width="16" height="12" rx="2" stroke={color} strokeWidth="1.4"/>
      <path d="M7 9L5 11l2 2M13 9l2 2-2 2M10 8l-1 6" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function LaunchIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 17V3M10 3l-3.5 4M10 3l3.5 4" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M5 13c-1.5.5-2.5 1.2-2.5 2 0 1.1 3.36 2 7.5 2s7.5-.9 7.5-2c0-.8-1-1.5-2.5-2"
        stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}
