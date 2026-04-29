import { getTranslations } from 'next-intl/server'
import PageSubtitle from '@/components/ui/PageSubtitle'

export default async function ConocerHero() {
  const t = await getTranslations('conocer')

  return (
    <header className="page-header page-header-blue">
      <div className="page-header-inner">
        <div className="page-label">{t('label')}</div>
        <h1>{t.rich('hero_heading', { br: () => <br /> })}</h1>
        <PageSubtitle>{t('hero_subtitle')}</PageSubtitle>
      </div>
    </header>
  )
}
