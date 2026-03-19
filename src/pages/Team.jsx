import { motion } from 'framer-motion'
import { pageTransition, staggerContainer, slideUp } from '@utils/animations'
import { getAllMembers } from '@data/team'
import TeamGrid from '@components/team/TeamGrid'
import CTA      from '@components/home/CTA'
import { cn }   from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Team Page

   Layout:
     1. Page header  — title, description, member count
     2. Team grid    — leadership row + rest of team
     3. Hiring strip — solid bg nudge toward careers
     4. CTA banner   — shared conversion section
═══════════════════════════════════════════════════════════════ */

const memberCount = getAllMembers().length

export default function Team() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 1 ── Page header */}
      <TeamHeader />

      {/* 2 ── Team grid */}
      <section className="py-16 md:py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <TeamGrid />
        </div>
      </section>

      {/* 3 ── Hiring nudge */}
      <HiringStrip />

      {/* 4 ── CTA banner */}
      <CTA />
    </motion.div>
  )
}

/* ─── Page header ────────────────────────────────────────────── */
function TeamHeader() {
  return (
    <section className="relative pt-36 pb-14 md:pt-44 md:pb-16 bg-surface-50 overflow-hidden">

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0F0F14 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
        }}
      />

      {/* Subtle top glow — very faint */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[360px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(107,74,155,0.07) 0%, transparent 70%)',
        }}
      />

      {/* Bottom rule */}
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
            <span className="w-1.5 h-1.5 rounded-full bg-brand-purple" />
            The People
          </motion.p>

          {/* Title */}
          <motion.h1
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-[clamp(2.4rem,6vw,4rem)]',
              'leading-[1.06] tracking-[-0.036em]',
              'mb-5',
            )}
          >
            Meet Our Team
          </motion.h1>

          {/* Subtext */}
          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base sm:text-lg leading-relaxed mb-8"
          >
            A small, senior team of engineers, designers, and builders who care
            deeply about what they ship. No juniors doing the work while seniors
            take the credit — everyone here is hands-on.
          </motion.p>

          {/* Member count pill */}
          <motion.div variants={slideUp}>
            <div className={cn(
              'inline-flex items-center gap-2.5',
              'px-4 py-2 rounded-xl',
              'bg-white border border-surface-200',
              'shadow-card',
            )}>
              <div className="flex -space-x-1.5">
                {[
                  { initials: 'AK', color: '#4A7FD4', bg: 'rgba(74,127,212,0.15)'  },
                  { initials: 'PN', color: '#3A7A3A', bg: 'rgba(58,122,58,0.15)'   },
                  { initials: 'MR', color: '#6B4A9B', bg: 'rgba(107,74,155,0.15)' },
                ].map(({ initials, color, bg }) => (
                  <div
                    key={initials}
                    className="w-6 h-6 rounded-full border-2 border-white flex items-center justify-center"
                    style={{ background: bg }}
                  >
                    <span className="text-[8px] font-mono font-bold" style={{ color }}>
                      {initials}
                    </span>
                  </div>
                ))}
              </div>
              <span className="text-sm font-medium font-body text-ink">
                {memberCount} team members
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Hiring strip — solid bg, no gradient ──────────────────── */
function HiringStrip() {
  return (
    <section className="py-14 bg-white border-t border-surface-200 border-b">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6"
        >
          <div className="max-w-md">
            <p className="text-xs font-mono uppercase tracking-[0.15em] text-ink-light mb-2">
              We're growing
            </p>
            <h2 className="font-display font-bold text-xl sm:text-2xl text-ink tracking-[-0.022em] leading-snug mb-2">
              Want to join the team?
            </h2>
            <p className="text-sm text-ink-muted leading-relaxed">
              We hire carefully and deliberately. If you're exceptional at what you do
              and want to work on ambitious projects, we'd love to hear from you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            <a
              href="/careers"
              className={cn(
                'inline-flex items-center gap-2',
                'px-6 py-3 rounded-xl',
                'text-sm font-medium font-body text-white',
                'bg-ink hover:bg-ink/85',
                'transition-colors duration-150',
                'shadow-lift hover:shadow-lift-hover',
                'whitespace-nowrap',
              )}
            >
              View open roles
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                <path d="M2 6h8M6 2.5l3.5 3.5L6 9.5"
                  stroke="currentColor" strokeWidth="1.4"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </a>
            <a
              href="/contact"
              className={cn(
                'inline-flex items-center gap-2',
                'px-6 py-3 rounded-xl',
                'text-sm font-medium font-body text-ink-muted',
                'bg-surface-100 border border-surface-200',
                'hover:text-ink hover:border-surface-300',
                'transition-colors duration-150',
                'whitespace-nowrap',
              )}
            >
              Send a speculative CV
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
