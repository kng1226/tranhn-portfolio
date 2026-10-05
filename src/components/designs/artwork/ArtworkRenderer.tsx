/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface ArtworkRendererProps {
  id: string;
  className?: string;
  isThumbnail?: boolean;
}

export const ArtworkRenderer: React.FC<ArtworkRendererProps> = ({
  id,
  className = '',
  isThumbnail = false,
}) => {
  const normId = id.toLowerCase().replace(/[\s_.-]+/g, '-');
  let src = '';
  let isVideo = false;

  if (normId.includes('gresset')) src = '/assets/designs/Gresset.png';
  else if (normId.includes('intellilex')) src = '/assets/designs/Intellilex.png';
  else if (normId === 'main') src = '/assets/designs/Main.png';
  else if (normId === 'main1') src = '/assets/designs/Main1.png';
  else if (normId.includes('onboarding')) src = '/assets/designs/Onboarding.png';
  else if (normId.includes('vndrops')) src = '/assets/designs/VNDrops.png';
  else if (normId === 'ava') src = '/assets/designs/AVA.png';
  else if (normId === 'artboard-1') src = '/assets/designs/Artboard 1.png';
  else if (normId === 'artboard-2') src = '/assets/designs/Artboard 2.png';
  else if (normId === 'cover') src = '/assets/designs/COVER.png';
  else if (normId.includes('final-countdown-ws')) src = '/assets/designs/Final Countdown WS.png';
  else if (normId.includes('final-countdown')) src = '/assets/designs/final countdown.png';
  else if (normId === 'final-10') src = '/assets/designs/final 10.png';
  else if (normId.includes('mo-don') || normId.includes('chainx')) src = '/assets/designs/final final mở đơn 2.png';
  else if (normId === 'final-final') src = '/assets/designs/final final.png';
  else if (normId.includes('quan-quan') && !normId.includes('video')) src = '/assets/designs/Quán quân.png';
  else if (normId.includes('quan-quan') && normId.includes('video')) {
    src = '/assets/designs/QUÁN QUÂN - BA CỤC ĐÁ.mp4';
    isVideo = true;
  }
  else if (normId === 'test-2') src = '/assets/designs/TEST 2.png';
  else if (normId === 'bai-4') src = '/assets/designs/bài 4.png';
  else if (normId === 'draft-5') src = '/assets/designs/draft 5.png';
  else {
    return (
      <div className={`w-full h-full bg-white text-[#173A46] rounded-2xl p-4 flex flex-col justify-between ${className}`}>
        <span className="text-[9px] uppercase tracking-wider text-gray-500 font-bold">{id}</span>
        <div className="my-auto text-center font-serif text-[18px]">{id}</div>
        <span className="text-[8px] text-gray-400">DESIGN SPECIMEN</span>
      </div>
    );
  }

  return (
    <div 
      className={`relative w-full h-full rounded-2xl overflow-hidden flex items-center justify-center bg-[#0b1c24] ${className}`}
    >
      {isVideo ? (
        <video 
          src={src} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none" 
          autoPlay={false}
          loop 
          muted 
          playsInline
          preload={isThumbnail ? 'none' : 'metadata'}
        />
      ) : (
        <img 
          src={src} 
          alt={id} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 pointer-events-none"
          loading="lazy"
          decoding="async"
        />
      )}
    </div>
  );
};
