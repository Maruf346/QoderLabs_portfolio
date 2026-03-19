/**
 * UI Component Barrel Export
 *
 * Import any UI component from this single entry point:
 *
 *   import { Button, Card, Badge, Section } from '@components/ui'
 *   import { Heading, Text, Eyebrow }       from '@components/ui'
 *   import { MotionWrapper, MotionItem }    from '@components/ui'
 */

// ── Layout & Structure ──────────────────────────────────────────
export { default as Container }                        from './Container'
export { default as Section, StaggerGrid, StaggerItem } from './Section'

// ── Interactive ─────────────────────────────────────────────────
export { default as Button, ButtonGradient, ButtonIcon } from './Button'

// ── Data Display ────────────────────────────────────────────────
export {
  default as Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardIcon,
  FeatureCard,
}                                                      from './Card'

export {
  default as Badge,
  BadgeGroup,
  TechBadge,
  StatusBadge,
}                                                      from './Badge'

// ── Typography ──────────────────────────────────────────────────
export {
  Heading,
  Text,
  Eyebrow,
  Label,
  Code,
  GradientText,
  Prose,
  SectionHeader,
}                                                      from './Typography'

// ── Motion ──────────────────────────────────────────────────────
export {
  default as MotionWrapper,
  MotionItem,
  MotionSection,
  MotionHeading,
}                                                      from './MotionWrapper'
