import React, { useEffect, useMemo } from 'react';
import { CustomCursor } from './components/CustomCursor';
import { Reveal } from './components/Reveal';
import { BookingWidget } from './components/BookingWidget';
import { isEmbedMode, notifyParent } from './lib/embed';

export default function AgendaApp() {
  const embed = useMemo(() => isEmbedMode(), []);

  // En modo embed avisamos al padre cada vez que cambia el alto del contenido,
  // para que el <iframe> que nos aloja pueda ajustar su tamaño sin scrollbar interno.
  useEffect(() => {
    if (!embed) return;
    const root = document.documentElement;
    const postHeight = () => notifyParent('resize', { height: root.scrollHeight });
    const observer = new ResizeObserver(postHeight);
    observer.observe(root);
    postHeight();
    return () => observer.disconnect();
  }, [embed]);

  return (
    <div className="min-h-screen bg-white text-ink font-sans flex flex-col">
      {!embed && <CustomCursor />}

      {!embed && (
        <header className="py-6 px-6">
          <a href="/" className="font-semibold tracking-tight text-ink text-base">
            Yanel
          </a>
        </header>
      )}

      <main className={`flex-1 flex items-center justify-center px-6 ${embed ? 'py-6' : 'py-10'}`}>
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

      {!embed && (
        <footer className="py-6 text-center text-xs text-ink/40 font-mono">
          Yanel — Lima, Perú
        </footer>
      )}
    </div>
  );
}
