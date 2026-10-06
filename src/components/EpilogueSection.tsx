/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';

interface EpilogueSectionProps {
  onContactClick?: () => void;
  onThemeChange?: (mode: 'dark' | 'light') => void;
  onNavOpacityChange?: (opacity: number) => void;
}

export const EpilogueSection: React.FC<EpilogueSectionProps> = ({
  onContactClick,
  onThemeChange,
  onNavOpacityChange,
}) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Keep the compact reading layout for phones; use the editorial column on tablet and desktop.
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Match the fixed controls to the dark ocean while the epilogue is visible.
  useEffect(() => {
    let animationFrameId: number;

    const updateScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      if (rect.top <= window.innerHeight && rect.bottom >= 0) onThemeChange?.('dark');
      onNavOpacityChange?.(1);
    };

    const handleScroll = () => {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(updateScroll);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    updateScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      cancelAnimationFrame(animationFrameId);
      onNavOpacityChange?.(1);
    };
  }, [onThemeChange, onNavOpacityChange]);

  const handleScrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleDownloadCV = (e: React.MouseEvent) => {
    e.preventDefault();
    if (onContactClick) {
      onContactClick();
    } else {
      window.location.href = 'mailto:tranhn.work@gmail.com?subject=CV%20Request%20-%20Nguyen%20Tram%20Anh';
    }
  };

  return (
    <section
      id="epilogue-section"
      ref={sectionRef}
      aria-label="Section 05 — Epilogue & Footer"
      className="relative z-20 min-h-screen w-full"
    >
      {/* ============================================================ */}
      {/* DESKTOP EDITORIAL LAYOUT */}
      {/* ============================================================ */}
      {!isMobile ? (
        <div className="relative min-h-screen w-full overflow-hidden">


          {/* Localized Gradient Overlay for readability */}
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(90deg, rgba(8,31,39,0.58) 0%, rgba(8,31,39,0.36) 30%, rgba(8,31,39,0.10) 52%, rgba(8,31,39,0) 68%)',
            }}
          />

          {/* ======================================================== */}
          {/* PHASE 1: CHAPTER 05 INTRO, MAIN HEADING & CONTACT INFO  */}
          {/* Visible between 0.0 and 0.38 progress                    */}
          {/* ======================================================== */}
          <div
            style={{
              opacity: 1,
              pointerEvents: 'auto',
            }}
            className="relative z-30 mx-auto w-full max-w-[1600px] px-[7vw] pt-[20vh] pb-[8vh] min-[1280px]:pt-[18vh] min-[1600px]:pt-[17vh]"
          >
            {/* Chapter Marker */}
            <div className="flex items-center gap-4 mb-0">
              <span className="font-serif italic text-[15px] text-[#F3E7D0]/55 leading-none">
                05
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.20em] text-[#F3E7D0]/72 font-medium">
                EPILOGUE
              </span>
              <span className="w-10 h-px bg-[#F3E7D0]/25" />
              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#F3E7D0]/42">
                BACK TO THE OPEN
              </span>
            </div>

            {/* Main Section Heading */}
            <div className="mt-8 w-[min(36vw,520px)] max-[1279px]:w-[min(44vw,520px)] md:max-lg:w-[65vw]">
            <h2 className="font-serif text-[clamp(48px,4.5vw,66px)] min-[1600px]:text-[clamp(54px,4.8vw,76px)] leading-[0.95] tracking-[-0.03em] text-[#F3E7D0] font-normal w-full">
              Every edge
              <br />
              becomes <span className="italic">another<br />beginning.</span>
            </h2>

            {/* Supporting Copy */}
            <div>
              <p className="max-w-[460px] mt-7 font-sans text-[14px] lg:text-[15px] max-[1279px]:text-[14px] leading-[1.65] text-[#F3E7D0]/78">
                A portfolio can only show where I have been so far.
                <br className="hidden sm:inline" />
                There is still more to learn, build and make.
              </p>

              <p className="mt-[18px] max-w-[420px] font-sans text-[13px] leading-[1.6] text-[#F3E7D0]/58">
                If something here made you curious, I’d be glad to continue the conversation.
              </p>
            </div>

            {/* Editorial Contact Block */}
            <div className="mt-7 flex flex-col items-start gap-4 border-none pt-0">
              {/* Identity & Location & Email */}
              <div className="space-y-2">
                <div>
                  <span className="font-serif text-[18px] text-[#F3E7D0]/92 block">
                    NGUYỄN TRÂM ANH
                  </span>
                  <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#F3E7D0]/42 block mt-1">
                    Hanoi, Vietnam
                  </span>
                </div>
                <div className="mt-[10px] space-y-1 font-sans text-[12px] leading-[1.8] text-[#F3E7D0]/70">
                  <a
                    href="mailto:tranhn.work@gmail.com"
                    className="block hover:text-[#F3E7D0] transition-colors"
                  >
                    tranhn.work@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/tranhng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-[#F3E7D0] transition-colors"
                  >
                    linkedin.com/in/tranhng ↗
                  </a>
                </div>
              </div>

              {/* Two Actions */}
              <div className="flex items-center gap-5 mt-[22px]">
                {/* Primary Action Button */}
                <button
                  onClick={onContactClick || (() => (window.location.href = 'mailto:tranhn.work@gmail.com'))}
                  type="button"
                  className="inline-flex items-center justify-center gap-3 rounded-full border border-[#F3E7D0]/26 bg-[#F3E7D0]/10 h-[44px] px-[22px] backdrop-blur-[14px] font-sans text-[10px] uppercase tracking-[0.16em] text-[#F3E7D0] transition-all duration-[350ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-[#F3E7D0]/20 hover:border-[#F3E7D0]/45 hover:gap-[18px] hover:-translate-y-[1px] cursor-pointer"
                >
                  <span>WRITE TO ME</span>
                  <span aria-hidden="true">→</span>
                </button>

                {/* Secondary Action Link */}
                <button
                  onClick={handleDownloadCV}
                  type="button"
                  className="font-sans text-[10px] uppercase tracking-[0.15em] text-[#F3E7D0]/52 hover:text-[#F3E7D0]/85 transition-colors cursor-pointer"
                >
                  DOWNLOAD CV ↓
                </button>
              </div>
            </div>
            </div>
          </div>

            <footer className="relative z-30 mx-auto grid w-full max-w-[1600px] grid-cols-1 gap-4 border-t border-[#F3E7D0]/15 px-[7vw] py-5 font-sans text-[10px] text-[#F3E7D0]/60 sm:grid-cols-3 sm:items-center">
              <span className="font-serif text-[14px] text-[#F3E7D0]/82">NGUYỄN TRÂM ANH</span>
              <div className="flex flex-wrap gap-x-5 gap-y-2 sm:justify-center">
                <a href="mailto:tranhn.work@gmail.com" className="hover:text-[#F3E7D0] transition-colors">
                  tranhn.work@gmail.com
                </a>
                <a href="https://linkedin.com/in/tranhng" target="_blank" rel="noopener noreferrer" className="hover:text-[#F3E7D0] transition-colors">
                  LINKEDIN ↗
                </a>
              </div>
              <button
                onClick={handleScrollToTop}
                type="button"
                className="text-left uppercase tracking-[0.14em] hover:text-[#F3E7D0] transition-colors sm:text-right"
              >
                RETURN TO THE BEGINNING ↑
              </button>
            </footer>
          </div>
      ) : (
        /* ============================================================ */
        /* MOBILE VERTICAL STORYTELLING LAYOUT (<1024px)               */
        /* Clean vertical sequence with generous clearance              */
        /* ============================================================ */
        <div className="w-full px-5 pt-[120px] pb-16 space-y-12 relative z-30">
          
          {/* Mobile Localized Gradient Overlay for readability */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'linear-gradient(90deg, rgba(8,31,39,0.58) 0%, rgba(8,31,39,0.36) 30%, rgba(8,31,39,0.10) 52%, rgba(8,31,39,0) 68%)',
            }}
          />

          {/* Mobile Chapter Intro */}
          <div className="space-y-4 relative z-10 w-[88vw] sm:w-[90vw]">
            <div className="flex items-center gap-3">
            <span className="font-serif italic text-[14px] text-[#F3E7D0]/50 leading-none">
                05
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.20em] text-[#F3E7D0]/72 font-medium">
                EPILOGUE
              </span>
              <span className="w-6 h-px bg-[#F3E7D0]/25" />
              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#F3E7D0]/42">
                BACK TO THE OPEN
              </span>
            </div>

            <h2 className="font-serif text-[40px] min-[420px]:text-[44px] leading-[0.96] tracking-[-0.03em] text-[#F3E7D0]">
              Every edge
              <br />
              becomes <span className="italic font-normal">another beginning.</span>
            </h2>

            <p className="font-sans text-[14px] leading-[1.6] text-[#F3E7D0]/76">
              A portfolio can only show where I have been so far.
              There is still more to learn, build and make.
            </p>

            <p className="font-sans text-[13px] leading-[1.6] text-[#F3E7D0]/56">
              If something here made you curious, I’d be glad to continue the conversation.
            </p>
          </div>

          {/* Mobile Contact Block */}
          <div className="space-y-5 relative z-10 mt-8">
            <div className="flex flex-col gap-2">
              <span className="font-serif text-[18px] text-[#F3E7D0]/92 font-medium block">
                NGUYỄN TRÂM ANH
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.14em] text-[#F3E7D0]/42 block mt-0.5">
                Hanoi, Vietnam
              </span>
            </div>

            <div className="flex flex-col gap-2 font-sans text-[12px] text-[#F3E7D0]/68 pt-2">
              <a
                href="mailto:tranhn.work@gmail.com"
                className="hover:text-[#F3E7D0]"
              >
                tranhn.work@gmail.com
              </a>
              <a
                href="https://linkedin.com/in/tranhng"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F3E7D0]"
              >
                linkedin.com/in/tranhng ↗
              </a>
            </div>

            {/* Stacked Mobile Actions */}
            <div className="pt-4 flex flex-col gap-4">
              <button
                onClick={onContactClick || (() => (window.location.href = 'mailto:tranhn.work@gmail.com'))}
                type="button"
                className="w-max inline-flex items-center justify-center gap-3 rounded-full border border-[#F3E7D0]/26 bg-[#F3E7D0]/10 px-[22px] h-[44px] backdrop-blur-[14px] text-[10px] uppercase tracking-[0.16em] text-[#F3E7D0] transition-colors"
              >
                <span>WRITE TO ME</span>
                <span>→</span>
              </button>

              <button
                onClick={handleDownloadCV}
                type="button"
                className="w-max inline-flex items-center justify-center py-2 font-sans text-[10px] uppercase tracking-[0.15em] text-[#F3E7D0]/52 hover:text-[#F3E7D0]/85 transition-colors"
              >
                DOWNLOAD CV ↓
              </button>
            </div>
          </div>

          {/* Mobile Environmental Poem Frame */}
          <div className="space-y-4 pt-12 relative z-10">
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#F3E7D0]/60 block mb-3">
              EPILOGUE
            </span>
            <h3 className="font-serif text-[64px] leading-[0.92] text-[#F3E7D0] drop-shadow-sm">
              Into the <span className="italic font-normal">open,</span>
              <br />
              again.
            </h3>
            <p className="font-sans text-[15px] leading-[1.5] text-[#F3E7D0]/65 mt-6">
              Not the same place.
              <br />
              Not quite the same person.
            </p>
          </div>

          {/* Mobile Final Thank You */}
          <div className="text-center space-y-3 pt-16 relative z-10 mx-auto w-[80vw]">
            <h4 className="font-serif text-[18px] text-[#F3E7D0]/88 font-normal drop-shadow-sm">
              THANK YOU FOR WANDERING WITH ME.
            </h4>
          </div>

          {/* Mobile Clean Footer Stack */}
          <footer className="pt-8 border-t border-[#F3E7D0]/10 space-y-5 text-left font-sans relative z-10 px-[20px] pb-[28px] flex flex-col gap-[20px]">
            <div>
              <span className="font-serif text-[16px] text-[#F3E7D0]/82 block leading-tight">
                NGUYỄN TRÂM ANH
              </span>
              <span className="mt-1 text-[8px] uppercase tracking-[0.16em] text-[#F3E7D0]/38 block">
                Business · Technology · Design
              </span>
            </div>

            <div>
              <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0]/30 block leading-none">
                EMAIL
              </span>
              <a
                href="mailto:tranhn.work@gmail.com"
                className="font-sans text-[10px] text-[#F3E7D0]/58 hover:text-[#F3E7D0] transition-colors mt-0.5 block"
              >
                tranhn.work@gmail.com
              </a>
            </div>

            <div>
              <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0]/30 block leading-none">
                LINKEDIN
              </span>
              <a
                href="https://linkedin.com/in/tranhng"
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-[10px] text-[#F3E7D0]/58 hover:text-[#F3E7D0] transition-colors mt-0.5 block"
              >
                linkedin.com/in/tranhng
              </a>
            </div>

            <div className="pt-3 flex flex-col items-start gap-4 border-t border-[#F3E7D0]/10">
              <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0]/30 block leading-none">
                PORTFOLIO — 2026
              </span>
              <button
                onClick={handleScrollToTop}
                type="button"
                className="text-[10px] uppercase tracking-[0.16em] text-[#F3E7D0]/58 hover:text-[#F3E7D0] font-medium transition-colors"
              >
                RETURN TO TOP ↑
              </button>
            </div>
          </footer>
        </div>
      )}
    </section>
  );
};
