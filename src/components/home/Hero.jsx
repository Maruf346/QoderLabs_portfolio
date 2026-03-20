import { useRef } from 'react'
import { Link } from 'react-router-dom'
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
} from 'framer-motion'
import { timing, ease, transition } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Hero — Final premium polish
   — Refined orb system: 4 layered blobs, slower breathing
   — Hero text uses blur-to-sharp reveal (fadeInUp)
   — CTA buttons: scale + shadow lift on hover
   — Trust strip: staggered badge entrance
   — Scroll indicator: refined line-fill animation
   — Mouse-parallax: spring-damped, desktop-only
═══════════════════════════════════════════════════════════════ */

/* Stagger container — fires on mount */
const heroContainer = {
  hidden:  {},
  visible: {
    transition: {
      staggerChildren:  timing.childSlow,
      delayChildren:    0.12,
    },
  },
}

/* Individual hero item — blur + lift reveal */
const heroItem = {
  hidden:  { opacity: 0, y: 28, filter: 'blur(4px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.70, ease: ease.expo },
  },
}

const SERVICE_PILLS = ['Web Development', 'AI Automation', 'Mobile Apps', 'CMS Solutions']

export default function Hero() {
  const containerRef = useRef(null)

  /* Mouse-parallax values */
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const sX     = useSpring(mouseX, { stiffness: 45, damping: 18 })
  const sY     = useSpring(mouseY, { stiffness: 45, damping: 18 })

  const orb1X = useTransform(sX, [-1,1], [-22,  22])
  const orb1Y = useTransform(sY, [-1,1], [-16,  16])
  const orb2X = useTransform(sX, [-1,1], [ 16, -16])
  const orb2Y = useTransform(sY, [-1,1], [ 12, -12])
  const orb3X = useTransform(sX, [-1,1], [-10,  10])
  const orb3Y = useTransform(sY, [-1,1], [-20,  20])
  const orb4X = useTransform(sX, [-1,1], [  8,  -8])
  const orb4Y = useTransform(sY, [-1,1], [ 14, -14])

  const handleMouseMove = (e) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return
    mouseX.set(((e.clientX - rect.left)  / rect.width  - 0.5) * 2)
    mouseY.set(((e.clientY - rect.top)   / rect.height - 0.5) * 2)
  }
  const handleMouseLeave = () => { mouseX.set(0); mouseY.set(0) }

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden bg-[#F8F8FA]"
      aria-label="Hero section"
    >

      {/* ── Ambient background ───────────────────────── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">

        {/* Primary cool center glow */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[650px]"
          style={{
            background:
              'radial-gradient(ellipse 65% 55% at 50% 0%, rgba(74,127,212,0.11) 0%, rgba(107,74,155,0.06) 50%, transparent 70%)',
          }}
        />

        {/* Orb 1 — top-left warm red/orange */}
        <motion.div
          style={{ x: orb1X, y: orb1Y }}
          animate={{ scale: [1, 1.07, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-28 -left-28 w-[520px] h-[520px]"
        >
          <div className="w-full h-full rounded-full" style={{
            background: 'radial-gradient(circle, rgba(196,98,45,0.11) 0%, rgba(184,131,42,0.06) 50%, transparent 68%)',
            filter:     'blur(52px)',
          }} />
        </motion.div>

        {/* Orb 2 — bottom-right blue/purple */}
        <motion.div
          style={{ x: orb2X, y: orb2Y }}
          animate={{ scale: [1, 1.09, 1] }}
          transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
          className="absolute -bottom-36 -right-28 w-[560px] h-[560px]"
        >
          <div className="w-full h-full rounded-full" style={{
            background: 'radial-gradient(circle, rgba(107,74,155,0.11) 0%, rgba(74,127,212,0.07) 50%, transparent 68%)',
            filter:     'blur(58px)',
          }} />
        </motion.div>

        {/* Orb 3 — center-right green */}
        <motion.div
          style={{ x: orb3X, y: orb3Y }}
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
          className="absolute top-1/3 -right-12 w-[380px] h-[380px]"
        >
          <div className="w-full h-full rounded-full" style={{
            background: 'radial-gradient(circle, rgba(42,107,90,0.09) 0%, rgba(58,122,58,0.05) 50%, transparent 68%)',
            filter:     'blur(46px)',
          }} />
        </motion.div>

        {/* Orb 4 — center-left teal accent */}
        <motion.div
          style={{ x: orb4X, y: orb4Y }}
          animate={{ scale: [1, 1.06, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
          className="absolute bottom-1/3 -left-16 w-[320px] h-[320px]"
        >
          <div className="w-full h-full rounded-full" style={{
            background: 'radial-gradient(circle, rgba(74,127,212,0.09) 0%, rgba(42,107,90,0.05) 50%, transparent 68%)',
            filter:     'blur(42px)',
          }} />
        </motion.div>

        {/* Fine dot grid — very subtle texture */}
        <div
          className="absolute inset-0 opacity-[0.022]"
          style={{
            backgroundImage: 'radial-gradient(circle, #0D0D12 1px, transparent 1px)',
            backgroundSize:  '28px 28px',
          }}
        />
      </div>

      {/* ── Main content ─────────────────────────────── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center max-w-[52rem] mx-auto pt-20"
        >

          {/* Eyebrow pill */}
          {/* <motion.div variants={heroItem} className="mb-98">
            <span className={cn(
              'inline-flex items-center gap-2',
              'px-4 py-1.5 rounded-full',
              'text-xs font-mono font-medium tracking-widest uppercase',
              'bg-white/90 border border-[#E8E8EE]',
              'text-[#56566E]',
              'shadow-[0_1px_3px_rgba(13,13,18,0.06),0_4px_12px_rgba(13,13,18,0.04)]',
            )}>
              <motion.span
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1.5 h-1.5 rounded-full"
                style={{ background: 'var(--gradient-logo)' }}
              />
              Premium Software Agency
            </span>
          </motion.div> */}

          {/* Headline */}
          <motion.h1
            variants={heroItem}
            className={cn(
              'font-display font-bold text-[#0D0D12]',
              'text-[clamp(2.8rem,7.5vw,5.8rem)]',
              'leading-[1.01] tracking-[-0.044em]',
              'mb-6',
            )}
          >
            From{' '}
            <span className="text-gradient-logo">
              Concept
            </span>
            <br />
            to{' '}
            <span className="text-gradient-name">
              Creation.
            </span>
          </motion.h1>

          {/* Sub-headline */}
          <motion.p
            variants={heroItem}
            className={cn(
              'font-body text-base sm:text-lg md:text-xl',
              'text-[#56566E] leading-[1.7]',
              'max-w-[38rem] mb-10',
            )}
          >
            We design and build exceptional digital products — web apps, AI tools,
            and mobile experiences — for companies that refuse to settle for average.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={heroItem}
            className="flex flex-col sm:flex-row items-center gap-3 mb-14"
          >
            {/* Primary */}
            <Link to="/contact">
              <motion.span
                whileHover={{ scale: 1.03, y: -2 }}
                whileTap={{ scale: 0.97 }}
                transition={transition.spring}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-7 py-3.5 rounded-xl',
                  'font-body font-semibold text-sm text-white',
                  'bg-[#0D0D12] cursor-pointer select-none',
                  'shadow-[0_2px_8px_rgba(13,13,18,0.14),0_4px_20px_rgba(13,13,18,0.10)]',
                  'hover:shadow-[0_4px_16px_rgba(13,13,18,0.18),0_8px_36px_rgba(13,13,18,0.14)]',
                  'transition-shadow duration-[220ms]',
                )}
                style={{ display: 'inline-flex' }}
              >
                Get Started
                <motion.span
                  animate={{ x: [0, 3, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                  aria-hidden="true"
                >
                  →
                </motion.span>
              </motion.span>
            </Link>

            {/* Secondary */}
            <Link to="/portfolio">
              <motion.span
                whileHover={{ scale: 1.02, y: -1 }}
                whileTap={{ scale: 0.97 }}
                transition={transition.spring}
                className={cn(
                  'inline-flex items-center gap-2',
                  'px-7 py-3.5 rounded-xl',
                  'font-body font-medium text-sm text-[#0D0D12]',
                  'bg-white border border-[#D6D6E0]',
                  'hover:border-[#0D0D12]/22 hover:bg-[#F2F2F6]',
                  'shadow-[0_1px_3px_rgba(13,13,18,0.06),0_4px_12px_rgba(13,13,18,0.04)]',
                  'hover:shadow-[0_2px_8px_rgba(13,13,18,0.08),0_8px_24px_rgba(13,13,18,0.06)]',
                  'transition-all duration-[220ms] cursor-pointer select-none',
                )}
                style={{ display: 'inline-flex' }}
              >
                View Our Work
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                  <rect x="1.5" y="1.5" width="10" height="10" rx="2.5"
                    stroke="currentColor" strokeWidth="1.3"/>
                  <path d="M5 4.5l3 2-3 2" fill="currentColor" opacity="0.7"/>
                </svg>
              </motion.span>
            </Link>
          </motion.div>

          {/* Trust strip */}
          <motion.div variants={heroItem} className="flex flex-col items-center gap-3">
            <p className="text-[10px] font-mono text-[#94949E] uppercase tracking-[0.16em]">
              Technologies we work with
            </p>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {SERVICE_PILLS.map((label, i) => (
                <motion.span
                  key={label}
                  initial={{ opacity: 0, scale: 0.88, y: 6 }}
                  animate={{ opacity: 1, scale: 1,    y: 0 }}
                  transition={{
                    delay:    0.85 + i * 0.08,
                    duration: 0.45,
                    ease:     ease.expo,
                  }}
                  className={cn(
                    'px-3 py-1 rounded-full',
                    'text-xs font-mono font-medium',
                    'bg-white border border-[#E8E8EE]',
                    'text-[#56566E]',
                    'shadow-[0_1px_3px_rgba(13,13,18,0.05)]',
                  )}
                >
                  {label}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.7 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        {/* <p className="text-[9px] font-mono tracking-[0.2em] uppercase text-[#94949E]">
          Scroll
        </p> */}
        <div className="relative w-px h-9 rounded-full overflow-hidden bg-[#E8E8EE]">
          <motion.div
            animate={{ y: ['-100%', '200%'] }}
            transition={{ duration: 1.7, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.3 }}
            className="absolute inset-x-0 h-1/2 rounded-full"
            style={{ background: 'var(--gradient-logo)' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
