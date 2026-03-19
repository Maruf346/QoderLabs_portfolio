import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Testimonials Section
   — 3 testimonials in responsive grid
   — Large quote mark accent
   — Star rating, avatar initials, role/company
   — Stagger entrance, hover lift
   — Featured (first) card spans wider on lg
═══════════════════════════════════════════════════════════════ */

const TESTIMONIALS = [
  {
    id:       1,
    name:     'Sarah Mitchell',
    role:     'CTO',
    company:  'NovaPay',
    avatar:   'SM',
    color:    '#4A7FD4',
    colorBg:  'rgba(74,127,212,0.10)',
    stars:    5,
    featured: true,
    quote:    'QoderLabs completely transformed our payment infrastructure. They delivered a complex fintech dashboard in 8 weeks — on time, under budget, and with zero technical debt. The code quality alone was worth the engagement.',
  },
  {
    id:       2,
    name:     'James Okonkwo',
    role:     'Founder & CEO',
    company:  'LaunchPad AI',
    avatar:   'JO',
    color:    '#3A7A3A',
    colorBg:  'rgba(58,122,58,0.10)',
    stars:    5,
    featured: false,
    quote:    'The AI automation pipeline they built reduced our content production time by 70%. What impressed me most was how deeply they understood our business before writing a single line of code.',
  },
  {
    id:       3,
    name:     'Priya Sharma',
    role:     'Head of Product',
    company:  'Orbis Commerce',
    avatar:   'PS',
    color:    '#6B4A9B',
    colorBg:  'rgba(107,74,155,0.10)',
    stars:    5,
    featured: false,
    quote:    'We\'ve worked with three agencies before QoderLabs. None of them communicated as clearly or shipped as consistently. The mobile app they built became our highest-rated product ever.',
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function Testimonials() {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden bg-surface-50">

      {/* Gradient dividers */}
      {['top', 'bottom'].map((pos) => (
        <div
          key={pos}
          aria-hidden="true"
          className={`absolute ${pos}-0 left-0 right-0 h-px`}
          style={{
            background:
              'linear-gradient(90deg, transparent, #EAEAEE 20%, #D8D8E0 50%, #EAEAEE 80%, transparent)',
          }}
        />
      ))}

      {/* Cool background glow */}
      <div
        aria-hidden="true"
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 55% at 50% 100%, rgba(74,127,212,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* ── Section header ───────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.default}
          className="text-center mb-14 md:mb-18"
        >
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue opacity-70" />
            Client Stories
          </motion.p>

          <motion.h2
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-3xl sm:text-4xl md:text-5xl',
              'leading-[1.08] tracking-[-0.032em]',
              'mb-4',
            )}
          >
            Trusted by{' '}
            <span
              style={{
                background: 'var(--gradient-logo)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              builders
            </span>
          </motion.h2>

          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto"
          >
            Don't take our word for it. Here's what the people we've built for have to say.
          </motion.p>
        </motion.div>

        {/* ── Testimonials grid ────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={t.id} testimonial={t} index={i} />
          ))}
        </div>

        {/* ── Trust strip ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport.default}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-10"
        >
          {[
            { value: '50+', label: 'Happy clients' },
            { value: '4.9★', label: 'Average rating' },
            { value: '100%', label: 'On-time delivery' },
          ].map(({ value, label }) => (
            <div key={label} className="flex items-center gap-2">
              <span
                className="font-display font-bold text-xl"
                style={{
                  background: 'var(--gradient-logo)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                {value}
              </span>
              <span className="text-sm text-ink-muted font-body">{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Testimonial Card ───────────────────────────────────────── */
function TestimonialCard({ testimonial, index }) {
  const { name, role, company, avatar, color, colorBg, stars, quote } = testimonial

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className={cn(
        'relative flex flex-col gap-5 p-6',
        'bg-white rounded-2xl',
        'border border-surface-200',
        'shadow-card hover:shadow-card-hover',
        'transition-shadow duration-300',
        'overflow-hidden group',
      )}
    >
      {/* Large decorative quote mark */}
      <div
        aria-hidden="true"
        className="absolute -top-3 -right-1 font-display font-bold text-[100px] leading-none select-none pointer-events-none transition-opacity duration-300 opacity-[0.04] group-hover:opacity-[0.07]"
        style={{ color }}
      >
        "
      </div>

      {/* Stars */}
      <div className="flex items-center gap-0.5" aria-label={`${stars} out of 5 stars`}>
        {Array.from({ length: stars }).map((_, i) => (
          <svg key={i} width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
            <path
              d="M6.5 1l1.545 3.13 3.455.502-2.5 2.437.59 3.44L6.5 8.885 3.91 10.51l.59-3.44L2 4.632l3.455-.502L6.5 1z"
              fill="#F5C842"
            />
          </svg>
        ))}
      </div>

      {/* Quote text */}
      <blockquote className="text-sm text-ink leading-relaxed flex-1 font-body relative z-10">
        "{quote}"
      </blockquote>

      {/* Author row */}
      <div className="flex items-center gap-3 pt-1 border-t border-surface-100">
        {/* Avatar */}
        <div
          className="w-9 h-9 rounded-full flex items-center justify-center shrink-0"
          style={{ background: colorBg, border: `1.5px solid ${color}28` }}
        >
          <span
            className="text-xs font-mono font-bold"
            style={{ color }}
          >
            {avatar}
          </span>
        </div>

        {/* Name + role */}
        <div className="flex flex-col min-w-0">
          <span className="text-sm font-semibold font-body text-ink leading-tight truncate">
            {name}
          </span>
          <span className="text-xs text-ink-light font-mono truncate">
            {role} · {company}
          </span>
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 right-0 h-[2px] origin-left"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
        transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
        style={{ background: `linear-gradient(90deg, ${color}, ${color}44)` }}
      />
    </motion.div>
  )
}
