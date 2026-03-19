import { motion } from 'framer-motion'
import { cn } from '@utils/cn'
import Container from './Container'

/**
 * Section
 *
 * Standard page section with consistent vertical rhythm.
 * Optional eyebrow label, title, subtitle, and centered/left alignment.
 *
 * Props:
 *   eyebrow   — small mono label above the title (e.g. "Our Services")
 *   title     — section heading (string or JSX)
 *   subtitle  — body copy below the title
 *   align     — 'left' | 'center' (default: 'center')
 *   size      — Container size passthrough
 *   bg        — background variant: 'default' | 'subtle' | 'soft-gradient'
 *   noPadding — removes default vertical padding
 *   animate   — enables scroll-triggered fade-up (default: true)
 *
 * Usage:
 *   <Section eyebrow="What we do" title="Services that scale" subtitle="...">
 *     <YourContent />
 *   </Section>
 */

const bgVariants = {
  default:        'bg-surface-50',
  subtle:         'bg-surface-100',
  'soft-gradient':'bg-gradient-soft',
  white:          'bg-white',
  none:           '',
}

// Framer Motion variants for the header block
const headerVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
}

const childVariants = {
  hidden:  { opacity: 0, y: 16 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function Section({
  children,
  eyebrow,
  title,
  subtitle,
  align     = 'center',
  size      = 'xl',
  bg        = 'default',
  noPadding = false,
  animate   = true,
  className = '',
  innerClassName = '',
  as: Tag   = 'section',
  ...props
}) {
  const hasHeader  = eyebrow || title || subtitle
  const isCenter   = align === 'center'
  const MotionTag  = animate ? motion[Tag] ?? motion.section : Tag

  const motionProps = animate
    ? {
        initial:    'hidden',
        whileInView:'visible',
        viewport:   { once: true, margin: '-80px' },
      }
    : {}

  return (
    <MotionTag
      className={cn(
        !noPadding && 'py-20 md:py-28 lg:py-32',
        bgVariants[bg] ?? bgVariants.default,
        className
      )}
      {...motionProps}
      {...props}
    >
      <Container size={size} className={innerClassName}>

        {/* ── Section header ───────────────────────────────── */}
        {hasHeader && (
          <motion.div
            variants={animate ? headerVariants : undefined}
            className={cn(
              'mb-12 md:mb-16',
              isCenter ? 'text-center mx-auto max-w-2xl' : 'max-w-xl'
            )}
          >
            {/* Eyebrow */}
            {eyebrow && (
              <motion.p
                variants={animate ? childVariants : undefined}
                custom={0}
                className="eyebrow mb-3"
              >
                {eyebrow}
              </motion.p>
            )}

            {/* Title */}
            {title && (
              <motion.h2
                variants={animate ? childVariants : undefined}
                custom={1}
                className="font-display font-bold text-ink mb-4"
              >
                {title}
              </motion.h2>
            )}

            {/* Subtitle */}
            {subtitle && (
              <motion.p
                variants={animate ? childVariants : undefined}
                custom={2}
                className={cn(
                  'body-lg',
                  isCenter && 'mx-auto'
                )}
              >
                {subtitle}
              </motion.p>
            )}
          </motion.div>
        )}

        {/* ── Section body ─────────────────────────────────── */}
        {children}
      </Container>
    </MotionTag>
  )
}

/* ─── Stagger container for child elements ───────────────────── */
const staggerVariants = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren: 0.1,
      delayChildren:   0.1,
    },
  },
}

const staggerItemVariants = {
  hidden:  { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.4, 0, 0.2, 1] },
  },
}

/**
 * StaggerGrid
 * Wraps children in a stagger animation container.
 * Use inside a Section to animate grid/list children one by one.
 *
 * Usage:
 *   <StaggerGrid className="grid grid-cols-3 gap-6">
 *     <Card />
 *     <Card />
 *   </StaggerGrid>
 */
export function StaggerGrid({ children, className = '', ...props }) {
  return (
    <motion.div
      variants={staggerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}

/**
 * StaggerItem
 * Must be a direct child of StaggerGrid.
 */
export function StaggerItem({ children, className = '', ...props }) {
  return (
    <motion.div
      variants={staggerItemVariants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
