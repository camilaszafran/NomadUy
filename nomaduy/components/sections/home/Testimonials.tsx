const testimonials = [
  {
    quote: 'Me mudé a Montevideo desde Berlín sin plan. Esta página fue lo primero que guardé. La guía de barrios sola me ahorró semanas de confusión.',
    flag: '🇩🇪',
    name: 'Jonas W.',
    meta: 'Dev remoto · Pocitos',
  },
  {
    quote: 'El grupo de WhatsApp para recién llegados fue un salvavidas. Alguien de la comunidad me ayudó a encontrar departamento en 3 días.',
    flag: '🇧🇷',
    name: 'Mariana C.',
    meta: 'Expat · Punta Carretas',
  },
  {
    quote: 'Por fin una guía que no trata a Uruguay como algo de paso. La sección de visas es la explicación más clara que encontré en internet.',
    flag: '🇺🇸',
    name: 'Rachel T.',
    meta: 'Nómade · 3 meses en Montevideo',
  },
]

export default function Testimonials() {
  return (
    <section className="testimonials">
      <div className="section-eyebrow" style={{ justifyContent: 'center' }}>💬 Voces de la comunidad</div>
      <h2>De personas como vos</h2>

      <div className="testimonials-grid">
        {testimonials.map((t) => (
          <div key={t.name} className="testi-card">
            <p className="testi-quote">{t.quote}&rdquo;</p>
            <div className="testi-author">
              <div className="testi-avatar">{t.flag}</div>
              <div>
                <div className="testi-name">{t.name}</div>
                <div className="testi-meta">{t.meta}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
