/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface HeroContentProps {
  scrollProgress: number; // 0 to 1 as the user scrolls out of the hero
  onFollowHawk: () => void;
}

export const HeroContent: React.FC<HeroContentProps> = ({ scrollProgress, onFollowHawk }) => {
  // Staggered load animation states
  const [eyebrowReady, setEyebrowReady] = useState(false);
  const [titleReady, setTitleReady] = useState(false);
  const [hookReady, setHookReady] = useState(false);
  const [secondaryReady, setSecondaryReady] = useState(false);
  const [promptReady, setPromptReady] = useState(false);

  useEffect(() => {
    const tEyebrow = setTimeout(() => setEyebrowReady(true), 250);
    const tTitle = setTimeout(() => setTitleReady(true), 350);
    const tHook = setTimeout(() => setHookReady(true), 600);
    const tSecondary = setTimeout(() => setSecondaryReady(true), 750);
    const tPrompt = setTimeout(() => setPromptReady(true), 950);

    return () => {
      clearTimeout(tEyebrow);
      clearTimeout(tTitle);
      clearTimeout(tHook);
      clearTimeout(tSecondary);
      clearTimeout(tPrompt);
    };
  }, []);

  // Hero Scroll-out behavior (smooth fade over first 30-40% of scroll)
  // title: opacity 1 -> 0, translateY 0 -> -24px
  // body: opacity 1 -> 0, translateY 0 -> -16px
  // scroll prompt: opacity 1 -> 0
  const normalizedProgress = Math.min(1, Math.max(0, scrollProgress / 0.35));
  const scrollTitleOpacity = 1 - normalizedProgress;
  const scrollTitleY = -24 * normalizedProgress;

  const scrollBodyOpacity = 1 - normalizedProgress;
  const scrollBodyY = -16 * normalizedProgress;

  const scrollPromptProgress = Math.min(1, Math.max(0, scrollProgress / 0.30));
  const scrollPromptOpacity = 1 - scrollPromptProgress;

  return (
    <section
      aria-label="Portfolio Hero"
      className="absolute left-[7vw] top-[20vh] sm:top-[27vh] max-w-[88vw] sm:max-w-[520px] z-10 text-left select-none pointer-events-none"
    >
      {/* 5. SMALL EYEBROW */}
      <div
        style={{
          opacity: eyebrowReady ? scrollTitleOpacity : 0,
          transform: `translateY(${eyebrowReady ? scrollTitleY : 10}px)`,
        }}
        className="flex items-center gap-3 transition-all duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <span className="font-sans text-[9px] uppercase tracking-[0.22em] font-medium text-[#F3E7D0]">
          PROLOGUE
        </span>
        <span aria-hidden="true" className="w-12 h-px bg-[#F3E7D0]/25" />
      </div>

      {/* 6. MAIN TITLE with Asymmetrical Editorial Hierarchy */}
      <div
        style={{
          opacity: titleReady ? scrollTitleOpacity : 0,
          transform: `translateY(${titleReady ? scrollTitleY : 14}px)`,
        }}
        className="mt-6 flex flex-col transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        {/* Line 1: Lost, */}
        <h2 className="font-serif text-[64px] sm:text-[72px] lg:text-[92px] xl:text-[108px] text-[#F3E7D0] leading-[0.85] tracking-[-0.035em] font-normal">
          Lost,
        </h2>

        {/* Line 2: but in (offset & smaller) */}
        <div className="pl-12 sm:pl-20 md:pl-28 my-1 sm:my-2">
          <span className="font-serif text-[24px] sm:text-[28px] lg:text-[34px] text-[#F3E7D0] opacity-80 font-normal tracking-tight">
            but in
          </span>
        </div>

        {/* Line 3: Creation. (italic, expressive, prominent offset) */}
        <div className="pl-20 sm:pl-36 md:pl-48">
          <span className="font-serif italic text-[70px] sm:text-[78px] lg:text-[102px] xl:text-[120px] text-[#F3E7D0] leading-[0.85] tracking-[-0.035em] block">
            Creation.
          </span>
        </div>
      </div>

      {/* 7. HOOK / INTRO COPY */}
      <div
        style={{
          opacity: hookReady ? scrollBodyOpacity : 0,
          transform: `translateY(${hookReady ? scrollBodyY : 12}px)`,
        }}
        className="mt-8 transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <p className="font-serif text-[16px] lg:text-[17px] leading-[1.45] text-[#F3E7D0] max-w-[430px]">
          “Some paths begin with knowing exactly where to go.
          <br className="hidden sm:inline" /> Mine began with learning how to see.”
        </p>
      </div>

      {/* Secondary Copy */}
      <div
        style={{
          opacity: secondaryReady ? scrollBodyOpacity : 0,
          transform: `translateY(${secondaryReady ? scrollBodyY : 10}px)`,
        }}
        className="mt-4 transition-all duration-800 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <p className="font-sans text-[11px] lg:text-[12px] leading-[1.7] text-[#F3E7D0] max-w-[460px]">
          I explore the space between business, technology and design — turning complex problems into systems, experiences and ideas.
        </p>
      </div>

      {/* 8. PRIMARY SCROLL PROMPT */}
      <div
        style={{
          opacity: promptReady ? scrollPromptOpacity : 0,
        }}
        className="mt-8 pointer-events-auto transition-opacity duration-900 ease-[cubic-bezier(0.22,1,0.36,1)]"
      >
        <button
          onClick={onFollowHawk}
          type="button"
          className="group inline-flex items-center gap-3 font-sans text-[9px] uppercase tracking-[0.20em] text-[#F3E7D0] hover:text-[#F3E7D0] transition-colors duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-[#F3E7D0]/40 rounded-sm cursor-pointer"
          aria-label="Follow the hawk into the portfolio"
        >
          <span>FOLLOW THE HAWK</span>
          <span
            aria-hidden="true"
            className="text-[11px] inline-block transition-transform duration-300 ease-out group-hover:translate-y-1"
          >
            ↓
          </span>
        </button>
      </div>
    </section>
  );
};
