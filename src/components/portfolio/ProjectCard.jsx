import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { transition } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   ProjectCard — Polished micro-interactions
   — whileHover uses spring (not just ease) for natural feel
   — Image scale uses same spring config as card lift
   — Arrow icon: spring scale + position
   — Bottom accent line: expo draw
   — Shadow interpolates with motion.div variants
═══════════════════════════════════════════════════════════════ */

const CATEGORY_LABELS = {
  web:     'Web App',
  mobile:  'Mobile App',
  ai:      'AI / ML',
  cms:     'CMS',
  backend: 'Backend',
}

export default function ProjectCard({ project, featured = false, index = 0 }) {
  const { slug, title, tagline, tags, accentColor, category, year, client } = project

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.54, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      className="group"
    >
      <Link to={`/portfolio/${slug}`} aria-label={`View ${title} case study`} className="block h-full">
        <motion.div
          initial="rest"
          whileHover="hover"
          animate="rest"
          variants={{
            rest:  {
              y:          0,
              boxShadow:  '0 1px 3px rgba(13,13,18,0.05), 0 4px 16px rgba(13,13,18,0.05)',
              transition: transition.spring,
            },
            hover: {
              y:          -6,
              boxShadow:  '0 2px 8px rgba(13,13,18,0.07), 0 16px 48px rgba(13,13,18,0.10)',
              transition: transition.spring,
            },
          }}
          className={cn(
            'relative flex flex-col h-full',
            'bg-white rounded-2xl overflow-hidden',
            'border border-surface-200',
            'group-hover:border-surface-300',
            'transition-[border-color] duration-[260ms]',
          )}
        >

          {/* ── Image area ─────────────────────────────── */}
          <div className={cn(
            'relative overflow-hidden shrink-0',
            featured ? 'h-[248px] sm:h-[268px]' : 'h-[200px] sm:h-[220px]',
          )}>
            {/* Solid accent bg — scales on hover */}
            <motion.div
              className="absolute inset-0"
              variants={{
                rest:  { scale: 1,    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
                hover: { scale: 1.05, transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] } },
              }}
              style={{ backgroundColor: accentColor }}
            />

            {/* Dot texture */}
            <div
              className="absolute inset-0 opacity-[0.10]"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.9) 1px, transparent 1px)',
                backgroundSize:  '18px 18px',
              }}
            />

            {/* Diagonal stripe */}
            <div
              className="absolute inset-0 opacity-[0.055]"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, rgba(255,255,255,0.8) 0, rgba(255,255,255,0.8) 1px, transparent 0, transparent 50%)',
                backgroundSize:  '12px 12px',
              }}
            />

            {/* UI skeleton */}
            <div className="absolute inset-0 flex flex-col justify-center items-start gap-2.5 px-8 opacity-[0.18]">
              <div className="w-3/4 h-2.5 rounded-full bg-white/80" />
              <div className="w-1/2 h-2   rounded-full bg-white/60" />
              <div className="w-2/3 h-2   rounded-full bg-white/50" />
              <div className="mt-2 flex gap-2">
                <div className="w-16 h-6 rounded-lg bg-white/60" />
                <div className="w-12 h-6 rounded-lg bg-white/40" />
              </div>
            </div>

            {/* Overlay vignette — softens bottom of image */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16"
              style={{ background: 'linear-gradient(to bottom, transparent, rgba(0,0,0,0.12))' }}
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

            {/* Arrow — spring scale + position reveal */}
            <motion.div
              variants={{
                rest:  { opacity: 0, scale: 0.72, x: 4, y: -4,
                         transition: { duration: 0.20 } },
                hover: { opacity: 1, scale: 1,    x: 0, y: 0,
                         transition: transition.springSnappy },
              }}
              className="absolute top-3 right-3 z-10"
            >
              <div className="w-8 h-8 rounded-full bg-white/92 backdrop-blur-sm flex items-center justify-center shadow-card">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                    stroke="#0D0D12" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>

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

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.slice(0, 4).map((tag) => (
                <span key={tag} className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-surface-100 border border-surface-200 text-ink-light">
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

          {/* Bottom accent line — solid, expo draw */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
            variants={{
              rest:  { scaleX: 0, transition: { duration: 0.28 } },
              hover: { scaleX: 1, transition: { duration: 0.40, ease: [0.16, 1, 0.3, 1] } },
            }}
            style={{ backgroundColor: accentColor }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
