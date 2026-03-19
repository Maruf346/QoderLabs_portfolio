import { motion } from 'framer-motion'
import {
  fadeIn,
  fadeInScale,
  slideUp,
  slideUpSoft,
  slideDown,
  slideInLeft,
  slideInRight,
  staggerContainer,
  staggerFast,
  staggerSlow,
  viewport as defaultViewport,
} from '@utils/animations'
import { cn } from '@utils/cn'

/**
 * MotionWrapper
 *
 * A flexible wrapper that applies animation presets to any content.
 * Powered by Framer Motion whileInView for scroll-triggered reveals.
 *
 * Presets:
 *   fadeIn | fadeInScale | slideUp | slideUpSoft | slideDown
 *   slideInLeft | slideInRight | stagger | staggerFast | staggerSlow
 *
 * Props:
 *   preset      — animation preset name (default: 'slideUp')
 *   delay       — delay in seconds (default: 0)
 *   duration    — override duration in seconds
 *   viewport    — 'default' | 'early' | 'late' (default: 'default')
 *   triggerOnce — only animate once (default: true)
 *   as          — HTML element to render (default: 'div')
 *   animate     — if false, renders static (default: true)
 *   className   — additional classes
 *
 * Usage:
 *   <MotionWrapper preset="slideUp" delay={0.1}>
 *     <MyComponent />
 *   </MotionWrapper>
 *
 *   <MotionWrapper preset="stagger" as="ul">
 *     <MotionItem><li>Item 1</li></MotionItem>
 *     <MotionItem><li>Item 2</li></MotionItem>
 *   </MotionWrapper>
 */

const PRESETS = {
  fadeIn,
  fadeInScale,
  slideUp,
  slideUpSoft,
  slideDown,
  slideInLeft,
  slideInRight,
  stagger:     staggerContainer,
  staggerFast,
  staggerSlow,
}

const VIEWPORT = {
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
  triggerOnce = true,
  as          = 'div',
  animate     = true,
  className   = '',
  style       = {},
  ...props
}) {
  // Render static if animations disabled
  if (!animate) {
    const Tag = as
    return <Tag className={className} style={style} {...props}>{children}</Tag>
  }

  const variants = PRESETS[preset] ?? PRESETS.slideUp
  const vp = { ...(VIEWPORT[viewportKey] ?? VIEWPORT.default), once: triggerOnce }

  // Build transition override if delay or duration provided
  const customTransition = (delay || duration)
    ? {
        ...(variants.visible?.transition ?? {}),
        ...(delay    ? { delay }    : {}),
        ...(duration ? { duration } : {}),
      }
    : undefined

  // If custom transition, merge into visible variant
  const finalVariants = customTransition
    ? {
        ...variants,
        visible: {
          ...variants.visible,
          transition: customTransition,
        },
      }
    : variants

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
 * MotionItem
 *
 * Use as direct children of a MotionWrapper with preset="stagger".
 * Inherits parent stagger timing automatically.
 *
 * Usage:
 *   <MotionWrapper preset="stagger" as="ul">
 *     <MotionItem as="li">First item</MotionItem>
 *     <MotionItem as="li">Second item</MotionItem>
 *   </MotionWrapper>
 */
export function MotionItem({
  children,
  preset    = 'slideUpSoft',
  as        = 'div',
  className = '',
  ...props
}) {
  const variants = PRESETS[preset] ?? PRESETS.slideUpSoft
  const MotionTag = motion[as] ?? motion.div

  return (
    <MotionTag
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </MotionTag>
  )
}

/* ─── MotionSection ──────────────────────────────────────────── */
/**
 * MotionSection
 *
 * A <section> wrapper with built-in scroll-triggered animation.
 * Convenience alias for <MotionWrapper as="section">.
 */
export function MotionSection({
  children,
  preset    = 'fadeIn',
  className = '',
  ...props
}) {
  return (
    <MotionWrapper
      as="section"
      preset={preset}
      className={className}
      {...props}
    >
      {children}
    </MotionWrapper>
  )
}

/* ─── MotionHeading ──────────────────────────────────────────── */
/**
 * MotionHeading
 *
 * Animated heading with word-by-word stagger reveal.
 * Splits text into words and animates each one.
 *
 * Usage:
 *   <MotionHeading as="h1" className="display-xl">
 *     We build premium software
 *   </MotionHeading>
 */
export function MotionHeading({
  children,
  as          = 'h2',
  className   = '',
  staggerDelay = 0.06,
  ...props
}) {
  const Tag = as
  const text = typeof children === 'string' ? children : null

  if (!text) {
    // Fallback: no split, just slide up the whole element
    return (
      <MotionWrapper as={as} preset="slideUp" className={className} {...props}>
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
      <Tag className="flex flex-wrap gap-x-[0.28em] gap-y-1">
        {words.map((word, i) => (
          <motion.span
            key={i}
            variants={{
              hidden:  { opacity: 0, y: '60%' },
              visible: {
                opacity: 1,
                y: '0%',
                transition: {
                  duration: 0.5,
                  delay: i * staggerDelay,
                  ease: [0.4, 0, 0.2, 1],
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
