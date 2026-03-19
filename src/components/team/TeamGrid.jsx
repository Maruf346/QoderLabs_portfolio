import { motion } from 'framer-motion'
import { staggerContainer, slideUp, viewport } from '@utils/animations'
import { getFeaturedMembers, getAllMembers } from '@data/team'
import TeamCard from './TeamCard'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   TeamGrid
   — Leadership row: featured members in wider cards
   — Rest of team: standard 3-col responsive grid
   — Stagger entrance per card
═══════════════════════════════════════════════════════════════ */

export default function TeamGrid() {
  const featured  = getFeaturedMembers()
  const rest      = getAllMembers().filter((m) => !m.featured)

  return (
    <div className="flex flex-col gap-14">

      {/* ── Leadership row ───────────────────────────── */}
      {featured.length > 0 && (
        <div>
          {/* Section label */}
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport.default}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono font-medium uppercase tracking-[0.15em] text-ink-light mb-6"
          >
            Leadership
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {featured.map((member, i) => (
              <TeamCard key={member.id} member={member} index={i} />
            ))}
          </div>
        </div>
      )}

      {/* ── Rest of team ─────────────────────────────── */}
      {rest.length > 0 && (
        <div>
          <motion.p
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={viewport.default}
            transition={{ duration: 0.4 }}
            className="text-xs font-mono font-medium uppercase tracking-[0.15em] text-ink-light mb-6"
          >
            Team
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {rest.map((member, i) => (
              <TeamCard
                key={member.id}
                member={member}
                index={featured.length + i}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
