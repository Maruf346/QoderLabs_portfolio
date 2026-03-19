/**
 * animations.js — Premium animation system
 *
 * All easing curves tuned for a high-end, natural-motion feel.
 * Import what you need and pass directly to Framer Motion.
 *
 * Usage:
 *   import { fadeIn, slideUp, staggerContainer } from '@utils/animations'
 *   <motion.div variants={fadeIn} initial="hidden" whileInView="visible">
 */

/* ─── Easing library ─────────────────────────────────────────── */
export const ease = {
  // Smooth deceleration — default for most reveals
  smooth:   [0.4,  0,    0.2, 1],
  // Expo decelerate — fast start, very graceful settle
  expo:     [0.16, 1,    0.3, 1],
  // Snappy — quick, confident
  snappy:   [0.25, 0.46, 0.45, 0.94],
  // Spring — slight overshoot, lively
  spring:   [0.34, 1.56, 0.64, 1],
  // In → for exits
  easeIn:   [0.4,  0,    1,   1],
  // Out → for enters
  easeOut:  [0,    0,    0.2, 1],
}

/* ═══════════════════════════════════════════════════════════════
   FADE VARIANTS
═══════════════════════════════════════════════════════════════ */

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: ease.smooth } },
  exit:    { opacity: 0, transition: { duration: 0.28, ease: ease.easeIn } },
}

export const fadeInScale = {
  hidden:  { opacity: 0, scale: 0.96 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: ease.expo } },
  exit:    { opacity: 0, scale: 0.97, transition: { duration: 0.24, ease: ease.easeIn } },
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE VARIANTS — expo easing for premium feel
═══════════════════════════════════════════════════════════════ */

export const slideUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: ease.expo } },
  exit:    { opacity: 0, y: 10, transition: { duration: 0.28, ease: ease.easeIn } },
}

export const slideUpSoft = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: ease.expo } },
  exit:    { opacity: 0, y: 6,  transition: { duration: 0.22, ease: ease.easeIn } },
}

/** Alias — used in hero sections */
export const fadeInUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: ease.expo } },
  exit:    { opacity: 0, y: 12, transition: { duration: 0.28, ease: ease.easeIn } },
}

export const fadeInDown = {
  hidden:  { opacity: 0, y: -22 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: ease.expo } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.25, ease: ease.easeIn } },
}

export const slideDown = {
  hidden:  { opacity: 0, y: -18 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: ease.expo } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.22, ease: ease.easeIn } },
}

export const slideInLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: ease.expo } },
  exit:    { opacity: 0, x: -16, transition: { duration: 0.24, ease: ease.easeIn } },
}

export const slideInRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.55, ease: ease.expo } },
  exit:    { opacity: 0, x: 16, transition: { duration: 0.24, ease: ease.easeIn } },
}

/* ═══════════════════════════════════════════════════════════════
   STAGGER CONTAINERS
═══════════════════════════════════════════════════════════════ */

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.10, delayChildren: 0.05 } },
}

/** Fast stagger — dense grids, tag lists */
export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.055, delayChildren: 0.03 } },
}

/** Slow stagger — hero text reveals, large sections */
export const staggerSlow = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.10 } },
}

/* ═══════════════════════════════════════════════════════════════
   HOVER / INTERACTION VARIANTS
═══════════════════════════════════════════════════════════════ */

/** Lift on hover — cards */
export const liftHover = {
  rest:  {
    y:         0,
    boxShadow: '0 1px 3px rgba(13,13,18,0.05), 0 4px 16px rgba(13,13,18,0.05)',
    transition: { duration: 0.25, ease: ease.smooth },
  },
  hover: {
    y:         -4,
    boxShadow: '0 2px 8px rgba(13,13,18,0.06), 0 12px 40px rgba(13,13,18,0.09)',
    transition: { duration: 0.25, ease: ease.smooth },
  },
}

/** Subtle scale lift — for interactive elements */
export const hoverLift = {
  rest:  { scale: 1,    y: 0,  transition: { duration: 0.22, ease: ease.smooth } },
  hover: { scale: 1.02, y: -2, transition: { duration: 0.22, ease: ease.smooth } },
  tap:   { scale: 0.97, y: 0,  transition: { duration: 0.12 } },
}

/** Scale hover — for buttons */
export const scaleHover = {
  rest:  { scale: 1,    transition: { duration: 0.18, ease: ease.smooth } },
  hover: { scale: 1.03, transition: { duration: 0.18, ease: ease.smooth } },
  tap:   { scale: 0.97, transition: { duration: 0.10 } },
}

/* ═══════════════════════════════════════════════════════════════
   PAGE TRANSITIONS
═══════════════════════════════════════════════════════════════ */

export const pageTransition = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration:       0.45,
      ease:           ease.expo,
      when:           'beforeChildren',
      staggerChildren: 0.07,
    },
  },
  exit: {
    opacity: 0,
    y: -6,
    transition: { duration: 0.28, ease: ease.easeIn },
  },
}

/* ═══════════════════════════════════════════════════════════════
   VIEWPORT CONFIGS
═══════════════════════════════════════════════════════════════ */
export const viewport = {
  default: { once: true, margin: '-72px'  },
  early:   { once: true, margin: '-36px'  },
  late:    { once: true, margin: '-120px' },
}

/* ═══════════════════════════════════════════════════════════════
   TRANSITION PRESETS — pass directly to `transition` prop
═══════════════════════════════════════════════════════════════ */
export const transition = {
  fast:          { duration: 0.18, ease: ease.smooth },
  base:          { duration: 0.32, ease: ease.smooth },
  slow:          { duration: 0.58, ease: ease.smooth },
  expo:          { duration: 0.60, ease: ease.expo   },
  spring:        { type: 'spring', stiffness: 420, damping: 36, mass: 0.8  },
  springSnappy:  { type: 'spring', stiffness: 520, damping: 30, mass: 0.65 },
  springBouncy:  { type: 'spring', stiffness: 340, damping: 22, mass: 0.9  },
  springGentle:  { type: 'spring', stiffness: 280, damping: 30, mass: 1.0  },
}
