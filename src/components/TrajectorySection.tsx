import React from 'react';
import { Reveal } from './Reveal';

const LOGOS = [
  { name: 'Start Global', src: '/logos/start-global.png' },
  { name: 'ADN Partners', src: '/logos/adn-partners.png' },
  { name: 'InnovaFem Emprende UP', src: '/logos/innovafem-emprende-up.png' },
  { name: 'Start UPC', src: '/logos/start-upc.png' },
  { name: 'Startup Perú', src: '/logos/startup-peru.png' },
  { name: 'Ministerio de la Producción', src: '/logos/Ministerio_de_la_Produccion.png' },
];

const MARQUEE_LOGOS = [...LOGOS, ...LOGOS];

export const TrajectorySection: React.FC = () => {
  return (
    <section id="trayectoria" className="py-24 sm:py-32 bg-white text-ink border-b border-line/60">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <Reveal as="h2" className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-ink leading-[1.1]">
          No teorizo. Construyo.
        </Reveal>

        <Reveal as="p" delay={0.1} className="mt-6 text-base sm:text-lg text-ink/70 font-light leading-relaxed max-w-2xl mx-auto">
          Fundé la primer startup de roommate matching con inteligencia artificial respaldada por ProInnovate (Ministerio de Producción) e incubada en UPC. Hoy: más de 10,000 usuarios registrados y clientes que pagan.
        </Reveal>
      </div>

      <Reveal as="p" delay={0.15} className="mt-16 text-center text-xs font-mono uppercase tracking-[0.25em] text-ink/40">
        Marcas y organizaciones que han confiado en mi trabajo
      </Reveal>

      {/* Franja horizontal full-bleed con marquee infinito */}
      <Reveal as="div" delay={0.2} className="mt-8 py-6 border-y border-line/60 bg-mist/10 w-full overflow-hidden">
        <span className="sr-only">Respaldada por: {LOGOS.map((l) => l.name).join(', ')}</span>
        <div className="flex items-center gap-x-16 sm:gap-x-24 w-max animate-marquee" aria-hidden="true">
          {MARQUEE_LOGOS.map((logo, idx) => (
            <img
              key={idx}
              src={logo.src}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-8 sm:h-9 w-auto object-contain grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-300 shrink-0"
            />
          ))}
        </div>
      </Reveal>
    </section>
  );
};
