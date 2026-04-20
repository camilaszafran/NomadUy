import JoinForm from './JoinForm'

export default function ComunidadHero() {
  return (
    <section className="comunidad-hero">
      <div className="page-eyebrow">Comunidad</div>
      <div className="comunidad-hero-grid">
        <div>
          <h1>Una comunidad de <em>personas reales</em> haciendo vida en Uruguay.</h1>
          <p>No somos un foro de turismo. Somos expats, nómadas e inmigrantes que eligieron quedarse — y queremos que tu llegada sea más fácil que la nuestra.</p>
        </div>
        <JoinForm />
      </div>
    </section>
  )
}
