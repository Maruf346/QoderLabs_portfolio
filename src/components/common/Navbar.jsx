import { useState, useEffect, useRef } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { NAV_LINKS } from '@data/navigation'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Navbar — Bulletproof mobile menu

   ROOT CAUSE OF ALL BUGS (now permanently fixed in AppRoutes):
   ─────────────────────────────────────────────────────────────
   The previous AppRoutes wrapped a SINGLE <Suspense> around the
   whole <Routes> tree including MainLayout. Every time a lazy
   page chunk loaded, Suspense unmounted EVERYTHING — including
   this Navbar — then remounted it fresh. On remount:

     • mobileOpen resets to false (useState initial value)
     • But the CSS drawer transition was mid-animation
     • Drawer visually stuck open + backdrop lingered
     • X button unresponsive (component just remounted)
     • useEffect pathname close() fired on wrong cycle

   FIX IN AppRoutes.jsx:
   Suspense now wraps each PAGE individually. MainLayout and
   this Navbar stay mounted permanently. Navbar state is never
   interrupted by lazy loading.

   ADDITIONAL HARDENING IN THIS FILE:
   ─────────────────────────────────────────────────────────────
   1. Drawer is always in DOM — CSS transform controls visibility
   2. pointer-events-none when closed = no ghost hit areas
   3. inert attribute when closed = removes from a11y + event tree
   4. All interactive elements are plain <button> / <Link>
      with no Framer wrappers (motion.button causes iOS tap issues)
   5. Body scroll lock with scrollbar-width compensation
   6. 5 redundant close triggers: onClick, pathname effect,
      Escape key, resize to desktop, backdrop tap
═══════════════════════════════════════════════════════════════ */

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [hidden,     setHidden]     = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const lastScrollY  = useRef(0)
  const drawerRef    = useRef(null)
  const { pathname } = useLocation()

  const open  = () => setMobileOpen(true)
  const close = () => setMobileOpen(false)

  /* ── 1. Close on every route change ────────────────────── */
  useEffect(() => {
    close()
  }, [pathname])

  /* ── 2. Body scroll lock ────────────────────────────────── */
  useEffect(() => {
    if (mobileOpen) {
      const sw = window.innerWidth - document.documentElement.clientWidth
      document.body.style.overflow     = 'hidden'
      document.body.style.paddingRight = `${sw}px`
    } else {
      document.body.style.overflow     = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow     = ''
      document.body.style.paddingRight = ''
    }
  }, [mobileOpen])

  /* ── 3. inert attribute — removes drawer from event tree ── */
  useEffect(() => {
    const el = drawerRef.current
    if (!el) return
    if (mobileOpen) {
      el.removeAttribute('inert')
    } else {
      el.setAttribute('inert', '')
    }
  }, [mobileOpen])

  /* ── 4. Escape key ──────────────────────────────────────── */
  useEffect(() => {
    const fn = (e) => { if (e.key === 'Escape') close() }
    document.addEventListener('keydown', fn)
    return () => document.removeEventListener('keydown', fn)
  }, [])

  /* ── 5. Close when resized to desktop ───────────────────── */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 1024) close() }
    window.addEventListener('resize', fn, { passive: true })
    return () => window.removeEventListener('resize', fn)
  }, [])

  /* ── Scroll: glass navbar + auto-hide ──────────────────── */
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = lastScrollY.current
    setScrolled(y > 24)
    setHidden(y > 200 ? (y > prev && y > 240) : false)
    lastScrollY.current = y
  })

  return (
    <>
      {/* ════════════════════════════════════════════════════
          HEADER
      ════════════════════════════════════════════════════ */}
      <motion.header
        animate={{ y: hidden ? '-110%' : '0%' }}
        transition={{ duration: 0.38, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          'fixed top-0 left-0 right-0 z-50',
          'transition-[padding,background,border-color,box-shadow]',
          'duration-[360ms] ease-[cubic-bezier(0.16,1,0.3,1)]',
          scrolled
            ? 'py-3 bg-[rgba(248,248,250,0.96)] backdrop-blur-2xl border-b border-[#E8E8EE] shadow-[0_1px_3px_rgba(13,13,18,0.05),0_4px_16px_rgba(13,13,18,0.04)]'
            : 'py-5 bg-transparent border-b border-transparent',
        )}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="flex items-center justify-between gap-4">

            {/* Logo */}
            <Link
              to="/"
              onClick={close}
              className="flex items-center gap-0 shrink-0 group min-w-0"
              aria-label="QoderLabs home"
            >
              <motion.img
                src="/logo.png"
                alt="QoderLabs"
                width={84} height={84}
                className="object-contain select-none shrink-0"
                draggable={false}
                whileHover={{ rotate: [0, -7, 7, -3, 0], scale: 1.04 }}
                transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
              />
              <img
                src="/name.png"
                alt="QoderLabs"
                className="hidden sm:block h-[65px] w-auto object-contain select-none opacity-90 group-hover:opacity-100 transition-opacity duration-200 -ml-12"
                draggable={false}
              />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-0.5" aria-label="Main navigation">
              {NAV_LINKS.map(({ label, path }) => {
                const isActive = pathname === path ||
                  (path !== '/' && pathname.startsWith(path))
                return (
                  <Link
                    key={path}
                    to={path}
                    className={cn(
                      'relative px-4 py-2 rounded-xl',
                      'text-sm font-medium font-body',
                      'transition-colors duration-[180ms]',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A]',
                      isActive ? 'text-[#0D0D12]' : 'text-[#56566E] hover:text-[#0D0D12]',
                    )}
                  >
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
                  </Link>
                )
              })}
            </nav>

            {/* Right side: desktop CTA + hamburger */}
            <div className="flex items-center gap-2 shrink-0">

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

              {/* ── HAMBURGER ──────────────────────────────
               * Plain <button type="button"> — no Framer wrapper.
               * motion.button causes iOS Safari to drop touch events
               * when Framer is mid-transition. Plain button = reliable.
               ─────────────────────────────────────────────────── */}
              <button
                type="button"
                onClick={open}
                aria-label="Open navigation menu"
                aria-expanded={mobileOpen}
                aria-controls="mobile-drawer"
                className={cn(
                  'lg:hidden',
                  'flex flex-col items-center justify-center gap-[5px]',
                  'w-10 h-10 min-w-[44px] min-h-[44px]',
                  'rounded-xl cursor-pointer',
                  'hover:bg-[#F2F2F6] active:bg-[#EBEBEB]',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A]',
                )}
              >
                {/* All 3 bars identical — no stray self-start or ml offsets */}
                <span className="block w-[18px] h-[1.5px] bg-[#0D0D12] rounded-full" />
                <span className="block w-[18px] h-[1.5px] bg-[#0D0D12] rounded-full" />
                <span className="block w-[18px] h-[1.5px] bg-[#0D0D12] rounded-full" />
              </button>

            </div>
          </div>
        </div>
      </motion.header>

      {/* ════════════════════════════════════════════════════
          BACKDROP
          Always in DOM. CSS opacity + pointer-events controls
          visibility. No AnimatePresence = no unmount/remount.
      ════════════════════════════════════════════════════ */}
      <div
        onClick={close}
        aria-hidden="true"
        className={cn(
          'fixed inset-0 z-[60] lg:hidden cursor-pointer',
          'transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          mobileOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none',
        )}
        style={{
          background:           'rgba(13,13,18,0.32)',
          backdropFilter:       'blur(3px)',
          WebkitBackdropFilter: 'blur(3px)',
        }}
      />

      {/* ════════════════════════════════════════════════════
          DRAWER
          Always in DOM. CSS transform + pointer-events + inert
          controls open/closed state. No AnimatePresence.

          THREE layers of protection when closed:
            1. translate-x-full  → visually off screen
            2. pointer-events-none → can't be clicked/tapped
            3. inert (via ref useEffect) → removed from event
               tree and accessibility tree entirely
      ════════════════════════════════════════════════════ */}
      <aside
        ref={drawerRef}
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={cn(
          'fixed top-0 right-0 bottom-0 z-[70]',
          'w-[min(300px,85vw)]',
          'flex flex-col',
          'bg-[#F8F8FA]',
          'border-l border-[#E8E8EE]',
          'shadow-[-12px_0_48px_rgba(13,13,18,0.12)]',
          'lg:hidden',
          'transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]',
          mobileOpen
            ? 'translate-x-0   pointer-events-auto'
            : 'translate-x-full pointer-events-none',
        )}
      >

        {/* ── Drawer header: logo + X ────────────────────── */}
        <div className="flex items-center justify-between px-5 pt-5 pb-4 border-b border-[#EBEBEB] shrink-0">

          <Link
            to="/"
            onClick={close}
            className="flex items-center gap-2.5 min-w-0"
          >
            <img src="/logo.png" alt="QoderLabs" width={26} height={26} className="object-contain shrink-0" />
            <img src="/name.png" alt="QoderLabs" className="h-[15px] w-auto object-contain opacity-90" />
          </Link>

          {/* ── X CLOSE BUTTON ─────────────────────────────
           * Plain <button type="button"> — no Framer wrapper.
           * 44×44px touch target. onClick={close} directly.
           * Works because drawer is always mounted — no
           * remount on navigation (Suspense is per-page now).
           ─────────────────────────────────────────────── */}
          <button
            type="button"
            onClick={close}
            aria-label="Close navigation menu"
            className={cn(
              'shrink-0 flex items-center justify-center',
              'min-w-[44px] min-h-[44px] rounded-xl',
              'cursor-pointer',
              'text-[#56566E] hover:text-[#0D0D12]',
              'hover:bg-[#EBEBEB] active:bg-[#E4E4E4]',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A]',
            )}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path
                d="M2 2l12 12M14 2L2 14"
                stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* ── Nav links ──────────────────────────────────── */}
        <nav
          className="flex flex-col gap-0.5 px-3 py-3 flex-1 overflow-y-auto"
          aria-label="Page navigation"
        >
          {NAV_LINKS.map(({ label, path }) => {
            const isActive = pathname === path ||
              (path !== '/' && pathname.startsWith(path))
            return (
              /* Plain <Link> with onClick={close}.
               * No motion.div wrapper — Framer wrappers intercept
               * touch events on Android Chrome before they reach
               * the <a> tag inside. Plain div = tap always fires. */
              <Link
                key={path}
                to={path}
                onClick={close}
                className={cn(
                  'flex items-center justify-between',
                  'w-full px-4 py-3.5 rounded-xl',
                  'text-[15px] font-medium font-body',
                  'min-h-[44px]',
                  'transition-colors duration-150',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A]',
                  isActive
                    ? 'bg-[#EBEBEB] text-[#0D0D12]'
                    : 'text-[#56566E] hover:text-[#0D0D12] hover:bg-[#F2F2F6] active:bg-[#EBEBEB]',
                )}
              >
                {label}
                {isActive && (
                  <span
                    className="w-1.5 h-1.5 rounded-full shrink-0"
                    style={{ background: 'var(--gradient-logo)' }}
                  />
                )}
              </Link>
            )
          })}
        </nav>

        {/* ── CTA ────────────────────────────────────────── */}
        <div className="px-4 pb-8 pt-3 border-t border-[#EBEBEB] shrink-0">
          <Link
            to="/contact"
            onClick={close}
            className={cn(
              'flex items-center justify-center gap-2 w-full',
              'px-5 py-3.5 rounded-xl min-h-[44px]',
              'text-sm font-semibold font-body text-white',
              'bg-[#0D0D12] hover:bg-[#1A1A1A] active:bg-[#252525]',
              'transition-colors duration-150',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3A6B2A] focus-visible:ring-offset-2',
            )}
          >
            Start a project →
          </Link>
        </div>

      </aside>
    </>
  )
}