import React from 'react';
import { TiktokLogo, LinkedinLogo, InstagramLogo } from '@phosphor-icons/react';
import { Reveal } from './Reveal';

const SITE_LINKS = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#trayectoria', label: 'Trayectoria' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#Startups', label: 'Startups' },
  { href: '#ecosistema', label: 'Ecosistema' },
  { href: '#contacto', label: 'Contacto' },
];

const SOCIAL_LINKS = [
  { href: 'https://www.tiktok.com/@yanel.un', label: 'TikTok', icon: TiktokLogo },
  { href: 'https://www.linkedin.com/in/yanel-ulpiano-n/', label: 'LinkedIn', icon: LinkedinLogo },
  { href: 'https://www.instagram.com/yanel.un/', label: 'Instagram', icon: InstagramLogo },
];

export const SiteFooter: React.FC = () => {
  return (
    <Reveal as="footer" y={12} className="py-12 bg-white">
      <div className="max-w-5xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6">
        <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-ink/70 font-medium">
          {SITE_LINKS.map((link) => (
            <a key={link.href} href={link.href} className="hover:text-ink transition-colors">
              {link.label}
            </a>
          ))}
        </nav>

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
                className="text-ink/60 hover:text-ink transition-colors"
              >
                <Icon weight="fill" className="w-4 h-4" />
              </a>
            );
          })}
        </div>

        <div className="text-xs text-ink/60 font-mono">Yanel — Lima, Perú</div>
      </div>
    </Reveal>
  );
};
