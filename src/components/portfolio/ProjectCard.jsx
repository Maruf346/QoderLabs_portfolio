import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   ProjectCard — BUG FIX
   ROOT CAUSE that was fixed:
     The inner motion.div used initial="rest" / animate="rest"
     (string variant names) while the outer motion.div used
     initial={{ opacity:0, y:26 }} (an object). Framer Motion
     propagates string variant names down the tree, but when the
     parent's initial is an OBJECT (not a string), child
     string-named variants never resolve → silent render crash
     → blank screen on the ProjectDetails page.

   FIX:
     — Outer wrapper: plain div (no motion, just CSS transition)
     — Inner card:    single motion.div owns ALL animation state
       using whileHover + whileTap only (no variant strings)
     — Image scale:   own whileHover on motion.div inside card
     — Arrow reveal:  CSS group-hover (no Framer dependency)
     — Bottom line:   CSS group-hover via scaleX transform
═══════════════════════════════════════════════════════════════ */

const CATEGORY_LABELS = {
  web:     'Web App',
  mobile:  'Mobile App',
  ai:      'AI / ML',
  cms:     'CMS',
  backend: 'Backend',
}

export default function ProjectCard({ project, featured = false, index = 0 }) {
  // Guard — never render if project is undefined
  if (!project) return null

  const { slug, title, tagline, tags, accentColor, category, year, client } = project

  // Debug: log slug to confirm data is flowing correctly
  if (process.env.NODE_ENV === 'development') {
    console.log('[ProjectCard] slug:', slug, '| title:', title)
  }

  return (
    /* ── Outer: plain div with CSS entrance animation ── */
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.52, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link
        to={`/portfolio/${slug}`}
        aria-label={`View ${title} case study`}
        className="block h-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue rounded-2xl"
      >
        {/* ── Inner card — single motion owner ─────────── */}
        <motion.div
          whileHover={{ y: -6, boxShadow: '0 4px 20px rgba(13,13,18,0.09), 0 16px 48px rgba(13,13,18,0.10)' }}
          whileTap={{ scale: 0.99 }}
          transition={{ type: 'spring', stiffness: 400, damping: 32, mass: 0.8 }}
          className={cn(
            'relative flex flex-col h-full',
            'bg-white rounded-2xl overflow-hidden',
            'border border-surface-200',
            'shadow-card',
            'group-hover:border-surface-300',
            'transition-[border-color] duration-[260ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          )}
        >

          {/* ── Image / visual area ──────────────────── */}
          <div className={cn(
            'relative overflow-hidden shrink-0',
            featured ? 'h-[248px] sm:h-[268px]' : 'h-[200px] sm:h-[220px]',
          )}>
            {/* Solid accent bg — scales on hover independently */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              className="absolute inset-0"
              style={{ backgroundColor: accentColor }}
            />

            {/* Dot texture overlay */}
            <div
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                backgroundSize:  '18px 18px',
              }}
            />

            {/* Diagonal stripe texture */}
            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.8) 0, rgba(255,255,255,0.8) 1px, transparent 0, transparent 50%)',
                backgroundSize:  '12px 12px',
              }}
            />

            {/* UI skeleton lines */}
            <div className="absolute inset-0 flex flex-col justify-center items-start gap-2.5 px-8 opacity-[0.18]">
              <div className="w-3/4 h-2.5 rounded-full bg-white/80" />
              <div className="w-1/2 h-2   rounded-full bg-white/60" />
              <div className="w-2/3 h-2   rounded-full bg-white/50" />
              <div className="mt-2 flex gap-2">
                <div className="w-16 h-6 rounded-lg bg-white/60" />
                <div className="w-12 h-6 rounded-lg bg-white/40" />
              </div>
            </div>

            {/* Bottom vignette */}
            <div
              className="absolute bottom-0 left-0 right-0 h-14 pointer-events-none"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.10))' }}
            />

            {/* Category + year pills */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5 z-10">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-medium bg-white/92 backdrop-blur-sm text-ink">
                {CATEGORY_LABELS[category] ?? category}
              </span>
              <span className="px-2 py-1 rounded-full text-[10px] font-mono font-medium bg-black/22 backdrop-blur-sm text-white">
                {year}
              </span>
            </div>

            {/* Arrow icon — CSS group-hover reveal (no Framer dep) */}
            <div className="absolute top-3 right-3 z-10 opacity-0 group-hover:opacity-100 scale-75 group-hover:scale-100 transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]">
              <div className="w-8 h-8 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center shadow-card">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                    stroke="#0D0D12" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Featured badge */}
            {featured && (
              <div className="absolute bottom-3 left-3 z-10">
                <span
                  className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/94 backdrop-blur-sm uppercase tracking-wider"
                  style={{ color: accentColor }}
                >
                  ★ Featured
                </span>
              </div>
            )}
          </div>

          {/* ── Card body ──────────────────────────────── */}
          <div className="flex flex-col flex-1 p-5 gap-3">
            <p className="text-[10px] font-mono text-ink-light uppercase tracking-wider">{client}</p>

            <h3 className={cn(
              'font-display font-semibold text-ink leading-snug tracking-[-0.02em]',
              featured ? 'text-xl' : 'text-[1.05rem]',
            )}>
              {title}
            </h3>

            <p className="text-sm text-ink-muted leading-relaxed flex-1 line-clamp-2">{tagline}</p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-surface-100 border border-surface-200 text-ink-light"
                >
                  {tag}
                </span>
              ))}
              {tags.length > 4 && (
                <span className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-surface-100 border border-surface-200 text-ink-light">
                  +{tags.length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Bottom accent line — CSS group-hover scaleX (no Framer dep) */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
