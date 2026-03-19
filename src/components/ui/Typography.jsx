import { cn } from '@utils/cn'

/**
 * Typography System
 *
 * Exports:
 *   Heading      — h1–h6 with size presets + gradient support
 *   Text         — body copy variants
 *   Eyebrow      — small mono uppercase label
 *   Label        — form/ui labels
 *   Code         — inline code
 *   Prose        — long-form content wrapper
 *
 * Usage:
 *   <Heading as="h1" size="display">We build digital products</Heading>
 *   <Heading as="h2" size="xl" gradient>Our Services</Heading>
 *   <Text variant="muted" size="lg">Premium quality, always.</Text>
 *   <Eyebrow>What we do</Eyebrow>
 */

/* ═══════════════════════════════════════════════════════════════
   HEADING
═══════════════════════════════════════════════════════════════ */

const headingSizes = {
  display: [
    'text-5xl sm:text-6xl md:text-7xl lg:text-8xl',
    'font-bold leading-[0.96] tracking-[-0.04em]',
  ].join(' '),

  xl: [
    'text-4xl sm:text-5xl md:text-6xl',
    'font-bold leading-[1.02] tracking-[-0.036em]',
  ].join(' '),

  lg: [
    'text-3xl sm:text-4xl md:text-5xl',
    'font-bold leading-[1.08] tracking-[-0.032em]',
  ].join(' '),

  md: [
    'text-2xl sm:text-3xl md:text-4xl',
    'font-semibold leading-[1.14] tracking-[-0.028em]',
  ].join(' '),

  sm: [
    'text-xl sm:text-2xl',
    'font-semibold leading-[1.2] tracking-[-0.022em]',
  ].join(' '),

  xs: [
    'text-lg sm:text-xl',
    'font-semibold leading-[1.28] tracking-[-0.018em]',
  ].join(' '),
}

export function Heading({
  children,
  as:       Tag      = 'h2',
  size             = 'lg',
  gradient         = false,
  gradientVariant  = 'logo',     // 'logo' | 'name'
  color            = 'ink',      // 'ink' | 'muted' | 'inherit'
  className        = '',
  ...props
}) {
  const colorMap = {
    ink:     'text-ink',
    muted:   'text-ink-muted',
    inherit: 'text-inherit',
    white:   'text-white',
  }

  const gradientMap = {
    logo: 'text-gradient-logo',
    name: 'text-gradient-name',
  }

  return (
    <Tag
      className={cn(
        'font-display',
        headingSizes[size] ?? headingSizes.lg,
        gradient
          ? (gradientMap[gradientVariant] ?? 'text-gradient-logo')
          : (colorMap[color] ?? 'text-ink'),
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ═══════════════════════════════════════════════════════════════
   TEXT
═══════════════════════════════════════════════════════════════ */

const textSizes = {
  xl:   'text-xl leading-relaxed',
  lg:   'text-lg leading-relaxed',
  md:   'text-base leading-relaxed',
  sm:   'text-sm leading-relaxed',
  xs:   'text-xs leading-normal',
}

const textVariants = {
  default: 'text-ink',
  muted:   'text-ink-muted',
  light:   'text-ink-light',
  white:   'text-white',
  inherit: 'text-inherit',
}

export function Text({
  children,
  as:      Tag  = 'p',
  size         = 'md',
  variant      = 'muted',
  maxWidth     = true,   // applies max-width: 68ch cap
  className    = '',
  ...props
}) {
  return (
    <Tag
      className={cn(
        'font-body',
        textSizes[size]    ?? textSizes.md,
        textVariants[variant] ?? textVariants.muted,
        maxWidth && 'max-w-prose',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ═══════════════════════════════════════════════════════════════
   EYEBROW
   Small mono uppercase label — sits above section headings
═══════════════════════════════════════════════════════════════ */

export function Eyebrow({
  children,
  as: Tag = 'p',
  color   = 'light',   // 'light' | 'brand-green' | 'brand-blue' | custom class
  className = '',
  dot = false,         // prepends a colored dot
  ...props
}) {
  const colorMap = {
    light:        'text-ink-light',
    muted:        'text-ink-muted',
    'brand-green':'text-brand-green',
    'brand-blue': 'text-brand-blue',
    'brand-red':  'text-brand-red',
  }

  return (
    <Tag
      className={cn(
        'inline-flex items-center gap-2',
        'font-mono text-xs font-medium',
        'uppercase tracking-[0.15em]',
        colorMap[color] ?? colorMap.light,
        className
      )}
      {...props}
    >
      {dot && (
        <span
          className="inline-block w-1.5 h-1.5 rounded-full bg-current opacity-60 shrink-0"
          aria-hidden="true"
        />
      )}
      {children}
    </Tag>
  )
}

/* ═══════════════════════════════════════════════════════════════
   LABEL
   For form labels and UI annotation text
═══════════════════════════════════════════════════════════════ */

export function Label({
  children,
  as: Tag   = 'label',
  required  = false,
  className = '',
  htmlFor,
  ...props
}) {
  return (
    <Tag
      htmlFor={htmlFor}
      className={cn(
        'inline-flex items-center gap-1',
        'font-body text-sm font-medium text-ink',
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="text-brand-red" aria-hidden="true">*</span>
      )}
    </Tag>
  )
}

/* ═══════════════════════════════════════════════════════════════
   CODE
   Inline code spans
═══════════════════════════════════════════════════════════════ */

export function Code({ children, className = '', ...props }) {
  return (
    <code
      className={cn(
        'font-mono text-[0.85em] font-medium',
        'px-1.5 py-0.5 rounded-md',
        'bg-surface-200 text-brand-green',
        'border border-surface-300',
        className
      )}
      {...props}
    >
      {children}
    </code>
  )
}

/* ═══════════════════════════════════════════════════════════════
   GRADIENT TEXT (inline utility)
═══════════════════════════════════════════════════════════════ */

export function GradientText({
  children,
  as: Tag   = 'span',
  variant   = 'logo',  // 'logo' | 'name'
  className = '',
  ...props
}) {
  return (
    <Tag
      className={cn(
        variant === 'name' ? 'text-gradient-name' : 'text-gradient-logo',
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

/* ═══════════════════════════════════════════════════════════════
   PROSE
   Long-form content wrapper (blog posts, documentation)
═══════════════════════════════════════════════════════════════ */

export function Prose({ children, className = '', size = 'md', ...props }) {
  const sizeMap = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
  }

  return (
    <div
      className={cn(
        'max-w-prose font-body',
        sizeMap[size] ?? sizeMap.md,
        'text-ink-muted leading-relaxed',
        // Basic prose element spacing
        '[&>p]:mb-4',
        '[&>h2]:font-display [&>h2]:text-2xl [&>h2]:font-semibold [&>h2]:text-ink [&>h2]:mt-8 [&>h2]:mb-3',
        '[&>h3]:font-display [&>h3]:text-xl  [&>h3]:font-semibold [&>h3]:text-ink [&>h3]:mt-6 [&>h3]:mb-2',
        '[&>ul]:list-disc [&>ul]:pl-5 [&>ul]:mb-4 [&>ul>li]:mb-1',
        '[&>ol]:list-decimal [&>ol]:pl-5 [&>ol]:mb-4 [&>ol>li]:mb-1',
        '[&>blockquote]:border-l-2 [&>blockquote]:border-surface-300 [&>blockquote]:pl-4 [&>blockquote]:italic [&>blockquote]:text-ink-light',
        '[&>hr]:border-surface-200 [&>hr]:my-8',
        '[&>a]:text-brand-blue [&>a]:underline [&>a:hover]:text-brand-teal',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   SECTION HEADER (composite)
   Convenience component: eyebrow + heading + subtitle stack
═══════════════════════════════════════════════════════════════ */

export function SectionHeader({
  eyebrow,
  title,
  titleGradient    = false,
  titleGradientWord,        // if set, only THIS word gets gradient
  subtitle,
  align            = 'center',
  eyebrowColor     = 'light',
  className        = '',
}) {
  const isCenter = align === 'center'

  // Render title with optional per-word gradient
  const renderTitle = () => {
    if (!title) return null

    if (titleGradient && !titleGradientWord) {
      return (
        <Heading
          as="h2"
          size="lg"
          gradient
          className={cn('mb-4', isCenter && 'mx-auto')}
        >
          {title}
        </Heading>
      )
    }

    if (titleGradientWord && typeof title === 'string') {
      const parts = title.split(titleGradientWord)
      return (
        <Heading
          as="h2"
          size="lg"
          className={cn('mb-4', isCenter && 'mx-auto')}
        >
          {parts[0]}
          <GradientText>{titleGradientWord}</GradientText>
          {parts[1]}
        </Heading>
      )
    }

    return (
      <Heading as="h2" size="lg" className="mb-4">
        {title}
      </Heading>
    )
  }

  return (
    <div className={cn(
      'mb-12 md:mb-16',
      isCenter ? 'text-center' : 'text-left',
      className
    )}>
      {eyebrow && (
        <Eyebrow color={eyebrowColor} dot className="mb-3 justify-center">
          {eyebrow}
        </Eyebrow>
      )}
      {renderTitle()}
      {subtitle && (
        <Text
          size="lg"
          className={cn(isCenter && 'mx-auto text-center')}
        >
          {subtitle}
        </Text>
      )}
    </div>
  )
}
