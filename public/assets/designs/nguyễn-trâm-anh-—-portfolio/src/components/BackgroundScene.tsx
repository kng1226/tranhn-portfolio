/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

/**
 * BackgroundScene
 *
 * Renders the atmospheric storytelling landscape:
 * - Frame 01 (Hero): Cinematic open water and the soaring white hawk motif
 * - Frame 02 (Section 02): Seamless inland journey to the painterly meadow
 *   with rolling warm prairie hills, sage & ochre grasses, and atmospheric haze.
 *
 * Stays fully visible and sits beneath the content overlay.
 */
export const BackgroundScene: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Transition factor from sea to meadow (0 at top, 1 in section 02)
  const heroHeight = typeof window !== 'undefined' ? window.innerHeight || 850 : 850;
  const meadowTransition = Math.min(1, Math.max(0, (scrollY - heroHeight * 0.25) / (heroHeight * 0.65)));

  return (
    <div
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none bg-[#091921]"
      aria-hidden="true"
    >
      {/* ============================================================ */}
      {/* FRAME 01: OPEN SEA & WHITE HAWK (Fades gently inland)       */}
      {/* ============================================================ */}
      <div
        style={{ opacity: 1 - meadowTransition }}
        className="absolute inset-0 transition-opacity duration-300 ease-out"
      >
        {/* Base Atmospheric Layers */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0b1d26] via-[#122e3a] to-[#071319]" />
        
        {/* Deep Ocean & Sky Radial Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_25%,rgba(38,88,105,0.4)_0%,rgba(23,58,70,0.2)_45%,rgba(9,25,33,0.85)_100%)]" />

        {/* Illustrated Film Frame SVG: Open Water Horizon + Soaring White Hawk */}
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="skyGrad" x1="0%" y1="0%" x2="40%" y2="100%">
              <stop offset="0%" stopColor="#0a1d26" />
              <stop offset="35%" stopColor="#13313d" />
              <stop offset="65%" stopColor="#1a404e" />
              <stop offset="100%" stopColor="#255160" />
            </linearGradient>

            <linearGradient id="waterGrad" x1="50%" y1="0%" x2="50%" y2="100%">
              <stop offset="0%" stopColor="#112933" stopOpacity="0.9" />
              <stop offset="30%" stopColor="#0c2028" />
              <stop offset="70%" stopColor="#08181f" />
              <stop offset="100%" stopColor="#051015" />
            </linearGradient>

            <linearGradient id="hawkBodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="50%" stopColor="#F5ECE0" />
              <stop offset="85%" stopColor="#DDD0BF" />
              <stop offset="100%" stopColor="#B3A28F" />
            </linearGradient>

            <linearGradient id="hawkWingGrad" x1="20%" y1="0%" x2="90%" y2="100%">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="60%" stopColor="#EADBCA" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#968572" stopOpacity="0.8" />
            </linearGradient>

            <radialGradient id="celestialLight" cx="68%" cy="26%" r="28%">
              <stop offset="0%" stopColor="#F3E7D0" stopOpacity="0.22" />
              <stop offset="45%" stopColor="#1e4c5b" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#122c36" stopOpacity="0" />
            </radialGradient>

            <filter id="mistBlur" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="8" />
            </filter>
          </defs>

          <rect width="1440" height="900" fill="url(#skyGrad)" />

          <path
            d="M0 240 Q 320 180 720 220 T 1440 180 L 1440 560 L 0 560 Z"
            fill="#1c4554"
            opacity="0.28"
            filter="url(#mistBlur)"
          />
          <path
            d="M0 310 Q 420 270 860 300 T 1440 280 L 1440 560 L 0 560 Z"
            fill="#255869"
            opacity="0.32"
            filter="url(#mistBlur)"
          />

          <circle cx="1040" cy="240" r="320" fill="url(#celestialLight)" />

          <ellipse cx="720" cy="520" rx="900" ry="24" fill="#306b7d" opacity="0.2" filter="url(#mistBlur)" />
          <line x1="0" y1="520" x2="1440" y2="520" stroke="#48869b" strokeWidth="1" opacity="0.25" />

          <rect x="0" y="520" width="1440" height="380" fill="url(#waterGrad)" />

          <g opacity="0.35">
            <ellipse cx="1020" cy="545" rx="160" ry="4" fill="#F3E7D0" opacity="0.25" filter="url(#mistBlur)" />
            <ellipse cx="1010" cy="565" rx="190" ry="5" fill="#F3E7D0" opacity="0.2" filter="url(#mistBlur)" />
            <ellipse cx="980" cy="590" rx="230" ry="6" fill="#F3E7D0" opacity="0.15" filter="url(#mistBlur)" />
            <ellipse cx="960" cy="625" rx="280" ry="7" fill="#F3E7D0" opacity="0.1" filter="url(#mistBlur)" />
            <ellipse cx="920" cy="670" rx="340" ry="9" fill="#F3E7D0" opacity="0.08" filter="url(#mistBlur)" />
            <ellipse cx="880" cy="730" rx="420" ry="12" fill="#F3E7D0" opacity="0.05" filter="url(#mistBlur)" />
          </g>

          {/* Soaring White Hawk */}
          <g id="soaringWhiteHawk" transform="translate(1010, 220) scale(0.95)">
            <path
              d="M -140 -40 C -80 -80, 20 -95, 120 -85 C 80 -40, 20 -10, -20 20 C -70 10, -110 -15, -140 -40 Z"
              fill="#FFFFFF"
              opacity="0.12"
              filter="url(#mistBlur)"
            />
            <path
              d="M -25 -5 C -65 -35, -120 -60, -165 -65 C -150 -48, -125 -32, -95 -20 C -70 -10, -45 -4, -25 -5 Z"
              fill="url(#hawkWingGrad)"
              opacity="0.85"
            />
            <path
              d="M -30 5 C -25 -10, -10 -22, 10 -20 C 25 -18, 38 -8, 48 2 C 55 7, 64 8, 70 6 C 65 11, 56 16, 45 16 C 30 16, 15 22, -2 26 C -18 30, -32 20, -30 5 Z"
              fill="url(#hawkBodyGrad)"
            />
            <path d="M 68 7 Q 76 9 73 13 Q 66 12 62 10 Z" fill="#D49942" />
            <circle cx="50" cy="5" r="1.8" fill="#1C1814" />
            <circle cx="50.5" cy="4.5" r="0.6" fill="#FFFFFF" />

            <path
              d="M 5 -15 C 35 -55, 95 -95, 175 -108 C 150 -82, 115 -58, 80 -38 C 50 -20, 25 -12, 5 -15 Z"
              fill="url(#hawkWingGrad)"
            />
            <path
              d="M 175 -108 C 160 -95, 135 -80, 105 -65 M 165 -100 C 148 -88, 122 -72, 95 -58 M 152 -92 C 135 -80, 110 -65, 82 -50"
              stroke="#DFD1BE"
              strokeWidth="0.8"
              opacity="0.75"
            />
            <path
              d="M -30 20 C -55 35, -80 48, -105 58 C -85 45, -65 30, -45 20 C -40 18, -35 18, -30 20 Z"
              fill="url(#hawkBodyGrad)"
              opacity="0.9"
            />
          </g>
        </svg>
      </div>

      {/* ============================================================ */}
      {/* FRAME 02: PAINTERLY MEADOW BACKGROUND (Inland Experience)   */}
      {/* ============================================================ */}
      <div
        style={{ opacity: meadowTransition }}
        className="absolute inset-0 transition-opacity duration-500 ease-out"
      >
        <svg
          className="absolute inset-0 w-full h-full object-cover"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMid slice"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Soft Inland Golden Sky Gradient */}
            <linearGradient id="meadowSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#DFE7D7" />
              <stop offset="45%" stopColor="#E6EDE0" />
              <stop offset="75%" stopColor="#EFECE0" />
              <stop offset="100%" stopColor="#ECE3CD" />
            </linearGradient>

            {/* Distant Hills Gradient */}
            <linearGradient id="distantHills" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#879E8E" />
              <stop offset="100%" stopColor="#5E7866" />
            </linearGradient>

            {/* Middle Meadow Gradient */}
            <linearGradient id="midMeadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#B6C8A4" />
              <stop offset="60%" stopColor="#8EA779" />
              <stop offset="100%" stopColor="#6C8657" />
            </linearGradient>

            {/* Foreground Lush Grass Gradient */}
            <linearGradient id="foreMeadow" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#8EA779" />
              <stop offset="40%" stopColor="#647E50" />
              <stop offset="100%" stopColor="#3C5635" />
            </linearGradient>

            <filter id="meadowHaze" x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="10" />
            </filter>
          </defs>

          {/* Luminous Meadow Sky */}
          <rect width="1440" height="900" fill="url(#meadowSky)" />

          {/* Soft Painterly Sun Haze */}
          <circle cx="820" cy="220" r="380" fill="#FFF9E6" opacity="0.5" filter="url(#meadowHaze)" />

          {/* Far Rolling Mountain Ridge */}
          <path
            d="M 0 340 Q 320 280 640 315 T 1280 270 T 1440 290 L 1440 600 L 0 600 Z"
            fill="url(#distantHills)"
            opacity="0.45"
            filter="url(#meadowHaze)"
          />

          {/* Middle Gentle Prairie Swells */}
          <path
            d="M -50 430 Q 280 370 660 410 T 1320 380 Q 1400 395 1490 410 L 1490 900 L -50 900 Z"
            fill="url(#midMeadow)"
            opacity="0.85"
          />

          {/* Painterly Horizon Light Reflection */}
          <path
            d="M 120 450 Q 560 420 980 435 T 1440 430"
            stroke="#FFF2D6"
            strokeWidth="3"
            opacity="0.35"
            fill="none"
            filter="url(#meadowHaze)"
          />

          {/* Lower Foreground Rolling Meadow Slopes */}
          <path
            d="M -20 540 Q 340 480 780 530 T 1460 500 L 1460 900 L -20 900 Z"
            fill="url(#foreMeadow)"
          />

          {/* Painterly Wildflower & Botanical Swatches */}
          <g opacity="0.6">
            {/* Wild chamomile / white buttercup dots */}
            <circle cx="240" cy="620" r="2.5" fill="#FAF6EA" />
            <circle cx="280" cy="640" r="2" fill="#FAF6EA" />
            <circle cx="390" cy="680" r="3" fill="#FFFBE8" />
            <circle cx="520" cy="650" r="2" fill="#FFFBE8" />
            <circle cx="610" cy="710" r="3.5" fill="#FAF6EA" />
            <circle cx="780" cy="670" r="2" fill="#FAF6EA" />
            <circle cx="890" cy="690" r="3" fill="#FFFBE8" />
            <circle cx="1040" cy="660" r="2.5" fill="#FAF6EA" />
            <circle cx="1180" cy="720" r="3" fill="#FFFBE8" />
            <circle cx="1320" cy="680" r="2" fill="#FAF6EA" />

            {/* Amber golden grass brush strokes */}
            <path d="M 180 750 Q 190 700 185 660" stroke="#D2A855" strokeWidth="1.2" opacity="0.7" />
            <path d="M 320 780 Q 335 720 325 670" stroke="#D2A855" strokeWidth="1" opacity="0.6" />
            <path d="M 680 790 Q 695 730 690 680" stroke="#D8B15F" strokeWidth="1.4" opacity="0.75" />
            <path d="M 840 820 Q 855 760 850 710" stroke="#C49B4B" strokeWidth="1.2" opacity="0.65" />
            <path d="M 1120 780 Q 1130 730 1135 690" stroke="#D8B15F" strokeWidth="1.2" opacity="0.7" />
            <path d="M 1260 810 Q 1270 750 1265 700" stroke="#D2A855" strokeWidth="1" opacity="0.6" />
          </g>
        </svg>
      </div>

      {/* Film Texture Noise Grain */}
      <div className="absolute inset-0 noise-overlay pointer-events-none mix-blend-overlay opacity-30" />

      {/* Vignette */}
      <div className="absolute inset-0 cinematic-vignette pointer-events-none opacity-40" />
    </div>
  );
};

