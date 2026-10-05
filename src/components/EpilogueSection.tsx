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
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);

  // Check mobile viewport and prefers-reduced-motion
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

  // Frame-perfect requestAnimationFrame scroll listener
  useEffect(() => {
    let animationFrameId: number;

    const updateScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const totalScrollableDistance = rect.height - windowHeight;

      if (totalScrollableDistance <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollableDistance;
      const clamped = Math.min(1, Math.max(0, rawProgress));

      setScrollProgress(clamped);

      // Adaptive theming & navbar opacity based on progression
      // 0.0 - 0.38: Meadow background -> light theme
      // 0.38 - 1.0: Ocean background -> dark theme
      if (clamped >= 0.38) {
        onThemeChange?.('dark');
      } else if (rect.top <= windowHeight * 0.5 && rect.bottom >= windowHeight * 0.2) {
        onThemeChange?.('light');
      }

      // At final resting state (>=0.72), reduce navbar opacity so it stays quiet
      if (clamped >= 0.72) {
        const fadeRatio = Math.min(1, (clamped - 0.72) / 0.15);
        onNavOpacityChange?.(1 - fadeRatio * 0.6); // 1.0 -> 0.4
      } else {
        onNavOpacityChange?.(1);
      }
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

  // Environmental Interpolation Curves
  // Phase 1 (0.0 to 0.38): Meadow with Contact Info
  // Phase 2 (0.35 to 0.70): Hawk crosses coast into open water, "Into the open, again."
  // Phase 3 (0.68 to 1.0): Camera rises top-down, "THANK YOU FOR WANDERING", Footer
  // Staggered Opacities for Phase 1
  const bodyOpacity = Math.max(0, 1 - scrollProgress * 6);
  const contactOpacity = Math.max(0, 1 - scrollProgress * 4.5);
  const headingOpacity = Math.max(0, 1 - scrollProgress * 3);
  
  const p1Opacity = headingOpacity; // Used for container/gradient
  const p1Y = -scrollProgress * 50;

  const p2Start = 0.35;
  const p2End = 0.72;
  const p2Opacity =
    scrollProgress < p2Start
      ? 0
      : scrollProgress > 0.68
      ? Math.max(0, 1 - (scrollProgress - 0.68) * 5)
      : Math.min(1, (scrollProgress - p2Start) * 4);

  const p3Start = 0.68;
  const p3Opacity = scrollProgress < p3Start ? 0 : Math.min(1, (scrollProgress - p3Start) * 3.8);

  // Hawk flight coordinates across second coast into open ocean
  // X: 18vw -> 88vw
  // Y: 48vh -> 20vh
  // Scale: 1.0 -> 0.4
  const hawkFlightX = 18 + scrollProgress * 70;
  const hawkFlightY = 48 - Math.sin(scrollProgress * Math.PI) * 26 - scrollProgress * 10;
  const hawkScale = Math.max(0.38, 1 - scrollProgress * 0.62);

  // Landscape camera movement: meadow shifts downward, ocean fills upward
  const meadowShiftY = Math.min(100, scrollProgress * 115);

  return (
    <section
      id="epilogue-section"
      ref={sectionRef}
      aria-label="Section 05 — Epilogue & Footer"
      className={`relative w-full ${isMobile ? 'min-h-screen py-16' : 'h-[360vh]'} z-20 select-none`}
    >
      {/* ============================================================ */}
      {/* DESKTOP PINNED VIEWPORT (sticky top-0 h-screen overflow-hidden) */}
      {/* ============================================================ */}
      {!isMobile ? (
        <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between">


          {/* Localized Gradient Overlay for readability */}
          <div 
            className="absolute inset-0 pointer-events-none z-20"
            style={{
              background: 'linear-gradient(90deg, rgba(9, 35, 44, 0.62) 0%, rgba(9, 35, 44, 0.42) 28%, rgba(9, 35, 44, 0.10) 52%, rgba(9, 35, 44, 0.00) 72%)',
              opacity: p1Opacity
            }}
          />

          {/* ======================================================== */}
          {/* PHASE 1: CHAPTER 05 INTRO, MAIN HEADING & CONTACT INFO  */}
          {/* Visible between 0.0 and 0.38 progress                    */}
          {/* ======================================================== */}
          <div
            style={{
              opacity: p1Opacity,
              transform: `translate3d(0, ${p1Y}px, 0)`,
              pointerEvents: scrollProgress > 0.38 ? 'none' : 'auto',
            }}
            className="relative z-30 pt-[17vh] lg:pt-[20vh] pl-[7vw] w-[38vw] max-w-[520px] transition-opacity duration-300"
          >
            {/* Chapter Marker */}
            <div className="flex items-center gap-3 mb-6" style={{ opacity: headingOpacity }}>
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
            <h2 
              className="font-serif text-[clamp(56px,5.4vw,82px)] leading-[0.93] tracking-[-0.03em] text-[#F3E7D0] font-normal w-full"
              style={{ opacity: headingOpacity }}
            >
              Every edge
              <br />
              becomes <span className="italic">another beginning.</span>
            </h2>

            {/* Supporting Copy */}
            <div style={{ opacity: bodyOpacity }}>
              <p className="max-w-[460px] mt-6 font-sans text-[14px] lg:text-[15px] leading-[1.65] text-[#F3E7D0]/76">
                A portfolio can only show where I have been so far.
                <br className="hidden sm:inline" />
                There is still more to learn, build and make.
              </p>

              <p className="mt-4 max-w-[450px] font-sans text-[13px] leading-[1.6] text-[#F3E7D0]/56">
                If something here made you curious, I’d be glad to continue the conversation.
              </p>
            </div>

            {/* Editorial Contact Block */}
            <div className="mt-8 flex flex-col items-start gap-6 border-none pt-0" style={{ opacity: contactOpacity }}>
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
                <div className="space-y-1 font-sans text-[12px] text-[#F3E7D0]/68">
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
              <div className="flex items-center gap-5 mt-2">
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

          {/* ======================================================== */}
          {/* PHASE 2: EPILOGUE POETRY OVER CALM EXPANDING OCEAN       */}
          {/* Visible between 0.35 and 0.68 progress                   */}
          {/* ======================================================== */}
          <div
            style={{
              opacity: p2Opacity,
              pointerEvents: scrollProgress >= 0.35 && scrollProgress <= 0.68 ? 'auto' : 'none',
            }}
            className="absolute left-[7vw] top-[28vh] z-30 transition-opacity duration-500 max-w-xl"
          >
            <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#F3E7D0]/60 font-medium block mb-3">
              EPILOGUE
            </span>

            <h3 className="font-serif text-[64px] lg:text-[80px] leading-[0.92] text-[#F3E7D0] font-normal tracking-[-0.03em] drop-shadow-sm">
              Into the <span className="italic">open,</span>
              <br />
              again.
            </h3>

            <p className="mt-6 font-sans text-[15px] leading-[1.5] text-[#F3E7D0]/65">
              Not the same place.
              <br />
              Not quite the same person.
            </p>
          </div>

          {/* ======================================================== */}
          {/* PHASE 3: FINAL RESTING STATE (Top-Down Ocean View)       */}
          {/* Visible between 0.68 and 1.0 progress                    */}
          {/* ======================================================== */}
          <div
            style={{
              opacity: p3Opacity,
              pointerEvents: scrollProgress >= 0.68 ? 'auto' : 'none',
            }}
            className="absolute inset-0 z-30 transition-opacity duration-700"
          >
            <div className="absolute top-[46%] left-1/2 -translate-x-1/2 -translate-y-1/2 text-center w-full px-6">
              <h4 className="font-serif text-[18px] lg:text-[20px] text-[#F3E7D0]/88 font-normal drop-shadow-sm">
                THANK YOU FOR WANDERING WITH ME.
              </h4>

              <div className="mt-3 font-sans text-[9px] uppercase tracking-[0.18em] text-[#F3E7D0]/42">
                NGUYỄN TRÂM ANH PORTFOLIO — 2026
              </div>

              <button
                onClick={handleScrollToTop}
                type="button"
                className="mt-6 font-sans text-[10px] uppercase tracking-[0.17em] text-[#F3E7D0]/58 hover:text-[#F3E7D0] transition-colors cursor-pointer"
              >
                RETURN TO THE BEGINNING ↑
              </button>
            </div>
          </div>

          {/* ======================================================== */}
          {/* INTEGRATED DESKTOP FOOTER                                */}
          {/* Strictly visible ONLY in Phase 3 ocean resting state     */}
          {/* ======================================================== */}
          <footer
            style={{
              opacity: p3Opacity,
              pointerEvents: scrollProgress >= 0.72 ? 'auto' : 'none',
              transition: 'opacity 0.4s ease-out',
            }}
            className="absolute bottom-0 left-0 right-0 z-30 border-t border-[#F3E7D0]/10"
          >
            <div className="grid grid-cols-3 items-end px-[48px] py-[28px] pb-[32px]">
              {/* LEFT COLUMN */}
              <div className="text-left">
                <span className="font-serif text-[16px] text-[#F3E7D0]/82 block leading-tight">
                  NGUYỄN TRÂM ANH
                </span>
                <span className="mt-1 font-sans text-[8px] uppercase tracking-[0.16em] text-[#F3E7D0]/38 block">
                  Business · Technology · Design
                </span>
              </div>

              {/* CENTER COLUMN */}
              <div className="text-center space-y-1">
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
                <div className="pt-2">
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
              </div>

              {/* RIGHT COLUMN */}
              <div className="text-right flex flex-col items-end">
                <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0]/30 block leading-none">
                  PORTFOLIO 2026
                </span>
                <button
                  onClick={handleScrollToTop}
                  type="button"
                  className="mt-1.5 font-sans text-[10px] text-[#F3E7D0]/58 hover:text-[#F3E7D0] transition-colors cursor-pointer block"
                >
                  BACK TO TOP ↑
                </button>
              </div>
            </div>
          </footer>
        </div>
      ) : (
        /* ============================================================ */
        /* MOBILE VERTICAL STORYTELLING LAYOUT (<1024px)               */
        /* Clean vertical sequence with generous clearance              */
        /* ============================================================ */
        <div className="w-full px-[5vw] pt-[17vh] pb-[80px] space-y-16 relative z-30">
          
          {/* Mobile Localized Gradient Overlay for readability */}
          <div 
            className="absolute inset-0 pointer-events-none z-0"
            style={{
              background: 'linear-gradient(90deg, rgba(9, 35, 44, 0.72) 0%, rgba(9, 35, 44, 0.30) 60%, transparent 100%)',
            }}
          />

          {/* Mobile Chapter Intro */}
          <div className="space-y-4 relative z-10 w-[88vw] sm:w-[90vw]">
            <div className="flex items-center gap-3">
              <span className="font-serif italic text-[15px] text-[#F3E7D0]/55 leading-none">
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

            <h2 className="font-serif text-[42px] leading-[0.95] tracking-tight text-[#F3E7D0] line-clamp-3">
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
