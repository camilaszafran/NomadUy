import { arrivalLocale } from '@/lib/arrival-links'
export function colivings(locale: string) {
 const i = { es: 0, en: 1, pt: 2 }[arrivalLocale(locale)]
 return [
  { title: 'OPTA Coliving', region: 'Montevideo · Punta Carretas', kind: 'Coliving', href: 'https://www.opta.com.uy/', description: [
   'Apartamentos amueblados con espacios comunes y cowork. Consultá estadía mínima, condiciones para mascotas y qué servicios incluye tu propuesta.',
   'Furnished apartments with shared spaces and coworking. Ask about minimum stays, pet policies and the services included in your offer.',
   'Apartamentos mobiliados com áreas comuns e coworking. Consulte estadia mínima, regras para animais e serviços incluídos na proposta.'][i] },
  { title: 'ZAG Coliving', region: 'Punta del Este · Península', kind: 'Coliving', href: 'https://zag.uy/', description: [
   'Habitaciones privadas, cocina compartida y espacios de cowork. Pedí una cotización para tus fechas y confirmá condiciones de salida.',
   'Private rooms, a shared kitchen and coworking areas. Request a quote for your dates and confirm move-out terms.',
   'Quartos privativos, cozinha compartilhada e coworking. Peça uma proposta para suas datas e confirme as regras de saída.'][i] },
  { title: 'Boundless Life', region: 'La Barra · Maldonado', kind: ['Comunidad para familias', 'Family community', 'Comunidade para famílias'][i], href: 'https://www.boundless.life/pricing', description: [
   'Programa para familias con educación, comunidad y opciones de vivienda. Consultá las fechas de La Barra, las edades y la composición del paquete.',
   'Family programme with education, community and housing options. Check La Barra cohort dates, eligible ages and what the package includes.',
   'Programa para famílias com educação, comunidade e opções de moradia. Confira datas de La Barra, idades atendidas e o que inclui o pacote.'][i] },
  { title: 'FacilRoom', region: 'Montevideo', kind: ['Directorio de habitaciones', 'Room directory', 'Diretório de quartos'][i], href: 'https://www.facilroom.uy/', description: [
   'Buscador de habitaciones, casas compartidas y opciones de coliving. Cada anuncio tiene sus propias condiciones, perfil de residentes y disponibilidad.',
   'Find rooms, shared homes and coliving listings. Each listing has its own conditions, resident profile and availability.',
   'Busca de quartos, casas compartilhadas e opções de coliving. Cada anúncio tem suas condições, perfil de moradores e disponibilidade.'][i] },
 ]
}
