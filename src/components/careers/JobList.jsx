import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { getJobsByDepartment, DEPARTMENTS } from '@data/jobs'
import JobCard from './JobCard'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   JobList
   — Department filter tab strip (solid active state)
   — Vertical stack of JobCards with subtle stagger
   — AnimatePresence for filter transition
   — Empty state when no jobs match
   — Apply modal handler (basic alert placeholder)
   — NO gradients anywhere
═══════════════════════════════════════════════════════════════ */

export default function JobList() {
  const [activeDept, setActiveDept] = useState('all')

  const jobs = getJobsByDepartment(activeDept)

  const handleApply = (job) => {
    // Placeholder — replace with modal or navigation to apply form
    window.location.href = `/contact?role=${job.slug}`
  }

  return (
    <div className="flex flex-col gap-8">

      {/* ── Department filter tabs ──────────────────────── */}
      <div
        className="flex items-center gap-1.5 flex-wrap"
        role="tablist"
        aria-label="Filter jobs by department"
      >
        {DEPARTMENTS.map(({ value, label }) => {
          const isActive = activeDept === value
          return (
            <button
              key={value}
              role="tab"
              aria-selected={isActive}
              onClick={() => setActiveDept(value)}
              className={cn(
                'relative px-4 py-2 rounded-xl',
                'text-sm font-medium font-body',
                'transition-all duration-200',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
                isActive
                  // Solid ink active — no gradient
                  ? 'bg-ink text-white shadow-lift'
                  : 'bg-white border border-surface-200 text-ink-muted hover:text-ink hover:border-surface-300 shadow-card',
              )}
            >
              {/* Solid animated background pill */}
              {isActive && (
                <motion.span
                  layoutId="careers-tab-pill"
                  className="absolute inset-0 rounded-xl bg-ink"
                  style={{ zIndex: -1 }}
                  transition={{ type: 'spring', stiffness: 420, damping: 36 }}
                />
              )}
              {label}
            </button>
          )
        })}
      </div>

      {/* ── Result count ────────────────────────────────── */}
      <motion.div
        key={activeDept}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="flex items-center justify-between"
      >
        <p className="text-xs font-mono text-ink-light">
          {jobs.length} open position{jobs.length !== 1 ? 's' : ''}
          {activeDept !== 'all' && (
            <span className="ml-1">
              in {DEPARTMENTS.find((d) => d.value === activeDept)?.label}
            </span>
          )}
        </p>

        {activeDept !== 'all' && (
          <button
            onClick={() => setActiveDept('all')}
            className="text-xs font-mono text-ink-light hover:text-ink transition-colors duration-150"
          >
            Clear filter ×
          </button>
        )}
      </motion.div>

      {/* ── Job cards list ──────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeDept}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col gap-4"
        >
          {jobs.length > 0 ? (
            jobs.map((job, i) => (
              <JobCard
                key={job.id}
                job={job}
                index={i}
                onApply={handleApply}
              />
            ))
          ) : (
            <EmptyState department={activeDept} onReset={() => setActiveDept('all')} />
          )}
        </motion.div>
      </AnimatePresence>

      {/* ── Spontaneous application nudge ───────────────── */}
      {jobs.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className={cn(
            'flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4',
            'p-5 sm:p-6 rounded-2xl',
            'bg-surface-100 border border-surface-200',
          )}
        >
          <div>
            <p className="font-body font-semibold text-sm text-ink mb-1">
              Don't see the right role?
            </p>
            <p className="text-xs text-ink-muted leading-relaxed max-w-sm">
              We occasionally hire for roles not listed here. Send us a note and we'll
              keep you in mind when the right position opens up.
            </p>
          </div>
          <a
            href="/contact"
            className={cn(
              'inline-flex items-center gap-2 shrink-0',
              'px-5 py-2.5 rounded-xl',
              'text-sm font-medium font-body',
              // Solid white card look — no gradient
              'bg-white border border-surface-200 text-ink',
              'hover:bg-surface-50 hover:border-surface-300',
              'transition-colors duration-150',
              'shadow-card',
              'whitespace-nowrap',
            )}
          >
            Send a speculative CV
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M2 6h8M6 2.5l3.5 3.5L6 9.5"
                stroke="currentColor" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </a>
        </motion.div>
      )}
    </div>
  )
}

/* ─── Empty state ────────────────────────────────────────────── */
function EmptyState({ department, onReset }) {
  const deptLabel = DEPARTMENTS.find((d) => d.value === department)?.label ?? department

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        'flex flex-col items-center text-center',
        'py-16 px-6 rounded-2xl',
        'bg-surface-50 border border-surface-200',
        'gap-4',
      )}
    >
      {/* Icon */}
      <div className="w-12 h-12 rounded-xl bg-white border border-surface-200 shadow-card flex items-center justify-center">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
          <rect x="3" y="5" width="14" height="11" rx="2" stroke="#9898AE" strokeWidth="1.3"/>
          <path d="M7 5V4a3 3 0 016 0v1" stroke="#9898AE" strokeWidth="1.3" strokeLinecap="round"/>
          <path d="M7 10h6M7 13h4" stroke="#9898AE" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
      </div>

      <div>
        <p className="font-body font-semibold text-sm text-ink mb-1">
          No open roles in {deptLabel}
        </p>
        <p className="text-xs text-ink-muted leading-relaxed max-w-xs">
          We don't have any openings in this department right now, but we're always
          interested in hearing from talented people.
        </p>
      </div>

      <button
        onClick={onReset}
        className={cn(
          'px-4 py-2 rounded-lg',
          'text-xs font-medium font-body',
          'bg-white border border-surface-200 text-ink-muted',
          'hover:text-ink hover:border-surface-300',
          'transition-colors duration-150',
        )}
      >
        View all departments
      </button>
    </motion.div>
  )
}
