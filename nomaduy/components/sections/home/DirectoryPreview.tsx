import { Monitor, HouseLine, ForkKnife, Coffee } from '@phosphor-icons/react/dist/ssr'
import AnimateIn from '@/components/ui/AnimateIn'

const places = [
  { Icon: Monitor, title: 'Coworkings', desc: '6 espacios verificados con WiFi testeado, precios reales y descuentos para miembros.', cta: 'Ver espacios →' },
  { Icon: HouseLine, title: 'Coliving & Alojamiento', desc: 'Cuartos amoblados y apartamentos para nómadas — sin contratos complicados.', cta: 'Explorar →' },
  { Icon: ForkKnife, title: 'Restaurantes', desc: 'Los favoritos de la comunidad — no los del turista. Recomendaciones reales.', cta: 'Explorar →' },
  { Icon: Coffee, title: 'Cafés para trabajar', desc: 'Buen WiFi, enchufes y café decente. Testeados por nómadas reales.', cta: 'Explorar →' },
]

export default function DirectoryPreview() {
  return (
    <section className="categories" style={{ background: 'var(--sand)' }}>
      <AnimateIn className="section-header">
        <h2>Vivir en Uruguay</h2>
        <p>Coworkings verificados, coliving, médicos y los cafés donde realmente se puede trabajar.</p>
        <a href="/vivir" className="section-header-cta">Ver directorio completo →</a>
      </AnimateIn>

      <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {places.map((place, i) => (
          <AnimateIn key={place.title} delay={i * 0.1} direction="scale">
            <a href="/vivir" className="cat-card cat-card-animated" style={{ display: 'block' }}>
              <span className="cat-icon cat-icon-sand">
                <place.Icon size={26} weight="light" />
              </span>
              <h3>{place.title}</h3>
              <p>{place.desc}</p>
              <div className="cat-arrow">{place.cta}</div>
            </a>
          </AnimateIn>
        ))}
      </div>
    </section>
  )
}
