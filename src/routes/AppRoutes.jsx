import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@layouts/MainLayout'

/* ─── Lazy-loaded pages ──────────────────────────────────────── */
const Home           = lazy(() => import('@pages/Home'))
const About          = lazy(() => import('@pages/About'))
const Services       = lazy(() => import('@pages/Services'))
const Portfolio      = lazy(() => import('@pages/Portfolio'))
const ProjectDetails = lazy(() => import('@pages/ProjectDetails'))
const Team           = lazy(() => import('@pages/Team'))
const Careers        = lazy(() => import('@pages/Careers'))
const Contact        = lazy(() => import('@pages/Contact'))
const NotFound       = lazy(() => import('@pages/NotFound'))

/* ─── Page-level loading fallback ────────────────────────────── */
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface-50">
      <div className="flex flex-col items-center gap-3">
        <span className="inline-block w-8 h-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
        <p className="text-xs font-mono text-ink-light uppercase tracking-widest">Loading…</p>
      </div>
    </div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Route Map
   /                  → Home
   /about             → About
   /services          → Services
   /portfolio         → Portfolio (listing)
   /portfolio/:slug   → ProjectDetails (single project)
   /team              → Team
   /careers           → Careers
   /contact           → Contact
   *                  → NotFound (404)
═══════════════════════════════════════════════════════════════ */

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"                  element={<Home />} />
          <Route path="/about"             element={<About />} />
          <Route path="/services"          element={<Services />} />
          <Route path="/portfolio"         element={<Portfolio />} />
          <Route path="/portfolio/:slug"   element={<ProjectDetails />} />
          <Route path="/team"              element={<Team />} />
          <Route path="/careers"           element={<Careers />} />
          <Route path="/contact"           element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
