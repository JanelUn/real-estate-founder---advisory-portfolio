export interface ServiceCatalogEntry {
  slug: string;
  title: string;
}

export const SERVICE_CATALOG: ServiceCatalogEntry[] = [
  { slug: 'agentes-ia', title: 'Agentes de IA personalizados' },
  { slug: 'automatizacion', title: 'Automatización de procesos' },
  { slug: 'sistemas-medida', title: 'Sistemas a medida' },
  { slug: 'seo-performance', title: 'SEO y performance' },
  { slug: 'producto-digital', title: 'Producto digital completo' },
];
