import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Consulates from '@/components/sections/arrival/Consulates'
import { arrivalLocale, officialArrival as links } from '@/lib/arrival-links'
import { linkTarget } from '@/lib/link-target'
import { localizeHref } from '@/lib/locale'

const copy = {
  es: {
    title: 'Necesito ayuda',
    intro: 'Encontrá a quién llamar y qué hacer si tenés un problema en Uruguay.',
    consular: 'Consulados y embajadas de otros países en Uruguay',
    lookup: 'Buscá por país para abrir su ficha consular. Si perdiste el pasaporte, consultá por un documento de emergencia y preguntá si te piden una denuncia policial. La oficina que atiende Uruguay puede estar en otro país.',
    embassy: 'Ver embajadas y representaciones extranjeras',
    next: 'Ver la guía de llegada',
    checked: 'Fuentes oficiales consultadas el 18 de noviembre de 2026.',
    cards: [
      ['Emergencia · 911', 'Llamá si hay peligro inmediato, un delito en curso o una emergencia médica.', 'Llamar al 911', 'Información oficial del 911'],
      ['Línea Vida', 'Apoyo gratuito y confidencial ante una crisis emocional o pensamientos suicidas, las 24 horas.', 'Llamar al *0767', 'Información del Ministerio de Salud Pública'],
      ['Apoyo a migrantes', 'El MIDES orienta sobre documentación, acceso a servicios y programas sociales. Consultá también cómo acceder al apoyo desde tu departamento.', 'Centro de Referencia del MIDES', 'Atención a migrantes y solicitantes de refugio'],
      ['Robo o estafa', 'Si te robaron el celular o la billetera, bloqueá la línea y las tarjetas con tus proveedores. Guardá comprobantes y mensajes para denunciar. Para reclamos comerciales, consultá Defensa del Consumidor.', 'Canales de denuncia', 'Defensa del Consumidor'],
      ['Violencia, discriminación o problemas laborales', 'Consultá los canales oficiales según lo que pasó. Si hay peligro inmediato, llamá al 911.', 'Violencia doméstica y de género', 'Orientación ante vulneración de derechos', 'Asesoramiento laboral del MTSS'],
    ],
  },
  en: {
    title: 'I need help',
    intro: 'Find out who to call and what to do if something goes wrong in Uruguay.',
    consular: 'Foreign consulates and embassies in Uruguay',
    lookup: 'Search by country to open the official consular listing. If you lost your passport, ask about an emergency travel document and whether you need a police report. The office responsible for Uruguay may be based abroad.',
    embassy: 'Browse foreign embassies and missions',
    next: 'See the arrival guide',
    checked: 'Official sources checked on November 18, 2026.',
    cards: [
      ['Emergency · 911', 'Call if there is immediate danger, a crime in progress or a medical emergency.', 'Call 911', 'Official 911 information'],
      ['Línea Vida', 'Free, confidential, 24-hour support if you are in emotional crisis or having suicidal thoughts.', 'Call *0767', 'Ministry of Public Health information'],
      ['Support for migrants', 'MIDES provides guidance on documents, services and social programs. Check how to access support in your department.', 'MIDES Migrant Reference Centre', 'Support for migrants and asylum seekers'],
      ['Theft or scams', 'If your phone or wallet was stolen, contact your providers to block your SIM and cards. Save receipts and messages for your report. For disputes with businesses, contact Consumer Protection.', 'How to report a crime', 'Consumer Protection'],
      ['Abuse, discrimination or workplace problems', 'Find the relevant official service. If there is immediate danger, call 911.', 'Domestic and gender-based violence', 'Help with rights violations', 'Employment advice from MTSS'],
    ],
  },
  pt: {
    title: 'Preciso de ajuda',
    intro: 'Descubra para quem ligar e o que fazer se tiver um problema no Uruguai.',
    consular: 'Consulados e embaixadas estrangeiras no Uruguai',
    lookup: 'Busque pelo país para abrir a ficha consular oficial. Se perdeu seu passaporte, pergunte sobre um documento de emergência e se precisa registrar um boletim de ocorrência. O posto responsável pelo Uruguai pode ficar em outro país.',
    embassy: 'Ver embaixadas e representações estrangeiras',
    next: 'Ver o guia de chegada',
    checked: 'Fontes oficiais consultadas em 18 de novembro de 2026.',
    cards: [
      ['Emergência · 911', 'Ligue em caso de perigo imediato, crime em andamento ou emergência médica.', 'Ligar para 911', 'Informações oficiais sobre o 911'],
      ['Línea Vida', 'Apoio gratuito e confidencial, 24 horas por dia, em crises emocionais ou diante de pensamentos suicidas.', 'Ligar para *0767', 'Informações do Ministério da Saúde Pública'],
      ['Apoio a migrantes', 'O MIDES orienta sobre documentos, serviços e programas sociais. Veja como receber atendimento no seu departamento.', 'Centro de Referência do MIDES', 'Atendimento para migrantes e solicitantes de refúgio'],
      ['Roubo ou golpe', 'Se roubaram seu celular ou carteira, fale com as empresas para bloquear a linha e os cartões. Guarde comprovantes e mensagens. Para problemas com fornecedores, procure a Defesa do Consumidor.', 'Canais de denúncia', 'Defesa do Consumidor'],
      ['Violência, discriminação ou problemas no trabalho', 'Consulte o canal oficial para sua situação. Em caso de perigo imediato, ligue para 911.', 'Violência doméstica e de gênero', 'Apoio em caso de violação de direitos', 'Orientação trabalhista do MTSS'],
    ],
  },
}

const destinations = [
  ['tel:911', links.emergency],
  [links.lifePhone, links.life],
  [links.migrants, links.migrantNetwork],
  [links.report, links.consumer],
  [links.violence, links.rights, links.labor],
]
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { title, intro } = copy[arrivalLocale((await params).locale)]
  return { title: title + ' — NomadUY', description: intro }
}

export default async function HelpPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = copy[arrivalLocale(locale)]

  return <>
    <Nav />
    <header className="page-header page-header-blue">
      <div className="page-header-inner"><h1>{t.title}</h1><p>{t.intro}</p></div>
    </header>
    <main className="main-wrap arrival-wrap">
      <div className="arrival-grid">
        {t.cards.map(([title, description, ...labels], index) => (
          <section className={index === 0 ? 'arrival-card arrival-emergency' : 'arrival-card'} key={title}>
            <h2>{title}</h2><p>{description}</p>
            <ul>{destinations[index].map((href, i) => <li key={href}><a href={href} {...linkTarget(href)}>{labels[i]}</a></li>)}</ul>
          </section>
        ))}
      </div>
      <section className="arrival-card" id="consulados">
        <h2>{t.consular}</h2><p>{t.lookup}</p>
        <Consulates locale={locale} />
        <a href={links.embassies} {...linkTarget(links.embassies)}>{t.embassy} ↗</a>
      </section>
      <p><a href={localizeHref('/llegada', locale)}>{t.next} →</a></p>
      <p className="arrival-checked">{t.checked}</p>
    </main>
    <Footer />
  </>
}
