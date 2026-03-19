import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   FAQ Section
   — 5 questions in accordion layout
   — Click to expand / collapse with smooth height animation
   — Only one open at a time
   — Animated chevron rotation
   — Left-accented active state
═══════════════════════════════════════════════════════════════ */

const FAQS = [
  {
    id: 1,
    question: 'How long does a typical project take?',
    answer:
      "It depends on scope, but most projects fall into three buckets: landing pages or marketing sites (1–3 weeks), full web applications or mobile apps (6–14 weeks), and complex platforms with integrations or AI features (3–6 months). After an initial discovery call, we'll give you a precise timeline before any work begins.",
  },
  {
    id: 2,
    question: 'What technologies do you work with?',
    answer:
      'We primarily work with React, Next.js, and TypeScript on the frontend; Node.js and Python on the backend; and PostgreSQL, MongoDB, or Redis for data. For mobile, we use React Native. For AI features, we build on top of OpenAI, Anthropic, and LangChain. We always choose the right tool for the job — not the trendiest one.',
  },
  {
    id: 3,
    question: 'Do you offer support and maintenance after launch?',
    answer:
      'Yes. Every project includes a 30-day post-launch support period at no extra cost. After that, we offer flexible retainer plans for ongoing maintenance, feature development, and monitoring. We don\'t disappear after delivery — many of our clients have been with us for years.',
  },
  {
    id: 4,
    question: 'How does your pricing work?',
    answer:
      'We work on a project-based model for defined scopes, and a time-and-materials model for longer engagements or ongoing work. We provide detailed estimates upfront with itemised milestones — no vague quotes, no surprise invoices. All pricing is discussed and agreed upon before we start.',
  },
  {
    id: 5,
    question: 'Can you work with our existing codebase or team?',
    answer:
      "Absolutely. We frequently augment existing teams, take over stalled projects, or integrate with legacy systems. Our engineers are experienced at reading and improving other people\'s code. We'll do a codebase audit first so there are no surprises, then create a clear plan to move things forward.",
  },
]

export default function FAQ() {
  const [openId, setOpenId] = useState(null)

  const toggle = (id) => setOpenId((prev) => (prev === id ? null : id))

  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">

      {/* Subtle top divider */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background:
            'linear-gradient(90deg, transparent, #EAEAEE 20%, #D8D8E0 50%, #EAEAEE 80%, transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.6fr] gap-14 lg:gap-20 items-start">

          {/* ── Left: sticky header ──────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
            className="lg:sticky lg:top-32"
          >
            <motion.p
              variants={slideUp}
              className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-green opacity-70" />
              FAQs
            </motion.p>

            <motion.h2
              variants={slideUp}
              className={cn(
                'font-display font-bold text-ink',
                'text-3xl sm:text-4xl md:text-5xl',
                'leading-[1.08] tracking-[-0.032em]',
                'mb-5',
              )}
            >
              Questions?{' '}
              <span
                style={{
                  background: 'var(--gradient-logo)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                Answered.
              </span>
            </motion.h2>

            <motion.p
              variants={slideUp}
              className="text-ink-muted text-base leading-relaxed mb-6 max-w-xs"
            >
              Still have questions? We're happy to talk through your project
              in a free 30-minute call.
            </motion.p>

            <motion.div variants={slideUp}>
              <a
                href="/contact"
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-5 py-2.5 rounded-xl',
                  'text-sm font-medium font-body text-ink',
                  'bg-surface-100 border border-surface-200',
                  'hover:bg-surface-200 hover:border-surface-300',
                  'transition-all duration-200',
                )}
              >
                Book a call
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <path d="M2 6.5h9M7.5 2.5l4 4-4 4"
                    stroke="currentColor" strokeWidth="1.4"
                    strokeLinecap="round" strokeLinejoin="round"
                  />
                </svg>
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right: accordion ─────────────────────────── */}
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewport.default}
            className="flex flex-col divide-y divide-surface-200"
          >
            {FAQS.map((faq, i) => (
              <FAQItem
                key={faq.id}
                faq={faq}
                index={i}
                isOpen={openId === faq.id}
                onToggle={() => toggle(faq.id)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/* ─── FAQ Accordion Item ─────────────────────────────────────── */
function FAQItem({ faq, index, isOpen, onToggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.default}
      transition={{ duration: 0.4, delay: index * 0.07, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'group relative',
        'transition-colors duration-200',
      )}
    >
      {/* Left accent bar — visible when open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="accent"
            initial={{ scaleY: 0, opacity: 0 }}
            animate={{ scaleY: 1, opacity: 1 }}
            exit={{ scaleY: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
            className="absolute left-0 top-0 bottom-0 w-[3px] rounded-full origin-top"
            style={{ background: 'var(--gradient-logo)' }}
          />
        )}
      </AnimatePresence>

      {/* Question button */}
      <button
        onClick={onToggle}
        aria-expanded={isOpen}
        className={cn(
          'w-full flex items-center justify-between gap-4',
          'py-5 pl-5 pr-1 text-left',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2 rounded-lg',
          'transition-colors duration-150',
        )}
      >
        <span
          className={cn(
            'font-body font-medium text-base leading-snug',
            'transition-colors duration-200',
            isOpen ? 'text-ink' : 'text-ink-muted group-hover:text-ink',
          )}
        >
          {faq.question}
        </span>

        {/* Animated chevron */}
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'shrink-0 w-7 h-7 rounded-lg flex items-center justify-center',
            'border transition-all duration-200',
            isOpen
              ? 'bg-surface-200 border-surface-300 text-ink'
              : 'bg-transparent border-surface-200 text-ink-light group-hover:border-surface-300 group-hover:text-ink',
          )}
          aria-hidden="true"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2 4l4 4 4-4"
              stroke="currentColor" strokeWidth="1.5"
              strokeLinecap="round" strokeLinejoin="round"
            />
          </svg>
        </motion.span>
      </button>

      {/* Answer — AnimatePresence for mount/unmount */}
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="answer"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.32, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="pl-5 pb-5 pr-8">
              <p className="text-sm text-ink-muted leading-relaxed font-body">
                {faq.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
