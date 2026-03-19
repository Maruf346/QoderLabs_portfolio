import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer, slideUp, slideInLeft, slideInRight, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   ServiceSection
   Reusable section block for each service.
   Alternating layout: visual panel left/right per service.

   Props:
     service  — service data object (see SERVICES in Services.jsx)
     index    — used for alternating layout + stagger delay
     isLast   — suppresses bottom divider on final item
═══════════════════════════════════════════════════════════════ */

export default function ServiceSection({ service, index, isLast = false }) {
  const {
    id, icon: Icon, color, colorBg, colorBorder,
    title, tagline, description, features, tags, cta,
  } = service

  const isEven = index % 2 === 0

  return (
    <div
      id={id}
      className={cn(
        'relative scroll-mt-24',
        !isLast && 'border-b border-surface-100',
      )}
    >
      <div className="py-20 md:py-28">
        <div
          className={cn(
            'grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center',
            !isEven && 'lg:[&>*:first-child]:order-2',
          )}
        >

          {/* ── Text column ──────────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
            className="flex flex-col gap-6"
          >
            {/* Service number + icon */}
            <motion.div variants={slideUp} className="flex items-center gap-3">
              <div
                className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: colorBg, border: `1px solid ${colorBorder}` }}
              >
                <Icon color={color} />
              </div>
              <span
                className="text-xs font-mono font-medium uppercase tracking-[0.14em]"
                style={{ color }}
              >
                0{index + 1} — {title}
              </span>
            </motion.div>

            {/* Title */}
            <motion.h2
              variants={slideUp}
              className={cn(
                'font-display font-bold text-ink',
                'text-3xl sm:text-4xl md:text-[2.6rem]',
                'leading-[1.08] tracking-[-0.032em]',
              )}
            >
              {tagline}
            </motion.h2>

            {/* Description */}
            <motion.p
              variants={slideUp}
              className="text-base md:text-lg text-ink-muted leading-relaxed"
            >
              {description}
            </motion.p>

            {/* Features list */}
            <motion.ul variants={staggerContainer} className="flex flex-col gap-2.5">
              {features.map((feature, i) => (
                <motion.li
                  key={i}
                  variants={slideUp}
                  className="flex items-start gap-3"
                >
                  <span
                    className="mt-[3px] w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                    style={{ background: colorBg }}
                    aria-hidden="true"
                  >
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                      <path d="M1.5 4l2 2 3-3.5"
                        stroke={color} strokeWidth="1.3"
                        strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                  <span className="text-sm text-ink-muted leading-relaxed">{feature}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Tech tags */}
            <motion.div variants={slideUp} className="flex flex-wrap gap-1.5">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2.5 py-1 rounded-lg text-[11px] font-mono font-medium bg-surface-100 border border-surface-200 text-ink-light"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div variants={slideUp}>
              <Link
                to="/contact"
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-6 py-3 rounded-xl',
                  'text-sm font-medium font-body text-white',
                  'transition-all duration-200',
                  'shadow-lift hover:shadow-lift-hover',
                )}
                style={{ background: color }}
              >
                {cta}
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 6.5h9M7.5 2.5l4 4-4 4"
                    stroke="currentColor" strokeWidth="1.5"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </Link>
            </motion.div>
          </motion.div>

          {/* ── Visual panel ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, x: isEven ? 24 : -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport.default}
            transition={{ duration: 0.65, ease: [0.4, 0, 0.2, 1] }}
          >
            <ServiceVisual service={service} />
          </motion.div>
        </div>
      </div>
    </div>
  )
}

/* ─── Visual Panel ───────────────────────────────────────────── */
function ServiceVisual({ service }) {
  const { icon: Icon, color, colorBg, colorBorder, title, features, tags } = service

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'relative rounded-2xl overflow-hidden',
        'border border-surface-200',
        'shadow-card hover:shadow-card-hover',
        'transition-shadow duration-300',
        'bg-white',
        'p-7',
        'group',
      )}
    >
      {/* Inner glow */}
      <div
        className="absolute inset-0 rounded-2xl pointer-events-none opacity-40"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 10% 0%, ${colorBg} 0%, transparent 65%)`,
        }}
      />

      {/* Top bar — mock window chrome */}
      <div className="relative flex items-center gap-1.5 mb-6 pb-4 border-b border-surface-100">
        <div className="w-2.5 h-2.5 rounded-full bg-surface-300" />
        <div className="w-2.5 h-2.5 rounded-full bg-surface-200" />
        <div className="w-2.5 h-2.5 rounded-full bg-surface-200" />
        <div className="ml-3 flex-1 h-5 rounded-md bg-surface-100" />
      </div>

      {/* Content grid mock */}
      <div className="relative flex flex-col gap-4">
        {/* Large icon + title */}
        <div className="flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ background: colorBg, border: `1px solid ${colorBorder}` }}
          >
            <Icon color={color} size={22} />
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-3 rounded bg-ink/8 w-28" style={{ backgroundColor: 'rgba(15,15,20,0.08)' }} />
            <div className="h-2.5 rounded w-20" style={{ backgroundColor: 'rgba(15,15,20,0.05)' }} />
          </div>
        </div>

        {/* Feature rows */}
        {features.slice(0, 4).map((feature, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span
              className="w-5 h-5 rounded-full flex items-center justify-center shrink-0"
              style={{ background: colorBg }}
            >
              <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden="true">
                <path d="M1.5 4l2 2 3-3.5"
                  stroke={color} strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </span>
            <div
              className="h-2.5 rounded flex-1"
              style={{
                backgroundColor: 'rgba(15,15,20,0.06)',
                width: `${70 + (i % 3) * 10}%`,
                maxWidth: '100%',
              }}
            />
          </div>
        ))}

        {/* Tag strip */}
        <div className="flex flex-wrap gap-1.5 pt-2">
          {tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-lg text-[10px] font-mono font-medium"
              style={{
                background: colorBg,
                color,
                border: `1px solid ${colorBorder}`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Animated bottom accent */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }}
      />
    </motion.div>
  )
}
