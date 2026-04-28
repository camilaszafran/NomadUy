'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const slides = [
  {
    type: 'photo' as const,
    src: '/images/community/WhatsApp Image 2026-04-14 at 10.03.54.jpeg',
  },
  {
    type: 'quote' as const,
    quote: 'Llegué sin conocer a nadie. A los 15 días ya tenía grupo de running, compañeros de coworking y dos amigos para el asado del fin de semana.',
    author: 'Martina R.',
    origin: 'Buenos Aires → Pocitos',
  },
  {
    type: 'photo' as const,
    src: '/images/community/WhatsApp Image 2026-04-14 at 10.03.54 (1).jpeg',
  },
  {
    type: 'quote' as const,
    quote: 'NomadUY me ayudó a encontrar depto, entender los trámites de residencia y conectar con otros freelancers. Todo en la misma semana.',
    author: 'Carlos M.',
    origin: 'Ciudad de México → Palermo',
  },
  {
    type: 'photo' as const,
    src: '/images/community/WhatsApp Image 2026-04-14 at 10.03.54 (2).jpeg',
  },
  {
    type: 'photo' as const,
    src: '/images/community/WhatsApp Image 2026-04-14 at 10.03.54 (3).jpeg',
  },
]

function getOffset(i: number, current: number, total: number) {
  let offset = i - current
  if (offset > total / 2) offset -= total
  if (offset < -total / 2) offset += total
  return offset
}

export default function CommunityCarousel() {
  const [index, setIndex] = useState(0)

  function go(next: number) {
    setIndex((next + slides.length) % slides.length)
  }

  return (
    <section className="carousel-section" id="galeria">
      <div className="carousel-header">
        <div className="section-eyebrow">Comunidad</div>
        <h2>Personas reales haciendo vida aquí</h2>
      </div>

      <div className="carousel-stage">
        <div className="carousel-window">
          {slides.map((slide, i) => {
            const offset = getOffset(i, index, slides.length)
            const visible = Math.abs(offset) <= 1

            return (
              <motion.div
                key={i}
                className="carousel-card"
                animate={{
                  x: `${offset * 96}%`,
                  scale: offset === 0 ? 1 : 0.86,
                  opacity: visible ? (offset === 0 ? 1 : 0.52) : 0,
                  zIndex: offset === 0 ? 2 : 1,
                }}
                transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
                onClick={() => offset !== 0 && go(index + offset)}
                style={{ cursor: offset !== 0 && visible ? 'pointer' : 'default' }}
              >
                {slide.type === 'photo' ? (
                  <div className="carousel-photo-card">
                    <Image
                      src={slide.src}
                      alt="Comunidad NomadUY"
                      fill
                      style={{ objectFit: 'cover' }}
                      sizes="(max-width: 768px) 90vw, 560px"
                    />
                  </div>
                ) : (
                  <div className="carousel-quote-card">
                    <span className="carousel-quote-mark">"</span>
                    <blockquote>{slide.quote}</blockquote>
                    <div className="carousel-author">
                      <strong>{slide.author}</strong>
                      <span>{slide.origin}</span>
                    </div>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>
      </div>

      <div className="carousel-controls">
        <button className="carousel-arrow" onClick={() => go(index - 1)} aria-label="Anterior">←</button>
        <div className="carousel-dots">
          {slides.map((_, i) => (
            <button
              key={i}
              className={`carousel-dot ${i === index ? 'carousel-dot--active' : ''}`}
              onClick={() => go(i)}
              aria-label={`Slide ${i + 1}`}
            />
          ))}
        </div>
        <button className="carousel-arrow" onClick={() => go(index + 1)} aria-label="Siguiente">→</button>
      </div>
    </section>
  )
}
