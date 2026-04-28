'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const bars = [
  { label: 'Alquiler',    pct: 43, color: '#1A4B8C' },
  { label: 'Comida',      pct: 25, color: '#2E7D52' },
  { label: 'Transporte',  pct: 5,  color: '#C8940F' },
  { label: 'Ocio',        pct: 9,  color: '#7B3F8A' },
  { label: 'Salud',       pct: 6,  color: '#C0392B' },
  { label: 'Varios',      pct: 12, color: '#5B5B7A' },
]

export default function ResourcesPreview() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="resources-preview-section" ref={ref}>
      <motion.div
        className="resources-preview-text"
        initial={{ opacity: 0, x: -28 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
      >
        <h2>Recursos para planear tu vida en Uruguay</h2>
        <p>Calculadora de costo de vida y links a los mejores recursos externos — todo en un lugar.</p>
        <a href="/recursos" className="btn-resources">Ver recursos →</a>
      </motion.div>

      <motion.div
        className="resources-preview-card"
        initial={{ opacity: 0, y: 32, scale: 0.97 }}
        animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
        transition={{ duration: 0.65, delay: 0.15, ease: [0.23, 1, 0.32, 1] }}
      >
        <div className="rp-card-header">
          <span className="rp-card-label">Costo mensual estimado</span>
          <motion.span
            className="rp-card-total"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            $1.630
          </motion.span>
          <span className="rp-card-sub">USD · perfil cómodo · Montevideo</span>
        </div>
        <div className="rp-bars">
          {bars.map((b, i) => (
            <div key={b.label} className="rp-bar-row">
              <span className="rp-bar-label">{b.label}</span>
              <div className="rp-bar-bg">
                <motion.div
                  className="rp-bar-fill"
                  style={{ background: b.color }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${b.pct}%` } : {}}
                  transition={{ duration: 0.6, delay: 0.4 + i * 0.07, ease: [0.23, 1, 0.32, 1] }}
                />
              </div>
              <span className="rp-bar-pct">{b.pct}%</span>
            </div>
          ))}
        </div>
        <div className="rp-card-footer">
          <span>+ 9 recursos externos</span>
          <a href="/recursos" className="rp-card-cta">Abrir calculadora →</a>
        </div>
      </motion.div>
    </section>
  )
}
