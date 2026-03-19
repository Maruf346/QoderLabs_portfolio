import { motion } from 'framer-motion'
import { formatPostedDate } from '@data/jobs'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   JobCard
   — Clean horizontal card layout on desktop
   — Stacks to vertical on mobile
   — NO gradients — all solid colors
   — Hover: slight lift + solid brand-blue left border accent
   — Featured jobs get a pinned indicator
═══════════════════════════════════════════════════════════════ */

const DEPT_COLORS = {
  engineering: { color: '#4A7FD4', bg: 'rgba(74,127,212,0.09)',  border: 'rgba(74,127,212,0.20)' },
  design:      { color: '#6B4A9B', bg: 'rgba(107,74,155,0.09)', border: 'rgba(107,74,155,0.20)' },
  product:     { color: '#3A7A3A', bg: 'rgba(58,122,58,0.09)',   border: 'rgba(58,122,58,0.20)' },
  operations:  { color: '#C4622D', bg: 'rgba(196,98,45,0.09)',   border: 'rgba(196,98,45,0.20)' },
}

export default function JobCard({ job, index = 0, onApply }) {
  const {
    title, department, type, location,
    salary, description, posted, featured,
  } = job

  const deptStyle = DEPT_COLORS[department] ?? DEPT_COLORS.engineering

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.45,
        delay:    index * 0.07,
        ease:     [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}
      className="group relative"
    >
      {/* Solid left accent bar — only visible on hover */}
      <motion.div
        className="absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl"
        style={{ backgroundColor: deptStyle.color }}
        initial={{ scaleY: 0, opacity: 0 }}
        whileHover={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      />

      <div className={cn(
        'relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5',
        'bg-white rounded-2xl',
        'border border-surface-200',
        'group-hover:border-surface-300',
        'shadow-card group-hover:shadow-card-hover',
        'transition-all duration-200',
        'p-5 sm:p-6',
        'overflow-hidden',
      )}>

        {/* ── Left: job info ─────────────────────────── */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">

          {/* Top row: dept pill + featured + posted */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Department pill — solid tinted bg */}
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium capitalize"
              style={{
                background: deptStyle.bg,
                color:      deptStyle.color,
                border:     `1px solid ${deptStyle.border}`,
              }}
            >
              {department}
            </span>

            {/* Featured badge */}
            {featured && (
              <span className={cn(
                'px-2.5 py-0.5 rounded-full',
                'text-[10px] font-mono font-semibold',
                'bg-ink text-white',
              )}>
                Featured
              </span>
            )}

            {/* Posted date */}
            <span className="text-[10px] font-mono text-ink-light ml-auto sm:ml-0">
              {formatPostedDate(posted)}
            </span>
          </div>

          {/* Job title */}
          <h3 className="font-display font-bold text-lg text-ink leading-snug tracking-[-0.02em]">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">
            {description}
          </p>

          {/* Meta chips row */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            {/* Type */}
            <MetaChip icon={<BriefcaseIcon />} label={type} />
            {/* Location */}
            <MetaChip icon={<PinIcon />} label={location} />
            {/* Salary — if available */}
            {salary && <MetaChip icon={<MoneyIcon />} label={salary} />}
          </div>
        </div>

        {/* ── Right: apply button ────────────────────── */}
        <div className="flex sm:flex-col items-center gap-2 sm:gap-3 shrink-0">
          <button
            onClick={() => onApply?.(job)}
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-5 py-2.5 rounded-xl',
              'text-sm font-medium font-body text-white',
              // Solid ink — no gradient
              'bg-ink hover:bg-ink/85',
              'transition-colors duration-150',
              'shadow-lift hover:shadow-lift-hover',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
              'whitespace-nowrap',
            )}
          >
            Apply Now
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2.5l3.5 3.5L6 9.5"
                stroke="currentColor" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className={cn(
              'text-xs font-mono text-ink-light',
              'hover:text-ink',
              'transition-colors duration-150',
              'whitespace-nowrap',
            )}
          >
            Learn more
          </button>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Meta chip ──────────────────────────────────────────────── */
function MetaChip({ icon, label }) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5',
      'px-2.5 py-1 rounded-lg',
      'text-xs font-body text-ink-muted',
      'bg-surface-100 border border-surface-200',
    )}>
      <span className="text-ink-light">{icon}</span>
      {label}
    </span>
  )
}

/* ── Meta icons ──────────────────────────────────────────────── */
function BriefcaseIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <rect x="1" y="3.5" width="9" height="6.5" rx="1.2" stroke="currentColor" strokeWidth="1.1"/>
      <path d="M3.5 3.5V3a2 2 0 014 0v.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round"/>
      <path d="M1 6.5h9" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}

function PinIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path d="M5.5 1C3.567 1 2 2.567 2 4.5c0 2.625 3.5 5.5 3.5 5.5S9 7.125 9 4.5C9 2.567 7.433 1 5.5 1z"
        stroke="currentColor" strokeWidth="1.1"/>
      <circle cx="5.5" cy="4.5" r="1.2" stroke="currentColor" strokeWidth="1"/>
    </svg>
  )
}

function MoneyIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <rect x="1" y="2.5" width="9" height="6" rx="1.2" stroke="currentColor" strokeWidth="1.1"/>
      <circle cx="5.5" cy="5.5" r="1.5" stroke="currentColor" strokeWidth="1"/>
      <path d="M3 5.5h.5M7.5 5.5H8" stroke="currentColor" strokeWidth="1" strokeLinecap="round"/>
    </svg>
  )
}
