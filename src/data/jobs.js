/**
 * jobs.js
 *
 * Central job listings data store.
 * Structure mirrors a future REST API response for easy migration.
 *
 * Fields:
 *   id           — unique numeric ID
 *   slug         — URL-safe identifier (for future detail page)
 *   title        — job title
 *   department   — team/department name
 *   type         — employment type
 *   location     — work location
 *   salary       — salary range (null if undisclosed)
 *   description  — short paragraph shown on card
 *   requirements — key requirements list (for detail page)
 *   niceToHave   — preferred but not required
 *   posted       — ISO date string
 *   status       — 'open' | 'closed' | 'paused'
 *   featured     — pinned to top of list
 */

export const DEPARTMENTS = [
  { value: 'all',         label: 'All Departments' },
  { value: 'engineering', label: 'Engineering' },
  { value: 'design',      label: 'Design' },
  { value: 'product',     label: 'Product' },
  { value: 'operations',  label: 'Operations' },
]

export const JOBS = [
  {
    id:          1,
    slug:        'senior-fullstack-engineer',
    title:       'Senior Full-Stack Engineer',
    department:  'engineering',
    type:        'Full-time',
    location:    'Remote (Global)',
    salary:      '$110,000 – $145,000',
    description:
      'We\'re looking for a senior engineer who thrives in a fast-paced agency environment and can own features end-to-end. You\'ll work across React frontends and Node.js backends, contribute to architecture decisions, and mentor junior engineers on the team.',
    requirements: [
      '5+ years of professional software engineering experience',
      'Deep expertise in React, TypeScript, and Node.js',
      'Experience with PostgreSQL or similar relational databases',
      'Comfortable owning features from design review to deployment',
      'Strong written communication skills for async-first teams',
    ],
    niceToHave: [
      'Experience in a client-facing agency or consultancy',
      'Familiarity with AWS, Vercel, or similar cloud platforms',
      'Contributions to open-source projects',
    ],
    posted:   '2025-01-08',
    status:   'open',
    featured: true,
  },
  {
    id:          2,
    slug:        'react-native-engineer',
    title:       'React Native Engineer',
    department:  'engineering',
    type:        'Full-time',
    location:    'Remote (Global)',
    salary:      '$90,000 – $125,000',
    description:
      'Join our mobile team building cross-platform iOS and Android apps for clients across e-commerce, logistics, and health-tech. You\'ll work with React Native and Expo, implement native modules, and own the App Store submission process.',
    requirements: [
      '3+ years of React Native development experience',
      'Published apps on the App Store and Google Play',
      'Experience with Expo and EAS Build',
      'Solid understanding of native iOS and Android concepts',
      'Familiarity with offline-first patterns and local data sync',
    ],
    niceToHave: [
      'Experience with native Swift or Kotlin modules',
      'Knowledge of React Query or Zustand for state management',
      'Background in mobile performance profiling',
    ],
    posted:   '2025-01-10',
    status:   'open',
    featured: true,
  },
  {
    id:          3,
    slug:        'ai-ml-engineer',
    title:       'AI / ML Engineer',
    department:  'engineering',
    type:        'Full-time',
    location:    'Remote (Global)',
    salary:      '$115,000 – $155,000',
    description:
      'Help us build the AI-powered systems that define our most ambitious client projects. You\'ll design and implement LLM pipelines, RAG systems, and fine-tuned models — then integrate them into production applications used by thousands of users daily.',
    requirements: [
      '3+ years of professional ML or AI engineering experience',
      'Strong Python skills and familiarity with LangChain or LlamaIndex',
      'Experience with OpenAI, Anthropic, or open-source LLM APIs',
      'Understanding of vector databases (Pinecone, Weaviate, pgvector)',
      'Ability to evaluate model quality and implement guardrails',
    ],
    niceToHave: [
      'Experience fine-tuning open-source models (Llama, Mistral)',
      'Background in ML Ops and model deployment pipelines',
      'Knowledge of evaluation frameworks like RAGAS or DeepEval',
    ],
    posted:   '2025-01-14',
    status:   'open',
    featured: false,
  },
  {
    id:          4,
    slug:        'product-designer',
    title:       'Product Designer',
    department:  'design',
    type:        'Full-time',
    location:    'Remote (Global)',
    salary:      '$85,000 – $115,000',
    description:
      'We need a designer who cares as much about how something works as how it looks. You\'ll own UX from discovery through to final Figma handoff — running user flows, building wireframes, and collaborating closely with engineers to ship polished interfaces.',
    requirements: [
      '4+ years of product or UX design experience',
      'Expert-level Figma skills including components and auto-layout',
      'Strong portfolio demonstrating end-to-end design process',
      'Experience conducting user research and usability testing',
      'Ability to articulate design decisions to non-designers',
    ],
    niceToHave: [
      'Basic front-end skills (HTML, CSS, React awareness)',
      'Experience with design systems at scale',
      'Motion design skills (Principle, Framer)',
    ],
    posted:   '2025-01-16',
    status:   'open',
    featured: false,
  },
  {
    id:          5,
    slug:        'junior-backend-engineer',
    title:       'Junior Backend Engineer',
    department:  'engineering',
    type:        'Full-time',
    location:    'Remote (Europe / Asia)',
    salary:      '$55,000 – $75,000',
    description:
      'An excellent opportunity to grow your backend engineering career inside a fast-moving product agency. You\'ll work alongside senior engineers on API design, database modelling, and infrastructure — getting real-world exposure to production systems from day one.',
    requirements: [
      '1–2 years of professional backend development experience',
      'Solid foundations in Node.js or Python',
      'Understanding of RESTful API design principles',
      'Comfortable working with SQL databases',
      'Eagerness to learn, receive feedback, and grow quickly',
    ],
    niceToHave: [
      'Experience with Docker or containerised environments',
      'Exposure to GraphQL',
      'Personal or side projects demonstrating initiative',
    ],
    posted:   '2025-01-18',
    status:   'open',
    featured: false,
  },
  {
    id:          6,
    slug:        'project-manager',
    title:       'Technical Project Manager',
    department:  'operations',
    type:        'Full-time',
    location:    'Remote (Global)',
    salary:      '$80,000 – $105,000',
    description:
      'Keep our client projects running on time, on scope, and on budget. You\'ll be the bridge between clients and our engineering teams — managing timelines, running sprint ceremonies, and ensuring clear communication at every stage of delivery.',
    requirements: [
      '3+ years of project management in a software or agency context',
      'Experience with Agile and Scrum methodologies',
      'Strong command of tools like Linear, Notion, or Jira',
      'Excellent client communication and expectation-setting skills',
      'Ability to identify and mitigate delivery risks proactively',
    ],
    niceToHave: [
      'Technical background or ability to read code at a high level',
      'Experience managing multiple concurrent client projects',
      'PMP or Scrum Master certification',
    ],
    posted:   '2025-01-20',
    status:   'open',
    featured: false,
  },
]

/* ─── Helpers ────────────────────────────────────────────────── */

/** All open jobs — featured first, then by posted date desc */
export const getAllJobs = () =>
  [...JOBS]
    .filter((j) => j.status === 'open')
    .sort((a, b) => {
      if (a.featured && !b.featured) return -1
      if (!a.featured && b.featured) return 1
      return new Date(b.posted) - new Date(a.posted)
    })

/** Filter by department */
export const getJobsByDepartment = (dept) => {
  if (!dept || dept === 'all') return getAllJobs()
  return getAllJobs().filter((j) => j.department === dept)
}

/** Get single job by slug */
export const getJobBySlug = (slug) =>
  JOBS.find((j) => j.slug === slug) ?? null

/** Format posted date as relative string */
export const formatPostedDate = (isoString) => {
  const posted = new Date(isoString)
  const now    = new Date()
  const days   = Math.floor((now - posted) / (1000 * 60 * 60 * 24))
  if (days === 0) return 'Today'
  if (days === 1) return 'Yesterday'
  if (days < 7)  return `${days} days ago`
  if (days < 30) return `${Math.floor(days / 7)} week${Math.floor(days / 7) > 1 ? 's' : ''} ago`
  return `${Math.floor(days / 30)} month${Math.floor(days / 30) > 1 ? 's' : ''} ago`
}
