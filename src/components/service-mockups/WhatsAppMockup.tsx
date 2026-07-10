import React from 'react';
import { Checks } from '@phosphor-icons/react';
import { WhatsAppIcon } from '../icons/BrandIcons';

export const WhatsAppMockup: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[#0B141A] flex flex-col">
      <div className="flex items-center gap-2.5 px-4 py-3 bg-[#202C33] shrink-0">
        <div className="w-8 h-8 rounded-full bg-white/15 flex items-center justify-center text-white text-xs font-semibold">
          C
        </div>
        <div className="min-w-0">
          <p className="text-white text-xs sm:text-sm font-medium truncate">Cliente — Miraflores</p>
          <p className="text-white/40 text-[10px]">en línea</p>
        </div>
        <WhatsAppIcon className="w-4 h-4 ml-auto shrink-0" />
      </div>

      <div className="px-3 sm:px-4 pt-4 pb-24 sm:pb-28 space-y-2.5 overflow-hidden">
        <div className="flex justify-start">
          <div className="max-w-[80%] bg-[#202C33] text-white/90 text-[11px] sm:text-xs rounded-lg rounded-tl-none px-3 py-2 leading-relaxed">
            Hola! Vi el depa de 2 dorms en Miraflores, ¿sigue disponible?
          </div>
        </div>

        <div className="flex justify-end">
          <div className="max-w-[85%] bg-[#005C4B] text-white/95 text-[11px] sm:text-xs rounded-lg rounded-tr-none px-3 py-2 leading-relaxed">
            <p>¡Sí, sigue disponible! Tiene vista al parque.</p>
            <div className="flex justify-end mt-1">
              <Checks weight="bold" className="w-3.5 h-3.5 text-[#53BDEB]" />
            </div>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-[#202C33] rounded-lg rounded-tl-none px-3 py-2 flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.3s] motion-reduce:animate-none" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce [animation-delay:-0.15s] motion-reduce:animate-none" />
            <span className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce motion-reduce:animate-none" />
          </div>
        </div>
      </div>
    </div>
  );
};
