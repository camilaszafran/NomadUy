const categories = [
  { icon: '✈️', title: 'Primeros pasos y llegada', desc: 'Las primeras 48 horas — SIM, cambio de moneda, banco, apps esenciales.', href: '/guias#primeros-pasos' },
  { icon: '🛂', title: 'Visas y legal', desc: 'Visa turista, permiso nómade digital, residencia — paso a paso, en lenguaje claro.', href: '/guias#visas-legal' },
  { icon: '🏘️', title: 'Barrios', desc: 'Pocitos, Palermo, Ciudad Vieja — encontrá tu rincón en Montevideo.', href: '/guias#barrios' },
  { icon: '🏠', title: 'Housing y alquiler', desc: 'Cómo encontrar depto, contratos en español, precios actualizados.', href: '/guias#housing' },
  { icon: '💻', title: 'Trabajo y coworking', desc: 'Los mejores coworkings y cafés donde realmente podés trabajar.', href: '/guias#trabajo-coworking' },
  { icon: '💰', title: 'Costo de vida', desc: 'Presupuestos reales, estrategia USD vs. peso, ventajas impositivas.', href: '/guias#costo-de-vida' },
  { icon: '🏥', title: 'Salud y bienestar', desc: 'Mutualistas, seguro internacional, farmacias y médicos recomendados.', href: '/guias#salud' },
  { icon: '🚌', title: 'Transporte', desc: 'STM, Uber, viajes intercity, cómo llegar a Punta del Este.', href: '/guias#transporte' },
  { icon: '🍖', title: 'Comida y restaurantes', desc: 'Del chivito a las parrillas escondidas — la guía definitiva de food.', href: '/guias#comida' },
  { icon: '🎭', title: 'Cultura e idioma', desc: 'Mate, carnaval, tango, rioplatense y cómo encajar con los locales.', href: '/guias#cultura' },
  { icon: '🌿', title: 'Parques y naturaleza', desc: 'La Rambla, Parque Rodó y escapadas de naturaleza desde la ciudad.', href: '/guias#parques' },
  { icon: '💎', title: 'Gemas escondidas', desc: 'Cabo Polonio, Punta del Diablo, Salto — lo que los turistas no ven.', href: '/guias#gemas-escondidas' },
]

export default function GuideCategories() {
  return (
    <section className="categories" id="categories">
      <div className="section-header">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>📚 Guías</div>
        <h2>Todo lo que necesitás, organizado.</h2>
        <p>Dieciséis secciones con guías en profundidad sobre cada aspecto de vivir en Uruguay.</p>
        <a href="/guias" className="section-header-cta">Ver toda la guía →</a>
      </div>

      <div className="categories-grid">
        {categories.map((cat) => (
          <a key={cat.href} href={cat.href} className="cat-card">
            <span className="cat-icon">{cat.icon}</span>
            <h3>{cat.title}</h3>
            <p>{cat.desc}</p>
            <div className="cat-arrow">Explorar →</div>
          </a>
        ))}
      </div>
    </section>
  )
}
