import React from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Reveal } from './components/Reveal';
import { BookingWidget } from './components/BookingWidget';

export default function AgendaApp() {
  return (
    <div className="min-h-screen bg-white text-ink font-sans flex flex-col">
      <CustomCursor />

      <header className="py-6 px-6">
        <a href="/" className="font-semibold tracking-tight text-ink text-base">
          Yanel
        </a>
      </header>

      <main className="flex-1 flex items-center justify-center px-6 py-10">
        <div className="w-full max-w-xl">
          <Reveal as="div" trigger="mount" className="text-center mb-8">
            <h1 className="font-serif text-3xl sm:text-4xl font-light tracking-tight text-ink leading-[1.1]">
              Agenda una llamada conmigo
            </h1>
            <p className="mt-3 text-sm sm:text-base text-ink/70 font-light max-w-md mx-auto">
              Elige el servicio que te interesa y coordinemos 30 minutos en mi calendario.
            </p>
          </Reveal>

          <Reveal as="div" trigger="mount" delay={0.1}>
            <BookingWidget />
          </Reveal>
        </div>
      </main>

      <footer className="py-6 text-center text-xs text-ink/40 font-mono">
        Yanel — Lima, Perú
      </footer>
    </div>
  );
}
