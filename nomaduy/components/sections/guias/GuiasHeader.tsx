export default function GuiasHeader() {
  return (
    <>
      <header className="page-header page-header-blue">
        <div className="page-header-inner">
          <div className="page-label">Guías</div>
          <h1>Todo lo que necesitás<br />saber para vivir acá.</h1>
          <p>Desde el primer día hasta los trámites de residencia — guías claras, prácticas y escritas por gente que lo vivió.</p>
        </div>
      </header>

      <div className="cat-strip">
        <div className="cat-strip-inner">
          <button className="cat-pill active">Todas las guías</button>
          <button className="cat-pill">Llegada</button>
          <button className="cat-pill">Legal & Trámites</button>
          <button className="cat-pill">Vivienda</button>
          <button className="cat-pill">Trabajo</button>
          <button className="cat-pill">Moverse</button>
          <button className="cat-pill">Salud</button>
          <button className="cat-pill">Familia</button>
        </div>
      </div>
    </>
  )
}
