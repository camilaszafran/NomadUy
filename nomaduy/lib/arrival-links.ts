export const officialArrival = {
  migrants: 'https://www.gub.uy/ministerio-desarrollo-social/tramites-y-servicios/servicios/centro-referencia-para-personas-migrantes',
  migrantNetwork: 'https://www.gub.uy/ministerio-desarrollo-social/tramites-y-servicios/servicios/division-proteccion-social-para-personas-migrantes-solicitantes',
  consular: 'https://www.gub.uy/ministerio-relaciones-exteriores/politicas-y-gestion/representaciones-extranjeras-uruguay',
  consulates: 'https://www.gub.uy/ministerio-relaciones-exteriores/comunicacion/publicaciones/oficinas-consulares',
  embassies: 'https://www.gub.uy/ministerio-relaciones-exteriores/comunicacion/publicaciones/embajadas-extranjeras-uruguay/embajadas-extranjeras-uruguay',
  emergency: 'https://www.gub.uy/ministerio-interior/tramites-y-servicios/servicios/emergencia-9-1-1',
  report: 'https://www.gub.uy/ministerio-interior/comunicacion/campanas/denunciar',
  violence: 'https://www.gub.uy/ministerio-interior/comunicacion/publicaciones/canales-denuncia-ante-situaciones-violencia-domestica-genero',
  same: 'https://www.gub.uy/ministerio-salud-publica/comunicacion/noticias/same-105-se-integro-forma-presencial-centro-comando-unificado-para-atender',
  lifePhone: 'tel:+5980767?oai_link_source=model_response_hotline',
  life: 'https://www.gub.uy/ministerio-salud-publica/comunicacion/noticias/linea-de-prevencion-del-suicidio-0800-0767?oai_link_source=model_response_hotline#:~:text=La%20l%C3%ADnea%20es%20un%20servicio,los%20suicidios%20a%20nivel%20pa%C3%ADs.',
  consumer: 'https://www.gub.uy/tramites/consulta-reclamo-yo-denuncia-materia-defensa-consumidor',
  labor: 'https://www.gub.uy/tramites/consultas-laborales-salariales',
  rights: 'https://www.gub.uy/comunicacion/publicaciones/donde-ir-en-situaciones-de-vulneracion-de-derechos',
  relocation: 'https://www.gub.uy/queres-venir-vivir-uruguay',
  residence: 'https://www.gub.uy/tramites/residencia-legal-permanente',
  nomad: 'https://www.gub.uy/tramites/hoja-identidad-provisoria',
  taxes: 'https://www.gub.uy/direccion-general-impositiva/tematica/residencia-fiscal',
  taxOptions: 'https://www.gub.uy/direccion-general-impositiva/comunicacion/publicaciones/regimen-impatriados-opcion-para-nuevos-residentes-fiscales-uruguay',
  pets: 'https://www.gub.uy/tramites/solicitud-ingreso-mascotas-uruguay',
  customs: 'https://www.aduanas.gub.uy/innovaportal/v/13516/1/innova.front/preguntas-frecuentes.html',
  guarantee: 'https://www.gub.uy/tramites/garantia-alquiler',
  education: 'https://www.gub.uy/ministerio-educacion-cultura/comunicacion/publicaciones/guia-inscripcion-personas-migrantes-sistema-educativo-uruguayo',
} as const

export function arrivalLocale(locale: string) {
  return locale === 'en' || locale === 'pt' ? locale : 'es'
}
