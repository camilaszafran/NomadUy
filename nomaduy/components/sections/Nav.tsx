export default function Nav() {
  return (
    <nav>
      <a href="/" className="nav-logo">
        Nomad<span>UY</span> 🇺🇾
      </a>
      <ul className="nav-links">
        <li><a href="/guias">Guías</a></li>
        <li><a href="/vivir">Vivir</a></li>
        <li><a href="/conocer-uruguay">Conocer Uruguay</a></li>
        <li><a href="/recursos">Recursos</a></li>
        <li><a href="/comunidad" className="nav-cta">Unirme</a></li>
      </ul>
    </nav>
  )
}
