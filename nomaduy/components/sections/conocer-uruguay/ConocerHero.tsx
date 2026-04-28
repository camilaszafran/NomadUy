import { getTranslations } from 'next-intl/server'
import PageSubtitle from '@/components/ui/PageSubtitle'

export default async function ConocerHero() {
  const t = await getTranslations('conocer')

  return (
    <header className="page-header page-header-blue">
      <div className="page-header-inner">
        <div className="page-label">{t('label')}</div>
        <h1>Uruguay en rutas.<br />No en itinerarios de turista.</h1>
        <PageSubtitle>
          Rutas diseñadas por gente que vive acá — para fines de semana,
          vacaciones cortas y salidas desde Montevideo.
        </PageSubtitle>
      </div>
    </header>
  )
}
