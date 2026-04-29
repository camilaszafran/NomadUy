'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { AnimatePresence, motion } from 'framer-motion'
import { CaretLeft, CaretRight, Coffee, Buildings, ArrowSquareOut } from '@phosphor-icons/react'
import { useTranslations } from 'next-intl'
import PortableTextRenderer from '@/components/sections/guias/PortableTextRenderer'
import type { Place, PlaceLink } from '@/types/place'
import type { PortableTextBlock } from '@portabletext/react'

function LinkButton({ link }: { link: PlaceLink }) {
  const icon =
    link.category === 'coworking' ? <Buildings size={15} weight="bold" /> :
    link.category === 'cafe' ? <Coffee size={15} weight="bold" /> :
    <ArrowSquareOut size={15} weight="bold" />

  return (
    <a
      href={link.url}
      target="_blank"
      rel="noopener noreferrer"
      className="place-link-btn"
      data-category={link.category}
    >
      {link.logo?.url ? (
        <img src={link.logo.url} alt={link.label} className="place-link-logo" />
      ) : (
        <span className="place-link-icon">{icon}</span>
      )}
      {link.label}
      <ArrowSquareOut size={12} className="place-link-arrow" />
    </a>
  )
}

export default function PlaceCard({ place }: { place: Place }) {
  const t = useTranslations('vivir')
  const slides = place.photos?.length ? place.photos : null
  const [current, setCurrent] = useState(0)
  const total = slides ? slides.length : 1

  const next = useCallback(() => setCurrent((c) => (c + 1) % total), [total])
  const prev = () => setCurrent((c) => (c - 1 + total) % total)

  useEffect(() => {
    setCurrent(0)
  }, [place._id])

  useEffect(() => {
    if (total <= 1) return
    const id = setInterval(next, 4500)
    return () => clearInterval(id)
  }, [next, total])

  const links = place.links ?? []
  const cafes = links.filter((l) => l.category === 'cafe')
  const coworkings = links.filter((l) => l.category === 'coworking')
  const others = links.filter((l) => l.category === 'other')

  return (
    <div className="place-card">
      {/* Carousel */}
      <div className="place-carousel">
        <AnimatePresence mode="wait">
          <motion.div
            key={current}
            className="place-carousel-slide"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {slides ? (
              <Image
                src={slides[current].url!}
                alt={slides[current].alt ?? place.title}
                fill
                sizes="(max-width: 960px) 100vw, 960px"
                style={{ objectFit: 'cover' }}
                priority
              />
            ) : (
              <div
                className="place-carousel-placeholder"
                style={{ background: place.placeholderGradient }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        <div className="place-carousel-overlay" />

        <div className="place-carousel-meta">
          <span className="place-region-badge">{place.region}</span>
          <h2 className="place-title">{place.title}</h2>
          <p className="place-tagline">{place.tagline}</p>
        </div>

        {total > 1 && (
          <>
            <button className="carousel-btn carousel-btn-prev" onClick={prev} aria-label={t('place_prev')}>
              <CaretLeft size={18} weight="bold" />
            </button>
            <button className="carousel-btn carousel-btn-next" onClick={next} aria-label={t('place_next')}>
              <CaretRight size={18} weight="bold" />
            </button>
            <div className="carousel-dots">
              {Array.from({ length: total }).map((_, i) => (
                <button
                  key={i}
                  className={`carousel-dot${i === current ? ' active' : ''}`}
                  onClick={() => setCurrent(i)}
                  aria-label={t('place_photo_dot', { n: i + 1 })}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* Content */}
      <div className="place-content">
        {place.facts && (place.facts as PortableTextBlock[]).length > 0 && (
          <div className="place-facts">
            <PortableTextRenderer value={place.facts as PortableTextBlock[]} />
          </div>
        )}

        {links.length > 0 && (
          <div className="place-links">
            {coworkings.length > 0 && (
              <div className="place-links-group">
                <span className="place-links-label">{t('links_coworkings')}</span>
                <div className="place-links-row">
                  {coworkings.map((l, i) => <LinkButton key={i} link={l} />)}
                </div>
              </div>
            )}
            {cafes.length > 0 && (
              <div className="place-links-group">
                <span className="place-links-label">{t('links_cafes')}</span>
                <div className="place-links-row">
                  {cafes.map((l, i) => <LinkButton key={i} link={l} />)}
                </div>
              </div>
            )}
            {others.length > 0 && (
              <div className="place-links-group">
                <span className="place-links-label">{t('links_otros')}</span>
                <div className="place-links-row">
                  {others.map((l, i) => <LinkButton key={i} link={l} />)}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
