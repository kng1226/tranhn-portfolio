/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect, useRef } from 'react';

/**
 * BackgroundScene
 *
 * Maps each of the 5 portfolio sections to its own background image folder (1–5),
 * each containing 300 frames. As the user scrolls through a section, the frames
 * for that section play. Sections are separated cleanly with no bleed.
 *
 * Section → Folder mapping:
 *   Journey     (#top)                → /1/  (frames 001–300)
 *   Experience  (#experience-section) → /2/  (frames 001–300)
 *   Projects    (#projects-section)   → /3/  (frames 001–300)
 *   Designs     (#designs-section)    → /4/  (frames 001–300)
 *   About       (#epilogue-section)   → /5/  (frames 001–300)
 */

const SECTION_IDS = [
  'top',
  'experience-section',
  'projects-section',
  'designs-section',
  'epilogue-section',
] as const;

const FRAMES_PER_SECTION = 300;
const MAX_DEVICE_PIXEL_RATIO = 1.25;
const MAX_CACHED_FRAMES = 12;

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

    const resize = () => {
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

    // ── Image cache: cache[folder][frame] ──────────────────────────────────────

    type Cache = Record<number, Map<number, HTMLImageElement>>;
    const cache: Cache = {};
    for (let f = 1; f <= 5; f++) cache[f] = new Map();
    const pending = new Map<string, HTMLImageElement>();
    const failed = new Set<string>();

    const getPath = (folder: number, frame: number) =>
      `/${folder}/ezgif-frame-${frame.toString().padStart(3, '0')}.jpg`;

    // ── Render ─────────────────────────────────────────────────────────────────

    let currentFolder = 1;
    let currentFrame = 1;
    let requestedFolder = 1;
    let requestedFrame = 1;
    let lastDrawn = '';

    const drawImage = (img: HTMLImageElement) => {
      const cw = window.innerWidth;
      const ch = window.innerHeight;
      const cr = cw / ch;
      const ir = img.naturalWidth / img.naturalHeight;
      let w: number, h: number, x: number, y: number;
      if (cr > ir) {
        w = cw; h = cw / ir; x = 0; y = (ch - h) / 2;
      } else {
        w = ch * ir; h = ch; x = (cw - w) / 2; y = 0;
      }
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);
      lastDrawn = `${currentFolder}:${currentFrame}`;
    };

    const renderFrame = (folder: number, frame: number) => {
      requestedFolder = folder;
      requestedFrame = frame;
      currentFolder = folder;
      currentFrame = frame;
      const key = `${folder}:${frame}`;
      const img = cache[folder]?.get(frame);
      if (img?.complete && img.naturalWidth > 0) {
        currentFolder = folder;
        currentFrame = frame;
        if (lastDrawn !== key) drawImage(img);
      } else if (!img && !pending.has(key) && !failed.has(key)) {
        const newImg = new Image();
        newImg.decoding = 'async';
        pending.set(key, newImg);
        newImg.onload = () => {
          pending.delete(key);
          cache[folder].set(frame, newImg);
          const nearby = [...cache[folder].entries()].sort((a, b) => Math.abs(a[0] - currentFrame) - Math.abs(b[0] - currentFrame));
          while (nearby.length > MAX_CACHED_FRAMES) {
            const [oldFrame] = nearby.pop()!;
            if (oldFrame !== currentFrame && oldFrame !== requestedFrame) cache[folder].delete(oldFrame);
          }
          // Only paint if this is still the active frame
          if (currentFolder === folder && currentFrame === frame) {
            drawImage(newImg);
          }
        };
        newImg.onerror = () => { pending.delete(key); failed.add(key); };
        newImg.src = getPath(folder, frame);
      }
    };

    const renderCurrent = () => renderFrame(currentFolder, currentFrame);

    // ── Smart preloader: current section first, then adjacent, then rest ────────

    const preloadNearby = (folder: number, frame: number) => {
      for (const [key, img] of pending) {
        const [pendingFolder, pendingFrame] = key.split(':').map(Number);
        if (pendingFolder !== folder || Math.abs(pendingFrame - frame) > 8) {
          img.onload = null;
          img.onerror = null;
          img.removeAttribute('src');
          pending.delete(key);
        }
      }
      for (let offset = 1; offset <= 2; offset++) {
        for (const candidate of [frame - offset, frame + offset]) {
          if (candidate < 1 || candidate > FRAMES_PER_SECTION) continue;
          const key = `${folder}:${candidate}`;
          if (cache[folder].has(candidate) || pending.has(key) || failed.has(key)) continue;
          const img = new Image();
          img.decoding = 'async';
          pending.set(key, img);
          img.onload = () => {
            pending.delete(key);
            cache[folder].set(candidate, img);
            const loaded = [...cache[folder].keys()];
            while (loaded.length > MAX_CACHED_FRAMES) {
              const old = loaded.shift()!;
              if (old !== currentFrame && old !== requestedFrame) cache[folder].delete(old);
            }
          };
          img.onerror = () => { pending.delete(key); failed.add(key); };
          img.src = getPath(folder, candidate);
        }
      }
    };

    // Boot: show frame 1/1 immediately then begin background preloading
    renderFrame(1, 1);

    // ── Scroll mapping ─────────────────────────────────────────────────────────

    const frameForScroll = (scrollY: number): { folder: number; frame: number } => {
      if (!boundaries.length) return { folder: 1, frame: 1 };
      if (window.innerWidth < 768) {
        const index = boundaries.findIndex(({ top, height }, i) => scrollY < top + height || i === boundaries.length - 1);
        return { folder: Math.max(1, index + 1), frame: 1 };
      }

      for (let i = 0; i < boundaries.length; i++) {
        const { top, height } = boundaries[i];
        const bottom = top + height;

        if (scrollY < bottom || i === boundaries.length - 1) {
          const windowHeight = window.innerHeight;
          const startScroll = Math.max(0, top - windowHeight);
          const endScroll = bottom;
          const scrollable = endScroll - startScroll;

          let progress = 0;
          if (scrollable > 0) {
            progress = Math.max(0, Math.min(1, (scrollY - startScroll) / scrollable));
          }
          const frame = Math.max(1, Math.min(FRAMES_PER_SECTION, Math.floor(progress * FRAMES_PER_SECTION) + 1));
          return { folder: i + 1, frame };
        }
      }

      return { folder: 5, frame: FRAMES_PER_SECTION };
    };

    // ── Direct RAF loop — reads scrollY directly, no easing delay ─────────────

    let lastRenderedFolder = 0;
    let lastRenderedFrame = 0;
    let raf = 0;
    let lastScrollY = window.scrollY;

    const tick = () => {
      raf = 0;
      const { folder, frame } = frameForScroll(lastScrollY);

      // Only redraw when the frame actually changes — avoids redundant canvas work
      if (folder !== lastRenderedFolder || frame !== lastRenderedFrame) {
        renderFrame(folder, frame);
        preloadNearby(folder, frame);
        lastRenderedFolder = folder;
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
      {/* 
        Slightly scale and shift the canvas to push the ezgif watermark 
        at the bottom right completely out of the visible viewport. 
      */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block scale-[1.06] origin-center translate-x-[1.5%] translate-y-[1.5%]"
      />
    </div>
  );
};
