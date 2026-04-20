import PageSubtitle from '@/components/ui/PageSubtitle'

export default function RecursosHeader() {
  return (
    <>
      <header className="page-header page-header-blue">
        <div className="page-header-inner">
          <div className="page-label">Recursos</div>
          <h1>Herramientas para<br />planear tu vida en Uruguay.</h1>
          <PageSubtitle>Calculadora de costo de vida, checklists descargables y links a trámites oficiales — todo en un lugar.</PageSubtitle>
        </div>
      </header>

      <div className="resource-tabs">
        <div className="resource-tabs-inner">
          <button className="tab-pill active">Costo de vida</button>
          <button className="tab-pill">Checklists</button>
          <button className="tab-pill">Trámites oficiales</button>
          <button className="tab-pill">Descargas</button>
        </div>
      </div>
    </>
  )
}
