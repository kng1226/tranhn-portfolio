/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface IntelliLexVisualProps {
  cursorX?: number; // -1 to 1 normalized
  cursorY?: number; // -1 to 1 normalized
  isHovered?: boolean;
  reducedMotion?: boolean;
}

export const IntelliLexVisual: React.FC<IntelliLexVisualProps> = ({
  cursorX = 0,
  cursorY = 0,
  isHovered = false,
  reducedMotion = false,
}) => {
  // Parallax offsets based on depth layers
  const bgX = reducedMotion ? 0 : cursorX * 6;
  const bgY = reducedMotion ? 0 : cursorY * 4;

  const midX = reducedMotion ? 0 : cursorX * 12;
  const midY = reducedMotion ? 0 : cursorY * 8;

  const fgX = reducedMotion ? 0 : cursorX * 20;
  const fgY = reducedMotion ? 0 : cursorY * 14;

  return (
    <div className="relative w-full h-full overflow-hidden select-none flex items-center justify-center">
      {/* Background Soft Atmospheric Glow */}
      <div
        style={{
          transform: `translate3d(${bgX}px, ${bgY}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className={`w-44 h-44 rounded-full bg-gradient-to-tr from-[#173A46]/10 via-[#F3E7D0]/25 to-transparent blur-2xl transition-opacity duration-700 ${
            isHovered ? 'opacity-90 scale-110' : 'opacity-50'
          }`}
        />
      </div>

      {/* Background Abstract Letter Fragments / Drifting Paper Slips (Layer 1: 0.15x) */}
      <svg
        style={{
          transform: `translate3d(${bgX * 0.8}px, ${bgY * 0.8}px, 0)`,
          transition: 'transform 0.3s ease-out',
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 240"
      >
        <defs>
          <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" />
          </filter>
        </defs>

        {/* Soft typographic reading guides / hairline baseline tracks */}
        <line
          x1="50"
          y1="145"
          x2="350"
          y2="145"
          stroke="#173A46"
          strokeWidth="0.8"
          strokeDasharray="4 6"
          opacity="0.25"
        />
        <line
          x1="70"
          y1="95"
          x2="330"
          y2="95"
          stroke="#173A46"
          strokeWidth="0.6"
          strokeDasharray="2 4"
          opacity="0.18"
        />

        {/* Drifting glyph fragments: 'e', 'x', 'i', subtle accent marks */}
        <text
          x="75"
          y="85"
          className="font-serif italic text-[22px] fill-[#173A46]/30 select-none"
        >
          e
        </text>
        <text
          x="315"
          y="160"
          className="font-serif italic text-[24px] fill-[#173A46]/35 select-none"
        >
          x
        </text>
        <text
          x="90"
          y="185"
          className="font-sans text-[16px] font-light fill-[#173A46]/25 select-none"
        >
          i
        </text>
        <text
          x="300"
          y="75"
          className="font-serif text-[18px] fill-[#173A46]/25 select-none"
        >
          l
        </text>
      </svg>

      {/* Main Specimen: Central Transforming Letterforms (Layer 2: 0.3x) */}
      <div
        style={{
          transform: `translate3d(${midX}px, ${midY}px, 0)`,
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="relative z-10 flex items-center justify-center gap-4"
      >
        {/* Letter A - Elegant serif with subtle morphological optical shift */}
        <div
          className={`relative transition-all duration-500 ${
            isHovered ? '-translate-y-1 rotate-[-2deg]' : 'rotate-0'
          }`}
        >
          <span className="font-serif text-[62px] lg:text-[70px] text-[#173A46] font-normal leading-none tracking-tight inline-block select-none opacity-90 drop-shadow-[0_4px_12px_rgba(23,58,70,0.12)]">
            A
          </span>
          <span
            className={`absolute -top-1 -right-1 w-2 h-2 rounded-full bg-[#173A46]/40 transition-opacity duration-300 ${
              isHovered ? 'opacity-80 scale-125' : 'opacity-0'
            }`}
          />
        </div>

        {/* Connecting Lens / Typographic Bridge */}
        <div className="flex flex-col items-center justify-center px-1">
          <div
            className={`w-7 h-px bg-[#173A46]/40 transition-all duration-500 ${
              isHovered ? 'w-10 bg-[#173A46]/60' : 'w-7'
            }`}
          />
          <span className="font-sans text-[8px] uppercase tracking-[0.25em] text-[#244B57] font-medium my-1">
            AI · LEX
          </span>
          <div
            className={`w-7 h-px bg-[#173A46]/40 transition-all duration-500 ${
              isHovered ? 'w-10 bg-[#173A46]/60' : 'w-7'
            }`}
          />
        </div>

        {/* Letter D / B - The classic dyslexic mirror pair, subtly shifting into clarity */}
        <div
          className={`relative transition-all duration-500 ${
            isHovered ? 'translate-y-1 rotate-[3deg]' : 'rotate-0'
          }`}
        >
          <span className="font-serif italic text-[64px] lg:text-[72px] text-[#173A46] font-normal leading-none inline-block select-none opacity-85">
            d
          </span>
          {/* Subtle ghost mirror letter b behind */}
          <span className="absolute inset-0 font-serif italic text-[64px] lg:text-[72px] text-[#244B57] font-medium font-normal leading-none inline-block select-none -translate-x-1.5 pointer-events-none scale-x-[-1]">
            d
          </span>
        </div>
      </div>

      {/* Floating Foreground Details: Small paper-like slips & phoneme sparks (Layer 3: 0.5x) */}
      <div
        style={{
          transform: `translate3d(${fgX}px, ${fgY}px, 0)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute inset-0 pointer-events-none z-20 flex items-center justify-between px-12"
      >
        {/* Floating Paper Tile (Left) */}
        <div
          className={`w-9 h-9 rounded-xl bg-white/70 backdrop-blur-sm border border-[#173A46]/15 shadow-sm flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'scale-110 -rotate-6 shadow-md' : 'rotate-[-3deg]'
          }`}
        >
          <span className="font-serif text-[15px] text-[#173A46] font-medium select-none">
            P
          </span>
        </div>

        {/* Floating Paper Tile (Right) */}
        <div
          className={`w-9 h-9 rounded-xl bg-[#F3E7D0]/80 backdrop-blur-sm border border-[#173A46]/15 shadow-sm flex items-center justify-center transition-all duration-500 ${
            isHovered ? 'scale-110 rotate-6 shadow-md' : 'rotate-[4deg]'
          }`}
        >
          <span className="font-serif italic text-[16px] text-[#173A46] font-medium select-none">
            b
          </span>
        </div>
      </div>
    </div>
  );
};
