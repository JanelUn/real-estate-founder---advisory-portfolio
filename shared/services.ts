export interface ServiceCatalogEntry {
  slug: string;
  title: string;
  contexts: string[];
}

// El contexto determina qué opciones de servicio se muestran en /agenda.
// "portfolio" es el catálogo completo (sitio propio). Un embed en otro
// proyecto puede pasar ?context=<contexto> para restringir a solo sus
// servicios relevantes (ver src/lib/embed.ts).
export const DEFAULT_CONTEXT = 'portfolio';

export const SERVICE_CATALOG: ServiceCatalogEntry[] = [
  { slug: 'agentes-ia', title: 'Agentes de IA personalizados', contexts: [DEFAULT_CONTEXT] },
  { slug: 'automatizacion', title: 'Automatización de procesos', contexts: [DEFAULT_CONTEXT] },
  { slug: 'sistemas-medida', title: 'Sistemas a medida', contexts: [DEFAULT_CONTEXT] },
  { slug: 'seo-performance', title: 'SEO y performance', contexts: [DEFAULT_CONTEXT] },
  { slug: 'producto-digital', title: 'Producto digital completo', contexts: [DEFAULT_CONTEXT] },
  { slug: 'dommies-gestion-integral', title: 'Gestión Integral — cupos limitados (3+ deptos)', contexts: ['dommies'] },
];

export function getServicesForContext(context: string): ServiceCatalogEntry[] {
  const matches = SERVICE_CATALOG.filter((s) => s.contexts.includes(context));
  return matches.length > 0 ? matches : SERVICE_CATALOG.filter((s) => s.contexts.includes(DEFAULT_CONTEXT));
}
