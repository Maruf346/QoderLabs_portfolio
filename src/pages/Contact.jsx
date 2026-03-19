import { motion } from 'framer-motion'
import { pageTransition } from '@utils/animations'
import ContactHero from '@components/contact/ContactHero'
import ContactInfo from '@components/contact/ContactInfo'
import ContactForm from '@components/contact/ContactForm'

/* ═══════════════════════════════════════════════════════════════
   Contact Page
   — NO gradients anywhere on this page
   — All solid colors from brand palette
   — Clean, professional, conversion-focused

   Layout:
     1. ContactHero   — minimal page header
     2. Two-column body:
          Left  → ContactInfo (details + social + availability)
          Right → ContactForm (controlled form with validation)
     3. Bottom note strip
═══════════════════════════════════════════════════════════════ */

export default function Contact() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* 1 ── Page header */}
      <ContactHero />

      {/* 2 ── Main body */}
      <section className="py-16 md:py-24 bg-surface-50">
        <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

          {/* Two-column grid — stacks on mobile */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.65fr] gap-12 lg:gap-16 items-start">

            {/* Left — Contact info */}
            <ContactInfo />

            {/* Right — Contact form */}
            <ContactForm />
          </div>
        </div>
      </section>

      {/* 3 ── Bottom note strip */}
      <BottomStrip />
    </motion.div>
  )
}

/* ─── Bottom strip ───────────────────────────────────────────── */
function BottomStrip() {
  return (
    <section className="border-t border-surface-200 bg-white py-10">
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">

          {/* Left: reassurance points */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-8">
            {[
              { icon: ShieldIcon,  text: 'Your data is safe with us' },
              { icon: ClockIcon,   text: 'Reply within 1 business day' },
              { icon: HandIcon,    text: 'No commitment required' },
            ].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-surface-100 border border-surface-200 flex items-center justify-center shrink-0">
                  <Icon />
                </div>
                <span className="text-xs font-body text-ink-muted">{text}</span>
              </div>
            ))}
          </div>

          {/* Right: prefer email link */}
          <div className="flex items-center gap-2 text-sm font-body text-ink-muted">
            <span>Prefer email?</span>
            <a
              href="mailto:hello@qoderlabs.com"
              className="font-medium text-ink hover:text-brand-blue transition-colors duration-150 underline-offset-2 hover:underline"
            >
              hello@qoderlabs.com
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ── Strip icons ─────────────────────────────────────────────── */
function ShieldIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M6.5 1.5L2 3v4c0 2.485 2.015 4.5 4.5 4.5S11 9.485 11 7V3L6.5 1.5z"
        stroke="#9898AE" strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M4.5 6.5l1.5 1.5 2.5-2.5"
        stroke="#9898AE" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <circle cx="6.5" cy="6.5" r="5.5" stroke="#9898AE" strokeWidth="1.2"/>
      <path d="M6.5 4v2.5l1.5 1.5"
        stroke="#9898AE" strokeWidth="1.2"
        strokeLinecap="round" strokeLinejoin="round"
      />
    </svg>
  )
}

function HandIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
      <path d="M4.5 6V3a1 1 0 012 0v3m0 0V2a1 1 0 012 0v4m0 0V4a1 1 0 012 0v5c0 2.21-1.79 4-4 4a4 4 0 01-4-4V6.5a1 1 0 012 0V8"
        stroke="#9898AE" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}
