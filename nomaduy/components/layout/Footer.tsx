export default function Footer() {
  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Nomad<span>UY</span></h3>
          <p>
            El recurso más completo para nómades digitales, expats e inmigrantes haciendo vida en Uruguay. Hecho con amor por personas que eligieron quedarse.
          </p>
        </div>

        <div className="footer-col">
          <h4>Empezar</h4>
          <ul>
            <li><a href="/guias#primeros-pasos">Primeros pasos</a></li>
            <li><a href="/guias#visas-legal">Visas y legal</a></li>
            <li><a href="/guias#barrios">Barrios</a></li>
            <li><a href="/guias#housing">Housing</a></li>
            <li><a href="/guias#costo-de-vida">Costo de vida</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Vivir aquí</h4>
          <ul>
            <li><a href="/guias#trabajo-coworking">Trabajo y coworking</a></li>
            <li><a href="/guias#comida">Comida y restaurantes</a></li>
            <li><a href="/guias#transporte">Transporte</a></li>
            <li><a href="/guias#salud">Salud y bienestar</a></li>
            <li><a href="/guias#cultura">Cultura e idioma</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Comunidad</h4>
          <ul>
            <li><a href="/comunidad">Unirme</a></li>
            <li><a href="/comunidad#eventos">Eventos mensuales</a></li>
            <li><a href="/comunidad#grupos">Grupos de interés</a></li>
            <li><a href="/vivir">Directorio de lugares</a></li>
            <li><a href="/recursos">Recursos y herramientas</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 NomadUY · Hecho en Montevideo</span>
        <span>Privacidad · Contacto</span>
      </div>
    </footer>
  )
}
