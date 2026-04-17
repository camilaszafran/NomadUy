'use client'

import { CalendarBlank, ChatTeardropText, Globe } from '@phosphor-icons/react/dist/ssr'

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-bg">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="hero-video"
        >
          <source src="/videos/hero-compressed.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" />
      </div>
      <div className="hero-shapes">
        <div className="shape shape-1" />
        <div className="shape shape-2" />
        <div className="shape shape-3" />
      </div>

      <div className="hero-text">
        <div className="hero-eyebrow">Uruguay, América del Sur</div>
        <h1>
          Hacé de Uruguay<br />
          <em>tu hogar.</em>
        </h1>
        <p className="hero-sub">
          La guía más completa para vivir, trabajar y echar raíces en Uruguay — hecha por personas que eligieron quedarse.
        </p>

        <div className="hero-actions">
          <a href="/comunidad" className="btn-primary">
            Unirme a la comunidad →
          </a>
          <a href="/guias" className="btn-secondary">
            Explorar las guías
          </a>
          <a href="#pdf" className="btn-text">
            ↓ Descargar guía PDF gratis — &ldquo;Tus primeros 30 días en Uruguay&rdquo;
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-card">
          <div className="hero-card-label">La comunidad ahora</div>
          <div className="community-pulse">
            <div className="pulse-stat">
              <div className="pulse-icon blue"><CalendarBlank size={18} weight="thin" /></div>
              <div>
                <div className="pulse-label">Próximo meetup</div>
                <div className="pulse-value">Jueves 1 de mayo · Montevideo</div>
              </div>
            </div>
            <div className="pulse-divider" />
            <div className="pulse-stat">
              <div className="pulse-icon gold"><ChatTeardropText size={18} weight="thin" /></div>
              <div>
                <div className="pulse-label">WhatsApp grupos activos</div>
                <div className="pulse-value">Recién llegados · Housing · Eventos</div>
              </div>
            </div>
            <div className="pulse-divider" />
            <div className="pulse-stat">
              <div className="pulse-icon green"><Globe size={18} weight="thin" /></div>
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
            <button className="join-mini-btn">Unirme gratis</button>
          </div>
          <div className="join-mini-note">Sin spam. Cancelá cuando quieras.</div>
        </div>
      </div>
    </section>
  )
}
