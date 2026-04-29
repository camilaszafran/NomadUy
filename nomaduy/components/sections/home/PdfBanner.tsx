import Image from 'next/image'
import { getTranslations } from 'next-intl/server'
import AnimateIn from '@/components/ui/AnimateIn'

export default async function PdfBanner() {
  const t = await getTranslations('home.pdf_banner')

  return (
    <section className="pdf-banner pdf-banner-photo" id="pdf">
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
        <h2>{t('title')}</h2>
        <p>{t('desc')}</p>
      </AnimateIn>
      <AnimateIn direction="right" delay={0.1}>
        <div className="pdf-banner-form">
          <input type="email" placeholder={t('email_placeholder')} />
          <button>{t('cta')}</button>
        </div>
        <div className="pdf-banner-note">{t('note')}</div>
      </AnimateIn>
    </section>
  )
}
