import { useState, useEffect, useRef } from 'react'
import { NavLink, Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion'
import { NAV_LINKS } from '@data/navigation'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Navbar — Premium polish upgrade
   — Transparent → glass on scroll with expo transition
   — Auto-hides on scroll-down past 200px, reveals on scroll-up
   — Active link: spring animated pill (layoutId)
   — Hover: subtle color shift + underline micro-interaction
   — Mobile drawer: spring slide-in, backdrop blur, stagger links
   — Logo image: subtle rotate wiggle on hover
═══════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [hidden,     setHidden]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY = useRef(0)
  const { pathname } = useLocation()

  // Close drawer on navigation
  useEffect(() => { setMobileOpen(false) }, [pathname])

  // Scroll tracking
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = lastScrollY.current
    setScrolled(y > 20)
    if (y > 200) setHidden(y > prev && y > 240)
    else          setHidden(false)
    lastScrollY.current = y
  })

  // Lock scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  // Escape closes drawer
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') setMobileOpen(false) }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  return (
    <>
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-[padding,background,border-color,box-shadow]',
          'duration-[380ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? [
                'py-3',
                'bg-[rgba(248,248,250,0.88)]',
                'backdrop-blur-2xl',
                'border-b border-[#E8E8EE]',
                'shadow-[0_1px_3px_rgba(13,13,18,0.05),0_4px_16px_rgba(13,13,18,0.04)]',
              ].join(' ')
            : 'py-5 bg-transparent border-b border-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between gap-4">

            {/* ── Logo ─────────────────────────────────── */}
            <Link
              to="/"
              className="flex items-center gap-3 shrink-0 group"
              aria-label="QoderLabs — home"
            >
              <motion.img
                src="/logo.png"
                alt="QoderLabs"
                width={34}
                height={34}
                className="object-contain no-select"
                draggable={false}
                whileHover={{ rotate: [0, -7, 7, -3, 0], scale: 1.04 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
              <img
                src="/name.png"
                alt="QoderLabs wordmark"
                className="hidden sm:block h-[19px] w-auto object-contain no-select opacity-90 group-hover:opacity-100 transition-opacity duration-200"
                draggable={false}
              />
            </Link>

            {/* ── Desktop nav ──────────────────────────── */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, path }) => (
                <NavLink
                  key={path}
                  to={path}
                  className={({ isActive }) => cn(
                    'relative px-4 py-2 rounded-xl',
                    'text-sm font-medium font-body',
                    'transition-colors duration-[180ms]',
                    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                    isActive
                      ? 'text-[#0D0D12]'
                      : 'text-[#56566E] hover:text-[#0D0D12]',
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
                      {/* Hover underline micro-interaction */}
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

            {/* ── Right: CTA + hamburger ────────────────── */}
            <div className="flex items-center gap-3">
              <Link
                to="/contact"
                className={cn(
                  'hidden lg:inline-flex items-center gap-2',
                  'px-5 py-2.5 rounded-xl',
                  'text-sm font-medium font-body text-white',
                  'bg-[#0D0D12] hover:bg-[#0D0D12]/82',
                  'shadow-[0_2px_8px_rgba(13,13,18,0.10),0_4px_16px_rgba(13,13,18,0.08)]',
                  'hover:shadow-[0_4px_16px_rgba(13,13,18,0.13),0_8px_32px_rgba(13,13,18,0.10)]',
                  'transition-all duration-[220ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
                )}
              >
                Start a project
                <motion.span
                  animate={{ x: [0, 2, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </Link>

              {/* Hamburger */}
              <motion.button
                className={cn(
                  'lg:hidden w-9 h-9',
                  'flex flex-col items-center justify-center gap-[5px]',
                  'rounded-xl',
                  'hover:bg-[#F2F2F6]',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue',
                )}
                onClick={() => setMobileOpen(v => !v)}
                whileTap={{ scale: 0.92 }}
                aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={mobileOpen}
                aria-controls="mobile-nav"
              >
                <motion.span
                  animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 7 : 0 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-[18px] h-[1.5px] bg-[#0D0D12] rounded-full origin-center"
                />
                <motion.span
                  animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
                  transition={{ duration: 0.16 }}
                  className="block w-[18px] h-[1.5px] bg-[#0D0D12] rounded-full"
                />
                <motion.span
                  animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -7 : 0 }}
                  transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
                  className="block w-[18px] h-[1.5px] bg-[#0D0D12] rounded-full origin-center"
                />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* ── Mobile Drawer ────────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.24 }}
              className="fixed inset-0 z-40 lg:hidden"
              style={{ background: 'rgba(13,13,18,0.18)', backdropFilter: 'blur(4px)' }}
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />

            {/* Panel */}
            <motion.aside
              id="mobile-nav"
              key="drawer"
              initial={{ x: '100%', opacity: 0.6 }}
              animate={{ x: 0,      opacity: 1   }}
              exit={{ x: '100%',  opacity: 0   }}
              transition={{ type: 'spring', stiffness: 320, damping: 32, mass: 0.85 }}
              className={cn(
                'fixed top-0 right-0 bottom-0 z-50',
                'w-[min(300px,90vw)]',
                'flex flex-col px-5 pt-5 pb-8',
                'bg-[rgba(248,248,250,0.94)]',
                'backdrop-blur-2xl',
                'border-l border-[#E8E8EE]',
                'shadow-[-8px_0_48px_rgba(13,13,18,0.08)]',
                'lg:hidden',
              )}
              aria-label="Mobile navigation"
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between mb-8">
                <Link to="/" onClick={() => setMobileOpen(false)} className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="QoderLabs" width={28} height={28} className="object-contain" />
                  <img src="/name.png" alt="QoderLabs" className="h-[17px] w-auto object-contain opacity-90" />
                </Link>
                <motion.button
                  onClick={() => setMobileOpen(false)}
                  whileTap={{ scale: 0.88 }}
                  aria-label="Close menu"
                  className={cn(
                    'w-8 h-8 flex items-center justify-center rounded-lg',
                    'text-[#94949E] hover:text-[#0D0D12]',
                    'hover:bg-[#F2F2F6]',
                    'transition-colors duration-150',
                  )}
                >
                  <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                    <path d="M1 1l11 11M12 1L1 12"
                      stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </motion.button>
              </div>

              {/* Nav links — staggered */}
              <nav className="flex flex-col gap-1 flex-1" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, path }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{
                      delay:    i * 0.042 + 0.06,
                      duration: 0.38,
                      ease:     [0.16, 1, 0.3, 1],
                    }}
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
                          ? 'bg-[#F2F2F6] text-[#0D0D12]'
                          : 'text-[#56566E] hover:text-[#0D0D12] hover:bg-[#F8F8FA]',
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

              {/* CTA */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.34, duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
              >
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    'flex items-center justify-center gap-2',
                    'w-full px-5 py-3 rounded-xl',
                    'text-sm font-medium font-body text-white',
                    'bg-[#0D0D12] hover:bg-[#0D0D12]/85',
                    'transition-colors duration-150',
                  )}
                >
                  Start a project →
                </Link>
              </motion.div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  )
}