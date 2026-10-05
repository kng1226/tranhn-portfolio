/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { IntelliLexVisual } from './IntelliLexVisual';
import { VnDropsVisual } from './VnDropsVisual';
import { ProjectModal, ProjectModalType } from './ProjectModal';

interface ProjectsSectionProps {
  onModalChange?: (isOpen: boolean) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onModalChange }) => {
  const [activeModal, setActiveModal] = useState<ProjectModalType>(null);
  const [hoveredCard, setHoveredCard] = useState<'INTELLILEX' | 'VNDROPS' | null>(null);

  // Parallax coordinates for each card (-1 to 1 normalized)
  const [card1Coords, setCard1Coords] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
  const [card2Coords, setCard2Coords] = useState({ x: 0, y: 0, tiltX: 0, tiltY: 0 });

  // Prefers reduced motion check
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', listener);
    return () => mediaQuery.removeEventListener('change', listener);
  }, []);

  const card1Ref = useRef<HTMLButtonElement>(null);
  const card2Ref = useRef<HTMLButtonElement>(null);

  const handleMouseMoveCard1 = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (reducedMotion || !card1Ref.current) return;
      const rect = card1Ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setCard1Coords({
        x,
        y,
        tiltX: -y * 2.5,
        tiltY: x * 3.0,
      });
    },
    [reducedMotion]
  );

  const handleMouseLeaveCard1 = useCallback(() => {
    setHoveredCard(null);
    setCard1Coords({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
  }, []);

  const handleMouseMoveCard2 = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      if (reducedMotion || !card2Ref.current) return;
      const rect = card2Ref.current.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      setCard2Coords({
        x,
        y,
        tiltX: -y * 2.5,
        tiltY: x * 3.0,
      });
    },
    [reducedMotion]
  );

  const handleMouseLeaveCard2 = useCallback(() => {
    setHoveredCard(null);
    setCard2Coords({ x: 0, y: 0, tiltX: 0, tiltY: 0 });
  }, []);

  const handleOpenModal = (project: 'INTELLILEX' | 'VNDROPS') => {
    setActiveModal(project);
    onModalChange?.(true);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    onModalChange?.(false);
  };

  return (
    <section
      id="projects-section"
      aria-label="Section 03 — Projects"
      className="relative min-h-screen py-16 sm:py-20 lg:py-0 lg:h-screen w-full flex flex-col justify-between px-[6vw] lg:px-[7vw] lg:pt-[12vh] lg:pb-[6vh] z-20 select-none overflow-x-hidden"
    >
      {/* ============================================================ */}
      {/* 1. SECTION START: EDITORIAL CHAPTER MARKER                   */}
      {/* ============================================================ */}
      <div className="flex flex-col gap-1 z-10">
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-[16px] text-[#173A46]/45 leading-none">
            03
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#173A46]/60 font-medium">
            PROJECTS
          </span>
        </div>
        <div className="w-12 h-px bg-[#173A46]/20 my-0.5" aria-hidden="true" />
        <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/40">
          FROM QUESTIONS TO THINGS THAT WORK
        </span>
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN SECTION TITLE                                        */}
      {/* ============================================================ */}
      <div className="mt-6 sm:mt-8 lg:mt-5 max-w-xl z-10">
        <span className="font-sans text-[10px] uppercase tracking-[0.22em] font-medium text-[#173A46]/50 block mb-2">
          CHAPTER III — PROJECTS
        </span>

        <h2 className="font-serif text-[46px] sm:text-[56px] lg:text-[72px] xl:text-[80px] leading-[0.92] tracking-[-0.03em] text-[#173A46] font-normal">
          Some ideas begin
          <br />
          with a <span className="italic font-normal">question.</span>
        </h2>

        <p className="mt-3.5 max-w-[480px] font-sans text-[14px] lg:text-[15px] leading-[1.65] text-[#173A46]/68">
          Two projects where research, product thinking and design became working solutions.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 3. INTERACTION INSTRUCTION (With generous breathing space)   */}
      {/* ============================================================ */}
      <div className="w-full flex justify-center mt-8 sm:mt-10 mb-6 sm:mb-8 lg:mb-10 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/35 backdrop-blur-sm border border-[#173A46]/10 animate-[pulse_3.5s_ease-in-out_infinite]">
          <span className="font-sans text-[11px] lg:text-[12px] uppercase tracking-[0.14em] font-medium text-[#173A46]/65 text-center">
            MOVE YOUR CURSOR ACROSS A PROJECT — CLICK TO OPEN THE FULL STORY
          </span>
          <span className="text-[12px] text-[#173A46]/60 font-sans" aria-hidden="true">
            ↗
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. PROJECT INTERACTION AREA                                  */}
      {/* ============================================================ */}
      <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-[4vw] items-center justify-center my-auto z-10">
        {/* Ambient Meadow Sunlight Highlight behind hovered card */}
        <div
          className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
            hoveredCard === 'INTELLILEX'
              ? 'bg-[radial-gradient(circle_at_25%_50%,rgba(255,248,220,0.12)_0%,transparent_60%)]'
              : hoveredCard === 'VNDROPS'
              ? 'bg-[radial-gradient(circle_at_75%_50%,rgba(255,248,220,0.12)_0%,transparent_60%)]'
              : 'opacity-0'
          }`}
          aria-hidden="true"
        />

        {/* ========================================================== */}
        {/* CARD 01: INTELLILEX                                        */}
        {/* ========================================================== */}
        <button
          ref={card1Ref}
          onClick={() => handleOpenModal('INTELLILEX')}
          onMouseEnter={() => setHoveredCard('INTELLILEX')}
          onMouseMove={handleMouseMoveCard1}
          onMouseLeave={handleMouseLeaveCard1}
          type="button"
          aria-label="Open IntelliLex project"
          style={{
            transform: reducedMotion
              ? 'none'
              : `perspective(1000px) rotateX(${card1Coords.tiltX}deg) rotateY(${
                  card1Coords.tiltY
                }deg) translateY(${
                  hoveredCard === 'INTELLILEX' ? -7 : 0
                }px) scale(${
                  hoveredCard === 'INTELLILEX'
                    ? 1.015
                    : hoveredCard === 'VNDROPS'
                    ? 0.985
                    : 1
                })`,
            opacity: hoveredCard === 'VNDROPS' ? 0.72 : 1,
          }}
          className="relative w-full h-[32vh] min-h-[270px] max-h-[320px] rounded-[30px] border border-[#F3E7D0]/30 bg-[#F3E7D0]/16 backdrop-blur-md overflow-hidden shadow-[0_18px_45px_rgba(23,58,70,0.08)] hover:shadow-[0_24px_60px_rgba(23,58,70,0.13)] hover:bg-[#F3E7D0]/23 hover:border-[#F3E7D0]/45 cursor-pointer text-left transition-[background-color,border-color,box-shadow,opacity] duration-500 flex flex-col justify-between p-6 sm:p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173A46]/50 group"
        >
          {/* Top Visual Area (0-58% of card height) */}
          <div className="relative h-[58%] w-full overflow-hidden rounded-2xl bg-white/20 border border-[#173A46]/8">
            <IntelliLexVisual
              cursorX={card1Coords.x}
              cursorY={card1Coords.y}
              isHovered={hoveredCard === 'INTELLILEX'}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Bottom Information Area (58-100% of card height) */}
          <div className="relative h-[42%] w-full flex flex-col justify-end pt-2">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#173A46]/60 font-semibold">
                AI FOR DYSLEXIA SUPPORT
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-[#173A46]/45">
                09/2023 — 01/2024
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <h3 className="font-serif text-[26px] lg:text-[30px] text-[#173A46] font-normal leading-none tracking-tight">
                INTELLILEX
              </h3>

              {/* Hover Prompt Reveal */}
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46] font-semibold opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-400 inline-flex items-center gap-1">
                OPEN PROJECT <span>↗</span>
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[10px] font-sans text-[#173A46]/70">
              <span className="truncate max-w-[280px]">
                PROJECT MANAGER · UI/UX DESIGN
              </span>
              <span className="font-medium text-[#173A46]/80 text-[9px] uppercase tracking-wider">
                TOP 10 GLOBALLY
              </span>
            </div>
          </div>
        </button>

        {/* ========================================================== */}
        {/* CARD 02: VNDROPS                                           */}
        {/* ========================================================== */}
        <button
          ref={card2Ref}
          onClick={() => handleOpenModal('VNDROPS')}
          onMouseEnter={() => setHoveredCard('VNDROPS')}
          onMouseMove={handleMouseMoveCard2}
          onMouseLeave={handleMouseLeaveCard2}
          type="button"
          aria-label="Open VnDrops project"
          style={{
            transform: reducedMotion
              ? 'none'
              : `perspective(1000px) rotateX(${card2Coords.tiltX}deg) rotateY(${
                  card2Coords.tiltY
                }deg) translateY(${
                  hoveredCard === 'VNDROPS' ? -7 : 0
                }px) scale(${
                  hoveredCard === 'VNDROPS'
                    ? 1.015
                    : hoveredCard === 'INTELLILEX'
                    ? 0.985
                    : 1
                })`,
            opacity: hoveredCard === 'INTELLILEX' ? 0.72 : 1,
          }}
          className="relative w-full h-[32vh] min-h-[270px] max-h-[320px] rounded-[30px] border border-[#F3E7D0]/30 bg-[#F3E7D0]/16 backdrop-blur-md overflow-hidden shadow-[0_18px_45px_rgba(23,58,70,0.08)] hover:shadow-[0_24px_60px_rgba(23,58,70,0.13)] hover:bg-[#F3E7D0]/23 hover:border-[#F3E7D0]/45 cursor-pointer text-left transition-[background-color,border-color,box-shadow,opacity] duration-500 flex flex-col justify-between p-6 sm:p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173A46]/50 group"
        >
          {/* Top Visual Area (0-58% of card height) */}
          <div className="relative h-[58%] w-full overflow-hidden rounded-2xl bg-white/20 border border-[#173A46]/8">
            <VnDropsVisual
              cursorX={card2Coords.x}
              cursorY={card2Coords.y}
              isHovered={hoveredCard === 'VNDROPS'}
              reducedMotion={reducedMotion}
            />
          </div>

          {/* Bottom Information Area (58-100% of card height) */}
          <div className="relative h-[42%] w-full flex flex-col justify-end pt-2">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#173A46]/60 font-semibold">
                AUTOMATIC BLOOD DONATION SYSTEM
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-[#173A46]/45">
                09/2023 — 01/2024
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <h3 className="font-serif text-[26px] lg:text-[30px] text-[#173A46] font-normal leading-none tracking-tight">
                VNDROPS
              </h3>

              {/* Hover Prompt Reveal */}
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46] font-semibold opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-400 inline-flex items-center gap-1">
                OPEN PROJECT <span>↗</span>
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[10px] font-sans text-[#173A46]/70">
              <span className="truncate max-w-[280px]">
                PROJECT MANAGER · UI/UX · R&D
              </span>
              <span className="font-medium text-[#173A46]/80 text-[9px] uppercase tracking-wider">
                1ST PLACE U-INVENT 5
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 5. BOTTOM BREATHING / MICROCOPY                              */}
      {/* ============================================================ */}
      <div className="w-full flex items-center justify-between text-[10px] font-sans text-[#173A46]/45 uppercase tracking-[0.18em] pt-4 sm:pt-2 mt-8 lg:mt-0 z-10 border-t border-[#173A46]/10">
        <span>RESEARCH · PRODUCT THINKING · PROTOTYPING</span>
        <span className="hidden sm:inline italic font-serif text-[12px] text-[#173A46]/40 lowercase">
          two specimens from the field
        </span>
        <span>MICROSOFT CUP · U-INVENT 5</span>
      </div>

      {/* ============================================================ */}
      {/* 6. EXPANSIVE PROJECT DETAIL MODAL OVERLAY                    */}
      {/* ============================================================ */}
      <ProjectModal
        type={activeModal}
        onClose={handleCloseModal}
        triggerButtonRef={activeModal === 'INTELLILEX' ? card1Ref : card2Ref}
      />
    </section>
  );
};
