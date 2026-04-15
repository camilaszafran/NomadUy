const places = [
  { icon: '💻', title: 'Coworkings', desc: '6 espacios verificados con WiFi testeado, precios reales y descuentos para miembros.', cta: 'Ver espacios →' },
  { icon: '🏠', title: 'Coliving & Alojamiento', desc: 'Cuartos amoblados y apartamentos para nómadas — sin contratos complicados.', cta: 'Explorar →' },
  { icon: '🍽', title: 'Restaurantes', desc: 'Los favoritos de la comunidad — no los del turista. Recomendaciones reales.', cta: 'Explorar →' },
  { icon: '☕', title: 'Cafés para trabajar', desc: 'Buen WiFi, enchufes y café decente. Testeados por nómadas reales.', cta: 'Explorar →' },
]

export default function DirectoryPreview() {
  return (
    <section className="categories" style={{ background: 'var(--sand)' }}>
      <div className="section-header">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>🏙 Directorio</div>
        <h2>Vivir en Uruguay</h2>
        <p>Coworkings verificados, coliving, médicos y los cafés donde realmente se puede trabajar.</p>
        <a href="/vivir" className="section-header-cta">Ver directorio completo →</a>
      </div>
      <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {places.map((place) => (
          <a key={place.title} href="/vivir" className="cat-card">
            <span className="cat-icon">{place.icon}</span>
            <h3>{place.title}</h3>
            <p>{place.desc}</p>
            <div className="cat-arrow">{place.cta}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
