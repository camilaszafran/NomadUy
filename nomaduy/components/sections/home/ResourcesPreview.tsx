const resources = [
  { icon: '💰', title: 'Calculadora de costo de vida', desc: 'Ajustá sliders a tu estilo de vida — Budget, Cómodo o Expat. Resultado en USD o UYU.', cta: 'Abrir calculadora →' },
  { icon: '✅', title: 'Checklist: Primeras 48h', desc: '18 pasos esenciales al llegar. Descargable en PDF, gratis para miembros.', cta: 'Descargar →' },
  { icon: '🏛', title: 'Trámites & Residencia', desc: 'Cédula, permiso nómada digital y residencia — en lenguaje claro, sin abogado.', cta: 'Ver guía →' },
  { icon: '📱', title: 'Apps esenciales', desc: 'MiUruguay, STM, Pedidos Ya y las 12 apps que todo nómada necesita al llegar.', cta: 'Ver lista →' },
]

export default function ResourcesPreview() {
  return (
    <section className="categories" style={{ background: 'var(--sand)' }}>
      <div className="section-header">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>🛠 Herramientas</div>
        <h2>Recursos & Calculadoras</h2>
        <p>Números reales, checklists descargables y links directos a lo que necesitás.</p>
        <a href="/recursos" className="section-header-cta">Ver todos los recursos →</a>
      </div>
      <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {resources.map((r) => (
          <a key={r.title} href="/recursos" className="cat-card">
            <span className="cat-icon">{r.icon}</span>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
            <div className="cat-arrow">{r.cta}</div>
          </a>
        ))}
      </div>
    </section>
  )
}
