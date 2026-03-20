import { useRef } from 'react'
import { motion, useInView, useMotionValue, useTransform, animate } from 'framer-motion'
import { useEffect } from 'react'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Stats Section
   — 4 animated count-up numbers
   — Gradient value display
   — Supporting label + description per stat
   — Glow card on hover
   — Dark premium background variant
═══════════════════════════════════════════════════════════════ */

const STATS = [
  {
    value:       50,
    suffix:      '+',
    label:       'Projects Delivered',
    description: 'Across web, mobile, and AI platforms globally.',
    color:       '#4A7FD4',
    colorBg:     'rgba(74,127,212,0.12)',
    icon:        RocketIcon,
  },
  {
    value:       40,
    suffix:      '+',
    label:       'Clients Served',
    description: 'From solo founders to Series B companies.',
    color:       '#3A7A3A',
    colorBg:     'rgba(58,122,58,0.12)',
    icon:        UsersIcon,
  },
  {
    value:       5,
    suffix:      '+',
    label:       'Years Experience',
    description: 'Building production software since 2020.',
    color:       '#C4622D',
    colorBg:     'rgba(196,98,45,0.12)',
    icon:        CalendarIcon,
  },
  {
    value:       98,
    suffix:      '%',
    label:       'Client Satisfaction',
    description: 'Measured across post-project surveys.',
    color:       '#6B4A9B',
    colorBg:     'rgba(107,74,155,0.12)',
    icon:        StarIcon,
  },
]

export default function Stats() {
  return (
    <section className="relative py-20 md:py-28 bg-white overflow-hidden">

      {/* Top divider */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #EAEAEE 20%, #D8D8E0 50%, #EAEAEE 80%, transparent)',
        }}
      />

      {/* Subtle center glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(74,127,212,0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.default}
          className="text-center mb-14"
        >
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple opacity-70" />
            By the Numbers
          </motion.p>

          <motion.h2
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-3xl sm:text-4xl md:text-5xl',
              'leading-[1.08] tracking-[-0.032em]',
            )}
          >
            The work speaks{' '}
            <span
              className="text-gradient-logo"
            >
              for itself.
            </span>
          </motion.h2>
        </motion.div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Individual Stat Card with count-up ─────────────────────── */
function StatCard({ stat, index }) {
  const { value, suffix, label, description, color, colorBg, icon: Icon } = stat
  const ref     = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  // Animated count-up value
  const count = useMotionValue(0)
  const rounded = useTransform(count, (v) => Math.round(v))

  useEffect(() => {
    if (isInView) {
      const controls = animate(count, value, {
        duration: 1.6,
        delay: index * 0.12,
        ease: [0.4, 0, 0.2, 1],
      })
      return controls.stop
    }
  }, [isInView, value, index, count])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.default}
      transition={{ duration: 0.55, delay: index * 0.10, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className={cn(
        'relative flex flex-col gap-4 p-6',
        'bg-white rounded-2xl',
        'border border-surface-200',
        'shadow-card hover:shadow-card-hover',
        'transition-shadow duration-300',
        'overflow-hidden group',
      )}
    >
      {/* Background glow on hover */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        style={{
          background: `radial-gradient(ellipse 80% 60% at 10% 0%, ${colorBg} 0%, transparent 70%)`,
        }}
      />

      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: colorBg, border: `1px solid ${color}28` }}
      >
        <Icon color={color} />
      </div>

      {/* Animated number */}
      <div className="flex items-baseline gap-0.5">
        <motion.span
          className="font-display font-bold text-4xl leading-none tracking-[-0.04em] text-gradient-logo"
        >
          {rounded}
        </motion.span>
        <span
          className="font-display font-bold text-2xl leading-none text-gradient-logo"
        >
          {suffix}
        </span>
      </div>

      {/* Label */}
      <div className="flex flex-col gap-1">
        <p className="font-body font-semibold text-sm text-ink">{label}</p>
        <p className="font-body text-xs text-ink-light leading-relaxed">{description}</p>
      </div>

      {/* Bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }}
      />
    </motion.div>
  )
}

/* ── Icons ───────────────────────────────────────────────────── */
function RocketIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 1C9 1 13 3 13 8v2l2 2-2 1v2l-2-1-1 2-1-2-2 1v-2L5 12l2-2V8C7 3 9 1 9 1z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <circle cx="9" cy="7" r="1.2" fill={color}/>
    </svg>
  )
}

function UsersIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="7" cy="5.5" r="3" stroke={color} strokeWidth="1.3"/>
      <path d="M1 16c0-3 2.69-5 6-5s6 2 6 5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M13 8.5c1.66 0 3 1.12 3 3.5" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="13" cy="5" r="2" stroke={color} strokeWidth="1.3"/>
    </svg>
  )
}

function CalendarIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="2" y="3.5" width="14" height="13" rx="2" stroke={color} strokeWidth="1.3"/>
      <path d="M2 7.5h14" stroke={color} strokeWidth="1.3"/>
      <path d="M6 2v3M12 2v3" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M5.5 11h2M10.5 11h2M5.5 13.5h2M10.5 13.5h2"
        stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function StarIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 1.5l2.163 4.382 4.837.703-3.5 3.41.826 4.814L9 12.5l-4.326 2.309.826-4.814L2 6.585l4.837-.703L9 1.5z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  )
}
