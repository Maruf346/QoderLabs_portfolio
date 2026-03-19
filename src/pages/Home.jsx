import { motion } from 'framer-motion'
import { pageTransition } from '@utils/animations'
import Hero            from '@components/home/Hero'
import ServicesPreview from '@components/home/ServicesPreview'
import TechStack       from '@components/home/TechStack'

/* ═══════════════════════════════════════════════════════════════
   Home Page
   Batch 1 sections:
     1. Hero           — headline, CTA, background orbs
     2. ServicesPreview— 4 service cards with hover glow
     3. TechStack      — technology badges grid

   More sections will be added in subsequent batches:
     — Stats / Social proof
     — Portfolio preview
     — Testimonials
     — CTA / Contact banner
═══════════════════════════════════════════════════════════════ */

export default function Home() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* ── 1. Hero ─────────────────────────────────────── */}
      <Hero />

      {/* ── 2. Services Preview ─────────────────────────── */}
      <ServicesPreview />

      {/* ── 3. Tech Stack ───────────────────────────────── */}
      <TechStack />

      {/*
        ── Placeholder: upcoming sections ─────────────────
        <StatsBar />
        <PortfolioPreview />
        <Testimonials />
        <CTABanner />
      */}
    </motion.div>
  )
}
