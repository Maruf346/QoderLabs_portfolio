/**
 * animations.js
 *
 * Centralised Framer Motion variant definitions.
 * Import what you need and pass to motion components.
 *
 * Usage:
 *   import { fadeIn, slideUp, staggerContainer } from '@utils/animations'
 *
 *   <motion.div variants={fadeIn} initial="hidden" animate="visible">
 *   <motion.ul variants={staggerContainer} initial="hidden" whileInView="visible">
 *     <motion.li variants={slideUp}>...</motion.li>
 *   </motion.ul>
 */

/* ─── Shared easing curves ───────────────────────────────────── */
export const ease = {
  smooth:   [0.4,  0,    0.2,  1],
  spring:   [0.34, 1.56, 0.64, 1],
  easeOut:  [0,    0,    0.2,  1],
  easeIn:   [0.4,  0,    1,    1],
  snappy:   [0.25, 0.46, 0.45, 0.94],
}

/* ═══════════════════════════════════════════════════════════════
   FADE VARIANTS
═══════════════════════════════════════════════════════════════ */

/** Simple opacity fade */
export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.5, ease: ease.smooth },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.3, ease: ease.easeIn },
  },
}

/** Fade in with very slight scale — premium feel */
export const fadeInScale = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: {
    opacity: 1,
    scale:   1,
    transition: { duration: 0.5, ease: ease.smooth },
  },
  exit: {
    opacity: 0,
    scale:   0.97,
    transition: { duration: 0.25, ease: ease.easeIn },
  },
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE VARIANTS
═══════════════════════════════════════════════════════════════ */

/** Slide up + fade — most common entrance */
export const slideUp = {
  hidden:  { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: ease.smooth },
  },
  exit: {
    opacity: 0,
    y: 12,
    transition: { duration: 0.3, ease: ease.easeIn },
  },
}

/** Slight slide up — subtler, for cards/items */
export const slideUpSoft = {
  hidden:  { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: ease.smooth },
  },
}

/** Slide down + fade — for dropdowns, drawers from top */
export const slideDown = {
  hidden:  { opacity: 0, y: -16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: ease.smooth },
  },
  exit: {
    opacity: 0,
    y: -10,
    transition: { duration: 0.25, ease: ease.easeIn },
  },
}

/** Slide in from left */
export const slideInLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
}

/** Slide in from right */
export const slideInRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.5, ease: ease.smooth },
  },
}

/* ═══════════════════════════════════════════════════════════════
   STAGGER CONTAINERS
   Pair with any item variant as children
═══════════════════════════════════════════════════════════════ */

/** Default stagger — 100ms between children */
export const staggerContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.10,
      delayChildren:    0.05,
    },
  },
}

/** Fast stagger — 60ms, for dense grids */
export const staggerFast = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.06,
      delayChildren:    0.04,
    },
  },
}

/** Slow stagger — 160ms, for hero text reveals */
export const staggerSlow = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  0.16,
      delayChildren:    0.1,
    },
  },
}

/* ═══════════════════════════════════════════════════════════════
   SCALE / HOVER VARIANTS
═══════════════════════════════════════════════════════════════ */

/** Subtle scale on hover — for cards, images */
export const scaleHover = {
  rest:  { scale: 1,    transition: { duration: 0.25, ease: ease.smooth } },
  hover: { scale: 1.02, transition: { duration: 0.25, ease: ease.smooth } },
  tap:   { scale: 0.97, transition: { duration: 0.15, ease: ease.smooth } },
}

/** Lift on hover — for cards */
export const liftHover = {
  rest:  { y: 0,  boxShadow: 'var(--shadow-card)',       transition: { duration: 0.25, ease: ease.smooth } },
  hover: { y: -4, boxShadow: 'var(--shadow-card-hover)', transition: { duration: 0.25, ease: ease.smooth } },
}

/** Button press */
export const buttonTap = {
  tap: { scale: 0.96, transition: { duration: 0.1 } },
}

/* ═══════════════════════════════════════════════════════════════
   PAGE TRANSITIONS
═══════════════════════════════════════════════════════════════ */

/** Full page enter/exit */
export const pageTransition = {
  hidden: {
    opacity: 0,
    y: 12,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.45,
      ease: ease.smooth,
      when: 'beforeChildren',
      staggerChildren: 0.08,
    },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.3, ease: ease.easeIn },
  },
}

/* ═══════════════════════════════════════════════════════════════
   VIEWPORT DEFAULTS
   Reusable viewport config for whileInView
═══════════════════════════════════════════════════════════════ */
export const viewport = {
  default: { once: true, margin: '-80px' },
  early:   { once: true, margin: '-40px' },
  late:    { once: true, margin: '-120px' },
}

/* ═══════════════════════════════════════════════════════════════
   TRANSITION PRESETS
   Pass to `transition` prop directly
═══════════════════════════════════════════════════════════════ */
export const transition = {
  fast:    { duration: 0.2,  ease: ease.smooth },
  base:    { duration: 0.35, ease: ease.smooth },
  slow:    { duration: 0.6,  ease: ease.smooth },
  spring:  { type: 'spring', stiffness: 420, damping: 36, mass: 0.8 },
  springSnappy: { type: 'spring', stiffness: 520, damping: 32, mass: 0.7 },
  springBouncy: { type: 'spring', stiffness: 360, damping: 24, mass: 0.9 },
}
