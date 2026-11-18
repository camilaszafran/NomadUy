import type { ReactNode } from 'react'
import { localizeHref } from '@/lib/locale'
import { agenda, arrivalLinks, cafes, cowork, founders, creators, football, interiorAgenda, social, stays, tourism, transport, trips } from '@/lib/discover'
import Directory from './Directory'

function Section({ id, title, intro, children }: { id: string; title: string; intro?: string; children: ReactNode }) {
  return (
    <section id={id} lang="es-UY" className="discovery-section" aria-labelledby={id + '-title'}>
      <header className="discovery-heading">
        <h2 id={id + '-title'}>{title}</h2>
        {intro && <p>{intro}</p>}
      </header>
      {children}
    </section>
  )
}

export function DiscoveryLinks({ items }: { items: [string, string][] }) {
  return <nav className="discovery-jumps" aria-label="En esta página" lang="es-UY">
    {items.map(([id, title]) => <a key={id} href={'#' + id}>{title} <span aria-hidden="true">↓</span></a>)}
  </nav>
}

function RecommendLink({ locale, text }: { locale: string; text: string }) {
  return <p className="discovery-actions"><a href={localizeHref('/comunidad#recomendar', locale)}>{text} →</a></p>
}

export function ArrivalDetails({ step }: { step: number }) {
  if (step === 1) return (
    <div className="arrival-details" lang="es-UY">
      <h4>Chip o eSIM, según tu celular</h4>
      <p>Verificá que el celular esté liberado y sea compatible con eSIM. Una línea local puede darte número uruguayo; las eSIM de viaje suelen ofrecer solo datos. Tené el documento a mano y confirmá con la compañía si admite tu pasaporte para el alta que elegiste.</p>
      <dl>
        <dt>Antel</dt><dd>Elegí chip físico o eSIM en la <a href={arrivalLinks.antel}>oferta prepago de Antel</a>. Registrá el número siguiendo las instrucciones de la compra y recargá desde los canales de Antel.</dd>
        <dt>Claro</dt><dd>Consultá dónde conseguir el <a href={arrivalLinks.claro}>chip Claro</a> y si tu línea puede usar <a href={arrivalLinks.claroEsim}>eSIM</a>. Usá Mi Claro para gestionar recargas y paquetes.</dd>
        <dt>Tigo</dt><dd>Consultá cómo <a href={arrivalLinks.tigo}>comprar, registrar y activar un chip o eSIM</a> en línea, en comercios autorizados o en tienda. Podés gestionar paquetes desde Mi Tigo.</dd>
      </dl>
    </div>
  )
  if (step === 4) return (
    <div className="arrival-details" lang="es-UY">
      <h4>¿Qué puedo tramitar con pasaporte?</h4>
      <dl>
        <dt><a href={arrivalLinks.prex}>Prex</a></dt><dd>Prex lista el pasaporte vigente entre los documentos aceptados para solicitar la cuenta. Iniciá la solicitud en sus canales y consultá dónde retirar y cargar la tarjeta. Verificá los costos de retiro y transferencias.</dd>
        <dt><a href={arrivalLinks.midinero}>Midinero</a></dt><dd>Para el producto, el emisor lista documentos de Uruguay, Argentina, Brasil y Paraguay. Si solo tenés pasaporte o tu documento es de otro país, confirmá qué admite la modalidad que vas a pedir. Consultá en Midinero o Redpagos por retiro, recarga y comisiones.</dd>
      </dl>
    </div>
  )
  return null
}

export function TravelContent({ locale }: { locale: string }) {
  return (
    <>
      <Section id="cafes" title="Cafés lindos de Uruguay" intro="Paradas para una merienda, un espresso o un descanso en ruta. Elegí un café para ubicarlo en el mapa.">
        <Directory items={cafes} filter map />
        <RecommendLink locale={locale} text="Recomendá un café de tu ciudad" />
      </Section>
      <Section id="sin-auto" title="Escapadas sin auto" intro="Elegí un destino, confirmá los horarios de ida y vuelta y revisá cómo hacer el último tramo.">
        <nav aria-label="Pasajes y horarios" className="discovery-actions discovery-travel-links">
          {transport.slice(0, 3).map(item => <a key={item.title} href={item.href}>{item.title === 'URUBUS' ? 'URUBUS · Pasajes a destinos de todo Uruguay' : item.title + ' · ' + item.label} ↗</a>)}
        </nav>
        <Directory items={trips} />
        <RecommendLink locale={locale} text="Recomendá una escapada" />
      </Section>
      <Section id="apps-turismo" title="Herramientas para tu próxima salida">
        <div className="discovery-grid">
          <article className="discovery-card discovery-highlight">
            <h3>Turisteando</h3>
            <p>App uruguaya para explorar rutas temáticas, actividades e historias de cada destino.</p>
            <div className="discovery-actions">{tourism.map(([title, href]) => <a key={href} href={href}>{title} ↗</a>)}</div>
          </article>
          <article className="discovery-card">
            <h3>Turismo Rural y Natural</h3>
            <p>Buscá alojamientos y experiencias de naturaleza por región.</p>
            <div className="discovery-actions"><a href="https://turismoruralynatural.uy/">Explorar experiencias ↗</a></div>
          </article>
          <article className="discovery-card">
            <h3>¿Necesitás alquilar un auto?</h3>
            <p>Con TripWip podés reservar un vehículo para manejar vos. Revisá requisitos y lugar de retiro.</p>
            <div className="discovery-actions"><a href="https://tripwip.app/">Buscar autos en TripWip ↗</a></div>
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
  return <Section id="alojamiento" title="Dónde quedarte al llegar" intro="Buscá un hostel o una estadía temporaria mientras conocés la ciudad y elegís dónde instalarte."><Directory items={stays} /></Section>
}

const learningKinds = ['Idiomas', 'Lectura y talleres', 'Arte, cerámica y música', 'Cocina y oficios']

export function LearningContent({ locale }: { locale: string }) {
  return <Section id="cursos-y-talleres" title="Cursos y talleres" intro="Encontrá clases e intercambios de idiomas, cerámica, arte, pintura, música y cocina. Consultá si aceptan principiantes y cómo anotarte.">
    <Directory items={social.filter(item => learningKinds.includes(item.kind))} filter />
    <RecommendLink locale={locale} text="Recomendá un taller o intercambio" />
  </Section>
}

export function SocialContent({ locale }: { locale: string }) {
  return <Section id="conocer-gente" title="Dónde conocer gente" intro="Planes para ir por tu cuenta y actividades para volver cada semana. En los enlaces podés consultar cupos, precios y opciones para principiantes.">
    <Directory items={social.filter(item => !learningKinds.includes(item.kind))} filter />
    <RecommendLink locale={locale} text="Recomendá una actividad" />
  </Section>
}

export function CreatorContent() {
  return <Section id="creadores" title="Uruguay en Instagram y TikTok" intro="Personas que muestran sus lugares favoritos y cuentan cómo es hacer vida en Uruguay."><Directory items={creators} filter /></Section>
}

export function TransportContent() {
  return <Section id="apps-transporte" title="Apps para moverte por Uruguay" intro="Desde un taxi en Montevideo hasta un ómnibus al interior. Revisá la cobertura en el lugar donde estás."><Directory items={transport} /></Section>
}

export function CultureContent() {
  return (
    <>
      <Section id="mate-uruguayo" title="El mate: cómo se ceba y se comparte" intro="El termo bajo el brazo y la ronda forman parte de la vida cotidiana. El mate acompaña una charla, una pausa en el trabajo o una tarde en la rambla.">
        <ol className="mate-steps">
          <li><strong>Prepará el equipo.</strong> Necesitás mate, yerba, bombilla y un termo con agua caliente sin hervir.</li>
          <li><strong>Armá la montañita.</strong> Llená el mate hasta unos dos tercios, tapá la boca con la mano y volcá la yerba hacia un lado.</li>
          <li><strong>Humedecé el hueco.</strong> Echá un poco de agua tibia por el lado bajo y dejá que la yerba la absorba.</li>
          <li><strong>Colocá la bombilla y cebá.</strong> Apoyala en el hueco húmedo y verté el agua ahí, de a poco. Dejá una parte de la yerba seca para seguir cebando.</li>
        </ol>
        <p className="discovery-lede">En una ronda, quien ceba sirve y recibe el mate de vuelta. La bombilla se deja quieta y decir «gracias» suele indicar que no querés otro.</p>
        <div className="discovery-actions"><a href="https://uruguaynatural.com/es/masqueunpais/el-mate-2/">El mate en Uruguay Natural ↗</a><a href="https://www.laselva.com.uy/blog/ver/3/asi-se-prepara-el-mate-perfecto">Ver cómo se prepara ↗</a></div>
      </Section>
      <Section id="futbol-uruguayo" title="Uruguay también se entiende en la cancha" intro="Del baby fútbol de barrio a la Celeste, el fútbol es parte de la vida de clubes, familias e hinchadas. Estos son cuatro puntos de partida para conocerla.">
        <Directory items={football} />
      </Section>
      <Section id="curiosidades" title="Dos historias para entender el país">
        <div className="discovery-grid">
          <article className="discovery-card"><p className="discovery-meta">Frontera norte</p><h3>El portuñol de Rivera</h3><p>En la frontera con Brasil conviven el español y el portugués. La Ley General de Educación menciona al portugués del Uruguay entre las lenguas maternas del país. Un paseo por Rivera y la Plaza Internacional permite escuchar esa convivencia en la vida cotidiana.</p><div className="discovery-actions"><a href="https://www.impo.com.uy/bases/leyes/18437-2008/40">Leer el artículo 40 ↗</a></div></article>
          <article className="discovery-card"><p className="discovery-meta">1913–1915</p><h3>Reformas del ciclo batllista</h3><p>En 1913, durante el segundo gobierno de José Batlle y Ordóñez, se autorizó el divorcio por sola voluntad de la mujer. En 1915, ya bajo Feliciano Viera, la ley de ocho horas limitó la jornada para los trabajadores comprendidos por la norma.</p><div className="discovery-actions"><a href="https://www.impo.com.uy/bases/leyes/4802-1913">Divorcio, 1913 ↗</a><a href="https://www.impo.com.uy/bases/leyes/5350-1915">Ocho horas, 1915 ↗</a></div></article>
        </div>
      </Section>
    </>
  )
}

export function WorkContent({ locale }: { locale: string }) {
  return (
    <>
      <Section id="live-in-uruguay" title="Live in Uruguay" intro="El portal de Uruguay XXI reúne información para instalarte, buscar alojamiento, aprender español y trabajar en Uruguay.">
        <div className="discovery-actions"><a href="https://www.liveinuruguay.uy/">Abrir Live in Uruguay ↗</a></div>
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
  return <Section id="espectaculos" title="Espectáculos y cartelera" intro="Encontrá qué hacer esta semana y consultá entradas en el sitio que organiza o vende cada evento."><Directory items={agenda} /></Section>
}

export function MontevideoContent({ locale }: { locale: string }) {
  return <aside className="discovery-card discovery-highlight" lang="es-UY">
    <h3>Descubrí Montevideo</h3>
    <p>La guía turística de la Intendencia reúne la agenda, los paseos y la información para recorrer la ciudad.</p>
    <div className="discovery-actions">
      <a href="https://www.descubrimontevideo.uy/">Abrir agenda y guía oficial ↗</a>
      <a href="https://www.descubrimontevideo.uy/que-hacer">Ver qué hacer ↗</a>
      <a href={localizeHref('/guias/cultura-uruguay#futbol-uruguayo', locale)}>Ruta futbolera →</a>
    </div>
  </aside>
}
