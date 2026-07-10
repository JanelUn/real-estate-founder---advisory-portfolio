import React from 'react';

const LINE_NUM = 'select-none text-white/20 text-right pr-3 sm:pr-4 w-6 sm:w-7 shrink-0';
const KEY = 'text-[#C586C0]';
const TYPE = 'text-[#4EC9B0]';
const STR = 'text-[#CE9178]';
const FN = 'text-[#DCDCAA]';
const PLAIN = 'text-[#D4D4D4]';
const COMMENT = 'text-[#6A9955]';

export const CodeSnippetMockup: React.FC = () => {
  return (
    <div className="absolute inset-0 bg-[#1E1E1E] flex flex-col">
      <div className="flex items-center gap-1.5 px-3.5 py-2.5 bg-[#252526] shrink-0">
        <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f]" />
        <span className="ml-3 text-[10px] text-white/40 font-mono">portafolio.ts</span>
      </div>

      <div className="flex-1 px-2 py-3 font-mono text-[10px] sm:text-[11px] leading-[1.7] overflow-hidden">
        <div className="flex"><span className={LINE_NUM}>1</span><span className={COMMENT}>// Sincroniza tu inventario con el CRM</span></div>
        <div className="flex"><span className={LINE_NUM}>2</span><span className={KEY}>interface</span><span className={PLAIN}> Property {'{'}</span></div>
        <div className="flex"><span className={LINE_NUM}>3</span><span className={PLAIN}>&nbsp;&nbsp;status: </span><span className={STR}>'available'</span><span className={PLAIN}> | </span><span className={STR}>'reserved'</span></div>
        <div className="flex"><span className={LINE_NUM}>4</span><span className={PLAIN}>&nbsp;&nbsp;price: </span><span className={TYPE}>number</span></div>
        <div className="flex"><span className={LINE_NUM}>5</span><span className={PLAIN}>{'}'}</span></div>
        <div className="flex"><span className={LINE_NUM}>6</span><span className={PLAIN}>&nbsp;</span></div>
        <div className="flex"><span className={LINE_NUM}>7</span><span className={KEY}>export async function</span><span className={FN}> syncListings</span><span className={PLAIN}>() {'{'}</span></div>
        <div className="flex"><span className={LINE_NUM}>8</span><span className={KEY}>&nbsp;&nbsp;const</span><span className={PLAIN}> leads = </span><span className={KEY}>await</span><span className={PLAIN}> crm.</span><span className={FN}>getHotLeads</span><span className={PLAIN}>()</span></div>
        <div className="flex"><span className={LINE_NUM}>9</span><span className={KEY}>&nbsp;&nbsp;return</span><span className={PLAIN}> leads.</span><span className={FN}>map</span><span className={PLAIN}>(assignAgent)</span></div>
        <div className="flex"><span className={LINE_NUM}>10</span><span className={PLAIN}>{'}'}</span></div>
      </div>
    </div>
  );
};
