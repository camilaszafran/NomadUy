'use client'

import { useState, useMemo, useRef, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
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
  const t = useTranslations('vivir')
  const locale = useLocale()
  const lugaresHref = locale === 'es' ? '/vivir/lugares' : `/${locale}/vivir/lugares`
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
      <section className="matcher-section">
        <div className="matcher-inner">
          <div className="matcher-intro">
            <span className="section-eyebrow">{t('matcher_eyebrow')}</span>
            <h2>{t('matcher_heading')}</h2>
            <p>{t('matcher_desc')}</p>
          </div>
          <div className="matcher-sliders">
            <Slider
              label={t('slider_costo')}
              value={cost}
              minLabel={t('slider_costo_min')}
              maxLabel={t('slider_costo_max')}
              onChange={handleSlider(setCost)}
            />
            <Slider
              label={t('slider_entorno')}
              value={urban}
              minLabel={t('slider_entorno_min')}
              maxLabel={t('slider_entorno_max')}
              onChange={handleSlider(setUrban)}
            />
            <Slider
              label={t('slider_tamano')}
              value={pop}
              minLabel={t('slider_tamano_min')}
              maxLabel={t('slider_tamano_max')}
              onChange={handleSlider(setPop)}
            />
          </div>
        </div>
      </section>

      {featured && (
        <section className="match-result-section" ref={resultRef}>
          <div className="match-result-inner">
            <div className="match-result-label">
              <span className="match-badge">{t('match_badge')}</span>
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

      {others.length > 0 && (
        <section className="otros-section">
          <div className="otros-inner">
            <h2 className="otros-title">{t('others_heading')}</h2>
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
              <Link href={lugaresHref} className="btn-mostrar-todos">
                {t('show_all')}
              </Link>
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
