const routes = [
  { icon: '🏄', title: 'Surf & Costa', desc: 'Punta del Este, La Pedrera, Cabo Polonio y Punta del Diablo — la ruta atlántica completa.' },
  { icon: '🏛', title: 'Historia & Patrimonio', desc: 'Colonia del Sacramento, Fray Bentos y los secretos coloniales del litoral oeste.' },
  { icon: '♨️', title: 'Termas del norte', desc: 'Salto, Paysandú y las termas naturales más accesibles de la región.' },
  { icon: '🦁', title: 'Wildlife & Naturaleza', desc: 'Cabo Polonio sin electricidad, lobos marinos, pingüinos y el cielo más estrellado.' },
]

export default function ExploreUruguay() {
  return (
    <section className="categories">
      <div className="section-header">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>🗺 Descubrí Uruguay</div>
        <h2>Conocer Uruguay</h2>
        <p>Rutas de viaje por interés y duración — del fin de semana a la inmersión profunda.</p>
        <a href="/conocer-uruguay" className="section-header-cta">Ver todas las rutas →</a>
      </div>
      <div className="categories-grid" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))' }}>
        {routes.map((route) => (
          <a key={route.title} href="/conocer-uruguay" className="cat-card">
            <span className="cat-icon">{route.icon}</span>
            <h3>{route.title}</h3>
            <p>{route.desc}</p>
            <div className="cat-arrow">Ver ruta →</div>
          </a>
        ))}
      </div>
    </section>
  )
}
