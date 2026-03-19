import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   ProjectHero — Rewritten for reliability

   PREVIOUS BUG: Used staggerContainer + variants={slideUp} on
   children. When the page loads directly (not navigated from
   within the app), the stagger parent fires but children's
   whileInView may already be consumed before the parent
   animation propagates — leaving content stuck in hidden state.

   FIX: Every element uses its own direct initial/animate with
   a manual delay offset. No inherited variants. No stagger
   containers. This ALWAYS works regardless of navigation type.
═══════════════════════════════════════════════════════════════ */

const CATEGORY_LABELS = {
  web:     'Web App',
  mobile:  'Mobile App',
  ai:      'AI / Automation',
  cms:     'CMS Platform',
  backend: 'Backend / API',
}

/* Shared animation config — reused across all items */
const fadeUp = (delay = 0) => ({
  initial:    { opacity: 0, y: 20 },
  animate:    { opacity: 1, y: 0  },
  transition: { duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] },
})

export default function ProjectHero({ project }) {
  if (!project) return null

  const {
    title, tagline, tags, category,
    year, client, accentColor, link, featured,
  } = project

  return (
    <section className="relative pt-32 pb-14 md:pt-40 md:pb-16 bg-surface-50 overflow-hidden">

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0D0D12 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Bottom rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-surface-200" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="max-w-3xl">

          {/* Back link */}
          <motion.div {...fadeUp(0)}>
            <Link
              to="/portfolio"
              className="inline-flex items-center gap-2 text-sm font-medium font-body text-ink-muted hover:text-ink transition-colors duration-150 mb-8 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-150">←</span>
              Back to all projects
            </Link>
          </motion.div>

          {/* Category + year + featured pills */}
          <motion.div {...fadeUp(0.08)} className="flex items-center gap-2 flex-wrap mt-8 mb-5">
            <span
              className="px-3 py-1 rounded-full text-xs font-mono font-medium"
              style={{
                background: `${accentColor}18`,
                color:       accentColor,
                border:      `1px solid ${accentColor}30`,
              }}
            >
              {CATEGORY_LABELS[category] ?? category}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-mono font-medium bg-surface-200 text-ink-muted border border-surface-300">
              {year}
            </span>
            {featured && (
              <span
                className="px-3 py-1 rounded-full text-xs font-mono font-semibold"
                style={{
                  background: `${accentColor}18`,
                  color:       accentColor,
                  border:      `1px solid ${accentColor}30`,
                }}
              >
                ★ Featured
              </span>
            )}
          </motion.div>

          {/* Title */}
          <motion.h1
            {...fadeUp(0.14)}
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
            {...fadeUp(0.20)}
            className="text-base sm:text-lg md:text-xl text-ink-muted leading-relaxed mb-7"
          >
            {tagline}
          </motion.p>

          {/* Tech tags */}
          <motion.div {...fadeUp(0.26)} className="flex flex-wrap gap-1.5 mb-8">
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-lg text-xs font-mono font-medium bg-white border border-surface-200 text-ink-muted shadow-card"
              >
                {tag}
              </span>
            ))}
          </motion.div>

          {/* Meta row */}
          <motion.div
            {...fadeUp(0.30)}
            className="flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8 pt-5 border-t border-surface-200"
          >
            <MetaItem label="Client"   value={client} />
            <Divider />
            <MetaItem label="Year"     value={String(year)} />
            <Divider />
            <MetaItem label="Type"     value={CATEGORY_LABELS[category] ?? category} />
            {link && (
              <>
                <Divider />
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium font-body hover:opacity-75 transition-opacity"
                  style={{ color: accentColor }}
                >
                  View live ↗
                </a>
              </>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

function MetaItem({ label, value }) {
  return (
    <div className="flex flex-col gap-0.5">
      <p className="text-[10px] font-mono uppercase tracking-wider text-ink-light">{label}</p>
      <p className="text-sm font-medium font-body text-ink">{value}</p>
    </div>
  )
}

function Divider() {
  return <div className="hidden sm:block w-px h-8 bg-surface-200 shrink-0" />
}
