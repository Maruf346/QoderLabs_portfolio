import { motion } from 'framer-motion'
import { formatPostedDate } from '@data/jobs'
import { transition } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   JobCard — Polished micro-interactions
   — Spring-based lift (not just translateY)
   — Left accent bar uses spring scale
   — Apply button: scale + shadow spring on hover
   — Consistent expo easing on all transitions
═══════════════════════════════════════════════════════════════ */

const DEPT_COLORS = {
  engineering: { color: '#4A7FD4', bg: 'rgba(74,127,212,0.09)',  border: 'rgba(74,127,212,0.20)' },
  design:      { color: '#6B4A9B', bg: 'rgba(107,74,155,0.09)', border: 'rgba(107,74,155,0.20)' },
  product:     { color: '#3A7A3A', bg: 'rgba(58,122,58,0.09)',   border: 'rgba(58,122,58,0.20)' },
  operations:  { color: '#C4622D', bg: 'rgba(196,98,45,0.09)',   border: 'rgba(196,98,45,0.20)' },
}

export default function JobCard({ job, index = 0, onApply }) {
  const { title, department, type, location, salary, description, posted, featured } = job
  const ds = DEPT_COLORS[department] ?? DEPT_COLORS.engineering

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.50, delay: index * 0.07, ease: [0.16, 1, 0.3, 1] }}
      initial="rest"
      whileHover="hover"
      animate="rest"
      className="group relative"
    >
      {/* Solid left accent — spring scale */}
      <motion.div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
        style={{ backgroundColor: ds.color }}
        variants={{
          rest:  { scaleY: 0, opacity: 0, transition: { duration: 0.20 } },
          hover: { scaleY: 1, opacity: 1, transition: transition.springSnappy },
        }}
      />

      {/* Card */}
      <motion.div
        variants={{
          rest: {
            y:          0,
            boxShadow:  '0 1px 3px rgba(13,13,18,0.05), 0 4px 16px rgba(13,13,18,0.05)',
            borderColor:'#E8E8EE',
            transition: transition.spring,
          },
          hover: {
            y:          -3,
            boxShadow:  '0 2px 8px rgba(13,13,18,0.06), 0 12px 40px rgba(13,13,18,0.09)',
            borderColor:'#D6D6E0',
            transition: transition.spring,
          },
        }}
        className={cn(
          'relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-5',
          'bg-white rounded-2xl',
          'border',
          'p-5 sm:p-6',
          'overflow-hidden',
        )}
      >

        {/* ── Job info ───────────────────────────────── */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">

          {/* Top row: pills + date */}
          <div className="flex items-center gap-2 flex-wrap">
            <span
              className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-medium capitalize"
              style={{ background: ds.bg, color: ds.color, border: `1px solid ${ds.border}` }}
            >
              {department}
            </span>
            {featured && (
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-ink text-white">
                Featured
              </span>
            )}
            <span className="text-[10px] font-mono text-ink-light ml-auto sm:ml-0">
              {formatPostedDate(posted)}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-display font-bold text-lg text-ink leading-snug tracking-[-0.02em]">
            {title}
          </h3>

          {/* Description */}
          <p className="text-sm text-ink-muted leading-relaxed line-clamp-2">{description}</p>

          {/* Meta chips */}
          <div className="flex flex-wrap items-center gap-2 pt-1">
            <MetaChip icon={<BriefcaseIcon />} label={type}     />
            <MetaChip icon={<PinIcon />}       label={location} />
            {salary && <MetaChip icon={<MoneyIcon />} label={salary} />}
          </div>
        </div>

        {/* ── Apply button ───────────────────────────── */}
        <div className="flex sm:flex-col items-center gap-2 sm:gap-3 shrink-0">
          <motion.button
            onClick={() => onApply?.(job)}
            variants={{
              rest:  { scale: 1,    boxShadow: '0 2px 8px rgba(13,13,18,0.10), 0 4px 16px rgba(13,13,18,0.07)',
                       transition: transition.spring },
              hover: { scale: 1.04, boxShadow: '0 4px 16px rgba(13,13,18,0.14), 0 10px 32px rgba(13,13,18,0.10)',
                       transition: transition.spring },
            }}
            whileTap={{ scale: 0.96 }}
            className={cn(
              'inline-flex items-center gap-1.5',
              'px-5 py-2.5 rounded-xl',
              'text-sm font-medium font-body text-white',
              'bg-ink',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
              'whitespace-nowrap cursor-pointer',
            )}
          >
            Apply Now
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2.5l3.5 3.5L6 9.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </motion.button>

          <button className="text-xs font-mono text-ink-light hover:text-ink transition-colors duration-150 whitespace-nowrap">
            Learn more
          </button>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ─── Helpers ────────────────────────────────────────────────── */
function MetaChip({ icon, label }) {
  return (
    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-body text-ink-muted bg-surface-100 border border-surface-200">
      <span className="text-ink-light">{icon}</span>
      {label}
    </span>
  )
}

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
      <path d="M5.5 1C3.567 1 2 2.567 2 4.5c0 2.625 3.5 5.5 3.5 5.5S9 7.125 9 4.5C9 2.567 7.433 1 5.5 1z" stroke="currentColor" strokeWidth="1.1"/>
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
