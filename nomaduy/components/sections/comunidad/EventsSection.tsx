import type { CalendarEvent } from '@/lib/calendar'

function formatDate(dateStr: string): { day: string; month: string } {
  const d = new Date(dateStr)
  return {
    day: d.getDate().toString(),
    month: d.toLocaleString('es-UY', { month: 'short' }).toUpperCase(),
  }
}

function formatTime(dateStr: string): string | null {
  if (!dateStr.includes('T')) return null
  return new Date(dateStr).toLocaleTimeString('es-UY', { hour: '2-digit', minute: '2-digit' })
}

interface EventsSectionProps {
  events: CalendarEvent[]
  calendarUrl: string
}

export default function EventsSection({ events, calendarUrl }: EventsSectionProps) {
  return (
    <section className="events-section" id="eventos">
      <div className="events-inner">
        <div className="events-text">
          <h2>Eventos que crean comunidad real.</h2>
          <p>Nos juntamos en persona todos los meses. El primer jueves de cada mes en Montevideo — venues rotativos, siempre con buena onda.</p>
          <a href={calendarUrl} target="_blank" rel="noopener noreferrer" className="btn-white">
            Ver todo el calendario →
          </a>
        </div>
        <div className="events-list">
          {events.length === 0 && (
            <p style={{ color: 'var(--ink-60)', fontSize: '0.9rem' }}>No hay eventos próximos cargados todavía.</p>
          )}
          {events.map((e) => {
            const { day, month } = formatDate(e.start)
            const time = formatTime(e.start)
            return (
              <a key={e.id} href={e.htmlLink} target="_blank" rel="noopener noreferrer"
                 className="event-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                <div className="event-date">
                  <span className="day">{day}</span>
                  <span className="month">{month}</span>
                </div>
                <div className="event-info">
                  <h4>{e.title}</h4>
                  <p>{[e.location, time].filter(Boolean).join(' · ')}</p>
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
