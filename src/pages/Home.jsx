import { motion } from 'framer-motion'
import { pageTransition } from '@utils/animations'

// ── Batch 1 ──────────────────────────────────────────────────
import Hero            from '@components/home/Hero'
import ServicesPreview from '@components/home/ServicesPreview'
import TechStack       from '@components/home/TechStack'

// ── Batch 2 ──────────────────────────────────────────────────
import PortfolioHighlights from '@components/home/PortfolioHighlights'
import WhyChooseUs         from '@components/home/WhyChooseUs'
import Process             from '@components/home/Process'

// ── Batch 3 (final) ──────────────────────────────────────────
import Testimonials from '@components/home/Testimonials'
import FAQ          from '@components/home/FAQ'
import CTA          from '@components/home/CTA'

/* ═══════════════════════════════════════════════════════════════
   Home Page — COMPLETE
   9 sections in final order:

   1.  Hero                — full-viewport opening + mouse-parallax
   2.  ServicesPreview     — 4 service cards with hover glow
   3.  TechStack           — 12 tech badges in 2 category rows
   4.  PortfolioHighlights — 4 featured project cards (bento grid)
   5.  WhyChooseUs         — differentiators + animated stats
   6.  Process             — 4-step animated timeline
   7.  Testimonials        — 3 client quote cards
   8.  FAQ                 — 5-item accordion
   9.  CTA                 — dark gradient conversion banner
═══════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 1 ── Hero */}
      <Hero />

      {/* 2 ── What we do */}
      <ServicesPreview />

      {/* 3 ── Tech stack */}
      <TechStack />

      {/* 4 ── Featured work */}
      <PortfolioHighlights />

      {/* 5 ── Why us + stats */}
      <WhyChooseUs />

      {/* 6 ── How we work */}
      <Process />

      {/* 7 ── Client testimonials */}
      <Testimonials />

      {/* 8 ── FAQ */}
      <FAQ />

      {/* 9 ── CTA conversion banner */}
      <CTA />
    </motion.div>
  )
}
