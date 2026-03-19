import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/**
 * Badge / Tag Component
 *
 * Variants:
 *   default    — neutral gray tint
 *   green      — brand green tint  (tech stack, success)
 *   blue       — brand blue tint   (category, info)
 *   red        — brand red tint    (alert, urgent)
 *   amber      — brand amber tint  (warning, beta)
 *   purple     — brand purple tint (feature, premium)
 *   teal       — brand teal tint   (tag, topic)
 *   outline    — transparent with border
 *   gradient   — full brand gradient border + tinted bg
 *   dark       — dark/ink fill
 *
 * Sizes:
 *   sm | md | lg
 *
 * Usage:
 *   <Badge>React</Badge>
 *   <Badge variant="green" size="sm">New</Badge>
 *   <Badge variant="gradient" icon={<StarIcon />}>Premium</Badge>
 *   <Badge variant="outline" removable onRemove={() => {}}>TypeScript</Badge>
 */

const variantStyles = {
  default: [
    'bg-surface-200 text-ink-muted',
    'border border-surface-300',
  ].join(' '),

  green: [
    'bg-[rgba(58,122,58,0.10)] text-brand-green',
    'border border-[rgba(58,122,58,0.18)]',
  ].join(' '),

  blue: [
    'bg-[rgba(74,127,212,0.10)] text-brand-blue',
    'border border-[rgba(74,127,212,0.18)]',
  ].join(' '),

  red: [
    'bg-[rgba(193,59,42,0.10)] text-brand-red',
    'border border-[rgba(193,59,42,0.18)]',
  ].join(' '),

  amber: [
    'bg-[rgba(184,131,42,0.10)] text-brand-amber',
    'border border-[rgba(184,131,42,0.18)]',
  ].join(' '),

  purple: [
    'bg-[rgba(107,74,155,0.10)] text-brand-purple',
    'border border-[rgba(107,74,155,0.18)]',
  ].join(' '),

  teal: [
    'bg-[rgba(42,107,90,0.10)] text-brand-teal',
    'border border-[rgba(42,107,90,0.18)]',
  ].join(' '),

  pink: [
    'bg-[rgba(196,90,122,0.10)] text-brand-pink',
    'border border-[rgba(196,90,122,0.18)]',
  ].join(' '),

  outline: [
    'bg-transparent text-ink-muted',
    'border border-surface-300',
  ].join(' '),

  dark: [
    'bg-ink text-white',
    'border border-transparent',
  ].join(' '),

  gradient: [
    'text-ink',
    'border border-transparent',
    // Gradient border via background-clip trick
  ].join(' '),
}

const sizeStyles = {
  sm: 'px-2 py-0.5 text-[10px] gap-1 rounded-md',
  md: 'px-2.5 py-1 text-xs gap-1.5 rounded-lg',
  lg: 'px-3 py-1.5 text-sm gap-1.5 rounded-lg',
}

export default function Badge({
  children,
  variant   = 'default',
  size      = 'md',
  icon,
  removable = false,
  onRemove,
  animate   = false,
  className = '',
  onClick,
  ...props
}) {
  const isClickable = !!onClick

  const baseClasses = cn(
    'inline-flex items-center justify-center',
    'font-mono font-medium',
    'select-none whitespace-nowrap',
    'transition-all duration-150',
    variantStyles[variant] ?? variantStyles.default,
    sizeStyles[size] ?? sizeStyles.md,
    isClickable && 'cursor-pointer hover:opacity-80',
    // Gradient variant special handling
    variant === 'gradient' && [
      'relative overflow-hidden',
      'bg-gradient-soft',
      'before:absolute before:inset-0 before:rounded-[inherit]',
      'before:p-[1px] before:bg-gradient-brand',
      'before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)]',
      'before:[mask-composite:exclude]',
    ].join(' '),
    className
  )

  const content = (
    <>
      {icon && (
        <span className="shrink-0 flex items-center" aria-hidden="true">
          {icon}
        </span>
      )}
      <span>{children}</span>
      {removable && (
        <button
          onClick={(e) => {
            e.stopPropagation()
            onRemove?.()
          }}
          aria-label={`Remove ${children}`}
          className={cn(
            'shrink-0 flex items-center justify-center',
            'w-3.5 h-3.5 rounded-full',
            'opacity-50 hover:opacity-100',
            'transition-opacity duration-100',
            'ml-0.5'
          )}
        >
          <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
            <path d="M1 1l6 6M7 1L1 7" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
        </button>
      )}
    </>
  )

  if (animate) {
    return (
      <motion.span
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.85 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className={baseClasses}
        onClick={onClick}
        {...props}
      >
        {content}
      </motion.span>
    )
  }

  return (
    <span className={baseClasses} onClick={onClick} {...props}>
      {content}
    </span>
  )
}

/* ─── BadgeGroup ─────────────────────────────────────────────── */
/**
 * BadgeGroup
 * Wraps multiple badges with consistent gap.
 *
 * Usage:
 *   <BadgeGroup>
 *     <Badge variant="green">React</Badge>
 *     <Badge variant="blue">TypeScript</Badge>
 *   </BadgeGroup>
 */
export function BadgeGroup({ children, className = '', gap = 'sm', ...props }) {
  const gapMap = { sm: 'gap-1.5', md: 'gap-2', lg: 'gap-2.5' }
  return (
    <div
      className={cn('flex flex-wrap items-center', gapMap[gap] ?? gapMap.sm, className)}
      {...props}
    >
      {children}
    </div>
  )
}

/* ─── TechBadge ──────────────────────────────────────────────── */
/**
 * TechBadge
 * Pre-styled badge for technology/stack labels.
 * Maps tech names to brand colors automatically.
 *
 * Usage:
 *   <TechBadge>React</TechBadge>
 *   <TechBadge>Node.js</TechBadge>
 */
const TECH_COLOR_MAP = {
  react:      'blue',
  next:       'default',
  nextjs:     'default',
  typescript: 'blue',
  javascript: 'amber',
  node:       'green',
  nodejs:     'green',
  python:     'teal',
  tailwind:   'teal',
  figma:      'purple',
  postgres:   'blue',
  mongodb:    'green',
  redis:      'red',
  docker:     'blue',
  aws:        'amber',
  graphql:    'pink',
  vite:       'purple',
  framer:     'pink',
}

export function TechBadge({ children, className = '', ...props }) {
  const key = typeof children === 'string'
    ? children.toLowerCase().replace(/[\s.]/g, '')
    : ''
  const variant = TECH_COLOR_MAP[key] ?? 'default'

  return (
    <Badge variant={variant} size="sm" className={className} {...props}>
      {children}
    </Badge>
  )
}

/* ─── StatusBadge ────────────────────────────────────────────── */
/**
 * StatusBadge
 * For project status, job status, etc.
 *
 * Usage:
 *   <StatusBadge status="active" />
 *   <StatusBadge status="completed" />
 */
const STATUS_CONFIG = {
  active:    { label: 'Active',     variant: 'green',  dot: true },
  completed: { label: 'Completed',  variant: 'blue',   dot: false },
  pending:   { label: 'Pending',    variant: 'amber',  dot: true },
  paused:    { label: 'Paused',     variant: 'default',dot: false },
  new:       { label: 'New',        variant: 'purple', dot: true },
  hiring:    { label: 'Now Hiring', variant: 'green',  dot: true },
  closed:    { label: 'Closed',     variant: 'red',    dot: false },
}

export function StatusBadge({ status = 'active', label: labelOverride, className = '' }) {
  const config = STATUS_CONFIG[status] ?? STATUS_CONFIG.active
  const label  = labelOverride ?? config.label

  return (
    <Badge
      variant={config.variant}
      size="sm"
      className={className}
      icon={
        config.dot
          ? <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse-soft" />
          : undefined
      }
    >
      {label}
    </Badge>
  )
}
