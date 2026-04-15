const groups = [
  {
    icon: '⚽', bg: 'var(--green-pale)',
    name: 'Deportes & Actividad', desc: 'Fútbol, running, yoga, padel, ciclismo urbano y más.',
    tags: ['Fútbol amateur', 'Running Rambla', 'Yoga', 'Pádel', 'Ciclismo'],
  },
  {
    icon: '🍖', bg: '#FEF4E4',
    name: 'Social & Cultura', desc: 'Intercambio de idiomas, asados comunitarios, tango y salidas culturales.',
    tags: ['Language exchange', 'Asado mensual', 'Tango', 'Cine & Teatro'],
  },
  {
    icon: '💻', bg: 'var(--blue-pale)',
    name: 'Profesional & Startup', desc: 'Para emprendedores, freelancers y trabajadores remotos.',
    tags: ['Emprendedores', 'Tech & Startup', 'Remote workers', 'Co-founders'],
  },
  {
    icon: '🏠', bg: 'var(--sand)',
    name: 'Vida & Familia', desc: 'Newcomers en general, familias, mujeres y búsqueda de compañeros de depto.',
    tags: ['Newcomers', 'Familias con hijos', 'Mujeres expats', 'Roommates'],
  },
]

export default function GroupsSection() {
  return (
    <section className="groups-section">
      <div className="groups-header">
        <div className="section-eyebrow">👥 Grupos de interés</div>
        <h2>Encontrá tu grupo</h2>
        <p>La gente se queda en la comunidad porque encuentra personas con intereses parecidos — no solo conexión de wifi.</p>
      </div>
      <div className="groups-grid">
        {groups.map((g) => (
          <a key={g.name} href="#" className="group-card">
            <div className="group-card-header">
              <div className="group-icon" style={{ background: g.bg }}>{g.icon}</div>
              <h3>{g.name}</h3>
            </div>
            <p>{g.desc}</p>
            <div className="group-tags">
              {g.tags.map((t) => <span key={t} className="group-tag">{t}</span>)}
            </div>
          </a>
        ))}
      </div>
    </section>
  )
}
