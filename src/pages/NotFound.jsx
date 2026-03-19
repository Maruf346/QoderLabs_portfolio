import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center section-padding">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <p className="font-mono text-sm text-ink-light tracking-widest uppercase mb-4">404</p>
        <h1 className="font-display text-5xl md:text-7xl font-bold text-ink mb-4">
          Page not<br />
          <span className="text-gradient">found.</span>
        </h1>
        <p className="text-ink-muted max-w-sm mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-ink text-white font-medium text-sm hover:bg-ink/85 transition-colors"
        >
          ← Back to home
        </Link>
      </motion.div>
    </div>
  )
}
