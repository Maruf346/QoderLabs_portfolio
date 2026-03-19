import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer, slideUp } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Project Hero
   — Full page header for a single project
   — NO gradients — all solid colors
   — Back nav, category pill, title, tagline, tags, meta row
   — Solid accent color from project.accentColor
═══════════════════════════════════════════════════════════════ */

const CATEGORY_LABELS = {
  web:     'Web App',
  mobile:  'Mobile App',
  ai:      'AI / Automation',
  cms:     'CMS Platform',
  backend: 'Backend / API',
}

export default function ProjectHero({ project }) {
  const { title, tagline, tags, category, year, client, accentColor, link } = project

  return (
    <section className="relative pt-32 pb-14 md:pt-40 md:pb-18 bg-surface-50 overflow-hidden">

      {/* Dot grid — solid ink, very faint */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0F0F14 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Solid bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-surface-200" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-3xl"
        >
          {/* Back link */}
          <motion.div variants={slideUp} className="mb-8">
            <Link
              to="/portfolio"
              className={cn(
                'inline-flex items-center gap-2',
                'text-sm font-medium font-body text-ink-muted',
                'hover:text-ink transition-colors duration-150',
                'group',
              )}
            >
              <motion.span
                className="inline-block"
                animate={{ x: [0, -3, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden="true"
              >
                ←
              </motion.span>
              Back to all projects
            </Link>
          </motion.div>

          {/* Category + year pills — solid bg, no gradient */}
          <motion.div variants={slideUp} className="flex items-center gap-2 mb-5">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-medium"
              style={{
                background: `${accentColor}14`,
                color:       accentColor,
                border:      `1px solid ${accentColor}28`,
              }}
            >
              {CATEGORY_LABELS[category] ?? category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface-200 text-ink-muted border border-surface-300">
              {year}
            </span>
            {project.featured && (
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                style={{
                  background: `${accentColor}14`,
                  color:       accentColor,
                  border:      `1px solid ${accentColor}28`,
                }}
              >
                Featured
              </span>
            )}
          </motion.div>

          {/* Title — solid ink, no gradient */}
          <motion.h1
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-[clamp(2.2rem,5.5vw,3.8rem)]',
              'leading-[1.06] tracking-[-0.036em]',
              'mb-4',
            )}
          >
            {title}
          </motion.h1>

          {/* Tagline */}
          <motion.p
            variants={slideUp}
            className="text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed mb-7"
          >
            {tagline}
          </motion.p>

          {/* Tech tags */}
          <motion.div variants={slideUp} className="flex flex-wrap gap-1.5 mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white border border-surface-200 text-ink-muted shadow-card"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Meta row: client + live link */}
          <motion.div
            variants={slideUp}
            className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-8 pt-5 border-t border-surface-200"
          >
            {/* Client */}
            <div className="flex flex-col gap-0.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-ink-light">Client</p>
              <p className="text-sm font-medium font-body text-ink">{client}</p>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-surface-200" />

            {/* Year */}
            <div className="flex flex-col gap-0.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-ink-light">Year</p>
              <p className="text-sm font-medium font-body text-ink">{year}</p>
            </div>

            {/* Divider */}
            <div className="hidden sm:block w-px h-8 bg-surface-200" />

            {/* Category */}
            <div className="flex flex-col gap-0.5">
              <p className="text-[10px] font-mono uppercase tracking-wider text-ink-light">Type</p>
              <p className="text-sm font-medium font-body text-ink">{CATEGORY_LABELS[category] ?? category}</p>
            </div>

            {/* Live link — if available */}
            {link && (
              <>
                <div className="hidden sm:block w-px h-8 bg-surface-200" />
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'inline-flex items-center gap-1.5',
                    'text-sm font-medium font-body',
                    'transition-colors duration-150',
                  )}
                  style={{ color: accentColor }}
                >
                  View live
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                    <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                      stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </a>
              </>
            )}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
