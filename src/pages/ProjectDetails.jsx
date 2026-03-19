import { useParams, Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { getProjectBySlug, getAllProjects } from '@data/projects'
import ProjectHero    from '@components/portfolio/ProjectHero'
import ProjectContent from '@components/portfolio/ProjectContent'
import ProjectCard    from '@components/portfolio/ProjectCard'
import { cn }         from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   ProjectDetails — DEFINITIVE FIX

   ROOT CAUSE of blank screen after loading:
     pageTransition uses `when: 'beforeChildren'` + opacity 0→1.
     While the wrapper is invisible (opacity 0), Framer Motion's
     whileInView fires on all child sections because they are
     technically "in the viewport". Framer consumes those triggers
     immediately, marks animations as complete, then the parent
     fades in — but children never re-animate. Result: everything
     stays in `hidden` state = blank white page.

   FIX:
     — Remove pageTransition wrapper entirely from this page.
     — Use a simple opacity fade-in on mount (no stagger, no
       beforeChildren, no y offset that could misfire).
     — Let each section's own whileInView handle its entrance
       independently — this is the correct pattern for long
       scrollable detail pages.
     — All whileInView animations now fire correctly as the
       user scrolls past each section.
═══════════════════════════════════════════════════════════════ */

export default function ProjectDetails() {
  const { slug }  = useParams()
  const navigate  = useNavigate()

  /* Dev diagnostics ──────────────────────────────────────── */
  useEffect(() => {
    if (import.meta.env.DEV) {
      console.log('[ProjectDetails] slug:', slug)
      console.log('[ProjectDetails] match:', getProjectBySlug(slug))
      console.log('[ProjectDetails] available slugs:', getAllProjects().map(p => p.slug))
    }
  }, [slug])

  /* Guard — no slug at all ───────────────────────────────── */
  if (!slug) {
    if (import.meta.env.DEV) console.warn('[ProjectDetails] No slug in params, redirecting.')
    navigate('/portfolio', { replace: true })
    return null
  }

  const project = getProjectBySlug(slug)

  /* Guard — slug doesn't match any project ───────────────── */
  if (!project) {
    return <ProjectNotFound slug={slug} />
  }

  /* Related projects ─────────────────────────────────────── */
  const related = getAllProjects()
    .filter(p => p.slug !== slug && p.category === project.category)
    .slice(0, 3)

  /* ── Render ─────────────────────────────────────────────── */
  /*
   * IMPORTANT: No pageTransition wrapper here.
   * Just a simple instant-mount div with a quick opacity fade.
   * Each child section controls its own whileInView entrance.
   */
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
    >
      {/* 1 — Hero */}
      <ProjectHero project={project} />

      {/* 2 — Content sections */}
      <ProjectContent project={project} />

      {/* 3 — Related (optional) */}
      {related.length > 0 && (
        <RelatedProjects projects={related} />
      )}
    </motion.div>
  )
}

/* ─── Related projects strip ─────────────────────────────────── */
function RelatedProjects({ projects }) {
  return (
    <section className="py-16 md:py-24 bg-surface-50 border-t border-surface-200">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

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
            className="inline-flex items-center gap-1.5 text-sm font-medium font-body text-ink-muted hover:text-ink transition-colors duration-150"
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

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {projects.map((project, i) => (
            <ProjectCard key={project.id} project={project} featured={false} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Not found — never blank ────────────────────────────────── */
function ProjectNotFound({ slug }) {
  if (import.meta.env.DEV) {
    console.warn('[ProjectDetails] No project found for slug:', slug)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="min-h-screen flex flex-col items-center justify-center text-center px-5 bg-surface-50 pt-24"
    >
      <div className="max-w-md w-full">

        <div className="w-16 h-16 rounded-2xl bg-surface-100 border border-surface-200 flex items-center justify-center mx-auto mb-6">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <rect x="3"  y="3"  width="8" height="8" rx="1.5" stroke="#94949E" strokeWidth="1.3"/>
            <rect x="13" y="3"  width="8" height="8" rx="1.5" stroke="#94949E" strokeWidth="1.3"/>
            <rect x="3"  y="13" width="8" height="8" rx="1.5" stroke="#94949E" strokeWidth="1.3"/>
            <path d="M16 16h5M18.5 13.5v5" stroke="#94949E" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
        </div>

        <p className="font-mono text-xs text-ink-light uppercase tracking-widest mb-3">
          404 — Not Found
        </p>

        <h1 className="font-display font-bold text-2xl text-ink tracking-tight mb-3">
          Project not found
        </h1>

        <p className="text-sm text-ink-muted leading-relaxed mb-2">
          No project matches{' '}
          <code className="px-1.5 py-0.5 rounded-md bg-surface-200 text-ink font-mono text-xs">
            {slug}
          </code>
        </p>
        <p className="text-sm text-ink-muted leading-relaxed mb-8">
          It may have been moved or the URL may be incorrect.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            to="/portfolio"
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3 rounded-xl',
              'text-sm font-medium font-body text-white',
              'bg-ink hover:bg-ink/85 transition-colors duration-200',
              'shadow-lift hover:shadow-lift-hover',
            )}
          >
            ← View All Projects
          </Link>
          <Link
            to="/"
            className={cn(
              'inline-flex items-center gap-2 px-6 py-3 rounded-xl',
              'text-sm font-medium font-body text-ink-muted',
              'bg-white border border-surface-200',
              'hover:text-ink hover:border-surface-300 transition-colors duration-200',
            )}
          >
            Go Home
          </Link>
        </div>
      </div>
    </motion.div>
  )
}
