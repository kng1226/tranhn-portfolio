/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface TopLeftNameProps {
  themeMode?: 'dark' | 'light';
}

/**
 * TopLeftName
 *
 * Signature lockup in the upper-left corner.
 * Remains fixed as user scrolls through the portfolio.
 * Adapts color automatically to dark/light scenes with smooth 500ms transition.
 */
export const TopLeftName: React.FC<TopLeftNameProps> = ({ themeMode = 'dark' }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const isLight = themeMode === 'light';

  return (
    <header
      className={`fixed top-4 left-4 sm:top-6 sm:left-6 xl:left-8 z-50 pointer-events-auto transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      }`}
    >
      <a
        href="#top"
        className={`block group focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 rounded-2xl px-5 py-3.5 backdrop-blur-md border transition-all duration-500 shadow-[0_8px_32px_rgba(0,0,0,0.08)] hover:scale-[1.02] ${
          isLight
            ? 'bg-white/45 border-white/50 hover:bg-white/60'
            : 'bg-[#0A1A20]/30 border-white/10 hover:bg-[#0A1A20]/50'
        }`}
        aria-label="Nguyễn Trâm Anh portfolio top"
      >
        <h1
          className={`font-serif text-[17px] lg:text-[18px] font-medium tracking-[-0.015em] transition-colors duration-500 ${
            isLight ? 'text-[#173A46]' : 'text-[#F3E7D0]/90'
          }`}
        >
          NGUYỄN TRÂM ANH
        </h1>
        <p
          className={`mt-1 font-sans text-[8px] lg:text-[9px] uppercase tracking-[0.18em] transition-colors duration-500 ${
            isLight ? 'text-[#173A46]/65 group-hover:text-[#173A46]' : 'text-[#F3E7D0]/50 group-hover:text-[#F3E7D0]/80'
          }`}
        >
          BUSINESS · TECHNOLOGY · DESIGN
        </p>
      </a>
    </header>
  );
};
