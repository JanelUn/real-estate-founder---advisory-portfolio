import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { Reveal } from './Reveal';
import { WhatsAppMockup } from './service-mockups/WhatsAppMockup';
import { AutomationMockup } from './service-mockups/AutomationMockup';
import { CodeSnippetMockup } from './service-mockups/CodeSnippetMockup';
import { GoogleSerpMockup } from './service-mockups/GoogleSerpMockup';
import { ProductMockup } from './service-mockups/ProductMockup';

const SERVICES = [
  {
    number: '01',
    slug: 'agentes-ia',
    title: 'Agentes de IA personalizados',
    description: 'Asistentes que atienden, califican y responden leads de propiedades por WhatsApp o web, entrenados con tu inventario y precios, 24/7. Concentrate en atender solo a los calificados',
    Mockup: WhatsAppMockup,
  },
  {
    number: '02',
    slug: 'automatizacion',
    title: 'Automatización de procesos',
    description: 'Audito cómo trabaja tu equipo comercial o de gestión de propiedades, identifico dónde se pierde tiempo y lo elimino con software.',
    Mockup: AutomationMockup,
  },
  {
    number: '03',
    slug: 'sistemas-medida',
    title: 'Sistemas a medida',
    description: 'CRMs inmobiliarios, dashboards de portafolio y herramientas internas conectadas a lo que ya usas.',
    Mockup: CodeSnippetMockup,
  },
  {
    number: '04',
    slug: 'seo-performance',
    title: 'SEO y performance',
    description: 'Que tus propiedades aparezcan en Google antes que las de tu competencia.',
    Mockup: GoogleSerpMockup,
  },
  {
    number: '05',
    slug: 'producto-digital',
    title: 'Producto digital completo',
    description: 'De idea a MVP funcionando, como hice con mis Startups.',
    Mockup: ProductMockup,
  },
];

const WAVE_BAR_COUNT = 60;
const BARS_PER_SEGMENT = WAVE_BAR_COUNT / SERVICES.length;
const WAVE_HEIGHTS = Array.from({ length: WAVE_BAR_COUNT }, (_, i) => {
  const v = Math.sin(i * 0.45) * 0.28 + Math.sin(i * 0.13) * 0.45 + Math.sin(i * 0.07) * 0.2 + 0.55;
  return Math.max(0.22, Math.min(1, v));
});

export const ServicesSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [maxTranslate, setMaxTranslate] = useState(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const measure = () => {
      if (trackRef.current) {
        setMaxTranslate(Math.max(0, trackRef.current.scrollWidth - window.innerWidth));
      }
    };
    measure();
    window.addEventListener('resize', measure);
    return () => window.removeEventListener('resize', measure);
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  const x = useTransform(scrollYProgress, [0, 1], [0, -maxTranslate]);

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    const idx = Math.min(SERVICES.length - 1, Math.max(0, Math.round(v * (SERVICES.length - 1))));
    setActiveIndex(idx);
  });

  const scrollToIndex = (idx: number) => {
    const section = sectionRef.current;
    if (!section) return;
    const progress = idx / (SERVICES.length - 1);
    const rect = section.getBoundingClientRect();
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    const targetY = window.scrollY + rect.top + progress * scrollableHeight;
    window.scrollTo({ top: targetY, behavior: 'smooth' });
  };

  const active = SERVICES[activeIndex];

  return (
    <section
      ref={sectionRef}
      id="servicios"
      className="relative bg-white text-ink"
      style={{ height: `${SERVICES.length * 70}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-y-auto flex flex-col justify-center-safe pt-24 pb-6 sm:pt-28 sm:pb-10">
        <div className="max-w-4xl mx-auto px-6 w-full shrink-0">
          <Reveal as="h2" className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-ink leading-[1.1]">
            Qué construyo para ti
          </Reveal>
          <Reveal as="p" delay={0.1} className="mt-4 text-base sm:text-lg text-ink/70 font-light">
            Si tu inmobiliaria, agencia o administración tiene un problema que se resuelve con tecnología, lo construyo.
          </Reveal>
        </div>

        <div className="mt-6 sm:mt-8 overflow-hidden shrink-0">
          <motion.div ref={trackRef} style={{ x }} className="flex gap-5 sm:gap-6 px-6 sm:px-[10vw] w-max">
            {SERVICES.map((service, idx) => {
              const { Mockup } = service;
              const isActive = idx === activeIndex;
              return (
                <div
                  key={service.slug}
                  className="relative shrink-0 w-[80vw] sm:w-[420px] md:w-[500px] lg:w-[580px] h-[clamp(180px,36vh,420px)] sm:h-[clamp(200px,38vh,420px)] md:h-[clamp(220px,40vh,420px)] rounded-2xl overflow-hidden bg-ink transition-all duration-300"
                  style={{ opacity: isActive ? 1 : 0.45, transform: isActive ? 'scale(1)' : 'scale(0.93)' }}
                >
                  <Mockup />
                </div>
              );
            })}
          </motion.div>
        </div>

        <div className="max-w-2xl mx-auto px-6 mt-4 sm:mt-6 text-center min-h-[90px] sm:min-h-[100px] shrink-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={active.slug}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25 }}
            >
              <span className="text-xs font-mono text-ink/40">{active.number}</span>
              <h3 className="mt-1 font-serif text-2xl sm:text-3xl font-light tracking-tight text-ink">{active.title}</h3>
              <p className="mt-2 text-sm sm:text-base text-ink/70 font-light leading-relaxed max-w-xl mx-auto">
                {active.description}
              </p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex items-center justify-center gap-[3px] sm:gap-1 mt-4 sm:mt-6 h-6 sm:h-8 px-6 shrink-0">
          {WAVE_HEIGHTS.map((h, i) => {
            const segment = Math.floor(i / BARS_PER_SEGMENT);
            const isActiveSegment = segment === activeIndex;
            return (
              <button
                key={i}
                type="button"
                onClick={() => scrollToIndex(segment)}
                aria-label={`Ir a ${SERVICES[segment]?.title ?? ''}`}
                className={`w-[3px] sm:w-1 rounded-full transition-colors duration-300 ${
                  isActiveSegment ? 'bg-ink' : 'bg-ink/20 hover:bg-ink/40'
                }`}
                style={{ height: `${h * 100}%` }}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};
