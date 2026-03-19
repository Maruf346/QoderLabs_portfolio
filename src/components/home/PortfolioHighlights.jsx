import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Portfolio Highlights Section
   — 4 featured project cards in responsive grid
   — Each: gradient placeholder image, title, description, badges
   — Hover: scale + lift + glow shadow
   — Stagger entrance animation
═══════════════════════════════════════════════════════════════ */

const PROJECTS = [
  {
    id:          'fintech-dashboard',
    title:       'FinTrack Dashboard',
    category:    'Web Application',
    description: 'A real-time financial analytics platform with live charts, multi-account management, and AI-driven spending insights.',
    tags:        ['React', 'Node.js', 'PostgreSQL', 'AWS'],
    gradient:    'linear-gradient(135deg, #4A7FD4 0%, #6B4A9B 100%)',
    accentColor: '#4A7FD4',
    span:        'lg:col-span-2', // wide card
  },
  {
    id:          'ai-content-engine',
    title:       'AI Content Engine',
    category:    'AI Automation',
    description: 'An LLM-powered content generation pipeline that reduced editorial time by 70% for a media company.',
    tags:        ['Python', 'LangChain', 'OpenAI', 'FastAPI'],
    gradient:    'linear-gradient(135deg, #7A8B2E 0%, #2A6B5A 100%)',
    accentColor: '#7A8B2E',
    span:        '',
  },
  {
    id:          'ecom-mobile',
    title:       'ShopNow Mobile',
    category:    'Mobile App',
    description: 'High-conversion iOS & Android e-commerce app with AR product previews and one-tap checkout.',
    tags:        ['React Native', 'Expo', 'TypeScript'],
    gradient:    'linear-gradient(135deg, #C4622D 0%, #B8832A 100%)',
    accentColor: '#C4622D',
    span:        '',
  },
  {
    id:          'cms-platform',
    title:       'ContentHub CMS',
    category:    'CMS Solution',
    description: 'A headless CMS with a drag-and-drop editor, multi-language support, and seamless CDN delivery for a global publisher.',
    tags:        ['Next.js', 'Sanity', 'Tailwind', 'Vercel'],
    gradient:    'linear-gradient(135deg, #C45A7A 0%, #6B4A9B 100%)',
    accentColor: '#C45A7A',
    span:        'lg:col-span-2', // wide card
  },
]

const cardVariants = {
  hidden:  { opacity: 0, y: 28 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.11, ease: [0.4, 0, 0.2, 1] },
  }),
}

export default function PortfolioHighlights() {
  return (
    <section className="relative py-24 md:py-32 bg-white overflow-hidden">

      {/* Subtle warm glow top-right */}
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 w-[500px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 60% at 100% 0%, rgba(196,98,45,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">

        {/* ── Section header ───────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewport.default}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12 md:mb-16"
        >
          <div className="max-w-xl">
            <motion.p
              variants={slideUp}
              className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-3"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-purple opacity-70" />
              Selected Work
            </motion.p>

            <motion.h2
              variants={slideUp}
              className="font-display font-bold text-ink text-3xl sm:text-4xl md:text-5xl leading-[1.08] tracking-[-0.032em]"
            >
              Products we're{' '}
              <span
                style={{
                  background: 'var(--gradient-logo)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                proud of
              </span>
            </motion.h2>
          </div>

          <motion.div variants={slideUp}>
            <Link
              to="/portfolio"
              className={cn(
                'inline-flex items-center gap-2',
                'px-5 py-2.5 rounded-xl',
                'text-sm font-medium font-body text-ink',
                'bg-surface-100 border border-surface-200',
                'hover:bg-surface-200 hover:border-surface-300',
                'transition-all duration-200',
                'shrink-0',
              )}
            >
              View all projects
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                <path d="M2 6.5h9M7.5 2.5l4 4-4 4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </motion.div>
        </motion.div>

        {/* ── Projects grid ────────────────────────────── */}
        {/* Bento-style: row 1 = [wide, narrow], row 2 = [narrow, wide] */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}

/* ─── Project Card ───────────────────────────────────────────── */
function ProjectCard({ project, index }) {
  const { id, title, category, description, tags, gradient, accentColor, span } = project

  return (
    <motion.div
      custom={index}
      variants={cardVariants}
      initial="hidden"
      whileInView="visible"
      viewport={viewport.default}
      className={cn('group', span)}
    >
      <Link to={`/portfolio/${id}`} className="block h-full">
        <motion.div
          whileHover={{ y: -5 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
          className={cn(
            'relative h-full flex flex-col',
            'bg-white rounded-2xl overflow-hidden',
            'border border-surface-200',
            'shadow-card',
            'transition-shadow duration-300',
            'group-hover:shadow-card-hover',
          )}
          style={{
            '--accent': accentColor,
          }}
        >
          {/* ── Image / visual placeholder ────────────── */}
          <div className="relative overflow-hidden" style={{ height: '200px' }}>
            {/* Gradient background as image placeholder */}
            <div
              className="absolute inset-0 transition-transform duration-500 group-hover:scale-105"
              style={{ background: gradient }}
            />

            {/* Overlay pattern */}
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
              }}
            />

            {/* Mock UI wireframe lines */}
            <div className="absolute inset-0 flex flex-col justify-center items-center gap-3 px-8 opacity-30">
              <div className="w-full h-2 rounded-full bg-white/60" />
              <div className="w-4/5 h-2 rounded-full bg-white/40" />
              <div className="w-3/5 h-2 rounded-full bg-white/30" />
            </div>

            {/* Category pill */}
            <div className="absolute top-3 left-3">
              <span className={cn(
                'px-3 py-1 rounded-full',
                'text-[10px] font-mono font-medium',
                'bg-white/90 backdrop-blur-sm',
                'text-ink',
              )}>
                {category}
              </span>
            </div>

            {/* Arrow icon — appears on hover */}
            <motion.div
              initial={{ opacity: 0, scale: 0.7 }}
              whileHover={{ opacity: 1, scale: 1 }}
              className="absolute top-3 right-3"
            >
              <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-card">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5"
                    stroke="#0F0F14" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </motion.div>
          </div>

          {/* ── Card body ─────────────────────────────── */}
          <div className="flex flex-col flex-1 p-5 gap-3">

            {/* Title */}
            <h3 className="font-display font-semibold text-lg text-ink leading-snug tracking-[-0.02em] group-hover:text-ink transition-colors">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm text-ink-muted leading-relaxed flex-1 line-clamp-2">
              {description}
            </p>

            {/* Tech tags */}
            <div className="flex flex-wrap gap-1.5 pt-1">
              {tags.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 rounded-md text-[10px] font-mono font-medium bg-surface-100 border border-surface-200 text-ink-light"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Bottom glow line — appears on hover */}
          <motion.div
            className="absolute bottom-0 left-0 right-0 h-[2px]"
            initial={{ scaleX: 0, opacity: 0 }}
            whileHover={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            style={{ background: gradient, transformOrigin: 'left' }}
          />
        </motion.div>
      </Link>
    </motion.div>
  )
}
