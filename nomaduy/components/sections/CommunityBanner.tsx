export default function CommunityBanner() {
  return (
    <section className="community-banner" id="community">
      <div className="community-left">
        <div className="section-eyebrow">🤝 Comunidad</div>
        <h2>Encontrá tu gente en Uruguay.</h2>
        <p>
          Llegaste solo o con poca red — acá vas a encontrar respuestas, departamentos, restaurantes escondidos y amigos reales. La comunidad más cálida para personas que eligieron Uruguay.
        </p>

        <div className="community-channels">
          <a href="#" className="channel-pill">
            <span className="channel-icon wa-icon">💬</span>
            WhatsApp · Recién llegados
          </a>
          <a href="#" className="channel-pill">
            <span className="channel-icon wa-icon">💬</span>
            WhatsApp · Housing
          </a>
          <a href="#" className="channel-pill">
            <span className="channel-icon wa-icon">💬</span>
            WhatsApp · Eventos
          </a>
          <a href="#" className="channel-pill">
            <span className="channel-icon tg-icon">✈️</span>
            Canal de Telegram
          </a>
          <a href="#" className="channel-pill">
            <span className="channel-icon ig-icon">📸</span>
            Instagram
          </a>
        </div>

        <a href="/comunidad" className="community-cta-btn">Ver todo sobre la comunidad →</a>
      </div>

      <div className="community-form">
        <h3>Unirme a la comunidad</h3>
        <p>30 segundos. Recibís la guía de bienvenida de inmediato.</p>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="firstName">Nombre</label>
            <input id="firstName" type="text" placeholder="Cami" />
          </div>
          <div className="form-field">
            <label htmlFor="lastName">Apellido</label>
            <input id="lastName" type="text" placeholder="Szafran" />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="email">Email</label>
          <input id="email" type="email" placeholder="vos@email.com" />
        </div>

        <div className="form-row">
          <div className="form-field">
            <label htmlFor="nationality">Nacionalidad</label>
            <input id="nationality" type="text" placeholder="ej. Argentina" />
          </div>
          <div className="form-field">
            <label htmlFor="whatsapp">WhatsApp</label>
            <input id="whatsapp" type="tel" placeholder="+598 9X XXX XXX" />
          </div>
        </div>

        <div className="form-field">
          <label htmlFor="persona">Soy...</label>
          <select id="persona">
            <option>Nómade digital (~ 3 meses)</option>
            <option>Expat trabajando en Uruguay</option>
            <option>Inmigrante instalándome</option>
          </select>
        </div>

        <button className="submit-btn">Quiero mi guía de bienvenida →</button>
        <div className="form-privacy">🔒 Tu info no se comparte jamás.</div>
      </div>
    </section>
  )
}
