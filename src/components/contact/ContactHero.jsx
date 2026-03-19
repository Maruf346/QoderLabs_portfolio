import { motion } from 'framer-motion'
import { staggerContainer, slideUp } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Contact Hero
   — Minimal page header, NO gradients
   — Solid surface-50 background
   — Strong typography, left-aligned
   — Subtle dot-grid texture only
═══════════════════════════════════════════════════════════════ */

export default function ContactHero() {
  return (
    <section className="relative pt-36 pb-14 md:pt-44 md:pb-16 bg-surface-50 overflow-hidden">

      {/* Dot grid — very subtle, solid ink dots only */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0F0F14 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Bottom rule — solid */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-surface-200" />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Eyebrow */}
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-5"
          >
            {/* Solid brand dot — no gradient */}
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue" />
            Contact Us
          </motion.p>

          {/* Headline — solid ink, no gradient text */}
          <motion.h1
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-[clamp(2.4rem,6vw,4rem)]',
              'leading-[1.06] tracking-[-0.036em]',
              'mb-5',
            )}
          >
            Get in Touch
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base sm:text-lg leading-relaxed"
          >
            Have a project in mind, a question, or just want to say hello?
            Fill out the form and we'll get back to you within one business day.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
