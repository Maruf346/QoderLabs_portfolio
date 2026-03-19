import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { slideUp, viewport } from '@utils/animations'
import { cn } from '@utils/cn'

/* ═══════════════════════════════════════════════════════════════
   Contact Form
   — Clean card layout, white background, solid border
   — Fields: Name, Email, Project Type (select), Message
   — NO gradients — all solid colors
   — Focus ring: solid brand-blue
   — Submit button: solid ink fill, no gradient
   — Controlled form with basic validation
   — Success state replaces form after submit
═══════════════════════════════════════════════════════════════ */

const PROJECT_TYPES = [
  { value: '',                label: 'Select a project type' },
  { value: 'web-app',        label: 'Web Application' },
  { value: 'mobile-app',     label: 'Mobile App' },
  { value: 'ai-automation',  label: 'AI / Automation' },
  { value: 'cms',            label: 'CMS / Content Platform' },
  { value: 'api-backend',    label: 'API / Backend System' },
  { value: 'design',         label: 'UI / UX Design' },
  { value: 'other',          label: 'Something else' },
]

const INITIAL_STATE = {
  name:        '',
  email:       '',
  projectType: '',
  message:     '',
}

const INITIAL_ERRORS = {
  name:    '',
  email:   '',
  message: '',
}

/* Simple validation */
function validate(fields) {
  const errors = { ...INITIAL_ERRORS }
  let valid = true

  if (!fields.name.trim()) {
    errors.name = 'Your name is required.'
    valid = false
  }

  if (!fields.email.trim()) {
    errors.email = 'Your email is required.'
    valid = false
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(fields.email)) {
    errors.email = 'Please enter a valid email address.'
    valid = false
  }

  if (!fields.message.trim()) {
    errors.message = 'Please tell us about your project.'
    valid = false
  } else if (fields.message.trim().length < 20) {
    errors.message = 'Please provide a bit more detail (min. 20 characters).'
    valid = false
  }

  return { valid, errors }
}

export default function ContactForm() {
  const [fields,    setFields]    = useState(INITIAL_STATE)
  const [errors,    setErrors]    = useState(INITIAL_ERRORS)
  const [touched,   setTouched]   = useState({})
  const [loading,   setLoading]   = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFields((prev) => ({ ...prev, [name]: value }))
    // Clear error on change if field was touched
    if (touched[name]) {
      const { errors: newErrors } = validate({ ...fields, [name]: value })
      setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
    }
  }

  const handleBlur = (e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const { errors: newErrors } = validate(fields)
    setErrors((prev) => ({ ...prev, [name]: newErrors[name] }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // Mark all fields as touched
    setTouched({ name: true, email: true, message: true })
    const { valid, errors: newErrors } = validate(fields)
    setErrors(newErrors)
    if (!valid) return

    setLoading(true)
    // Simulate async submit (replace with real API call)
    await new Promise((r) => setTimeout(r, 1400))
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={viewport.default}
      transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
      className={cn(
        'bg-white rounded-2xl',
        'border border-surface-200',
        'shadow-card',
        'p-7 sm:p-8',
      )}
    >
      <AnimatePresence mode="wait">
        {submitted ? (
          /* ── Success state ────────────────────────────── */
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center text-center py-10 gap-5"
          >
            {/* Check icon — solid brand-green */}
            <div className="w-14 h-14 rounded-full bg-[rgba(58,122,58,0.10)] border border-[rgba(58,122,58,0.20)] flex items-center justify-center">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M5 12l5 5L20 7"
                  stroke="#3A7A3A" strokeWidth="2"
                  strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
            </div>
            <div>
              <h3 className="font-display font-bold text-xl text-ink mb-2 tracking-tight">
                Message received!
              </h3>
              <p className="text-sm text-ink-muted leading-relaxed max-w-xs mx-auto">
                Thanks for reaching out. We'll review your message and reply within one business day.
              </p>
            </div>
            <button
              onClick={() => { setSubmitted(false); setFields(INITIAL_STATE); setTouched({}) }}
              className={cn(
                'mt-2 px-5 py-2.5 rounded-xl',
                'text-sm font-medium font-body',
                'bg-surface-100 border border-surface-200 text-ink-muted',
                'hover:bg-surface-200 hover:text-ink',
                'transition-colors duration-150',
              )}
            >
              Send another message
            </button>
          </motion.div>
        ) : (
          /* ── Form ─────────────────────────────────────── */
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            noValidate
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col gap-5"
          >
            {/* Form heading */}
            <div className="mb-1">
              <h2 className="font-display font-bold text-xl text-ink tracking-tight mb-1">
                Send us a message
              </h2>
              <p className="text-sm text-ink-light font-body">
                All fields marked <span className="text-brand-red">*</span> are required.
              </p>
            </div>

            {/* Name + Email row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Full Name"
                name="name"
                type="text"
                placeholder="Jane Smith"
                required
                value={fields.name}
                error={errors.name}
                touched={!!touched.name}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              <Field
                label="Email Address"
                name="email"
                type="email"
                placeholder="jane@company.com"
                required
                value={fields.email}
                error={errors.email}
                touched={!!touched.email}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            {/* Project type */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="projectType"
                className="text-sm font-medium font-body text-ink"
              >
                Project Type
                <span className="ml-1 text-xs text-ink-light font-normal">(optional)</span>
              </label>
              <div className="relative">
                <select
                  id="projectType"
                  name="projectType"
                  value={fields.projectType}
                  onChange={handleChange}
                  className={cn(
                    'w-full appearance-none',
                    'px-4 py-3 pr-10 rounded-xl',
                    'text-sm font-body',
                    'bg-white border border-surface-200',
                    'text-ink',
                    // Solid brand-blue focus ring — no gradient
                    'focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-0 focus:border-brand-blue',
                    'transition-colors duration-150',
                    !fields.projectType && 'text-ink-light',
                  )}
                >
                  {PROJECT_TYPES.map(({ value, label }) => (
                    <option key={value} value={value} disabled={!value}>
                      {label}
                    </option>
                  ))}
                </select>
                {/* Chevron */}
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-light">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M3 5l4 4 4-4"
                      stroke="currentColor" strokeWidth="1.4"
                      strokeLinecap="round" strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* Message */}
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="inline-flex items-center gap-1 text-sm font-medium font-body text-ink"
              >
                Message
                <span className="text-brand-red" aria-hidden="true">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us about your project — scope, timeline, any specific requirements..."
                value={fields.message}
                onChange={handleChange}
                onBlur={handleBlur}
                className={cn(
                  'w-full resize-none',
                  'px-4 py-3 rounded-xl',
                  'text-sm font-body text-ink',
                  'bg-white border',
                  'placeholder:text-ink-light',
                  'focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-0',
                  'transition-colors duration-150',
                  touched.message && errors.message
                    ? 'border-brand-red focus:ring-brand-red'
                    : 'border-surface-200 focus:border-brand-blue',
                )}
              />
              <FieldError message={errors.message} show={!!touched.message && !!errors.message} />
            </div>

            {/* Privacy note */}
            <p className="text-xs text-ink-light font-body leading-relaxed">
              By submitting this form you agree to our{' '}
              <a href="/privacy" className="text-ink-muted underline hover:text-ink transition-colors">
                Privacy Policy
              </a>
              . We never share your data with third parties.
            </p>

            {/* Submit button — solid ink, NO gradient */}
            <div className="pt-1">
              <button
                type="submit"
                disabled={loading}
                className={cn(
                  'inline-flex items-center justify-center gap-2',
                  'w-full sm:w-auto',
                  'px-8 py-3.5 rounded-xl',
                  'font-body font-medium text-sm text-white',
                  // Solid ink — no gradient
                  'bg-ink',
                  'hover:bg-ink/85',
                  'active:bg-ink/95',
                  'transition-colors duration-200',
                  'shadow-lift hover:shadow-lift-hover',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue focus-visible:ring-offset-2',
                  loading && 'opacity-70 pointer-events-none',
                )}
              >
                {loading ? (
                  <>
                    <Spinner />
                    Sending…
                  </>
                ) : (
                  <>
                    Send Message
                    <svg width="13" height="13" viewBox="0 0 13 13" fill="none" aria-hidden="true">
                      <path d="M2 6.5h9M7.5 2.5l4 4-4 4"
                        stroke="currentColor" strokeWidth="1.5"
                        strokeLinecap="round" strokeLinejoin="round"
                      />
                    </svg>
                  </>
                )}
              </button>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── Reusable Field component ───────────────────────────────── */
function Field({ label, name, type, placeholder, required, value, error, touched, onChange, onBlur }) {
  const hasError = touched && !!error

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor={name}
        className="inline-flex items-center gap-1 text-sm font-medium font-body text-ink"
      >
        {label}
        {required && <span className="text-brand-red" aria-hidden="true">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        aria-required={required}
        aria-invalid={hasError}
        aria-describedby={hasError ? `${name}-error` : undefined}
        className={cn(
          'w-full px-4 py-3 rounded-xl',
          'text-sm font-body text-ink',
          'bg-white border',
          'placeholder:text-ink-light',
          // Solid brand-blue focus ring
          'focus:outline-none focus:ring-2 focus:ring-brand-blue focus:ring-offset-0',
          'transition-colors duration-150',
          hasError
            ? 'border-brand-red focus:ring-brand-red'
            : 'border-surface-200 focus:border-brand-blue',
        )}
      />
      <FieldError id={`${name}-error`} message={error} show={hasError} />
    </div>
  )
}

/* ─── Inline field error ─────────────────────────────────────── */
function FieldError({ id, message, show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.p
          id={id}
          role="alert"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.2 }}
          className="flex items-center gap-1.5 text-xs text-brand-red font-body"
        >
          <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
            <circle cx="5.5" cy="5.5" r="4.5" stroke="currentColor" strokeWidth="1.2"/>
            <path d="M5.5 3.5v2.5M5.5 7.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          </svg>
          {message}
        </motion.p>
      )}
    </AnimatePresence>
  )
}

/* ─── Loading spinner ────────────────────────────────────────── */
function Spinner() {
  return (
    <svg
      className="animate-spin"
      width="14" height="14"
      viewBox="0 0 14 14"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="7" cy="7" r="5.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeDasharray="28"
        strokeDashoffset="10"
        strokeLinecap="round"
        opacity="0.35"
      />
      <path d="M7 1.5A5.5 5.5 0 0112.5 7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
