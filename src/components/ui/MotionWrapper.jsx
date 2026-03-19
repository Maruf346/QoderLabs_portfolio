import { motion } from 'framer-motion'
import {
  fadeIn, fadeInScale, fadeInUp, fadeInDown,
  slideUp, slideUpSoft, slideDown,
  slideInLeft, slideInRight,
  staggerContainer, staggerFast, staggerSlow,
  viewport as defaultViewport,
  ease,
} from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   MotionWrapper — Upgraded flexible animation wrapper

   Props:
     preset      — animation name (see PRESETS below)
     delay       — seconds to delay entrance (default 0)
     duration    — override duration in seconds
     viewportKey — 'default' | 'early' | 'late'
     once        — only animate once (default true)
     as          — HTML element tag (default 'div')
     animate     — false = render static, no motion (default true)
     className / style — passed through

   Usage:
     <MotionWrapper preset="slideUp" delay={0.15}>
       <Card />
     </MotionWrapper>

     <MotionWrapper preset="stagger" as="ul">
       <MotionItem as="li">Item 1</MotionItem>
       <MotionItem as="li">Item 2</MotionItem>
     </MotionWrapper>
═══════════════════════════════════════════════════════════════ */

const PRESETS = {
  fadeIn,
  fadeInScale,
  fadeInUp,
  fadeInDown,
  slideUp,
  slideUpSoft,
  slideDown,
  slideInLeft,
  slideInRight,
  stagger:     staggerContainer,
  staggerFast,
  staggerSlow,
}

const VIEWPORT_MAP = {
  default: defaultViewport.default,
  early:   defaultViewport.early,
  late:    defaultViewport.late,
}

export default function MotionWrapper({
  children,
  preset      = 'slideUp',
  delay       = 0,
  duration,
  viewportKey = 'default',
  once        = true,
  as          = 'div',
  animate     = true,
  className   = '',
  style       = {},
  ...props
}) {
  // Static fallback when animations disabled (reduced motion, etc.)
  if (!animate) {
    const Tag = as
    return <Tag className={className} style={style} {...props}>{children}</Tag>
  }

  const base = PRESETS[preset] ?? PRESETS.slideUp
  const vp   = { ...(VIEWPORT_MAP[viewportKey] ?? VIEWPORT_MAP.default), once }

  // Merge delay/duration overrides into the visible transition
  const finalVariants = (delay || duration)
    ? {
        ...base,
        visible: {
          ...base.visible,
          transition: {
            ...(base.visible?.transition ?? {}),
            ...(delay    ? { delay }    : {}),
            ...(duration ? { duration } : {}),
          },
        },
      }
    : base

  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      variants={finalVariants}
      initial="hidden"
      whileInView="visible"
      exit="exit"
      viewport={vp}
      className={className}
      style={style}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

/* ─── MotionItem ─────────────────────────────────────────────── */
/**
 * Direct child of a MotionWrapper with preset="stagger*".
 * Inherits parent stagger timing automatically.
 */
export function MotionItem({
  children,
  preset    = 'slideUpSoft',
  as        = 'div',
  className = '',
  ...props
}) {
  const variants  = PRESETS[preset] ?? PRESETS.slideUpSoft
  const MotionTag = motion[as] ?? motion.div
  return (
    <MotionTag variants={variants} className={className} {...props}>
      {children}
    </MotionTag>
  )
}

/* ─── MotionSection ──────────────────────────────────────────── */
export function MotionSection({ children, preset = 'fadeIn', className = '', ...props }) {
  return (
    <MotionWrapper as="section" preset={preset} className={className} {...props}>
      {children}
    </MotionWrapper>
  )
}

/* ─── MotionHeading — word-by-word stagger ───────────────────── */
/**
 * Animates each word of a heading individually for a premium reveal.
 *
 * Usage:
 *   <MotionHeading as="h1" className="display-xl">
 *     We build premium software
 *   </MotionHeading>
 */
export function MotionHeading({
  children,
  as:           Tag          = 'h2',
  className                  = '',
  wordDelay                  = 0.055,
  initialDelay               = 0.05,
  ...props
}) {
  const text = typeof children === 'string' ? children : null

  // Fallback: whole-element slide if not a plain string
  if (!text) {
    return (
      <MotionWrapper as={Tag} preset="slideUp" className={className} {...props}>
        {children}
      </MotionWrapper>
    )
  }

  const words = text.split(' ')

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport.default}
      className={cn('overflow-hidden', className)}
      {...props}
    >
      <Tag className="flex flex-wrap gap-x-[0.25em] gap-y-1">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden:  { opacity: 0, y: '55%', filter: 'blur(4px)' },
              visible: {
                opacity: 1,
                y:       '0%',
                filter:  'blur(0px)',
                transition: {
                  duration: 0.55,
                  delay:    initialDelay + i * wordDelay,
                  ease:     ease.expo,
                },
              },
            }}
            style={{ display: 'inline-block' }}
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  )
}
