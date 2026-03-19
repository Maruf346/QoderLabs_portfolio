import { motion } from 'framer-motion'
import { pageTransition } from '@utils/animations'
import AboutIntro   from '@components/about/AboutIntro'
import MissionVision from '@components/about/MissionVision'
import Stats        from '@components/about/Stats'
import CTA          from '@components/home/CTA'

/* ═══════════════════════════════════════════════════════════════
   About Page
   Section order:
     1. AboutIntro    — hero-style opener, headline + pillars
     2. MissionVision — mission card, vision card, company story
     3. Stats         — animated count-up metrics
     4. CTA           — shared conversion banner (reused from Home)
═══════════════════════════════════════════════════════════════ */

export default function About() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 1 ── Page intro / hero */}
      <AboutIntro />

      {/* 2 ── Mission, Vision + Company Story */}
      <MissionVision />

      {/* 3 ── Stats / metrics */}
      <Stats />

      {/* 4 ── Conversion CTA (shared component) */}
      <CTA />
    </motion.div>
  )
}
