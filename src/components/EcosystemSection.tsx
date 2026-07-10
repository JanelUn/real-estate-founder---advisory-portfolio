import React, { useRef } from 'react';
import { ArrowLeft, ArrowRight } from '@phosphor-icons/react';
import { Reveal, StaggerReveal, RevealItem } from './Reveal';

const PHOTO_1 = '/ecosystem/photo-1.jpg';
const PHOTO_2 = '/ecosystem/photo-2.jpg';

const MOMENTS = [
  { src: PHOTO_1, caption: 'Demo Day ProInnovate — 2025' },
  { src: PHOTO_2, caption: 'Founders Night UPC — 2024' },
  { src: PHOTO_1, caption: 'Encuentro de Fundadoras Tech — 2025' },
  { src: PHOTO_2, caption: 'Startup Weekend Lima — 2024' },
  { src: PHOTO_1, caption: 'Panel de Innovación PropTech — 2025' },
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
    <section id="ecosistema" className="py-24 sm:py-32 bg-white text-ink border-b border-line/60 overflow-hidden">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <Reveal as="h2" className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-ink leading-[1.1]">
              En el camino
            </Reveal>
            <Reveal as="p" delay={0.1} className="mt-4 text-base sm:text-lg text-ink/70 font-light leading-relaxed">
              Construir Dommies me ha llevado a compartir con founders, inversionistas y referentes del ecosistema emprendedor peruano.
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
                className="w-full h-full object-cover"
              />
            </div>
            <p className="mt-3 text-xs sm:text-sm text-ink/60 font-mono">{moment.caption}</p>
          </RevealItem>
        ))}
      </StaggerReveal>
    </section>
  );
};
