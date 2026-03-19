/**
 * team.js
 *
 * Team member data.
 * Structure is ready for future CMS or API migration.
 *
 * Fields:
 *   id        — unique numeric ID
 *   name      — full display name
 *   role      — job title
 *   department— team department
 *   initials  — 2-letter avatar fallback
 *   color     — solid brand color for avatar bg
 *   colorBg   — solid tinted bg for avatar
 *   bio       — 1–2 sentence summary
 *   social    — optional links: linkedin, github, twitter
 *   featured  — show in leadership row
 */

export const TEAM = [
  {
    id:         1,
    name:       'Alex Kowalski',
    role:       'Co-founder & CEO',
    department: 'Leadership',
    initials:   'AK',
    color:      '#4A7FD4',
    colorBg:    'rgba(74,127,212,0.12)',
    bio:        'Former engineering lead at two Series B startups. Alex obsesses over clean architecture and client outcomes in equal measure.',
    social: {
      linkedin: 'https://linkedin.com',
      github:   'https://github.com',
      twitter:  'https://twitter.com',
    },
    featured: true,
  },
  {
    id:         2,
    name:       'Priya Nair',
    role:       'Co-founder & CTO',
    department: 'Leadership',
    initials:   'PN',
    color:      '#3A7A3A',
    colorBg:    'rgba(58,122,58,0.12)',
    bio:        'Full-stack engineer with a decade of experience shipping distributed systems. Priya leads technical strategy and makes the hard calls.',
    social: {
      linkedin: 'https://linkedin.com',
      github:   'https://github.com',
    },
    featured: true,
  },
  {
    id:         3,
    name:       'Marcus Reid',
    role:       'Lead Product Designer',
    department: 'Design',
    initials:   'MR',
    color:      '#6B4A9B',
    colorBg:    'rgba(107,74,155,0.12)',
    bio:        'Designs interfaces that are as logical as they are beautiful. Marcus has shipped products used by millions across three continents.',
    social: {
      linkedin: 'https://linkedin.com',
      twitter:  'https://twitter.com',
    },
    featured: true,
  },
  {
    id:         4,
    name:       'Yuki Tanaka',
    role:       'Senior Frontend Engineer',
    department: 'Engineering',
    initials:   'YT',
    color:      '#2A6B5A',
    colorBg:    'rgba(42,107,90,0.12)',
    bio:        'React specialist with a sharp eye for performance. Yuki turns complex UX requirements into buttery-smooth interfaces.',
    social: {
      github:   'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    featured: false,
  },
  {
    id:         5,
    name:       'Sofia Martins',
    role:       'AI / ML Engineer',
    department: 'Engineering',
    initials:   'SM',
    color:      '#C4622D',
    colorBg:    'rgba(196,98,45,0.12)',
    bio:        'Builds the LLM pipelines and automation systems that define our most ambitious projects. Sofia has a PhD in computational linguistics.',
    social: {
      github:   'https://github.com',
      linkedin: 'https://linkedin.com',
      twitter:  'https://twitter.com',
    },
    featured: false,
  },
  {
    id:         6,
    name:       'Daniel Osei',
    role:       'Backend & Infrastructure',
    department: 'Engineering',
    initials:   'DO',
    color:      '#B8832A',
    colorBg:    'rgba(184,131,42,0.12)',
    bio:        'Keeps our systems fast, reliable, and cost-efficient. Daniel architects the backend foundations that client products are built on.',
    social: {
      github:   'https://github.com',
      linkedin: 'https://linkedin.com',
    },
    featured: false,
  },
]

/* ─── Helpers ────────────────────────────────────────────────── */
export const getFeaturedMembers = () => TEAM.filter((m) => m.featured)
export const getAllMembers      = () => TEAM
export const getMemberById      = (id) => TEAM.find((m) => m.id === id) ?? null
