import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRightIcon } from '@phosphor-icons/react';
import { Reveal, StaggerReveal, RevealItem } from './Reveal';
import { trackEvent } from '../lib/analytics';

type Moment = { src: string; caption: string; link?: string; partner?: string; focus?: 'top' };

const MOMENTS: Moment[] = [
  { src: '/ecosystem/ai-salon-lima.jpg', caption: 'Panelistas en AI Salon Lima', link: 'https://www.aisalon.ai/', partner: 'AI Salon' },
  { src: '/ecosystem/ceo-chazki.jpg', caption: 'Con Gonzalo Begazo, CEO de Chazki', link: 'https://www.chazki.com/', partner: 'Chazki' },
  { src: '/ecosystem/demo-day-upc.jpg', caption: 'Ganadora de Mejor Elevator Pitch — 2024-2 (UPC)', link: 'https://www.upc.edu.pe/', partner: 'UPC' },
  { src: '/ecosystem/encuentra-tu-roommate-2025.jpg', caption: 'Encuentra tu Roommate — 2025' },
  { src: '/ecosystem/encuentra-tu-roommate-2026.jpg', caption: 'Encuentra tu Roommate — 2026' },
  { src: '/ecosystem/find-your-founder-cientifica.jpg', caption: 'Find Your Founder — Universidad Científica del Sur', link: 'https://www.cientifica.edu.pe/', partner: 'UCSUR' },
  { src: '/ecosystem/founders-fitia.jpg', caption: 'Con founders de Fitia — Startup de YCombinator', link: 'https://fitia.app/', partner: 'Fitia' },
  { src: '/ecosystem/huanuco-tech-week-2025-panel.jpg', caption: 'Panel — Huánuco Tech Week 2025' },
  { src: '/ecosystem/huanuco-tech-week-2025-grupo.jpg', caption: 'Huánuco Tech Week 2025' },
  { src: '/ecosystem/equipo-dommies.jpg', caption: 'Panelista Mujeres Emprendedoras' },
  { src: '/ecosystem/miguel-montalvan.jpg', caption: 'Con Miguel Montalván — Mentor y Conferencista', focus: 'top' },
  { src: '/ecosystem/ruben-sanchez-pyme.jpg', caption: 'Cumbre Pyme APEC — con Rubén Sánchez, CEO de San Antonio', link: 'https://pasteleriasanantonio.com/', partner: 'San Antonio', focus: 'top' },
  { src: '/ecosystem/photo-2.jpg', caption: 'Orientación con el Tio Rockefeller - Augusto Peñaloza' },
  { src: '/ecosystem/clase-upc.jpg', caption: 'Dictado de clase de "Lanzamiento de producto y negocios sostenibles" en UPC', link: 'https://www.upc.edu.pe/', partner: 'UPC' },
  { src: '/ecosystem/pecap-2025.jpg', caption: 'Perú Venture Capital Conference — 2025' },
  { src: '/ecosystem/zero-to-one.jpg', caption: 'Zero to One — De la idea al crecimiento' },
];

export const EcosystemSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.6;
      scrollRef.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section id="ecosistema" className="py-24 sm:py-32 bg-white text-ink overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Reveal as="h2" className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-ink leading-[1.1]">
              En el camino
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-4 text-base sm:text-lg text-ink/70 font-light leading-relaxed">
              Ser startup founder me ha llevado a compartir con founders, inversionistas y referentes del ecosistema emprendedor y real state peruano, y armar una red poderosa de networking en menos de 1 año.
            </Reveal>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => scroll('left')}
              aria-label="Anterior foto"
              className="w-11 h-11 rounded-full border border-line hover:bg-mist flex items-center justify-center transition-colors active:scale-95"
            >
              <ArrowLeft weight="bold" className="w-4 h-4 text-ink/70" />
            </button>
            <button
              onClick={() => scroll('right')}
              aria-label="Siguiente foto"
              className="w-11 h-11 rounded-full border border-line hover:bg-mist flex items-center justify-center transition-colors active:scale-95"
            >
              <ArrowRight weight="bold" className="w-4 h-4 text-ink/70" />
            </button>
          </div>
        </div>
      </div>

      <StaggerReveal
        ref={scrollRef as React.Ref<HTMLDivElement>}
        className="flex gap-6 sm:gap-8 overflow-x-auto px-6 sm:px-12 pb-4 snap-x snap-mandatory no-scrollbar"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {MOMENTS.map((moment, idx) => (
          <RevealItem key={idx} className="shrink-0 w-[260px] sm:w-[300px] snap-start">
            <div className="h-[320px] sm:h-[360px] rounded-2xl border border-line bg-mist/30 overflow-hidden">
              <img
                src={moment.src}
                alt={moment.caption}
                loading="lazy"
                decoding="async"
                className={`w-full h-full object-cover ${moment.focus === 'top' ? 'object-top' : 'object-center'}`}
              />
            </div>
            {moment.link ? (
              <a
                href={moment.link}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent('partner_click', { partner: moment.partner ?? moment.link, location: 'ecosistema' })}
                className="mt-3 inline-flex items-center gap-1 text-xs sm:text-sm text-ink/60 font-mono hover:text-ink transition-colors"
              >
                {moment.caption}
                <ArrowUpRightIcon weight="bold" className="w-3 h-3 shrink-0" />
              </a>
            ) : (
              <p className="mt-3 text-xs sm:text-sm text-ink/60 font-mono">{moment.caption}</p>
            )}
          </RevealItem>
        ))}
      </StaggerReveal>
    </section>
  );
};
