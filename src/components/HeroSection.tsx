import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight, ArrowUp, TiktokLogo, LinkedinLogo, InstagramLogo } from '@phosphor-icons/react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Reveal } from './Reveal';
import { Magnetic } from './Magnetic';
import { trackEvent } from '../lib/analytics';

const SOCIAL_LINKS = [
  { href: 'https://www.instagram.com/yanel.un/', label: 'Instagram', icon: InstagramLogo },
  { href: 'https://www.linkedin.com/in/yanel-ulpiano-n/', label: 'LinkedIn', icon: LinkedinLogo },
  { href: 'https://www.tiktok.com/@yanel.un', label: 'TikTok', icon: TiktokLogo },
];

const EXAMPLE_QUERIES = [
  '¿Cómo automatizo el seguimiento de mis leads inmobiliarios?',
  'Necesito un CRM que priorice mis mejores prospectos.',
  '¿Cómo hago que mis propiedades aparezcan primero en Google?',
  'Quiero un asistente que responda por WhatsApp 24/7.',
];

export const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const photoY = useTransform(scrollYProgress, [0, 1], ['0%', '18%']);

  const [queryIndex, setQueryIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');

  useEffect(() => {
    const fullText = EXAMPLE_QUERIES[queryIndex];
    let charIndex = 0;

    const typingInterval = setInterval(() => {
      if (charIndex <= fullText.length) {
        setDisplayedText(fullText.slice(0, charIndex));
        charIndex++;
      } else {
        clearInterval(typingInterval);
      }
    }, 40);

    const pauseTimeout = setTimeout(() => {
      setQueryIndex((prev) => (prev + 1) % EXAMPLE_QUERIES.length);
    }, 4000);

    return () => {
      clearInterval(typingInterval);
      clearTimeout(pauseTimeout);
    };
  }, [queryIndex]);

  return (
    <section ref={sectionRef} id="inicio" className="relative min-h-screen pt-40 sm:pt-48 pb-24 flex flex-col items-center justify-center text-center bg-white overflow-hidden">

      {/* Foto de portada con efecto espejo (reflejo), parallax al scrollear, sin overlay blanco */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div style={{ y: photoY }} className="absolute inset-0">
          <div className="absolute inset-x-0 top-0 h-1/2 overflow-hidden">
            <img src="/hero-cover.jpg" alt="" className="w-full h-full object-cover" />
          </div>
          <div
            className="absolute inset-x-0 top-1/2 h-1/2 overflow-hidden"
            style={{
              maskImage: 'linear-gradient(to bottom, black, transparent)',
              WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
            }}
          >
            <img src="/hero-cover.jpg" alt="" className="w-full h-full object-cover scale-y-[-1]" />
          </div>
        </motion.div>
      </div>

      <div className="relative z-10 w-full max-w-4xl mx-auto px-4 sm:px-6 flex flex-col items-center">

        <Reveal
          as="h1"
          trigger="mount"
          delay={0.1}
          className="font-serif text-4xl sm:text-6xl md:text-7xl font-light text-white tracking-tight leading-[1.1] max-w-3xl [text-shadow:0_1px_24px_rgba(0,0,0,0.25)]"
        >
          Construyo el software que tu negocio inmobiliario necesita.
        </Reveal>

        <Reveal
          trigger="mount"
          delay={0.2}
          className="mt-6 text-sm sm:text-base text-white/80 font-light leading-relaxed max-w-xl [text-shadow:0_1px_16px_rgba(0,0,0,0.3)]"
        >
          Startup founder· Ingeniera de Sistemas · Ganadora Startup Perû 12G
        </Reveal>

        <Reveal trigger="mount" delay={0.3} className="mt-8 w-full max-w-xl">
          <div className="w-full flex items-center justify-between gap-3 rounded-full bg-white/15 backdrop-blur-xl border border-white/30 shadow-[0_8px_30px_rgba(0,0,0,0.3)] py-2 pl-6 pr-2">
            <span className="text-left text-white text-sm sm:text-base font-light truncate">
              {displayedText}
              <span className="inline-block w-0.5 h-4 ml-0.5 bg-white/80 align-middle animate-pulse motion-reduce:animate-none" />
            </span>
            <Magnetic className="inline-block shrink-0" strength={0.4}>
              <a
                href="#contacto"
                aria-label="Hablemos de tu negocio"
                onClick={() => trackEvent('cta_click', { cta_location: 'hero_search' })}
                className="w-10 h-10 rounded-full bg-white text-ink flex items-center justify-center shadow-sm hover:scale-105 active:scale-95 transition-transform duration-200"
              >
                <ArrowUp weight="bold" className="w-4 h-4" />
              </a>
            </Magnetic>
          </div>
        </Reveal>

        <Reveal trigger="mount" delay={0.4} className="mt-8">
          <Magnetic className="inline-block">
            <a
              href="#contacto"
              onClick={() => trackEvent('cta_click', { cta_location: 'hero_button' })}
              className="inline-flex items-center gap-2 px-7 py-3 rounded-full bg-ink text-white font-semibold text-sm sm:text-base shadow-md hover:bg-black active:scale-95 transition-colors duration-200"
            >
              <span>Hablemos de tu negocio</span>
              <ArrowRight weight="bold" className="w-4 h-4" />
            </a>
          </Magnetic>
        </Reveal>

        <Reveal trigger="mount" delay={0.5} className="mt-6 flex flex-col items-center gap-3">
          <span className="text-xs sm:text-sm text-white/70 font-mono tracking-wide [text-shadow:0_1px_16px_rgba(0,0,0,0.3)]">
            Yanel Ulpiano Nieto
          </span>
          <div className="flex items-center gap-4">
            {SOCIAL_LINKS.map((social) => {
              const Icon = social.icon;
              return (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  onClick={() => trackEvent('social_click', { network: social.label.toLowerCase(), location: 'hero' })}
                  className="text-white/70 hover:text-white transition-colors"
                >
                  <Icon weight="fill" className="w-5 h-5" />
                </a>
              );
            })}
          </div>
        </Reveal>

      </div>
    </section>
  );
};
