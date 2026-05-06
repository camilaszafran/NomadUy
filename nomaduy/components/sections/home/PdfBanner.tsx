import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import AnimateIn from '@/components/ui/AnimateIn'
import { localizeHref } from '@/lib/locale'

export default async function PdfBanner() {
  const [t, locale] = await Promise.all([getTranslations('home.pdf_banner'), getLocale()])

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
          <Link href={localizeHref('/comunidad', locale)}>{t('cta')}</Link>
        </div>
        <div className="pdf-banner-note">{t('note')}</div>
      </AnimateIn>
    </section>
  )
}
