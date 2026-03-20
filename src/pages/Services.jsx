import { motion } from 'framer-motion'
import { pageTransition, staggerContainer, slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'
import ServiceSection from '@components/services/ServiceSection'
import CTA from '@components/home/CTA'

/* ═══════════════════════════════════════════════════════════════
   Services Page
   — Page intro hero
   — 5 alternating service sections
   — Shared CTA banner at bottom

   Services:
     1. Web Development
     2. AI Automation
     3. CMS Solutions
     4. Mobile App Development
     5. API & Backend Systems
═══════════════════════════════════════════════════════════════ */

const SERVICES = [
  {
    id:          'web-development',
    icon:        WebIcon,
    color:       '#4A7FD4',
    colorBg:     'rgba(74,127,212,0.09)',
    colorBorder: 'rgba(74,127,212,0.20)',
    title:       'Web Development',
    tagline:     'Websites and apps built to perform.',
    description:
      'From marketing sites to complex SaaS platforms, we engineer web experiences that are fast, accessible, and built to scale. Every project starts with a clear architecture and ends with clean, maintainable code.',
    features: [
      'High-performance React and Next.js applications',
      'Server-side rendering and static generation for SEO',
      'Responsive, accessible design across all devices',
      'CI/CD pipelines, automated testing, and monitoring',
      'Third-party integrations (payments, CRMs, analytics)',
      'Performance budgets and Core Web Vitals optimisation',
    ],
    tags: ['React', 'Next.js', 'TypeScript', 'Node.js', 'Vercel', 'Tailwind'],
    cta:  'Start a web project',
  },
  {
    id:          'ai-automation',
    icon:        AIIcon,
    color:       '#7A8B2E',
    colorBg:     'rgba(122,139,46,0.09)',
    colorBorder: 'rgba(122,139,46,0.20)',
    title:       'AI Automation',
    tagline:     'Intelligent systems that do the heavy lifting.',
    description:
      'We design and build AI-powered pipelines that automate repetitive workflows, surface insights from your data, and unlock capabilities that weren\'t possible before. From LLM integrations to custom ML models.',
    features: [
      'LLM-powered automation with OpenAI, Anthropic, and Gemini',
      'Custom RAG pipelines for enterprise knowledge bases',
      'Document processing, classification, and extraction',
      'Intelligent chatbots and AI-assisted workflows',
      'ML model fine-tuning and deployment',
      'AI observability, evaluation, and guardrails',
    ],
    tags: ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'Pinecone', 'AWS'],
    cta:  'Explore AI solutions',
  },
  {
    id:          'cms-solutions',
    icon:        CMSIcon,
    color:       '#C4622D',
    colorBg:     'rgba(196,98,45,0.09)',
    colorBorder: 'rgba(196,98,45,0.20)',
    title:       'CMS Solutions',
    tagline:     'Content management that your team will actually use.',
    description:
      'We build headless CMS implementations that give your editorial team full control without requiring a developer for every change. Flexible content models, real-time previews, and CDN-optimised delivery.',
    features: [
      'Headless CMS setup (Sanity, Contentful, Strapi)',
      'Custom content schemas and editorial workflows',
      'Multi-language and multi-region support',
      'Real-time preview environments',
      'CDN integration for global content delivery',
      'Migration from legacy CMS platforms',
    ],
    tags: ['Sanity', 'Contentful', 'Strapi', 'Next.js', 'GraphQL'],
    cta:  'Discuss your CMS needs',
  },
  {
    id:          'mobile-apps',
    icon:        MobileIcon,
    color:       '#6B4A9B',
    colorBg:     'rgba(107,74,155,0.09)',
    colorBorder: 'rgba(107,74,155,0.20)',
    title:       'Mobile App Development',
    tagline:     'iOS and Android apps that users love.',
    description:
      'We build cross-platform mobile applications using React Native and Expo — delivering native performance and feel without maintaining two separate codebases. From prototype to App Store in weeks, not months.',
    features: [
      'Cross-platform iOS and Android with React Native',
      'Native modules for device features (camera, biometrics, GPS)',
      'Offline-first architecture with local data sync',
      'Push notifications and background processing',
      'App Store and Google Play submission and optimisation',
      'Over-the-air updates with Expo EAS',
    ],
    tags: ['React Native', 'Expo', 'TypeScript', 'Supabase', 'EAS'],
    cta:  'Build your mobile app',
  },
  {
    id:          'api-backend',
    icon:        APIIcon,
    color:       '#2A6B5A',
    colorBg:     'rgba(42,107,90,0.09)',
    colorBorder: 'rgba(42,107,90,0.20)',
    title:       'API & Backend Systems',
    tagline:     'Robust infrastructure for products that scale.',
    description:
      'We design and build backend systems that are secure, performant, and maintainable at scale. Whether you need a greenfield API or want to refactor a legacy monolith, we approach every backend with the same rigour.',
    features: [
      'RESTful and GraphQL API design and implementation',
      'Microservices architecture and event-driven systems',
      'Database design, optimisation, and migrations',
      'Authentication, authorisation, and security hardening',
      'AWS, GCP, or Azure cloud infrastructure setup',
      'Rate limiting, caching, and horizontal scalability',
    ],
    tags: ['Node.js', 'Python', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    cta:  'Architect your backend',
  },
]

export default function Services() {
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      {/* ── Page intro ──────────────────────────────────── */}
      <ServicesIntro />

      {/* ── Service sections ────────────────────────────── */}
      <div className="max-w-7xl mx-auto px-5 sm:px-6 md:px-10 lg:px-16 xl:px-24">
        {SERVICES.map((service, i) => (
          <ServiceSection
            key={service.id}
            service={service}
            index={i}
            isLast={i === SERVICES.length - 1}
          />
        ))}
      </div>

      {/* ── CTA banner ──────────────────────────────────── */}
      <CTA />
    </motion.div>
  )
}

/* ─── Page intro section ─────────────────────────────────────── */
function ServicesIntro() {
  return (
    <section className="relative pt-36 pb-16 md:pt-44 md:pb-20 overflow-hidden bg-surface-50">

      {/* Glow */}
      <div
        aria-hidden="true"
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 70% 55% at 50% 0%, rgba(196,98,45,0.10) 0%, rgba(74,127,212,0.07) 50%, transparent 70%)',
        }}
      />

      {/* Dot grid */}
      <div
        aria-hidden="true"
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: 'radial-gradient(circle, #0F0F14 1px, transparent 1px)',
          backgroundSize:  '28px 28px',
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
          className="max-w-3xl"
        >
          <motion.p
            variants={slideUp}
            className="inline-flex items-center gap-2 font-mono text-xs font-medium uppercase tracking-[0.15em] text-ink-light mb-4"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-orange opacity-70" />
            What We Offer
          </motion.p>

          <motion.h1
            variants={slideUp}
            className={cn(
              'font-display font-bold text-ink',
              'text-[clamp(2.4rem,6vw,4.5rem)]',
              'leading-[1.04] tracking-[-0.038em]',
              'mb-5',
            )}
          >
            Services built for{' '}
            <span
              className="text-gradient-logo"
            >
              ambitious teams.
            </span>
          </motion.h1>

          <motion.p
            variants={slideUp}
            className="text-ink-muted text-base sm:text-lg md:text-xl leading-relaxed max-w-xl"
          >
            End-to-end digital product services — from strategy and design
            through to engineering, launch, and ongoing growth. No hand-offs,
            no silos, no dropped balls.
          </motion.p>

          {/* Quick-jump nav */}
          <motion.div
            variants={slideUp}
            className="flex flex-wrap gap-2 mt-8"
          >
            {SERVICES.map(({ id, title, color }) => (
              <a
                key={id}
                href={`#${id}`}
                className={cn(
                  'px-3.5 py-1.5 rounded-lg',
                  'text-xs font-mono font-medium',
                  'bg-white border border-surface-200',
                  'text-ink-muted hover:text-ink',
                  'hover:border-surface-300',
                  'transition-all duration-150',
                  'shadow-card',
                )}
              >
                {title}
              </a>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ── Service Icons ───────────────────────────────────────────── */
function WebIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="1.5" y="3.5" width="17" height="13" rx="2.5" stroke={color} strokeWidth="1.4"/>
      <path d="M1.5 7.5h17" stroke={color} strokeWidth="1.4"/>
      <circle cx="4.5" cy="5.5" r="0.8" fill={color}/>
      <circle cx="7"   cy="5.5" r="0.8" fill={color}/>
      <path d="M6 11.5h8M6 14h5" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function AIIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <circle cx="10" cy="10" r="3"  stroke={color} strokeWidth="1.4"/>
      <path d="M10 2v3M10 15v3M2 10h3M15 10h3" stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M4.22 4.22l2.12 2.12M13.66 13.66l2.12 2.12M4.22 15.78l2.12-2.12M13.66 6.34l2.12-2.12"
        stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
    </svg>
  )
}

function CMSIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2"  y="2"  width="7" height="8"  rx="1.5" stroke={color} strokeWidth="1.4"/>
      <rect x="11" y="2"  width="7" height="4"  rx="1.5" stroke={color} strokeWidth="1.4"/>
      <rect x="11" y="8"  width="7" height="4"  rx="1.5" stroke={color} strokeWidth="1.4"/>
      <rect x="2"  y="12" width="7" height="6"  rx="1.5" stroke={color} strokeWidth="1.4"/>
      <rect x="11" y="14" width="7" height="4"  rx="1.5" stroke={color} strokeWidth="1.4"/>
    </svg>
  )
}

function MobileIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="5.5" y="1.5" width="9" height="17" rx="2.5" stroke={color} strokeWidth="1.4"/>
      <path d="M8.5 15.5h3"    stroke={color} strokeWidth="1.4" strokeLinecap="round"/>
      <path d="M8 6h4M8 9h3"  stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}

function APIIcon({ color, size = 20 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 20 20" fill="none" aria-hidden="true">
      <rect x="2" y="5" width="5" height="5" rx="1.2" stroke={color} strokeWidth="1.3"/>
      <rect x="13" y="5" width="5" height="5" rx="1.2" stroke={color} strokeWidth="1.3"/>
      <rect x="7.5" y="12" width="5" height="5" rx="1.2" stroke={color} strokeWidth="1.3"/>
      <path d="M7 7.5h6" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
      <path d="M10 10v2" stroke={color} strokeWidth="1.2" strokeLinecap="round"/>
    </svg>
  )
}
