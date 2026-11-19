import Image from 'next/image'
import Link from 'next/link'
import { getTranslations, getLocale } from 'next-intl/server'
import AnimateIn from '@/components/ui/AnimateIn'
import { linkTarget } from '@/lib/link-target'

export default async function PdfBanner() {
  const [t, locale] = await Promise.all([getTranslations('home.pdf_banner'), getLocale()])

  const href = `/guides/guia-${locale === 'en' || locale === 'pt' ? locale : 'es'}.pdf`
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
          <Link href={href} {...linkTarget(href)}>{t('cta')}</Link>
        </div>
        <div className="pdf-banner-note">{t('note')}</div>
      </AnimateIn>
    </section>
  )
}
