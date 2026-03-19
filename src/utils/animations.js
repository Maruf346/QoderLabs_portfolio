/**
 * animations.js — Final premium animation system
 *
 * Coordinated timing constants ensure every section, card,
 * and micro-interaction feels part of a single cohesive rhythm.
 */

/* ═══════════════════════════════════════════════════════════════
   EASING LIBRARY
═══════════════════════════════════════════════════════════════ */
export const ease = {
  smooth:  [0.4,  0,    0.2,  1],   // Material standard
  expo:    [0.16, 1,    0.3,  1],   // Premium decelerate — primary
  snappy:  [0.25, 0.46, 0.45, 0.94],
  spring:  [0.34, 1.56, 0.64, 1],   // Slight overshoot
  easeIn:  [0.4,  0,    1,    1],   // Exits
  easeOut: [0,    0,    0.2,  1],   // Enters
}

/* ═══════════════════════════════════════════════════════════════
   COORDINATED TIMING SYSTEM
   Use these constants to keep all sections in rhythm.
   ─────────────────────────────────────────────────────────────
   sectionDelay  — page-level stagger between major sections
   childDelay    — delay per child inside a stagger container
   hoverDuration — consistent hover interaction speed
   exitDuration  — consistent exit / unmount speed
═══════════════════════════════════════════════════════════════ */
export const timing = {
  // Section entrance
  sectionDuration: 0.60,
  sectionDelay:    0.06,   // Between major sections on mount

  // Child stagger
  childDelay:      0.08,   // Default between stagger children
  childFast:       0.05,   // Dense grids
  childSlow:       0.14,   // Hero / large text

  // Interaction
  hoverDuration:   0.22,
  pressDuration:   0.12,
  focusDuration:   0.18,

  // Exit
  exitDuration:    0.26,
}

/* ═══════════════════════════════════════════════════════════════
   FADE VARIANTS
═══════════════════════════════════════════════════════════════ */

export const fadeIn = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.50, ease: ease.expo } },
  exit:    { opacity: 0, transition: { duration: timing.exitDuration, ease: ease.easeIn } },
}

export const fadeInScale = {
  hidden:  { opacity: 0, scale: 0.97 },
  visible: { opacity: 1, scale: 1,   transition: { duration: 0.52, ease: ease.expo } },
  exit:    { opacity: 0, scale: 0.97, transition: { duration: timing.exitDuration, ease: ease.easeIn } },
}

/* ═══════════════════════════════════════════════════════════════
   SLIDE VARIANTS
═══════════════════════════════════════════════════════════════ */

export const slideUp = {
  hidden:  { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: timing.sectionDuration, ease: ease.expo } },
  exit:    { opacity: 0, y: 10, transition: { duration: timing.exitDuration, ease: ease.easeIn } },
}

export const slideUpSoft = {
  hidden:  { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.50, ease: ease.expo } },
  exit:    { opacity: 0, y: 6,  transition: { duration: 0.22, ease: ease.easeIn } },
}

/** Hero text reveal — larger offset, blur-to-sharp */
export const fadeInUp = {
  hidden:  { opacity: 0, y: 30, filter: 'blur(3px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.68, ease: ease.expo },
  },
  exit: { opacity: 0, y: 12, transition: { duration: timing.exitDuration, ease: ease.easeIn } },
}

export const fadeInDown = {
  hidden:  { opacity: 0, y: -22, filter: 'blur(2px)' },
  visible: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.55, ease: ease.expo } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.22, ease: ease.easeIn } },
}

export const slideDown = {
  hidden:  { opacity: 0, y: -18 },
  visible: { opacity: 1, y: 0,  transition: { duration: 0.45, ease: ease.expo } },
  exit:    { opacity: 0, y: -10, transition: { duration: 0.22, ease: ease.easeIn } },
}

export const slideInLeft = {
  hidden:  { opacity: 0, x: -32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.58, ease: ease.expo } },
  exit:    { opacity: 0, x: -16, transition: { duration: 0.24, ease: ease.easeIn } },
}

export const slideInRight = {
  hidden:  { opacity: 0, x: 32 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.58, ease: ease.expo } },
  exit:    { opacity: 0, x: 16, transition: { duration: 0.24, ease: ease.easeIn } },
}

/* ═══════════════════════════════════════════════════════════════
   STAGGER CONTAINERS — coordinated with timing system
═══════════════════════════════════════════════════════════════ */

export const staggerContainer = {
  hidden:  {},
  visible: { transition: { staggerChildren: timing.childDelay, delayChildren: 0.05 } },
}

export const staggerFast = {
  hidden:  {},
  visible: { transition: { staggerChildren: timing.childFast,  delayChildren: 0.03 } },
}

export const staggerSlow = {
  hidden:  {},
  visible: { transition: { staggerChildren: timing.childSlow,  delayChildren: 0.10 } },
}

/* ═══════════════════════════════════════════════════════════════
   HOVER / LIFT VARIANTS — consistent timing.hoverDuration
═══════════════════════════════════════════════════════════════ */

export const liftHover = {
  rest:  {
    y:         0,
    boxShadow: '0 1px 3px rgba(13,13,18,0.05), 0 4px 16px rgba(13,13,18,0.05)',
    transition: { duration: timing.hoverDuration, ease: ease.smooth },
  },
  hover: {
    y:         -4,
    boxShadow: '0 2px 8px rgba(13,13,18,0.06), 0 12px 40px rgba(13,13,18,0.09)',
    transition: { duration: timing.hoverDuration, ease: ease.smooth },
  },
}

export const hoverLift = {
  rest:  { scale: 1,    y: 0,  transition: { duration: timing.hoverDuration, ease: ease.smooth } },
  hover: { scale: 1.02, y: -3, transition: { duration: timing.hoverDuration, ease: ease.smooth } },
  tap:   { scale: 0.97, y: 0,  transition: { duration: timing.pressDuration } },
}

export const scaleHover = {
  rest:  { scale: 1,    transition: { duration: timing.hoverDuration, ease: ease.smooth } },
  hover: { scale: 1.03, transition: { duration: timing.hoverDuration, ease: ease.smooth } },
  tap:   { scale: 0.97, transition: { duration: timing.pressDuration } },
}

/* ═══════════════════════════════════════════════════════════════
   PAGE TRANSITION
═══════════════════════════════════════════════════════════════ */

export const pageTransition = {
  hidden: { opacity: 0, y: 10 },
  visible: {
    opacity: 1, y: 0,
    transition: {
      duration:        0.45,
      ease:            ease.expo,
      when:            'beforeChildren',
      staggerChildren: timing.sectionDelay,
    },
  },
  exit: { opacity: 0, y: -6, transition: { duration: 0.28, ease: ease.easeIn } },
}

/* ═══════════════════════════════════════════════════════════════
   VIEWPORT CONFIGS
═══════════════════════════════════════════════════════════════ */
export const viewport = {
  default: { once: true, margin: '-68px'  },
  early:   { once: true, margin: '-32px'  },
  late:    { once: true, margin: '-110px' },
}

/* ═══════════════════════════════════════════════════════════════
   TRANSITION PRESETS
═══════════════════════════════════════════════════════════════ */
export const transition = {
  fast:         { duration: timing.focusDuration,  ease: ease.smooth },
  base:         { duration: 0.32,                  ease: ease.smooth },
  slow:         { duration: 0.58,                  ease: ease.smooth },
  expo:         { duration: timing.sectionDuration, ease: ease.expo  },
  spring:       { type: 'spring', stiffness: 440, damping: 36, mass: 0.75 },
  springSnappy: { type: 'spring', stiffness: 520, damping: 30, mass: 0.65 },
  springBouncy: { type: 'spring', stiffness: 340, damping: 22, mass: 0.90 },
  springGentle: { type: 'spring', stiffness: 280, damping: 30, mass: 1.00 },
}
