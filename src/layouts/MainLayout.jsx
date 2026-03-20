import { Outlet, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import Navbar from '@components/common/Navbar'
import Footer from '@components/common/Footer'

export default function MainLayout() {
  const { pathname } = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="flex flex-col min-h-screen bg-surface-50 overflow-x-hidden">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
