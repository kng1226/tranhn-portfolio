/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useState } from 'react';

interface ContactButtonProps {
  onClick: () => void;
  themeMode?: 'dark' | 'light';
}

export const ContactButton: React.FC<ContactButtonProps> = ({ onClick, themeMode = 'dark' }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 200);
    return () => clearTimeout(timer);
  }, []);

  const isLight = themeMode === 'light';

  return (
    <div
      className={`fixed right-6 sm:right-8 xl:right-12 top-5 z-50 transition-opacity duration-1000 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        loaded ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <button
        onClick={onClick}
        type="button"
        className={`group inline-flex items-center gap-2 rounded-full px-5 py-2.5 backdrop-blur-md font-sans text-[9px] uppercase tracking-[0.16em] transition-all duration-500 whitespace-nowrap cursor-pointer shadow-[0_4px_20px_rgba(0,0,0,0.06)] focus:outline-none focus-visible:ring-1 ${
          isLight
            ? 'border border-[#173A46]/18 bg-[#173A46]/8 text-[#173A46] hover:bg-[#173A46]/15 hover:border-[#173A46]/30 focus-visible:ring-[#173A46]/60'
            : 'border border-[#F3E7D0]/25 bg-[#F3E7D0]/10 text-[#F3E7D0] hover:bg-[#F3E7D0]/20 hover:border-[#F3E7D0]/40 focus-visible:ring-[#F3E7D0]/60'
        }`}
        aria-label="Contact Nguyễn Trâm Anh"
      >
        <span>CONTACT</span>
        <span
          aria-hidden="true"
          className="inline-block transition-transform duration-300 ease-out group-hover:translate-x-[2px] group-hover:-translate-y-[2px]"
        >
          ↗
        </span>
      </button>
    </div>
  );
};
