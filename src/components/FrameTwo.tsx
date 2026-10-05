/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface FrameTwoProps {
  onSelectProject?: (title: string) => void;
}

interface DisciplineItem {
  number: string;
  discipline: string;
  title: string;
  description: string;
  focus: string[];
}

const DISCIPLINES: DisciplineItem[] = [
  {
    number: '01',
    discipline: 'BUSINESS ARCHITECTURE',
    title: 'Venture Logic & Systematic Growth',
    description:
      'Translating ambiguous market opportunities into robust economic models, strategic positioning, and scalable operational frameworks.',
    focus: ['Unit Economics', 'Product-Market Strategy', 'Capital Allocation'],
  },
  {
    number: '02',
    discipline: 'COMPUTATIONAL TECHNOLOGY',
    title: 'Interfaces, Systems & Distributed Logic',
    description:
      'Architecting software foundations and intuitive digital products where performance, modularity, and elegance converge without friction.',
    focus: ['Frontend Architecture', 'Reactive State Engines', 'API Orchestration'],
  },
  {
    number: '03',
    discipline: 'CREATIVE DIRECTION & DESIGN',
    title: 'Editorial Identity & Spatial Craft',
    description:
      'Crafting visual languages, typographic harmony, and narrative journeys that communicate purpose with cinematic resonance.',
    focus: ['Design Systems', 'Micro-Interactions', 'Editorial Typography'],
  },
];

export const FrameTwo: React.FC<FrameTwoProps> = () => {
  return (
    <section
      id="frame-two"
      className="relative min-h-screen w-full px-8 xl:px-16 pt-32 pb-40 z-10 flex flex-col justify-between"
    >
      {/* Chapter Eyebrow */}
      <div className="max-w-5xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <span className="font-sans text-[9px] uppercase tracking-[0.22em] font-medium text-[#F3E7D0]/50">
            FRAME 02 — THE INTERSECTION
          </span>
          <span aria-hidden="true" className="w-16 h-px bg-[#F3E7D0]/20" />
        </div>

        <h3 className="mt-6 font-serif text-[clamp(36px,4.5vw,56px)] leading-[1.05] tracking-[-0.02em] text-[#F3E7D0] max-w-2xl font-normal">
          Where business rigour meets architectural technology and poetic form.
        </h3>

        <p className="mt-4 font-sans text-[12px] leading-[1.8] text-[#F3E7D0]/60 max-w-xl">
          Operating across disciplines requires more than general curiosity — it demands speaking the dialect of engineers, the calculus of executives, and the subtle eye of designers.
        </p>

        {/* Clean Editorial Three-Column Spread (Zero-Pill discipline) */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16 border-t border-[#F3E7D0]/15 pt-10">
          {DISCIPLINES.map((item) => (
            <div key={item.number} className="flex flex-col group">
              <div className="flex items-baseline justify-between text-[#F3E7D0]/40 font-sans text-[10px] tracking-[0.16em]">
                <span>{item.number}</span>
                <span className="uppercase tracking-[0.2em] text-[8px] text-[#F3E7D0]/45">
                  {item.discipline}
                </span>
              </div>

              <h4 className="mt-5 font-serif text-[22px] lg:text-[24px] text-[#F3E7D0] leading-[1.2] font-normal group-hover:text-white transition-colors">
                {item.title}
              </h4>

              <p className="mt-3 font-sans text-[11px] leading-[1.7] text-[#F3E7D0]/60">
                {item.description}
              </p>

              {/* Unboxed Metadata with Typographic Separator */}
              <div className="mt-6 pt-4 border-t border-[#F3E7D0]/10 flex flex-wrap items-center gap-2 text-[9px] font-sans text-[#F3E7D0]/40 uppercase tracking-[0.12em]">
                {item.focus.map((tag, idx) => (
                  <React.Fragment key={tag}>
                    <span>{tag}</span>
                    {idx < item.focus.length - 1 && <span aria-hidden="true" className="opacity-40">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Selected Curated Works Preview */}
        <div className="mt-28 border-t border-[#F3E7D0]/15 pt-12">
          <div className="flex items-center justify-between mb-8">
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#F3E7D0]/50">
              SELECTED EXPEDITIONS (2024 — 2026)
            </span>
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#F3E7D0]/35">
              3 ACTIVE INITIATIVES
            </span>
          </div>

          <div className="divide-y divide-[#F3E7D0]/10">
            <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-colors">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-[#F3E7D0]/45 block mb-1">
                  STRATEGY & ARCHITECTURE
                </span>
                <h5 className="font-serif text-[20px] text-[#F3E7D0] group-hover:text-white transition-colors">
                  Aethelgard Capital Systems
                </h5>
              </div>
              <p className="font-sans text-[11px] text-[#F3E7D0]/55 max-w-md">
                Cross-border liquidity reconciliation infrastructure paired with real-time risk observability.
              </p>
              <span className="font-sans text-[9px] text-[#F3E7D0]/40 uppercase tracking-[0.14em]">
                Deployed · 2025
              </span>
            </div>

            <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-colors">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-[#F3E7D0]/45 block mb-1">
                  TECHNOLOGY & INTERFACES
                </span>
                <h5 className="font-serif text-[20px] text-[#F3E7D0] group-hover:text-white transition-colors">
                  Kestrel Flight Engine
                </h5>
              </div>
              <p className="font-sans text-[11px] text-[#F3E7D0]/55 max-w-md">
                Ultra-low latency client canvas for spatial sensor coordinates with sub-16ms telemetry refresh.
              </p>
              <span className="font-sans text-[9px] text-[#F3E7D0]/40 uppercase tracking-[0.14em]">
                Engine · 2026
              </span>
            </div>

            <div className="py-6 flex flex-col md:flex-row md:items-center justify-between gap-4 group transition-colors">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-[#F3E7D0]/45 block mb-1">
                  EDITORIAL & DESIGN
                </span>
                <h5 className="font-serif text-[20px] text-[#F3E7D0] group-hover:text-white transition-colors">
                  The Monograph on Seeing
                </h5>
              </div>
              <p className="font-sans text-[11px] text-[#F3E7D0]/55 max-w-md">
                Interactive typographic anthology mapping design methodology through architectural case studies.
              </p>
              <span className="font-sans text-[9px] text-[#F3E7D0]/40 uppercase tracking-[0.14em]">
                Exhibition · 2026
              </span>
            </div>
          </div>
        </div>

        {/* Discreet Quiet Footer */}
        <div className="mt-32 pt-8 border-t border-[#F3E7D0]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[9px] font-sans text-[#F3E7D0]/35 uppercase tracking-[0.18em]">
          <span>© 2026 NGUYỄN TRÂM ANH</span>
          <span>BUSINESS · TECHNOLOGY · DESIGN</span>
          <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </section>
  );
};
