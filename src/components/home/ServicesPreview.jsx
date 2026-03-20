import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Services Preview Section
   — 4 service cards in responsive grid
   — Each card: icon + title + description + learn-more link
   — Hover: lift + gradient border glow
   — Stagger entrance animation
═══════════════════════════════════════════════════════════════ */

const SERVICES = [
  {
    id:          'web-development',
    icon:        WebIcon,
    color:       '#4A7FD4',
    colorBg:     'rgba(74,127,212,0.08)',
    colorBorder: 'rgba(74,127,212,0.22)',
    title:       'Web Development',
    description: 'High-performance web applications built with modern frameworks. From landing pages to complex SaaS platforms.',
    tags:        ['React', 'Next.js', 'Node.js'],
  },
  {
    id:          'ai-automation',
    icon:        AIIcon,
    color:       '#7A8B2E',
    colorBg:     'rgba(122,139,46,0.08)',
    colorBorder: 'rgba(122,139,46,0.22)',
    title:       'AI Automation',
    description: 'Intelligent systems that automate workflows, reduce manual effort, and unlock new capabilities for your business.',
    tags:        ['Python', 'LangChain', 'OpenAI'],
  },
  {
    id:          'cms-solutions',
    icon:        CMSIcon,
    color:       '#C4622D',
    colorBg:     'rgba(196,98,45,0.08)',
    colorBorder: 'rgba(196,98,45,0.22)',
    title:       'CMS Solutions',
    description: 'Flexible content management systems that give your team full control — without touching a line of code.',
    tags:        ['Sanity', 'Contentful', 'Strapi'],
  },
  {
    id:          'mobile-apps',
    icon:        MobileIcon,
    color:       '#6B4A9B',
    colorBg:     'rgba(107,74,155,0.08)',
    colorBorder: 'rgba(107,74,155,0.22)',
    title:       'Mobile Apps',
    description: 'Native-quality mobile experiences on iOS and Android. Built fast, shipped faster.',
    tags:        ['React Native', 'Expo', 'TypeScript'],
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      delay: i * 0.10,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
}

export default function ServicesPreview() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">

      {/* Subtle section background glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[300px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(74,127,212,0.06) 0%, transparent 70%)',
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
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green opacity-70" />
            What We Do
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
            Services built for{' '}
            <span
              className="text-gradient-logo"
            >
              scale
            </span>
          </motion.h2>

          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base md:text-lg leading-relaxed max-w-xl mx-auto"
          >
            End-to-end digital solutions crafted with precision — from initial concept
            through to production deployment and beyond.
          </motion.p>
        </motion.div>

        {/* ── Services grid ────────────────────────────── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* ── Footer CTA ───────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport.default}
          transition={{ duration: 0.5, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
          className="text-center mt-12"
        >
          <Link
            to="/services"
            className={cn(
              'inline-flex items-center gap-2',
              'text-sm font-medium font-body text-ink-muted',
              'hover:text-ink transition-colors duration-150',
              'group',
            )}
          >
            Explore all services
            <motion.span
              className="inline-block"
              animate={{ x: [0, 3, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Service Card ───────────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const { icon: Icon, color, colorBg, colorBorder, title, description, tags, id } = service

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
      whileHover="hover"
      className="group relative"
    >
      {/* Glow border that appears on hover */}
      <motion.div
        className="absolute -inset-px rounded-2xl pointer-events-none"
        initial={{ opacity: 0 }}
        variants={{
          hover: { opacity: 1, transition: { duration: 0.25 } },
        }}
        style={{
          background: `linear-gradient(135deg, ${color}30, ${color}15, transparent)`,
          border: `1px solid ${colorBorder}`,
        }}
      />

      <motion.div
        variants={{
          hover: {
            y: -4,
            boxShadow: `0 12px 40px rgba(15,15,20,0.10), 0 0 0 1px ${colorBorder}`,
            transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
          },
        }}
        className={cn(
          'relative h-full',
          'bg-white rounded-2xl',
          'border border-surface-200',
          'p-6 flex flex-col gap-4',
          'shadow-card',
          'transition-shadow duration-300',
          'overflow-hidden',
        )}
      >
        {/* Subtle inner glow on hover */}
        <motion.div
          className="absolute inset-0 rounded-2xl pointer-events-none"
          initial={{ opacity: 0 }}
          variants={{
            hover: { opacity: 1, transition: { duration: 0.3 } },
          }}
          style={{
            background: `radial-gradient(ellipse 80% 60% at 10% 0%, ${colorBg} 0%, transparent 70%)`,
          }}
        />

        {/* Icon */}
        <div
          className="relative w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: colorBg, border: `1px solid ${colorBorder}` }}
        >
          <Icon color={color} />
        </div>

        {/* Title */}
        <h3 className="relative font-display font-semibold text-lg text-ink leading-snug tracking-[-0.02em]">
          {title}
        </h3>

        {/* Description */}
        <p className="relative text-sm text-ink-muted leading-relaxed flex-1">
          {description}
        </p>

        {/* Tags */}
        <div className="relative flex flex-wrap gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-surface-100 border border-surface-200 text-ink-light"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Learn more link */}
        <Link
          to={`/services#${id}`}
          className={cn(
            'relative inline-flex items-center gap-1.5',
            'text-xs font-medium font-mono',
            'transition-colors duration-150',
          )}
          style={{ color }}
        >
          Learn more
          <motion.span
            variants={{
              hover: { x: 3, transition: { duration: 0.2 } },
            }}
            className="inline-block"
          >
            →
          </motion.span>
        </Link>
      </motion.div>
    </motion.div>
  )
}

/* ── Service Icons ───────────────────────────────────────────── */
function WebIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="17" height="13" rx="2.5" stroke={color} strokeWidth="1.4"/>
      <path d="M1.5 7.5h17" stroke={color} strokeWidth="1.4"/>
      <circle cx="4.5" cy="5.5" r="0.8" fill={color}/>
      <circle cx="7"   cy="5.5" r="0.8" fill={color}/>
      <path d="M6 11.5h8M6 14h5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function AIIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3" stroke={color} strokeWidth="1.4"/>
      <path d="M10 2v3M10 15v3M2 10h3M15 10h3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M4.22 4.22l2.12 2.12M13.66 13.66l2.12 2.12M4.22 15.78l2.12-2.12M13.66 6.34l2.12-2.12"
        stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function CMSIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="7" height="8" rx="1.5" stroke={color} strokeWidth="1.4"/>
      <rect x="11" y="2" width="7" height="4" rx="1.5" stroke={color} strokeWidth="1.4"/>
      <rect x="11" y="8" width="7" height="4" rx="1.5" stroke={color} strokeWidth="1.4"/>
      <rect x="2"  y="12" width="7" height="6" rx="1.5" stroke={color} strokeWidth="1.4"/>
      <rect x="11" y="14" width="7" height="4" rx="1.5" stroke={color} strokeWidth="1.4"/>
    </svg>
  )
}

function MobileIcon({ color }) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="5.5" y="1.5" width="9" height="17" rx="2.5" stroke={color} strokeWidth="1.4"/>
      <path d="M8.5 15.5h3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8 6h4M8 9h3" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}
