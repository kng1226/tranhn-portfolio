/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useCallback } from 'react';
import { DesignItemData } from './DesignModal';
import { ArtworkRenderer } from './artwork/ArtworkRenderer';

interface Design3DPanelProps {
  onSelectItem: (item: DesignItemData) => void;
  reducedMotion?: boolean;
}

export const Design3DPanel: React.FC<Design3DPanelProps> = ({ onSelectItem, reducedMotion = false }) => {
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (reducedMotion || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setTilt({
        x: -y * 2.5, // rotateX max ±2.5deg
        y: x * 3.0,  // rotateY max ±3.0deg
      });
    },
    [reducedMotion]
  );

  const handleMouseLeave = useCallback(() => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  }, []);

  // Primary 3D Piece: AVA — 3D Celestial Compass Key Visual
  const ava3DItem: DesignItemData = {
    id: 'ava',
    category: '3D',
    title: 'AVA',
    typeLabel: '3D CELESTIAL COMPASS · KEY VISUAL',
    role: '3D VISUAL ARTIST & MODELER',
    year: '2026',
    tools: 'BLENDER · 3D COMPOSITING · PROCEDURAL SHADERS',
    context:
      'Grand finale 3D key visual for Xplorators 2026. A 3D metallic and celestial glass astrolabe compass engineered with procedural subsurface scattering, orbital rings, and dynamic nebula lighting.',
  };

  // Supporting 3D Explorations
  const supportingItemA: DesignItemData = {
    id: 'final-10',
    category: '3D',
    title: 'final 10',
    typeLabel: '3D MODULAR BLOCKCHAIN CUBE',
    role: '3D MODELER & DESIGNER',
    year: '2025',
    tools: 'BLENDER · PROCEDURAL GLASS',
    context:
      'Cosmic webinar visual featuring a 3D floating modular blockchain cube with luminous translucent facets and volumetric glow.',
  };

  const supportingItemB: DesignItemData = {
    id: 'draft-5',
    category: '3D',
    title: 'draft 5',
    typeLabel: '3D TEASER ENVELOPE',
    role: '3D VISUAL DESIGNER',
    year: '2025',
    tools: 'BLENDER · LIGHTING & VOLUMETRICS',
    context:
      'High-contrast 3D teaser envelope with an emissive cyan holographic card emerging from a deep dark void.',
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between px-[6vw] lg:px-[8vw] select-none pointer-events-auto"
    >
      {/* ============================================================ */}
      {/* LEFT SIDE: CATEGORY TITLE / DESCRIPTION (~28% of panel)      */}
      {/* ============================================================ */}
      <div className="w-full lg:w-[28vw] shrink-0 z-20 mb-8 lg:mb-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-serif italic text-[16px] text-[#173A46]/45 leading-none">
            01
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#173A46]/60 font-medium">
            THREE DIMENSIONS
          </span>
        </div>

        <h3 className="font-serif text-[42px] sm:text-[52px] lg:text-[64px] leading-[0.92] tracking-[-0.03em] text-[#173A46] font-normal">
          Thinking
          <br />
          in <span className="italic font-normal">volume.</span>
        </h3>

        <p className="mt-4 max-w-[340px] font-sans text-[13px] lg:text-[14px] leading-[1.65] text-[#173A46]/68">
          Exploring form, space, material, and directional light beyond the flat plane.
        </p>

        <div className="mt-6 flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/45">
          <span className="w-1.5 h-1.5 rounded-full bg-[#173A46]/40" />
          <span>FORM · REFLECTION · LIGHT · SHADOW</span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* RIGHT SIDE: VISUAL 3D COMPOSITION (~72% of panel)           */}
      {/* ============================================================ */}
      <div className="relative w-full lg:w-[62vw] h-[55vh] sm:h-[64vh] flex items-center justify-center">
        {/* DOMINANT 3D WORK: AVA (~38-44vw wide, floats with soft shadow) */}
        <button
          onClick={() => onSelectItem(ava3DItem)}
          type="button"
          aria-label="View AVA 3D Celestial Compass Project"
          style={{
            transform: reducedMotion
              ? 'none'
              : `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(${
                  isHovered ? 1.02 : 1
                })`,
          }}
          className="relative z-10 w-[82vw] sm:w-[54vw] lg:w-[40vw] aspect-[4/3] rounded-[36px] bg-gradient-to-br from-white/45 via-[#F3E7D0]/25 to-[#173A46]/10 backdrop-blur-md p-4 sm:p-6 flex flex-col justify-between shadow-[0_28px_70px_rgba(23,58,70,0.14)] hover:shadow-[0_36px_90px_rgba(23,58,70,0.22)] transition-all duration-500 cursor-pointer group focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173A46]/50"
        >
          {/* Main 3D Specimen Render Chamber displaying AVA */}
          <div className="relative w-full h-full rounded-[26px] overflow-hidden shadow-inner flex items-center justify-center">
            <ArtworkRenderer id="ava" className="w-full h-full transition-transform duration-700 group-hover:scale-[1.03]" />

            {/* Floating 3D Badge on hover */}
            <div className="absolute top-4 left-4 z-20">
              <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20 font-mono text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#FFD7F0]">
                3D KEY VISUAL
              </span>
            </div>

            {/* Metadata overlay on hover */}
            <div className="absolute bottom-3 left-4 right-4 z-20 flex items-center justify-between p-2 rounded-xl bg-black/40 backdrop-blur-md border border-white/15 pointer-events-none">
              <div className="text-left">
                <span className="font-serif text-[12px] sm:text-[14px] text-white font-medium block leading-tight">
                  AVA — Celestial Compass
                </span>
                <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-white/70">
                  XPLORATORS 2026 GRAND FINALE
                </span>
              </div>
              <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-white font-medium bg-white/20 px-2.5 py-1 rounded-full group-hover:bg-white/30 transition-colors">
                OPEN FULL STORY ↗
              </span>
            </div>
          </div>
        </button>

        {/* SUPPORTING 3D VIEW A (Upper-right floating accent): final 10 */}
        <button
          onClick={() => onSelectItem(supportingItemA)}
          type="button"
          aria-label="View final 10 3D Modular Blockchain Cube"
          style={{
            transform: reducedMotion
              ? 'none'
              : `translate3d(${tilt.y * -8}px, ${tilt.x * -6}px, 0)`,
          }}
          className="hidden sm:flex absolute -top-2 right-2 lg:right-4 z-20 w-36 lg:w-44 aspect-square rounded-[24px] bg-white/40 backdrop-blur-md border border-[#F3E7D0]/50 p-2.5 shadow-[0_16px_40px_rgba(23,58,70,0.12)] hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer flex-col justify-between text-left group"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-xs">
            <ArtworkRenderer id="final-10" isThumbnail className="w-full h-full" />
          </div>
          <div className="mt-1 flex items-center justify-between px-1">
            <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#173A46]/70 truncate font-medium">
              final 10
            </span>
            <span className="text-[9px] text-[#173A46]/50 group-hover:translate-x-0.5 transition-transform">↗</span>
          </div>
        </button>

        {/* SUPPORTING 3D VIEW B (Lower-left floating accent): draft 5 */}
        <button
          onClick={() => onSelectItem(supportingItemB)}
          type="button"
          aria-label="View draft 5 3D Teaser Envelope"
          style={{
            transform: reducedMotion
              ? 'none'
              : `translate3d(${tilt.y * 6}px, ${tilt.x * 5}px, 0)`,
          }}
          className="hidden sm:flex absolute -bottom-2 left-2 lg:left-4 z-20 w-36 lg:w-44 aspect-square rounded-[24px] bg-white/40 backdrop-blur-md border border-[#F3E7D0]/50 p-2.5 shadow-[0_16px_40px_rgba(23,58,70,0.12)] hover:scale-105 hover:shadow-xl transition-all duration-500 cursor-pointer flex-col justify-between text-left group"
        >
          <div className="w-full h-full rounded-2xl overflow-hidden shadow-xs">
            <ArtworkRenderer id="draft-5" isThumbnail className="w-full h-full" />
          </div>
          <div className="mt-1 flex items-center justify-between px-1">
            <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#173A46]/70 truncate font-medium">
              draft 5
            </span>
            <span className="text-[9px] text-[#173A46]/50 group-hover:translate-x-0.5 transition-transform">↗</span>
          </div>
        </button>
      </div>
    </div>
  );
};
