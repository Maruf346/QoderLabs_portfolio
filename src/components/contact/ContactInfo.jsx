import { motion } from 'framer-motion'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Contact Info
   — Left column of the contact layout
   — Email, phone, location, social links
   — NO gradients — all solid colors from brand palette
   — Clean stacked layout with subtle icons
═══════════════════════════════════════════════════════════════ */

const INFO_ITEMS = [
  {
    icon:    EmailIcon,
    label:   'Email',
    value:   'hello@qoderlabs.com',
    href:    'mailto:hello@qoderlabs.com',
    color:   '#4A7FD4',
    colorBg: 'rgba(74,127,212,0.09)',
  },
  {
    icon:    PhoneIcon,
    label:   'Phone',
    value:   '+1 (555) 000-1234',
    href:    'tel:+15550001234',
    color:   '#3A7A3A',
    colorBg: 'rgba(58,122,58,0.09)',
  },
  {
    icon:    LocationIcon,
    label:   'Location',
    value:   'Remote-first · Global clients',
    href:    null,
    color:   '#C4622D',
    colorBg: 'rgba(196,98,45,0.09)',
  },
  {
    icon:    ClockIcon,
    label:   'Response time',
    value:   'Within 1 business day',
    href:    null,
    color:   '#6B4A9B',
    colorBg: 'rgba(107,74,155,0.09)',
  },
]

const SOCIAL_LINKS = [
  { label: 'GitHub',    href: 'https://github.com/qoderlabs',           icon: GitHubIcon },
  { label: 'LinkedIn',  href: 'https://linkedin.com/company/qoderlabs', icon: LinkedInIcon },
  { label: 'Twitter/X', href: 'https://twitter.com/qoderlabs',          icon: XIcon },
]

export default function ContactInfo() {
  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
      className="flex flex-col gap-8"
    >
      {/* Section label */}
      <motion.div variants={slideUp}>
        <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-1">
          Contact Details
        </p>
        <div className="w-8 h-px bg-surface-300 mt-2" />
      </motion.div>

      {/* Info items */}
      <div className="flex flex-col gap-5">
        {INFO_ITEMS.map((item, i) => (
          <InfoItem key={item.label} item={item} index={i} />
        ))}
      </div>

      {/* Divider */}
      <motion.div
        variants={slideUp}
        className="h-px bg-surface-200"
      />

      {/* Social links */}
      <motion.div variants={slideUp} className="flex flex-col gap-4">
        <p className="font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light">
          Follow Us
        </p>
        <div className="flex items-center gap-2">
          {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className={cn(
                'w-9 h-9 flex items-center justify-center rounded-lg',
                'bg-surface-100 border border-surface-200',
                'text-ink-muted hover:text-ink',
                'hover:bg-surface-200 hover:border-surface-300',
                'transition-colors duration-150',
              )}
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </motion.div>

      {/* Availability card — solid white, no gradient */}
      <motion.div
        variants={slideUp}
        className={cn(
          'p-5 rounded-xl',
          'bg-white border border-surface-200',
          'shadow-card',
        )}
      >
        {/* Status indicator row */}
        <div className="flex items-center gap-2 mb-3">
          <span className="relative flex w-2.5 h-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-green opacity-50" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-brand-green" />
          </span>
          <span className="text-xs font-mono font-medium text-brand-green uppercase tracking-wider">
            Currently accepting projects
          </span>
        </div>
        <p className="text-sm text-ink-muted leading-relaxed">
          We have limited spots available for Q2 2025.
          Reach out early to secure your project timeline.
        </p>
      </motion.div>
    </motion.div>
  )
}

/* ─── Info Item ──────────────────────────────────────────────── */
function InfoItem({ item, index }) {
  const { icon: Icon, label, value, href, color, colorBg } = item

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.default}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'flex items-start gap-3.5 group',
        href && 'cursor-pointer',
      )}
    >
      {/* Icon box — solid tinted bg */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-colors duration-150"
        style={{ background: colorBg }}
      >
        <Icon color={color} />
      </div>

      <div className="flex flex-col gap-0.5">
        <p className="text-xs font-mono text-ink-light uppercase tracking-wider">
          {label}
        </p>
        <p
          className={cn(
            'text-sm font-medium font-body text-ink',
            href && 'group-hover:text-brand-blue transition-colors duration-150',
          )}
        >
          {value}
        </p>
      </div>
    </motion.div>
  )

  if (href) {
    return (
      <a href={href} className="block">
        {content}
      </a>
    )
  }

  return content
}

/* ── Info Icons ──────────────────────────────────────────────── */
function EmailIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="13" height="9" rx="1.5" stroke={color} strokeWidth="1.3"/>
      <path d="M1.5 5.5l6.5 4 6.5-4" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function PhoneIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M5.5 1.5H3a1.5 1.5 0 00-1.5 1.5c0 6.075 4.925 11 11 11A1.5 1.5 0 0014 12.5v-2.4a.5.5 0 00-.36-.48l-2.9-.87a.5.5 0 00-.56.22l-.87 1.31a8.05 8.05 0 01-3.59-3.59l1.31-.87a.5.5 0 00.22-.56l-.87-2.9A.5.5 0 005.5 1.5z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  )
}

function LocationIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <path d="M8 1.5C5.515 1.5 3.5 3.515 3.5 6c0 3.75 4.5 8.5 4.5 8.5S12.5 9.75 12.5 6c0-2.485-2.015-4.5-4.5-4.5z"
        stroke={color} strokeWidth="1.3"/>
      <circle cx="8" cy="6" r="1.5" stroke={color} strokeWidth="1.2"/>
    </svg>
  )
}

function ClockIcon({ color }) {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
      <circle cx="8" cy="8" r="6.5" stroke={color} strokeWidth="1.3"/>
      <path d="M8 5v3l2 1.5" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function GitHubIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
    </svg>
  )
}

function LinkedInIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function XIcon({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.26 5.632 5.904-5.632zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  )
}
