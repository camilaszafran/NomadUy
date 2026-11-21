import { siteOrigin, siteUrl } from '@/lib/seo'

export const editorialReviewed = '2026-11-21'
export const nomadIdentity = {
  es: {
    title: 'Sobre NomadUY', team: 'Equipo de NomadUY',
    description: 'NomadUY es una guía gratuita para quienes vienen a Uruguay, por un viaje, unos meses o para quedarse. Compartimos información práctica y buscamos generar comunidad.',
    mission: 'Una guía gratuita y una comunidad para tu llegada',
    scope: 'Reunimos guías de llegada, trámites, alojamiento, transporte, vida cotidiana y lugares para conocer en todo Uruguay. Podés explorar el contenido sin pagar ni crear una cuenta.',
    community: 'Queremos que llegar a Uruguay también sea una oportunidad para conocer gente. Encontrá actividades, talleres, coworks y propuestas de la comunidad, y compartí lugares y servicios que te hayan servido.',
    responsibility: 'Quién mantiene el sitio',
    responsibilityText: 'El Equipo de NomadUY mantiene esta guía. Para consultas, sugerencias o correcciones, escribinos a info@nomad.com.uy.',
    editorial: 'Cómo usar la información',
    editorialText: 'Las guías organizan información práctica y enlazan a fuentes oficiales y a los sitios de los servicios mencionados. Los requisitos, precios, horarios y disponibilidad pueden cambiar: confirmalos con el organismo o proveedor antes de viajar, iniciar un trámite o contratar. NomadUY no es un organismo público ni tramita residencias.',
    free: 'Consultar NomadUY es gratis. Los servicios de terceros enlazados pueden tener sus propios costos.',
    recommend: 'Recomendá algo a la comunidad', contact: 'Contactar al equipo',
  },
  en: {
    title: 'About NomadUY', team: 'NomadUY team',
    description: 'NomadUY is a free guide for people coming to Uruguay, whether for a trip, a few months or a permanent move. We share practical information and aim to build a community.',
    mission: 'A free guide and a community for your arrival',
    scope: 'We bring together guides to getting settled, paperwork, accommodation, transport, everyday life and places to explore across Uruguay. You can browse without paying or creating an account.',
    community: 'We want arriving in Uruguay to be an opportunity to meet people, too. Find activities, classes, coworking spaces and community suggestions, and share places and services you have found useful.',
    responsibility: 'Who maintains the site',
    responsibilityText: 'The NomadUY team maintains this guide. For questions, suggestions or corrections, email info@nomad.com.uy.',
    editorial: 'How to use the information',
    editorialText: 'Our guides organise practical information and link to official sources and the websites of listed services. Requirements, prices, opening times and availability can change: check with the authority or provider before travelling, applying or booking. NomadUY is not a government agency and does not process residency applications.',
    free: 'NomadUY is free to use. Linked third-party services may charge their own fees.',
    recommend: 'Share a recommendation with the community', contact: 'Contact the team',
  },
  pt: {
    title: 'Sobre o NomadUY', team: 'Equipe do NomadUY',
    description: 'O NomadUY é um guia gratuito para quem vem ao Uruguai, seja para viajar, passar alguns meses ou se mudar de vez. Compartilhamos informações práticas e queremos criar uma comunidade.',
    mission: 'Um guia gratuito e uma comunidade para sua chegada',
    scope: 'Reunimos guias de chegada, documentos, hospedagem, transporte, vida cotidiana e lugares para conhecer em todo o Uruguai. Você pode consultar o conteúdo sem pagar nem criar uma conta.',
    community: 'Queremos que chegar ao Uruguai também seja uma oportunidade de conhecer pessoas. Encontre atividades, oficinas, coworkings e sugestões da comunidade, e compartilhe lugares e serviços que foram úteis para você.',
    responsibility: 'Quem mantém o site',
    responsibilityText: 'A Equipe do NomadUY mantém este guia. Para dúvidas, sugestões ou correções, escreva para info@nomad.com.uy.',
    editorial: 'Como usar as informações',
    editorialText: 'Os guias organizam informações práticas e incluem links para fontes oficiais e sites dos serviços citados. Requisitos, preços, horários e disponibilidade podem mudar: confirme com o órgão ou prestador antes de viajar, iniciar um processo ou contratar. O NomadUY não é um órgão público nem realiza processos de residência.',
    free: 'Consultar o NomadUY é grátis. Os serviços de terceiros indicados podem ter seus próprios custos.',
    recommend: 'Compartilhe uma recomendação com a comunidade', contact: 'Fale com a equipe',
  },
} as const

export function organizationData(locale: 'es' | 'en' | 'pt') {
  return {
    '@type': 'Organization', '@id': siteOrigin + '/#organization', name: 'NomadUY',
    alternateName: 'Nomad UY', url: siteOrigin, email: 'info@nomad.com.uy',
    description: nomadIdentity[locale].description,
    sameAs: ['https://www.instagram.com/nomad_uruguay/'],
    contactPoint: { '@type': 'ContactPoint', contactType: 'editorial', email: 'info@nomad.com.uy', availableLanguage: ['Spanish', 'English', 'Portuguese'] },
  }
}

export function websiteData(locale: 'es' | 'en' | 'pt') {
  return {
    '@type': 'WebSite', '@id': siteOrigin + '/#website', name: 'NomadUY', alternateName: 'Nomad UY',
    url: siteOrigin, inLanguage: ['es', 'en', 'pt'], description: nomadIdentity[locale].description,
    publisher: { '@id': siteOrigin + '/#organization' },
    about: { '@id': siteUrl('/sobre-nomad', locale) + '#page' },
    isAccessibleForFree: true,
  }
}
