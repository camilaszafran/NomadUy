import { normalizeSearch, type SearchItem } from '@/lib/planner'

const stopWords = new Set('a al con de del el en la las los por para un una unos the with for to in of i want have arrived me my com do da dos das e o os as um uma eu cheguei llegue quiero three tres tres meses months month mes'.split(' '))
const concepts = [
 ['alquiler', 'alquilar', 'aluguel', 'alugar', 'rental', 'rent', 'housing', 'apartamento', 'amueblado', 'mobiliado'],
 ['perro', 'mascota', 'mascotas', 'gato', 'pet', 'pets', 'dog', 'cachorro', 'animais'],
 ['auto', 'carro', 'car', 'bus', 'omnibus', 'onibus', 'transporte', 'transport'],
 ['gente', 'personas', 'pessoas', 'amigos', 'friends', 'people', 'meet', 'conocer', 'conhecer'],
 ['trabajar', 'trabalho', 'work', 'cowork', 'coworking'],
 ['chip', 'esim', 'sim', 'internet'],
 ['caminar', 'senderos', 'senderismo', 'trekking', 'hiking', 'trilhas'],
 ['dinero', 'cambio', 'cajero', 'money', 'atm', 'cash', 'dinheiro', 'cambio'],
]
export function searchScore(item: SearchItem, query: string) {
  const terms = normalizeSearch(query).split(/[^a-z0-9]+/).filter(word => word.length > 1 && !stopWords.has(word))
  const title = normalizeSearch(item.title)
  const text = normalizeSearch([item.title, item.summary, item.keywords, item.kind].join(' '))
  return terms.reduce((sum, term) => {
    const variants = [term]
    if (term.length > 4 && term.endsWith('ies')) variants.push(term.slice(0, -3) + 'y')
    if (term.length > 4 && term.endsWith('s')) variants.push(term.slice(0, -1))
    if (term.length > 5 && term.endsWith('es')) variants.push(term.slice(0, -2))
    if (variants.some(value => title.includes(value))) return sum + 6
    if (variants.some(value => text.includes(value))) return sum + 3
    const group = concepts.find(words => words.includes(term))
    return sum + (group?.some(word => text.includes(word)) ? 1 : 0)
  }, 0)
}
