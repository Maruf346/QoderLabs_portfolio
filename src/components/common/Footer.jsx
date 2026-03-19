import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { NAV_LINKS } from '@data/navigation'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Footer — Final upgraded version
   Multi-column responsive layout, gradient divider,
   brand assets, social links, animated hover states
═══════════════════════════════════════════════════════════════ */

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href:  'https://github.com/qoderlabs',
    icon:  GitHubIcon,
  },
  {
    label: 'LinkedIn',
    href:  'https://linkedin.com/company/qoderlabs',
    icon:  LinkedInIcon,
  },
  {
    label: 'Twitter / X',
    href:  'https://twitter.com/qoderlabs',
    icon:  XIcon,
  },
]

const FOOTER_NAV = [
  {
    heading: 'Company',
    links: NAV_LINKS.slice(0, 3), // About, Services, Portfolio
  },
  {
    heading: 'Connect',
    links: NAV_LINKS.slice(3),    // Team, Careers, Contact
  },
]

/* Stagger variants for link columns */
const colVariants = {
  hidden:  {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.1 } },
}

const linkVariants = {
  hidden:  { opacity: 0, y: 8 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } },
}

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="relative bg-surface-50 overflow-hidden">

      {/* ── Gradient divider line at top ─────────────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent 0%, #EAEAEE 20%, #D8D8E0 50%, #EAEAEE 80%, transparent 100%)',
        }}
      />

      {/* ── Very subtle brand glow in top-center ─────────── */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 50% 0%, rgba(74,127,212,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* ══ Main footer body ═══════════════════════════════ */}
        <div className="pt-16 pb-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.8fr_1fr_1fr_1fr] gap-10 lg:gap-8">

          {/* ── Brand column ─────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Logo + Name */}
            <Link
              to="/"
              className="inline-flex items-center gap-3 group w-fit"
              aria-label="QoderLabs — home"
            >
              <motion.img
                src="/logo.png"
                alt="QoderLabs logo"
                width={84}
                height={84}
                className="object-contain no-select"
                draggable={false}
                whileHover={{ rotate: [0, -5, 5, 0] }}
                transition={{ duration: 0.5 }}
              />
              <img
                src="/name.png"
                alt="QoderLabs"
                className="h-[85px] w-auto object-contain no-select"
                draggable={false}
              />
            </Link>

            {/* Tagline */}
            <p className="text-sm text-ink-muted leading-relaxed max-w-[240px]">
              From Concept to Creation.{' '}
              <span className="text-ink-light">
                We craft exceptional digital products for visionary companies.
              </span>
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-1.5">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon }) => (
                <motion.a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  whileHover={{ y: -2, scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                  transition={{ type: 'spring', stiffness: 500, damping: 28 }}
                  className={cn(
                    'w-8 h-8 flex items-center justify-center rounded-lg',
                    'text-ink-light hover:text-ink',
                    'bg-transparent hover:bg-surface-200',
                    'border border-transparent hover:border-surface-300',
                    'transition-colors duration-150'
                  )}
                >
                  <Icon className="w-[15px] h-[15px]" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* ── Nav link columns ─────────────────────────── */}
          {FOOTER_NAV.map(({ heading, links }, colIdx) => (
            <motion.div
              key={heading}
              variants={colVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: '-60px' }}
              style={{ transitionDelay: `${colIdx * 0.08}s` }}
            >
              <motion.p
                variants={linkVariants}
                className="text-xs font-mono font-medium text-ink-light uppercase tracking-[0.14em] mb-4"
              >
                {heading}
              </motion.p>
              <ul className="space-y-2.5">
                {links.map(({ label, path }) => (
                  <motion.li key={path} variants={linkVariants}>
                    <Link
                      to={path}
                      className={cn(
                        'group inline-flex items-center gap-1.5',
                        'text-sm text-ink-muted',
                        'hover:text-ink',
                        'transition-colors duration-150'
                      )}
                    >
                      <span className="inline-block w-0 group-hover:w-2.5 overflow-hidden transition-all duration-200 ease-out">
                        <span className="text-brand-green opacity-0 group-hover:opacity-100 transition-opacity duration-150">→</span>
                      </span>
                      {label}
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          ))}

          {/* ── Contact column ───────────────────────────── */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
          >
            <motion.p
              variants={linkVariants}
              className="text-xs font-mono font-medium text-ink-light uppercase tracking-[0.14em] mb-4"
            >
              Get in touch
            </motion.p>
            <ul className="space-y-2.5">
              <motion.li variants={linkVariants}>
                <a
                  href="mailto:hello@qoderlabs.com"
                  className="text-sm text-ink-muted hover:text-ink transition-colors duration-150 break-all"
                >
                  hello@qoderlabs.com
                </a>
              </motion.li>
              <motion.li variants={linkVariants}>
                <Link
                  to="/contact"
                  className={cn(
                    'inline-flex items-center gap-1.5 mt-2',
                    'text-sm font-medium text-ink',
                    'px-4 py-2 rounded-lg',
                    'bg-surface-200 hover:bg-surface-300',
                    'transition-colors duration-150'
                  )}
                >
                  Start a project
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                    <path d="M1.5 5.5h8M6 2l3.5 3.5L6 9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </Link>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        {/* ══ Bottom bar ═════════════════════════════════════ */}
        <div
          className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
          style={{
            borderTop: '1px solid',
            borderImage: 'linear-gradient(90deg, transparent, #EAEAEE 20%, #EAEAEE 80%, transparent) 1',
          }}
        >
          <p className="text-xs text-ink-light font-mono">
            © {year} QoderLabs. All rights reserved.
          </p>

          <div className="flex items-center gap-5">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <Link
                key={item}
                to={`/${item.toLowerCase().replace(/ /g, '-')}`}
                className="text-xs text-ink-light hover:text-ink-muted transition-colors duration-150"
              >
                {item}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

/* ── Inline SVG social icons ─────────────────────────────────── */
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
