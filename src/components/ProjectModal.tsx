/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IntelliLexVisual } from './IntelliLexVisual';
import { VnDropsVisual } from './VnDropsVisual';

export type ProjectModalType = 'INTELLILEX' | 'VNDROPS' | null;

interface ProjectModalProps {
  type: ProjectModalType;
  onClose: () => void;
  triggerButtonRef?: React.RefObject<HTMLButtonElement | null>;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  type,
  onClose,
  triggerButtonRef,
}) => {
  const exitButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

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

  const isIntelliLex = type === 'INTELLILEX';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[200] flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none overflow-y-auto"
    >
      {/* Blurred Environmental Meadow Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#102E36]/28 backdrop-blur-[14px] transition-opacity duration-400 ease-out"
        aria-hidden="true"
      />

      {/* Modal Shell (z-[210] to comfortably exceed the z-[100] fixed scroll control) */}
      <div
        ref={modalRef}
        className="relative z-[210] w-[min(1080px,94vw)] max-h-[88vh] overflow-y-auto rounded-[28px] sm:rounded-[32px] border border-[#F3E7D0]/35 bg-[#F3E7D0]/92 backdrop-blur-2xl shadow-[0_35px_110px_rgba(14,48,60,0.28)] p-6 sm:p-10 lg:p-12 text-[#173A46] my-auto transition-all duration-650 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in zoom-in-[0.96] slide-in-from-bottom-3"
      >
        {/* Upper-Right Corner Exit Button */}
        <button
          ref={exitButtonRef}
          onClick={onClose}
          type="button"
          aria-label="Close project modal"
          className="absolute right-4 top-4 sm:right-6 sm:top-6 w-10 h-10 rounded-full flex items-center justify-center border border-[#173A46]/15 bg-[#173A46]/5 text-[#244B57] font-medium transition-all duration-300 hover:bg-[#173A46]/10 hover:rotate-90 hover:text-[#173A46] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#173A46]/50 cursor-pointer z-30"
        >
          <span className="text-[17px] font-sans leading-none" aria-hidden="true">
            ✕
          </span>
        </button>

        {/* Modal Grid: Left (40% identity & visual), Right (60% project story) */}
        <div className="grid grid-cols-1 md:grid-cols-[0.4fr_0.6fr] gap-8 md:gap-12">
          {/* ============================================================ */}
          {/* LEFT COLUMN: VISUAL SPECIMEN & KEY ACHIEVEMENTS              */}
          {/* ============================================================ */}
          <div className="flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#173A46]/12 pb-8 md:pb-0 md:pr-8">
            <div>
              {/* Interactive Specimen Chamber */}
              <div className="relative w-full h-52 sm:h-60 rounded-2xl bg-[#173A46]/6 border border-[#173A46]/12 overflow-hidden mb-6 shadow-inner flex items-center justify-center">
                {isIntelliLex ? (
                  <IntelliLexVisual cursorX={0} cursorY={0} isHovered={true} />
                ) : (
                  <VnDropsVisual cursorX={0} cursorY={0} isHovered={true} />
                )}
                <div className="absolute bottom-2.5 right-3 font-sans text-[8px] uppercase tracking-[0.2em] text-[#244B57] font-medium pointer-events-none">
                  {isIntelliLex ? 'SPECIMEN · LINGUISTIC MODEL' : 'SPECIMEN · FLOW NETWORK'}
                </div>
              </div>

              {/* Sub-label & Timeline */}
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium block font-medium">
                {isIntelliLex ? 'AI FOR DYSLEXIA SUPPORT' : 'AUTOMATIC BLOOD DONATION SYSTEM'}
              </span>

              <h4 className="mt-1 font-serif text-[28px] lg:text-[32px] text-[#173A46] leading-[1.05] tracking-tight font-normal">
                {isIntelliLex ? 'INTELLILEX' : 'VNDROPS'}
              </h4>

              <div className="mt-2 flex items-center gap-2 font-sans text-[11px] text-[#244B57] font-medium">
                <span className="font-medium text-[#173A46]">
                  {isIntelliLex
                    ? 'PROJECT MANAGER · UI/UX DESIGN'
                    : 'PROJECT MANAGER · UI/UX DESIGN · R&D'}
                </span>
                <span aria-hidden="true" className="opacity-40">
                  ·
                </span>
                <span className="text-[#244B57] font-medium">09/2023 — 01/2024</span>
              </div>
            </div>

            {/* Key Verified Awards / Achievements */}
            <div className="mt-8 pt-6 border-t border-[#173A46]/12">
              <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#244B57] font-medium block mb-3 font-medium">
                KEY RECOGNITIONS
              </span>

              {isIntelliLex ? (
                /* IntelliLex Proof Point */
                <div className="p-4 rounded-xl bg-white/60 border border-[#173A46]/10">
                  <span className="font-serif text-[20px] text-[#173A46] font-normal block leading-tight">
                    TOP 10 GLOBALLY
                  </span>
                  <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-[#244B57] font-medium block mt-1">
                    MICROSOFT IMAGINE CUP JUNIOR 2024
                  </span>
                </div>
              ) : (
                /* VnDrops Proof Points */
                <div className="space-y-2.5">
                  <div className="p-3.5 rounded-xl bg-white/60 border border-[#173A46]/10">
                    <span className="font-serif text-[18px] text-[#173A46] font-normal block leading-tight">
                      1ST PLACE
                    </span>
                    <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#244B57] font-medium block mt-0.5">
                      NATIONAL SCIENCE AND TECHNOLOGY INNOVATION CONTEST — U-INVENT 5
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-white/60 border border-[#173A46]/10">
                    <span className="font-serif text-[18px] text-[#173A46] font-normal block leading-tight">
                      3RD PLACE
                    </span>
                    <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#244B57] font-medium block mt-0.5">
                      NATIONAL YOUTH TECHNOLOGY COMPETITION 2023
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: PROJECT STORY & PRODUCT METHODOLOGY            */}
          {/* ============================================================ */}
          <div className="flex flex-col select-text">
            {/* Header & Core Hook */}
            <div>
              <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#244B57] font-medium block font-medium">
                PRODUCT INITIATIVE OVERVIEW
              </span>
              <h3
                id="project-modal-title"
                className="mt-1.5 font-serif text-[26px] lg:text-[30px] text-[#173A46] leading-[1.1] font-normal"
              >
                {isIntelliLex
                  ? 'Re-architecting linguistic reading assistance for young learners.'
                  : 'Automating high-stakes donor-recipient matching flows.'}
              </h3>
            </div>

            {/* Main Narrative Description */}
            <p className="mt-5 font-serif text-[16px] lg:text-[17px] leading-[1.6] text-[#173A46]/90 border-l-2 border-[#173A46]/25 pl-4">
              {isIntelliLex
                ? '“Defined and drove the product strategy for an AI-powered learning solution, overseeing the integration of machine learning to support children with dyslexia.”'
                : '“Directed end-to-end research for a smart matching system, optimizing donor-recipient matching logic and internal workflows.”'}
            </p>

            <div className="w-full h-px bg-[#173A46]/10 my-7" />

            {/* Structured Project Pillars (Concise & exact) */}
            {isIntelliLex ? (
              /* IntelliLex Pillars */
              <div className="space-y-6">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium block font-semibold">
                    PRODUCT DIRECTION
                  </span>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.7] text-[#244B57] font-medium">
                    Framed the product roadmap around pediatric cognitive patterns, aligning user
                    needs with feasible technical scopes across machine learning models and
                    interactive reading exercises.
                  </p>
                </div>

                <div className="w-full h-px bg-[#173A46]/8" />

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium block font-semibold">
                    AI-ENABLED LEARNING
                  </span>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.7] text-[#244B57] font-medium">
                    Guided the integration of assistive speech and visual recognition algorithms,
                    adapting pacing and typeface rendering in real-time according to individualized
                    learning difficulties.
                  </p>
                </div>

                <div className="w-full h-px bg-[#173A46]/8" />

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium block font-semibold">
                    UI / UX
                  </span>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.7] text-[#244B57] font-medium">
                    Designed an accessible, low-cognitive-load interface utilizing high-legibility
                    open-dyslexic spacing, gentle chromatic contrast, and immediate auditory
                    affirmation loops.
                  </p>
                </div>

                <div className="w-full h-px bg-[#173A46]/8" />

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium block font-semibold">
                    OUTCOME
                  </span>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.7] text-[#244B57] font-medium">
                    Recognized among the Top 10 projects globally at the Microsoft Imagine Cup
                    Junior 2024, demonstrating technical viability, social empathy, and validated
                    product methodology.
                  </p>
                </div>
              </div>
            ) : (
              /* VnDrops Pillars */
              <div className="space-y-6">
                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium block font-semibold">
                    RESEARCH
                  </span>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.7] text-[#244B57] font-medium">
                    Conducted in-depth operational field research into blood bank inventory latency,
                    identifying friction points in manual donor notification, screening validation,
                    and transit logistics.
                  </p>
                </div>

                <div className="w-full h-px bg-[#173A46]/8" />

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium block font-semibold">
                    MATCHING LOGIC
                  </span>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.7] text-[#244B57] font-medium">
                    Architected rule-based algorithmic matching logic prioritizing rare blood type
                    availability, geographic proximity, and donation intervals to eliminate urgent
                    deficits.
                  </p>
                </div>

                <div className="w-full h-px bg-[#173A46]/8" />

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium block font-semibold">
                    WORKFLOW DESIGN
                  </span>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.7] text-[#244B57] font-medium">
                    Streamlined administrative verification workflows, connecting automated SMS/app
                    alerts with hospital dispatch teams to ensure high reliability under emergency
                    protocols.
                  </p>
                </div>

                <div className="w-full h-px bg-[#173A46]/8" />

                <div>
                  <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium block font-semibold">
                    OUTCOME
                  </span>
                  <p className="mt-1.5 font-sans text-[13px] leading-[1.7] text-[#244B57] font-medium">
                    Awarded 1st Place at the National Science and Technology Innovation Contest
                    (U-Invent 5) and 3rd Place at the National Youth Technology Competition 2023.
                  </p>
                </div>
              </div>
            )}

            {/* Footer Metadata Tags */}
            <div className="mt-8 pt-5 border-t border-[#173A46]/15 flex flex-wrap items-center gap-2 font-sans text-[9px] uppercase tracking-[0.16em] text-[#244B57] font-medium font-medium">
              {isIntelliLex ? (
                <>
                  <span>PRODUCT STRATEGY</span>
                  <span aria-hidden="true" className="opacity-40">
                    ·
                  </span>
                  <span>ACCESSIBLE UX</span>
                  <span aria-hidden="true" className="opacity-40">
                    ·
                  </span>
                  <span>MACHINE LEARNING</span>
                  <span aria-hidden="true" className="opacity-40">
                    ·
                  </span>
                  <span>IMAGINE CUP JUNIOR</span>
                </>
              ) : (
                <>
                  <span>SYSTEM DISPATCH</span>
                  <span aria-hidden="true" className="opacity-40">
                    ·
                  </span>
                  <span>MATCHING ALGORITHM</span>
                  <span aria-hidden="true" className="opacity-40">
                    ·
                  </span>
                  <span>WORKFLOW OPTIMIZATION</span>
                  <span aria-hidden="true" className="opacity-40">
                    ·
                  </span>
                  <span>U-INVENT 5 CHAMPION</span>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};
