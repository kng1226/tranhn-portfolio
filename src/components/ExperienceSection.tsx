/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { ExperienceModal, ExperienceModalType } from './ExperienceModal';

interface ExperienceSectionProps {
  onModalChange?: (isOpen: boolean) => void;
}

export const ExperienceSection: React.FC<ExperienceSectionProps> = ({ onModalChange }) => {
  const [activeModal, setActiveModal] = useState<ExperienceModalType>(null);
  const [lastTrigger, setLastTrigger] = useState<'FPT' | 'TEC' | null>(null);

  const fptButtonRef = useRef<HTMLButtonElement>(null);
  const tecButtonRef = useRef<HTMLButtonElement>(null);

  const handleOpenModal = (type: 'FPT' | 'TEC') => {
    setLastTrigger(type);
    setActiveModal(type);
    onModalChange?.(true);
  };

  const handleCloseModal = () => {
    setActiveModal(null);
    onModalChange?.(false);
  };

  return (
    <section
      id="experience-section"
      aria-label="Section 02 — Experience & Leadership"
      className="relative min-h-screen py-16 sm:py-20 lg:py-24 w-full flex flex-col justify-center gap-10 px-[6vw] lg:px-[7vw] z-20 select-none overflow-x-hidden"
    >
      {/* ============================================================ */}
      {/* 1. SECTION START: EDITORIAL CHAPTER MARKER                   */}
      {/* ============================================================ */}
      <div className="flex flex-col gap-1 transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)] z-10">
        <div className="flex items-center gap-3">
          <span className="font-serif italic text-[16px] text-[#173A46]/45 leading-none">
            02
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#173A46]/60 font-medium">
            EXPERIENCE & LEADERSHIP
          </span>
        </div>
        <div className="w-12 h-px bg-[#173A46]/20 my-0.5" aria-hidden="true" />
        <span className="font-sans text-[10px] uppercase tracking-[0.18em] text-[#173A46]/40">
          FROM BUILDING SYSTEMS TO LEADING PEOPLE
        </span>
      </div>

      {/* ============================================================ */}
      {/* 2. MAIN HEADING & INTRO HOOK                                 */}
      {/* ============================================================ */}
      <div className="mt-6 sm:mt-8 lg:mt-6 max-w-xl z-10">
        <span className="font-sans text-[10px] uppercase tracking-[0.22em] font-medium text-[#173A46]/50 block mb-2">
          CHAPTER II
        </span>

        <h2 className="font-serif text-[46px] sm:text-[56px] lg:text-[72px] xl:text-[80px] leading-[0.92] tracking-[-0.03em] text-[#173A46] font-normal">
          Where ideas
          <br />
          become <span className="italic font-normal">action.</span>
        </h2>

        <p className="mt-3.5 max-w-[500px] font-sans text-[14px] lg:text-[15px] leading-[1.65] text-[#173A46]/68">
          My experience has developed in two directions — building systems that work, and helping
          people move toward a shared direction.
        </p>
      </div>

      {/* ============================================================ */}
      {/* 3. INTERACTION INSTRUCTION (With generous breathing space)   */}
      {/* ============================================================ */}
      <div className="w-full flex justify-center mt-8 sm:mt-10 mb-6 sm:mb-8 lg:mb-10 z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/35 backdrop-blur-sm border border-[#173A46]/10 animate-[pulse_3.5s_ease-in-out_infinite]">
          <span className="font-sans text-[11px] lg:text-[12px] uppercase tracking-[0.14em] font-medium text-[#173A46]/65 text-center">
            CLICK A LOGO TO EXPLORE THE FULL STORY
          </span>
          <span className="text-[12px] text-[#173A46]/60 font-sans" aria-hidden="true">
            ⊕
          </span>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 4. TWO INTERACTIVE EXPERIENCE BOXES                          */}
      {/* Sized and styled to match the Section 03 Project Boxes       */}
      {/* ============================================================ */}
      <div className="relative w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-[4vw] items-center justify-center my-auto z-10">
        {/* ========================================================== */}
        {/* BOX 01: FPT TELECOM (Sized to match Project Box)           */}
        {/* ========================================================== */}
        <button
          ref={fptButtonRef}
          onClick={() => handleOpenModal('FPT')}
          type="button"
          aria-label="View FPT Telecom experience"
          className="group relative w-full h-[32vh] min-h-[270px] max-h-[320px] rounded-[30px] border border-[#F3E7D0]/30 bg-[#F3E7D0]/16 backdrop-blur-md overflow-hidden shadow-[0_18px_45px_rgba(23,58,70,0.08)] hover:shadow-[0_24px_60px_rgba(23,58,70,0.13)] hover:bg-[#F3E7D0]/23 hover:border-[#F3E7D0]/45 hover:-translate-y-1.5 hover:scale-[1.015] cursor-pointer text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between p-6 sm:p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173A46]/50"
        >
          {/* Top Visual Chamber (0-58% of card height, matching project visual ratio) */}
          <div className="relative h-[58%] w-full overflow-hidden rounded-2xl bg-white/25 border border-[#173A46]/8 flex items-center justify-center p-4 shadow-inner">
            <img 
              src="/images/fpt-logo.webp" 
              alt="FPT Telecom" 
              className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
            />
          </div>

          {/* Bottom Information Area (58-100% of card height) */}
          <div className="relative h-[42%] w-full flex flex-col justify-end pt-2">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#173A46]/60 font-semibold">
                PROFESSIONAL EXPERIENCE
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-[#173A46]/45">
                2026 — PRESENT
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <h3 className="font-serif text-[26px] lg:text-[30px] text-[#173A46] font-normal leading-none tracking-tight">
                FPT TELECOM
              </h3>

              {/* Hover Prompt Reveal */}
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46] font-semibold opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-400 inline-flex items-center gap-1">
                VIEW EXPERIENCE <span>→</span>
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[10px] font-sans text-[#173A46]/70">
              <span className="truncate max-w-[280px]">
                IT BUSINESS ANALYST INTERN
              </span>
              <span className="font-medium text-[#173A46]/80 text-[9px] uppercase tracking-wider">
                SYSTEMS · AUTOMATION
              </span>
            </div>
          </div>
        </button>

        {/* ========================================================== */}
        {/* BOX 02: TOMORROW ENTREPRENEURS CLUB (TEC FTU)              */}
        {/* ========================================================== */}
        <button
          ref={tecButtonRef}
          onClick={() => handleOpenModal('TEC')}
          type="button"
          aria-label="View Tomorrow Entrepreneurs Club leadership experience"
          className="group relative w-full h-[32vh] min-h-[270px] max-h-[320px] rounded-[30px] border border-[#F3E7D0]/30 bg-[#F3E7D0]/16 backdrop-blur-md overflow-hidden shadow-[0_18px_45px_rgba(23,58,70,0.08)] hover:shadow-[0_24px_60px_rgba(23,58,70,0.13)] hover:bg-[#F3E7D0]/23 hover:border-[#F3E7D0]/45 hover:-translate-y-1.5 hover:scale-[1.015] cursor-pointer text-left transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] flex flex-col justify-between p-6 sm:p-7 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173A46]/50"
        >
          {/* Top Visual Chamber (0-58% of card height, matching project visual ratio) */}
          <div className="relative h-[58%] w-full overflow-hidden rounded-2xl bg-white/25 border border-[#173A46]/8 flex items-center justify-center gap-3 p-4 shadow-inner">
            <img 
              src="/images/tec-logo.png" 
              alt="TEC Logo" 
              className="h-12 w-auto object-contain transition-transform duration-500 group-hover:scale-105" 
            />
            <span className="font-serif text-[22px] lg:text-[24px] text-[#173A46] font-medium tracking-tight">
              TEC FTU
            </span>
          </div>

          {/* Bottom Information Area (58-100% of card height) */}
          <div className="relative h-[42%] w-full flex flex-col justify-end pt-2">
            <div className="flex items-center justify-between">
              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#173A46]/60 font-semibold">
                LEADERSHIP EXPERIENCE
              </span>
              <span className="font-sans text-[9px] uppercase tracking-[0.14em] text-[#173A46]/45">
                2024 — PRESENT
              </span>
            </div>

            <div className="flex items-baseline justify-between mt-1">
              <h3 className="font-serif text-[24px] lg:text-[28px] text-[#173A46] font-normal leading-none tracking-tight">
                TEC FTU
              </h3>

              {/* Hover Prompt Reveal */}
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46] font-semibold opacity-0 group-hover:opacity-100 transform -translate-x-1 group-hover:translate-x-0 transition-all duration-400 inline-flex items-center gap-1">
                VIEW LEADERSHIP <span>→</span>
              </span>
            </div>

            <div className="mt-1 flex items-center justify-between text-[10px] font-sans text-[#173A46]/70">
              <span className="truncate max-w-[280px]">
                HEAD OF TEC GO DEPARTMENT
              </span>
              <span className="font-medium text-[#173A46]/80 text-[9px] uppercase tracking-wider">
                STRATEGY · EXECUTION
              </span>
            </div>
          </div>
        </button>
      </div>

      {/* ============================================================ */}
      {/* 5. BOTTOM SECTION MICROCOPY                                  */}
      {/* ============================================================ */}
      <div className="w-full flex items-center justify-between text-[10px] font-sans text-[#173A46]/45 uppercase tracking-[0.18em] pt-4 sm:pt-2 mt-8 lg:mt-0 z-10 border-t border-[#173A46]/10">
        <span>FPT TELECOM</span>
        <span className="italic font-serif text-[12px] text-[#173A46]/40 lowercase">
          different contexts. the same instinct to make things move.
        </span>
        <span>FOREIGN TRADE UNIVERSITY</span>
      </div>

      {/* ============================================================ */}
      {/* 6. INTERACTIVE CHAPTER MODAL OVERLAY                         */}
      {/* ============================================================ */}
      <ExperienceModal
        type={activeModal}
        onClose={handleCloseModal}
        triggerButtonRef={lastTrigger === 'FPT' ? fptButtonRef : tecButtonRef}
      />
    </section>
  );
};
