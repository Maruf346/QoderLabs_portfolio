import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { NAV_LINKS } from '@data/navigation'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Navbar
   — Transparent on top, glass on scroll
   — Active link pill (Framer Motion layoutId)
   — Smooth spring mobile drawer from right
   — Logo + name from /public assets
═══════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [hidden,     setHidden]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { pathname } = useLocation()

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Scroll: glass + hide-on-scroll-down behaviour
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = lastScrollY.current
    setScrolled(y > 24)
    // Hide navbar when scrolling down past 120px, show on scroll up
    if (y > 120) {
      setHidden(y > prev && y > 200)
    } else {
      setHidden(false)
    }
    lastScrollY.current = y
  })

  // Lock body scroll when mobile drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Close drawer on Escape
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  return (
    <>
      {/* ══ Header bar ═══════════════════════════════════════ */}
      <motion.header
        animate={{ y: hidden ? '-100%' : '0%' }}
        transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-[background,border-color,box-shadow,padding] duration-300',
          scrolled
            ? 'py-3 bg-white/82 backdrop-blur-2xl border-b border-surface-200/80 shadow-card'
            : 'py-5 bg-transparent border-b border-transparent'
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between gap-4">

            {/* ── Branding ─────────────────────────────────── */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group"
              aria-label="QoderLabs — home"
            >
              <motion.img
                src="/logo.png"
                alt="QoderLabs logo"
                width={36}
                height={36}
                className="object-contain no-select"
                draggable={false}
                whileHover={{ rotate: [0, -6, 6, 0], scale: 1.05 }}
                transition={{ duration: 0.5 }}
              />
              <img
                src="/name.png"
                alt="QoderLabs"
                className="hidden sm:block h-[20px] w-auto object-contain no-select"
                draggable={false}
              />
            </Link>

            {/* ── Desktop nav ──────────────────────────────── */}
            <nav
              className="hidden lg:flex items-center gap-0.5"
              aria-label="Main navigation"
            >
              {NAV_LINKS.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => cn(
                    'relative px-4 py-2 rounded-xl',
                    'text-sm font-medium font-body',
                    'transition-colors duration-200',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                    isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'
                  )}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {/* Animated active background pill */}
                      {isActive && (
                        <motion.span
                          layoutId="nav-active-pill"
                          className="absolute inset-0 rounded-xl bg-surface-200"
                          style={{ zIndex: -1 }}
                          transition={{
                            type: 'spring',
                            stiffness: 420,
                            damping: 36,
                            mass: 0.8,
                          }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* ── Desktop CTA + mobile toggle ──────────────── */}
            <div className="flex items-center gap-3">
              {/* CTA */}
              <Link
                to="/contact"
                className={cn(
                  'hidden lg:inline-flex items-center gap-2',
                  'px-5 py-2.5 rounded-xl',
                  'text-sm font-medium font-body text-white',
                  'bg-ink hover:bg-ink/85',
                  'shadow-lift hover:shadow-lift-hover',
                  'transition-all duration-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2'
                )}
              >
                Start a project
                <ArrowRightIcon />
              </Link>

              {/* Hamburger */}
              <button
                className={cn(
                  'lg:hidden',
                  'w-9 h-9 flex flex-col items-center justify-center gap-[5px]',
                  'rounded-xl transition-colors duration-150',
                  'hover:bg-surface-200',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue'
                )}
                onClick={() => setMobileOpen(v => !v)}
                aria-label={mobileOpen ? 'Close navigation' : 'Open navigation'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <motion.span
                  animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="block w-[18px] h-[1.5px] bg-ink rounded-full origin-center"
                />
                <motion.span
                  animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                  transition={{ duration: 0.15 }}
                  className="block w-[18px] h-[1.5px] bg-ink rounded-full"
                />
                <motion.span
                  animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
                  transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
                  className="block w-[18px] h-[1.5px] bg-ink rounded-full origin-center"
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ══ Mobile Drawer ════════════════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="mob-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="fixed inset-0 z-40 bg-ink/15 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Drawer panel */}
            <motion.aside
              id="mobile-nav"
              key="mob-drawer"
              initial={{ x: '100%', opacity: 0.5 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100%', opacity: 0 }}
              transition={{ type: 'spring', stiffness: 340, damping: 34, mass: 0.9 }}
              className={cn(
                'fixed top-0 right-0 bottom-0 z-50',
                'w-[min(300px,90vw)]',
                'flex flex-col',
                'bg-white/92 backdrop-blur-2xl',
                'border-l border-surface-200',
                'px-5 pt-5 pb-8',
                'lg:hidden'
              )}
            >
              {/* Drawer top */}
              <div className="flex items-center justify-between mb-8">
                <Link
                  to="/"
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center gap-2.5"
                >
                  <img src="/logo.png" alt="QoderLabs" width={28} height={28} className="object-contain" />
                  <img src="/name.png" alt="QoderLabs" className="h-[17px] w-auto object-contain" />
                </Link>

                {/* Close button */}
                <button
                  onClick={() => setMobileOpen(false)}
                  aria-label="Close menu"
                  className="w-8 h-8 flex items-center justify-center rounded-lg text-ink-muted hover:text-ink hover:bg-surface-200 transition-colors"
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 1l11 11M12 1L1 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, path }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.04 + 0.06, duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
                  >
                    <NavLink
                      to={path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) => cn(
                        'flex items-center justify-between',
                        'px-4 py-3 rounded-xl',
                        'text-sm font-medium font-body',
                        'transition-colors duration-150',
                        isActive
                          ? 'bg-surface-200 text-ink'
                          : 'text-ink-muted hover:text-ink hover:bg-surface-100'
                      )}
                    >
                      {({ isActive }) => (
                        <>
                          {label}
                          {isActive && (
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green shrink-0" />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* Drawer CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.32, duration: 0.3 }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center justify-center gap-2',
                    'w-full px-5 py-3 rounded-xl',
                    'text-sm font-medium font-body text-white',
                    'bg-ink hover:bg-ink/85',
                    'transition-colors duration-200'
                  )}
                >
                  Start a project
                  <ArrowRightIcon />
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}

/* ── Icon helpers ────────────────────────────────────────────── */
function ArrowRightIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M2 6.5h9M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}