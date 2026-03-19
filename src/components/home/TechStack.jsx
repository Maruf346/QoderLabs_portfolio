import { motion } from 'framer-motion'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Tech Stack Section
   — Two rows: Frontend + Backend/Infra
   — Each tech item: icon + name badge
   — Marquee-style infinite scroll on mobile
   — Stagger entrance on desktop
   — Subtle hover lift on each item
═══════════════════════════════════════════════════════════════ */

const TECH_STACKS = [
  {
    category: 'Frontend',
    items: [
      { name: 'React',       color: '#4A7FD4', bg: 'rgba(74,127,212,0.09)',  icon: ReactIcon },
      { name: 'Next.js',     color: '#0F0F14', bg: 'rgba(15,15,20,0.07)',    icon: NextIcon },
      { name: 'TypeScript',  color: '#4A7FD4', bg: 'rgba(74,127,212,0.09)',  icon: TSIcon },
      { name: 'Tailwind',    color: '#2A6B5A', bg: 'rgba(42,107,90,0.09)',   icon: TailwindIcon },
      { name: 'Framer',      color: '#C45A7A', bg: 'rgba(196,90,122,0.09)', icon: FramerIcon },
      { name: 'Vite',        color: '#6B4A9B', bg: 'rgba(107,74,155,0.09)', icon: ViteIcon },
    ],
  },
  {
    category: 'Backend & Infrastructure',
    items: [
      { name: 'Node.js',     color: '#3A7A3A', bg: 'rgba(58,122,58,0.09)',   icon: NodeIcon },
      { name: 'Python',      color: '#7A8B2E', bg: 'rgba(122,139,46,0.09)', icon: PythonIcon },
      { name: 'PostgreSQL',  color: '#4A7FD4', bg: 'rgba(74,127,212,0.09)',  icon: PostgresIcon },
      { name: 'MongoDB',     color: '#3A7A3A', bg: 'rgba(58,122,58,0.09)',   icon: MongoIcon },
      { name: 'AWS',         color: '#B8832A', bg: 'rgba(184,131,42,0.09)', icon: AWSIcon },
      { name: 'Docker',      color: '#4A7FD4', bg: 'rgba(74,127,212,0.09)',  icon: DockerIcon },
    ],
  },
]

const itemVariants = {
  hidden:  { opacity: 0, y: 16, scale: 0.95 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      delay: i * 0.055,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
}

export default function TechStack() {
  return (
    <section className="relative py-20 md:py-28 bg-surface-50 overflow-hidden">

      {/* Gradient divider line at top */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-0 right-0 h-px"
        style={{
          background: 'linear-gradient(90deg, transparent, #EAEAEE 20%, #D8D8E0 50%, #EAEAEE 80%, transparent)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* ── Section header ───────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.default}
          className="text-center mb-12 md:mb-16"
        >
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-blue opacity-70" />
            Our Tech Stack
          </motion.p>

          <motion.h2
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-3xl sm:text-4xl md:text-[2.75rem]',
              'leading-[1.1] tracking-[-0.03em]',
              'mb-4',
            )}
          >
            Built with the{' '}
            <span
              style={{
                background: 'var(--gradient-logo)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              right tools
            </span>
          </motion.h2>

          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base md:text-lg leading-relaxed max-w-lg mx-auto"
          >
            We choose battle-tested, modern technologies that ensure performance,
            scalability, and long-term maintainability.
          </motion.p>
        </motion.div>

        {/* ── Stack rows ───────────────────────────────── */}
        <div className="flex flex-col gap-10">
          {TECH_STACKS.map((stack, stackIdx) => (
            <div key={stack.category}>
              {/* Category label */}
              <motion.p
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={viewport.default}
                transition={{ duration: 0.4, delay: stackIdx * 0.1 }}
                className="text-xs font-mono font-medium text-ink-light uppercase tracking-[0.14em] mb-4"
              >
                {stack.category}
              </motion.p>

              {/* Tech items grid */}
              <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
                {stack.items.map((tech, i) => (
                  <TechItem
                    key={tech.name}
                    tech={tech}
                    index={stackIdx * 6 + i}
                  />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* ── Bottom note ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={viewport.late}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-12 text-center"
        >
          <p className="text-xs font-mono text-ink-light">
            + many more tools selected based on your project's needs
          </p>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── Individual tech item card ──────────────────────────────── */
function TechItem({ tech, index }) {
  const { name, color, bg, icon: Icon } = tech

  return (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
      whileHover={{ y: -3, transition: { duration: 0.2, ease: [0.4, 0, 0.2, 1] } }}
      whileTap={{ scale: 0.95 }}
      className={cn(
        'flex flex-col items-center justify-center gap-2.5',
        'py-4 px-2 rounded-xl',
        'bg-white border border-surface-200',
        'shadow-card cursor-default',
        'transition-shadow duration-200',
        'hover:shadow-card-hover',
        'group',
      )}
    >
      {/* Icon container */}
      <div
        className="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
        style={{ background: bg }}
      >
        <Icon color={color} size={18} />
      </div>

      {/* Name */}
      <span
        className="text-[11px] font-mono font-medium text-ink-muted group-hover:text-ink transition-colors duration-150 text-center leading-tight"
      >
        {name}
      </span>
    </motion.div>
  )
}

/* ═══════════════════════════════════════════════════════════════
   Tech Icons — minimal SVG representations
═══════════════════════════════════════════════════════════════ */

function ReactIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <ellipse cx="10" cy="10" rx="9" ry="3.5" stroke={color} strokeWidth="1.3" transform="rotate(0 10 10)"/>
      <ellipse cx="10" cy="10" rx="9" ry="3.5" stroke={color} strokeWidth="1.3" transform="rotate(60 10 10)"/>
      <ellipse cx="10" cy="10" rx="9" ry="3.5" stroke={color} strokeWidth="1.3" transform="rotate(120 10 10)"/>
      <circle  cx="10" cy="10" r="1.6" fill={color}/>
    </svg>
  )
}

function NextIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="8.5" stroke={color} strokeWidth="1.3"/>
      <path d="M7.5 13.5V7l8 9" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7.5 7h3" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  )
}

function TSIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="2" width="16" height="16" rx="3" stroke={color} strokeWidth="1.3"/>
      <path d="M6 8.5h8M10 8.5V14" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
    </svg>
  )
}

function TailwindIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M3 10c.5-3 2.5-4.5 5-4 1.5.3 2.5 1.5 3.5 1.5 1.5 0 2.5-1 4-1 1 0 2 .5 2.5 1.5-1 0-2 1-3 2.5-.5 1-1.5 2-3 2-1.5 0-2.5-1.5-4-1.5C6.5 11 5.5 12 3 13c.5-1 0-2 0-3z"
        stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function FramerIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M4 3h12L10 10H4V3z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M4 10h6l6 7H4v-7z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
    </svg>
  )
}

function ViteIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L18 5.5l-8 11L2 5.5 10 2z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M10 2L6 11l4-2 4 2L10 2z" fill={color} opacity="0.3"/>
    </svg>
  )
}

function NodeIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2L17.5 6.5v9L10 18l-7.5-4.5v-9L10 2z" stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M10 7v6M7.5 8.5L10 7l2.5 1.5" stroke={color} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function PythonIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2C6.5 2 5 3.5 5 5.5V8h5v1H4C2.5 9 1.5 10 1.5 12v2.5C1.5 16.5 3 18 6 18h.5v-2c0-1.5 1-2.5 2.5-2.5h4c1.5 0 2.5-1 2.5-2.5V5.5C15.5 3.5 13.5 2 10 2z"
        stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
      <path d="M10 18c3.5 0 5-1.5 5-3.5V12h-5v-1h6c1.5 0 2.5-1 2.5-3V5.5"
        stroke={color} strokeWidth="1.2" strokeLinejoin="round"/>
      <circle cx="7.8" cy="5.5" r="0.9" fill={color}/>
      <circle cx="12.2" cy="14.5" r="0.9" fill={color}/>
    </svg>
  )
}

function PostgresIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <ellipse cx="10" cy="6"  rx="7" ry="3" stroke={color} strokeWidth="1.3"/>
      <path d="M3 6v8c0 1.66 3.13 3 7 3s7-1.34 7-3V6" stroke={color} strokeWidth="1.3"/>
      <path d="M3 10c0 1.66 3.13 3 7 3s7-1.34 7-3"   stroke={color} strokeWidth="1.1" strokeDasharray="2 1.5"/>
    </svg>
  )
}

function MongoIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M10 2c0 0-5.5 5-5.5 9.5A5.5 5.5 0 0010 18a5.5 5.5 0 005.5-6.5C15.5 7 10 2 10 2z"
        stroke={color} strokeWidth="1.3" strokeLinejoin="round"/>
      <path d="M10 7v8" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function AWSIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <path d="M5 12.5C3 12 2 10.5 2 9c0-2 1.5-3.5 3.5-3.5.3 0 .6 0 .9.1C7 4.2 8.4 3 10.1 3c2.2 0 3.9 1.8 3.9 4 .3-.1.6-.1.9-.1C16.6 6.9 18 8.2 18 10s-1.5 3-3.5 3" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
      <path d="M7 15l1.5-3L10 15l1.5-3L13 15" stroke={color} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

function DockerIcon({ color, size = 18 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2"  y="9" width="2.5" height="2.5" rx="0.5" stroke={color} strokeWidth="1.2"/>
      <rect x="5.5"y="9" width="2.5" height="2.5" rx="0.5" stroke={color} strokeWidth="1.2"/>
      <rect x="9"  y="9" width="2.5" height="2.5" rx="0.5" stroke={color} strokeWidth="1.2"/>
      <rect x="5.5"y="5.5" width="2.5" height="2.5" rx="0.5" stroke={color} strokeWidth="1.2"/>
      <rect x="9"  y="5.5" width="2.5" height="2.5" rx="0.5" stroke={color} strokeWidth="1.2"/>
      <path d="M14 10.5c.5-2 3-1.5 3-1.5s.2 1.5-1 2.5c-.8.7-2.2 1-4.5 1H2"
        stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}
