const events = [
  { day: '1', month: 'MAY', title: 'Meetup mensual NomadUY', desc: 'Bar Bacacay · Palermo · 19:00 hs' },
  { day: '15', month: 'MAY', title: 'Running grupal — Rambla', desc: 'Punto de encuentro: Pocitos · 7:30 hs' },
  { day: '22', month: 'MAY', title: 'Language exchange', desc: 'Café Brasilero · Ciudad Vieja · 18:30 hs' },
]

export default function EventsSection() {
  return (
    <section className="events-section">
      <div className="events-inner">
        <div className="events-text">
          <h2>Eventos que crean comunidad real.</h2>
          <p>Nos juntamos en persona todos los meses. El primer jueves de cada mes en Montevideo — venues rotativos, siempre con buena onda.</p>
          <a href="#unirme" className="btn-white">Ver todos los eventos →</a>
        </div>
        <div className="events-list">
          {events.map((e) => (
            <div key={e.title} className="event-item">
              <div className="event-date">
                <span className="day">{e.day}</span>
                <span className="month">{e.month}</span>
              </div>
              <div className="event-info">
                <h4>{e.title}</h4>
                <p>{e.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
