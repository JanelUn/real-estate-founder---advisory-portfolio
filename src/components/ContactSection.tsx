import React from 'react';
import { Reveal } from './Reveal';
import { BookingWidget } from './BookingWidget';

export const ContactSection: React.FC = () => {
  return (
    <section id="contacto" className="relative py-24 sm:py-32 text-white border-b border-line/60 overflow-hidden">

      {/* Foto de fondo con overlay oscuro: bookend visual con el Hero */}
      <div className="absolute inset-0 z-0">
        <img src="/hero-cover.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-ink/85" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">

          <Reveal as="div" className="lg:col-span-5 space-y-5 lg:sticky lg:top-32">
            <h2 className="font-serif text-3xl sm:text-5xl font-light tracking-tight text-white leading-[1.1]">
              Trabajo con pocos proyectos a la vez.
            </h2>
            <p className="text-sm sm:text-base text-white/70 font-light leading-relaxed">
              La mayoría de mis clientes llegan por referidos. Trabajo con inmobiliarias, , agentes top y fondos que ya están operando y quieren escalar con tecnología. Elige el servicio que te interesa y agenda 30 minutos directo en mi calendario.
            </p>
          </Reveal>

          <Reveal as="div" delay={0.1} className="lg:col-span-7">
            <BookingWidget />
          </Reveal>

        </div>
      </div>

    </section>
  );
};
