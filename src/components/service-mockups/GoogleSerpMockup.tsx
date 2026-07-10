import React from 'react';
import { MagnifyingGlass } from '@phosphor-icons/react';

const GoogleWordmark: React.FC = () => (
  <span className="font-sans text-lg sm:text-xl font-medium tracking-tight">
    <span style={{ color: '#4285F4' }}>G</span>
    <span style={{ color: '#EA4335' }}>o</span>
    <span style={{ color: '#FBBC05' }}>o</span>
    <span style={{ color: '#4285F4' }}>g</span>
    <span style={{ color: '#34A853' }}>l</span>
    <span style={{ color: '#EA4335' }}>e</span>
  </span>
);

export const GoogleSerpMockup: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[#F7F8FA] flex flex-col">
      <div className="flex flex-col items-center gap-3 px-4 pt-6 pb-4 shrink-0">
        <GoogleWordmark />
        <div className="w-full max-w-xs flex items-center gap-2 rounded-full border border-black/10 bg-white px-3.5 py-2 shadow-sm">
          <MagnifyingGlass weight="bold" className="w-3.5 h-3.5 text-black/40 shrink-0" />
          <span className="text-[11px] text-black/60 truncate">software inmobiliario a medida</span>
        </div>
      </div>

      <div className="flex-1 px-5 sm:px-8 pt-1 space-y-4 overflow-hidden">
        <div>
          <p className="text-[10px] text-[#202124]/50">yanel.dev</p>
          <p className="text-[#1a0dab] text-xs sm:text-sm leading-snug">Yanel — Software y agentes de IA para inmobiliarias</p>
          <p className="text-[10px] sm:text-[11px] text-black/60 leading-snug mt-0.5">
            Agentes de IA, automatización y sistemas a medida para que tu inmobiliaria cierre más ventas...
          </p>
        </div>
        <div className="opacity-40">
          <p className="text-[10px] text-[#202124]/50">competidor.com</p>
          <p className="text-[#1a0dab] text-xs sm:text-sm leading-snug">Software genérico para real estate</p>
        </div>
        <div className="opacity-25">
          <p className="text-[10px] text-[#202124]/50">otro-competidor.com</p>
          <p className="text-[#1a0dab] text-xs sm:text-sm leading-snug">CRM inmobiliario estándar</p>
        </div>
      </div>
    </div>
  );
};
