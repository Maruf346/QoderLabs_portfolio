import { Routes, Route } from 'react-router-dom'
import { lazy, Suspense } from 'react'
import MainLayout from '@layouts/MainLayout'

// Pages — lazy loaded for performance
const Home      = lazy(() => import('@pages/Home'))
const About     = lazy(() => import('@pages/About'))
const Services  = lazy(() => import('@pages/Services'))
const Portfolio = lazy(() => import('@pages/Portfolio'))
const Team      = lazy(() => import('@pages/Team'))
const Careers   = lazy(() => import('@pages/Careers'))
const Contact   = lazy(() => import('@pages/Contact'))
const NotFound  = lazy(() => import('@pages/NotFound'))

// Minimal page-level loading fallback
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <span className="inline-block w-8 h-8 rounded-full border-2 border-brand-blue border-t-transparent animate-spin" />
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/"          element={<Home />} />
          <Route path="/about"     element={<About />} />
          <Route path="/services"  element={<Services />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/team"      element={<Team />} />
          <Route path="/careers"   element={<Careers />} />
          <Route path="/contact"   element={<Contact />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  )
}
