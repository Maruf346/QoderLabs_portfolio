import { motion } from 'framer-motion'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Why Choose Us Section
   — 2-column layout: left = headline + stats, right = reason cards
   — 4 key differentiators with icon + gradient accent
   — Staggered entrance per card
   — Subtle gradient background
═══════════════════════════════════════════════════════════════ */

const STATS = [
  { value: '50+',  label: 'Projects delivered' },
  { value: '98%',  label: 'Client satisfaction' },
  { value: '3×',   label: 'Faster time to market' },
]

const REASONS = [
  {
    icon:        SpeedIcon,
    color:       '#4A7FD4',
    colorBg:     'rgba(74,127,212,0.09)',
    title:       'Fast & Scalable',
    description: 'We ship production-ready products quickly without sacrificing architecture quality. Speed and scale are not trade-offs here.',
  },
  {
    icon:        ArchIcon,
    color:       '#3A7A3A',
    colorBg:     'rgba(58,122,58,0.09)',
    title:       'Clean Architecture',
    description: 'Every system we build is designed to last. Modular, documented, and easy to hand off — no spaghetti code, ever.',
  },
  {
    icon:        ClientIcon,
    color:       '#C4622D',
    colorBg:     'rgba(196,98,45,0.09)',
    title:       'Client-Focused',
    description: 'We treat your project like our own. Transparent communication, weekly updates, and zero surprises on delivery.',
  },
  {
    icon:        TechIcon,
    color:       '#6B4A9B',
    colorBg:     'rgba(107,74,155,0.09)',
    title:       'Modern Stack',
    description: 'We only use proven, cutting-edge technologies. No outdated frameworks — your product is built for the next decade.',
  },
]

const cardVariants = {
  hidden:  { opacity: 0, x: 20 },
  visible: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, delay: i * 0.10, ease: [0.4, 0, 0.2, 1] },
  }),
}

const statVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: 0.2 + i * 0.10, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function WhyChooseUs() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">

      {/* Gradient bg */}
      <div
        className="absolute inset-0"
        style={{ background: 'var(--gradient-soft)' }}
        aria-hidden="true"
      />

      {/* Top + bottom gradient dividers */}
      {['top', 'bottom'].map((pos) => (
        <div
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos}-0 left-0 right-0 h-px`}
          style={{
            background: 'linear-gradient(90deg, transparent, #EAEAEE 20%, #D8D8E0 50%, #EAEAEE 80%, transparent)',
          }}
        />
      ))}

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left column: headline + stats ────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
          >
            <motion.p
              variants={slideUp}
              className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-4"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-70" />
              Why QoderLabs
            </motion.p>

            <motion.h2
              variants={slideUp}
              className={cn(
                'font-display font-bold text-ink',
                'text-3xl sm:text-4xl md:text-5xl lg:text-[2.8rem] xl:text-5xl',
                'leading-[1.06] tracking-[-0.033em]',
                'mb-5',
              )}
            >
              We don't just build —{' '}
              <br className="hidden md:block" />
              we{' '}
              <span
                className="text-gradient-name"
              >
                engineer outcomes.
              </span>
            </motion.h2>

            <motion.p
              variants={slideUp}
              className="text-ink-muted text-base md:text-lg leading-relaxed mb-10 max-w-md"
            >
              Dozens of teams have trusted us to take their ideas from napkin sketch
              to scalable production product. Here's what sets us apart.
            </motion.p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  custom={i}
                  variants={statVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport.default}
                  className="flex flex-col gap-1"
                >
                  {/* Stat value */}
                  <span
                    className="font-display font-bold text-3xl sm:text-4xl leading-none tracking-[-0.04em]"
                    className="text-gradient-logo"
                  >
                    {stat.value}
                  </span>
                  <span className="text-xs font-mono text-ink-light leading-tight">
                    {stat.label}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* ── Right column: reason cards ────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {REASONS.map((reason, i) => (
              <ReasonCard key={reason.title} reason={reason} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ─── Reason Card ────────────────────────────────────────────── */
function ReasonCard({ reason, index }) {
  const { icon: Icon, color, colorBg, title, description } = reason

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
      whileHover={{ y: -3, transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] } }}
      className={cn(
        'flex flex-col gap-3.5 p-5',
        'bg-white/80 backdrop-blur-sm',
        'rounded-2xl',
        'border border-white/70',
        'shadow-card hover:shadow-card-hover',
        'transition-shadow duration-300',
        'group',
      )}
    >
      {/* Icon */}
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-105"
        style={{ background: colorBg, border: `1px solid ${color}28` }}
      >
        <Icon color={color} />
      </div>

      {/* Title */}
      <h3 className="font-display font-semibold text-base text-ink leading-snug tracking-[-0.018em]">
        {title}
      </h3>

      {/* Description */}
      <p className="text-sm text-ink-muted leading-relaxed">
        {description}
      </p>

      {/* Colored bottom accent bar */}
      <div
        className="h-0.5 rounded-full mt-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }}
      />
    </motion.div>
  )
}

/* ── Reason Icons ────────────────────────────────────────────── */
function SpeedIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M9 1v3M9 14v3M1 9h3M14 9h3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M3.5 3.5l2 2M12.5 12.5l2 2M3.5 14.5l2-2M12.5 5.5l2-2" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <circle cx="9" cy="9" r="3" stroke={color} strokeWidth="1.4"/>
      <path d="M9 7v2l1.5 1" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function ArchIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <rect x="1.5" y="1.5" width="5" height="5" rx="1.2" stroke={color} strokeWidth="1.3"/>
      <rect x="11.5" y="1.5" width="5" height="5" rx="1.2" stroke={color} strokeWidth="1.3"/>
      <rect x="6.5" y="11.5" width="5" height="5" rx="1.2" stroke={color} strokeWidth="1.3"/>
      <path d="M4 6.5v2.5a2 2 0 002 2h1M14 6.5v2.5a2 2 0 01-2 2h-1" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function ClientIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <circle cx="9" cy="6" r="3.5" stroke={color} strokeWidth="1.3"/>
      <path d="M1.5 16c0-3.31 3.36-6 7.5-6s7.5 2.69 7.5 6" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M13 10.5l1.5 1.5L17 9" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function TechIcon({ color }) {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path d="M5.5 6L2 9l3.5 3M12.5 6L16 9l-3.5 3" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M11 4l-4 10" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}
