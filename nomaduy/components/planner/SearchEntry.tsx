import { localizeHref } from '@/lib/locale'
export default function SearchEntry({ locale }: { locale: string }) {
 const text = locale === 'en' ? ['What do you need?', 'Monthly rental, travelling with a pet…', 'Search', 'My saved list'] : locale === 'pt' ? ['O que você precisa?', 'Aluguel mensal, viajar com cachorro…', 'Buscar', 'Meus favoritos'] : ['¿Qué necesitás resolver?', 'Alquiler por mes, viajar con perro…', 'Buscar', 'Mis favoritos']
 return <div className="search-entry">
   <form action={localizeHref('/mi-uruguay', locale)}>
     <label htmlFor="entry-query">{text[0]}</label>
     <div><input id="entry-query" name="q" type="search" placeholder={text[1]} maxLength={250} /><button type="submit">{text[2]}</button></div>
   </form>
   <a href={localizeHref('/mi-uruguay?favoritos=1', locale)}>{text[3]} →</a>
 </div>
}
