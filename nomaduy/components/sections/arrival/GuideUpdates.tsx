import { arrivalLocale, officialArrival as links } from '@/lib/arrival-links'
import { linkTarget } from '@/lib/link-target'
import { localizeHref } from '@/lib/locale'

const destinations = [
  ['https://www.gub.uy/ministerio-interior/comunicacion/publicaciones/regimen-visas-admision'],
  [links.nomad, links.residence],
  [links.taxes, links.taxOptions],
]

const copy = {
  es: {
    title: 'Residencia y visas', summary: 'Requisitos de entrada, permiso para nómadas, residencia migratoria y residencia fiscal en Uruguay.',
    date: 'Fuentes oficiales consultadas el 18 de noviembre de 2026.',
    sections: [
      ['Entrada a Uruguay', 'Antes de viajar, verificá si necesitás visa según el país emisor y el tipo de pasaporte. Si la necesitás, consultá el trámite con el consulado uruguayo que te corresponde.', 'Requisitos de visa por país'],
      ['Permiso para nómadas y residencia migratoria', 'Si entrás como turista y trabajás a distancia para el exterior, consultá la Hoja de Identidad Provisoria para nómadas digitales. Para instalarte por más tiempo, Migración distingue residencias temporarias y permanentes según tu situación, con opciones para nacionales del Mercosur. Revisá los documentos y si requieren apostilla o traducción antes de iniciar.', 'Hoja de Identidad Provisoria', 'Opciones de residencia legal'],
      ['Residencia fiscal', 'La residencia fiscal se determina por los criterios de DGI. Una visa o residencia migratoria por sí sola no te otorga un beneficio tributario. La opción para nuevos residentes fiscales tiene requisitos y se aplica a determinadas rentas de capital del exterior. Si trabajás a distancia desde Uruguay, consultá cómo se grava tu sueldo o facturación por separado.', 'Criterios de residencia fiscal de DGI', 'Régimen para nuevos residentes fiscales'],
    ],
    health: 'Para afiliarte a ASSE, consultá los documentos vigentes. Si necesitás orientación mientras tramitás tu residencia, podés acudir al servicio de apoyo a migrantes.',
    healthLinks: ['Trámite de afiliación a ASSE', 'Apoyo a migrantes'],
    transport: 'Ver apps, taxis y alquiler de autos en Explorá',
  },
  en: {
    title: 'Residency and visas', summary: 'Entry requirements, the digital nomad permit, immigration residency and tax residency in Uruguay.',
    date: 'Official sources checked on November 18, 2026.',
    sections: [
      ['Entering Uruguay', 'Before you travel, check whether you need a visa based on your passport type and issuing country. If you need one, contact the Uruguayan consulate responsible for your application.', 'Visa requirements by country'],
      ['Digital nomads and immigration residency', 'If you enter as a tourist and work remotely for clients or an employer abroad, check the temporary ID procedure for digital nomads. To settle for longer, Uruguay offers temporary and permanent residence options, including options for Mercosur nationals. Check the required documents, apostilles and translations before applying.', 'Temporary ID for digital nomads', 'Immigration residency options'],
      ['Tax residency', 'Tax residency follows DGI criteria. A visa or immigration residency by itself does not grant a tax benefit. The option for new tax residents has eligibility requirements and applies to certain foreign capital income. If you work remotely from Uruguay, check separately how your salary or business income is taxed.', 'DGI tax residency criteria', 'Rules for new tax residents'],
    ],
    health: 'Check ASSE’s current enrolment requirements. The migrant support service can guide you while your immigration application is in progress.',
    healthLinks: ['ASSE enrolment requirements', 'Support for migrants'],
    transport: 'Find transport apps, taxis and car rentals in Explore',
  },
  pt: {
    title: 'Residência e vistos', summary: 'Requisitos de entrada, permissão para nômades, residência migratória e residência fiscal no Uruguai.',
    date: 'Fontes oficiais consultadas em 18 de novembro de 2026.',
    sections: [
      ['Entrada no Uruguai', 'Antes de viajar, confira se precisa de visto de acordo com o país emissor e o tipo de passaporte. Se precisar, procure o consulado uruguaio responsável pelo pedido.', 'Requisitos de visto por país'],
      ['Permissão para nômades e residência migratória', 'Se entrar como turista e trabalhar remotamente para o exterior, consulte o procedimento de identidade provisória para nômades digitais. Para ficar por mais tempo, há opções de residência temporária e permanente, inclusive para nacionais do Mercosul. Confira a documentação e as exigências de apostila e tradução antes de solicitar.', 'Identidade provisória para nômades digitais', 'Opções de residência legal'],
      ['Residência fiscal', 'A residência fiscal segue os critérios da DGI. O visto ou a residência migratória, por si só, não concede benefício fiscal. A opção para novos residentes fiscais tem requisitos e se aplica a determinados rendimentos de capital do exterior. Se trabalhar remotamente a partir do Uruguai, consulte separadamente a tributação do seu salário ou faturamento.', 'Critérios de residência fiscal da DGI', 'Regime para novos residentes fiscais'],
    ],
    health: 'Confira os requisitos atuais para se inscrever na ASSE. Se precisar de orientação enquanto solicita a residência, procure o serviço de apoio a migrantes.',
    healthLinks: ['Inscrição na ASSE', 'Apoio a migrantes'],
    transport: 'Veja aplicativos, táxis e aluguel de carros em Explore',
  },
}

export const guideUpdates = (locale: string) => copy[arrivalLocale(locale)]

export function UpdatedLegalGuide({ locale }: { locale: string }) {
  const t = guideUpdates(locale)
  return <>
    {t.sections.map(([title, description, ...labels], index) => (
      <section key={title}>
        <h2>{title}</h2><p>{description}</p>
        <ul>{destinations[index].map((href, i) => <li key={href}><a href={href} {...linkTarget(href)}>{labels[i]}</a></li>)}</ul>
      </section>
    ))}
    <p className="arrival-checked">{t.date}</p>
  </>
}

export function HealthSources({ locale }: { locale: string }) {
  const t = guideUpdates(locale)
  const asse = 'https://www.gub.uy/tramites/afiliacion-asse'
  return <aside className="arrival-card">
    <p>{t.health}</p>
    <ul>
      <li><a href={asse} {...linkTarget(asse)}>{t.healthLinks[0]}</a></li>
      <li><a href={localizeHref('/ayuda', locale)}>{t.healthLinks[1]}</a></li>
    </ul>
    <p className="arrival-checked">{t.date}</p>
  </aside>
}
