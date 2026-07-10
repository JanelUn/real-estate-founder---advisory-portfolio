import React from 'react';
import { House } from '@phosphor-icons/react';

const BARS = [40, 65, 50, 80, 60, 95, 70];

const STATS = [
  { label: 'Usuarios', value: '10.2k' },
  { label: 'Match rate', value: '94%' },
  { label: 'Ciudades', value: '3' },
];

export const ProductMockup: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-ink flex flex-col">
      <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10 shrink-0">
        <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center">
          <House weight="fill" className="w-3 h-3 text-ink" />
        </div>
        <span className="text-white text-xs font-semibold tracking-tight">Dommies</span>
      </div>

      <div className="flex-1 px-3.5 sm:px-4 py-4 flex flex-col gap-4 overflow-hidden">
        <div className="grid grid-cols-3 gap-2">
          {STATS.map((stat) => (
            <div key={stat.label} className="rounded-lg bg-white/5 border border-white/10 px-2 py-2">
              <p className="text-white text-xs sm:text-sm font-semibold">{stat.value}</p>
              <p className="text-white/40 text-[9px] sm:text-[10px]">{stat.label}</p>
            </div>
          ))}
        </div>

        <div className="flex-1 rounded-lg bg-white/5 border border-white/10 p-3 flex items-end gap-1.5 sm:gap-2">
          {BARS.map((h, idx) => (
            <div
              key={idx}
              className="flex-1 rounded-t-sm bg-gradient-to-t from-white/20 to-white/60"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
