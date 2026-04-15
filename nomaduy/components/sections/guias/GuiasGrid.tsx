import Link from 'next/link'

const guides = [
  {
    icon: '🛬', title: 'Primeras 48 horas', tags: ['⏱ 15 min de lectura', '🗺 Llegada'],
    desc: 'La guía esencial al aterrizar: SIM, efectivo, apps, transporte y los primeros pasos en orden de prioridad.',
    status: 'ready', href: '/guias/primeras-48h',
  },
  {
    icon: '🏛', title: 'Legal & Visas', tags: ['🏛 Trámites'],
    desc: 'Cédula de identidad, permiso de nómada digital, residencia fiscal — en lenguaje claro, sin abogado.',
    status: 'progress', href: null,
  },
  {
    icon: '🏘', title: 'Barrios de Montevideo', tags: ['🏠 Vivienda'],
    desc: 'Pocitos, Palermo, Ciudad Vieja, Cordón… qué esperar de cada barrio, precios y para quién sirve.',
    status: 'soon', href: null,
  },
  {
    icon: '🚌', title: 'Moverse en Uruguay', tags: ['🚌 Transporte'],
    desc: 'STM, Uber, alquiler de auto, viajes entre ciudades — todo lo que necesitás para moverte dentro del país.',
    status: 'soon', href: null,
  },
  {
    icon: '🏥', title: 'Salud & Mutualistas', tags: ['🏥 Salud'],
    desc: 'Cómo funciona el sistema de salud uruguayo, cómo elegir una mutualista y qué cubre cada plan.',
    status: 'soon', href: null,
  },
  {
    icon: '🏦', title: 'Bancos & Finanzas', tags: ['💳 Finanzas'],
    desc: 'Cómo abrir una cuenta, recibir pagos internacionales, cambio de divisas y qué es Prex.',
    status: 'soon', href: null,
  },
  {
    icon: '💼', title: 'Trabajar desde Uruguay', tags: ['💼 Trabajo'],
    desc: 'Régimen fiscal para extranjeros, facturación en USD, internet y coworkings — todo para trabajar remoto con tranquilidad.',
    status: 'soon', href: null,
  },
  {
    icon: '👨‍👩‍👧', title: 'Vivir con familia', tags: ['👨‍👩‍👧 Familia'],
    desc: 'Colegios, jardines, seguridad, barrios familiares y todo lo que necesitás saber si venís con chicos.',
    status: 'soon', href: null,
  },
  {
    icon: '🗣', title: 'Español rioplatense', tags: ['🌐 Idioma'],
    desc: 'Vos, che, ta, bah — el mini diccionario para entender a los uruguayos, y dónde tomar clases.',
    status: 'soon', href: null,
  },
]

const statusConfig = {
  ready: { label: '✅ Disponible', className: 'ready' },
  progress: { label: '🚧 En proceso', className: 'progress' },
  soon: { label: '🔜 Próximamente', className: 'soon' },
}

export default function GuiasGrid() {
  return (
    <main className="main-wrap">
      <Link href="/guias/primeras-48h" className="featured-guide">
        <div className="featured-guide-inner">
          <div className="featured-body">
            <div className="featured-eyebrow">✅ Lista · Más leída</div>
            <h2>Primeras 48 horas en Uruguay</h2>
            <p>18 pasos ordenados por prioridad: SIM card, efectivo, transporte, apps esenciales y los primeros lugares a conocer. La guía que hubiésemos querido tener al aterrizar.</p>
            <span className="featured-cta">Leer guía completa →</span>
          </div>
          <div className="featured-visual">🛬</div>
        </div>
      </Link>

      <div className="section-intro">
        <h2>Todas las guías</h2>
        <p>Hacemos las guías una por una para que sean realmente útiles — no una lista de links.</p>
      </div>

      <div className="guide-grid">
        {guides.map((g) => {
          const { label, className } = statusConfig[g.status as keyof typeof statusConfig]
          const inner = (
            <>
              <div className="guide-icon">{g.icon}</div>
              <h3>{g.title}</h3>
              <div className="guide-meta">
                {g.tags.map((t) => <span key={t} className="meta-tag">{t}</span>)}
              </div>
              <p>{g.desc}</p>
              <div className="guide-card-footer">
                <span className={`guide-status ${className}`}>{label}</span>
                {g.href && <span className="guide-arrow">→</span>}
              </div>
            </>
          )
          return g.href
            ? <Link key={g.title} href={g.href} className="guide-card">{inner}</Link>
            : <div key={g.title} className="guide-card coming-soon">{inner}</div>
        })}
      </div>

      <div className="help-strip">
        <p><strong>¿Buscás algo que no está acá?</strong> La comunidad de NomadUY tiene respuestas para casi cualquier pregunta sobre vivir en Uruguay.</p>
        <Link href="/comunidad" className="help-link">💬 Preguntar en la comunidad →</Link>
      </div>
    </main>
  )
}
