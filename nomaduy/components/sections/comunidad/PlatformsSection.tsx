const platforms = [
  { icon: '💬', iconClass: 'icon-wa', name: 'WhatsApp', desc: 'Grupos temáticos activos', launch: 'Disponible' },
  { icon: '✉️', iconClass: 'icon-nl', name: 'Newsletter', desc: 'Una vez por mes', launch: 'Disponible' },
  { icon: '📸', iconClass: 'icon-ig', name: 'Instagram', desc: '@nomaduy — vida en Uruguay', launch: 'Disponible' },
  { icon: '✈️', iconClass: 'icon-tg', name: 'Telegram', desc: 'Canal de novedades', launch: 'Próximamente' },
  { icon: '🖥', iconClass: 'icon-forum', name: 'Foro', desc: 'Preguntas & respuestas', launch: 'Próximamente' },
]

export default function PlatformsSection() {
  return (
    <section className="platforms-section">
      <div className="platforms-header">
        <div className="section-eyebrow">📡 Dónde estamos</div>
        <h2>Elegí cómo conectarte</h2>
        <p>Estamos donde estás vos — sin forzarte a usar una plataforma que no usás.</p>
      </div>
      <div className="platforms-grid">
        {platforms.map((p) => (
          <a key={p.name} href="#" className="platform-card">
            <div className={`platform-icon ${p.iconClass}`}>{p.icon}</div>
            <div className="platform-info">
              <h4>{p.name}</h4>
              <p>{p.desc}</p>
            </div>
            <span className="platform-launch">{p.launch}</span>
          </a>
        ))}
      </div>
    </section>
  )
}
