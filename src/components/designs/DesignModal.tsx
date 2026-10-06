/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ArtworkRenderer } from './artwork/ArtworkRenderer';
import { VideoPlayerSim } from './artwork/VideoPlayerSim';

export interface DesignItemData {
  id: string;
  category: '3D' | 'UI/UX' | 'GRAPHIC' | 'VIDEO';
  title: string;
  typeLabel: string;
  role?: string;
  year?: string;
  tools?: string;
  context?: string;
  aspectRatio?: string;
}

interface DesignModalProps {
  item: DesignItemData | null;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}

export const DesignModal: React.FC<DesignModalProps> = ({ item, onClose, triggerRef }) => {
  const exitButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!item) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const timer = setTimeout(() => {
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
      clearTimeout(timer);
      triggerRef?.current?.focus();
    };
  }, [item, onClose, triggerRef]);

  if (!item) return null;

  const isVideo = item.category === 'VIDEO';

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="design-modal-title"
      className="fixed inset-0 z-[210] flex items-center justify-center p-3 sm:p-6 lg:p-10 select-none overflow-y-auto"
    >
      {/* Blurred Environmental Meadow Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-[#0A1A20]/45 backdrop-blur-[16px] transition-opacity duration-400 ease-out"
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="relative z-[220] w-[min(1100px,94vw)] max-h-[90vh] overflow-y-auto rounded-[28px] sm:rounded-[34px] border border-white bg-white shadow-[0_35px_110px_rgba(14,48,60,0.3)] p-6 sm:p-10 lg:p-12 text-[#173A46] my-auto transition-all duration-600 ease-[cubic-bezier(0.22,1,0.36,1)] animate-in fade-in zoom-in-[0.96]">
        {/* Upper-Right Corner Exit Button */}
        <button
          ref={exitButtonRef}
          onClick={onClose}
          type="button"
          aria-label="Close design modal"
          className="absolute right-4 top-4 sm:right-6 sm:top-6 w-10 h-10 rounded-full flex items-center justify-center border border-[#173A46]/15 bg-[#173A46]/5 text-[#244B57] font-medium transition-all duration-300 hover:bg-[#173A46]/10 hover:rotate-90 hover:text-[#173A46] focus:outline-none focus-visible:ring-1 focus-visible:ring-[#173A46]/50 cursor-pointer z-30"
        >
          <span className="text-[17px] font-sans leading-none" aria-hidden="true">
            ✕
          </span>
        </button>

        {isVideo ? (
          /* Video Modal Player Experience */
          <div className="flex flex-col gap-6">
            <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b border-[#173A46]/12 pb-4 pr-12">
              <div>
                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#244B57] font-medium font-medium">
                  MOTION & VIDEO EDITING
                </span>
                <h3
                  id="design-modal-title"
                  className="mt-1 font-serif text-[28px] sm:text-[34px] text-[#173A46] font-normal tracking-tight"
                >
                  {item.title}
                </h3>
              </div>
              <div className="flex items-center gap-2 font-sans text-[11px] text-[#244B57] font-medium">
                <span>{item.role || 'VIDEO EDITOR & MOTION DESIGNER'}</span>
                {item.year && (
                  <>
                    <span>·</span>
                    <span>{item.year}</span>
                  </>
                )}
              </div>
            </div>

            {/* Video Player Display */}
            <VideoPlayerSim
              videoId={item.id === 'video-countdown' ? 'video-countdown' : 'video-quan-quan'}
            />

            {item.context && (
              <p className="font-sans text-[13px] sm:text-[14px] leading-[1.7] text-[#244B57] font-medium max-w-2xl">
                {item.context}
              </p>
            )}
          </div>
        ) : (
          /* General Design Modal (3D, UI/UX, Graphic Design) */
          <div className="grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8 lg:gap-12 items-center">
            {/* Visual Canvas Stage displaying the EXACT artwork */}
            <div className="relative mx-auto w-fit max-w-full max-h-[68vh] rounded-2xl bg-white border border-[#173A46]/10 shadow-inner flex items-center justify-center p-2 sm:p-3">
              <ArtworkRenderer id={item.id} fit="contain" className="max-w-full max-h-[68vh] shadow-lg" />
            </div>

            {/* Design Story Column */}
            <div className="flex flex-col justify-between">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.22em] text-[#244B57] font-medium block font-medium">
                  {item.category} · {item.typeLabel}
                </span>

                <h3
                  id="design-modal-title"
                  className="mt-1.5 font-serif text-[32px] sm:text-[38px] text-[#173A46] font-normal tracking-tight leading-tight"
                >
                  {item.title}
                </h3>

                {item.role && (
                  <div className="mt-2 font-sans text-[11px] uppercase tracking-[0.14em] text-[#244B57] font-medium font-medium">
                    {item.role}
                  </div>
                )}

                <div className="w-full h-px bg-[#173A46]/10 my-6" />

                <p className="font-sans text-[13px] sm:text-[14px] leading-[1.75] text-[#244B57] font-medium">
                  {item.context ||
                    'Exploration across visual hierarchy, typography, form, and tactile spatial rhythm. Built with deliberate attention to spatial weight and optical balance.'}
                </p>
              </div>

              {/* Tools & Provenance */}
              <div className="mt-8 pt-6 border-t border-[#173A46]/12 flex flex-wrap items-center gap-2 font-sans text-[9px] uppercase tracking-[0.16em] text-[#244B57] font-medium">
                <span>{item.tools || 'FIGMA · BLENDER · AFTER EFFECTS · ILLUSTRATOR'}</span>
                <span>·</span>
                <span>ORIGINAL WORK</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>,
    document.body
  );
};
