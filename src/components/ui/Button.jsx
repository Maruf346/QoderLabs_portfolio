import { forwardRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Button — Premium polish upgrade

   Variants:   primary | secondary | ghost | danger
   Sizes:      sm | md | lg | xl
   Extra:      ButtonGradient | ButtonIcon

   Changes vs Phase 2:
   — Expo easing on all transitions (0.16,1,0.3,1)
   — Scale + shadow lift on hover (not just bg change)
   — Focus ring offset properly implemented
   — Loading spinner uses consistent style
   — Primary uses layered box-shadow for depth
═══════════════════════════════════════════════════════════════ */

const baseStyles = [
  'inline-flex items-center justify-center',
  'font-body font-medium',
  'select-none cursor-pointer',
  'rounded-xl',
  'transition-all duration-[200ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
].join(' ')

const variants = {
  primary: cn(
    'relative overflow-hidden',
    'bg-[#0D0D12] text-white',
    'border border-transparent',
    'shadow-[0_2px_8px_rgba(13,13,18,0.12),0_4px_16px_rgba(13,13,18,0.08)]',
    'hover:bg-[#0D0D12]/85',
    'hover:shadow-[0_4px_16px_rgba(13,13,18,0.16),0_8px_32px_rgba(13,13,18,0.12)]',
    'hover:scale-[1.02]',
    'active:scale-[0.97] active:shadow-none',
  ),

  secondary: cn(
    'bg-transparent text-[#0D0D12]',
    'border border-[#D6D6E0]',
    'hover:bg-[#F2F2F6] hover:border-[#0D0D12]/25',
    'hover:scale-[1.015]',
    'active:scale-[0.97]',
  ),

  ghost: cn(
    'bg-transparent text-[#56566E]',
    'border border-transparent',
    'hover:bg-[#F2F2F6] hover:text-[#0D0D12]',
    'active:scale-[0.97]',
  ),

  danger: cn(
    'bg-brand-red text-white',
    'border border-transparent',
    'shadow-[0_2px_8px_rgba(193,59,42,0.18)]',
    'hover:bg-[#A8331F]',
    'hover:shadow-[0_4px_16px_rgba(193,59,42,0.25)]',
    'hover:scale-[1.02]',
    'active:scale-[0.97]',
  ),
}

const sizes = {
  sm: 'h-8  px-3.5 text-xs  gap-1.5',
  md: 'h-10 px-5   text-sm  gap-2',
  lg: 'h-12 px-6   text-sm  gap-2.5',
  xl: 'h-14 px-8   text-base gap-3',
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
      whileTap={{ scale: isDisabled ? 1 : 0.96 }}
      transition={{ duration: 0.12 }}
      className={cn(
        baseStyles,
        variants[variant] ?? variants.primary,
        sizes[size]       ?? sizes.md,
        isDisabled && 'opacity-50 pointer-events-none cursor-not-allowed',
        className,
      )}
      {...props}
    >
      {/* Left icon */}
      {leftIcon && !loading && (
        <span className="shrink-0 flex items-center" aria-hidden="true">{leftIcon}</span>
      )}

      {/* Spinner */}
      {loading && (
        <span className="shrink-0 flex items-center" aria-hidden="true">
          <LoadingSpinner />
        </span>
      )}

      {/* Label */}
      <span className="relative z-10 whitespace-nowrap">
        {children}
      </span>

      {/* Right icon */}
      {rightIcon && !loading && (
        <span className="shrink-0 flex items-center relative z-10" aria-hidden="true">
          {rightIcon}
        </span>
      )}
    </motion.button>
  )
})

Button.displayName = 'Button'
export default Button

/* ─── ButtonGradient — full logo-gradient fill ───────────────── */
export function ButtonGradient({ children, size = 'md', className, ...props }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'inline-flex items-center justify-center gap-2',
        'font-body font-medium text-white',
        'rounded-xl cursor-pointer select-none',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
        // Gradient fill
        'bg-gradient-brand',
        // Layered shadow that matches gradient warm tones
        'shadow-[0_2px_12px_rgba(193,59,42,0.18),0_4px_24px_rgba(74,127,212,0.12)]',
        'hover:shadow-[0_4px_20px_rgba(193,59,42,0.24),0_8px_36px_rgba(74,127,212,0.16)]',
        'transition-shadow duration-[220ms]',
        sizes[size] ?? sizes.md,
        className,
      )}
      {...props}
    >
      <span className="relative z-10 whitespace-nowrap">{children}</span>
    </motion.button>
  )
}

/* ─── ButtonIcon — icon-only square button ───────────────────── */
export function ButtonIcon({ icon, label, size = 'md', variant = 'ghost', className, ...props }) {
  const iconSizes = { sm: 'w-8 h-8', md: 'w-9 h-9', lg: 'w-10 h-10', xl: 'w-11 h-11' }
  return (
    <motion.button
      type="button"
      aria-label={label}
      whileHover={{ scale: 1.06 }}
      whileTap={{ scale: 0.91 }}
      transition={{ duration: 0.15, ease: [0.16, 1, 0.3, 1] }}
      className={cn(
        'inline-flex items-center justify-center rounded-xl',
        'transition-colors duration-[180ms]',
        iconSizes[size] ?? iconSizes.md,
        variant === 'ghost'   && 'text-[#56566E] hover:text-[#0D0D12] hover:bg-[#F2F2F6]',
        variant === 'outline' && 'text-[#0D0D12] border border-[#E8E8EE] hover:bg-[#F2F2F6]',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
        className,
      )}
      {...props}
    >
      {icon}
    </motion.button>
  )
}

/* ─── LoadingSpinner ─────────────────────────────────────────── */
function LoadingSpinner() {
  return (
    <svg
      className="animate-spin"
      width="14" height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle
        cx="7" cy="7" r="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        opacity="0.30"
      />
      <path
        d="M7 1.5A5.5 5.5 0 0112.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
