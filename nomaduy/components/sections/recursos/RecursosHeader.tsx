import { getTranslations } from 'next-intl/server'
import PageSubtitle from '@/components/ui/PageSubtitle'

export default async function RecursosHeader() {
  const t = await getTranslations('recursos')

  return (
    <header className="page-header page-header-blue">
      <div className="page-header-inner">
        <div className="page-label">{t('label')}</div>
        <h1>{t.rich('heading', { br: () => <br /> })}</h1>
        <PageSubtitle>{t('subtitle')}</PageSubtitle>
      </div>
    </header>
  )
}
