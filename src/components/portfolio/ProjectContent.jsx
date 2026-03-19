import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   ProjectContent — Fully rewritten for reliability

   PREVIOUS BUG: Used staggerContainer variants + child variants
   (slideUp, slideInLeft etc.) via inherited variant propagation.
   When the page is loaded directly via URL (not SPA navigation),
   the Suspense boundary resolves AFTER the viewport check fires.
   Children are already "in view" when the component mounts.
   With once:true, Framer marks them as triggered and never
   re-fires — leaving all content stuck in opacity:0 = blank.

   FIX: Every motion element uses its own direct whileInView
   with once:false so it always fires on mount regardless of
   when the component resolves. After first animation completes
   Framer won't re-trigger on rescroll (natural behaviour).
   No inherited variants. No stagger containers. Zero blank risk.
═══════════════════════════════════════════════════════════════ */

/* Shared animation helper — direct props, no variant inheritance */
const inView = (delay = 0, x = 0, y = 20) => ({
  initial:    { opacity: 0, y, x },
  whileInView:{ opacity: 1, y: 0, x: 0 },
  viewport:   { once: true, margin: '0px' },   // margin:0 = fires as soon as element enters
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function ProjectContent({ project }) {
  if (!project) return null

  return (
    <div className="bg-white">
      <OverviewSection   project={project} />
      <ProblemSolution   project={project} />
      <FeaturesSection   project={project} />
      <ScreenshotSection project={project} />
      <OutcomesSection   project={project} />
      <ProjectCTA        accentColor={project.accentColor} />
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   1. Overview
═══════════════════════════════════════════════════════════════ */
function OverviewSection({ project }) {
  const { description, accentColor } = project

  return (
    <section className="py-16 md:py-20 border-b border-surface-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          <motion.div {...inView(0, -20, 0)} className="lg:sticky lg:top-28 self-start">
            <p className="text-xs font-mono font-medium uppercase tracking-[0.15em] mb-2" style={{ color: accentColor }}>
              01 — Overview
            </p>
            <h2 className="font-display font-bold text-2xl text-ink tracking-tight leading-snug">
              Project Summary
            </h2>
          </motion.div>

          <div className="flex flex-col gap-5">
            <motion.p {...inView(0.08)} className="text-base md:text-lg text-ink-muted leading-relaxed">
              {description}
            </motion.p>
            <motion.p {...inView(0.16)} className="text-base text-ink-muted leading-relaxed">
              The engagement started with a two-week discovery sprint to align on architecture
              decisions, user stories, and delivery milestones. We embedded closely with the
              client's product team throughout, running weekly demo sessions and maintaining
              a shared project board for full transparency.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   2. Problem / Solution
═══════════════════════════════════════════════════════════════ */
function ProblemSolution({ project }) {
  const { accentColor } = project

  const BLOCKS = [
    {
      label:   'The Challenge',
      icon:    ProblemIcon,
      color:   '#C13B2A',
      colorBg: 'rgba(193,59,42,0.08)',
      body:    'The client was managing critical data across disconnected systems — leading to version conflicts, delayed reporting, and no real-time visibility across business units.',
    },
    {
      label:   'Our Solution',
      icon:    SolutionIcon,
      color:   accentColor,
      colorBg: `${accentColor}12`,
      body:    'We architected a unified data layer, built role-based dashboards with drill-down reporting, and replaced manual processes with an automated alerting system — eliminating reconciliation entirely.',
    },
  ]

  return (
    <section className="py-16 md:py-20 border-b border-surface-100 bg-surface-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        <motion.p {...inView(0)} className="text-xs font-mono font-medium uppercase tracking-[0.15em] mb-8" style={{ color: accentColor }}>
          02–03 — Challenge & Solution
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {BLOCKS.map((block, i) => (
            <motion.div
              key={block.label}
              {...inView(i * 0.10)}
              className="flex flex-col gap-4 p-7 bg-white rounded-2xl border border-surface-200 shadow-card"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: block.colorBg, border: `1px solid ${block.color}22` }}
              >
                <block.icon color={block.color} />
              </div>
              <p className="text-xs font-mono font-medium uppercase tracking-[0.14em]" style={{ color: block.color }}>
                {block.label}
              </p>
              <p className="text-sm text-ink-muted leading-relaxed">{block.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   3. Features
═══════════════════════════════════════════════════════════════ */
function FeaturesSection({ project }) {
  const { features, accentColor } = project

  if (!features?.length) return null

  return (
    <section className="py-16 md:py-20 border-b border-surface-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          <motion.div {...inView(0, -20, 0)} className="lg:sticky lg:top-28 self-start">
            <p className="text-xs font-mono font-medium uppercase tracking-[0.15em] mb-2" style={{ color: accentColor }}>
              04 — Features
            </p>
            <h2 className="font-display font-bold text-2xl text-ink tracking-tight leading-snug">
              Key Deliverables
            </h2>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              Core functionality shipped across the engagement.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {features.map((feature, i) => (
              <motion.div
                key={i}
                {...inView(i * 0.06)}
                className="flex items-start gap-3 p-4 bg-surface-50 rounded-xl border border-surface-200"
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${accentColor}14`, border: `1px solid ${accentColor}28` }}
                >
                  <svg width="9" height="9" viewBox="0 0 9 9" fill="none" aria-hidden="true">
                    <path d="M1.5 4.5l2 2L7.5 2" stroke={accentColor} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <p className="text-sm text-ink-muted leading-relaxed">{feature}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   4. Screenshots
═══════════════════════════════════════════════════════════════ */
const SCREENSHOT_SLOTS = [
  { bg: '#F2F2F6', border: '#E8E8EE', label: 'Dashboard Overview',  wide: true  },
  { bg: '#EEF2FB', border: '#D8E4F5', label: 'Analytics View',      wide: false },
  { bg: '#F0F6F0', border: '#D4E8D4', label: 'Settings Panel',      wide: false },
  { bg: '#FBF4EE', border: '#F5DEC8', label: 'Mobile Responsive',   wide: false },
]

function ScreenshotSection({ project }) {
  const { accentColor } = project

  return (
    <section className="py-16 md:py-20 border-b border-surface-100 bg-surface-50">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        <motion.div {...inView(0)} className="mb-10">
          <p className="text-xs font-mono font-medium uppercase tracking-[0.15em] mb-2" style={{ color: accentColor }}>
            05 — Screens
          </p>
          <h2 className="font-display font-bold text-2xl text-ink tracking-tight">
            Product Screenshots
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {SCREENSHOT_SLOTS.map((slot, i) => (
            <motion.div
              key={i}
              {...inView(i * 0.08)}
              className={cn(
                'relative rounded-2xl overflow-hidden border shadow-card hover:shadow-card-hover transition-shadow duration-300',
                slot.wide && 'sm:col-span-2',
              )}
              style={{ borderColor: slot.border }}
            >
              {/* Solid placeholder bg */}
              <div className="w-full flex flex-col" style={{ background: slot.bg, height: slot.wide ? '240px' : '190px' }}>

                {/* Mock window chrome */}
                <div className="flex items-center gap-1.5 px-4 py-3 border-b" style={{ borderColor: slot.border, background: 'rgba(255,255,255,0.6)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-300" />
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-200" />
                  <div className="w-2.5 h-2.5 rounded-full bg-surface-200" />
                  <div className="ml-3 flex-1 h-4 rounded-md bg-surface-200/70" />
                </div>

                {/* Content skeleton */}
                <div className="flex-1 p-5 flex flex-col gap-3 justify-center">
                  <div className="h-3 rounded-full w-2/3"   style={{ background: `${accentColor}22` }} />
                  <div className="h-2.5 rounded-full w-full" style={{ background: 'rgba(13,13,18,0.07)' }} />
                  <div className="h-2.5 rounded-full w-4/5" style={{ background: 'rgba(13,13,18,0.05)' }} />
                  <div className="mt-2 flex gap-2">
                    <div className="h-7 w-20 rounded-lg" style={{ background: `${accentColor}18` }} />
                    <div className="h-7 w-16 rounded-lg" style={{ background: 'rgba(13,13,18,0.06)' }} />
                  </div>
                </div>
              </div>

              {/* Label */}
              <div className="absolute bottom-3 left-3">
                <span className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium bg-white/90 border border-surface-200 text-ink-muted">
                  {slot.label}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   5. Outcomes
═══════════════════════════════════════════════════════════════ */
function OutcomesSection({ project }) {
  const { outcomes, accentColor } = project
  if (!outcomes?.length) return null

  return (
    <section className="py-16 md:py-20 border-b border-surface-100">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20">

          <motion.div {...inView(0, -20, 0)} className="lg:sticky lg:top-28 self-start">
            <p className="text-xs font-mono font-medium uppercase tracking-[0.15em] mb-2" style={{ color: accentColor }}>
              06 — Results
            </p>
            <h2 className="font-display font-bold text-2xl text-ink tracking-tight leading-snug">
              Outcomes
            </h2>
            <p className="mt-3 text-sm text-ink-muted leading-relaxed">
              Measurable impact delivered after launch.
            </p>
          </motion.div>

          <div className="flex flex-col gap-3">
            {outcomes.map((outcome, i) => (
              <motion.div
                key={i}
                {...inView(i * 0.09)}
                className="flex items-start gap-4 p-5 bg-white rounded-xl border border-surface-200 shadow-card"
              >
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                  style={{ background: `${accentColor}12`, border: `1px solid ${accentColor}22` }}
                >
                  <span className="text-[11px] font-mono font-bold" style={{ color: accentColor }}>
                    {i + 1}
                  </span>
                </div>
                <p className="text-sm text-ink leading-relaxed font-body">{outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ═══════════════════════════════════════════════════════════════
   6. CTA
═══════════════════════════════════════════════════════════════ */
function ProjectCTA({ accentColor }) {
  return (
    <section className="py-20 md:py-28 bg-ink">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          {...inView(0)}
          className="flex flex-col md:flex-row md:items-center md:justify-between gap-8"
        >
          <div className="max-w-xl">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-white/40 mb-3">
              Start a Project
            </p>
            <h2 className={cn(
              'font-display font-bold text-white',
              'text-2xl sm:text-3xl md:text-4xl',
              'leading-[1.1] tracking-[-0.028em] mb-3',
            )}>
              Have a similar idea?{' '}
              <span style={{ color: accentColor }}>Let's build it.</span>
            </h2>
            <p className="text-sm text-white/55 leading-relaxed">
              We're ready to bring your next digital product to life — from concept through to launch.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium font-body text-white shadow-lift hover:opacity-90 transition-opacity"
              style={{ background: accentColor }}
            >
              Get in Touch →
            </Link>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-xl text-sm font-medium font-body text-white/60 border border-white/15 hover:text-white hover:border-white/30 transition-colors duration-200"
            >
              View More Work
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Icons ───────────────────────────────────────────────────── */
function ProblemIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="1.3"/>
      <path d="M9 5.5v4M9 11.5v1" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function SolutionIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="9" r="7.5" stroke={color} strokeWidth="1.3"/>
      <path d="M5.5 9l2.5 2.5 5-5" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
