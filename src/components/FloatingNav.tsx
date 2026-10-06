/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

export type NavItem = 'Journey' | 'Experience' | 'Projects' | 'Designs' | 'About';

interface FloatingNavProps {
  activeTab: NavItem;
  onSelectTab: (tab: NavItem) => void;
  themeMode?: 'dark' | 'light';
}

const NAV_ITEMS: NavItem[] = ['Journey', 'Experience', 'Projects', 'Designs', 'About'];

export const FloatingNav: React.FC<FloatingNavProps> = ({
  activeTab,
  onSelectTab,
  themeMode = 'dark',
}) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const isLight = themeMode === 'light';

  return (
    <nav
      aria-label="Primary portfolio navigation"
      className={`fixed top-4 left-2 right-12 sm:top-5 sm:left-1/2 sm:right-auto sm:-translate-x-1/2 z-50 transition-all duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        loaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-[6px]'
      }`}
    >
      <div
        className={`flex w-full items-center justify-between gap-0 sm:gap-1 rounded-full backdrop-blur-xl px-1 sm:px-2 py-1.5 sm:py-2 max-w-full overflow-x-auto transition-colors duration-500 ${
          isLight
            ? 'border border-[#173A46]/12 bg-[#F6F1E8]/65 text-[#173A46] shadow-[0_8px_30px_rgba(10,35,45,0.12)]'
            : 'border border-[#F3E7D0]/16 bg-[#F3E7D0]/16 text-[#F3E7D0]/68 shadow-[0_8px_28px_rgba(0,0,0,0.10)]'
        }`}
      >
        {NAV_ITEMS.map((item) => {
          const isActive = activeTab === item;

          let itemClass = '';
          if (isLight) {
            itemClass = isActive
              ? 'bg-[#173A46]/10 text-[#173A46] font-semibold'
              : 'text-[#173A46]/65 hover:text-[#173A46] hover:bg-[#173A46]/5';
          } else {
            itemClass = isActive
              ? 'bg-[#F3E7D0]/14 text-[#F3E7D0] font-semibold'
              : 'text-[#F3E7D0]/70 hover:text-[#F3E7D0] hover:bg-[#F3E7D0]/10';
          }

          return (
            <button
              key={item}
              onClick={() => onSelectTab(item)}
              type="button"
              className={`relative px-1.5 sm:px-4 py-1.5 sm:py-2 rounded-full font-sans text-[8px] sm:text-[10px] tracking-[0.02em] sm:tracking-[0.04em] transition-all duration-300 whitespace-nowrap focus:outline-none focus-visible:ring-1 ${
                isLight ? 'focus-visible:ring-[#173A46]/60' : 'focus-visible:ring-[#F3E7D0]/60'
              } ${itemClass}`}
            >
              {item}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
