import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Card — Premium polish upgrade

   Changes vs Phase 2:
   — Expo easing on all hover transitions
   — Layered box-shadow for natural depth
   — Border brightens (not just color) on hover
   — Animate prop uses whileInView with expo ease
   — Glass variant improved blur/saturation
   — FeatureCard icon uses refined tint system

   Variants: default | subtle | outlined | glass | gradient
   Padding:  none | sm | md | lg | xl
═══════════════════════════════════════════════════════════════ */

const BASE = [
  'rounded-2xl',
  'transition-all',
  'duration-[260ms]',
  'ease-[cubic-bezier(0.16,1,0.3,1)]',
].join(' ')

const variants = {
  default: cn(
    'bg-white',
    'border border-[#E8E8EE]',
    'shadow-[0_1px_3px_rgba(13,13,18,0.05),0_4px_16px_rgba(13,13,18,0.05)]',
  ),
  subtle: cn(
    'bg-[#F2F2F6]',
    'border border-[#E8E8EE]',
  ),
  outlined: cn(
    'bg-transparent',
    'border border-[#D6D6E0]',
  ),
  glass: cn(
    'bg-white/72',
    'backdrop-blur-xl saturate-[180%]',
    'border border-white/65',
    'shadow-[0_1px_3px_rgba(13,13,18,0.05),0_4px_16px_rgba(13,13,18,0.05)]',
  ),
  gradient: cn(
    'border border-[#E8E8EE]',
  ),
}

const hoverStyles = {
  default:  cn(
    'hover:-translate-y-1',
    'hover:border-[#D6D6E0]',
    'hover:shadow-[0_2px_8px_rgba(13,13,18,0.06),0_12px_40px_rgba(13,13,18,0.09)]',
  ),
  subtle:   cn(
    'hover:-translate-y-0.5',
    'hover:bg-[#E8E8EE]',
  ),
  outlined: cn(
    'hover:-translate-y-0.5',
    'hover:border-[#0D0D12]/22',
    'hover:shadow-[0_2px_8px_rgba(13,13,18,0.05),0_8px_24px_rgba(13,13,18,0.06)]',
  ),
  glass:    cn(
    'hover:-translate-y-0.5',
    'hover:bg-white/80',
    'hover:shadow-[0_2px_8px_rgba(13,13,18,0.06),0_12px_40px_rgba(13,13,18,0.09)]',
  ),
  gradient: cn(
    'hover:-translate-y-1',
    'hover:shadow-[0_2px_8px_rgba(13,13,18,0.06),0_12px_40px_rgba(13,13,18,0.08)]',
  ),
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
  style,
  ...props
}) {
  const classes = cn(
    BASE,
    variants[variant]           ?? variants.default,
    hover && hoverStyles[variant] ?? ''
    paddings[padding]           ?? paddings.md,
    onClick && 'cursor-pointer',
    className,
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-40px' }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        className={classes}
        style={style}
        onClick={onClick}
        {...props}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <Tag className={classes} style={style} onClick={onClick} {...props}>
      {children}
    </Tag>
  )
}

/* ─── Sub-components ─────────────────────────────────────────── */

export function CardHeader({ children, className = '', divided = false }) {
  return (
    <div className={cn('mb-4', divided && 'pb-4 border-b border-[#E8E8EE]', className)}>
      {children}
    </div>
  )
}

export function CardBody({ children, className = '' }) {
  return <div className={cn('flex-1', className)}>{children}</div>
}

export function CardFooter({ children, className = '', divided = false }) {
  return (
    <div className={cn('mt-4', divided && 'pt-4 border-t border-[#E8E8EE]', className)}>
      {children}
    </div>
  )
}

/** Icon badge — refined solid tint */
export function CardIcon({ children, color = 'blue', className = '' }) {
  const colorMap = {
    blue:   { bg: 'rgba(74,127,212,0.10)',  border: 'rgba(74,127,212,0.20)',  text: '#4A7FD4' },
    green:  { bg: 'rgba(58,122,58,0.10)',   border: 'rgba(58,122,58,0.20)',   text: '#3A7A3A' },
    red:    { bg: 'rgba(193,59,42,0.10)',   border: 'rgba(193,59,42,0.20)',   text: '#C13B2A' },
    amber:  { bg: 'rgba(184,131,42,0.10)',  border: 'rgba(184,131,42,0.20)',  text: '#B8832A' },
    purple: { bg: 'rgba(107,74,155,0.10)',  border: 'rgba(107,74,155,0.20)',  text: '#6B4A9B' },
    teal:   { bg: 'rgba(42,107,90,0.10)',   border: 'rgba(42,107,90,0.20)',   text: '#2A6B5A' },
    ink:    { bg: 'rgba(13,13,18,0.07)',    border: 'rgba(13,13,18,0.12)',    text: '#0D0D12' },
  }
  const c = colorMap[color] ?? colorMap.blue

  return (
    <div
      className={cn('inline-flex items-center justify-center w-11 h-11 rounded-xl mb-4', className)}
      style={{ background: c.bg, border: `1px solid ${c.border}`, color: c.text }}
    >
      {children}
    </div>
  )
}

/** FeatureCard — pre-composed card for service/feature listings */
export function FeatureCard({ icon, iconColor, title, description, className, ...props }) {
  return (
    <Card animate hover className={cn('flex flex-col', className)} {...props}>
      {icon && <CardIcon color={iconColor}>{icon}</CardIcon>}
      {title && (
        <h3 className="font-display font-semibold text-lg text-[#0D0D12] mb-2 leading-snug tracking-[-0.02em]">
          {title}
        </h3>
      )}
      {description && (
        <p className="text-sm text-[#56566E] leading-relaxed">{description}</p>
      )}
    </Card>
  )
}
