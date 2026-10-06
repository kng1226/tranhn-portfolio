/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface HeroMicrocopyProps {
  scrollProgress: number; // 0 to 1 as hero scrolls out
}

export const HeroMicrocopy: React.FC<HeroMicrocopyProps> = ({ scrollProgress }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 900);
    return () => clearTimeout(timer);
  }, []);

  // Fade out smoothly over first 30-40% of scroll
  const scrollOpacity = Math.max(0, 1 - scrollProgress / 0.35);

  return (
    <div
      style={{ opacity: loaded ? scrollOpacity : 0 }}
      className="pointer-events-none select-none transition-opacity duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
    >
      {/* Bottom-left: POSITION OPEN WATER */}
      <div className="absolute left-6 sm:left-8 xl:left-12 bottom-6 sm:bottom-8 z-20 flex flex-col gap-0.5">
        <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0]">
          POSITION
        </span>
        <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0] font-medium">
          OPEN WATER
        </span>
      </div>

      {/* Bottom-center: SCROLL TO FOLLOW */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-6 sm:bottom-8 z-20 hidden md:block">
        <span className="font-sans text-[8px] uppercase tracking-[0.18em] text-[#F3E7D0]">
          SCROLL TO FOLLOW
        </span>
      </div>
    </div>
  );
};
