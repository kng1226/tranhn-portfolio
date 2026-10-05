/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';

interface VideoPlayerSimProps {
  videoId: 'video-countdown' | 'video-quan-quan';
  autoPlay?: boolean;
}

export const VideoPlayerSim: React.FC<VideoPlayerSimProps> = ({ videoId, autoPlay = true }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);

  // Frame sequences based on the uploaded video files
  const countdownFrames = [
    { title: 'DEEP SPACE EXPLORATION', sub: 'Jupiter & Planetary Rings', time: '00:01' },
    { title: 'ASTEROID CLUSTER TRAVERSAL', sub: 'Meteor Belt Debris', time: '00:04' },
    { title: 'APPROACHING EARTH ORBIT', sub: 'Atmospheric Lens Flare', time: '00:07' },
    { title: 'ORBITAL SUNRISE', sub: 'Earth Limb & Stratosphere', time: '00:10' },
    { title: 'HYPERDRIVE METEOR DESCENT', sub: 'Fire Trajectory Entry', time: '00:13' },
    { title: 'COUNTDOWN 10... 05... 01', sub: 'Final System Arming', time: '00:17' },
    { title: 'XPLORATORS 2026', sub: 'Celestial Compass Reveal', time: '00:20' },
  ];

  const quanQuanFrames = [
    { title: 'INFERNO OPENING', sub: '“Từ trầm tích sâu thẳm dưới đáy vực...”', time: '00:03' },
    { title: '05 ĐỘI THI', sub: '05 cá tính riêng biệt tranh tài', time: '00:12' },
    { title: 'ĐỘI THI: BA CỤC ĐÁ', sub: 'Khoảnh khắc giới thiệu thí sinh', time: '00:25' },
    { title: 'BÙNG CHÁY ĐỈNH CAO', sub: '“Và ngôi vị cao nhất chỉ có một”', time: '00:38' },
    { title: 'TỐC ĐỘ ĐẾM NGƯỢC 10 - 01', sub: 'Hyperspace light-speed tunnel', time: '00:55' },
    { title: 'CHÍNH THỨC GỌI TÊN', sub: '“Quán quân Xplorators 2026: BA CỤC ĐÁ!”', time: '01:10' },
  ];

  const frames = videoId === 'video-countdown' ? countdownFrames : quanQuanFrames;

  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % frames.length);
    }, 2800);
    return () => clearInterval(interval);
  }, [isPlaying, frames.length]);

  const activeFrame = frames[currentFrameIndex];

  return (
    <div className="relative w-full aspect-video rounded-2xl bg-black overflow-hidden flex flex-col justify-between shadow-2xl select-none font-sans">
      {/* Background Animated Scene Simulation */}
      {videoId === 'video-countdown' ? (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#02050A] via-[#0B1E2D] to-[#16384C] flex items-center justify-center overflow-hidden">
          {/* Animated Stars */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(56,189,248,0.25)_0%,transparent_70%)] animate-[pulse_3s_ease-in-out_infinite]" />

          {/* Planet & Horizon */}
          <div className="relative flex flex-col items-center justify-center text-center p-6">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-gradient-to-tr from-[#0F2634] via-[#2F6B8A] to-[#E3F2FD] shadow-[0_0_50px_rgba(56,189,248,0.6)] flex items-center justify-center">
              <span className="text-[32px] sm:text-[44px]">🪐</span>
            </div>
            <div className="mt-4 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-white/20">
              <span className="font-mono text-[10px] sm:text-[12px] text-[#7DD3FC] tracking-widest uppercase">
                {activeFrame.title}
              </span>
            </div>
            <span className="mt-1 font-serif italic text-[12px] sm:text-[14px] text-white/90">
              {activeFrame.sub}
            </span>
          </div>
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-tr from-[#1A0300] via-[#330800] to-[#5C1600] flex items-center justify-center overflow-hidden">
          {/* Animated Fire Flares */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,100,0,0.35)_0%,transparent_70%)] animate-[pulse_2.5s_ease-in-out_infinite]" />

          {/* Stage & Text */}
          <div className="relative flex flex-col items-center justify-center text-center p-6">
            <span className="text-[36px] sm:text-[48px] animate-bounce">🔥</span>
            <div className="mt-3 px-4 py-1.5 rounded-full bg-black/60 backdrop-blur-md border border-[#F97316]/40">
              <span className="font-mono text-[10px] sm:text-[12px] text-[#FB923C] tracking-widest uppercase">
                {activeFrame.title}
              </span>
            </div>
            <span className="mt-1 font-serif text-[13px] sm:text-[16px] text-[#FFEDD5] max-w-md">
              {activeFrame.sub}
            </span>
          </div>
        </div>
      )}

      {/* Top Header Bar */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between text-[9px] text-white/70 font-mono border-b border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>LIVE PREVIEW REEL</span>
        </div>
        <span>{activeFrame.time} / 01:25</span>
      </div>

      {/* Bottom Control Bar */}
      <div className="relative z-10 p-3 sm:p-4 flex items-center justify-between text-white border-t border-white/10 bg-black/40 backdrop-blur-sm">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          type="button"
          className="flex items-center gap-2 text-[10px] font-sans font-bold hover:text-[#7DD3FC] transition-colors cursor-pointer"
        >
          <span>{isPlaying ? '⏸ PAUSE' : '▶ PLAY'}</span>
        </button>

        {/* Timeline Stepper Dots */}
        <div className="flex items-center gap-1.5">
          {frames.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentFrameIndex(idx)}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                idx === currentFrameIndex ? 'w-6 bg-white' : 'w-2 bg-white/30'
              }`}
            />
          ))}
        </div>

        <span className="font-mono text-[9px] text-white/50">4K PRORES 24FPS</span>
      </div>
    </div>
  );
};
