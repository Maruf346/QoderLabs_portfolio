import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/**
 * Card
 *
 * Variants:
 *   default  — white bg, soft shadow, hover lift + glow border
 *   subtle   — surface-100 bg, minimal border, hover lift
 *   outlined — transparent bg, border, hover gradient border
 *   glass    — glassmorphism, blur bg
 *   gradient — soft brand gradient bg
 *
 * Usage:
 *   <Card>...</Card>
 *   <Card variant="glass" hover padding="lg">...</Card>
 *   <Card as="article" variant="outlined">...</Card>
 */

const variants = {
  default: [
    'bg-white',
    'border border-surface-200',
    'shadow-card',
  ].join(' '),

  subtle: [
    'bg-surface-100',
    'border border-surface-200',
  ].join(' '),

  outlined: [
    'bg-transparent',
    'border border-surface-300',
  ].join(' '),

  glass: [
    'bg-white/70',
    'backdrop-blur-xl',
    'border border-white/60',
    'shadow-card',
  ].join(' '),

  gradient: [
    'bg-gradient-soft',
    'border border-surface-200',
  ].join(' '),
}

const hoverVariants = {
  default:  'hover:shadow-card-hover hover:border-surface-300 hover:-translate-y-0.5',
  subtle:   'hover:bg-surface-200 hover:-translate-y-0.5',
  outlined: 'hover:border-ink/20 hover:-translate-y-0.5',
  glass:    'hover:bg-white/80 hover:-translate-y-0.5',
  gradient: 'hover:shadow-card hover:-translate-y-0.5',
}

const paddings = {
  none: '',
  sm:   'p-4',
  md:   'p-6',
  lg:   'p-8',
  xl:   'p-10',
}

export default function Card({
  children,
  variant   = 'default',
  padding   = 'md',
  hover     = true,
  animate   = false,
  className = '',
  as: Tag   = 'div',
  onClick,
  ...props
}) {
  const baseClasses = cn(
    'rounded-xl',
    'transition-all duration-300',
    variants[variant] ?? variants.default,
    paddings[padding] ?? paddings.md,
    hover && (hoverVariants[variant] ?? hoverVariants.default),
    onClick && 'cursor-pointer',
    className
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        whileHover={hover ? { y: -2 } : undefined}
        className={baseClasses}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <Tag className={baseClasses} onClick={onClick} {...props}>
      {children}
    </Tag>
  )
}

/* ─── Card sub-components ────────────────────────────────────── */

/** Card.Header — top section with optional border */
export function CardHeader({ children, className = '', divided = false }) {
  return (
    <div className={cn(
      'mb-4',
      divided && 'pb-4 border-b border-surface-200',
      className
    )}>
      {children}
    </div>
  )
}

/** Card.Body — main content area */
export function CardBody({ children, className = '' }) {
  return (
    <div className={cn('flex-1', className)}>
      {children}
    </div>
  )
}

/** Card.Footer — bottom section with optional border */
export function CardFooter({ children, className = '', divided = false }) {
  return (
    <div className={cn(
      'mt-4',
      divided && 'pt-4 border-t border-surface-200',
      className
    )}>
      {children}
    </div>
  )
}

/** Card.Icon — icon badge at top of card */
export function CardIcon({ children, color = 'blue', className = '' }) {
  const colorMap = {
    blue:   'bg-blue-50   text-brand-blue',
    green:  'bg-green-50  text-brand-green',
    red:    'bg-red-50    text-brand-red',
    amber:  'bg-amber-50  text-brand-amber',
    purple: 'bg-purple-50 text-brand-purple',
    teal:   'bg-teal-50   text-brand-teal',
    ink:    'bg-surface-200 text-ink',
  }
  return (
    <div className={cn(
      'inline-flex items-center justify-center',
      'w-11 h-11 rounded-xl mb-4',
      colorMap[color] ?? colorMap.blue,
      className
    )}>
      {children}
    </div>
  )
}

/**
 * FeatureCard — pre-composed card for feature/service listings
 *
 * Usage:
 *   <FeatureCard
 *     icon={<SomeIcon />}
 *     iconColor="green"
 *     title="Performance"
 *     description="Fast by default, optimised for production."
 *   />
 */
export function FeatureCard({ icon, iconColor, title, description, className, ...props }) {
  return (
    <Card animate hover className={cn('flex flex-col', className)} {...props}>
      {icon && <CardIcon color={iconColor}>{icon}</CardIcon>}
      {title && (
        <h3 className="font-display font-semibold text-lg text-ink mb-2 leading-snug">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-ink-muted leading-relaxed">
          {description}
        </p>
      )}
    </Card>
  )
}
