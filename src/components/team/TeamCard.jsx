import { motion } from 'framer-motion'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   TeamCard
   — Clean card with initials avatar, name, role, bio, social icons
   — Hover: lift + very subtle left border accent
   — Avatar: solid brand color bg with initials — no images needed
   — Social icons: GitHub, LinkedIn, Twitter/X
═══════════════════════════════════════════════════════════════ */

export default function TeamCard({ member, index = 0 }) {
  const { name, role, department, initials, color, colorBg, bio, social, featured } = member

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: 0.5,
        delay:    index * 0.08,
        ease:     [0.4, 0, 0.2, 1],
      }}
      whileHover={{ y: -4, transition: { duration: 0.22, ease: [0.4, 0, 0.2, 1] } }}
      className="group relative"
    >
      {/* Solid left accent — visible on hover only */}
      <motion.div
        className="absolute left-0 top-4 bottom-4 w-[3px] rounded-full"
        style={{ backgroundColor: color }}
        initial={{ scaleY: 0, opacity: 0 }}
        whileHover={{ scaleY: 1, opacity: 1 }}
        transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
      />

      <div className={cn(
        'relative flex flex-col gap-5 p-6',
        'bg-white rounded-2xl',
        'border border-surface-200',
        'group-hover:border-surface-300',
        'shadow-card group-hover:shadow-card-hover',
        'transition-all duration-250',
        'overflow-hidden',
      )}>

        {/* ── Top row: avatar + name block ─────────────── */}
        <div className="flex items-center gap-4">

          {/* Avatar — solid color bg, initials */}
          <div
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 select-none"
            style={{
              background: colorBg,
              border:     `1.5px solid ${color}28`,
            }}
          >
            <span
              className="font-display font-bold text-lg leading-none"
              style={{ color }}
            >
              {initials}
            </span>

            {/* Featured indicator dot */}
            {featured && (
              <div
                className="absolute -top-1 -right-1 w-3.5 h-3.5 rounded-full border-2 border-white"
                style={{ backgroundColor: color }}
                title="Leadership team"
              />
            )}
          </div>

          {/* Name + role */}
          <div className="flex flex-col gap-0.5 min-w-0">
            <h3 className="font-display font-semibold text-base text-ink leading-snug tracking-[-0.018em] truncate">
              {name}
            </h3>
            <p
              className="text-xs font-mono font-medium truncate"
              style={{ color }}
            >
              {role}
            </p>
            <p className="text-[10px] font-mono text-ink-light uppercase tracking-wider mt-0.5">
              {department}
            </p>
          </div>
        </div>

        {/* ── Bio ──────────────────────────────────────── */}
        <p className="text-sm text-ink-muted leading-relaxed">
          {bio}
        </p>

        {/* ── Social links ─────────────────────────────── */}
        {social && Object.keys(social).length > 0 && (
          <div className="flex items-center gap-1.5 pt-1 border-t border-surface-100">
            {social.linkedin && (
              <SocialLink href={social.linkedin} label={`${name} on LinkedIn`} icon={<LinkedInIcon />} />
            )}
            {social.github && (
              <SocialLink href={social.github} label={`${name} on GitHub`} icon={<GitHubIcon />} />
            )}
            {social.twitter && (
              <SocialLink href={social.twitter} label={`${name} on Twitter`} icon={<XIcon />} />
            )}
          </div>
        )}
      </div>
    </motion.div>
  )
}

/* ─── Social link button ─────────────────────────────────────── */
function SocialLink({ href, label, icon }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className={cn(
        'w-8 h-8 flex items-center justify-center rounded-lg',
        'text-ink-light hover:text-ink',
        'bg-transparent hover:bg-surface-100',
        'border border-transparent hover:border-surface-200',
        'transition-colors duration-150',
      )}
    >
      {icon}
    </a>
  )
}

/* ── Social icons ────────────────────────────────────────────── */
function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}

function XIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
