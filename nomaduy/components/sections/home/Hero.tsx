'use client'

import { motion } from 'framer-motion'
import { Calendar, ChatsCircle, Globe } from '@phosphor-icons/react'
import type { CalendarEvent } from '@/lib/calendar'

function formatEventDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('es-UY', { weekday: 'short', day: 'numeric', month: 'short' })
}

const ease = [0.23, 1, 0.32, 1] as [number, number, number, number]

const textItem = (delay: number) => ({
  initial: { opacity: 0, y: 28 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease },
})

interface HeroProps {
  events: CalendarEvent[]
}

export default function Hero({ events }: HeroProps) {
  return (
    <section className="hero hero-video-mode">
      {/* Video background — drop hero.mp4 in /public/videos/ */}
      <div className="hero-media">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
          poster="/images/hero-poster.jpg"
        >
          <source src="/videos/hero-compressed.mp4" type="video/mp4" />
        </video>
        {/* Dark gradient — heavier left (text), lighter right (card) */}
        <div className="hero-overlay" />
      </div>

      <motion.div className="hero-text" style={{ position: 'relative', zIndex: 1 }}>
        <motion.div className="hero-eyebrow hero-eyebrow-light" {...textItem(0.1)}>
          Uruguay, América del Sur
        </motion.div>

        <motion.h1 className="hero-h1-light" {...textItem(0.22)}>
          Hacé de Uruguay<br />
          <em>tu hogar.</em>
        </motion.h1>

        <motion.p className="hero-sub hero-sub-light" {...textItem(0.34)}>
          La guía más completa para vivir, trabajar y echar raíces en Uruguay — hecha por personas que eligieron quedarse.
        </motion.p>

        <motion.div className="hero-actions" {...textItem(0.46)}>
          <a href="/comunidad" className="btn-hero-primary">
            Unirme a la comunidad →
          </a>
          <a href="/guias" className="btn-hero-secondary">
            Explorar las guías
          </a>
          <a href="#pdf" className="btn-hero-text">
            ↓ Descargar guía PDF gratis
          </a>
        </motion.div>
      </motion.div>

      <motion.div
        className="hero-visual"
        style={{ position: 'relative', zIndex: 1 }}
        initial={{ opacity: 0, x: 40, scale: 0.97 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease }}
      >
        <div className="hero-card">
          <div className="hero-card-label">La comunidad ahora</div>
          <div className="community-pulse">
            {events.length > 0 ? (
              events.slice(0, 1).map((e, i) => (
                <div key={e.id}>
                  <a href="/comunidad#eventos" className="pulse-stat pulse-stat-link">
                    <div className="pulse-icon blue">
                      <Calendar size={20} weight="duotone" />
                    </div>
                    <div>
                      <div className="pulse-label">{formatEventDate(e.start)}</div>
                      <div className="pulse-value">{e.title}{e.location ? ` · ${e.location}` : ''}</div>
                    </div>
                  </a>
                  {i < events.slice(0, 1).length - 1 && <div className="pulse-divider" />}
                </div>
              ))
            ) : (
              <div className="pulse-stat">
                <div className="pulse-icon blue">
                  <Calendar size={20} weight="duotone" />
                </div>
                <div>
                  <div className="pulse-label">Próximo meetup</div>
                  <div className="pulse-value">Primer jueves de cada mes · Montevideo</div>
                </div>
              </div>
            )}
            <div className="pulse-divider" />
            <div className="pulse-stat">
              <div className="pulse-icon gold">
                <ChatsCircle size={20} weight="duotone" />
              </div>
              <div>
                <div className="pulse-label">WhatsApp grupos activos</div>
                <div className="pulse-value">Recién llegados · Housing · Eventos</div>
              </div>
            </div>
            <div className="pulse-divider" />
            <div className="pulse-stat">
              <div className="pulse-icon green">
                <Globe size={20} weight="duotone" />
              </div>
              <div>
                <div className="pulse-label">Nuevos miembros esta semana</div>
                <div className="pulse-value">34 personas de 12 países</div>
              </div>
            </div>
          </div>
        </div>

        <div className="join-mini">
          <h3>Empezá antes de llegar.</h3>
          <p>Unite a la comunidad y recibí la guía de bienvenida en tu inbox.</p>
          <div className="join-mini-fields">
            <input type="email" placeholder="tu@email.com" />
            <a href="/comunidad" className="join-mini-btn">Unirme gratis</a>
          </div>
          <div className="join-mini-note">Sin spam. Cancelá cuando quieras.</div>
        </div>
      </motion.div>
    </section>
  )
}
