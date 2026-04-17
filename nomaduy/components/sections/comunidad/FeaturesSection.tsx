'use client'

import {
  ChatTeardropText,
  CalendarBlank,
  ChatCircle,
  MapTrifold,
  DownloadSimple,
  EnvelopeSimple,
} from '@phosphor-icons/react'
import type { Icon } from '@phosphor-icons/react'

const features: {
  Icon: Icon
  badge: string
  badgeClass: string
  title: string
  desc: string
  items: string[]
}[] = [
  {
    Icon: ChatTeardropText,
    badge: 'Gratis',
    badgeClass: 'badge-free',
    title: 'Grupos de WhatsApp',
    desc: 'Acceso inmediato a grupos temáticos: housing, trabajo, legal, actividades sociales y newcomers.',
    items: ['Grupo general de newcomers', 'Housing & alojamiento', 'Trabajo remoto & freelance', 'Legal & trámites'],
  },
  {
    Icon: CalendarBlank,
    badge: 'Mensual',
    badgeClass: 'badge-blue',
    title: 'Eventos presenciales',
    desc: 'Primer jueves de cada mes en Montevideo. El evento que construye comunidad real.',
    items: ['Primer jueves de cada mes', 'Venues rotativos en Pocitos y Palermo', 'Promedio 40–60 personas', 'Networking + drinks + buena onda'],
  },
  {
    Icon: ChatCircle,
    badge: 'Comunidad',
    badgeClass: 'badge-green',
    title: 'Foro de preguntas',
    desc: 'Un espacio para hacer preguntas y compartir experiencias sobre vivir en Uruguay.',
    items: ['Preguntas sobre trámites y burocracia', 'Recomendaciones de barrios y vivienda', 'Tips de la vida cotidiana', 'Búsqueda de compañeros de depto'],
  },
  {
    Icon: MapTrifold,
    badge: 'Próximamente',
    badgeClass: 'badge-gold',
    title: 'Mapa de miembros',
    desc: 'Un mapa interactivo con la comunidad NomadUY en Uruguay y el mundo.',
    items: ['Ver quién está cerca de vos', 'Conectar antes de llegar', 'Grupos por ciudad', 'Mapa de coworkings y cafés'],
  },
  {
    Icon: DownloadSimple,
    badge: 'Gratis',
    badgeClass: 'badge-free',
    title: 'Guía PDF de bienvenida',
    desc: 'La guía "Tus primeras 48 horas en Uruguay" — para descargar y usar sin internet.',
    items: ['18 pasos ordenados por prioridad', 'Funciona sin conexión', 'Actualizada cada trimestre', 'En español e inglés'],
  },
  {
    Icon: EnvelopeSimple,
    badge: 'Newsletter',
    badgeClass: 'badge-blue',
    title: 'Newsletter mensual',
    desc: 'Una vez al mes: novedades legales, eventos de la comunidad, nuevas guías y recursos.',
    items: ['Sin spam — una vez al mes', 'Cambios en leyes y trámites', 'Nuevos coworkings y cafés', 'Historias de la comunidad'],
  },
]

export default function FeaturesSection() {
  return (
    <section className="features-section">
      <div className="features-section-header">
        <div className="section-eyebrow">Lo que incluye</div>
        <h2>Todo lo que viene con unirte</h2>
        <p>Gratis para siempre. Premium más adelante para quien quiera más.</p>
      </div>
      <div className="features-grid">
        {features.map((f) => (
          <div key={f.title} className="feature-card">
            <span className="feature-card-icon"><f.Icon size={28} weight="thin" /></span>
            <span className={`feature-card-badge ${f.badgeClass}`}>{f.badge}</span>
            <h3>{f.title}</h3>
            <p>{f.desc}</p>
            <ul className="feature-list">
              {f.items.map((item) => <li key={item}>{item}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
