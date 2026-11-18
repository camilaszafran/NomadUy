import { setRequestLocale } from 'next-intl/server'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import { arrivalLocale, officialArrival as links } from '@/lib/arrival-links'
import { linkTarget } from '@/lib/link-target'
import { localizeHref } from '@/lib/locale'

const destinations = [
  [links.relocation, links.pets, links.customs],
  ['/guias/primeras-48h', '/explora#apps-transporte', '/vivir#alojamiento'],
  ['/guias/legal-visas', links.guarantee, links.education, links.labor, '/recursos#emprender', '/guias/salud-mutualistas', 'https://tramites.montevideo.gub.uy/node/62633', '/comunidad#recomendar'],
]

const copy = {
  es: {
    title: 'Recién llegué',
    intro: 'Una lista para preparar tu mudanza y resolver lo esencial durante tu primer mes en Uruguay.',
    help: 'Necesito ayuda',
    phases: [
      ['Antes de viajar', 'Confirmá qué documentos necesitás y si requieren apostilla o traducción. Si viajás con una mascota o vas a traer una mudanza, consultá los requisitos de ingreso. Reservá cómo vas a llegar a tu alojamiento si aterrizás de noche.', 'Requisitos para venir a vivir a Uruguay', 'Ingreso de mascotas', 'Aduanas y equipaje'],
      ['Primeras 48 horas', 'Conseguí conexión, ubicá una farmacia y un centro de salud cercanos y resolvé cómo moverte. Compará los requisitos de una tarjeta prepaga y de una cuenta bancaria según lo que necesites.', 'Checklist: chip, eSIM y tarjetas', 'Transporte, taxis y alquiler de autos', 'Alojamiento temporal'],
      ['Primer mes', 'Revisá los trámites de residencia y cómo acceder a atención de salud. Si vas a alquilar, preguntá por la garantía y quién da de alta la luz, el agua e internet. Para el trabajo, confirmá si tu profesión requiere revalidar estudios o habilitar el título. Consultá cómo inscribir a tus hijos. Si vas a manejar y tenés libreta extranjera, preguntá en tu intendencia qué condiciones aplican.', 'Residencia y visas', 'Garantía de alquiler', 'Inscripción educativa y reválidas', 'Consultas laborales', 'Apoyo para emprender', 'Salud, ASSE y mutualistas', 'Canje de libreta en Montevideo', 'Recomendar un servicio a la comunidad'],
    ],
  },
  en: {
    title: 'Just arrived',
    intro: 'A checklist for planning your move and getting settled during your first month in Uruguay.',
    help: 'I need help',
    phases: [
      ['Before you travel', 'Check which documents you need and whether they require apostilles or translations. If you are bringing a pet or shipping household goods, check the entry rules. Book a ride to your accommodation if you arrive late at night.', 'Requirements for moving to Uruguay', 'Bringing a pet', 'Customs and luggage'],
      ['First 48 hours', 'Get connected, locate a nearby pharmacy and health centre, and arrange transport. Compare the requirements for a prepaid card and a bank account based on your needs.', 'Checklist: SIM, eSIM and prepaid cards', 'Transport, taxis and car rentals', 'Temporary accommodation'],
      ['First month', 'Check residency paperwork and access to healthcare. If you are renting, ask about rental guarantees and who sets up electricity, water and internet. Check whether your job requires recognition of qualifications or a licence. If you have children, check how to enrol them in school. If you have a foreign driving licence, check the rules with your department before driving.', 'Residency and visas', 'Rental guarantees', 'School enrolment and recognition of studies', 'Employment advice', 'Support for entrepreneurs', 'Healthcare and ASSE', 'Exchange a driving licence in Montevideo', 'Recommend a service to the community'],
    ],
  },
  pt: {
    title: 'Acabei de chegar',
    intro: 'Uma lista para preparar a mudança e resolver o essencial durante seu primeiro mês no Uruguai.',
    help: 'Preciso de ajuda',
    phases: [
      ['Antes de viajar', 'Confira os documentos necessários e se precisam de apostila ou tradução. Se for levar um animal de estimação ou enviar a mudança, consulte as regras de entrada. Reserve o transporte para a hospedagem se chegar tarde da noite.', 'Requisitos para morar no Uruguai', 'Entrada de animais de estimação', 'Alfândega e bagagem'],
      ['Primeiras 48 horas', 'Garanta uma conexão, localize uma farmácia e um centro de saúde próximos e veja como se locomover. Compare os requisitos para obter um cartão pré-pago ou abrir uma conta bancária.', 'Checklist: chip, eSIM e cartões', 'Transporte, táxis e aluguel de carros', 'Hospedagem temporária'],
      ['Primeiro mês', 'Confira os trâmites de residência e como acessar serviços de saúde. Se for alugar, pergunte pela garantia e quem ativa a água, a luz e a internet. Verifique se sua profissão exige a revalidação do diploma ou uma licença. Se tiver filhos, informe-se sobre a matrícula escolar. Se tiver carteira de motorista estrangeira, consulte as regras com a sua intendência antes de dirigir.', 'Residência e vistos', 'Garantia de aluguel', 'Matrícula escolar e revalidação de estudos', 'Orientação trabalhista', 'Apoio para empreender', 'Saúde, ASSE e mutualistas', 'Troca de carteira em Montevidéu', 'Recomendar um serviço à comunidade'],
    ],
  },
}
type Props = { params: Promise<{ locale: string }> }

export async function generateMetadata({ params }: Props) {
  const { title, intro } = copy[arrivalLocale((await params).locale)]
  return { title: title + ' — NomadUY', description: intro }
}

export default async function ArrivalPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = copy[arrivalLocale(locale)]

  return <>
    <Nav />
    <header className="page-header page-header-blue">
      <div className="page-header-inner"><h1>{t.title}</h1><p>{t.intro}</p></div>
    </header>
    <main className="main-wrap arrival-wrap">
      <p><a href={localizeHref('/ayuda', locale)}>{t.help} →</a></p>
      <div className="arrival-grid">
        {t.phases.map(([title, description, ...labels], index) => (
          <section className="arrival-card" key={title}>
            <h2>{title}</h2><p>{description}</p>
            <ul>{destinations[index].map((destination, i) => {
              const href = destination.startsWith('/') ? localizeHref(destination, locale) : destination
              return <li key={href}><a href={href} {...linkTarget(href)}>{labels[i]}</a></li>
            })}</ul>
          </section>
        ))}
      </div>
    </main>
    <Footer />
  </>
}
