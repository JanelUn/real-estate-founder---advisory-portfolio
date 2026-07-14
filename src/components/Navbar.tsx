import React from 'react';
import { Reveal } from './Reveal';
import { trackEvent } from '../lib/analytics';

const NAV_LINKS = [
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#Startups', label: 'Startups' },
  { href: '#ecosistema', label: 'Ecosistema' },
];

export const Navbar: React.FC = () => {
  return (
    <Reveal
      as="header"
      trigger="mount"
      y={-16}
      className="fixed top-4 sm:top-6 left-0 right-0 z-50 px-4 sm:px-6"
    >
      <div className="relative max-w-4xl mx-auto flex items-center justify-between gap-3 rounded-full bg-white/70 backdrop-blur-xl border border-white/50 shadow-[0_1px_1px_rgba(255,255,255,0.7)_inset,0_20px_40px_-8px_rgba(0,0,0,0.35),0_4px_12px_-2px_rgba(0,0,0,0.2)] pl-5 pr-2 py-2 overflow-hidden">

        {/* Efecto espejo: brillo especular que simula vidrio/reflejo */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-b from-white/70 via-white/10 to-transparent pointer-events-none" />

        <a href="#inicio" className="relative font-semibold tracking-tight text-ink text-base shrink-0">
          Yanel
        </a>

        <nav className="relative hidden md:flex items-center gap-7 text-sm font-medium text-ink/70">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-ink transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contacto"
          onClick={() => trackEvent('cta_click', { cta_location: 'navbar' })}
          className="relative shrink-0 inline-flex items-center px-5 py-2 rounded-full bg-ink hover:bg-black text-white text-xs sm:text-sm font-semibold shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all duration-200 active:scale-95"
        >
          Hablemos
        </a>
      </div>
    </Reveal>
  );
};
