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
      className={`fixed top-6 left-6 sm:left-8 xl:left-12 z-50 pointer-events-auto transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <a
        href="#top"
        className="block group focus:outline-none focus-visible:ring-1 focus-visible:ring-[#173A46]/40 rounded-sm"
        aria-label="Nguyễn Trâm Anh portfolio top"
      >
        <h1
          className={`font-serif text-[17px] lg:text-[18px] font-medium tracking-[-0.015em] transition-colors duration-500 ${
            isLight ? 'text-[#173A46]' : 'text-[#F3E7D0]'
          }`}
        >
          NGUYỄN TRÂM ANH
        </h1>
        <p
          className={`mt-1 font-sans text-[8px] lg:text-[9px] uppercase tracking-[0.18em] transition-colors duration-500 ${
            isLight ? 'text-[#173A46]/60 group-hover:text-[#173A46]' : 'text-[#F3E7D0]/55 group-hover:text-[#F3E7D0]/80'
          }`}
        >
          BUSINESS · TECHNOLOGY · DESIGN
        </p>
      </a>
    </header>
  );
};
