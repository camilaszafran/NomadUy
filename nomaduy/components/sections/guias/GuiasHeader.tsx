import { getTranslations } from 'next-intl/server'
import PageSubtitle from '@/components/ui/PageSubtitle'

export default async function GuiasHeader() {
  const t = await getTranslations('guias')

  return (
    <header className="page-header guias-header-photo">
      <div className="page-header-inner">
        <div className="page-label">{t('label')}</div>
        <h1>Todo lo que necesitás<br />saber para vivir acá.</h1>
        <PageSubtitle>Desde el primer día hasta los trámites de residencia — guías claras, prácticas y escritas por gente que lo vivió.</PageSubtitle>
      </div>
    </header>
  )
}
