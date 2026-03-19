import { useState, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { NAV_LINKS } from '@data/navigation'
import Logo from '@components/common/Logo'

export default function Navbar() {
  const [scrolled,   setScrolled]   = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  // Shrink navbar on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const onResize = () => { if (window.innerWidth >= 1024) setMobileOpen(false) }
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'py-3 glass shadow-card'
            : 'py-5 bg-transparent'
        }`}
      >
        <div className="container-xl section-padding flex items-center justify-between">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5" aria-label="QoderLabs home">
            <Logo size={32} />
            <span className="font-display font-bold text-lg tracking-tight text-ink">
              Qoder<span className="text-gradient">Labs</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-1" aria-label="Main navigation">
            {NAV_LINKS.map(({ label, path }) => (
              <NavLink
                key={path}
                to={path}
                className={({ isActive }) =>
                  `relative px-4 py-2 rounded-xl font-body text-sm font-medium transition-colors duration-200
                  ${isActive ? 'text-ink' : 'text-ink-muted hover:text-ink'}`
                }
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <motion.span
                        layoutId="nav-pill"
                        className="absolute inset-0 rounded-xl bg-surface-200"
                        style={{ zIndex: -1 }}
                        transition={{ type: 'spring', stiffness: 400, damping: 35 }}
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              to="/contact"
              className="px-5 py-2.5 rounded-xl text-sm font-medium font-body bg-ink text-white hover:bg-ink/85 transition-colors duration-200"
            >
              Start a project
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-surface-200 transition-colors"
            onClick={() => setMobileOpen(v => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <motion.span
              animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? 8 : 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-ink rounded-full origin-center"
            />
            <motion.span
              animate={{ opacity: mobileOpen ? 0 : 1, scaleX: mobileOpen ? 0 : 1 }}
              transition={{ duration: 0.15 }}
              className="block w-5 h-0.5 bg-ink rounded-full"
            />
            <motion.span
              animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? -8 : 0 }}
              transition={{ duration: 0.2 }}
              className="block w-5 h-0.5 bg-ink rounded-full origin-center"
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-ink/20 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />

            {/* Drawer panel */}
            <motion.div
              key="drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 350, damping: 35 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-72 glass flex flex-col px-6 pt-24 pb-8 lg:hidden"
            >
              <nav className="flex flex-col gap-1" aria-label="Mobile navigation">
                {NAV_LINKS.map(({ label, path }, i) => (
                  <motion.div
                    key={path}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.1 }}
                  >
                    <NavLink
                      to={path}
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        `block px-4 py-3 rounded-xl font-body font-medium transition-colors duration-200
                        ${isActive
                          ? 'bg-surface-200 text-ink'
                          : 'text-ink-muted hover:text-ink hover:bg-surface-100'
                        }`
                      }
                    >
                      {label}
                    </NavLink>
                  </motion.div>
                ))}
              </nav>

              <div className="mt-auto">
                <Link
                  to="/contact"
                  onClick={() => setMobileOpen(false)}
                  className="block w-full text-center px-5 py-3 rounded-xl font-medium font-body text-sm bg-ink text-white hover:bg-ink/85 transition-colors"
                >
                  Start a project
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
