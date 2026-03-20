import { motion } from 'framer-motion'
import { staggerContainer, slideUp } from '@utils/animations'
import { cn } from '@utils/cn'

export default function ContactHero() {
  return (
    <section className="relative pt-36 pb-14 md:pt-44 md:pb-16 bg-surface-50 overflow-hidden">

      {/* Gradient glow — top left green, top right red, matching name.png palette */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 w-[500px] h-[380px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 0% 0%, rgba(58,107,42,0.09) 0%, transparent 70%)',
        }}
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[420px] h-[320px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 65% 55% at 100% 0%, rgba(174,56,32,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0D0D12 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Bottom rule — gradient line */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #6B6218 20%, #9E481A 50%, #6B6218 80%, transparent)',
          opacity: 0.25,
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-2xl"
        >
          {/* Eyebrow — gradient dot */}
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-5"
          >
            <span
              className="w-1.5 h-1.5 rounded-full shrink-0"
              style={{ background: 'var(--gradient-logo)' }}
            />
            Contact Us
          </motion.p>

          {/* Headline — "in Touch" is gradient */}
          <motion.h1
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-[clamp(2.4rem,6vw,4rem)]',
              'leading-[1.06] tracking-[-0.036em]',
              'mb-5',
            )}
          >
            Get{' '}
            <span className="text-gradient-logo">in Touch</span>
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
