import Link from 'next/link'
import {
  AirplaneTakeoff, Scales, MapPin, Bus, FirstAid,
  Bank, Laptop, UsersThree, ChatTeardropText,
} from '@phosphor-icons/react/dist/ssr'

const guides = [
  {
    Icon: AirplaneTakeoff,
    title: 'Primeras 48 horas',
    tags: ['15 min', 'Llegada'],
    desc: 'La guía esencial al aterrizar: SIM, efectivo, apps, transporte y los primeros pasos en orden de prioridad.',
    status: 'ready', href: '/guias/primeras-48h',
  },
  {
    Icon: Scales,
    title: 'Legal & Visas',
    tags: ['Trámites'],
    desc: 'Cédula de identidad, permiso de nómada digital, residencia fiscal — en lenguaje claro, sin abogado.',
    status: 'progress', href: null,
  },
  {
    Icon: MapPin,
    title: 'Barrios de Montevideo',
    tags: ['Vivienda'],
    desc: 'Pocitos, Palermo, Ciudad Vieja, Cordón… qué esperar de cada barrio, precios y para quién sirve.',
    status: 'soon', href: null,
  },
  {
    Icon: Bus,
    title: 'Moverse en Uruguay',
    tags: ['Transporte'],
    desc: 'STM, Uber, alquiler de auto, viajes entre ciudades — todo lo que necesitás para moverte dentro del país.',
    status: 'soon', href: null,
  },
  {
    Icon: FirstAid,
    title: 'Salud & Mutualistas',
    tags: ['Salud'],
    desc: 'Cómo funciona el sistema de salud uruguayo, cómo elegir una mutualista y qué cubre cada plan.',
    status: 'soon', href: null,
  },
  {
    Icon: Bank,
    title: 'Bancos & Finanzas',
    tags: ['Finanzas'],
    desc: 'Cómo abrir una cuenta, recibir pagos internacionales, cambio de divisas y qué es Prex.',
    status: 'soon', href: null,
  },
  {
    Icon: Laptop,
    title: 'Trabajar desde Uruguay',
    tags: ['Trabajo'],
    desc: 'Régimen fiscal para extranjeros, facturación en USD, internet y coworkings — todo para trabajar remoto con tranquilidad.',
    status: 'soon', href: null,
  },
  {
    Icon: UsersThree,
    title: 'Vivir con familia',
    tags: ['Familia'],
    desc: 'Colegios, jardines, seguridad, barrios familiares y todo lo que necesitás saber si venís con chicos.',
    status: 'soon', href: null,
  },
  {
    Icon: ChatTeardropText,
    title: 'Español rioplatense',
    tags: ['Idioma'],
    desc: 'Vos, che, ta, bah — el mini diccionario para entender a los uruguayos, y dónde tomar clases.',
    status: 'soon', href: null,
  },
]

const statusConfig = {
  ready:    { label: 'Disponible',    className: 'ready' },
  progress: { label: 'En proceso',   className: 'progress' },
  soon:     { label: 'Próximamente', className: 'soon' },
}

export default function GuiasGrid() {
  return (
    <main className="main-wrap">
      <Link href="/guias/primeras-48h" className="featured-guide">
        <div className="featured-guide-inner">
          <div className="featured-body">
            <div className="featured-eyebrow">Guía destacada</div>
            <h2>Tus primeras 48 horas en Uruguay</h2>
            <p>18 pasos ordenados por prioridad — SIM, efectivo, apps y los primeros lugares. La guía que hubiésemos querido tener al aterrizar.</p>
            <span className="featured-cta">Leer guía completa →</span>
          </div>
          <div className="featured-visual">
            <AirplaneTakeoff size={64} weight="thin" color="var(--blue)" />
          </div>
        </div>
      </Link>

      <div className="section-intro">
        <h2>Todas las guías</h2>
        <p>Hacemos las guías una por una para que sean realmente útiles — no una lista de links.</p>
      </div>

      <div className="guide-grid">
        {guides.map(({ Icon, title, tags, desc, status, href }) => {
          const s = statusConfig[status as keyof typeof statusConfig]
          const inner = (
            <>
              <div className="guide-icon">
                <Icon size={28} weight="light" color="var(--blue)" />
              </div>
              <h3>{title}</h3>
              <div className="guide-meta">
                {tags.map(t => <span key={t} className="meta-tag">{t}</span>)}
              </div>
              <p>{desc}</p>
              <div className="guide-card-footer">
                <span className={`guide-status ${s.className}`}>{s.label}</span>
                {href && <span className="guide-arrow">→</span>}
              </div>
            </>
          )
          return href
            ? <Link key={title} href={href} className="guide-card">{inner}</Link>
            : <div key={title} className="guide-card coming-soon">{inner}</div>
        })}
      </div>

      <div className="help-strip">
        <p><strong>¿Buscás algo que no está acá?</strong> La comunidad tiene respuestas para casi cualquier pregunta sobre vivir en Uruguay.</p>
        <Link href="/comunidad" className="help-link">Preguntar en la comunidad →</Link>
      </div>
    </main>
  )
}
