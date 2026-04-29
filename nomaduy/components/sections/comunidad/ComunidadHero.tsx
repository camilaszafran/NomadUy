import { getTranslations } from 'next-intl/server'
import JoinForm from './JoinForm'

export default async function ComunidadHero() {
  const t = await getTranslations('comunidad')

  return (
    <section className="comunidad-hero">
      <div className="page-eyebrow">{t('hero_eyebrow')}</div>
      <div className="comunidad-hero-grid">
        <div>
          <h1>{t.rich('hero_heading', { em: (chunks) => <em>{chunks}</em> })}</h1>
          <p>{t('hero_desc')}</p>
        </div>
        <JoinForm />
      </div>
    </section>
  )
}
