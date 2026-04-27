'use client'

import { useEffect, useState } from 'react'
import type { Ruta } from '@/types'

interface RouteModalProps {
  ruta: Ruta
  onClose: () => void
}

export default function RouteModal({ ruta, onClose }: RouteModalProps) {
  const [photoIndex, setPhotoIndex] = useState(0)
  const photos = ruta.photos ?? []

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const interestStyle = getInterestStyle(ruta.interestLabel)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Cerrar">✕</button>

        {/* Header */}
        <div className="modal-header">
          {ruta.interestLabel && (
            <div className="route-interest" style={{ background: interestStyle.bg, color: interestStyle.color }}>
              {ruta.interestLabel}
            </div>
          )}
          <h2 className="modal-title">{ruta.title}</h2>
          <div className="route-meta">
            {ruta.distance && <span>{ruta.distance}</span>}
            {ruta.duration && <span>{ruta.duration}</span>}
            {ruta.vibe && <span>{ruta.vibe}</span>}
          </div>
          {ruta.teaser && <p className="modal-teaser">{ruta.teaser}</p>}
        </div>

        <div className="modal-body">
          {/* Photo carousel */}
          {photos.length > 0 && (
            <div className="modal-carousel">
              <img
                src={photos[photoIndex].url}
                alt={photos[photoIndex].alt ?? ruta.title}
                className="carousel-img"
              />
              {photos.length > 1 && (
                <div className="carousel-controls">
                  <button
                    className="carousel-btn"
                    onClick={() => setPhotoIndex((i) => (i - 1 + photos.length) % photos.length)}
                  >
                    ←
                  </button>
                  <span className="carousel-count">{photoIndex + 1} / {photos.length}</span>
                  <button
                    className="carousel-btn"
                    onClick={() => setPhotoIndex((i) => (i + 1) % photos.length)}
                  >
                    →
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Itinerary */}
          {ruta.itinerary && ruta.itinerary.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Itinerario</h3>
              <div className="itinerary-list">
                {ruta.itinerary.map((day) => (
                  <div key={day._key} className="itinerary-day">
                    <div className="itinerary-day-title">{day.day}</div>
                    <p className="itinerary-day-content">{day.content}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Links */}
          {(ruta.stayLinks?.length || ruta.doLinks?.length || ruta.eatLinks?.length) ? (
            <div className="modal-section modal-links-section">
              {ruta.stayLinks && ruta.stayLinks.length > 0 && (
                <LinkGroup title="Dónde dormir" emoji="🏨" links={ruta.stayLinks} />
              )}
              {ruta.doLinks && ruta.doLinks.length > 0 && (
                <LinkGroup title="Qué hacer" emoji="🗺" links={ruta.doLinks} />
              )}
              {ruta.eatLinks && ruta.eatLinks.length > 0 && (
                <LinkGroup title="Dónde comer" emoji="🍽" links={ruta.eatLinks} />
              )}
            </div>
          ) : null}

          {/* Stops */}
          {ruta.stops && ruta.stops.length > 0 && (
            <div className="modal-section">
              <h3 className="modal-section-title">Paradas</h3>
              <div className="route-stops">
                {ruta.stops.map((s) => (
                  <span key={s} className="stop-chip">{s}</span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function LinkGroup({ title, emoji, links }: { title: string; emoji: string; links: { _key: string; label: string; url: string }[] }) {
  return (
    <div className="link-group">
      <div className="link-group-title">{emoji} {title}</div>
      <ul className="link-list">
        {links.map((l) => (
          <li key={l._key}>
            <a href={l.url} target="_blank" rel="noopener noreferrer" className="route-link">
              {l.label} →
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

function getInterestStyle(label?: string): { bg: string; color: string } {
  const map: Record<string, { bg: string; color: string }> = {
    'Historia': { bg: 'var(--blue-pale)', color: 'var(--blue)' },
    'Playa': { bg: 'var(--blue-pale)', color: 'var(--blue)' },
    'Naturaleza': { bg: 'var(--green-pale)', color: 'var(--green)' },
    'Relax & Termas': { bg: 'rgba(26,26,46,0.06)', color: 'var(--ink-60)' },
    'Gastronomía': { bg: 'rgba(200,148,15,0.10)', color: 'var(--gold)' },
    'Montevideo': { bg: 'var(--blue-pale)', color: 'var(--blue)' },
  }
  return map[label ?? ''] ?? { bg: 'var(--blue-pale)', color: 'var(--blue)' }
}
