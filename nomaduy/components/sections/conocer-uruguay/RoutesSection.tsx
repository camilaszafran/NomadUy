'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Ruta } from '@/types'
import RouteModal from './RouteModal'

const durations = ['Todos', '1 día', 'Fin de semana', '4–7 días']

function getInterestStyle(label?: string): { bg: string; color: string } {
  const map: Record<string, { bg: string; color: string }> = {
    'Historia':       { bg: 'var(--blue-pale)',              color: 'var(--blue)'   },
    'Playa':          { bg: 'var(--blue-pale)',              color: 'var(--blue)'   },
    'Naturaleza':     { bg: 'var(--green-pale)',             color: 'var(--green)'  },
    'Relax & Termas': { bg: 'rgba(26,26,46,0.06)',           color: 'var(--ink-60)' },
    'Gastronomía':    { bg: 'rgba(200,148,15,0.10)',         color: 'var(--gold)'   },
    'Montevideo':     { bg: 'var(--blue-pale)',              color: 'var(--blue)'   },
  }
  return map[label ?? ''] ?? { bg: 'var(--blue-pale)', color: 'var(--blue)' }
}

const cardVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, delay: i * 0.06, ease: [0.23, 1, 0.32, 1] as const },
  }),
}

interface RoutesSectionProps {
  routes: Ruta[]
}

export default function RoutesSection({ routes }: RoutesSectionProps) {
  const [activeDuration, setActiveDuration] = useState('Todos')
  const [activeRoute, setActiveRoute] = useState<Ruta | null>(null)

  const filtered = routes.filter((r) =>
    activeDuration === 'Todos' || r.duration === activeDuration
  )

  return (
    <>
      <main className="main-wrap">
        <section className="routes-section">
          <div className="routes-section-head">
            <h2>Rutas desde Montevideo</h2>
            <div className="duration-tabs">
              {durations.map((d) => (
                <button
                  key={d}
                  className={`dur-btn${activeDuration === d ? ' active' : ''}`}
                  onClick={() => setActiveDuration(d)}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          <div className="routes-grid" key={activeDuration}>
            <AnimatePresence mode="wait">
              {filtered.map((r, i) => {
                const style = getInterestStyle(r.interestLabel)
                return (
                  <motion.div
                    key={r._id}
                    className="route-card"
                    custom={i}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    onClick={() => setActiveRoute(r)}
                  >
                    {r.coverImage?.url && (
                      <div className="route-card-image">
                        <img src={r.coverImage.url} alt={r.coverImage.alt ?? r.title} />
                      </div>
                    )}
                    <div className="route-card-header">
                      {r.interestLabel && (
                        <div className="route-interest" style={{ background: style.bg, color: style.color }}>
                          {r.interestLabel}
                        </div>
                      )}
                      <h3>{r.title}</h3>
                      <div className="route-meta">
                        {r.distance && <span>{r.distance}</span>}
                        {r.duration && <span>{r.duration}</span>}
                      </div>
                    </div>
                    {r.teaser && <div className="route-teaser">{r.teaser}</div>}
                    {r.stops && r.stops.length > 0 && (
                      <div className="route-stops">
                        {r.stops.slice(0, 3).map((s) => (
                          <span key={s} className="stop-chip">{s}</span>
                        ))}
                      </div>
                    )}
                    <button className="route-cta-link">Ver ruta →</button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="routes-empty">No hay rutas para esa duración.</div>
          )}
        </section>
      </main>

      {activeRoute && (
        <RouteModal ruta={activeRoute} onClose={() => setActiveRoute(null)} />
      )}
    </>
  )
}
