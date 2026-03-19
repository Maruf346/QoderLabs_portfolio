import { motion, AnimatePresence } from 'framer-motion'
import ProjectCard from './ProjectCard'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   ProjectGrid
   — Responsive masonry-style grid: 1 → 2 → 3 columns
   — First featured project spans full row on lg (wide treatment)
   — AnimatePresence handles category filter transitions
   — Empty state when no projects match filter
   — Stagger entrance per card via index prop
═══════════════════════════════════════════════════════════════ */

export default function ProjectGrid({ projects }) {
  if (!projects || projects.length === 0) {
    return <EmptyState />
  }

  // Separate featured from standard for layout treatment
  const featured  = projects.filter((p) => p.featured)
  const standard  = projects.filter((p) => !p.featured)
  const allInOrder = [...featured, ...standard]

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={projects.map((p) => p.id).join('-')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      >
        {/* ── Featured row (if any featured projects) ─── */}
        {featured.length > 0 && (
          <div className={cn(
            'grid gap-5 mb-5',
            featured.length === 1
              ? 'grid-cols-1 lg:grid-cols-1'   // single featured → full width
              : 'grid-cols-1 sm:grid-cols-2',   // two featured → side by side
          )}>
            {featured.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured
                index={i}
              />
            ))}
          </div>
        )}

        {/* ── Standard grid ─────────────────────────── */}
        {standard.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {standard.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={false}
                index={featured.length + i}
              />
            ))}
          </div>
        )}

        {/* ── If filter returns all as non-featured ──── */}
        {featured.length === 0 && standard.length === 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {allInOrder.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                featured={false}
                index={i}
              />
            ))}
          </div>
        )}

        {/* ── Result count ──────────────────────────── */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="mt-8 text-center text-xs font-mono text-ink-light"
        >
          Showing {projects.length} project{projects.length !== 1 ? 's' : ''}
        </motion.p>
      </motion.div>
    </AnimatePresence>
  )
}

/* ─── Empty state ────────────────────────────────────────────── */
function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      className="flex flex-col items-center justify-center text-center py-24 gap-4"
    >
      {/* Icon */}
      <div className="w-14 h-14 rounded-2xl bg-surface-100 border border-surface-200 flex items-center justify-center">
        <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
          <rect x="2" y="2" width="8" height="8" rx="1.5" stroke="#9898AE" strokeWidth="1.3"/>
          <rect x="12" y="2" width="8" height="8" rx="1.5" stroke="#9898AE" strokeWidth="1.3"/>
          <rect x="2" y="12" width="8" height="8" rx="1.5" stroke="#9898AE" strokeWidth="1.3"/>
          <rect x="12" y="12" width="8" height="8" rx="1.5" stroke="#9898AE" strokeWidth="1.3"/>
        </svg>
      </div>

      <div>
        <p className="font-display font-semibold text-base text-ink mb-1">
          No projects in this category
        </p>
        <p className="text-sm text-ink-muted">
          Try selecting a different filter above.
        </p>
      </div>
    </motion.div>
  )
}
