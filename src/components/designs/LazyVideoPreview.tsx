import React, { useEffect, useRef, useState } from 'react';

interface LazyVideoPreviewProps {
  src: string;
  poster: string;
  alt: string;
  className?: string;
}

export const LazyVideoPreview: React.FC<LazyVideoPreviewProps> = ({
  src,
  poster,
  alt,
  className,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isNearViewport, setIsNearViewport] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
        if (entry.isIntersecting) setIsNearViewport(true);
      },
      { rootMargin: '200px' },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isNearViewport) return;

    if (isVisible) {
      void video.play().catch(() => undefined);
    } else {
      video.pause();
    }
  }, [isNearViewport, isVisible]);

  return (
    <div ref={containerRef} className="w-full h-full">
      <video
        ref={videoRef}
        src={isNearViewport ? src : undefined}
        poster={poster}
        aria-label={alt}
        aria-hidden="true"
        className={className}
        muted
        loop
        playsInline
        preload="none"
      />
    </div>
  );
};
