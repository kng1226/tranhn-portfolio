/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

export type ExperienceModalType = 'FPT' | 'TEC' | null;

interface ExperienceModalProps {
  type: ExperienceModalType;
  onClose: () => void;
  triggerButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export const ExperienceModal: React.FC<ExperienceModalProps> = ({
  type,
  onClose,
  triggerButtonRef,
}) => {
  const exitButtonRef = useRef<HTMLButtonElement>(null);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!type) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus exit button on open
    const focusTimer = setTimeout(() => {
      exitButtonRef.current?.focus();
    }, 100);

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(focusTimer);
      // Return focus to trigger button
      triggerButtonRef?.current?.focus();
    };
  }, [type, onClose, triggerButtonRef]);

  if (!type) return null;

  const isFPT = type === 'FPT';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-card-headline"
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none overflow-y-auto"
    >
      {/* ============================================================ */}
      {/* 1. BLURRED MEADOW OVERLAY BACKGROUND                         */}
      {/* ============================================================ */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#102E36]/35 backdrop-blur-[16px] backdrop-saturate-[0.75] transition-opacity duration-400 ease-out"
        aria-hidden="true"
      />

      {/* ============================================================ */}
      {/* 2. UPPER-RIGHT CORNER EXIT BUTTON                            */}
      {/* ============================================================ */}
      <button
        ref={exitButtonRef}
        onClick={onClose}
        type="button"
        aria-label="Close chapter modal"
        className="fixed top-4 right-4 sm:top-8 sm:right-10 z-[220] w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center border border-white/25 bg-black/50 backdrop-blur-xl text-[#F3E7D0] shadow-[0_10px_30px_rgba(0,0,0,0.3)] transition-all duration-300 hover:bg-black/75 hover:scale-105 hover:rotate-90 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70 cursor-pointer"
      >
        <span className="text-[16px] sm:text-[18px] font-sans leading-none" aria-hidden="true">
          ✕
        </span>
      </button>

      {/* ============================================================ */}
      {/* 3. TWO SLIGHTLY TILTED CARDS COMPOSITION                     */}
      {/* Responsive: vertical stack on mobile, side-by-side on desktop*/}
      {/* ============================================================ */}
      <div className="relative z-[210] w-full max-w-5xl flex flex-col lg:flex-row items-center justify-center gap-5 sm:gap-6 lg:gap-8 my-auto pt-16 pb-8 sm:py-8">
        {/* ========================================================== */}
        {/* CARD 01: THE LOGO CARD                                     */}
        {/* ========================================================== */}
        <div
          className="w-full max-w-[340px] lg:w-[320px] shrink-0 rounded-[28px] sm:rounded-[32px] border border-white/15 bg-[#0B171D] text-[#F3E7D0] p-6 sm:p-8 lg:p-9 shadow-[0_25px_60px_rgba(0,0,0,0.4)] flex flex-col justify-between transform rotate-0 sm:-rotate-2 hover:-rotate-1 lg:-rotate-3 lg:hover:-rotate-1.5 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
        >
          <div>
            {/* Logo Badge Container */}
            <div className="w-full h-20 sm:h-24 rounded-2xl bg-black/40 border border-white/10 flex items-center justify-center p-3 sm:p-4 mb-5 sm:mb-6 shadow-inner">
              {isFPT ? (
                /* Official FPT Logo - Image */
                <img 
                  src="/images/fpt-logo.webp" 
                  alt="FPT Telecom" 
                  className="h-10 sm:h-12 w-auto object-contain" 
                />
              ) : (
                /* Official TEC FTU Logo - Image */
                <div className="flex items-center gap-3">
                  <img 
                    src="/images/tec-logo.png" 
                    alt="TEC Logo" 
                    className="h-10 sm:h-12 w-auto object-contain" 
                  />
                  <span className="font-serif text-[19px] sm:text-[20px] text-[#F3E7D0] font-medium tracking-tight">
                    TEC FTU
                  </span>
                </div>
              )}
            </div>

            {/* Chapter Metadata */}
            <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.22em] text-[#F3E7D0]/60 block font-medium">
              {isFPT ? 'PROFESSIONAL EXPERIENCE' : 'LEADERSHIP EXPERIENCE'}
            </span>

            <p className="mt-1 font-serif text-[17px] sm:text-[18px] text-[#F3E7D0] font-normal tracking-tight">
              {isFPT ? '05/2026 — PRESENT' : '11/2024 — PRESENT'}
            </p>

            <span className="mt-3 sm:mt-4 inline-block font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.18em] text-[#F3E7D0]/40">
              {isFPT ? 'EXPERIENCE 01' : 'LEADERSHIP 01'}
            </span>
          </div>

          {/* Strategic Focus Pillars */}
          <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-white/10">
            <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-[#F3E7D0]/40 block mb-2 sm:mb-2.5">
              STRATEGIC PILLARS
            </span>
            <div className="flex flex-col gap-1 sm:gap-1.5 font-sans text-[9px] uppercase tracking-[0.16em] text-[#F3E7D0]/75 font-medium">
              {isFPT ? (
                <>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#005BAA]" />
                    SYSTEMS
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#F37021]" />
                    PROCESS
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#43B02A]" />
                    STRUCTURE
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    EXECUTION
                  </span>
                </>
              ) : (
                <>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A4A94]" />
                    DIRECTION
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A4A94]/70" />
                    PEOPLE
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1A4A94]/50" />
                    STRATEGY
                  </span>
                  <span className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-white/60" />
                    COORDINATION
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        {/* ========================================================== */}
        {/* CARD 02: THE INFORMATION CARD WITH WHITE BACKGROUND        */}
        {/* ========================================================== */}
        <div
          className="relative w-full max-w-[620px] lg:flex-1 rounded-[28px] sm:rounded-[32px] border border-black/5 bg-white text-[#173A46] p-6 sm:p-10 lg:p-12 shadow-[0_30px_90px_rgba(10,35,45,0.25)] max-h-[62vh] sm:max-h-[75vh] lg:max-h-[82vh] overflow-y-auto transform rotate-0 sm:rotate-1 hover:rotate-0.5 lg:rotate-2 lg:hover:rotate-1 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] select-text"
        >
          {/* Header Lockup */}
          <div className="border-b border-[#173A46]/10 pb-4 sm:pb-5">
            <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#173A46]/50 block font-medium">
              {isFPT ? 'ORGANISATION & ROLE' : 'ORGANISATION & LEADERSHIP'}
            </span>
            <h3
              id="modal-card-headline"
              className="mt-1 font-serif text-[22px] sm:text-[26px] lg:text-[30px] text-[#173A46] font-normal tracking-tight"
            >
              {isFPT ? 'FPT TELECOM' : 'TOMORROW ENTREPRENEURS CLUB — TEC FTU'}
            </h3>

            <div className="mt-1.5 flex flex-wrap items-center gap-2 font-sans text-[11px] sm:text-[12px] text-[#173A46]/80">
              <span className="font-medium text-[#173A46]">
                {isFPT ? 'IT Business Analyst Intern' : 'Head of TEC Go Department'}
              </span>
              <span aria-hidden="true" className="opacity-40">
                ·
              </span>
              <span className="text-[#173A46]/60">
                {isFPT ? '05/2026 — Present' : '11/2024 — Present'}
              </span>
            </div>
          </div>

          {/* Narrative Introduction */}
          <p className="mt-4 sm:mt-5 font-serif text-[15px] sm:text-[16px] lg:text-[17px] leading-[1.55] text-[#173A46]/90 border-l-2 border-[#173A46]/25 pl-3.5 sm:pl-4">
            {isFPT
              ? '“I work at the intersection of business requirements, technical systems and workflow automation, translating operational needs into structured solutions that teams can build, deploy and improve.”'
              : '“I lead strategy, research and cross-functional execution within TEC Go, shaping the department’s direction across AI, Fintech and Blockchain and translating market insights into structured priorities.”'}
          </p>

          {/* Divider */}
          <div className="w-full h-px bg-[#173A46]/10 my-5 sm:my-7" />

          {/* Detailed Contributions */}
          {isFPT ? (
            /* FPT Telecom 3 Contributions */
            <div className="space-y-6 sm:space-y-7">
              {/* Contribution 01: Workflow Automation with 25% Metric */}
              <div>
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#173A46]/60 block font-medium">
                  WORKFLOW AUTOMATION
                </span>
                <h4 className="mt-1 font-serif text-[18px] sm:text-[19px] text-[#173A46] font-normal">
                  “Turning manual processes into working flows.”
                </h4>
                <p className="mt-2 font-sans text-[11.5px] sm:text-[12px] leading-[1.75] text-[#173A46]/75">
                  Designed and deployed automated workflows that streamlined cross-functional
                  processes, removed operational bottlenecks and reduced manual execution time by
                  25%.
                </p>

                {/* Primary Verified Impact Metric */}
                <div className="mt-3.5 inline-flex items-baseline gap-2.5 pt-2.5 border-t border-[#173A46]/12">
                  <span className="font-serif text-[32px] sm:text-[36px] text-[#173A46] leading-none font-normal">
                    25%
                  </span>
                  <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#173A46]/65 font-medium">
                    REDUCTION IN MANUAL EXECUTION TIME
                  </span>
                </div>
              </div>

              <div className="w-full h-px bg-[#173A46]/8" />

              {/* Contribution 02: AI Agent Systems */}
              <div>
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#173A46]/60 block font-medium">
                  AI AGENT SYSTEMS
                </span>
                <h4 className="mt-1 font-serif text-[18px] sm:text-[19px] text-[#173A46] font-normal">
                  “Building beyond individual workflows.”
                </h4>
                <p className="mt-2 font-sans text-[11.5px] sm:text-[12px] leading-[1.75] text-[#173A46]/75">
                  Directed the end-to-end lifecycle of specialized AI agents, from business
                  requirement gathering through deployment, continuous evaluation and performance
                  tuning.
                </p>
              </div>

              <div className="w-full h-px bg-[#173A46]/8" />

              {/* Contribution 03: Business <-> Technology */}
              <div>
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#173A46]/60 block font-medium">
                  BUSINESS ↔ TECHNOLOGY
                </span>
                <h4 className="mt-1 font-serif text-[18px] sm:text-[19px] text-[#173A46] font-normal">
                  “Translating strategy into technical structure.”
                </h4>
                <p className="mt-2 font-sans text-[11.5px] sm:text-[12px] leading-[1.75] text-[#173A46]/75">
                  Translated strategic corporate objectives into actionable technical
                  specifications and structured database schemas, bridging business stakeholders
                  and engineering teams.
                </p>
              </div>

              {/* Footer Metadata */}
              <div className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-[#173A46]/15 flex flex-wrap items-center gap-2 font-sans text-[8px] uppercase tracking-[0.16em] text-[#173A46]/55 font-medium">
                <span>BUSINESS ANALYSIS</span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>WORKFLOW AUTOMATION</span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>AI AGENTS</span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>TECHNICAL TRANSLATION</span>
              </div>
            </div>
          ) : (
            /* Tomorrow Entrepreneurs Club Contributions */
            <div className="space-y-6 sm:space-y-7">
              {/* Contribution 01: Strategy & Market Intelligence */}
              <div>
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#173A46]/60 block font-medium">
                  STRATEGY & MARKET INTELLIGENCE
                </span>
                <h4 className="mt-1 font-serif text-[18px] sm:text-[19px] text-[#173A46] font-normal">
                  “Turning complex markets into direction.”
                </h4>
                <p className="mt-2 font-sans text-[11.5px] sm:text-[12px] leading-[1.75] text-[#173A46]/75">
                  Directed comprehensive market analysis across AI, Fintech and Blockchain,
                  translating complex insights into actionable roadmaps that defined the
                  department’s overarching vision and strategic priorities.
                </p>
              </div>

              <div className="w-full h-px bg-[#173A46]/8" />

              {/* Contribution 02: Program & Stakeholder Leadership */}
              <div>
                <span className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.2em] text-[#173A46]/60 block font-medium">
                  PROGRAM & STAKEHOLDER LEADERSHIP
                </span>
                <h4 className="mt-1 font-serif text-[18px] sm:text-[19px] text-[#173A46] font-normal">
                  “Moving complex initiatives forward.”
                </h4>
                <p className="mt-2 font-sans text-[11.5px] sm:text-[12px] leading-[1.75] text-[#173A46]/75">
                  Managed the execution of high-exposure, international-scale startup competitions
                  including Kawai Business Startup and Xplorators, coordinating cross-functional
                  workflows, aligning stakeholders and maintaining critical project timelines.
                </p>
              </div>

              {/* Footer Metadata */}
              <div className="mt-6 sm:mt-7 pt-4 sm:pt-5 border-t border-[#173A46]/15 flex flex-wrap items-center gap-2 font-sans text-[8px] uppercase tracking-[0.16em] text-[#173A46]/55 font-medium">
                <span>STRATEGY</span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>MARKET RESEARCH</span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>STAKEHOLDER ALIGNMENT</span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span>CROSS-FUNCTIONAL EXECUTION</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};
