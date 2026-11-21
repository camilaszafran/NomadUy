import { getTranslations, getLocale } from 'next-intl/server'
import { localizeHref } from '@/lib/locale'
import { nomadIdentity } from '@/lib/nomad-identity'
import { arrivalLocale } from '@/lib/arrival-links'


export default async function Footer() {
  const t = await getTranslations('footer')
  const locale = await getLocale()
  const identity = nomadIdentity[arrivalLocale(locale)]
  const year = new Date().getFullYear()

  return (
    <footer>
      <div className="footer-grid">
        <div className="footer-brand">
          <h3>Nomad<span>UY</span></h3>
          <p>{identity.description}</p>
        </div>

        <div className="footer-col">
          <h4>{t('site')}</h4>
          <ul>
            <li><a href={localizeHref('/sobre-nomad', locale)} target="_blank" rel="noopener noreferrer">{identity.title}</a></li>
            <li><a href="mailto:info@nomad.com.uy">info@nomad.com.uy</a></li>
            <li><a href={localizeHref('/guias', locale)}>{t('guias')}</a></li>
            <li><a href={localizeHref('/vivir', locale)}>{t('vivir')}</a></li>
            <li><a href={localizeHref('/conocer-uruguay', locale)}>{t('conocer')}</a></li>
            <li><a href={localizeHref('/recursos', locale)}>{t('recursos')}</a></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>{t('community')}</h4>
          <ul>
            <li><a href={localizeHref('/comunidad', locale)}>{t('unirme')}</a></li>
            <li><a href={localizeHref('/comunidad#galeria', locale)}>{t('galeria')}</a></li>
            <li><a href={localizeHref('/comunidad#eventos', locale)}>{t('eventos')}</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} NomadUY · {t('made_in')}</span>
      </div>
    </footer>
  )
}
