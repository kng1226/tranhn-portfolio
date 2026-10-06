/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface VnDropsVisualProps {
  cursorX?: number; // -1 to 1 normalized
  cursorY?: number; // -1 to 1 normalized
  isHovered?: boolean;
  reducedMotion?: boolean;
}

export const VnDropsVisual: React.FC<VnDropsVisualProps> = ({
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

  const fgX = reducedMotion ? 0 : cursorX * 18;
  const fgY = reducedMotion ? 0 : cursorY * 12;

  return (
    <div className="relative w-full h-full overflow-hidden select-none flex items-center justify-center">
      {/* Background Soft Ambient Field (Layer 1: 0.15x) */}
      <div
        style={{
          transform: `translate3d(${bgX}px, ${bgY}px, 0)`,
          transition: 'transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div
          className={`w-44 h-44 rounded-full bg-gradient-to-tr from-[#173A46]/12 via-[#225768]/15 to-transparent blur-2xl transition-opacity duration-700 ${
            isHovered ? 'opacity-90 scale-110' : 'opacity-40'
          }`}
        />
      </div>

      {/* Dynamic Coordinate Grid & Pulse Lines */}
      <svg
        style={{
          transform: `translate3d(${bgX * 0.8}px, ${bgY * 0.8}px, 0)`,
          transition: 'transform 0.3s ease-out',
        }}
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 400 240"
      >
        <defs>
          <linearGradient id="curveFlow" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#173A46" stopOpacity="0.15" />
            <stop offset="50%" stopColor="#2F6676" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#173A46" stopOpacity="0.15" />
          </linearGradient>

          <filter id="nodeGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.5" />
          </filter>
        </defs>

        {/* Orbit paths & orbital coordinates */}
        <ellipse
          cx="200"
          cy="120"
          rx="140"
          ry="65"
          fill="none"
          stroke="#173A46"
          strokeWidth="0.8"
          strokeDasharray="3 5"
          opacity="0.22"
        />

        {/* Soft connecting bezier curves between Donor (Left Cluster) and Recipient (Right Cluster) */}
        <path
          d="M 110 115 C 160 85, 240 155, 290 125"
          fill="none"
          stroke="url(#curveFlow)"
          strokeWidth={isHovered ? 2 : 1.2}
          className="transition-all duration-500"
        />
        <path
          d="M 125 140 C 175 165, 225 75, 275 105"
          fill="none"
          stroke="url(#curveFlow)"
          strokeWidth="0.9"
          strokeDasharray="4 6"
          opacity="0.35"
        />

        {/* Tiny moving white pulse dots on flow curve */}
        <circle
          cx={isHovered ? 200 : 180}
          cy={isHovered ? 120 : 115}
          r="2.5"
          fill="#FFFFFF"
          opacity="0.85"
          className="transition-all duration-700 ease-out"
        />
        <circle
          cx={isHovered ? 230 : 210}
          cy={isHovered ? 122 : 128}
          r="1.8"
          fill="#F3E7D0"
          opacity="0.7"
          className="transition-all duration-700 ease-out"
        />
      </svg>

      {/* Main Specimen: Two Coordinated Node Clusters Connecting (Layer 2: 0.3x) */}
      <div
        style={{
          transform: `translate3d(${midX}px, ${midY}px, 0)`,
          transition: 'transform 0.3s cubic-bezier(0.22, 1, 0.36, 1)',
        }}
        className="relative z-10 flex items-center justify-between w-full max-w-[280px] px-2"
      >
        {/* Donor Cluster (Left Node) */}
        <div
          className={`flex flex-col items-center transition-transform duration-500 ${
            isHovered ? 'translate-x-2 scale-105' : 'translate-x-0'
          }`}
        >
          <div className="relative w-14 h-14 rounded-2xl bg-white/70 backdrop-blur-md border border-[#173A46]/20 shadow-[0_8px_20px_rgba(23,58,70,0.1)] flex items-center justify-center">
            {/* Concentric Signal Rings */}
            <div className="absolute inset-1 rounded-xl border border-[#173A46]/10" />
            <div className="w-4 h-4 rounded-full bg-[#173A46] flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-white" />
            </div>
            {/* Satellite Node */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full bg-[#357283]/80 border border-white" />
          </div>
          <span className="mt-2 font-sans text-[8px] uppercase tracking-[0.2em] text-[#244B57] font-medium font-medium">
            SUPPLY NODE
          </span>
        </div>

        {/* Central Matching Bridge / Intelligent Dispatch Sync */}
        <div className="flex flex-col items-center justify-center">
          <div
            className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-[#173A46]/15 shadow-sm transition-all duration-500 ${
              isHovered ? 'scale-110 bg-white/85 shadow-md' : ''
            }`}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#357283] animate-ping" />
            <span className="font-sans text-[8px] uppercase tracking-[0.22em] text-[#173A46] font-semibold">
              SYNC
            </span>
          </div>
          {/* Signal frequency waves */}
          <div className="mt-1 flex items-center gap-1 opacity-50">
            <span className="w-1 h-2 bg-[#173A46]/40 rounded-full" />
            <span className="w-1 h-3 bg-[#173A46]/60 rounded-full" />
            <span className="w-1 h-1.5 bg-[#173A46]/40 rounded-full" />
          </div>
        </div>

        {/* Recipient Cluster (Right Node) */}
        <div
          className={`flex flex-col items-center transition-transform duration-500 ${
            isHovered ? '-translate-x-2 scale-105' : 'translate-x-0'
          }`}
        >
          <div className="relative w-14 h-14 rounded-2xl bg-[#F3E7D0]/80 backdrop-blur-md border border-[#173A46]/20 shadow-[0_8px_20px_rgba(23,58,70,0.1)] flex items-center justify-center">
            {/* Concentric Signal Rings */}
            <div className="absolute inset-1 rounded-xl border border-[#173A46]/10" />
            <div className="w-4 h-4 rounded-full bg-[#205260] flex items-center justify-center shadow-sm">
              <div className="w-1.5 h-1.5 rounded-full bg-[#F3E7D0]" />
            </div>
            {/* Satellite Node */}
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full bg-[#173A46]/70 border border-white" />
          </div>
          <span className="mt-2 font-sans text-[8px] uppercase tracking-[0.2em] text-[#244B57] font-medium font-medium">
            DEMAND NODE
          </span>
        </div>
      </div>

      {/* Floating Foreground Flow Coordinate Particles (Layer 3: 0.5x) */}
      <div
        style={{
          transform: `translate3d(${fgX}px, ${fgY}px, 0)`,
          transition: 'transform 0.25s ease-out',
        }}
        className="absolute inset-0 pointer-events-none z-20 flex items-center justify-between px-16"
      >
        <div
          className={`w-2 h-2 rounded-full bg-white/80 shadow-sm transition-transform duration-500 ${
            isHovered ? 'scale-150 translate-x-2' : ''
          }`}
        />
        <div
          className={`w-2 h-2 rounded-full bg-[#173A46]/30 shadow-sm transition-transform duration-500 ${
            isHovered ? 'scale-150 -translate-x-2' : ''
          }`}
        />
      </div>
    </div>
  );
};
