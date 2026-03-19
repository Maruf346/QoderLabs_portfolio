import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/**
 * Button
 *
 * Variants:   primary | secondary | ghost | danger
 * Sizes:      sm | md | lg
 * Props:      loading, disabled, leftIcon, rightIcon, asChild
 *
 * Usage:
 *   <Button variant="primary" size="lg">Start a project</Button>
 *   <Button variant="secondary" leftIcon={<ArrowIcon />}>Learn more</Button>
 */

const variants = {
  primary: [
    // Gradient fill + glow on hover
    'relative overflow-hidden',
    'bg-ink text-white',
    'border border-transparent',
    'shadow-lift',
    'hover:shadow-lift-hover',
    'before:absolute before:inset-0',
    'before:bg-gradient-brand before:opacity-0',
    'hover:before:opacity-100',
    'before:transition-opacity before:duration-300',
    'active:scale-[0.97]',
  ].join(' '),

  secondary: [
    // Outlined, transparent fill — gradient border on hover
    'relative overflow-hidden',
    'bg-transparent text-ink',
    'border border-surface-300',
    'hover:border-ink/30',
    'hover:bg-surface-100',
    'active:scale-[0.97]',
  ].join(' '),

  ghost: [
    'bg-transparent text-ink-muted',
    'border border-transparent',
    'hover:bg-surface-100 hover:text-ink',
    'active:scale-[0.97]',
  ].join(' '),

  danger: [
    'bg-brand-red text-white',
    'border border-transparent',
    'shadow-lift',
    'hover:bg-brand-red/90 hover:shadow-lift-hover',
    'active:scale-[0.97]',
  ].join(' '),
}

const sizes = {
  sm: 'h-8  px-3.5 text-xs  gap-1.5 rounded-lg',
  md: 'h-10 px-5   text-sm  gap-2   rounded-xl',
  lg: 'h-12 px-7   text-sm  gap-2.5 rounded-xl',
  xl: 'h-14 px-8   text-base gap-3  rounded-xl',
}

const Button = forwardRef(function Button(
  {
    children,
    variant  = 'primary',
    size     = 'md',
    loading  = false,
    disabled = false,
    leftIcon,
    rightIcon,
    className,
    onClick,
    type     = 'button',
    ...props
  },
  ref
) {
  const isDisabled = disabled || loading

  return (
    <motion.button
      ref={ref}
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      whileTap={{ scale: isDisabled ? 1 : 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        // Base styles
        'inline-flex items-center justify-center',
        'font-body font-medium',
        'select-none cursor-pointer',
        'transition-all duration-200',
        'focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
        'focus-visible:outline-none',
        // Variant
        variants[variant] ?? variants.primary,
        // Size
        sizes[size] ?? sizes.md,
        // Disabled
        isDisabled && 'opacity-50 pointer-events-none cursor-not-allowed',
        className
      )}
      {...props}
    >
      {/* Left icon */}
      {leftIcon && !loading && (
        <span className="shrink-0 flex items-center">{leftIcon}</span>
      )}

      {/* Loading spinner */}
      {loading && (
        <span className="shrink-0 flex items-center">
          <svg
            className="animate-spin"
            width="14" height="14"
            viewBox="0 0 14 14"
            fill="none"
          >
            <circle
              cx="7" cy="7" r="5.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeDasharray="28"
              strokeDashoffset="10"
              strokeLinecap="round"
              opacity="0.4"
            />
            <path
              d="M7 1.5A5.5 5.5 0 0112.5 7"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </span>
      )}

      {/* Label — sits above the ::before gradient overlay */}
      <span className="relative z-10 whitespace-nowrap">
        {children}
      </span>

      {/* Right icon */}
      {rightIcon && !loading && (
        <span className="shrink-0 flex items-center relative z-10">{rightIcon}</span>
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button

/* ─── Convenience sub-variants ───────────────────────────────── */

/** Gradient-filled CTA — logo gradient bg, white text */
export function ButtonGradient({ children, size = 'md', className, ...props }) {
  return (
    <motion.button
      type="button"
      whileTap={{ scale: 0.97 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'font-body font-medium text-white',
        'bg-gradient-brand',
        'shadow-glow-sm hover:shadow-glow-md',
        'transition-all duration-300',
        'focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 focus-visible:outline-none',
        sizes[size] ?? sizes.md,
        className
      )}
      {...props}
    >
      <span className="relative z-10 whitespace-nowrap">{children}</span>
    </motion.button>
  )
}

/** Icon-only button */
export function ButtonIcon({ icon, label, size = 'md', variant = 'ghost', className, ...props }) {
  const iconSizes = { sm: 'w-8 h-8', md: 'w-9 h-9', lg: 'w-10 h-10' }
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileTap={{ scale: 0.93 }}
      transition={{ type: 'spring', stiffness: 500, damping: 30 }}
      className={cn(
        'inline-flex items-center justify-center rounded-xl',
        'transition-colors duration-150',
        iconSizes[size] ?? iconSizes.md,
        variant === 'ghost' && 'text-ink-muted hover:text-ink hover:bg-surface-200',
        variant === 'outline' && 'text-ink border border-surface-300 hover:bg-surface-100',
        className
      )}
      {...props}
    >
      {icon}
    </motion.button>
  )
}
