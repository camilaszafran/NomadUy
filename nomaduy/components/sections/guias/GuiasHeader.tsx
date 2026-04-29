import { getTranslations } from 'next-intl/server'
import PageSubtitle from '@/components/ui/PageSubtitle'

export default async function GuiasHeader() {
  const t = await getTranslations('guias')

  return (
    <header className="page-header guias-header-photo">
      <div className="page-header-inner">
        <div className="page-label">{t('label')}</div>
        <h1>{t('title')}</h1>
        <PageSubtitle>{t('subtitle')}</PageSubtitle>
      </div>
    </header>
  )
}
