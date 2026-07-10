import React, { useState } from 'react';
import { Browsers, Buildings } from '@phosphor-icons/react';
import { Reveal, StaggerReveal, RevealItem } from './Reveal';

const PROJECTS = [
  {
    slug: 'dommies',
    icon: Browsers,
    title: 'Dommies — PropTech con IA',
    description: 'Matching de roommates por compatibilidad. Más de 10,000 usuarios, validada y financiada por el Estado peruano.',
  },
  {
    slug: 'propia',
    icon: Buildings,
    title: 'PropIA — CRM Inmobiliario con IA',
    description: 'Tu equipo pierde horas con leads que nunca van a comprar. Implemento un CRM que califica cada lead con IA y le dice a tus agentes a quién llamar primero. Instalado sobre tu operación actual.',
  },
];

const ProjectImage: React.FC<{ slug: string; icon: typeof Browsers }> = ({ slug, icon: Icon }) => {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div className="h-64 sm:h-72 rounded-3xl bg-mist/30 border border-line flex items-center justify-center">
        <Icon weight="light" className="w-12 h-12 text-ink/25" />
      </div>
    );
  }

  return (
    <div className="h-64 sm:h-72 rounded-3xl border border-line overflow-hidden">
      <img
        src={`/projects/${slug}.jpg`}
        alt=""
        loading="lazy"
        decoding="async"
        onError={() => setFailed(true)}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export const ProjectsSection: React.FC = () => {
  return (
    <section id="Startups" className="py-24 sm:py-32 bg-white text-ink border-b border-line/60">
      <div className="max-w-5xl mx-auto px-6">

        <Reveal as="p" className="text-center text-2xl sm:text-3xl font-light text-ink/80 max-w-2xl mx-auto mb-16 sm:mb-20 leading-snug">
          Construyo tecnología para quienes construyen ciudades.
        </Reveal>

        <Reveal as="h2" delay={0.1} className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-ink leading-[1.1] mb-12 sm:mb-16">
          Startups
        </Reveal>

        <StaggerReveal className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
          {PROJECTS.map((project) => (
            <RevealItem key={project.slug} className="flex flex-col">
              <ProjectImage slug={project.slug} icon={project.icon} />
              <div className="mt-6">
                <h3 className="text-xl sm:text-2xl font-normal tracking-tight text-ink">{project.title}</h3>
                <p className="mt-2.5 text-sm sm:text-base text-ink/70 font-light leading-relaxed">
                  {project.description}
                </p>
              </div>
            </RevealItem>
          ))}
        </StaggerReveal>

      </div>
    </section>
  );
};
