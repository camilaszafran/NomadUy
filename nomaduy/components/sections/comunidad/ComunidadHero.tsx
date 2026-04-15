export default function ComunidadHero() {
  return (
    <section className="comunidad-hero">
      <div className="page-eyebrow">🌿 Comunidad</div>
      <div className="comunidad-hero-grid">
        <div>
          <h1>Una comunidad de <em>personas reales</em> haciendo vida en Uruguay.</h1>
          <p>No somos un foro de turismo. Somos expats, nómadas e inmigrantes que eligieron quedarse — y queremos que tu llegada sea más fácil que la nuestra.</p>
          <a href="#unirme" className="btn-primary-green">🌿 Unirme gratis →</a>
        </div>
        <div className="hero-form" id="unirme">
          <h3>Unirme a NomadUY</h3>
          <p>Gratis para siempre. Sin spam.</p>
          <div className="form-row">
            <div className="form-field">
              <label>Nombre</label>
              <input type="text" placeholder="Tu nombre" />
            </div>
            <div className="form-field">
              <label>Email</label>
              <input type="email" placeholder="tu@email.com" />
            </div>
          </div>
          <div className="form-field">
            <label>¿Cuál es tu situación?</label>
            <select>
              <option>Seleccioná una opción</option>
              <option>Nómada digital (corto plazo)</option>
              <option>Expat (largo plazo, trabajo)</option>
              <option>Inmigrante (permanente)</option>
              <option>Todavía planeando mi llegada</option>
            </select>
          </div>
          <div className="form-field">
            <label>¿Cuándo llegás?</label>
            <select>
              <option>Seleccioná una opción</option>
              <option>Ya estoy en Uruguay</option>
              <option>En menos de 1 mes</option>
              <option>En 1–3 meses</option>
              <option>En 3–6 meses</option>
              <option>Todavía no sé</option>
            </select>
          </div>
          <button className="submit-btn">🌿 Unirme a la comunidad →</button>
          <p className="form-privacy">🔒 Sin spam. Solo cosas útiles. Podés darte de baja cuando quieras.</p>
        </div>
      </div>
    </section>
  )
}
