/**
 * QoderLabs Logo — SVG recreation of the uploaded logo.
 * A stylised "Q" with swirling multi-colour gradient arms
 * and a ring of sparkle dots.
 */
export default function Logo({ size = 40, className = '' }) {
  const id = `ql-grad-${size}`

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Main swirl gradient */}
        <linearGradient id={`${id}-main`} x1="20" y1="15" x2="80" y2="85" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E8523A" />
          <stop offset="22%"  stopColor="#F0874A" />
          <stop offset="42%"  stopColor="#F5C842" />
          <stop offset="58%"  stopColor="#3DAA6E" />
          <stop offset="78%"  stopColor="#4A7FD4" />
          <stop offset="100%" stopColor="#7C5CBF" />
        </linearGradient>

        {/* Dot ring gradient */}
        <linearGradient id={`${id}-dots`} x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%"   stopColor="#E8523A" stopOpacity="0.7" />
          <stop offset="50%"  stopColor="#4A7FD4" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#7C5CBF" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* ── Dot ring (sparkles) ───────────────────────────── */}
      {Array.from({ length: 28 }).map((_, i) => {
        const angle = (i / 28) * Math.PI * 2 - Math.PI / 2
        const r     = 46
        const cx    = 50 + r * Math.cos(angle)
        const cy    = 50 + r * Math.sin(angle)
        const isStar = i % 5 === 0
        const dotR   = isStar ? 1.8 : 1.0
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={dotR}
            fill={`url(#${id}-dots)`}
            opacity={isStar ? 0.9 : 0.5}
          />
        )
      })}

      {/* ── Q swirl body ─────────────────────────────────── */}
      <path
        d="
          M 68 32
          C 72 20, 58 10, 44 14
          C 26 19, 18 36, 22 53
          C 26 68, 40 76, 54 73
          C 62 71, 68 65, 70 58
          L 76 66
          C 79 70, 76 76, 70 76
          C 52 80, 30 72, 22 55
          C 13 36, 24 16, 42 10
          C 60  4, 78 16, 76 34
          Z
        "
        fill={`url(#${id}-main)`}
        opacity="0.95"
      />

      {/* Inner counter-shape to carve the "Q" hole */}
      <path
        d="
          M 53 28
          C 42 26, 33 34, 34 45
          C 35 55, 44 62, 54 60
          C 63 58, 68 50, 66 41
          C 64 33, 58 29, 53 28
          Z
        "
        fill="#F4F4F6"
      />

      {/* Tail of the Q */}
      <path
        d="
          M 58 57
          C 62 59, 68 65, 72 70
          C 74 73, 72 77, 68 76
          C 65 75, 60 70, 57 66
          Z
        "
        fill={`url(#${id}-main)`}
        opacity="0.9"
      />
    </svg>
  )
}
