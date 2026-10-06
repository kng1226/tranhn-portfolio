/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DesignItemData } from './DesignModal';
import { ArtworkRenderer } from './artwork/ArtworkRenderer';

interface DesignUIUXPanelProps {
  onSelectItem: (item: DesignItemData) => void;
}

export const DesignUIUXPanel: React.FC<DesignUIUXPanelProps> = ({ onSelectItem }) => {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const uiItems: (DesignItemData & {
    accentColor: string;
    previewSubtitle: string;
    positionClass: string;
    sizeClass: string;
  })[] = [
      {
        id: 'gresset',
        category: 'UI/UX',
        title: 'Gresset',
        typeLabel: 'SUSTAINABILITY PLATFORM',
        role: 'PRODUCT DESIGNER · UI/UX',
        year: '2023',
        tools: 'FIGMA · DESIGN SYSTEMS',
        context:
          'A digital carbon tracking and environmental stewardship interface mapping real-time resource consumption into actionable impact loops.',
        accentColor: '#43B02A',
        previewSubtitle: 'Eco Thrifting & Recycling',
        positionClass: 'left-[1%] top-[12%]',
        sizeClass: 'w-[19vw] h-[36vh] min-w-[220px] min-h-[260px]',
      },
      {
        id: 'main',
        category: 'UI/UX',
        title: 'TamGiao',
        typeLabel: 'EMOTION TRACKING DASHBOARD',
        role: 'UI/UX DESIGNER',
        year: '2023',
        tools: 'FIGMA · AUTO-LAYOUT · PROTOTYPING',
        context:
          'Primary operations console designed for rapid emotional state tracking, daily scheduling, and low-latency health task processing.',
        accentColor: '#2E68F8',
        previewSubtitle: 'Emotion & Routine Console',
        positionClass: 'left-[17%] top-[6%]',
        sizeClass: 'w-[20vw] h-[37vh] min-w-[230px] min-h-[270px]',
      },
      {
        id: 'main1',
        category: 'UI/UX',
        title: 'TamGiao',
        typeLabel: 'MEDICATION TIMELINE',
        role: 'UI/UX ARCHITECT',
        year: '2023',
        tools: 'FIGMA · USER TESTING',
        context:
          'Iterative refinement of the daily routine and medication timeline architecture, organizing multi-tenant operational streams into clear chronological cards.',
        accentColor: '#5B21B6',
        previewSubtitle: 'Calendar & Dosing Schedule',
        positionClass: 'left-[33%] top-[20%]',
        sizeClass: 'w-[20vw] h-[37vh] min-w-[230px] min-h-[270px]',
      },
      {
        id: 'intellilex',
        category: 'UI/UX',
        title: 'Intellilex',
        typeLabel: 'AI FOR DYSLEXIA SUPPORT',
        role: 'PROJECT MANAGER · UI/UX LEAD',
        year: '2024',
        tools: 'FIGMA · ACCESSIBILITY DESIGN',
        context:
          'A specialized accessibility reading environment featuring dynamic font weighting, phoneme separation, and adaptive pacing algorithms for dyslexic learners.',
        accentColor: '#005BAA',
        previewSubtitle: 'Dyslexia Reading Companion',
        positionClass: 'left-[50%] top-[8%]',
        sizeClass: 'w-[24vw] h-[38vh] min-w-[260px] min-h-[280px]',
      },
      {
        id: 'onboarding',
        category: 'UI/UX',
        title: 'VnDrops',
        typeLabel: 'ACTIVATION JOURNEY',
        role: 'PRODUCT DESIGNER',
        year: '2023',
        tools: 'FIGMA · USER JOURNEY MAPPING',
        context:
          'A progressive disclosure user orientation sequence eliminating cognitive overwhelm through tactile stepped milestones and 3D donor heart iconography.',
        accentColor: '#C81E1E',
        previewSubtitle: 'VN Drops Welcome Sequence',
        positionClass: 'left-[68%] top-[22%]',
        sizeClass: 'w-[19vw] h-[36vh] min-w-[220px] min-h-[260px]',
      },
      {
        id: 'vndrops',
        category: 'UI/UX',
        title: 'VnDrops',
        typeLabel: 'AUTOMATIC BLOOD DONATION',
        role: 'PROJECT MANAGER · UI/UX DESIGN',
        year: '2023',
        tools: 'FIGMA · PROTOTYPING · USER RESEARCH',
        context:
          'Emergency donor-recipient matching interface providing immediate dispatch clarity, urgent blood group SOS alerts, and verified transit routes.',
        accentColor: '#DC2626',
        previewSubtitle: 'Emergency Blood SOS Dispatch',
        positionClass: 'left-[82%] top-[10%]',
        sizeClass: 'w-[19vw] h-[38vh] min-w-[220px] min-h-[280px]',
      },
    ];

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between px-[6vw] lg:px-[8vw] select-none pointer-events-auto">
      {/* Category Heading & Description (~25% of panel) */}
      <div className="w-full lg:w-[25vw] shrink-0 z-20 mb-8 lg:mb-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-serif italic text-[16px] text-[#F3E7D0] font-medium leading-none">
            02
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#F3E7D0] font-medium font-medium">
            DIGITAL INTERFACES
          </span>
        </div>

        <h3 className="font-serif text-[42px] sm:text-[52px] lg:text-[64px] leading-[0.92] tracking-[-0.03em] text-[#F3E7D0] font-normal">
          Interface
          <br />
          as a <span className="italic font-normal">dialogue.</span>
        </h3>

        <p className="mt-4 max-w-[340px] font-sans text-[13px] lg:text-[14px] leading-[1.65] text-[#F3E7D0] font-medium">
          Layered software surfaces built around clarity, low friction, accessibility, and responsive human workflows.
        </p>

        <div className="mt-6 flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[#F3E7D0] font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-[#173A46]/40" />
          <span>ACCESSIBILITY · INFORMATION ARCHITECTURE · DESIGN SYSTEMS</span>
        </div>
      </div>

      {/* Layered Interface Wall (~75% of panel) */}
      <div className="relative w-full lg:w-[72vw] h-[60vh] sm:h-[68vh] overflow-hidden lg:overflow-visible">
        {uiItems.map((item) => {
          const isItemHovered = hoveredId === item.id;
          const isAnyHovered = hoveredId !== null;
          const isDimmed = isAnyHovered && !isItemHovered;

          return (
            <button
              key={item.id}
              onClick={() => onSelectItem(item)}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              type="button"
              aria-label={`Open ${item.title} UI UX design`}
              style={{
                zIndex: isItemHovered ? 40 : 10,
                opacity: isDimmed ? 0.6 : 1,
                filter: isDimmed ? 'blur(0.3px)' : 'none',
              }}
              className={`absolute ${item.positionClass} ${item.sizeClass} rounded-[28px] border border-[#F3E7D0]/60 bg-white/85 backdrop-blur-xl shadow-[0_18px_45px_rgba(23,58,70,0.14)] p-3 sm:p-4 flex flex-col justify-between text-left cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-2 hover:scale-[1.03] hover:shadow-[0_28px_70px_rgba(23,58,70,0.24)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173A46]/60 group`}
            >
              {/* Screen Top Status Pill */}
              <div className="flex items-center justify-between border-b border-[#173A46]/10 pb-2 shrink-0">
                <div className="flex items-center gap-1.5">
                  <span
                    className="w-2 h-2 rounded-full shadow-xs"
                    style={{ backgroundColor: item.accentColor }}
                  />
                  <span className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#244B57] font-medium font-semibold">
                    {item.title}
                  </span>
                </div>
                <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#244B57] font-medium">
                  UI / UX
                </span>
              </div>

              {/* Real Artwork Live Preview Frame */}
              <div className="relative my-2 flex-1 w-full rounded-xl overflow-hidden shadow-inner bg-slate-50 border border-black/5">
                <ArtworkRenderer
                  id={item.id}
                  isThumbnail
                  className="w-full h-full pointer-events-none transform scale-[0.98] group-hover:scale-100 transition-transform duration-500"
                />
              </div>

              {/* Hover Footer Reveal */}
              <div className="flex items-center justify-between pt-1 border-t border-[#173A46]/10 shrink-0">
                <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#244B57] font-medium truncate max-w-[130px]">
                  {item.previewSubtitle}
                </span>
                <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#173A46] font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  VIEW FULL STORY ↗
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
