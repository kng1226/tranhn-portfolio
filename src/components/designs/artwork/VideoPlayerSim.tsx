/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useState, useEffect } from 'react';

interface VideoPlayerSimProps {
  videoId: 'video-countdown' | 'video-quan-quan';
  autoPlay?: boolean;
}

export const VideoPlayerSim: React.FC<VideoPlayerSimProps> = ({ videoId, autoPlay = true }) => {
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [videoUnavailable, setVideoUnavailable] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [progress, setProgress] = useState(0);

  const src = videoId === 'video-countdown' 
    ? '/assets/designs/COUNTDOWN.mp4' 
    : '/assets/designs/QUÁN QUÂN - BA CỤC ĐÁ.mp4';

  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => setIsPlaying(false));
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      const p = (videoRef.current.currentTime / videoRef.current.duration) * 100;
      setProgress(isNaN(p) ? 0 : p);
    }
  };

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
  };

  const formatTime = (timeInSeconds: number) => {
    if (isNaN(timeInSeconds)) return "00:00";
    const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
    const seconds = Math.floor(timeInSeconds % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return (
    <div className="relative w-full aspect-video rounded-2xl bg-black overflow-hidden flex flex-col justify-between shadow-2xl select-none font-sans group">
      
      {videoUnavailable ? (
        <div className="relative h-full w-full">
          <img
            src={videoId === 'video-countdown' ? '/assets/designs/final countdown.png' : '/assets/designs/Quán quân.png'}
            alt={`${videoId === 'video-countdown' ? 'Countdown' : 'Quán quân'} video still`}
            className="h-full w-full object-contain"
          />
          <span className="absolute bottom-3 left-3 rounded-full bg-black/65 px-3 py-1 text-[10px] text-white">
            Video preview unavailable
          </span>
        </div>
      ) : <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-contain cursor-pointer"
        autoPlay={autoPlay}
        preload="metadata"
        onError={() => { setIsPlaying(false); setVideoUnavailable(true); }}
        loop
        playsInline
        onClick={handleVideoClick}
        onTimeUpdate={handleTimeUpdate}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
      />}

      {/* Top Header Bar */}
      {!videoUnavailable && <div className="absolute top-0 left-0 right-0 z-10 p-3 sm:p-4 flex items-center justify-between text-[9px] text-white/70 font-mono bg-gradient-to-b from-black/70 to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span>LIVE PREVIEW REEL</span>
        </div>
        <span>{formatTime(videoRef.current?.currentTime || 0)} / {formatTime(videoRef.current?.duration || 0)}</span>
      </div>}

      {/* Bottom Control Bar */}
      {!videoUnavailable && <div className="absolute bottom-0 left-0 right-0 z-10 p-3 sm:p-4 flex items-center justify-between text-white bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <button
          onClick={() => setIsPlaying(!isPlaying)}
          type="button"
          className="flex items-center gap-2 text-[10px] font-sans font-bold hover:text-[#7DD3FC] transition-colors cursor-pointer"
        >
          <span>{isPlaying ? '⏸ PAUSE' : '▶ PLAY'}</span>
        </button>

        {/* Timeline progress bar */}
        <div className="flex-1 mx-4 h-1.5 bg-white/30 rounded-full overflow-hidden">
          <div 
            className="h-full bg-white transition-all duration-75"
            style={{ width: `${progress}%` }}
          />
        </div>

        <span className="font-mono text-[9px] text-white/70">4K PRORES 24FPS</span>
      </div>}

      {!videoUnavailable && !isPlaying && (
        <div 
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/20 backdrop-blur-md border border-white/40 flex items-center justify-center shadow-2xl transition-transform duration-500 scale-100">
            <span className="text-white text-[24px] sm:text-[28px] ml-1" aria-hidden="true">
              ▶
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
