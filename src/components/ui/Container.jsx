import { cn } from '@utils/cn'

/**
 * Container
 *
 * Controls max-width, horizontal padding, and centering.
 *
 * Sizes:
 *   sm  → max-w-3xl   (768px)  — blog posts, narrow content
 *   md  → max-w-5xl   (1024px) — forms, focused layouts
 *   lg  → max-w-6xl   (1152px) — standard content
 *   xl  → max-w-7xl   (1280px) — default, most sections
 *   2xl → max-w-8xl   (1408px) — wide layouts
 *   full→ max-w-full           — edge-to-edge
 *
 * Usage:
 *   <Container>...</Container>
 *   <Container size="sm" className="py-20">...</Container>
 */

const maxWidths = {
  sm:   'max-w-3xl',
  md:   'max-w-5xl',
  lg:   'max-w-6xl',
  xl:   'max-w-7xl',
  '2xl':'max-w-8xl',
  full: 'max-w-full',
}

export default function Container({
  children,
  size      = 'xl',
  className = '',
  as: Tag   = 'div',
  noPadding = false,
  ...props
}) {
  return (
    <Tag
      className={cn(
        'mx-auto w-full',
        maxWidths[size] ?? maxWidths.xl,
        !noPadding && 'px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}
