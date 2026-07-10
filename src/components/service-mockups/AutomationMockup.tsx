import React from 'react';
import { Lightning } from '@phosphor-icons/react';
import {
  WhatsAppIcon,
  GoogleSheetsIcon,
  NotionIcon,
  HubSpotIcon,
  ZapierIcon,
  GoogleCalendarIcon,
  GmailIcon,
  AirtableIcon,
} from '../icons/BrandIcons';

const NODES = [
  { Icon: WhatsAppIcon, x: 18, y: 16 },
  { Icon: GmailIcon, x: 82, y: 14 },
  { Icon: ZapierIcon, x: 50, y: 7 },
  { Icon: GoogleCalendarIcon, x: 12, y: 44 },
  { Icon: NotionIcon, x: 88, y: 41 },
  { Icon: GoogleSheetsIcon, x: 22, y: 67 },
  { Icon: HubSpotIcon, x: 78, y: 65 },
  { Icon: AirtableIcon, x: 50, y: 73 },
];

const HUB = { x: 50, y: 41 };

export const AutomationMockup: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-ink overflow-hidden">
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
      >
        {NODES.map((node, idx) => (
          <line
            key={idx}
            x1={HUB.x}
            y1={HUB.y}
            x2={node.x}
            y2={node.y}
            stroke="rgba(255,255,255,0.16)"
            strokeWidth="0.3"
            vectorEffect="non-scaling-stroke"
          />
        ))}
      </svg>

      <div
        className="absolute w-11 h-11 sm:w-14 sm:h-14 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.35)]"
        style={{ left: `${HUB.x}%`, top: `${HUB.y}%` }}
      >
        <Lightning weight="fill" className="w-5 h-5 sm:w-6 sm:h-6 text-ink" />
      </div>

      {NODES.map(({ Icon, x, y }, idx) => (
        <div
          key={idx}
          className="absolute w-8 h-8 sm:w-10 sm:h-10 -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10 flex items-center justify-center"
          style={{ left: `${x}%`, top: `${y}%` }}
        >
          <Icon className="w-4 h-4 sm:w-5 sm:h-5" />
        </div>
      ))}
    </div>
  );
};
