import Image from 'next/image'
import AnimateIn from '@/components/ui/AnimateIn'

export default function PdfBanner() {
  return (
    <section className="pdf-banner pdf-banner-photo" id="pdf">
      {/* Background photo */}
      <div className="pdf-banner-bg">
        <Image
          src="/images/pdf-banner.jpg"
          alt=""
          fill
          style={{ objectFit: 'cover' }}
          sizes="100vw"
        />
        <div className="pdf-banner-bg-overlay" />
      </div>

      <AnimateIn className="pdf-banner-text" direction="left">
        <h2>Descargá la guía gratis</h2>
        <p>
          &ldquo;Tus primeros 30 días en Uruguay&rdquo; — todo lo que necesitás saber antes y después de llegar, en un PDF que podés llevar con vos.
        </p>
      </AnimateIn>
      <AnimateIn direction="right" delay={0.1}>
        <div className="pdf-banner-form">
          <input type="email" placeholder="tu@email.com" />
          <button>Descargar gratis →</button>
        </div>
        <div className="pdf-banner-note">Sin spam. Solo la guía. Prometido.</div>
      </AnimateIn>
    </section>
  )
}
