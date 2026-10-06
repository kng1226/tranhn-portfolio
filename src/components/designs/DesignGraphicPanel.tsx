/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DesignItemData } from './DesignModal';
import { ArtworkRenderer } from './artwork/ArtworkRenderer';

interface DesignGraphicPanelProps {
  onSelectItem: (item: DesignItemData) => void;
  scrollOffset?: number;
}

export const DesignGraphicPanel: React.FC<DesignGraphicPanelProps> = ({
  onSelectItem,
  scrollOffset = 0,
}) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Exact graphic & illustration designs provided by user
  const graphicPieces: (DesignItemData & {
    widthClass: string;
    heightClass: string;
    posClass: string;
    rotateDeg: number;
    depthSpeed: number; // 0.75x, 1.0x, 1.15x
    dominantTone: string;
  })[] = [
      // 1. Artboard 1: "a little bites" Paper-Cut Otter Illustration
      {
        id: 'artboard-1',
        category: 'GRAPHIC',
        title: 'A Little Bite Logo',
        typeLabel: 'PAPER-CUT VECTOR ART',
        role: 'ILLUSTRATOR',
        year: '2024',
        tools: 'ILLUSTRATOR · VECTOR ARTBOARDS',
        context:
          'Whimsical paper-cut style illustration featuring the "a little bites" bakery otter chef, layering tactile paper textures and warm confectionery pastel tones.',
        widthClass: 'w-[16vw] min-w-[200px]',
        heightClass: 'h-[30vh] min-h-[220px]',
        posClass: 'left-[1%] top-[8%]',
        rotateDeg: -2,
        depthSpeed: 1.15,
        dominantTone: '#C7E3F8',
      },
      // 2. Final Countdown WS: Workshop "Finance on the Chain" 24 Hours Left
      {
        id: 'final-countdown-ws',
        category: 'GRAPHIC',
        title: 'Final Countdown WS',
        typeLabel: 'WORKSHOP KEY VISUAL',
        role: 'LEAD VISUAL DESIGNER',
        year: '2025',
        tools: 'PHOTOSHOP · ILLUSTRATOR',
        context:
          'Volcanic high-energy workshop countdown poster translating time urgency into bold glowing typography and deep magma chromatic contrasts.',
        widthClass: 'w-[18vw] min-w-[220px]',
        heightClass: 'h-[32vh] min-h-[230px]',
        posClass: 'left-[15%] top-[24%]',
        rotateDeg: 1.5,
        depthSpeed: 1.0,
        dominantTone: '#451307',
      },
      // 3. COVER: "MEET THE BITES" Bakery Menu Key Visual
      {
        id: 'cover',
        category: 'GRAPHIC',
        title: 'COVER',
        typeLabel: 'EDITORIAL MENU COVER',
        role: 'GRAPHIC DESIGNER',
        year: '2024',
        tools: 'ILLUSTRATOR · EDITORIAL GRID',
        context:
          'Sensory editorial bakery menu key visual combining warm roasted chocolate tones, vintage serif typography, and tactile pastry cards.',
        widthClass: 'w-[16vw] min-w-[200px]',
        heightClass: 'h-[29vh] min-h-[210px]',
        posClass: 'left-[23%] top-[4%]',
        rotateDeg: -2.5,
        depthSpeed: 0.85,
        dominantTone: '#2B1B15',
      },
      // 4. bài 4: "XPLORATORS 2025 Into the Fintech Realms" Editorial Film Strip Collage
      {
        id: 'bai-4',
        category: 'GRAPHIC',
        title: 'A Little Bite',
        typeLabel: 'EDITORIAL FILM STRIP',
        role: 'CREATIVE DESIGNER',
        year: '2025',
        tools: 'INDESIGN · FILM COMPOSITING',
        context:
          'Editorial multi-frame documentary film strip collage capturing stage moments, keynote pitching, and live tournament energy.',
        widthClass: 'w-[17vw] min-w-[210px]',
        heightClass: 'h-[32vh] min-h-[230px]',
        posClass: 'left-[36%] top-[12%]',
        rotateDeg: 2,
        depthSpeed: 1.15,
        dominantTone: '#111920',
      },
      // 5. final 10: "WEBINAR Unraveling the Cosmos of Blockchain"
      {
        id: 'final-10',
        category: 'GRAPHIC',
        title: 'Webinar',
        typeLabel: 'COSMIC WEBINAR POSTER',
        role: 'VISUAL DESIGNER',
        year: '2025',
        tools: 'ILLUSTRATOR · 3D COMPOSITING',
        context:
          'Luminous cosmic poster featuring modular translucent blockchain cubes floating amidst a deep ultraviolet nebula gradient.',
        widthClass: 'w-[16vw] min-w-[200px]',
        heightClass: 'h-[30vh] min-h-[220px]',
        posClass: 'left-[46%] top-[26%]',
        rotateDeg: -1.5,
        depthSpeed: 0.9,
        dominantTone: '#2A184D',
      },
      // 6. Quán quân: "Quán quân Xplorators 2025 SILENT LOOP" Championship KV
      {
        id: 'quan-quan',
        category: 'GRAPHIC',
        title: 'Quán quân',
        typeLabel: 'CHAMPIONSHIP KEY VISUAL',
        role: 'KEY VISUAL DESIGNER',
        year: '2025',
        tools: 'PHOTOSHOP · DIGITAL COMPOSITING',
        context:
          'Monumental golden celebration visual commemorating tournament champions "Silent Loop" with opulent lighting and award typography.',
        widthClass: 'w-[18vw] min-w-[220px]',
        heightClass: 'h-[33vh] min-h-[240px]',
        posClass: 'left-[55%] top-[6%]',
        rotateDeg: 2,
        depthSpeed: 1.15,
        dominantTone: '#331C0E',
      },
      // 7. final countdown: Workshop "Catalyze the AI Horizon" 06 Hours Left
      {
        id: 'final-countdown',
        category: 'GRAPHIC',
        title: 'final countdown',
        typeLabel: 'EVENT LAUNCH POSTER',
        role: 'GRAPHIC ARTIST',
        year: '2026',
        tools: 'ILLUSTRATOR · VECTOR COMPOSITION',
        context:
          'Desert dunes ambient workshop teaser featuring giant glowing numerical typography and refined classical serif headlines.',
        widthClass: 'w-[16vw] min-w-[200px]',
        heightClass: 'h-[30vh] min-h-[220px]',
        posClass: 'left-[66%] top-[22%]',
        rotateDeg: -2,
        depthSpeed: 0.85,
        dominantTone: '#1F1710',
      },
      // 8. final final: "XPLORATORS 2026 GRAND FINALE" Panoramic Key Visual
      {
        id: 'final-final',
        category: 'GRAPHIC',
        title: 'Market Overview',
        typeLabel: 'GRAND FINALE PANORAMA',
        role: 'LEAD ART DIRECTOR',
        year: '2026',
        tools: 'ILLUSTRATOR · PHOTOSHOP',
        context:
          'Master grand finale key visual uniting celestial compass iconography, event coordinate metadata, and premier sponsor locks.',
        widthClass: 'w-[22vw] min-w-[260px]',
        heightClass: 'h-[27vh] min-h-[200px]',
        posClass: 'left-[76%] top-[8%]',
        rotateDeg: 1,
        depthSpeed: 1.1,
        dominantTone: '#662858',
      },
      // 9. final final mở đơn 2: "CHAINX BYBIT TEC Go" Competition Launch
      {
        id: 'final-final-mo-don-2',
        category: 'GRAPHIC',
        title: 'ChainX',
        typeLabel: 'COMPETITION LAUNCH BANNER',
        role: 'KEY VISUAL DESIGNER',
        year: '2026',
        tools: 'PHOTOSHOP · 3D COMPOSITING',
        context:
          'Cyberpunk tech launch panorama featuring metallic futuristic typography, glowing cyber cubes, and strategic brand sponsor hierarchy.',
        widthClass: 'w-[22vw] min-w-[260px]',
        heightClass: 'h-[27vh] min-h-[200px]',
        posClass: 'left-[78%] top-[34%]',
        rotateDeg: -1.5,
        depthSpeed: 0.95,
        dominantTone: '#08152B',
      },
      // 10. Artboard 2: "Thông báo ĐIỀU CHỈNH LỊCH GIAO HÀNG" Service Notice
      {
        id: 'artboard-2',
        category: 'GRAPHIC',
        title: 'Notice',
        typeLabel: 'SERVICE NOTICE POSTER',
        role: 'GRAPHIC DESIGNER',
        year: '2024',
        tools: 'ILLUSTRATOR',
        context:
          'Charming blue gingham checkered service announcement poster featuring dimensional cloud shapes and postal letterform delivery iconography.',
        widthClass: 'w-[15vw] min-w-[190px]',
        heightClass: 'h-[27vh] min-h-[200px]',
        posClass: 'left-[10%] top-[46%]',
        rotateDeg: 2.5,
        depthSpeed: 0.8,
        dominantTone: '#DEECF8',
      },
      // 11. TEST 2: "BLOCKCHAIN & AI Làn sóng trăm tỷ..."
      {
        id: 'test-2',
        category: 'GRAPHIC',
        title: 'Xplorators 2026 Rewind',
        typeLabel: 'TECH ARTICLE INFOGRAPHIC',
        role: 'INFORMATION DESIGNER',
        year: '2025',
        tools: 'ILLUSTRATOR · VECTOR INFOGRAPHICS',
        context:
          'Isometric surging vector arrow and cyan grid matrix analyzing the market convergence of Blockchain and Artificial Intelligence.',
        widthClass: 'w-[16vw] min-w-[200px]',
        heightClass: 'h-[28vh] min-h-[210px]',
        posClass: 'left-[32%] top-[44%]',
        rotateDeg: -2,
        depthSpeed: 1.15,
        dominantTone: '#081226',
      },
      // 12. draft 5: "COMING SOON" Glowing Letter in Black Envelope
      {
        id: 'draft-5',
        category: 'GRAPHIC',
        title: 'Notice',
        typeLabel: 'TEASER ENVELOPE DESIGN',
        role: 'CONCEPT ARTIST',
        year: '2025',
        tools: 'PHOTOSHOP · LIGHTING COMPOSITING',
        context:
          'Mystery teaser reveal featuring an emissive cyan holographic card breaking out of a tactile dark black matte envelope.',
        widthClass: 'w-[16vw] min-w-[200px]',
        heightClass: 'h-[28vh] min-h-[210px]',
        posClass: 'left-[60%] top-[42%]',
        rotateDeg: 1.5,
        depthSpeed: 0.9,
        dominantTone: '#051821',
      },
    ];

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between px-[6vw] lg:px-[8vw] select-none pointer-events-auto">
      {/* Category Heading & Description (~24% of panel) */}
      <div className="w-full lg:w-[24vw] shrink-0 z-20 mb-8 lg:mb-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-serif italic text-[16px] text-[#F3E7D0] font-medium leading-none">
            03
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#F3E7D0] font-medium font-medium">
            GRAPHIC & ILLUSTRATION
          </span>
        </div>

        <h3 className="font-serif text-[42px] sm:text-[52px] lg:text-[64px] leading-[0.92] tracking-[-0.03em] text-[#F3E7D0] font-normal">
          Type,
          <br />
          tension & <span className="italic font-normal">paper.</span>
        </h3>

        <p className="mt-4 max-w-[340px] font-sans text-[13px] lg:text-[14px] leading-[1.65] text-[#F3E7D0] font-medium">
          Editorial posters, branding systems, vector illustrations, and event key visuals scattered like working proofs across a printmaker’s table.
        </p>

        <div className="mt-6 flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[#F3E7D0] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#173A46]/40" />
          <span>EDITORIAL · POSTERS · BRAND IDENTITY · ILLUSTRATION</span>
        </div>
      </div>

      {/* Editorial Collage Field (~76% of panel) */}
      <div className="relative w-full lg:w-[75vw] h-[62vh] sm:h-[70vh] overflow-hidden lg:overflow-visible">
        {graphicPieces.map((piece) => {
          const isHovered = hoveredId === piece.id;
          const parallaxShift = (scrollOffset * 40 * (piece.depthSpeed - 1)).toFixed(1);

          return (
            <button
              key={piece.id}
              onClick={() => onSelectItem(piece)}
              onMouseEnter={() => setHoveredId(piece.id)}
              onMouseLeave={() => setHoveredId(null)}
              type="button"
              aria-label={`Open ${piece.title} design`}
              style={{
                transform: `translateX(${parallaxShift}px) rotate(${isHovered ? 0 : piece.rotateDeg
                  }deg) scale(${isHovered ? 1.04 : 1}) translateY(${isHovered ? -8 : 0}px)`,
                zIndex: isHovered ? 50 : Math.round(piece.depthSpeed * 10),
              }}
              className={`absolute ${piece.posClass} ${piece.widthClass} ${piece.heightClass} rounded-2xl border border-black/10 bg-white/95 backdrop-blur-md shadow-[0_14px_36px_rgba(23,58,70,0.12)] hover:shadow-[0_28px_65px_rgba(23,58,70,0.26)] p-2.5 sm:p-3 flex flex-col justify-between text-left cursor-pointer transition-[transform,box-shadow,border-color] duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173A46]/60 group`}
            >
              {/* Poster Top Bar */}
              <div className="flex items-center justify-between border-b border-black/5 pb-1 px-1 shrink-0">
                <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#244B57] font-medium font-semibold truncate max-w-[120px]">
                  {piece.title}
                </span>
                <span className="font-sans text-[7px] uppercase tracking-[0.14em] text-[#244B57] font-medium">
                  {piece.typeLabel.split(' ')[0]}
                </span>
              </div>

              {/* Graphic Specimen Center: Real Artwork Live Preview */}
              <div className="relative my-1.5 flex-1 w-full rounded-xl overflow-hidden shadow-xs border border-black/5 bg-slate-100/50">
                <ArtworkRenderer
                  id={piece.id}
                  isThumbnail
                  className="w-full h-full pointer-events-none transform scale-[0.98] group-hover:scale-100 transition-transform duration-400"
                />
              </div>

              {/* Poster Footer with Hover Prompt */}
              <div className="flex items-center justify-between border-t border-black/5 pt-1 px-1 shrink-0">
                <span className="font-sans text-[7.5px] uppercase tracking-[0.14em] text-[#244B57] font-medium truncate max-w-[110px]">
                  {piece.typeLabel}
                </span>
                <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#173A46] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  EXPLORE ↗
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
