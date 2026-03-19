import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   ProjectCard
   — Clickable card linking to /portfolio/:slug
   — Two sizes: featured (taller image) and standard
   — Gradient placeholder image with dot-grid overlay + mock chrome
   — Hover: lift + glow shadow + image scale + arrow icon reveal
   — Tech tags at bottom
   — Category + year pill on image
═══════════════════════════════════════════════════════════════ */

export default function ProjectCard({ project, featured = false, index = 0 }) {
  const { slug, title, tagline, tags, gradient, accentColor, category, year, client } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration: 0.55,
        delay: index * 0.08,
        ease: [0.4, 0, 0.2, 1],
      }}
      className="group"
    >
      <Link
        to={`/portfolio/${slug}`}
        aria-label={`View ${title} project`}
        className="block h-full"
      >
        <motion.div
          whileHover={{ y: -6 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'relative flex flex-col h-full',
            'bg-white rounded-2xl overflow-hidden',
            'border border-surface-200',
            'shadow-card',
            'transition-shadow duration-300 ease-in-out',
            'group-hover:shadow-card-hover',
          )}
        >
          {/* ── Image area ─────────────────────────────── */}
          <div
            className={cn(
              'relative overflow-hidden shrink-0',
              featured ? 'h-[240px] sm:h-[260px]' : 'h-[200px] sm:h-[220px]',
            )}
          >
            {/* Gradient background */}
            <motion.div
              className="absolute inset-0"
              style={{ background: gradient }}
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            />

            {/* Dot-grid overlay */}
            <div
              className="absolute inset-0 opacity-[0.12]"
              style={{
                backgroundImage:
                  'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Mock UI skeleton lines */}
            <div className="absolute inset-0 flex flex-col justify-center items-start gap-2.5 px-8 opacity-20">
              <div className="w-3/4 h-2.5 rounded-full bg-white/70" />
              <div className="w-1/2 h-2 rounded-full bg-white/50" />
              <div className="w-2/3 h-2 rounded-full bg-white/40" />
              <div className="mt-2 flex gap-2">
                <div className="w-16 h-6 rounded-lg bg-white/50" />
                <div className="w-12 h-6 rounded-lg bg-white/30" />
              </div>
            </div>

            {/* Top-left: category + year pill */}
            <div className="absolute top-3 left-3 flex items-center gap-1.5">
              <span className={cn(
                'px-2.5 py-1 rounded-full',
                'text-[10px] font-mono font-medium',
                'bg-white/90 backdrop-blur-sm text-ink',
              )}>
                {CATEGORY_LABELS[category] ?? category}
              </span>
              <span className={cn(
                'px-2 py-1 rounded-full',
                'text-[10px] font-mono font-medium',
                'bg-black/20 backdrop-blur-sm text-white',
              )}>
                {year}
              </span>
            </div>

            {/* Top-right: arrow icon — appears on hover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7, x: 4, y: -4 }}
              whileHover={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
              className="absolute top-3 right-3"
            >
              <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-card">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                    stroke="#0F0F14"
                    strokeWidth="1.4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </motion.div>

            {/* Featured badge */}
            {featured && (
              <div className="absolute bottom-3 left-3">
                <span className={cn(
                  'px-2.5 py-1 rounded-full',
                  'text-[10px] font-mono font-semibold uppercase tracking-wider',
                  'bg-white/95 backdrop-blur-sm',
                )}
                  style={{ color: accentColor }}
                >
                  ★ Featured
                </span>
              </div>
            )}
          </div>

          {/* ── Card body ──────────────────────────────── */}
          <div className="flex flex-col flex-1 p-5 gap-3">

            {/* Client name */}
            <p className="text-[10px] font-mono text-ink-light uppercase tracking-wider">
              {client}
            </p>

            {/* Title */}
            <h3 className={cn(
              'font-display font-semibold text-ink',
              'leading-snug tracking-[-0.02em]',
              featured ? 'text-xl' : 'text-lg',
            )}>
              {title}
            </h3>

            {/* Tagline */}
            <p className="text-sm text-ink-muted leading-relaxed flex-1 line-clamp-2">
              {tagline}
            </p>

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

          {/* Bottom gradient line — animates in on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            style={{ background: gradient }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}

/* ─── Category display labels ────────────────────────────────── */
const CATEGORY_LABELS = {
  web:     'Web App',
  mobile:  'Mobile',
  ai:      'AI / ML',
  cms:     'CMS',
  backend: 'Backend',
}
