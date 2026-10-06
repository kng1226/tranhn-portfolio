/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface ScrollControlProps {
  isPastHero: boolean;
  onScrollToTarget: () => void;
  themeMode?: 'dark' | 'light';
}

export const ScrollControl: React.FC<ScrollControlProps> = ({
  isPastHero,
  onScrollToTarget,
  themeMode = 'dark',
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 1000);
    return () => clearTimeout(timer);
  }, []);

  const isLight = themeMode === 'light';

  return (
    <div
      className={`fixed right-8 bottom-8 z-[100] transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        onClick={onScrollToTarget}
        type="button"
        aria-label={isPastHero ? 'Scroll back to top of portfolio' : 'Scroll down to exploration'}
        className={`w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-[16px] shadow-[0_8px_24px_rgba(0,0,0,0.10)] transition-all duration-300 hover:scale-[1.05] focus:outline-none focus-visible:ring-1 cursor-pointer group ${
          isLight
            ? 'border border-[#173A46]/18 bg-[#F3E7D0]/30 text-[#173A46] hover:bg-[#F3E7D0]/50 focus-visible:ring-[#173A46]/60'
            : 'border border-[#F3E7D0]/20 bg-[#F3E7D0]/12 text-[#F3E7D0] hover:bg-[#F3E7D0]/22 focus-visible:ring-[#F3E7D0]/60 hover:-translate-y-[2px]'
        }`}
      >
        <span
          className="text-[14px] font-sans inline-block transition-transform duration-500 group-hover:translate-y-[-1px]"
          aria-hidden="true"
        >
          {isPastHero ? '↑' : '↓'}
        </span>
      </button>
    </div>
  );
};
