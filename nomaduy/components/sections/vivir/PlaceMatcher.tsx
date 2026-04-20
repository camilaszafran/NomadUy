'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import PlaceCard from './PlaceCard'
import PlaceGridCard from './PlaceGridCard'
import type { Place } from '@/types/place'

function score(place: Place, cost: number, urban: number, pop: number) {
  return (
    Math.abs(place.costOfLiving - cost) +
    Math.abs(place.urbanRural - urban) +
    Math.abs(place.population - pop)
  )
}

type SliderProps = {
  label: string
  value: number
  minLabel: string
  maxLabel: string
  onChange: (v: number) => void
}

function Slider({ label, value, minLabel, maxLabel, onChange }: SliderProps) {
  return (
    <div className="matcher-slider-group">
      <div className="matcher-slider-header">
        <span className="matcher-slider-label">{label}</span>
        <span className="matcher-slider-value">{value} / 5</span>
      </div>
      <input
        type="range"
        min={1}
        max={5}
        step={1}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="matcher-range"
      />
      <div className="matcher-slider-legends">
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
    </div>
  )
}

export default function PlaceMatcher({ places }: { places: Place[] }) {
  const searchParams = useSearchParams()
  const [cost, setCost] = useState(3)
  const [urban, setUrban] = useState(3)
  const [pop, setPop] = useState(3)
  const [pinnedId, setPinnedId] = useState<string | null>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const slug = searchParams.get('place')
    if (!slug) return
    const found = places.find((p) => p.slug.current === slug)
    if (!found) return
    setCost(found.costOfLiving)
    setUrban(found.urbanRural)
    setPop(found.population)
    setPinnedId(found._id)
    setTimeout(() => {
      resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const sorted = useMemo(() => {
    return [...places].sort((a, b) => score(a, cost, urban, pop) - score(b, cost, urban, pop))
  }, [places, cost, urban, pop])

  const featured = pinnedId ? (places.find((p) => p._id === pinnedId) ?? sorted[0]) : sorted[0]
  const others = featured ? sorted.filter((p) => p._id !== featured._id).slice(0, 3) : []

  const handleSlider = (setter: (v: number) => void) => (v: number) => {
    setPinnedId(null)
    setter(v)
  }

  const handleOtherClick = (id: string) => {
    setPinnedId(id)
    resultRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="matcher-wrap">
      {/* Sliders */}
      <section className="matcher-section">
        <div className="matcher-inner">
          <div className="matcher-intro">
            <span className="section-eyebrow">Encontrá tu lugar</span>
            <h2>¿Cómo imaginás tu vida en Uruguay?</h2>
            <p>Mové los filtros y te mostramos el lugar que mejor encaja con lo que buscás.</p>
          </div>
          <div className="matcher-sliders">
            <Slider
              label="Costo de vida"
              value={cost}
              minLabel="Muy barato"
              maxLabel="Caro"
              onChange={handleSlider(setCost)}
            />
            <Slider
              label="Entorno"
              value={urban}
              minLabel="Rural profundo"
              maxLabel="Ciudad grande"
              onChange={handleSlider(setUrban)}
            />
            <Slider
              label="Tamaño"
              value={pop}
              minLabel="Aldea pequeña"
              maxLabel="Gran ciudad"
              onChange={handleSlider(setPop)}
            />
          </div>
        </div>
      </section>

      {/* Best match */}
      {featured && (
        <section className="match-result-section" ref={resultRef}>
          <div className="match-result-inner">
            <div className="match-result-label">
              <span className="match-badge">Tu match ideal</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={featured._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
              >
                <PlaceCard place={featured} />
              </motion.div>
            </AnimatePresence>
          </div>
        </section>
      )}

      {/* Others */}
      {others.length > 0 && (
        <section className="otros-section">
          <div className="otros-inner">
            <h2 className="otros-title">Otros lugares que te pueden interesar</h2>
            <div className="otros-grid">
              {others.map((place) => (
                <PlaceGridCard
                  key={place._id}
                  place={place}
                  matchScore={score(place, cost, urban, pop)}
                  onClick={() => handleOtherClick(place._id)}
                />
              ))}
            </div>
            <div className="otros-cta">
              <Link href="/vivir/lugares" className="btn-mostrar-todos">
                Mostrar todos los lugares
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
