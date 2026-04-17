'use client'

import { motion, useInView, type Transition, type TargetAndTransition } from 'framer-motion'
import { useRef } from 'react'

export type Direction = 'up' | 'left' | 'right' | 'fade' | 'scale' | 'reveal'

interface AnimateInProps {
  children: React.ReactNode
  delay?: number
  direction?: Direction
  className?: string
  style?: React.CSSProperties
}

type VariantDef = {
  hidden: TargetAndTransition
  visible: TargetAndTransition
  transition: Transition
}

const variants: Record<Direction, VariantDef> = {
  up: {
    hidden:     { opacity: 0, y: 40 },
    visible:    { opacity: 1, y: 0 },
    transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
  left: {
    hidden:     { opacity: 0, x: -40 },
    visible:    { opacity: 1, x: 0 },
    transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
  right: {
    hidden:     { opacity: 0, x: 40 },
    visible:    { opacity: 1, x: 0 },
    transition: { duration: 0.65, ease: [0.23, 1, 0.32, 1] as [number, number, number, number] },
  },
  fade: {
    hidden:     { opacity: 0 },
    visible:    { opacity: 1 },
    transition: { duration: 0.5 },
  },
  // Spring-based pop — feels alive, not mechanical
  scale: {
    hidden:     { opacity: 0, scale: 0.88, y: 16 },
    visible:    { opacity: 1, scale: 1, y: 0 },
    transition: { type: 'spring', stiffness: 260, damping: 22 },
  },
  // Curtain/mask reveal — editorial, high-end feel
  reveal: {
    hidden:     { clipPath: 'inset(0 0 100% 0)', opacity: 1 },
    visible:    { clipPath: 'inset(0 0 0% 0)', opacity: 1 },
    transition: { duration: 0.7, ease: [0.77, 0, 0.175, 1] as [number, number, number, number] },
  },
}

export default function AnimateIn({
  children,
  delay = 0,
  direction = 'up',
  className,
  style,
}: AnimateInProps) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  const { hidden, visible, transition } = variants[direction]

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={inView ? visible : hidden}
      transition={{ ...transition, delay }}
      className={className}
      style={direction === 'reveal' ? { overflow: 'hidden', ...style } : style}
    >
      {children}
    </motion.div>
  )
}
