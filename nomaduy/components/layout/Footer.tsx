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
          <h4>El sitio</h4>
          <ul>
            <li><a href="/guias">Guías</a></li>
            <li><a href="/vivir">Vivir en Uruguay</a></li>
            <li><a href="/conocer-uruguay">Conocer Uruguay</a></li>
            <li><a href="/recursos">Recursos</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Comunidad</h4>
          <ul>
            <li><a href="/comunidad">Unirme gratis</a></li>
            <li><a href="/comunidad#galeria">Galería</a></li>
            <li><a href="/comunidad#eventos">Eventos</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 NomadUY · Hecho en Montevideo</span>
      </div>
    </footer>
  )
}
