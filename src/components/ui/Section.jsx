import { motion } from 'framer-motion'
import { timing, ease, viewport as defaultViewport } from '@utils/animations'
import { cn } from '@utils/cn'
import Container from './Container'

/* ═══════════════════════════════════════════════════════════════
   Section — Final polish
   — Uses coordinated timing system from animations.js
   — Header entrance: stagger eyebrow → title → subtitle
   — All durations pulled from timing constants
   — bg variants include new 'white' + 'dark' options
   — StaggerGrid / StaggerItem re-exported for convenience
═══════════════════════════════════════════════════════════════ */

const bgVariants = {
  default:        'bg-[#F8F8FA]',
  subtle:         'bg-[#F2F2F6]',
  white:          'bg-white',
  'soft-gradient':'bg-brand-soft',
  dark:           'bg-[#0D0D12]',
  none:           '',
}

/* Coordinated section header variants */
const headerContainerVariants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: timing.childSlow,
      delayChildren:   0.04,
    },
  },
}

const headerItemVariants = {
  hidden:  { opacity: 0, y: 20, filter: 'blur(3px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: timing.sectionDuration, ease: ease.expo },
  },
}

export default function Section({
  children,
  eyebrow,
  title,
  subtitle,
  align           = 'center',
  size            = 'xl',
  bg              = 'default',
  noPadding       = false,
  animate         = true,
  className       = '',
  innerClassName  = '',
  eyebrowColor    = 'default',
  as: Tag         = 'section',
  ...props
}) {
  const hasHeader = eyebrow || title || subtitle
  const isCenter  = align === 'center'

  const eyebrowColors = {
    default: 'text-[#94949E]',
    blue:    'text-brand-blue',
    green:   'text-brand-green',
    red:     'text-brand-red',
    purple:  'text-brand-purple',
  }

  const MotionTag = animate ? motion[Tag] ?? motion.section : Tag

  const motionProps = animate
    ? {
        initial:     'hidden',
        whileInView: 'visible',
        viewport:    defaultViewport.default,
      }
    : {}

  return (
    <MotionTag
      className={cn(
        !noPadding && 'py-20 md:py-28 lg:py-32',
        bgVariants[bg] ?? bgVariants.default,
        className,
      )}
      {...(animate ? motionProps : {})}
      {...props}
    >
      <Container size={size} className={innerClassName}>

        {/* ── Section header ───────────────────────── */}
        {hasHeader && (
          <motion.div
            variants={animate ? headerContainerVariants : undefined}
            initial={animate ? 'hidden' : undefined}
            whileInView={animate ? 'visible' : undefined}
            viewport={animate ? defaultViewport.default : undefined}
            className={cn(
              'mb-12 md:mb-16',
              isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-xl',
            )}
          >
            {/* Eyebrow */}
            {eyebrow && (
              <motion.p
                variants={animate ? headerItemVariants : undefined}
                className={cn(
                  'inline-flex items-center gap-2',
                  'font-mono text-xs font-medium uppercase tracking-[0.15em]',
                  'mb-3',
                  eyebrowColors[eyebrowColor] ?? eyebrowColors.default,
                )}
              >
                <span
                  className="w-1.5 h-1.5 rounded-full bg-current opacity-60"
                  aria-hidden="true"
                />
                {eyebrow}
              </motion.p>
            )}

            {/* Title */}
            {title && (
              <motion.h2
                variants={animate ? headerItemVariants : undefined}
                className={cn(
                  'font-display font-bold text-[#0D0D12]',
                  'text-3xl sm:text-4xl md:text-[2.75rem]',
                  'leading-[1.09] tracking-[-0.032em]',
                  'mb-4',
                )}
              >
                {title}
              </motion.h2>
            )}

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                variants={animate ? headerItemVariants : undefined}
                className={cn(
                  'font-body text-base md:text-lg text-[#56566E] leading-[1.72]',
                  isCenter && 'mx-auto',
                )}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* ── Children ─────────────────────────────── */}
        {children}
      </Container>
    </MotionTag>
  )
}

/* ─── StaggerGrid ────────────────────────────────────────────── */
const staggerGridVariants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: timing.childDelay,
      delayChildren:   0.08,
    },
  },
}

const staggerItemVariants = {
  hidden:  { opacity: 0, y: 18, filter: 'blur(2px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.52, ease: ease.expo },
  },
}

export function StaggerGrid({ children, className = '', ...props }) {
  return (
    <motion.div
      variants={staggerGridVariants}
      initial="hidden"
      whileInView="visible"
      viewport={defaultViewport.default}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

export function StaggerItem({ children, className = '', ...props }) {
  return (
    <motion.div variants={staggerItemVariants} className={className} {...props}>
      {children}
    </motion.div>
  )
}
