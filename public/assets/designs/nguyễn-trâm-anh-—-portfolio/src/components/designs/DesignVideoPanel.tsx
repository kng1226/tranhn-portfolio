/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { DesignItemData } from './DesignModal';

interface DesignVideoPanelProps {
  onSelectItem: (item: DesignItemData) => void;
}

export const DesignVideoPanel: React.FC<DesignVideoPanelProps> = ({ onSelectItem }) => {
  const [hoveredVideo, setHoveredVideo] = useState<'COUNTDOWN' | 'QUAN_QUAN' | null>(null);

  const countdownVideo: DesignItemData = {
    id: 'video-countdown',
    category: 'VIDEO',
    title: 'COUNTDOWN',
    typeLabel: 'MOTION GRAPHICS & TEASER EDIT',
    role: 'VIDEO EDITOR · MOTION DESIGNER',
    year: '2024',
    tools: 'AFTER EFFECTS · PREMIERE PRO · SOUND DESIGN',
    context:
      'High-velocity motion graphics countdown sequence driven by precise rhythmic sync, typographic kinetic transitions, and cinematic sound design.',
  };

  const quanQuanVideo: DesignItemData = {
    id: 'video-quan-quan',
    category: 'VIDEO',
    title: 'QUÁN QUÂN - BA CỤC ĐÁ',
    typeLabel: 'CHAMPIONSHIP REVEAL FILM',
    role: 'DIRECTOR & LEAD EDITOR',
    year: '2023',
    tools: 'PREMIERE PRO · COLOR GRADING · SOUND DESIGN',
    context:
      'Documentary-style tournament highlight and grand reveal film, orchestrating dynamic pacing, emotive storytelling cuts, and stadium ambient audio.',
  };

  return (
    <div className="relative w-full h-full flex flex-col lg:flex-row items-center justify-between px-[6vw] lg:px-[8vw] select-none pointer-events-auto">
      {/* Background cinematic vignette backing specifically for this panel */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#09171E]/40 to-[#061217]/70 pointer-events-none transition-opacity duration-700" />

      {/* Left side: Category Heading (~28% of panel) */}
      <div className="relative w-full lg:w-[26vw] shrink-0 z-20 mb-8 lg:mb-0">
        <div className="flex items-center gap-3 mb-2">
          <span className="font-serif italic text-[16px] text-[#F3E7D0]/60 leading-none">
            04
          </span>
          <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#F3E7D0]/80 font-medium">
            MOTION & FILM
          </span>
        </div>

        <h3 className="font-serif text-[42px] sm:text-[52px] lg:text-[64px] leading-[0.92] tracking-[-0.03em] text-[#F3E7D0] font-normal">
          Time,
          <br />
          sound & <span className="italic font-normal">motion.</span>
        </h3>

        <p className="mt-4 max-w-[340px] font-sans text-[13px] lg:text-[14px] leading-[1.65] text-[#F3E7D0]/70">
          Moving image projects where narrative rhythm, pacing cuts, kinetic type, and spatial sound design bring ideas to life.
        </p>

        <div className="mt-6 flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.16em] text-[#F3E7D0]/50">
          <span className="w-1.5 h-1.5 rounded-full bg-[#F3E7D0]/60" />
          <span>CINEMATIC CUTS · KINETIC TYPOGRAPHY · SOUNDSCAPE</span>
        </div>
      </div>

      {/* Right side: Film Strip / Frame Sequence (~70% of panel) */}
      <div className="relative w-full lg:w-[68vw] h-[55vh] sm:h-[62vh] flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-8 z-20">
        {/* MAIN VIDEO: COUNTDOWN (~44-48vw wide, 16:9) */}
        <button
          onClick={() => onSelectItem(countdownVideo)}
          onMouseEnter={() => setHoveredVideo('COUNTDOWN')}
          onMouseLeave={() => setHoveredVideo(null)}
          type="button"
          aria-label="Play COUNTDOWN video"
          className="relative w-full sm:w-[60vw] lg:w-[44vw] aspect-video rounded-[28px] border border-white/20 bg-black/60 backdrop-blur-xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.5)] transition-all duration-500 hover:scale-[1.015] hover:border-white/40 cursor-pointer text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {/* Film Frame Visual Simulator */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#051118] via-[#102732] to-[#1C4150] flex items-center justify-center">
            {/* Film sprocket marks on top and bottom */}
            <div className="absolute top-2 left-4 right-4 flex justify-between opacity-30 pointer-events-none">
              <span className="font-mono text-[8px] text-white">REEL 01 · 24FPS</span>
              <span className="font-mono text-[8px] text-white">TC 00:00:10:00</span>
            </div>

            {/* Play Button Overlay */}
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl transition-transform duration-500 group-hover:scale-110">
              <span className="text-white text-[24px] sm:text-[28px] ml-1" aria-hidden="true">
                ▶
              </span>
            </div>

            {/* Title & Prompt Overlay */}
            <div className="absolute bottom-4 left-6 right-6 flex items-end justify-between">
              <div>
                <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-white/60 block">
                  MAIN FILM
                </span>
                <span className="font-serif text-[24px] sm:text-[28px] text-white font-normal">
                  COUNTDOWN
                </span>
              </div>
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-white/90 font-medium group-hover:translate-x-1 transition-transform duration-300">
                PLAY FILM →
              </span>
            </div>
          </div>
        </button>

        {/* SECONDARY VIDEO: QUÁN QUÂN - BA CỤC ĐÁ (~30-34vw wide, 16:9) */}
        <button
          onClick={() => onSelectItem(quanQuanVideo)}
          onMouseEnter={() => setHoveredVideo('QUAN_QUAN')}
          onMouseLeave={() => setHoveredVideo(null)}
          type="button"
          aria-label="Play QUÁN QUÂN - BA CỤC ĐÁ video"
          className="relative w-full sm:w-[50vw] lg:w-[32vw] aspect-video rounded-[24px] border border-white/15 bg-black/50 backdrop-blur-xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.4)] transition-all duration-500 hover:scale-[1.015] hover:border-white/35 cursor-pointer text-left group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70"
        >
          {/* Film Frame Visual Simulator */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#161208] via-[#2D2412] to-[#45371A] flex items-center justify-center">
            {/* Film sprocket marks */}
            <div className="absolute top-2 left-4 right-4 flex justify-between opacity-30 pointer-events-none">
              <span className="font-mono text-[8px] text-white">REEL 02 · 4K</span>
              <span className="font-mono text-[8px] text-white">CHAMPIONSHIP REVEAL</span>
            </div>

            {/* Play Button Overlay */}
            <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-xl transition-transform duration-500 group-hover:scale-110">
              <span className="text-white text-[18px] sm:text-[22px] ml-1" aria-hidden="true">
                ▶
              </span>
            </div>

            {/* Title & Prompt Overlay */}
            <div className="absolute bottom-3 left-5 right-5 flex items-end justify-between">
              <div>
                <span className="font-sans text-[8px] uppercase tracking-[0.2em] text-white/60 block">
                  HIGHLIGHT FILM
                </span>
                <span className="font-serif text-[18px] sm:text-[22px] text-white font-normal">
                  QUÁN QUÂN - BA CỤC ĐÁ
                </span>
              </div>
              <span className="font-sans text-[9px] uppercase tracking-[0.16em] text-white/90 font-medium group-hover:translate-x-1 transition-transform duration-300">
                PLAY FILM →
              </span>
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};
