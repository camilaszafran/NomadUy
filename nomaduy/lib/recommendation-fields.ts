export const categories = ['Café', 'Cowork', 'Alojamiento', 'Sendero', 'Escapada', 'Idiomas', 'Taller', 'Actividad'] as const

export const departments = [
  'Artigas', 'Canelones', 'Cerro Largo', 'Colonia', 'Durazno', 'Flores', 'Florida',
  'Lavalleja', 'Maldonado', 'Montevideo', 'Paysandú', 'Río Negro', 'Rivera', 'Rocha',
  'Salto', 'San José', 'Soriano', 'Tacuarembó', 'Treinta y Tres',
] as const

export type Recommendation = {
  title: string
  region: string
  kind: string
  town: string
  description: string
  href?: string
}
