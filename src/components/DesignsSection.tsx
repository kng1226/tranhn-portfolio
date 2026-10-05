/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Design3DPanel } from './designs/Design3DPanel';
import { DesignUIUXPanel } from './designs/DesignUIUXPanel';
import { DesignGraphicPanel } from './designs/DesignGraphicPanel';
import { DesignVideoPanel } from './designs/DesignVideoPanel';
import { DesignModal, DesignItemData } from './designs/DesignModal';
import { ArtworkRenderer } from './designs/artwork/ArtworkRenderer';

interface DesignsSectionProps {
  onModalChange?: (isOpen: boolean) => void;
  onThemeChange?: (mode: 'dark' | 'light') => void;
}

export const DesignsSection: React.FC<DesignsSectionProps> = ({
  onModalChange,
  onThemeChange,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [selectedItem, setSelectedItem] = useState<DesignItemData | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check mobile viewport (<1024px) and prefers-reduced-motion
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mediaQuery.matches);
    const motionListener = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mediaQuery.addEventListener('change', motionListener);

    return () => {
      window.removeEventListener('resize', checkMobile);
      mediaQuery.removeEventListener('change', motionListener);
    };
  }, []);

  const handleSelectItem = (item: DesignItemData) => {
    setSelectedItem(item);
    onModalChange?.(true);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
    onModalChange?.(false);
  };

  // Smooth category jump handler
  const handleCategoryClick = useCallback((catId: number) => {
    setActiveCategoryIndex(catId);
    if (catId === 3) {
      onThemeChange?.('dark');
    } else {
      onThemeChange?.('light');
    }
  }, [onThemeChange]);

  // Horizontal translation value for desktop: 0 to 300vw
  const horizontalTranslateVw = isMobile ? 0 : activeCategoryIndex * 100;

  return (
    <section
      id="designs-section"
      ref={sectionRef}
      aria-label="Section 04 — Designs"
      className={`relative w-full ${isMobile ? 'min-h-screen py-16' : 'h-screen'} z-20 select-none overflow-hidden`}
    >
      {/* ============================================================ */}
      {/* DESKTOP VIEWPORT */}
      {/* ============================================================ */}
      {!isMobile ? (
        <div className="relative h-full w-full overflow-hidden flex flex-col justify-between">
          {/* Top Header Layer: Section 04 Start & Main Intro */}
          <div className="absolute top-[8vh] left-[6vw] lg:left-[7vw] z-30 pointer-events-none transition-opacity duration-500">
            {/* Chapter Marker */}
            <div className="flex items-center gap-3">
              <span className="font-serif italic text-[16px] text-[#173A46]/45 leading-none">
                04
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#173A46]/60 font-medium">
                DESIGNS
              </span>
              <span className="w-8 h-px bg-[#173A46]/20" />
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/42">
                FORM · INTERFACE · IMAGE · MOTION
              </span>
            </div>
          </div>

          {/* Interaction Instruction Banner */}
          <div className="absolute top-[14vh] left-1/2 -translate-x-1/2 z-30 pointer-events-none">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/45 backdrop-blur-md border border-[#173A46]/12 shadow-xs animate-[pulse_4s_ease-in-out_infinite]">
              <span className="font-sans text-[11px] lg:text-[12px] uppercase tracking-[0.14em] font-medium text-[#173A46]/65">
                SCROLL TO MOVE THROUGH THE STUDIO — HOVER OR TAP A PIECE TO EXPLORE
              </span>
              <span className="text-[12px] text-[#173A46]/70 font-sans inline-block animate-[bounce_2s_infinite]">
                →
              </span>
            </div>
          </div>


          {/* ============================================================ */}
          {/* HORIZONTAL CONTINUOUS EXHIBITION TRACK (400vw wide)          */}
          {/* ============================================================ */}
          <div
            style={{
              transform: `translate3d(-${horizontalTranslateVw}vw, 0, 0)`,
            }}
            className="w-[400vw] h-full flex transform-gpu transition-transform duration-[800ms] ease-[cubic-bezier(0.22,1,0.36,1)] my-auto pt-[16vh] pb-[8vh]"
          >
            {/* PANEL 01: 3D (0-100vw) */}
            <div className="w-[100vw] h-full shrink-0">
              <Design3DPanel onSelectItem={handleSelectItem} reducedMotion={reducedMotion} />
            </div>

            {/* PANEL 02: UI / UX (100-200vw) */}
            <div className="w-[100vw] h-full shrink-0">
              <DesignUIUXPanel onSelectItem={handleSelectItem} />
            </div>

            {/* PANEL 03: GRAPHIC & ILLUSTRATION (200-300vw) */}
            <div className="w-[100vw] h-full shrink-0">
              <DesignGraphicPanel
                onSelectItem={handleSelectItem}
              />
            </div>

            {/* PANEL 04: VIDEO EDITING (300-400vw) */}
            <div className="w-[100vw] h-full shrink-0">
              <DesignVideoPanel onSelectItem={handleSelectItem} />
            </div>
          </div>

          {/* ============================================================ */}
          {/* LOCAL CATEGORY INDEX NAVIGATION (sticky at bottom 4vh)       */}
          {/* ============================================================ */}
          <nav
            aria-label="Design categories"
            className="absolute left-1/2 -translate-x-1/2 bottom-[3.5vh] z-30 flex items-center gap-6 sm:gap-8 rounded-full px-5 py-2 bg-white/40 backdrop-blur-md border border-[#173A46]/12 shadow-sm"
          >
            {[
              { id: 0, label: '01 3D' },
              { id: 1, label: '02 UI/UX' },
              { id: 2, label: '03 GRAPHIC' },
              { id: 3, label: '04 MOTION' },
            ].map((cat) => {
              const isActive = activeCategoryIndex === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryClick(cat.id)}
                  type="button"
                  className={`font-sans text-[10px] tracking-[0.16em] uppercase transition-all duration-300 relative py-0.5 cursor-pointer ${isActive
                    ? 'text-[#173A46] font-semibold'
                    : 'text-[#173A46]/45 hover:text-[#173A46]/80'
                    }`}
                >
                  <span>{cat.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-[#173A46] rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>
        </div>
      ) : (
        /* ============================================================ */
        /* MOBILE VERTICAL STORYTELLING LAYOUT (<1024px)               */
        /* 01 3D -> 02 UI/UX -> 03 Graphic -> 04 Video                  */
        /* ============================================================ */
        <div className="w-full px-5 space-y-16">
          {/* Mobile Section Intro */}
          <div className="pt-8">
            <div className="flex items-center gap-2 mb-2">
              <span className="font-serif italic text-[16px] text-[#173A46]/45">04</span>
              <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#173A46]/60 font-medium">
                DESIGNS
              </span>
            </div>

            <h2 className="font-serif text-[42px] leading-[0.95] tracking-tight text-[#173A46]">
              Some ideas
              <br />
              need to be seen.
            </h2>

            <p className="mt-3 font-sans text-[14px] leading-[1.6] text-[#173A46]/70">
              Across three-dimensional form, digital products, illustration, graphic composition
              and moving image, design is another way I explore ideas.
            </p>

            <div className="mt-4 inline-block font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/50 bg-white/40 px-3 py-1.5 rounded-full border border-[#173A46]/10">
              SWIPE THE GALLERIES · TAP TO OPEN ↗
            </div>
          </div>

          {/* Mobile 01 3D */}
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#173A46]/50 block">
              01 — THREE DIMENSIONS
            </span>
            <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 overscroll-x-contain touch-pan-x">
              <div
                onClick={() =>
                  handleSelectItem({
                    id: 'ava',
                    category: '3D',
                    title: 'XPLORATORS 2026: GRAND FINALE',
                    typeLabel: '3D CELESTIAL COMPASS · KEY VISUAL',
                    role: '3D VISUAL ARTIST & MODELER',
                    year: '2026',
                    tools: 'BLENDER · 3D COMPOSITING',
                    context:
                      'Grand finale 3D key visual for Xplorators 2026. A 3D metallic and celestial glass astrolabe compass engineered with procedural subsurface scattering and dynamic nebula lighting.',
                  })
                }
                className="w-[84vw] shrink-0 snap-center rounded-[28px] bg-white/80 backdrop-blur-md p-4 border border-[#F3E7D0]/60 shadow-md cursor-pointer"
              >
                <div className="w-full aspect-[4/3] rounded-2xl overflow-hidden mb-3 shadow-inner">
                  <ArtworkRenderer id="ava" isThumbnail className="w-full h-full" />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-serif text-[20px] text-[#173A46]">AVA</h4>
                    <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#173A46]/60">
                      3D CELESTIAL COMPASS
                    </span>
                  </div>
                  <span className="font-sans text-[8px] uppercase tracking-[0.16em] text-[#173A46] font-semibold bg-[#173A46]/5 px-2.5 py-1 rounded-full">
                    VIEW ↗
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile 02 UI/UX */}
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#173A46]/50 block">
              02 — DIGITAL INTERFACES (UI/UX)
            </span>
            <div className="w-full overflow-x-auto snap-x snap-mandatory flex gap-4 pb-2 overscroll-x-contain touch-pan-x">
              {[
                { id: 'Gresset', title: 'Gresset', type: 'SUSTAINABILITY PLATFORM' },
                { id: 'main', title: 'TamGiao', type: 'EMOTION TRACKING DASHBOARD' },
                { id: 'main1', title: 'TamGiao', type: 'MEDICATION TIMELINE' },
                { id: 'intellilex', title: 'Intellilex', type: 'AI FOR DYSLEXIA SUPPORT' },
                { id: 'onboarding', title: 'VnDrops - Onboarding', type: 'ACTIVATION JOURNEY' },
                { id: 'vndrops', title: 'VnDrops - Main', type: 'AUTOMATIC BLOOD DONATION' },
              ].map((ui) => (
                <div
                  key={ui.id}
                  onClick={() =>
                    handleSelectItem({
                      id: ui.id,
                      category: 'UI/UX',
                      title: ui.title,
                      typeLabel: ui.type,
                    })
                  }
                  className="w-[76vw] shrink-0 snap-center rounded-[24px] bg-white/80 backdrop-blur-md p-3.5 border border-[#F3E7D0]/60 shadow-md cursor-pointer flex flex-col justify-between"
                >
                  <div className="w-full h-44 rounded-xl overflow-hidden mb-2.5 shadow-xs border border-black/5">
                    <ArtworkRenderer id={ui.id} isThumbnail className="w-full h-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-serif text-[18px] text-[#173A46]">{ui.title}</h4>
                      <span className="font-sans text-[7.5px] uppercase tracking-[0.14em] text-[#173A46]/55">
                        {ui.type}
                      </span>
                    </div>
                    <span className="text-[10px] text-[#173A46]/70">↗</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile 03 Graphic Design */}
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#173A46]/50 block">
              03 — GRAPHIC & ILLUSTRATION
            </span>
            <div className="grid grid-cols-2 gap-3">
              {[
                { id: 'artboard-1', title: 'A Little Bite Logo', type: 'PAPER-CUT ART', full: false },
                { id: 'final-countdown-ws', title: 'Final Countdown Workshop', type: 'WORKSHOP KV', full: true },
                { id: 'cover', title: 'Xplorators 2026', type: 'MENU KV', full: false },
                { id: 'artboard-2', title: 'Notice', type: 'NOTICE POSTER', full: false },
                { id: 'quan-quan', title: 'Quán quân', type: 'CHAMPIONSHIP KV', full: true },
                { id: 'final-10', title: 'Webinar', type: 'COSMIC WEBINAR', full: false },
                { id: 'final-countdown', title: 'Countdown', type: 'LAUNCH POSTER', full: false },
                { id: 'final-final', title: 'Market Overview', type: 'GRAND FINALE', full: true },
                { id: 'final-final-mo-don-2', title: 'ChainX', type: 'CHAINX BANNER', full: true },
                { id: 'test-2', title: 'Xplorators 2026 Rewind', type: 'INFOGRAPHIC', full: false },
                { id: 'bai-4', title: 'A Little Bite', type: 'FILM STRIP', full: false },
                { id: 'draft-5', title: 'Notice', type: 'TEASER ENVELOPE', full: false },
              ].map((item) => (
                <div
                  key={item.id}
                  onClick={() =>
                    handleSelectItem({
                      id: item.id,
                      category: 'GRAPHIC',
                      title: item.title,
                      typeLabel: item.type,
                    })
                  }
                  className={`${item.full ? 'col-span-2' : 'col-span-1'
                    } rounded-2xl bg-white p-3 border border-black/8 shadow-sm flex flex-col justify-between min-h-[170px] cursor-pointer`}
                >
                  <div className="w-full h-28 rounded-xl overflow-hidden mb-2 shadow-2xs border border-black/5">
                    <ArtworkRenderer id={item.id} isThumbnail className="w-full h-full" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-serif text-[15px] text-[#173A46] truncate max-w-[120px]">
                      {item.title}
                    </span>
                    <span className="font-sans text-[7px] uppercase tracking-[0.14em] text-[#173A46]/60">
                      VIEW ↗
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Mobile 04 Video Editing */}
          <div className="space-y-4">
            <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-[#173A46]/50 block">
              04 — MOTION & VIDEO
            </span>
            <div className="space-y-4">
              {[
                { id: 'video-countdown', title: 'COUNTDOWN', type: 'MOTION GRAPHICS & TEASER EDIT' },
                { id: 'video-quan-quan', title: 'QUÁN QUÂN - BA CỤC ĐÁ', type: 'CHAMPIONSHIP REVEAL FILM' },
              ].map((vid) => (
                <div
                  key={vid.id}
                  onClick={() =>
                    handleSelectItem({
                      id: vid.id,
                      category: 'VIDEO',
                      title: vid.title,
                      typeLabel: vid.type,
                    })
                  }
                  className="w-full aspect-video rounded-2xl bg-[#09171E] border border-white/20 flex flex-col justify-between text-white shadow-lg relative overflow-hidden cursor-pointer group"
                >
                  {/* Actual Video instead of mock */}
                  <div className="absolute inset-0 bg-black flex items-center justify-center">
                    <video
                      src={vid.id === 'video-countdown' ? '/assets/designs/COUNTDOWN.mp4' : '/assets/designs/QUÁN QUÂN - BA CỤC ĐÁ.mp4'}
                      className="w-full h-full object-cover opacity-70 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      autoPlay
                      loop
                      muted
                      playsInline
                    />
                  </div>

                  <span className="font-mono text-[8px] text-white/70 absolute top-4 left-5 z-10 pointer-events-none drop-shadow-md">PREVIEW · 16:9</span>

                  <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
                    <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center text-[18px] ml-1 shadow-md">
                      ▶
                    </span>
                  </div>

                  <div className="absolute bottom-5 left-5 right-5 flex justify-between items-baseline z-10 pointer-events-none">
                    <div>
                      <h4 className="font-serif text-[18px] text-white drop-shadow-md">{vid.title}</h4>
                      <span className="font-sans text-[7.5px] uppercase tracking-wider text-white/90 drop-shadow-md">
                        {vid.type}
                      </span>
                    </div>
                    <span className="font-sans text-[8px] uppercase tracking-wider text-white drop-shadow-md">
                      PLAY FILM →
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ============================================================ */}
      {/* FULLSCREEN DESIGN MODAL OVERLAY                              */}
      {/* ============================================================ */}
      <DesignModal item={selectedItem} onClose={handleCloseModal} />
    </section>
  );
};
