'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslations } from 'next-intl'
import type { Ruta } from '@/types'
import RouteModal from './RouteModal'

function getInterestStyle(label?: string): { bg: string; color: string } {
  const map: Record<string, { bg: string; color: string }> = {
    'Historia':       { bg: 'var(--blue-pale)',      color: 'var(--blue)'   },
    'Playa':          { bg: 'var(--blue-pale)',      color: 'var(--blue)'   },
    'Naturaleza':     { bg: 'var(--green-pale)',     color: 'var(--green)'  },
    'Relax & Termas': { bg: 'rgba(26,26,46,0.06)',   color: 'var(--ink-60)' },
    'Gastronomía':    { bg: 'rgba(200,148,15,0.10)', color: 'var(--gold)'   },
    'Montevideo':     { bg: 'var(--blue-pale)',      color: 'var(--blue)'   },
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
  const t = useTranslations('conocer')
  const [activeRoute, setActiveRoute] = useState<Ruta | null>(null)
  const searchParams = useSearchParams()

  const durations = [
    t('duration_all'),
    t('duration_1day'),
    t('duration_weekend'),
    t('duration_4to7'),
  ]
  const [activeDuration, setActiveDuration] = useState(durations[0])

  useEffect(() => {
    const slug = searchParams.get('ruta')
    if (slug) {
      const match = routes.find((r) => r.slug?.current === slug)
      if (match) setActiveRoute(match)
    }
  }, [searchParams, routes])

  // Map translated tab label back to Sanity duration value
  const durationValueMap: Record<string, string> = {
    [t('duration_1day')]:    '1 día',
    [t('duration_weekend')]: 'Fin de semana',
    [t('duration_4to7')]:    '4–7 días',
  }

  const filtered = routes.filter((r) =>
    activeDuration === durations[0] || r.duration === durationValueMap[activeDuration]
  )

  return (
    <>
      <main className="main-wrap">
        <section className="routes-section">
          <div className="routes-section-head">
            <h2>{t('routes_heading')}</h2>
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
                    <button className="route-cta-link">{t('view_route')}</button>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {filtered.length === 0 && (
            <div className="routes-empty">{t('no_routes')}</div>
          )}
        </section>
      </main>

      {activeRoute && (
        <RouteModal ruta={activeRoute} onClose={() => setActiveRoute(null)} />
      )}
    </>
  )
}
