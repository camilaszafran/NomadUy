export default function PdfBanner() {
  return (
    <section className="pdf-banner" id="pdf">
      <div className="pdf-banner-text">
        <h2>Descargá la guía gratis 📄</h2>
        <p>
          &ldquo;Tus primeros 30 días en Uruguay&rdquo; — todo lo que necesitás saber antes y después de llegar, en un PDF que podés llevar con vos.
        </p>
      </div>
      <div>
        <div className="pdf-banner-form">
          <input type="email" placeholder="tu@email.com" />
          <button>Descargar gratis →</button>
        </div>
        <div className="pdf-banner-note">Sin spam. Solo la guía. Prometido.</div>
      </div>
    </section>
  )
}
