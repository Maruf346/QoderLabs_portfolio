import { motion } from 'framer-motion'
import { staggerContainer, slideUp, fadeIn, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   About — Intro Section
   — Full-width hero-style opener (not full-viewport)
   — Centered headline + paragraph + badge strip
   — Soft radial glow + dot-grid texture
   — Stagger text entrance
═══════════════════════════════════════════════════════════════ */

const PILLARS = [
  'Premium Quality',
  'Clean Code',
  'On-Time Delivery',
  'Transparent Process',
]

export default function AboutIntro() {
  return (
    <section className="relative pt-36 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-surface-50">

      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(74,127,212,0.11) 0%, rgba(58,122,58,0.06) 50%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0F0F14 1px, transparent 1px)',
          backgroundSize: '28px 28px',
        }}
      />

      {/* Bottom divider */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #EAEAEE 20%, #D8D8E0 50%, #EAEAEE 80%, transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          {/* Eyebrow */}
          <motion.div variants={slideUp} className="mb-6">
            <span className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-1.5 rounded-full',
              'text-xs font-mono font-medium tracking-widest uppercase',
              'bg-white border border-surface-200',
              'text-ink-muted shadow-card',
            )}>
              <span
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--gradient-logo)' }}
              />
              About QoderLabs
            </span>
          </motion.div>

          {/* Headline */}
          <motion.h1
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-[clamp(2.4rem,6vw,4.5rem)]',
              'leading-[1.04] tracking-[-0.038em]',
              'mb-6',
            )}
          >
            We build software{' '}
            <span
              style={{
                background: 'var(--gradient-logo)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              that matters.
            </span>
          </motion.h1>

          {/* Body */}
          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base sm:text-lg md:text-xl leading-relaxed mb-10 max-w-2xl"
          >
            QoderLabs is a premium software agency built by engineers and designers
            who refuse to ship average work. Since day one, our mission has been
            simple: take great ideas and turn them into products people love using.
          </motion.p>

          {/* Pillar badges */}
          <motion.div
            variants={slideUp}
            className="flex flex-wrap items-center justify-center gap-2"
          >
            {PILLARS.map((pillar, i) => (
              <motion.span
                key={pillar}
                initial={{ opacity: 0, scale: 0.88 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + i * 0.08, duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                className={cn(
                  'px-4 py-1.5 rounded-full',
                  'text-xs font-mono font-medium',
                  'bg-white border border-surface-200',
                  'text-ink-muted shadow-card',
                )}
              >
                {pillar}
              </motion.span>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
