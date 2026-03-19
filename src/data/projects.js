/**
 * projects.js
 *
 * Central project data store.
 * Structure mirrors a future REST/GraphQL API response for easy migration.
 *
 * Fields:
 *   id          — unique numeric ID
 *   slug        — URL-safe identifier  (/portfolio/:slug)
 *   title       — display name
 *   tagline     — one-line punch line (used on card)
 *   description — longer paragraph (used on detail page)
 *   category    — primary category key (used for filter tabs)
 *   tags        — tech stack array  (rendered as TechBadge)
 *   gradient    — CSS gradient string for placeholder visual
 *   accentColor — primary brand color for this project
 *   featured    — shown first / given larger card treatment
 *   year        — delivery year
 *   client      — company name (anonymised where needed)
 *   outcomes    — key results (used on detail page)
 *   link        — live URL (null if private / NDA)
 */

export const CATEGORIES = [
  { value: 'all',     label: 'All Projects' },
  { value: 'web',     label: 'Web Apps' },
  { value: 'mobile',  label: 'Mobile' },
  { value: 'ai',      label: 'AI / Automation' },
  { value: 'cms',     label: 'CMS' },
  { value: 'backend', label: 'Backend' },
]

export const PROJECTS = [
  {
    id:          1,
    slug:        'fintrack-dashboard',
    title:       'FinTrack Dashboard',
    tagline:     'Real-time financial analytics for modern teams.',
    description:
      'A multi-account financial analytics platform featuring live chart streaming, AI-driven spending categorisation, role-based access control, and exportable reports. Built for a Series A fintech startup serving 12,000+ monthly active users.',
    category:    'web',
    tags:        ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'AWS', 'Stripe'],
    gradient:    'linear-gradient(135deg, #4A7FD4 0%, #6B4A9B 100%)',
    accentColor: '#4A7FD4',
    featured:    true,
    year:        2024,
    client:      'NovaPay',
    outcomes: [
      'Reduced report generation time from 4 hrs to 8 mins',
      '12,000+ MAU at launch with zero critical bugs',
      'Achieved 99.98% uptime in first 6 months',
    ],
    link: null,
  },
  {
    id:          2,
    slug:        'ai-content-engine',
    title:       'AI Content Engine',
    tagline:     'LLM-powered publishing that cut editorial time by 70%.',
    description:
      'An end-to-end AI content pipeline for a digital media company. The system ingests raw briefs, generates structured drafts with citation grounding, runs style-consistency checks, and routes output through an editorial approval workflow — all inside a custom CMS interface.',
    category:    'ai',
    tags:        ['Python', 'LangChain', 'OpenAI', 'FastAPI', 'React', 'Pinecone'],
    gradient:    'linear-gradient(135deg, #7A8B2E 0%, #2A6B5A 100%)',
    accentColor: '#7A8B2E',
    featured:    true,
    year:        2024,
    client:      'LaunchPad Media',
    outcomes: [
      'Editorial production time reduced by 70%',
      '3× content output with same team headcount',
      'Factual accuracy improved by 40% vs manual process',
    ],
    link: null,
  },
  {
    id:          3,
    slug:        'shopnow-mobile',
    title:       'ShopNow Mobile',
    tagline:     'High-conversion iOS & Android e-commerce app.',
    description:
      'A cross-platform mobile shopping app with AR product previews, one-tap checkout, loyalty rewards, and real-time inventory. Shipped to the App Store and Google Play in 10 weeks. Became the client\'s highest-converting sales channel within 60 days of launch.',
    category:    'mobile',
    tags:        ['React Native', 'Expo', 'TypeScript', 'Supabase', 'Stripe'],
    gradient:    'linear-gradient(135deg, #C4622D 0%, #B8832A 100%)',
    accentColor: '#C4622D',
    featured:    true,
    year:        2023,
    client:      'Orbis Commerce',
    outcomes: [
      'Highest-converting channel within 60 days',
      '4.8★ App Store rating from 2,400+ reviews',
      '23% increase in average order value vs web',
    ],
    link: null,
  },
  {
    id:          4,
    slug:        'contenthub-cms',
    title:       'ContentHub CMS',
    tagline:     'Headless CMS for a global publisher with 14 markets.',
    description:
      'A fully custom headless CMS implementation built on Sanity, serving a global publisher across 14 language markets. Includes a drag-and-drop page builder, structured content modelling, real-time collaborative editing, and CDN-optimised delivery via Next.js.',
    category:    'cms',
    tags:        ['Next.js', 'Sanity', 'TypeScript', 'Tailwind', 'Vercel', 'Cloudflare'],
    gradient:    'linear-gradient(135deg, #C45A7A 0%, #6B4A9B 100%)',
    accentColor: '#C45A7A',
    featured:    false,
    year:        2024,
    client:      'GlobalPress Group',
    outcomes: [
      'Time-to-publish reduced from 2 hrs to 12 mins',
      '14 language markets on a single unified platform',
      'Page load time improved by 3.2× vs previous CMS',
    ],
    link: null,
  },
  {
    id:          5,
    slug:        'healthsync-api',
    title:       'HealthSync API',
    tagline:     'HIPAA-compliant health data integration platform.',
    description:
      'A secure backend API platform that aggregates patient data from 8 different EHR systems into a unified, HIPAA-compliant data layer. Built with strict audit logging, field-level encryption, and a GraphQL gateway consumed by 3 downstream applications.',
    category:    'backend',
    tags:        ['Node.js', 'GraphQL', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
    gradient:    'linear-gradient(135deg, #2A6B5A 0%, #3A7A3A 100%)',
    accentColor: '#2A6B5A',
    featured:    false,
    year:        2023,
    client:      'MedCore Systems',
    outcomes: [
      '8 EHR integrations in a single unified API',
      '100% HIPAA compliance audit pass on first attempt',
      'Sub-80ms p95 response time under 5,000 req/s',
    ],
    link: null,
  },
  {
    id:          6,
    slug:        'learnpath-platform',
    title:       'LearnPath LMS',
    tagline:     'Adaptive learning platform for enterprise teams.',
    description:
      'A full-featured learning management system with adaptive content sequencing, live cohort sessions, progress analytics, and manager dashboards. Supports SCORM imports and integrates with Slack and Microsoft Teams for nudge notifications.',
    category:    'web',
    tags:        ['React', 'Next.js', 'Node.js', 'MongoDB', 'AWS', 'WebRTC'],
    gradient:    'linear-gradient(135deg, #B8832A 0%, #C4622D 100%)',
    accentColor: '#B8832A',
    featured:    false,
    year:        2023,
    client:      'TalentBridge Corp',
    outcomes: [
      'Deployed to 4,200 employees across 6 countries',
      'Course completion rate improved from 34% to 81%',
      'NPS score of 72 from learner cohorts',
    ],
    link: null,
  },
  {
    id:          7,
    slug:        'pulse-analytics',
    title:       'Pulse Analytics',
    tagline:     'Real-time product analytics for SaaS companies.',
    description:
      'A lightweight product analytics tool that tracks user events, builds cohort funnels, and surfaces retention insights — without the complexity of Mixpanel or Amplitude. Built as a privacy-first, self-hosted alternative with a clean React dashboard.',
    category:    'web',
    tags:        ['React', 'TypeScript', 'ClickHouse', 'FastAPI', 'Python', 'Docker'],
    gradient:    'linear-gradient(135deg, #6B4A9B 0%, #4A7FD4 100%)',
    accentColor: '#6B4A9B',
    featured:    false,
    year:        2024,
    client:      'SaaSCore (internal tool)',
    outcomes: [
      'Ingests 2M+ events/day at < $40/month infra cost',
      'Dashboard P95 load time under 600ms',
      'Adopted by 3 internal product teams in first month',
    ],
    link: null,
  },
  {
    id:          8,
    slug:        'fleet-mobile',
    title:       'FleetOps Mobile',
    tagline:     'Field operations app for logistics teams.',
    description:
      'An offline-first mobile app for field logistics teams managing vehicle assignments, route optimisation, and real-time delivery tracking. Works fully offline with background sync, push notifications, and native camera integration for POD capture.',
    category:    'mobile',
    tags:        ['React Native', 'Expo', 'SQLite', 'Node.js', 'MapBox', 'EAS'],
    gradient:    'linear-gradient(135deg, #3A7A3A 0%, #7A8B2E 100%)',
    accentColor: '#3A7A3A',
    featured:    false,
    year:        2023,
    client:      'LogiTrack',
    outcomes: [
      'Deployed to 320 field operatives across 4 depots',
      'Delivery confirmation time reduced from 8 min to 45 sec',
      'Offline sync reliability: 99.3%',
    ],
    link: null,
  },
]

/* ─── Helpers ────────────────────────────────────────────────── */

/** Get all projects sorted: featured first, then by year desc */
export const getAllProjects = () =>
  [...PROJECTS].sort((a, b) => {
    if (a.featured && !b.featured) return -1
    if (!a.featured && b.featured) return 1
    return b.year - a.year
  })

/** Get projects filtered by category */
export const getProjectsByCategory = (category) => {
  if (!category || category === 'all') return getAllProjects()
  return getAllProjects().filter((p) => p.category === category)
}

/** Get a single project by slug */
export const getProjectBySlug = (slug) =>
  PROJECTS.find((p) => p.slug === slug) ?? null

/** Get featured projects (for home page highlights) */
export const getFeaturedProjects = () =>
  PROJECTS.filter((p) => p.featured)
