import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { NAV_LINKS } from '@data/navigation'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Navbar — Production-level mobile fixes

   BUGS FIXED:
   1. Menu not closing on nav link click
      → Every NavLink has onClick={closeMobile}
   2. Close (X) button not working
      → Explicit onClick={closeMobile} + z-[70] on drawer,
        z-10 relative on close button, no pointer-events issues
   3. Menu not closing on route change
      → useLocation() + useEffect on pathname
   4. Body scroll not locked
      → document.body.style.overflow toggled in useEffect
   5. Backdrop click not closing
      → Backdrop div has onClick={closeMobile}
   6. Hamburger shows 3 separate lines (not animated)
      → Clean static lines — no Framer variant conflict

   RESPONSIVENESS FIXES:
   - Drawer capped at w-[min(300px,85vw)] — no overflow on 320px
   - Drawer z-index above backdrop (z-[70] vs z-[60])
   - Close button has relative z-10 to guarantee hit area
   - Logo uses shrink-0 to never get squeezed
   - All nav links use w-full for touch target size
═══════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [hidden,     setHidden]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY  = useRef(0)
  const { pathname } = useLocation()

  /* Helpers */
  const openMobile  = () => setMobileOpen(true)
  const closeMobile = () => setMobileOpen(false)

  /* 1. Close on route change */
  useEffect(() => { closeMobile() }, [pathname])

  /* 2. Lock body scroll */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  /* 3. Escape key */
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') closeMobile() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  /* 4. Close on desktop resize */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) closeMobile() }
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  /* 5. Scroll: glass + auto-hide */
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = lastScrollY.current
    setScrolled(y > 24)
    setHidden(y > 200 ? (y > prev && y > 240) : false)
    lastScrollY.current = y
  })

  return (
    <>
      {/* ══ Header ══════════════════════════════════════════ */}
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-[padding,background,border-color,box-shadow]',
          'duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? 'py-3 bg-[rgba(248,248,250,0.92)] backdrop-blur-2xl border-b border-[#E8E8EE] shadow-[0_1px_3px_rgba(13,13,18,0.05),0_4px_16px_rgba(13,13,18,0.04)]'
            : 'py-5 bg-transparent border-b border-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link
              to="/"
              onClick={closeMobile}
              className="flex items-center gap-3 shrink-0 group min-w-0"
              aria-label="QoderLabs home"
            >
              <motion.img
                src="/logo.png"
                alt="QoderLabs"
                width={34} height={34}
                className="object-contain select-none shrink-0"
                draggable={false}
                whileHover={{ rotate: [0, -7, 7, -3, 0], scale: 1.04 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
              <img
                src="/name.png"
                alt="QoderLabs"
                className="hidden sm:block h-[19px] w-auto object-contain select-none opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                draggable={false}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => cn(
                    'relative px-4 py-2 rounded-xl text-sm font-medium font-body',
                    'transition-colors duration-[180ms]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A]',
                    isActive ? 'text-[#0D0D12]' : 'text-[#56566E] hover:text-[#0D0D12]',
                  )}
                >
                  {({ isActive }) => (
                    <>
                      {label}
                      {isActive && (
                        <motion.span
                          layoutId="nav-pill"
                          className="absolute inset-0 rounded-xl bg-[#F2F2F6]"
                          style={{ zIndex: -1 }}
                          transition={{ type: 'spring', stiffness: 440, damping: 36, mass: 0.75 }}
                        />
                      )}
                      {!isActive && (
                        <motion.span
                          className="absolute bottom-1.5 left-4 right-4 h-px bg-[#0D0D12] rounded-full origin-left"
                          initial={{ scaleX: 0 }}
                          whileHover={{ scaleX: 1 }}
                          transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
                          aria-hidden="true"
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
            </nav>

            {/* Right: CTA + hamburger */}
            <div className="flex items-center gap-3 shrink-0">

              {/* Desktop CTA */}
              <Link
                to="/contact"
                className={cn(
                  'hidden lg:inline-flex items-center gap-2 whitespace-nowrap',
                  'px-5 py-2.5 rounded-xl text-sm font-medium font-body text-white',
                  'bg-[#0D0D12] hover:bg-[#0D0D12]/85',
                  'shadow-[0_2px_8px_rgba(13,13,18,0.12),0_4px_16px_rgba(13,13,18,0.08)]',
                  'hover:shadow-[0_4px_16px_rgba(13,13,18,0.16),0_8px_32px_rgba(13,13,18,0.10)]',
                  'transition-all duration-[220ms]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A] focus-visible:ring-offset-2',
                )}
              >
                Start a project
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </Link>

              {/* Hamburger — OPEN only, no state toggle confusion */}
              <button
                type="button"
                onClick={openMobile}
                aria-label="Open navigation"
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav-drawer"
                className={cn(
                  'lg:hidden w-10 h-10',
                  'flex flex-col items-center justify-center gap-[5px]',
                  'rounded-xl cursor-pointer',
                  'hover:bg-[#F2F2F6] transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A]',
                )}
              >
                <span className="block w-[18px] h-[1.5px] bg-[#0D0D12] rounded-full" />
                <span className="block w-[18px] h-[1.5px] bg-[#0D0D12] rounded-full" />
                <span className="block w-[18px] h-[1.5px] bg-[#0D0D12] rounded-full" />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ══ Mobile drawer + backdrop ════════════════════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop — z-[60], click closes menu */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.20 }}
              onClick={closeMobile}
              className="fixed inset-0 z-[60] lg:hidden cursor-pointer"
              style={{ background: 'rgba(13,13,18,0.24)', backdropFilter: 'blur(3px)' }}
              aria-hidden="true"
            />

            {/* Drawer panel — z-[70], always above backdrop */}
            <motion.aside
              key="drawer"
              id="mobile-nav-drawer"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.85 }}
              className={cn(
                'fixed top-0 right-0 bottom-0 z-[70]',
                'w-[min(300px,85vw)]',     /* never overflows on 320px screens */
                'flex flex-col',
                'bg-[rgba(248,248,250,0.97)] backdrop-blur-2xl',
                'border-l border-[#E8E8EE]',
                'shadow-[-8px_0_48px_rgba(13,13,18,0.10)]',
                'lg:hidden',
              )}
            >
              {/* ── Drawer header ──────────────────────────── */}
              <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#F2F2F6] shrink-0">
                <Link
                  to="/"
                  onClick={closeMobile}
                  className="flex items-center gap-2.5 min-w-0"
                >
                  <img src="/logo.png" alt="QoderLabs" width={26} height={26} className="object-contain shrink-0" />
                  <img src="/name.png" alt="QoderLabs" className="h-[15px] w-auto object-contain opacity-90" />
                </Link>

                {/*
                  CLOSE BUTTON — this is the fix.
                  - type="button" prevents any form submission side-effects
                  - onClick={closeMobile} is the explicit handler
                  - relative z-10 ensures it's always on top inside the drawer
                  - No pointer-events issues; no z-index conflict with backdrop
                    because drawer (z-[70]) > backdrop (z-[60])
                */}
                <button
                  type="button"
                  onClick={closeMobile}
                  aria-label="Close navigation"
                  className={cn(
                    'relative z-10 shrink-0',
                    'w-9 h-9 flex items-center justify-center',
                    'rounded-xl cursor-pointer',
                    'text-[#94949E] hover:text-[#0D0D12]',
                    'hover:bg-[#F2F2F6] transition-colors duration-150',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A]',
                  )}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 1l12 12M13 1L1 13" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
                  </svg>
                </button>
              </div>

              {/* ── Nav links ──────────────────────────────── */}
              <nav
                className="flex flex-col gap-1 px-4 py-4 flex-1 overflow-y-auto"
                aria-label="Mobile navigation"
              >
                {NAV_LINKS.map(({ label, path }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 14 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay:    i * 0.04 + 0.05,
                      duration: 0.30,
                      ease:     [0.16, 1, 0.3, 1],
                    }}
                  >
                    <NavLink
                      to={path}
                      onClick={closeMobile}    /* ← FIXES: menu closes on nav */
                      className={({ isActive }) => cn(
                        'flex items-center justify-between w-full',
                        'px-4 py-3.5 rounded-xl',
                        'text-sm font-medium font-body',
                        'transition-colors duration-150',
                        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A]',
                        isActive
                          ? 'bg-[#F2F2F6] text-[#0D0D12]'
                          : 'text-[#56566E] hover:text-[#0D0D12] hover:bg-[#F8F8FA]',
                      )}
                    >
                      {({ isActive }) => (
                        <>
                          <span>{label}</span>
                          {isActive && (
                            <span
                              className="w-1.5 h-1.5 rounded-full shrink-0"
                              style={{ background: 'var(--gradient-logo)' }}
                            />
                          )}
                        </>
                      )}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              {/* ── Drawer CTA ─────────────────────────────── */}
              <div className="px-4 pb-6 pt-3 border-t border-[#F2F2F6] shrink-0">
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.28, duration: 0.30, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to="/contact"
                    onClick={closeMobile}    /* ← also closes on CTA tap */
                    className={cn(
                      'flex items-center justify-center gap-2 w-full',
                      'px-5 py-3.5 rounded-xl',
                      'text-sm font-semibold font-body text-white',
                      'bg-[#0D0D12] hover:bg-[#0D0D12]/85',
                      'transition-colors duration-150',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A] focus-visible:ring-offset-2',
                    )}
                  >
                    Start a project →
                  </Link>
                </motion.div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}