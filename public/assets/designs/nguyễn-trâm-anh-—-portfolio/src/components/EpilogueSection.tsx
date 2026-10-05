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
  const p1Opacity = Math.max(0, 1 - scrollProgress * 2.8);
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
          {/* ======================================================== */}
          {/* 1. PAINTERLY SECOND COAST & FINAL OCEAN CANVAS           */}
          {/* ======================================================== */}
          <div className="absolute inset-0 w-full h-full pointer-events-none -z-10 overflow-hidden">
            {/* Base Ocean Atmosphere (Lighter, warmer, calmer ocean: #1B6170, #2C7481, #4D8C97, #79A9B0, #B6CDD0) */}
            <div
              style={{
                background:
                  'linear-gradient(180deg, #1B6170 0%, #2C7481 25%, #4D8C97 50%, #79A9B0 75%, #B6CDD0 100%)',
              }}
              className="absolute inset-0 w-full h-full"
            />

            {/* Top-Down Calm Ocean Swells with Cream Highlights (#E9DCC4) */}
            <svg
              className="absolute inset-0 w-full h-full object-cover"
              viewBox="0 0 1440 900"
              preserveAspectRatio="xMidYMid slice"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <radialGradient id="oceanSunGlow" cx="50%" cy="30%" r="50%">
                  <stop offset="0%" stopColor="#E9DCC4" stopOpacity="0.32" />
                  <stop offset="40%" stopColor="#79A9B0" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#1B6170" stopOpacity="0" />
                </radialGradient>

                <linearGradient id="warmCurrents" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#E9DCC4" stopOpacity="0.18" />
                  <stop offset="50%" stopColor="#B6CDD0" stopOpacity="0.12" />
                  <stop offset="100%" stopColor="#4D8C97" stopOpacity="0.05" />
                </linearGradient>

                <filter id="oceanHaze" x="-10%" y="-10%" width="120%" height="120%">
                  <feGaussianBlur stdDeviation="8" />
                </filter>
              </defs>

              {/* Luminous Warm Ambient Light */}
              <rect width="1440" height="900" fill="url(#oceanSunGlow)" />

              {/* Serene Water Current Rhythms */}
              <g
                style={{
                  transform: reducedMotion
                    ? 'none'
                    : `translate3d(0, ${scrollProgress * -30}px, 0)`,
                }}
                opacity="0.75"
              >
                <path
                  d="M -100 200 C 300 240, 700 160, 1100 220 C 1300 250, 1500 210, 1600 230"
                  stroke="#E9DCC4"
                  strokeWidth="1.5"
                  fill="none"
                  opacity="0.4"
                  filter="url(#oceanHaze)"
                />
                <path
                  d="M -60 380 C 260 420, 680 340, 1080 390 C 1320 420, 1480 370, 1560 390"
                  stroke="#E9DCC4"
                  strokeWidth="2"
                  fill="none"
                  opacity="0.35"
                  filter="url(#oceanHaze)"
                />
                <path
                  d="M -80 560 C 320 520, 760 590, 1140 540 C 1360 510, 1460 550, 1580 530"
                  stroke="#E9DCC4"
                  strokeWidth="2.5"
                  fill="none"
                  opacity="0.3"
                  filter="url(#oceanHaze)"
                />
                <path
                  d="M -120 720 C 280 760, 720 680, 1120 740 C 1340 770, 1490 730, 1600 750"
                  stroke="#E9DCC4"
                  strokeWidth="3"
                  fill="none"
                  opacity="0.25"
                  filter="url(#oceanHaze)"
                />

                <ellipse cx="420" cy="340" rx="340" ry="18" fill="url(#warmCurrents)" />
                <ellipse cx="980" cy="520" rx="420" ry="24" fill="url(#warmCurrents)" />
                <ellipse cx="560" cy="680" rx="380" ry="20" fill="url(#warmCurrents)" />
              </g>

              {/* FOREGROUND MEADOW & SOFT SECOND COASTAL EDGE (Gradually drifts down and out of view) */}
              <g
                style={{
                  transform: reducedMotion
                    ? 'none'
                    : `translate3d(0, ${meadowShiftY}vh, 0)`,
                  opacity: Math.max(0, 1 - scrollProgress * 1.8),
                }}
              >
                <path
                  d="M -50 480 Q 320 440, 720 470 T 1500 450 L 1500 900 L -50 900 Z"
                  fill="#8EA779"
                  opacity="0.75"
                />

                <path
                  d="M -50 480 Q 320 440, 720 470 T 1500 450"
                  stroke="#E9DCC4"
                  strokeWidth="3.5"
                  fill="none"
                  opacity="0.5"
                  filter="url(#oceanHaze)"
                />

                <path
                  d="M -50 560 Q 360 510, 820 550 T 1520 520 L 1520 900 L -50 900 Z"
                  fill="#647E50"
                />

                <path
                  d="M -50 660 Q 420 600, 940 640 T 1520 610 L 1520 900 L -50 900 Z"
                  fill="#3C5635"
                />

                <g opacity="0.6">
                  <circle cx="220" cy="710" r="2.5" fill="#FAF6EA" />
                  <circle cx="380" cy="740" r="3" fill="#FFFBE8" />
                  <circle cx="560" cy="690" r="2" fill="#FAF6EA" />
                  <circle cx="740" cy="730" r="3" fill="#FFFBE8" />
                  <circle cx="920" cy="700" r="2.5" fill="#FAF6EA" />
                  <circle cx="1140" cy="750" r="3" fill="#FFFBE8" />
                  <circle cx="1320" cy="710" r="2" fill="#FAF6EA" />
                </g>
              </g>

              {/* WHITE HAWK — Companion Soaring Freely from Meadow into Open Water */}
              <g
                style={{
                  transform: reducedMotion
                    ? 'none'
                    : `translate3d(${hawkFlightX}vw, ${hawkFlightY}vh, 0) scale(${hawkScale}) rotate(${
                        -8 + scrollProgress * 14
                      }deg)`,
                }}
                className="pointer-events-none"
              >
                <ellipse
                  cx="0"
                  cy="20"
                  rx="30"
                  ry="8"
                  fill="#1B6170"
                  opacity={0.25 * (1 - scrollProgress * 0.5)}
                  filter="url(#oceanHaze)"
                />

                <svg
                  width="72"
                  height="42"
                  viewBox="0 0 72 42"
                  fill="none"
                  className="overflow-visible"
                >
                  <defs>
                    <linearGradient id="epilogueHawkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#FFFFFF" />
                      <stop offset="60%" stopColor="#F5ECE0" />
                      <stop offset="100%" stopColor="#DDD0BF" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M 36 21 C 24 10, 8 2, 0 4 C 6 12, 16 18, 26 21 Z"
                    fill="url(#epilogueHawkGrad)"
                    opacity="0.95"
                  />
                  <path
                    d="M 28 21 C 32 17, 40 16, 48 18 C 54 19, 62 17, 68 18 C 65 21, 58 23, 50 23 C 42 23, 34 25, 28 21 Z"
                    fill="url(#epilogueHawkGrad)"
                  />
                  <path
                    d="M 38 20 C 48 8, 62 0, 72 2 C 64 10, 56 16, 44 20 Z"
                    fill="url(#epilogueHawkGrad)"
                    opacity="0.95"
                  />
                  <path
                    d="M 28 21 C 18 24, 8 28, 0 32 C 8 28, 18 25, 26 22 Z"
                    fill="url(#epilogueHawkGrad)"
                    opacity="0.85"
                  />
                  <path d="M 68 18 L 71 19 L 68 20 Z" fill="#D49942" />
                </svg>
              </g>
            </svg>
          </div>

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
            className="relative z-30 pt-[14vh] px-[6vw] lg:px-[7vw] max-w-[1440px] transition-opacity duration-300"
          >
            {/* Chapter Marker */}
            <div className="flex items-center gap-3 mb-6">
              <span className="font-serif italic text-[16px] text-[#173A46]/45 leading-none">
                05
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#173A46]/60 font-medium">
                EPILOGUE
              </span>
              <span className="w-8 h-px bg-[#173A46]/20" />
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/40">
                BACK TO THE OPEN
              </span>
            </div>

            {/* Main Section Heading (40-44vw max width) */}
            <h2 className="font-serif text-[62px] lg:text-[80px] xl:text-[94px] leading-[0.9] tracking-[-0.03em] text-[#173A46] font-normal max-w-[44vw]">
              Every edge
              <br />
              becomes <span className="italic font-normal">another beginning.</span>
            </h2>

            {/* Supporting Copy */}
            <p className="max-w-[520px] mt-5 font-sans text-[14px] lg:text-[15px] leading-[1.65] text-[#173A46]/68">
              A portfolio can only show where I have been so far.
              <br className="hidden sm:inline" />
              There is still more to learn, build and make.
            </p>

            <p className="mt-4 max-w-[480px] font-sans text-[13px] leading-[1.6] text-[#173A46]/55">
              If something here made you curious, I’d be glad to continue the conversation.
            </p>

            {/* Editorial Contact Block */}
            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 max-w-[620px] pt-6 border-t border-[#173A46]/10">
              {/* Identity & Location */}
              <div>
                <span className="font-serif text-[18px] text-[#173A46] font-medium block">
                  NGUYỄN TRÂM ANH
                </span>
                <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/55 block mt-0.5">
                  Hanoi, Vietnam
                </span>
                <div className="mt-2 space-y-0.5 font-sans text-[11px] text-[#173A46]/75">
                  <a
                    href="mailto:tranhn.work@gmail.com"
                    className="block hover:text-[#173A46] underline decoration-[#173A46]/30 underline-offset-4 transition-colors"
                  >
                    tranhn.work@gmail.com
                  </a>
                  <a
                    href="https://linkedin.com/in/tranhng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block hover:text-[#173A46] text-[#173A46]/65 hover:underline transition-colors"
                  >
                    linkedin.com/in/tranhng ↗
                  </a>
                </div>
              </div>

              {/* Two Actions */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                {/* Primary Action Button */}
                <button
                  onClick={onContactClick || (() => (window.location.href = 'mailto:tranhn.work@gmail.com'))}
                  type="button"
                  aria-label="Write an email to Nguyễn Trâm Anh"
                  className="inline-flex items-center gap-3 rounded-full border border-[#173A46]/22 bg-[#F3E7D0]/28 px-6 py-3 backdrop-blur-md text-[10px] uppercase tracking-[0.16em] text-[#173A46] font-medium transition-all duration-400 hover:bg-[#F3E7D0]/48 hover:gap-5 shadow-xs cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[#173A46]/50"
                >
                  <span>WRITE TO ME</span>
                  <span aria-hidden="true">→</span>
                </button>

                {/* Secondary Action Link */}
                <button
                  onClick={handleDownloadCV}
                  type="button"
                  aria-label="Download Curriculum Vitae"
                  className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/60 hover:text-[#173A46] py-2 transition-colors cursor-pointer focus:outline-none focus-visible:underline"
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

            <h3 className="font-serif text-[64px] lg:text-[84px] xl:text-[96px] leading-[0.92] text-[#F3E7D0] font-normal tracking-[-0.03em] drop-shadow-sm">
              Into the <span className="italic font-normal">open,</span>
              <br />
              again.
            </h3>

            <p className="mt-6 font-serif italic text-[16px] lg:text-[18px] leading-[1.5] text-[#F3E7D0]/75">
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
            className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center px-6 transition-opacity duration-700"
          >
            {/* Generous bottom padding to ensure zero overlap with footer */}
            <div className="max-w-md pb-28 sm:pb-32">
              <h4 className="font-serif text-[18px] lg:text-[20px] text-[#F3E7D0]/85 font-normal tracking-wide drop-shadow-sm">
                THANK YOU FOR WANDERING WITH ME.
              </h4>

              <div className="mt-3 flex items-center justify-center gap-2 font-sans text-[9px] uppercase tracking-[0.18em] text-[#F3E7D0]/45">
                <span>NGUYỄN TRÂM ANH</span>
                <span>·</span>
                <span>PORTFOLIO — 2026</span>
              </div>

              <button
                onClick={handleScrollToTop}
                type="button"
                aria-label="Return to beginning of portfolio"
                className="mt-6 inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.18em] text-[#F3E7D0]/60 hover:text-[#F3E7D0] transition-all duration-300 hover:translate-y-[-2px] cursor-pointer focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F3E7D0]/60 px-4 py-1.5 rounded-full border border-[#F3E7D0]/10 hover:border-[#F3E7D0]/30"
              >
                <span>RETURN TO THE BEGINNING</span>
                <span aria-hidden="true">↑</span>
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
            className="absolute bottom-0 left-0 right-0 z-30 px-8 xl:px-12 2xl:px-16 pb-8 border-t border-[#F3E7D0]/10"
          >
            <div className="pt-6 grid grid-cols-3 items-end">
              {/* LEFT COLUMN */}
              <div className="text-left">
                <span className="font-serif text-[16px] text-[#F3E7D0]/85 block leading-tight">
                  NGUYỄN TRÂM ANH
                </span>
                <span className="mt-1 font-sans text-[8px] uppercase tracking-[0.16em] text-[#F3E7D0]/42 block">
                  Business · Technology · Design
                </span>
              </div>

              {/* CENTER COLUMN */}
              <div className="text-center space-y-1">
                <div>
                  <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0]/35 block leading-none">
                    EMAIL
                  </span>
                  <a
                    href="mailto:tranhn.work@gmail.com"
                    className="font-sans text-[10px] text-[#F3E7D0]/65 hover:text-[#F3E7D0] transition-colors"
                  >
                    tranhn.work@gmail.com
                  </a>
                </div>
                <div className="pt-1">
                  <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0]/35 block leading-none">
                    LINKEDIN
                  </span>
                  <a
                    href="https://linkedin.com/in/tranhng"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-[10px] text-[#F3E7D0]/65 hover:text-[#F3E7D0] transition-colors"
                  >
                    linkedin.com/in/tranhng ↗
                  </a>
                </div>
              </div>

              {/* RIGHT COLUMN — pr-18 gives clearance so fixed scroll button does not overlap */}
              <div className="text-right flex flex-col items-end pr-14 sm:pr-18 lg:pr-20">
                <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0]/35 block leading-none">
                  PORTFOLIO 2026
                </span>
                <button
                  onClick={handleScrollToTop}
                  type="button"
                  aria-label="Back to top"
                  className="mt-1.5 font-sans text-[10px] text-[#F3E7D0]/65 hover:text-[#F3E7D0] transition-all duration-300 hover:translate-y-[-2px] cursor-pointer inline-flex items-center gap-1.5"
                >
                  <span>BACK TO TOP</span>
                  <span aria-hidden="true">↑</span>
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
        <div className="w-full px-5 pt-[100px] pb-[80px] space-y-16">
          {/* Mobile Chapter Intro */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="font-serif italic text-[16px] text-[#173A46]/45 leading-none">
                05
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.22em] text-[#173A46]/60 font-medium">
                EPILOGUE
              </span>
              <span className="w-6 h-px bg-[#173A46]/20" />
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/40">
                BACK TO THE OPEN
              </span>
            </div>

            <h2 className="font-serif text-[42px] leading-[0.94] tracking-tight text-[#173A46]">
              Every edge
              <br />
              becomes <span className="italic font-normal">another beginning.</span>
            </h2>

            <p className="font-sans text-[14px] leading-[1.6] text-[#173A46]/70">
              A portfolio can only show where I have been so far.
              There is still more to learn, build and make.
            </p>

            <p className="font-sans text-[13px] leading-[1.6] text-[#173A46]/55">
              If something here made you curious, I’d be glad to continue the conversation.
            </p>
          </div>

          {/* Mobile Contact Block */}
          <div className="p-6 rounded-[24px] bg-white/70 backdrop-blur-md border border-[#173A46]/10 space-y-5">
            <div>
              <span className="font-serif text-[18px] text-[#173A46] font-medium block">
                NGUYỄN TRÂM ANH
              </span>
              <span className="font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/55 block mt-0.5">
                Hanoi, Vietnam
              </span>
            </div>

            <div className="space-y-2 font-sans text-[12px] text-[#173A46]/80 pt-2 border-t border-[#173A46]/10">
              <a
                href="mailto:tranhn.work@gmail.com"
                className="flex items-center gap-2 hover:text-[#173A46] min-h-[44px]"
              >
                <span>✉</span>
                <span>tranhn.work@gmail.com</span>
              </a>
              <a
                href="https://linkedin.com/in/tranhng"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 hover:text-[#173A46] min-h-[44px]"
              >
                <span>↗</span>
                <span>linkedin.com/in/tranhng</span>
              </a>
            </div>

            {/* Stacked Mobile Actions */}
            <div className="pt-2 flex flex-col gap-3">
              <button
                onClick={onContactClick || (() => (window.location.href = 'mailto:tranhn.work@gmail.com'))}
                type="button"
                className="w-full inline-flex items-center justify-center gap-3 rounded-full border border-[#173A46]/22 bg-[#F3E7D0]/40 py-3.5 text-[10px] uppercase tracking-[0.16em] text-[#173A46] font-medium min-h-[44px]"
              >
                <span>WRITE TO ME</span>
                <span>→</span>
              </button>

              <button
                onClick={handleDownloadCV}
                type="button"
                className="w-full inline-flex items-center justify-center py-2.5 font-sans text-[10px] uppercase tracking-[0.16em] text-[#173A46]/70 min-h-[44px]"
              >
                DOWNLOAD CV ↓
              </button>
            </div>
          </div>

          {/* Mobile Environmental Poem Frame */}
          <div className="p-8 rounded-[28px] bg-gradient-to-b from-[#1B6170] to-[#2C7481] text-[#F3E7D0] space-y-4 shadow-xl text-center">
            <span className="font-sans text-[9px] uppercase tracking-[0.2em] text-[#F3E7D0]/60 block">
              EPILOGUE
            </span>
            <h3 className="font-serif text-[38px] leading-[0.95] text-[#F3E7D0]">
              Into the <span className="italic font-normal">open,</span>
              <br />
              again.
            </h3>
            <p className="font-serif italic text-[14px] leading-relaxed text-[#F3E7D0]/75">
              Not the same place.
              <br />
              Not quite the same person.
            </p>
          </div>

          {/* Mobile Final Thank You */}
          <div className="text-center space-y-3 pt-6">
            <h4 className="font-serif text-[18px] text-[#173A46] font-normal">
              THANK YOU FOR WANDERING WITH ME.
            </h4>
            <div className="font-sans text-[9px] uppercase tracking-[0.18em] text-[#173A46]/50">
              NGUYỄN TRÂM ANH · PORTFOLIO — 2026
            </div>
          </div>

          {/* Mobile Clean Footer Stack */}
          <footer className="pt-8 border-t border-[#173A46]/15 space-y-5 text-left font-sans">
            <div>
              <span className="font-serif text-[16px] text-[#173A46] block">
                NGUYỄN TRÂM ANH
              </span>
              <span className="text-[8px] uppercase tracking-[0.16em] text-[#173A46]/50 block mt-0.5">
                Business · Technology · Design
              </span>
            </div>

            <div className="pt-3 flex items-center justify-between border-t border-[#173A46]/10">
              <span className="text-[8px] uppercase tracking-[0.18em] text-[#173A46]/40">
                PORTFOLIO — 2026
              </span>
              <button
                onClick={handleScrollToTop}
                type="button"
                className="text-[10px] uppercase tracking-[0.16em] text-[#173A46] font-medium py-2 min-h-[44px] flex items-center"
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
