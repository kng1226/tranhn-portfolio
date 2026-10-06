/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

/**
 * BackgroundScene
 *
 * Maps continuous scroll progress to a sequence of frames.
 * Uses a different frame sequence for desktop (750 frames) vs mobile (600 frames).
 */

const SECTION_IDS = [
  'top',
  'experience-section',
  'projects-section',
  'designs-section',
  'epilogue-section',
] as const;

const MAX_DEVICE_PIXEL_RATIO = 1.25;
const MAX_CACHED_FRAMES = 12;
const PREFETCH_AHEAD = 10;
const PREFETCH_BEHIND = 2;

export const BackgroundScene: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // ── Helpers ────────────────────────────────────────────────────────────────

    /** True absolute top of element relative to document (ignoring current scroll) */
    const getAbsoluteTop = (el: HTMLElement): number => {
      let top = 0;
      let node: HTMLElement | null = el;
      while (node) {
        top += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      return top;
    };

    // ── Canvas size ────────────────────────────────────────────────────────────

    let isMobile = window.innerWidth < 768;
    let numFrames = isMobile ? 600 : 750;
    let viewMode = isMobile ? 'mobile' : 'desktop';

    const resize = () => {
      const newIsMobile = window.innerWidth < 768;
      if (newIsMobile !== isMobile) {
        isMobile = newIsMobile;
        numFrames = isMobile ? 600 : 750;
        viewMode = isMobile ? 'mobile' : 'desktop';
        if (!cache[viewMode]) cache[viewMode] = new Map();
      }

      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DEVICE_PIXEL_RATIO);
      canvas.width = Math.round(window.innerWidth * dpr);
      canvas.height = Math.round(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      recomputeBoundaries();
      renderCurrent();
      if (!raf) raf = requestAnimationFrame(tick);
    };
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // ── Section boundaries (absolute document positions) ──────────────────────

    interface Boundary { top: number; height: number }
    let boundaries: Boundary[] = [];

    const recomputeBoundaries = () => {
      boundaries = SECTION_IDS.map(id => {
        const el = document.getElementById(id);
        if (!el) return { top: 0, height: 0 };
        return { top: getAbsoluteTop(el), height: el.offsetHeight };
      });
    };

    // Compute once after first paint; sections need to be in DOM
    const sectionObserver = new ResizeObserver(() => {
      recomputeBoundaries();
      if (!raf) raf = requestAnimationFrame(tick);
    });
    SECTION_IDS.forEach(id => {
      const section = document.getElementById(id);
      if (section) sectionObserver.observe(section);
    });
    const initTimer = setTimeout(() => {
      recomputeBoundaries();
      if (!raf) raf = requestAnimationFrame(tick);
    }, 300);

    // ── Image cache: cache[mode][frame] ────────────────────────────────────────

    type Cache = Record<string, Map<number, HTMLImageElement>>;
    const cache: Cache = { desktop: new Map(), mobile: new Map() };
    const pending = new Map<string, HTMLImageElement>();
    const failed = new Set<string>();

    const getPath = (mode: string, frame: number) =>
      `/frames/${mode}/frame_${frame.toString().padStart(5, '0')}.webp`;

    // ── Render ─────────────────────────────────────────────────────────────────

    let currentMode = viewMode;
    let currentFrame = 1;
    let requestedMode = viewMode;
    let requestedFrame = 1;
    let lastDrawn = '';

    const drawImage = (img: HTMLImageElement, mode: string, frame: number) => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const cr = cw / ch;
      const ir = img.naturalWidth / img.naturalHeight;
      let w: number, h: number, x: number, y: number;
      if (cr > ir) {
        w = cw; h = cw / ir; x = 0; y = (ch - h) / 2;
      } else {
        w = ch * ir; h = ch; x = (cw - w) * (mode === 'mobile' ? 0.6 : 0.5); y = 0;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
      lastDrawn = `${mode}:${frame}`;
    };

    const drawNearestLoadedFrame = (mode: string, targetFrame: number) => {
      if (currentMode !== mode || currentFrame !== targetFrame) return;

      const targetImage = cache[mode]?.get(targetFrame);
      if (targetImage?.complete && targetImage.naturalWidth > 0) {
        const key = `${mode}:${targetFrame}`;
        if (lastDrawn !== key) drawImage(targetImage, mode, targetFrame);
        return;
      }

      if (!lastDrawn.startsWith(`${mode}:`)) {
        const closest = [...(cache[mode]?.entries() ?? [])]
          .filter(([, image]) => image.complete && image.naturalWidth > 0)
          .sort((a, b) => Math.abs(a[0] - targetFrame) - Math.abs(b[0] - targetFrame))[0];
        if (closest) drawImage(closest[1], mode, closest[0]);
        return;
      }
      const drawnFrame = Number(lastDrawn.split(':')[1]);
      const direction = Math.sign(targetFrame - drawnFrame);
      if (!direction) return;

      const nearest = [...(cache[mode]?.entries() ?? [])]
        .filter(([frame, img]) => {
          if (!img.complete || img.naturalWidth === 0) return false;
          return direction > 0
            ? frame > drawnFrame && frame < targetFrame
            : frame < drawnFrame && frame > targetFrame;
        })
        .sort((a, b) => Math.abs(a[0] - targetFrame) - Math.abs(b[0] - targetFrame))[0];

      if (nearest) drawImage(nearest[1], mode, nearest[0]);
    };

    const cacheLoadedFrame = (mode: string, frame: number, img: HTMLImageElement) => {
      cache[mode].set(frame, img);
      const nearestFirst = [...cache[mode].keys()].sort(
        (a, b) => Math.abs(a - currentFrame) - Math.abs(b - currentFrame),
      );
      while (nearestFirst.length > MAX_CACHED_FRAMES) {
        const oldFrame = nearestFirst.pop()!;
        if (oldFrame !== currentFrame && oldFrame !== requestedFrame) cache[mode].delete(oldFrame);
      }
      drawNearestLoadedFrame(mode, currentFrame);
    };

    const renderFrame = (mode: string, frame: number) => {
      requestedMode = mode;
      requestedFrame = frame;
      currentMode = mode;
      currentFrame = frame;
      const key = `${mode}:${frame}`;
      const img = cache[mode]?.get(frame);
      if (img?.complete && img.naturalWidth > 0) {
        currentMode = mode;
        currentFrame = frame;
        if (lastDrawn !== key) drawImage(img, mode, frame);
      } else if (!img && !pending.has(key) && !failed.has(key)) {
        const newImg = new Image();
        newImg.decoding = 'async';
        pending.set(key, newImg);
        newImg.onload = async () => {
          pending.delete(key);
          try { await newImg.decode(); } catch { /* load may already have decoded */ }
          if (newImg.naturalWidth > 0) cacheLoadedFrame(mode, frame, newImg);
        };
        newImg.onerror = () => { pending.delete(key); failed.add(key); };
        newImg.src = getPath(mode, frame);
      }
      drawNearestLoadedFrame(mode, frame);
    };

    const renderCurrent = () => renderFrame(currentMode, currentFrame);

    // ── Smart preloader: load adjacent frames dynamically ──────────────────────

    const preloadNearby = (mode: string, frame: number, direction: number) => {
      const ahead = direction >= 0 ? PREFETCH_AHEAD : PREFETCH_BEHIND;
      const behind = direction >= 0 ? PREFETCH_BEHIND : PREFETCH_AHEAD;
      for (const [key, img] of pending) {
        const [pendingMode, pendingFrameStr] = key.split(':');
        const pendingFrame = Number(pendingFrameStr);
        const distance = Math.abs(pendingFrame - frame);
        if (pendingMode !== mode || distance > Math.max(ahead, behind) + 12) {
          img.onload = null;
          img.onerror = null;
          img.removeAttribute('src');
          pending.delete(key);
        }
      }
      const candidates = [
        ...Array.from({ length: ahead }, (_, i) => frame + direction * (i + 1)),
        ...Array.from({ length: behind }, (_, i) => frame - direction * (i + 1)),
      ];
      for (const candidate of candidates) {
        if (candidate < 1 || candidate > numFrames) continue;
        const key = `${mode}:${candidate}`;
        if (cache[mode].has(candidate) || pending.has(key) || failed.has(key)) continue;
        const img = new Image();
        img.decoding = 'async';
        pending.set(key, img);
        img.onload = async () => {
          pending.delete(key);
          try { await img.decode(); } catch { /* load may already have decoded */ }
          if (img.naturalWidth > 0) cacheLoadedFrame(mode, candidate, img);
        };
        img.onerror = () => { pending.delete(key); failed.add(key); };
        img.src = getPath(mode, candidate);
      }
    };

    // Boot: show frame 1 immediately
    renderFrame(viewMode, 1);

    // ── Scroll mapping ─────────────────────────────────────────────────────────

    const frameForScroll = (scrollY: number): { mode: string; frame: number } => {
      if (!boundaries.length) return { mode: viewMode, frame: 1 };
      
      const lastBoundary = boundaries[boundaries.length - 1];
      const docHeight = lastBoundary.top + lastBoundary.height;
      const maxScroll = Math.max(0, docHeight - window.innerHeight);
      
      let progress = 0;
      if (maxScroll > 0) {
        progress = Math.max(0, Math.min(1, scrollY / maxScroll));
      }
      
      const frame = Math.max(1, Math.min(numFrames, Math.floor(progress * numFrames) + 1));
      return { mode: viewMode, frame };
    };

    // ── Direct RAF loop — reads scrollY directly, no easing delay ─────────────

    let lastRenderedMode = '';
    let lastRenderedFrame = 0;
    let raf = 0;
    let lastScrollY = window.scrollY;

    const tick = () => {
      raf = 0;
      const { mode, frame } = frameForScroll(lastScrollY);

      // Only redraw when the frame actually changes — avoids redundant canvas work
      if (mode !== lastRenderedMode || frame !== lastRenderedFrame) {
        const direction = frame >= lastRenderedFrame ? 1 : -1;
        renderFrame(mode, frame);
        preloadNearby(mode, frame, direction);
        lastRenderedMode = mode;
        lastRenderedFrame = frame;
      }
    };
    window.addEventListener('resize', resize, { passive: true });
    resize();
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      if (!raf) raf = requestAnimationFrame(tick);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    if (!raf) raf = requestAnimationFrame(tick);

    // ── Cleanup ────────────────────────────────────────────────────────────────

    return () => {
      clearTimeout(initTimer);
      sectionObserver.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', handleScroll);
      if (raf) cancelAnimationFrame(raf);
      pending.forEach(img => img.removeAttribute('src'));
      pending.clear();
    };
  }, []);

  return (
    <div
      className="fixed inset-0 w-full h-full -z-10 overflow-hidden pointer-events-none select-none bg-black"
      aria-hidden="true"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
};
