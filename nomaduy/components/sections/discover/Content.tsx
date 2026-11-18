'use client'

import { useLocale } from 'next-intl'
import { discoveryCopy } from '@/lib/discovery-copy'
import { linkTarget } from '@/lib/link-target'
import type { ReactNode } from 'react'
import { localizeHref } from '@/lib/locale'
import { agenda, arrivalLinks, cafes, cowork, founders, creators, football, interiorAgenda, social, stays, tourism, trips } from '@/lib/discover'
import Directory from './Directory'

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return (
    <section id={id} lang={language} className="discovery-section" aria-labelledby={id + '-title'}>
      <header className="discovery-heading">
        <h2 id={id + '-title'}>{t(title)}</h2>
        {intro && <p>{t(intro)}</p>}
      </header>
      {children}
    </section>
  )
}

export function DiscoveryLinks({ items }: { items: [string, string][] }) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return <nav className="discovery-jumps" aria-label={t("En esta página")} lang={language}>
    {items.map(([id, title]) => <a key={id} href={'#' + id}>{t(title)} <span aria-hidden="true">↓</span></a>)}
  </nav>
}

function RecommendLink({ locale, text }: { locale: string; text: string }) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return <p className="discovery-actions"><a href={localizeHref('/comunidad#recomendar', locale)}>{t(text)} →</a></p>
}

export function ArrivalDetails({ step }: { step: number }) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  if (step === 1) return (
    <div className="arrival-details" lang={language}>
      <h4>{t("Chip o eSIM, según tu celular")}</h4>
      <p>{t("Verificá que el celular esté liberado y sea compatible con eSIM. Una línea local puede darte número uruguayo; las eSIM de viaje suelen ofrecer solo datos. Tené el documento a mano y confirmá con la compañía si admite tu pasaporte para el alta que elegiste.")}</p>
      <dl>
        <dt>Antel</dt><dd>{t("Elegí chip físico o eSIM en la")}{" "}<a href={arrivalLinks.antel} {...linkTarget(arrivalLinks.antel)}>{t("oferta prepago de Antel")}</a>{t(". Registrá el número siguiendo las instrucciones de la compra y recargá desde los canales de Antel.")}</dd>
        <dt>Claro</dt><dd>{t("Consultá dónde conseguir el")}{" "}<a href={arrivalLinks.claro} {...linkTarget(arrivalLinks.claro)}>{t("chip Claro")}</a>{" "}{t("y si tu línea puede usar")}{" "}<a href={arrivalLinks.claroEsim} {...linkTarget(arrivalLinks.claroEsim)}>eSIM</a>{t(". Usá Mi Claro para gestionar recargas y paquetes.")}</dd>
        <dt>Tigo</dt><dd>{t("Consultá cómo")}{" "}<a href={arrivalLinks.tigo} {...linkTarget(arrivalLinks.tigo)}>{t("comprar, registrar y activar un chip o eSIM")}</a>{" "}{t("en línea, en comercios autorizados o en tienda. Podés gestionar paquetes desde Mi Tigo.")}</dd>
      </dl>
    </div>
  )
  if (step === 4) return (
    <div className="arrival-details" lang={language}>
      <h4>{t("¿Qué puedo tramitar con pasaporte?")}</h4>
      <dl>
        <dt><a href={arrivalLinks.prex} {...linkTarget(arrivalLinks.prex)}>Prex</a></dt><dd>{t("Prex lista el pasaporte vigente entre los documentos aceptados para solicitar la cuenta. Iniciá la solicitud en sus canales y consultá dónde retirar y cargar la tarjeta. Verificá los costos de retiro y transferencias.")}</dd>
        <dt><a href={arrivalLinks.midinero} {...linkTarget(arrivalLinks.midinero)}>Midinero</a></dt><dd>{t("Para el producto, el emisor lista documentos de Uruguay, Argentina, Brasil y Paraguay. Si solo tenés pasaporte o tu documento es de otro país, confirmá qué admite la modalidad que vas a pedir. Consultá en Midinero o Redpagos por retiro, recarga y comisiones.")}</dd>
      </dl>
    </div>
  )
  return null
}

export function TravelContent({ locale }: { locale: string }) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return (
    <>
      <Section id="cafes" title="Cafés lindos de Uruguay" intro="Paradas para una merienda, un espresso o un descanso en ruta. Elegí un café para ubicarlo en el mapa.">
        <Directory items={cafes} filter map />
        <RecommendLink locale={locale} text="Recomendá un café de tu ciudad" />
      </Section>
      <Section id="sin-auto" title="Escapadas sin auto" intro="Elegí un destino, confirmá los horarios de ida y vuelta y revisá cómo hacer el último tramo.">
        <Directory items={trips} />
        <RecommendLink locale={locale} text="Recomendá una escapada" />
      </Section>
      <Section id="apps-turismo" title="Herramientas para tu próxima salida">
        <div className="discovery-grid">
          <article className="discovery-card discovery-highlight">
            <h3>Turisteando</h3>
            <p>{t("App uruguaya para explorar rutas temáticas, actividades e historias de cada destino.")}</p>
            <div className="discovery-actions">{tourism.map(([title, href]) => <a key={href} href={href} {...linkTarget(href)}>{t(title)} ↗</a>)}</div>
          </article>
          <article className="discovery-card">
            <h3>Turismo Rural y Natural</h3>
            <p>{t("Buscá alojamientos y experiencias de naturaleza por región.")}</p>
            <div className="discovery-actions"><a href="https://turismoruralynatural.uy/" {...linkTarget("https://turismoruralynatural.uy/")}>{t("Explorar experiencias ↗")}</a></div>
          </article>
        </div>
      </Section>
      <Section id="un-sabado" title="Un sábado en Montevideo" intro="Tres planes para elegir según las ganas y el tiempo que tengas.">
        <Directory items={[
          {title:'Mate y rambla',region:'Montevideo',kind:'Al aire libre',description:'Arrancá en Parque Rodó, caminá hacia la rambla y buscá un lugar donde sentarte a compartir un mate.',href:localizeHref('/guias/cultura-uruguay#mate-uruguayo',locale),label:'Aprendé a cebar'},
          {title:'Fútbol e historia',region:'Montevideo',kind:'Museo',description:'Empezá por el Centenario y el Museo del Fútbol. Si hay partido o visita guiada, sumá un estadio y planificá el traslado.',href:localizeHref('/guias/cultura-uruguay#futbol-uruguayo',locale),label:'Ver la guía futbolera'},
          {title:'Café y barrio',region:'Montevideo',kind:'Paseo a pie',description:'Elegí una cafetería y aprovechá para caminar por el barrio. Desde Cordón podés combinar librerías, arquitectura y una merienda.',href:'#cafes',label:'Elegir un café'},
        ]} />
      </Section>
      <Section id="agenda-interior" title="Agenda del interior" intro="Ferias, fiestas y actividades. Consultá las fechas con el organizador y revisá la vuelta antes de salir.">
        <Directory items={interiorAgenda} />
      </Section>
    </>
  )
}

export function StayContent() {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return <Section id="alojamiento" title="Dónde quedarte al llegar" intro="Buscá un hostel o una estadía temporaria mientras conocés la ciudad y elegís dónde instalarte."><Directory items={stays} /></Section>
}

const learningKinds = ['Idiomas', 'Lectura y talleres', 'Arte, cerámica y música', 'Cocina y oficios']

export function LearningContent({ locale }: { locale: string }) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return <Section id="cursos-y-talleres" title="Cursos y talleres" intro="Encontrá clases e intercambios de idiomas, cerámica, arte, pintura, música y cocina. Consultá si aceptan principiantes y cómo anotarte.">
    <Directory items={social.filter(item => learningKinds.includes(item.kind))} filter />
    <RecommendLink locale={locale} text="Recomendá un taller o intercambio" />
  </Section>
}

export function SocialContent({ locale }: { locale: string }) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return <Section id="conocer-gente" title="Dónde conocer gente" intro="Planes para ir por tu cuenta y actividades para volver cada semana. En los enlaces podés consultar cupos, precios y opciones para principiantes.">
    <Directory items={social.filter(item => !learningKinds.includes(item.kind))} filter />
    <RecommendLink locale={locale} text="Recomendá una actividad" />
  </Section>
}

export function CreatorContent() {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return <Section id="creadores" title="Uruguay en Instagram y TikTok" intro="Personas que muestran sus lugares favoritos y cuentan cómo es hacer vida en Uruguay."><Directory items={creators} filter /></Section>
}

export function CultureContent() {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return (
    <>
      <Section id="mate-uruguayo" title="El mate: cómo se ceba y se comparte" intro="El termo bajo el brazo y la ronda forman parte de la vida cotidiana. El mate acompaña una charla, una pausa en el trabajo o una tarde en la rambla.">
        <ol className="mate-steps">
          <li><strong>{t("Prepará el equipo.")}</strong>{' '}{t("Necesitás mate, yerba, bombilla y un termo con agua caliente sin hervir.")}</li>
          <li><strong>{t("Armá la montañita.")}</strong>{' '}{t("Llená el mate hasta unos dos tercios, tapá la boca con la mano y volcá la yerba hacia un lado.")}</li>
          <li><strong>{t("Humedecé el hueco.")}</strong>{' '}{t("Echá un poco de agua tibia por el lado bajo y dejá que la yerba la absorba.")}</li>
          <li><strong>{t("Colocá la bombilla y cebá.")}</strong>{' '}{t("Apoyala en el hueco húmedo y verté el agua ahí, de a poco. Dejá una parte de la yerba seca para seguir cebando.")}</li>
        </ol>
        <p className="discovery-lede">{t("En una ronda, quien ceba sirve y recibe el mate de vuelta. La bombilla se deja quieta y decir «gracias» suele indicar que no querés otro.")}</p>
        <div className="discovery-actions"><a href="https://uruguaynatural.com/es/masqueunpais/el-mate-2/" {...linkTarget("https://uruguaynatural.com/es/masqueunpais/el-mate-2/")}>{t("El mate en Uruguay Natural ↗")}</a><a href="https://www.laselva.com.uy/blog/ver/3/asi-se-prepara-el-mate-perfecto" {...linkTarget("https://www.laselva.com.uy/blog/ver/3/asi-se-prepara-el-mate-perfecto")}>{t("Ver cómo se prepara ↗")}</a></div>
      </Section>
      <Section id="futbol-uruguayo" title="Uruguay también se entiende en la cancha" intro="Del baby fútbol de barrio a la Celeste, el fútbol es parte de la vida de clubes, familias e hinchadas. Estos son cuatro puntos de partida para conocerla.">
        <Directory items={football} />
      </Section>
      <Section id="curiosidades" title="Dos historias para entender el país">
        <div className="discovery-grid">
          <article className="discovery-card"><p className="discovery-meta">{t("Frontera norte")}</p><h3>{t("El portuñol de Rivera")}</h3><p>{t("En la frontera con Brasil conviven el español y el portugués. La Ley General de Educación menciona al portugués del Uruguay entre las lenguas maternas del país. Un paseo por Rivera y la Plaza Internacional permite escuchar esa convivencia en la vida cotidiana.")}</p><div className="discovery-actions"><a href="https://www.impo.com.uy/bases/leyes/18437-2008/40" {...linkTarget("https://www.impo.com.uy/bases/leyes/18437-2008/40")}>{t("Leer el artículo 40 ↗")}</a></div></article>
          <article className="discovery-card"><p className="discovery-meta">1913–1915</p><h3>{t("Reformas del ciclo batllista")}</h3><p>{t("En 1913, durante el segundo gobierno de José Batlle y Ordóñez, se autorizó el divorcio por sola voluntad de la mujer. En 1915, ya bajo Feliciano Viera, la ley de ocho horas limitó la jornada para los trabajadores comprendidos por la norma.")}</p><div className="discovery-actions"><a href="https://www.impo.com.uy/bases/leyes/4802-1913" {...linkTarget("https://www.impo.com.uy/bases/leyes/4802-1913")}>{t("Divorcio, 1913 ↗")}</a><a href="https://www.impo.com.uy/bases/leyes/5350-1915" {...linkTarget("https://www.impo.com.uy/bases/leyes/5350-1915")}>{t("Ocho horas, 1915 ↗")}</a></div></article>
        </div>
      </Section>
    </>
  )
}

export function WorkContent({ locale }: { locale: string }) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return (
    <>
      <Section id="live-in-uruguay" title="Live in Uruguay" intro="El portal de Uruguay XXI reúne información para instalarte, buscar alojamiento, aprender español y trabajar en Uruguay.">
        <div className="discovery-actions"><a href="https://www.liveinuruguay.uy/" {...linkTarget("https://www.liveinuruguay.uy/")}>{t("Abrir Live in Uruguay ↗")}</a></div>
      </Section>
      <Section id="delivery" title="Apps para pedir comida" intro="Ingresá la dirección de entrega para consultar qué comercios llegan a tu zona.">
        <Directory items={[
          {title:'PedidosYa', region:'Según tu dirección', kind:'Delivery', description:'Pedí comida a restaurantes y consultá comercios cercanos. La app muestra las opciones de entrega y el total antes de pagar.', href:'https://www.pedidosya.com.uy/', label:'Abrir PedidosYa'},
          {title:'Rappi', region:'Según tu dirección', kind:'Delivery', description:'Pedí comida, supermercado o farmacia donde haya cobertura. Consultá costo y tiempo de entrega en la app.', href:'https://www.rappi.com.uy/', label:'Abrir Rappi'},
        ]} />
      </Section>
      <Section id="coworks" title="Coworks en Uruguay" intro="Encontrá dónde trabajar por departamento. Consultá al espacio por pases diarios, salas para llamadas y disponibilidad.">
        <Directory items={cowork} filter />
        <RecommendLink locale={locale} text="Recomendá un cowork" />
      </Section>
      <Section id="emprender" title="Dónde pedir ayuda para emprender" intro="Si estás empezando, buscá un Centro Pyme. Si ya estás validando un proyecto innovador, compará incubadoras y llamados.">
        <Directory items={founders} filter />
      </Section>
    </>
  )
}

export function AgendaContent() {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return <Section id="espectaculos" title="Espectáculos y cartelera" intro="Encontrá qué hacer esta semana y consultá entradas en el sitio que organiza o vende cada evento."><Directory items={agenda} /></Section>
}

export function MontevideoContent({ locale }: { locale: string }) {
  const language = useLocale()
  const t = (text: string) => discoveryCopy(text, language)
  return <aside className="discovery-card discovery-highlight" lang={language}>
    <h3>Descubrí Montevideo</h3>
    <p>{t("La guía turística de la Intendencia reúne la agenda, los paseos y la información para recorrer la ciudad.")}</p>
    <div className="discovery-actions">
      <a href="https://www.descubrimontevideo.uy/" {...linkTarget("https://www.descubrimontevideo.uy/")}>{t("Abrir agenda y guía oficial ↗")}</a>
      <a href="https://www.descubrimontevideo.uy/que-hacer" {...linkTarget("https://www.descubrimontevideo.uy/que-hacer")}>{t("Ver qué hacer ↗")}</a>
      <a href={localizeHref('/guias/cultura-uruguay#futbol-uruguayo', locale)}>{t("Ruta futbolera →")}</a>
    </div>
  </aside>
}
