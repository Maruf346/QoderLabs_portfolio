import { motion } from 'framer-motion'
import { staggerContainer, slideUp, slideInLeft, slideInRight, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Mission & Vision + Company Story
   — Two-card mission/vision row
   — Full-width story section below
   — Cards: gradient icon, colored accent, hover lift
   — Story: typography-forward, large pull-quote
═══════════════════════════════════════════════════════════════ */

const CARDS = [
  {
    type:        'Mission',
    icon:        TargetIcon,
    color:       '#4A7FD4',
    colorBg:     'rgba(74,127,212,0.09)',
    colorBorder: 'rgba(74,127,212,0.18)',
    headline:    'Concept to Creation — without compromise.',
    body:        'Our mission is to bridge the gap between ambitious ideas and production-ready software. We partner with founders, product teams, and enterprises to design, engineer, and ship digital products that perform at the highest level.',
  },
  {
    type:        'Vision',
    icon:        CompassIcon,
    color:       '#3A7A3A',
    colorBg:     'rgba(58,122,58,0.09)',
    colorBorder: 'rgba(58,122,58,0.18)',
    headline:    'The agency that raises the bar for what software can be.',
    body:        "We envision a world where every product we touch becomes a benchmark for quality in its category. Not just functional — exceptional. We're building the studio we always wished existed when we were on the other side of the table.",
  },
]

const STORY_PARAGRAPHS = [
  'QoderLabs started in 2020 as a two-person consultancy with a single belief: most software agencies were shipping mediocrity and calling it done. We knew we could do better.',
  'Over the next two years, we quietly built a reputation — not through marketing, but through word of mouth. Every project we delivered was cleaner, faster, and more thoughtfully designed than what the client had seen before. Referrals turned into a team, and a team turned into a studio.',
  "Today, QoderLabs is a full-service digital product agency. We've shipped over 50 products across fintech, e-commerce, health-tech, and AI — and we're just getting started. The same obsession with quality that defined our first project defines everything we build today.",
]

export default function MissionVision() {
  return (
    <>
      {/* ══ Mission & Vision cards ════════════════════════════ */}
      <section className="relative py-20 md:py-28 bg-white overflow-hidden">

        {/* Subtle warm top-right glow */}
        <div
          aria-hidden="true"
          className="absolute top-0 right-0 w-[400px] h-[300px] pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 60% 60% at 100% 0%, rgba(196,98,45,0.06) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport.default}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-10"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue opacity-70" />
            What Drives Us
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {CARDS.map((card, i) => (
              <MissionCard key={card.type} card={card} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ Company Story ════════════════════════════════════ */}
      <section className="relative py-20 md:py-28 overflow-hidden">

        {/* Gradient bg */}
        <div
          className="absolute inset-0"
          style={{ background: 'var(--gradient-soft)' }}
          aria-hidden="true"
        />
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

        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 lg:gap-20 items-start">

            {/* Left: sticky label + pull-quote */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.default}
              className="lg:sticky lg:top-32 flex flex-col gap-6"
            >
              <p className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-70" />
                Our Story
              </p>

              {/* Large pull-quote */}
              <blockquote
                className={cn(
                  'font-display font-bold',
                  'text-2xl sm:text-3xl md:text-4xl',
                  'leading-[1.12] tracking-[-0.028em]',
                  'text-ink',
                )}
              >
                "Built by engineers who got tired of average."
              </blockquote>

              {/* Gradient line accent */}
              <div
                className="w-16 h-1 rounded-full"
                style={{ background: 'var(--gradient-logo)' }}
              />

              <p className="text-sm font-mono text-ink-light">
                QoderLabs — Est. 2020
              </p>
            </motion.div>

            {/* Right: story paragraphs */}
            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={viewport.default}
              className="flex flex-col gap-6"
            >
              {STORY_PARAGRAPHS.map((para, i) => (
                <motion.p
                  key={i}
                  variants={slideUp}
                  className="text-base md:text-lg text-ink-muted leading-relaxed font-body"
                >
                  {para}
                </motion.p>
              ))}

              {/* Founder note */}
              <motion.div
                variants={slideUp}
                className={cn(
                  'mt-4 p-5 rounded-2xl',
                  'bg-white/80 border border-white/70',
                  'shadow-card',
                )}
              >
                <p className="text-sm text-ink-muted leading-relaxed italic mb-3">
                  "We didn't start QoderLabs to build another agency.
                  We started it to build the kind of studio we always wished we could hire."
                </p>
                <div className="flex items-center gap-3">
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-mono font-bold"
                    style={{ background: 'rgba(74,127,212,0.12)', color: '#4A7FD4' }}
                  >
                    AK
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-ink font-body">Alex Kowalski</p>
                    <p className="text-xs text-ink-light font-mono">Co-founder & CEO</p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}

/* ─── Mission / Vision Card ──────────────────────────────────── */
function MissionCard({ card, index }) {
  const { type, icon: Icon, color, colorBg, colorBorder, headline, body } = card

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.default}
      transition={{ duration: 0.55, delay: index * 0.12, ease: [0.4, 0, 0.2, 1] }}
      whileHover={{ y: -4, transition: { duration: 0.22 } }}
      className={cn(
        'relative flex flex-col gap-5 p-7',
        'bg-white rounded-2xl',
        'border border-surface-200',
        'shadow-card hover:shadow-card-hover',
        'transition-shadow duration-300',
        'overflow-hidden group',
      )}
    >
      {/* Large watermark type label */}
      <div
        aria-hidden="true"
        className="absolute top-4 right-5 font-display font-bold text-[72px] leading-none select-none pointer-events-none opacity-[0.04] group-hover:opacity-[0.07] transition-opacity duration-300"
        style={{ color }}
      >
        {type[0]}
      </div>

      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{ background: colorBg, border: `1px solid ${colorBorder}` }}
      >
        <Icon color={color} />
      </div>

      {/* Type label */}
      <p
        className="text-xs font-mono font-medium uppercase tracking-[0.14em]"
        style={{ color }}
      >
        {type}
      </p>

      {/* Headline */}
      <h3 className="font-display font-bold text-xl md:text-2xl text-ink leading-[1.15] tracking-[-0.022em]">
        {headline}
      </h3>

      {/* Body */}
      <p className="text-sm text-ink-muted leading-relaxed flex-1">
        {body}
      </p>

      {/* Bottom accent */}
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

/* ── Icons ───────────────────────────────────────────────────── */
function TargetIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.4"/>
      <circle cx="10" cy="10" r="5" stroke={color} strokeWidth="1.4"/>
      <circle cx="10" cy="10" r="2" fill={color}/>
    </svg>
  )
}

function CompassIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8" stroke={color} strokeWidth="1.4"/>
      <path d="M10 2v2M10 16v2M2 10h2M16 10h2" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M13 7l-2 4-4 2 2-4 4-2z" fill={color} opacity="0.8"/>
    </svg>
  )
}
