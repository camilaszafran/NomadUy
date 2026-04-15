export default function FeaturedGuides() {
  return (
    <section className="featured">
      <div className="section-header">
        <div className="section-eyebrow" style={{ justifyContent: 'center' }}>📖 Por donde empezar</div>
        <h2>Las guías más leídas</h2>
      </div>

      <div className="featured-grid">
        <a href="/guias#primeros-pasos" className="feat-card">
          <div
            className="feat-card-img-placeholder"
            style={{ background: 'linear-gradient(135deg, #EBF2FB 0%, #D4E8FF 100%)' }}
          >
            🛬
          </div>
          <div className="feat-card-body">
            <span className="feat-tag tag-arrival">Llegada</span>
            <h3>Tus primeras 48 horas en Uruguay — el checklist completo</h3>
            <p>Desde el aeropuerto hasta tu primer apartamento. Paso a paso, con links a cada recurso.</p>
          </div>
        </a>

        <a href="/guias#gemas-escondidas" className="feat-card">
          <div
            className="feat-card-img-placeholder"
            style={{ background: 'linear-gradient(135deg, #EAF4EE 0%, #C8E6D4 100%)' }}
          >
            💎
          </div>
          <div className="feat-card-body">
            <span className="feat-tag tag-gems">Gemas</span>
            <h3>10 lugares de Uruguay que la mayoría de extranjeros nunca conoce</h3>
            <p>Cabo Polonio, la Quebrada de los Cuervos, y más.</p>
          </div>
        </a>

        <a href="/guias#comida" className="feat-card">
          <div
            className="feat-card-img-placeholder"
            style={{ background: 'linear-gradient(135deg, #FFF5E6 0%, #FFE4B5 100%)' }}
          >
            🍖
          </div>
          <div className="feat-card-body">
            <span className="feat-tag tag-food">Comida</span>
            <h3>Los 15 platos que tenés que comer antes de irte de Uruguay</h3>
            <p>Chivito, torta frita y el asado más largo del mundo.</p>
          </div>
        </a>
      </div>
    </section>
  )
}
