import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils/animations'
import { getProjectBySlug, getAllProjects } from '@data/projects'
import ProjectHero    from '@components/portfolio/ProjectHero'
import ProjectContent from '@components/portfolio/ProjectContent'
import ProjectCard    from '@components/portfolio/ProjectCard'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   ProjectDetails — Dynamic single project page
   Route: /portfolio/:slug

   Layout:
     1. ProjectHero    — back nav, title, meta, tags
     2. ProjectContent — overview, challenge/solution,
                         features, screenshots, outcomes, CTA
     3. Related projects strip (max 3, excluding current)
═══════════════════════════════════════════════════════════════ */

export default function ProjectDetails() {
  const { slug } = useParams()
  const project  = getProjectBySlug(slug)

  // ── Not found state ────────────────────────────────────────
  if (!project) {
    return <NotFound />
  }

  // Related: up to 3 projects in same category, excluding current
  const related = getAllProjects()
    .filter((p) => p.slug !== slug && p.category === project.category)
    .slice(0, 3)

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 1 ── Hero */}
      <ProjectHero project={project} />

      {/* 2 ── Body content */}
      <ProjectContent project={project} />

      {/* 3 ── Related projects */}
      {related.length > 0 && (
        <RelatedProjects projects={related} currentCategory={project.category} />
      )}
    </motion.div>
  )
}

/* ─── Related projects strip ─────────────────────────────────── */
function RelatedProjects({ projects, currentCategory }) {
  return (
    <section className="py-16 md:py-24 bg-surface-50 border-t border-surface-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* Header */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <p className="text-xs font-mono text-ink-light uppercase tracking-[0.15em] mb-1">
              More Projects
            </p>
            <h2 className="font-display font-bold text-xl text-ink tracking-tight">
              Related Work
            </h2>
          </div>
          <Link
            to="/portfolio"
            className={cn(
              'inline-flex items-center gap-1.5',
              'text-sm font-medium font-body text-ink-muted',
              'hover:text-ink transition-colors duration-150',
            )}
          >
            All projects
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
              <path d="M2 6.5h9M7.5 2.5l4 4-4 4"
                stroke="currentColor" strokeWidth="1.4"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              featured={false}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Not found state ────────────────────────────────────────── */
function NotFound() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-surface-50"
    >
      <div className="max-w-md">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-surface-100 border border-surface-200 flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3" y="3" width="8" height="8" rx="1.5" stroke="#9898AE" strokeWidth="1.3"/>
            <rect x="13" y="3" width="8" height="8" rx="1.5" stroke="#9898AE" strokeWidth="1.3"/>
            <rect x="3" y="13" width="8" height="8" rx="1.5" stroke="#9898AE" strokeWidth="1.3"/>
            <path d="M16 16h5M18.5 13.5v5" stroke="#9898AE" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>

        <p className="font-mono text-xs text-ink-light uppercase tracking-widest mb-3">
          404 — Not Found
        </p>
        <h1 className="font-display font-bold text-2xl text-ink tracking-tight mb-3">
          Project not found
        </h1>
        <p className="text-sm text-ink-muted leading-relaxed mb-8">
          The project you're looking for doesn't exist or may have been moved.
          Head back to the portfolio to browse all our work.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/portfolio"
            className={cn(
              'inline-flex items-center gap-2',
              'px-6 py-3 rounded-xl',
              'text-sm font-medium font-body text-white',
              'bg-ink hover:bg-ink/85',
              'transition-colors duration-200',
            )}
          >
            ← View All Projects
          </Link>
          <Link
            to="/"
            className={cn(
              'inline-flex items-center gap-2',
              'px-6 py-3 rounded-xl',
              'text-sm font-medium font-body text-ink-muted',
              'bg-white border border-surface-200',
              'hover:text-ink hover:border-surface-300',
              'transition-colors duration-200',
            )}
          >
            Go Home
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
