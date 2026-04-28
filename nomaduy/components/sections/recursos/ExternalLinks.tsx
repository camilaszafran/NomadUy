const links = [
  { title: 'Turista en Uruguay',       href: 'https://www.instagram.com/turistaenuruguay/' },
  { title: 'Turismo Rural y Natural',  href: 'https://turismoruralynatural.uy' },
  { title: 'Guruguay',                 href: 'https://www.guruguay.com/es/' },
  { title: 'Mateo Experience',         href: 'https://www.instagram.com/mateoexperience/' },
  { title: 'Paseos en Familia',        href: 'https://www.instagram.com/paseos_en_familia/' },
  { title: 'Hoy Qué Hago Montevideo',  href: 'https://www.instagram.com/hoyquehagomontevideo/' },
  { title: 'Voy',                      href: 'https://voy.com.uy' },
  { title: 'Sierra Atlántica',         href: 'https://sierraatlantica.com' },
  { title: 'Mapa Cafés Montevideo',    href: 'https://www.google.com/maps/search/mapa+cafes+montevideo/@-34.9213512,-56.1580083,14z/data=!4m2!2m1!6e5?entry=ttu&g_ep=EgoyMDI2MDQyMi4wIKXMDSoASAFQAw%3D%3D' },
]

export default function ExternalLinks() {
  return (
    <section className="external-links-section">
      <h2>Más recursos para explorar</h2>
      <div className="external-links-grid">
        {links.map((link) => (
          <a
            key={link.href}
            href={link.href}
            target="_blank"
            rel="noopener noreferrer"
            className="external-link-card"
          >
            <span>{link.title}</span>
            <span className="external-link-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
