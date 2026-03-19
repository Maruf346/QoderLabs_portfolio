import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { pageTransition } from '@utils/animations'
import { getProjectsByCategory } from '@data/projects'
import PortfolioHeader from '@components/portfolio/PortfolioHeader'
import ProjectGrid     from '@components/portfolio/ProjectGrid'
import CTA             from '@components/home/CTA'

/* ═══════════════════════════════════════════════════════════════
   Portfolio Page
   — Filterable project listing with category tabs
   — Animated filter transitions via AnimatePresence in ProjectGrid
   — Shared CTA banner at bottom

   Layout:
     1. PortfolioHeader  — title + description + category filter tabs
     2. ProjectGrid      — responsive card grid with stagger
     3. CTA banner       — shared conversion section
═══════════════════════════════════════════════════════════════ */

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState('all')

  // Memoised filter — recalculates only when category changes
  const filteredProjects = useMemo(
    () => getProjectsByCategory(activeCategory),
    [activeCategory],
  )

  const handleCategoryChange = (category) => {
    setActiveCategory(category)
  }

  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 1 ── Page header + filter tabs */}
      <PortfolioHeader
        activeCategory={activeCategory}
        onCategoryChange={handleCategoryChange}
      />

      {/* 2 ── Project grid */}
      <section className="py-12 md:py-16 bg-surface-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <ProjectGrid projects={filteredProjects} />
        </div>
      </section>

      {/* 3 ── CTA banner */}
      <CTA />
    </motion.div>
  )
}
